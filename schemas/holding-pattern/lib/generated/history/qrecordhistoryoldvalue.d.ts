import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, QEntity, QRelation } from '@airport/air-control';
import { IRecordHistory, RecordHistoryEId, RecordHistoryEOptionalId, RecordHistoryESelect, QRecordHistoryQId, QRecordHistoryQRelation } from './qrecordhistory';
export interface IRecordHistoryOldValue {
    columnIndex?: number;
    recordHistory?: IRecordHistory;
    oldValue?: any;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordHistoryOldValueESelect extends IEntitySelectProperties, RecordHistoryOldValueEOptionalId {
    oldValue?: any | IQUntypedField;
    recordHistory?: RecordHistoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordHistoryOldValueEId extends IEntityIdProperties {
    columnIndex: number | IQNumberField;
    recordHistory: RecordHistoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RecordHistoryOldValueEOptionalId {
    columnIndex?: number | IQNumberField;
    recordHistory?: RecordHistoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordHistoryOldValueEUpdateProperties extends IEntityUpdateProperties {
    oldValue?: any | IQUntypedField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordHistoryOldValueEUpdateColumns extends IEntityUpdateColumns {
    OLD_VALUE?: any | IQUntypedField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RecordHistoryOldValueECreateProperties extends Partial<RecordHistoryOldValueEId>, RecordHistoryOldValueEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RecordHistoryOldValueECreateColumns extends RecordHistoryOldValueEId, RecordHistoryOldValueEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRecordHistoryOldValue extends QEntity {
    columnIndex: IQNumberField;
    recordHistory: QRecordHistoryQRelation;
    oldValue: IQUntypedField;
}
export interface QRecordHistoryOldValueQId {
    columnIndex: IQNumberField;
    recordHistory: QRecordHistoryQId;
}
export interface QRecordHistoryOldValueQRelation extends QRelation<QRecordHistoryOldValue>, QRecordHistoryOldValueQId {
}
