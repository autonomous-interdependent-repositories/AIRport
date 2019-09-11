import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
export interface IArchive {
    id: string;
    location?: string;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ArchiveESelect extends IEntitySelectProperties, ArchiveEOptionalId {
    location?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ArchiveEId extends IEntityIdProperties {
    id: string | IQStringField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ArchiveEOptionalId {
    id?: string | IQStringField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ArchiveEUpdateProperties extends IEntityUpdateProperties {
    location?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ArchiveEUpdateColumns extends IEntityUpdateColumns {
    LOCATION?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ArchiveECreateProperties extends Partial<ArchiveEId>, ArchiveEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ArchiveECreateColumns extends ArchiveEId, ArchiveEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QArchive extends IQEntity {
    id: IQStringField;
    location: IQStringField;
}
export interface QArchiveQId {
    id: IQStringField;
}
export interface QArchiveQRelation extends IQRelation<QArchive>, QArchiveQId {
}
