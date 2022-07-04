import { IAirportDatabase } from '@airport/air-traffic-control'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	getSysWideOpIds,
	ISequenceGenerator
} from '@airport/check-in'
import {
	ChangeType,
	ApplicationColumn_Index,
	ensureChildArray,
	ensureChildJsMap,
	ensureChildJsSet,
	ApplicationEntity_LocalId,
	ApplicationVersion_LocalId,
	ApplicationEntity_TableIndex
} from '@airport/ground-control'
import {
	Actor_LocalId,
	IActor,
	IChangedRecordIdsForRepository,
	IOperationHistory,
	IRecordHistory,
	RecordHistory_ActorRecordId,
	RecordHistoryId,
	AirEntity_ActorRecordId,
	Repository_LocalId,
	IActorDao,
	IRepositoryTransactionHistoryDao,
	IRepositoryTransactionHistoryDuo,
} from '@airport/holding-pattern/lib/to_be_generated/runtime-index'
import {
	ISynchronizationConflict,
	SynchronizationConflict_Type
} from '@airport/moving-walkway'
import {
	ISyncInUtils,
	ISyncRepoTransHistory,
	RecordUpdate,
	Stage1SyncedInDataProcessingResult
} from './SyncInUtils'

/**
 * Stage 1 data processor is used to
 *
 *  1)  Generate unique create/update/delete statement datastructures
 *  2)  Generate synchronization conflict datastructure
 */
export interface IStage1SyncedInDataProcessor {

	performStage1DataProcessing(
		repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		actorMayById: Map<Actor_LocalId, IActor>,
		context: IContext
	): Promise<Stage1SyncedInDataProcessingResult>;

}

