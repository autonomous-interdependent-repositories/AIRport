import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { ApplicationPackageEOptionalId, ApplicationPackageESelect, QApplicationPackageQRelation, PackagedUnitEOptionalId, PackagedUnitESelect, QPackagedUnitQRelation } from '@airport/territory';
import { LogEntryECascadeGraph, LogEntryESelect, QLogEntry } from './qlogentry';
/**
 * SELECT - All fields and relations (optional).
 */
export interface LogEntryTypeESelect extends IEntitySelectProperties, LogEntryTypeEOptionalId {
    level?: number | IQNumberField;
    text?: string | IQStringField;
    applicationPackage?: ApplicationPackageESelect;
    packagedUnit?: PackagedUnitESelect;
    logEntries?: LogEntryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LogEntryTypeEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface LogEntryTypeEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LogEntryTypeEUpdateProperties extends IEntityUpdateProperties {
    level?: number | IQNumberField;
    text?: string | IQStringField;
    applicationPackage?: ApplicationPackageEOptionalId;
    packagedUnit?: PackagedUnitEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface LogEntryTypeECascadeGraph extends IEntityCascadeGraph {
    logEntries?: LogEntryECascadeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEntryTypeEUpdateColumns extends IEntityUpdateColumns {
    LEVEL?: number | IQNumberField;
    TEXT?: string | IQStringField;
    APPLICATION_PACKAGE_ID?: number | IQNumberField;
    PACKAGED_UNIT_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LogEntryTypeECreateProperties extends Partial<LogEntryTypeEId>, LogEntryTypeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LogEntryTypeECreateColumns extends LogEntryTypeEId, LogEntryTypeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLogEntryType extends IQEntity {
    id: IQNumberField;
    level: IQNumberField;
    text: IQStringField;
    applicationPackage: QApplicationPackageQRelation;
    packagedUnit: QPackagedUnitQRelation;
    logEntries: IQOneToManyRelation<QLogEntry>;
}
export interface QLogEntryTypeQId {
    id: IQNumberField;
}
export interface QLogEntryTypeQRelation extends IQRelation<QLogEntryType>, QLogEntryTypeQId {
}
