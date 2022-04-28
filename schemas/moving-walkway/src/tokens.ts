import { lib } from '@airport/direction-indicator'
import { ISynchronizationConflictDao, SynchronizationConflictDao } from "./dao/conflict/SynchronizationConflictDao";
import { ISynchronizationConflictValuesDao, SynchronizationConflictValuesDao } from "./dao/conflict/SynchronizationConflictValuesDao";
import { IRecordUpdateStageDao, RecordUpdateStageDao } from "./dao/RecordUpdateStageDao";

const movingWalkway = lib('moving-walkway')

export const RECORD_UPDATE_STAGE_DAO = movingWalkway.token<IRecordUpdateStageDao>({
	class: RecordUpdateStageDao,
	interface: 'IRecordUpdateStageDao',
	token: 'RECORD_UPDATE_STAGE_DAO'
});
export const SYNCHRONIZATION_CONFLICT_DAO
	= movingWalkway.token<ISynchronizationConflictDao>({
		class: SynchronizationConflictDao,
		interface: 'ISynchronizationConflictDao',
		token: 'SYNCHRONIZATION_CONFLICT_DAO'
	});
export const SYNCHRONIZATION_CONFLICT_VALUES_DAO
	= movingWalkway.token<ISynchronizationConflictValuesDao>({
		class: SynchronizationConflictValuesDao,
		interface: 'ISynchronizationConflictValuesDao',
		token: 'SYNCHRONIZATION_CONFLICT_VALUES_DAO'
	});
