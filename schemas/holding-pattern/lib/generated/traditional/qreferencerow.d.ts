import { IQEntityInternal, IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, QEntity, QRelation } from '@airport/air-control';
export interface IReferenceRow {
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ReferenceRowESelect extends IEntitySelectProperties, ReferenceRowEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ReferenceRowEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ReferenceRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ReferenceRowEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ReferenceRowEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ReferenceRowECreateProperties extends Partial<ReferenceRowEId>, ReferenceRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ReferenceRowECreateColumns extends ReferenceRowEId, ReferenceRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QReferenceRow extends QEntity {
}
export interface QReferenceRowQId {
}
export interface QReferenceRowQRelation<SubType extends IQEntityInternal> extends QRelation<SubType>, QReferenceRowQId {
}
