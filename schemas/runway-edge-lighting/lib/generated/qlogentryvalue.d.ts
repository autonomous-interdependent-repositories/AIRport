import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, IQEntity, IQRelation } from '@airport/air-control';
import { LogEntryGraph, LogEntryEOptionalId, LogEntryESelect, QLogEntryQRelation } from './qlogentry';
import { LogEntryValue } from '../ddl/LogEntryValue';
/**
 * SELECT - All fields and relations (optional).
 */
export interface LogEntryValueESelect extends IEntitySelectProperties, LogEntryValueEOptionalId {
    position?: number | IQNumberField;
    value?: any | IQUntypedField;
    logEntry?: LogEntryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LogEntryValueEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface LogEntryValueEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LogEntryValueEUpdateProperties extends IEntityUpdateProperties {
    position?: number | IQNumberField;
    value?: any | IQUntypedField;
    logEntry?: LogEntryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface LogEntryValueGraph extends LogEntryValueEOptionalId, IEntityCascadeGraph {
    position?: number | IQNumberField;
    value?: any | IQUntypedField;
    logEntry?: LogEntryGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEntryValueEUpdateColumns extends IEntityUpdateColumns {
    POSITION?: number | IQNumberField;
    VALUE?: any | IQUntypedField;
    LOG_ENTRY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LogEntryValueECreateProperties extends Partial<LogEntryValueEId>, LogEntryValueEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LogEntryValueECreateColumns extends LogEntryValueEId, LogEntryValueEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLogEntryValue extends IQEntity<LogEntryValue> {
    id: IQNumberField;
    position: IQNumberField;
    value: IQUntypedField;
    logEntry: QLogEntryQRelation;
}
export interface QLogEntryValueQId {
    id: IQNumberField;
}
export interface QLogEntryValueQRelation extends IQRelation<LogEntryValue, QLogEntryValue>, QLogEntryValueQId {
}
//# sourceMappingURL=qlogentryvalue.d.ts.map