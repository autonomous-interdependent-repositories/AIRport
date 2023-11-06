import {
	ALL_FIELDS,
	AND,
	OR,
	Y
} from '@airport/tarmaq-query'
import {
	ActorRecordId,
	Actor_LocalId,
	DbEntity_LocalId,
	IDatastructureUtils,
	IRepositoryTransactionHistory,
	QueryBaseOperation,
	Repository_LocalId,
	TransactionType
} from '@airport/ground-control'
import {
	OperationHistory,
} from '../../ddl/ddl'
import Q from '../../generated/qApplication'
import { QDdlEntity, QDdlApplicationVersion } from '@airport/airspace/dist/app/bundle'
import { IContext, Inject, Injected } from '@airport/direction-indicator'
import { BaseRepositoryTransactionHistoryDao } from '../../generated/baseDaos'
import { QOperationHistory, QRecordHistory, QRecordHistoryNewValue, QRepositoryTransactionHistory, QTransactionHistory } from '../../generated/qInterfaces'

export interface IRepositoryTransactionHistoryDao {

	findWhereGUIDsIn(
		GUIDs: string[],
		context: IContext
	): Promise<IRepositoryTransactionHistory[]>

	findAllLocalChangesForRecordIds(
		changedRecordIds: Map<Repository_LocalId, IChangedRecordIdsForRepository>,
		context: IContext
	): Promise<Map<Repository_LocalId, IRepositoryTransactionHistory[]>>;

	updateSyncTimestamp(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		context: IContext
	): Promise<void>

}

export interface IChangedRecordIdsForRepository {
	actorRecordIdsByLocalIds: Map<DbEntity_LocalId, Map<Actor_LocalId, Set<ActorRecordId>>>;
	firstChangeTime: number;
}

@Injected()
export class RepositoryTransactionHistoryDao
	extends BaseRepositoryTransactionHistoryDao
	implements IRepositoryTransactionHistoryDao {

	@Inject()
	datastructureUtils: IDatastructureUtils

	/*
	async clearContentsWhereIdsIn(
		repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[],
		context: IContext
	): Promise<void> {
		const rtb: QRepositoryTransactionBlock = Q.QRepositoryTransactionBlock
		await this.db.updateWhere({
			UPDATE: rtb,
			SET: {
				contents: null
			},
			WHERE: rtb._localId.IN(repositoryTransactionBlockIds)
		}, context)
	}
	*/

	async findWhereGUIDsIn(
		GUIDs: string[],
		context: IContext
	): Promise<IRepositoryTransactionHistory[]> {
		let rth: QRepositoryTransactionHistory
		return await this.db.find.tree({
			SELECT: {
				GUID: Y
			},
			FROM: [
				rth = Q.RepositoryTransactionHistory
			],
			WHERE: rth.GUID.IN(GUIDs)
		}, context)
	}

	async findAllLocalChangesForRecordIds(
		changedRecordIds: Map<Repository_LocalId, IChangedRecordIdsForRepository>,
		context: IContext
	): Promise<Map<Repository_LocalId, IRepositoryTransactionHistory[]>> {
		const repositoryTransactionHistoryMapByRepositoryLid: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
			= new Map()

		const rth: QRepositoryTransactionHistory = Q.RepositoryTransactionHistory
		const th: QTransactionHistory = rth.transactionHistory.INNER_JOIN()
		const oh: QOperationHistory = rth.operationHistory.LEFT_JOIN()
		const ae: QDdlEntity = oh.entity.LEFT_JOIN()
		const av: QDdlApplicationVersion = ae.applicationVersion.LEFT_JOIN()
		const rh: QRecordHistory = oh.recordHistory.LEFT_JOIN()
		const nv: QRecordHistoryNewValue = rh.newValues.LEFT_JOIN()
		let _localId = Y

		const repositoryEquals: QueryBaseOperation[] = []
		for (const [repositoryLid, idsForRepository] of changedRecordIds) {
			const recordMapForRepository = idsForRepository.actorRecordIdsByLocalIds
			const entityEquals: QueryBaseOperation[] = []
			for (const [entityId, recordMapForEntity] of recordMapForRepository) {
				const actorEquals: QueryBaseOperation[] = []
				for (const [actorLid, recordsForActor] of recordMapForEntity) {
					actorEquals.push(AND(
						rh.actor._localId.equals(actorLid),
						rh._actorRecordId.IN(Array.from(recordsForActor))
					))
				}
				entityEquals.push(AND(
					oh.entity._localId.equals(entityId),
					OR(...actorEquals)
				))
			}
			repositoryEquals.push(AND(
				rth.repository._localId.equals(repositoryLid),
				rth.saveTimestamp.greaterThanOrEquals(idsForRepository.firstChangeTime),
				OR(...entityEquals)
			))
		}

		const repoTransHistories = await this.db.find.tree({
			SELECT: {
				...ALL_FIELDS,
				operationHistory: {
					orderNumber: Y,
					changeType: Y,
					entity: {
						_localId,
						// index: Y,
						applicationVersion: {
							_localId: Y,
							// integerVersion: Y,
							// application: {
							// 	index: Y
							// }
						}
					},
					recordHistory: {
						_localId,
						newValues: {
							columnIndex: Y,
							newValue: Y
						}
					}
				}
			},
			FROM: [
				rth,
				th,
				oh,
				ae,
				av,
				rh,
				nv

			],
			WHERE: AND(
				th.transactionType.equals(TransactionType.LOCAL),
				OR(...repositoryEquals)
			),
			// ORDER_BY: [
			// 	rth.repository._localId.ASC()
			// ]
		}, context)

		for (const repoTransHistory of repoTransHistories) {
			this.datastructureUtils.ensureChildArray(
				repositoryTransactionHistoryMapByRepositoryLid, repoTransHistory.repository._localId)
				.push(repoTransHistory)
			repoTransHistory.operationHistory.sort((
				rth1: OperationHistory,
				rth2: OperationHistory
			) => {
				if (rth1.orderNumber < rth2.orderNumber) {
					return -1
				}
				if (rth1.orderNumber > rth2.orderNumber) {
					return 1
				}
				return 0
			})
		}

		return repositoryTransactionHistoryMapByRepositoryLid
	}

	async updateSyncTimestamp(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		context: IContext
	): Promise<void> {
		let rth: QRepositoryTransactionHistory

		await this.db.updateWhere({
			UPDATE: rth = Q.RepositoryTransactionHistory,
			SET: {
				syncTimestamp: repositoryTransactionHistory.syncTimestamp
			},
			WHERE: rth._localId.equals(repositoryTransactionHistory._localId)
		}, context)
	}
}
