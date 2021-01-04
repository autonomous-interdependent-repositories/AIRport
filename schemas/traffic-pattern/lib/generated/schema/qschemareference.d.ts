import { IQNumberField } from '@airport/air-control';
import { VersionedSchemaObjectGraph, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { SchemaVersionGraph, SchemaVersionEId, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQId, QSchemaVersionQRelation } from './qschemaversion';
import { SchemaReference } from '../../ddl/schema/SchemaReference';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaReferenceESelect extends VersionedSchemaObjectESelect, SchemaReferenceEOptionalId {
    index?: number | IQNumberField;
    ownSchemaVersion?: SchemaVersionESelect;
    referencedSchemaVersion?: SchemaVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaReferenceEId extends VersionedSchemaObjectEId {
    ownSchemaVersion: SchemaVersionEId;
    referencedSchemaVersion: SchemaVersionEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaReferenceEOptionalId {
    ownSchemaVersion?: SchemaVersionEOptionalId;
    referencedSchemaVersion?: SchemaVersionEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaReferenceEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
    index?: number | IQNumberField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaReferenceGraph extends SchemaReferenceEOptionalId, VersionedSchemaObjectGraph {
    index?: number | IQNumberField;
    ownSchemaVersion?: SchemaVersionGraph;
    referencedSchemaVersion?: SchemaVersionGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaReferenceEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    SCHEMA_REFERENCE_INDEX?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaReferenceECreateProperties extends Partial<SchemaReferenceEId>, SchemaReferenceEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaReferenceECreateColumns extends SchemaReferenceEId, SchemaReferenceEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaReference extends QVersionedSchemaObject<SchemaReference> {
    ownSchemaVersion: QSchemaVersionQRelation;
    referencedSchemaVersion: QSchemaVersionQRelation;
    index: IQNumberField;
}
export interface QSchemaReferenceQId extends QVersionedSchemaObjectQId {
    ownSchemaVersion: QSchemaVersionQId;
    referencedSchemaVersion: QSchemaVersionQId;
}
export interface QSchemaReferenceQRelation extends QVersionedSchemaObjectQRelation<SchemaReference, QSchemaReference>, QSchemaReferenceQId {
}
//# sourceMappingURL=qschemareference.d.ts.map