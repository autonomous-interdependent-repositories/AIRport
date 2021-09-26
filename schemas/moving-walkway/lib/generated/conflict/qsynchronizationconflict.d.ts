import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation, RecordHistoryGraph, RecordHistoryEOptionalId, RecordHistoryESelect, QRecordHistoryQRelation } from '@airport/holding-pattern';
import { SynchronizationConflictValuesGraph, SynchronizationConflictValuesESelect, QSynchronizationConflictValues } from './qsynchronizationconflictvalues';
import { SynchronizationConflictValues } from '../../ddl/conflict/SynchronizationConflictValues';
import { SynchronizationConflict } from '../../ddl/conflict/SynchronizationConflict';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SynchronizationConflictESelect extends IEntitySelectProperties, SynchronizationConflictEOptionalId {
    type?: string | IQStringField;
    repository?: RepositoryESelect;
    overwrittenRecordHistory?: RecordHistoryESelect;
    overwritingRecordHistory?: RecordHistoryESelect;
    values?: SynchronizationConflictValuesESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SynchronizationConflictEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SynchronizationConflictEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SynchronizationConflictEUpdateProperties extends IEntityUpdateProperties {
    type?: string | IQStringField;
    repository?: RepositoryEOptionalId;
    overwrittenRecordHistory?: RecordHistoryEOptionalId;
    overwritingRecordHistory?: RecordHistoryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SynchronizationConflictGraph extends SynchronizationConflictEOptionalId, IEntityCascadeGraph {
    type?: string | IQStringField;
    repository?: RepositoryGraph;
    overwrittenRecordHistory?: RecordHistoryGraph;
    overwritingRecordHistory?: RecordHistoryGraph;
    values?: SynchronizationConflictValuesGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SynchronizationConflictEUpdateColumns extends IEntityUpdateColumns {
    TYPE?: string | IQStringField;
    REPOSITORY_ID?: number | IQNumberField;
    OVERWRITTEN_RECORD_HISTORY_ID?: number | IQNumberField;
    OVERWRITING_RECORD_HISTORY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SynchronizationConflictECreateProperties extends Partial<SynchronizationConflictEId>, SynchronizationConflictEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SynchronizationConflictECreateColumns extends SynchronizationConflictEId, SynchronizationConflictEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSynchronizationConflict extends IQEntity<SynchronizationConflict> {
    id: IQNumberField;
    type: IQStringField;
    repository: QRepositoryQRelation;
    overwrittenRecordHistory: QRecordHistoryQRelation;
    overwritingRecordHistory: QRecordHistoryQRelation;
    values: IQOneToManyRelation<SynchronizationConflictValues, QSynchronizationConflictValues>;
}
export interface QSynchronizationConflictQId {
    id: IQNumberField;
}
export interface QSynchronizationConflictQRelation extends IQRelation<SynchronizationConflict, QSynchronizationConflict>, QSynchronizationConflictQId {
}
//# sourceMappingURL=qsynchronizationconflict.d.ts.map