@Injected()
export class Stage1SyncedInDataProcessor
	implements IStage1SyncedInDataProcessor {

	@Inject()
	actorDao: IActorDao

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	@Inject()
	sequenceGenerator: ISequenceGenerator

	@Inject()
	syncInUtils: ISyncInUtils

	/**
	 * In stage one:
	 *
	 *  1)  Unique create/update/delete statement datastructures are generated
	 *  2)  Synchronization conflict datastructure is generated
	 *
	 * @param {Map<RepositoryId, ISyncRepoTransHistory[]>} repositoryTransactionHistoryMapByRepositoryId
	 * @param {Map<Actor_LocalId, IActor>} actorMayById
	 * @returns {Promise<void>}
	 */
	async performStage1DataProcessing(
		repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		actorMayById: Map<Actor_LocalId, IActor>,
		context: IContext
	): Promise<Stage1SyncedInDataProcessingResult> {
		await this.populateSystemWideOperationIds(repositoryTransactionHistoryMapByRepositoryId)

		const changedRecordIds: Map<Repository_LocalId, IChangedRecordIdsForRepository> = new Map()

		// query for all local operations on records in a repository (since the earliest
		// received change time).  Get the
		// changes by repository _localIds or by the actual tables and records in those tables
		// that will be updated or deleted.

		for (const [repositoryId, repoTransHistoriesForRepo]
			of repositoryTransactionHistoryMapByRepositoryId) {
			const changedRecordsForRepo: IChangedRecordIdsForRepository = {
				actorRecordIdsByLocalIds: new Map(),
				firstChangeTime: new Date().getTime() + 10000000000
			}
			changedRecordIds.set(repositoryId, changedRecordsForRepo)
			for (const repoTransHistory of repoTransHistoriesForRepo) {
				// determine the earliest change time of incoming history records

				const saveMillis = repoTransHistory.saveTimestamp
				if (saveMillis
					< changedRecordsForRepo.firstChangeTime) {
					changedRecordsForRepo.firstChangeTime = repoTransHistory.saveTimestamp
				}
				for (const operationHistory of repoTransHistory.operationHistory) {
					// Collect the Actor related localIds
					const idsForEntity: Map<Actor_LocalId, Set<RecordHistory_ActorRecordId>>
						= ensureChildJsMap(changedRecordsForRepo.ids,
							operationHistory.entity.id)
					for (const recordHistory of operationHistory.recordHistory) {
						// Collect the Actor related localIds
						ensureChildJsSet(idsForEntity, recordHistory.actor._localId)
							.add(recordHistory._actorRecordId)
						// add a map of new values
						const newValueMap = new Map()
						recordHistory.newValueMap = newValueMap
						for (const newValue of recordHistory.newValues) {
							newValueMap.set(newValue.columnIndex, newValue)
						}
					}
				}
			}
		}

		const allRepoTransHistoryMapByRepoId: Map<Repository_LocalId, ISyncRepoTransHistory[]>
			= new Map()

		const allRemoteRecordDeletions = this.getDeletedRecordIdsAndPopulateAllHistoryMap(
			allRepoTransHistoryMapByRepoId, repositoryTransactionHistoryMapByRepositoryId)

		// find local history for the matching repositories and corresponding time period
		const localRepoTransHistoryMapByRepositoryId
			: Map<Repository_LocalId, ISyncRepoTransHistory[]>
			= await this.repositoryTransactionHistoryDao
				.findAllLocalChangesForRecordIds(changedRecordIds)
		const allLocalRecordDeletions = this.getDeletedRecordIdsAndPopulateAllHistoryMap(
			allRepoTransHistoryMapByRepoId, localRepoTransHistoryMapByRepositoryId,
			true)

		// Find all actors that modified the locally recorded history, which are not already
		// in the actorMapById collect actors not already in cache
		const newlyFoundActorSet: Set<Actor_LocalId> = new Set()
		for (const [repositoryId, repositoryTransactionHistoriesForRepository]
			of localRepoTransHistoryMapByRepositoryId) {
			for (const repositoryTransactionHistory of repositoryTransactionHistoriesForRepository) {
				for (const operationHistory of repositoryTransactionHistory.operationHistory) {
					const actorId = operationHistory.actor._localId
					if (actorMayById.get(actorId) === undefined) {
						newlyFoundActorSet.add(actorId)
					}
				}
			}
		}
		if (newlyFoundActorSet.size) {
			// cache remaining actors
			const newActors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(Array.from(newlyFoundActorSet))
			for (const newActor of newActors) {
				actorMayById.set(newActor.id, newActor)
			}
		}

		// sort all repository histories in processing order
		for (const [repositoryId, repoTransHistoriesForRepository]
			of allRepoTransHistoryMapByRepoId) {
			this.repositoryTransactionHistoryDuo
				.sortRepoTransHistories(repoTransHistoriesForRepository, actorMayById)
		}

		const recordCreations: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>>>> = new Map()
		const recordUpdates: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, RecordUpdate>>>>>> = new Map()
		const recordDeletions: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Set<AirEntity_ActorRecordId>>>>> = new Map()

		const syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]> = new Map()

		// FIXME: add code to ensure that remote records coming in are performed only
		// by the actors that claim the operation AND that the records created are
		// created only by the actors that perform the operation (actorIds match)

		for (const [repositoryId, repoTransHistoriesForRepo] of allRepoTransHistoryMapByRepoId) {
			for (const repoTransHistory of repoTransHistoriesForRepo) {
				for (const operationHistory of repoTransHistory.operationHistory) {
					switch (operationHistory.changeType) {
						case ChangeType.INSERT_VALUES:
							this.processCreation(repositoryId, operationHistory, repoTransHistory.isLocal,
								recordCreations, recordUpdates, recordDeletions,
								allRemoteRecordDeletions, allLocalRecordDeletions,
								syncConflictMapByRepoId)
							break
						case ChangeType.UPDATE_ROWS:
							this.processUpdate(repositoryId, operationHistory, repoTransHistory.isLocal,
								recordCreations, recordUpdates,
								allRemoteRecordDeletions, allLocalRecordDeletions,
								syncConflictMapByRepoId)
							break
						case ChangeType.DELETE_ROWS:
							this.processDeletion(repositoryId, operationHistory,
								recordCreations, recordUpdates, recordDeletions,
								allLocalRecordDeletions)
							break
					}
				}
			}
		}

		return {
			recordCreations,
			recordDeletions,
			recordUpdates,
			syncConflictMapByRepoId
		}
	}

	private async populateSystemWideOperationIds(
		repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, ISyncRepoTransHistory[]>
	): Promise<void> {

		let numSystemWideOperationIds = 0
		for (const [_, repoTransHistoriesForRepo] of repositoryTransactionHistoryMapByRepositoryId) {
			for (const repositoryTransactionHistory of repoTransHistoriesForRepo) {
				numSystemWideOperationIds += repositoryTransactionHistory
					.operationHistory.length
			}
		}
		const systemWideOperationIds = await getSysWideOpIds(
			numSystemWideOperationIds, this.airportDatabase, this.sequenceGenerator)

		let i = 0
		for (const [_, repoTransHistoriesForRepo] of repositoryTransactionHistoryMapByRepositoryId) {
			for (const repositoryTransactionHistory of repoTransHistoriesForRepo) {
				for (const operationHistory of repositoryTransactionHistory.operationHistory) {
					operationHistory.systemWideOperationId = systemWideOperationIds[i]
					i++
				}
			}
		}
	}

	ensureRecordHistoryId(
		recordHistory: IRecordHistory,
		actorRecordIdSetByActor: Map<Actor_LocalId, Map<AirEntity_ActorRecordId, RecordHistoryId>>,
		_actorRecordId: AirEntity_ActorRecordId = recordHistory._actorRecordId
	): void {
		ensureChildJsMap(
			actorRecordIdSetByActor, recordHistory.actor._localId)
			.set(_actorRecordId, recordHistory.id)
	}

	private getDeletedRecordIdsAndPopulateAllHistoryMap(
		allRepoTransHistoryMapByRepoId: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		repositoryTransactionHistoryMapByRepoId: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		isLocal = false
	): Map<ApplicationVersion_LocalId, Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
		Map<AirEntity_ActorRecordId, RecordHistoryId>>>>> {
		const recordDeletions: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
			Map<AirEntity_ActorRecordId, RecordHistoryId>>>>> = new Map()
		for (const [repositoryId, repoTransHistories] of repositoryTransactionHistoryMapByRepoId) {
			this.mergeArraysInMap(allRepoTransHistoryMapByRepoId, repositoryId, repoTransHistories)
			for (const repoTransHistory of repoTransHistories) {
				repoTransHistory.isLocal = isLocal
				for (const operationHistory of repoTransHistory.operationHistory) {
					switch (operationHistory.changeType) {
						case ChangeType.DELETE_ROWS:
							for (const recordHistory of operationHistory.recordHistory) {
								this.ensureRecordHistoryId(recordHistory, this.syncInUtils
									.ensureRecordMapForRepoInTable(
										repositoryId, operationHistory, recordDeletions))
							}
							break
					}
				}
			}
		}

		return recordDeletions
	}

	private mergeArraysInMap(
		map: Map<any, any[]>,
		key: any,
		array: any[]
	): void {
		let targetArray = map.get(key)
		if (!targetArray) {
			targetArray = array
		} else {
			targetArray = targetArray.concat(array)
		}
		map.set(key, targetArray)
	}

	/*
	NOTE: local creates are not inputted into this processing.
	 */
	private processCreation(
		repositoryId: Repository_LocalId,
		operationHistory: IOperationHistory,
		isLocal: boolean,
		recordCreations: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>>>>,
		recordUpdates: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, RecordUpdate>>>>>>,
		recordDeletions: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Set<AirEntity_ActorRecordId>>>>>,
		allRemoteRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, RecordHistoryId>>>>>,
		allLocalRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, RecordHistoryId>>>>>,
		syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]>
	): void {

		const recordUpdatesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordUpdates)
		const recordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordDeletions)
		const allRemoteRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allRemoteRecordDeletions)
		const allLocalRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allLocalRecordDeletions)

		const insertsForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(repositoryId,
			operationHistory, recordCreations)

		for (const recordHistory of operationHistory.recordHistory) {
			if (this.getRecord(recordHistory, insertsForEntityInRepo)) {
				throw new Error(`A record is being created more than once.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`)
			}

			if (isLocal) {
				throw new Error(`Remotely mutated record is being created locally.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if changes are never sent to originating TMs.
					`)
			}

			if (this.hasRecordId(recordHistory, recordDeletesForRepoInTable)) {
				throw new Error(`
				Remotely created record is being deleted remotely before it's been created.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if all server clocks are synced.
					`)
			}

			if (this.getRecordHistoryId(recordHistory, allLocalRecordDeletesForRepoInTable)) {
				throw new Error(`Remotely created record is being deleted locally.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`)
			}

			const remoteDeleteRecordHistoryId
				= this.getRecordHistoryId(recordHistory, allRemoteRecordDeletesForRepoInTable)
			if (remoteDeleteRecordHistoryId) {
				// remotely created record has been remotely deleted
				this.addSyncConflict(
					SynchronizationConflict_Type.REMOTE_CREATE_REMOTELY_DELETED,
					repositoryId,
					recordHistory,
					{
						id: remoteDeleteRecordHistoryId
					},
					syncConflictMapByRepoId
				)
				// If the record has been deleted, do not process the create
				continue
			}

			const createdRecord = this.ensureColumnValueMap(recordHistory, insertsForEntityInRepo)

			if (this.getRecord(recordHistory, recordUpdatesForRepoInTable)) {
				throw new Error(`Remotely created record is being updated BEFORE it is created.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if all server clocks are synced.
					`)
			}

			// Record the creation of the record
			for (const newValue of recordHistory.newValues) {
				createdRecord.set(newValue.columnIndex, newValue.newValue)
			}
		}
	}

	/*
	NOTE: local updates to records NOT in incoming changes do not get inputted into
	this processing.
	 */
	private processUpdate(
		repositoryId: Repository_LocalId,
		operationHistory: IOperationHistory,
		isLocal: boolean,
		recordCreations: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>>>>,
		recordUpdates: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, RecordUpdate>>>>>>,
		allRemoteRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, RecordHistoryId>>>>>,
		allLocalRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, RecordHistoryId>>>>>,
		syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]>
	): void {
		const recordCreationsForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordCreations)
		const allRemoteRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allRemoteRecordDeletions)
		const allLocalRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allLocalRecordDeletions)
		const updatesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(
			repositoryId, operationHistory, recordUpdates)

		for (const recordHistory of operationHistory.recordHistory) {
			const localDeleteRecordHistoryId
				= this.getRecordHistoryId(recordHistory, allLocalRecordDeletesForRepoInTable)
			if (localDeleteRecordHistoryId) {
				if (!isLocal) {
					// A remote update to a record has been locally deleted
					this.addSyncConflict(
						SynchronizationConflict_Type.REMOTE_UPDATE_LOCALLY_DELETED,
						repositoryId,
						recordHistory,
						{
							id: localDeleteRecordHistoryId
						},
						syncConflictMapByRepoId
					)
				}
				// else {a local update to a record has been locally deleted - nothing to do}

				// If the record has been deleted, do not process the update
				continue
			}
			const remoteDeleteRecordHistoryId
				= this.getRecordHistoryId(recordHistory, allRemoteRecordDeletesForRepoInTable)
			if (remoteDeleteRecordHistoryId) {
				if (isLocal) {
					// A local update for a record that has been deleted remotely
					this.addSyncConflict(
						SynchronizationConflict_Type.LOCAL_UPDATE_REMOTELY_DELETED,
						repositoryId,
						recordHistory,
						{
							id: remoteDeleteRecordHistoryId
						},
						syncConflictMapByRepoId
					)
				}
				// else {remote deletions do not cause conflicts for remotely updated records}

				// If the record has been deleted, do not process the update
				continue
			}

			// If the record has been created, update the creation record instead
			let createdRecord = this.getRecord(recordHistory, recordCreationsForRepoInTable)
			if (createdRecord) {
				if (isLocal) {
					throw new Error(`Remotely created records are being updated locally.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`)
				} else {
					// remotely created record is being updated remotely - normal flow
					for (const newValue of recordHistory.newValues) {
						createdRecord.set(newValue.columnIndex, newValue.newValue)
					}
				}

				// No need to record updates, already taken into account in the create
				continue
			}

			// record update
			let updatedRecord = this.ensureRecord(recordHistory, updatesForEntityInRepo)
			let synchronizationConflict: ISynchronizationConflict
			for (const newValue of recordHistory.newValues) {
				if (isLocal) {
					const columnIndex = newValue.columnIndex
					const recordUpdate: RecordUpdate = updatedRecord.get(columnIndex)
					if (recordUpdate) {
						// remotely updated record value is being updated locally
						if (!synchronizationConflict) {
							synchronizationConflict = this.addSyncConflict(
								SynchronizationConflict_Type.REMOTE_UPDATE_LOCALLY_UPDATED,
								repositoryId,
								{
									id: recordUpdate.recordHistoryId,
								},
								{
									id: remoteDeleteRecordHistoryId
								},
								syncConflictMapByRepoId
							)
							synchronizationConflict.values = []
						}
						synchronizationConflict.values.push({
							columnIndex,
							synchronizationConflict
						})

						// no need to update since the value is already there
						// Remove the update
						updatedRecord.delete(newValue.columnIndex)
					}
				} else {
					// remotely updated record value is being updated remotely - normal flow
					// replace the older update with the newer one
					updatedRecord.set(newValue.columnIndex, {
						newValue: newValue.newValue,
						recordHistoryId: recordHistory.id
					})
				}
			}
		}

	}

	/*
	NOTE: local deletes of records NOT in incoming changes do not get inputted into
	this processing.
	 */
	private processDeletion(
		repositoryId: Repository_LocalId,
		operationHistory: IOperationHistory,
		recordCreations: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>>>>,
		recordUpdates: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>>>>,
		recordDeletions: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Set<AirEntity_ActorRecordId>>>>>,
		allLocalRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<AirEntity_ActorRecordId, RecordHistoryId>>>>>,
	): void {
		const recordCreationsForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordCreations)
		const recordUpdatesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordUpdates)
		const allLocalRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allLocalRecordDeletions)
		const deletesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(
			repositoryId, operationHistory, recordDeletions)

		for (const recordHistory of operationHistory.recordHistory) {
			let recordCreationsForActorInRepoInTable = this.getRecordsForActor(
				recordHistory, recordCreationsForRepoInTable)
			// If a remotely deleted record was also created remotely
			if (recordCreationsForActorInRepoInTable
				&& recordCreationsForActorInRepoInTable.get(recordHistory._actorRecordId)) {
				// remote deletions do not cause conflicts for remotely created records

				// Remove the creation of the record
				recordCreationsForActorInRepoInTable.delete(recordHistory._actorRecordId)

				// No need to record a deletion for a record that was also created (remotely)
				continue
			}

			let recordUpdatesForActorInRepoInTable = this.getRecordsForActor(
				recordHistory, recordUpdatesForRepoInTable)
			// If a remotely deleted record has been updated (remotely)
			if (recordUpdatesForActorInRepoInTable
				&& recordUpdatesForActorInRepoInTable.get(recordHistory._actorRecordId)) {
				// remote deletions do not cause conflicts for remotely updated records

				// Remove record updates for deleted records
				recordUpdatesForActorInRepoInTable.delete(recordHistory._actorRecordId)
			}

			if (this.getRecordHistoryId(recordHistory, allLocalRecordDeletesForRepoInTable)) {

				// If the record has been deleted locally, no need to add another delete operation
				continue
			}

			// record deletion
			ensureChildJsSet(deletesForEntityInRepo, recordHistory.actor._localId)
				.add(recordHistory._actorRecordId)
		}
	}

	private getRecordsForRepoInTable<T>(
		repositoryId: Repository_LocalId,
		operationHistory: IOperationHistory,
		recordMapByApplicationTableAndRepository: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, T>>>
	): T {
		const recordMapForApplication = recordMapByApplicationTableAndRepository
			.get(operationHistory.entity.applicationVersion.id)
		let recordMapForTable: Map<Repository_LocalId, T>
		if (recordMapForApplication) {
			recordMapForTable = recordMapForApplication.get(operationHistory.entity.id)
		}
		let recordMapForRepoInTable: T
		if (recordMapForTable) {
			recordMapForRepoInTable = recordMapForTable.get(repositoryId)
		}

		return recordMapForRepoInTable
	}

	private getRecord(
		recordHistory: IRecordHistory,
		recordMapByActor:
			Map<Actor_LocalId, Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>
	): Map<ApplicationColumn_Index, any> {
		let recordsForActor = this.getRecordsForActor(recordHistory, recordMapByActor)
		if (!recordsForActor) {
			return null
		}
		return recordsForActor.get(recordHistory._actorRecordId)
	}

	private hasRecordId(
		recordHistory: IRecordHistory,
		actorRecordIdSetByActor:
			Map<Actor_LocalId, Set<AirEntity_ActorRecordId>>
	): boolean {
		let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordIdSetByActor)
		if (!actorRecordIdsForActor) {
			return false
		}
		return actorRecordIdsForActor.has(recordHistory._actorRecordId)
	}

	private getRecordHistoryId(
		recordHistory: IRecordHistory,
		actorRecordIdSetByActor:
			Map<Actor_LocalId, Map<AirEntity_ActorRecordId, RecordHistoryId>>
	): RecordHistoryId {
		let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordIdSetByActor)
		if (!actorRecordIdsForActor) {
			return null
		}
		return actorRecordIdsForActor.get(recordHistory._actorRecordId)
	}

	private getRecordsForActor<T>(
		recordHistory: IRecordHistory,
		recordMapByActor: Map<Actor_LocalId, T>
	): T {
		let recordsForActor: T
		if (recordMapByActor) {
			recordsForActor = recordMapByActor.get(recordHistory.actor._localId)
		}

		return recordsForActor
	}

	private getRecordInfo(
		repositoryId: Repository_LocalId,
		operationHistory: IOperationHistory,
		recordHistory: IRecordHistory
	): string {
		return `
		Application Version ID: ${operationHistory.entity.applicationVersion.id}
		Entity ID:         ${operationHistory.entity.id}
		Repository ID:     ${repositoryId}
		Actor ID:          ${recordHistory.actor._localId}
		Actor Record ID:   ${recordHistory._actorRecordId}
		`
	}

	private addSyncConflict(
		synchronizationConflictType: SynchronizationConflict_Type,
		repositoryId: Repository_LocalId,
		overwrittenRecordHistory: IRecordHistory,
		overwritingRecordHistory: IRecordHistory,
		syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]>
	): ISynchronizationConflict {
		const syncConflict = this.createSynchronizationConflict(
			synchronizationConflictType,
			repositoryId,
			overwrittenRecordHistory,
			overwritingRecordHistory
		)
		ensureChildArray(syncConflictMapByRepoId, repositoryId).push(syncConflict)

		return syncConflict
	}

	private createSynchronizationConflict(
		synchronizationConflictType: SynchronizationConflict_Type,
		repositoryId: Repository_LocalId,
		overwrittenRecordHistory: IRecordHistory,
		overwritingRecordHistory: IRecordHistory
	): ISynchronizationConflict {
		return {
			id: null,
			overwrittenRecordHistory,
			overwritingRecordHistory,
			repository: {
				id: repositoryId
			},
			type: synchronizationConflictType
		}
	}

	private ensureColumnValueMap(
		recordHistory: IRecordHistory,
		dataMap: Map<Actor_LocalId, Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>
	): Map<ApplicationColumn_Index, any> {
		return <any>ensureChildJsMap(
			ensureChildJsMap(
				dataMap,
				recordHistory.actor._localId),
			recordHistory._actorRecordId)
	}

	private ensureRecord(
		recordHistory: IRecordHistory,
		recordMapByActor:
			Map<Actor_LocalId, Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>
	): Map<ApplicationColumn_Index, any> {
		return <any>ensureChildJsMap(
			ensureChildJsMap(
				recordMapByActor, recordHistory.actor._localId),
			recordHistory._actorRecordId)
	}

}
