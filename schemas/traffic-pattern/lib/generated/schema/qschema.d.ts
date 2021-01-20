import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { DomainGraph, DomainEOptionalId, DomainESelect, QDomainQRelation } from '@airport/territory';
import { SchemaVersionGraph, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersion, QSchemaVersionQRelation } from './qschemaversion';
import { SchemaVersion } from '../../ddl/schema/SchemaVersion';
import { Schema } from '../../ddl/schema/Schema';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaESelect extends IEntitySelectProperties, SchemaEOptionalId {
    scope?: string | IQStringField;
    name?: string | IQStringField;
    packageName?: string | IQStringField;
    status?: number | IQNumberField;
    domain?: DomainESelect;
    versions?: SchemaVersionESelect;
    currentVersion?: SchemaVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaEId extends IEntityIdProperties {
    index: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaEOptionalId {
    index?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaEUpdateProperties extends IEntityUpdateProperties {
    scope?: string | IQStringField;
    name?: string | IQStringField;
    packageName?: string | IQStringField;
    status?: number | IQNumberField;
    domain?: DomainEOptionalId;
    currentVersion?: SchemaVersionEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaGraph extends SchemaEOptionalId, IEntityCascadeGraph {
    scope?: string | IQStringField;
    name?: string | IQStringField;
    packageName?: string | IQStringField;
    status?: number | IQNumberField;
    domain?: DomainGraph;
    versions?: SchemaVersionGraph[];
    currentVersion?: SchemaVersionGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEUpdateColumns extends IEntityUpdateColumns {
    SCOPE?: string | IQStringField;
    SCHEMA_NAME?: string | IQStringField;
    PACKAGE_NAME?: string | IQStringField;
    STATUS?: number | IQNumberField;
    DOMAIN_ID?: number | IQNumberField;
    CURRENT_VERSION_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaECreateProperties extends Partial<SchemaEId>, SchemaEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaECreateColumns extends SchemaEId, SchemaEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchema extends IQEntity<Schema> {
    index: IQNumberField;
    scope: IQStringField;
    name: IQStringField;
    packageName: IQStringField;
    status: IQNumberField;
    domain: QDomainQRelation;
    versions: IQOneToManyRelation<SchemaVersion, QSchemaVersion>;
    currentVersion: QSchemaVersionQRelation;
}
export interface QSchemaQId {
    index: IQNumberField;
}
export interface QSchemaQRelation extends IQRelation<Schema, QSchema>, QSchemaQId {
}
//# sourceMappingURL=qschema.d.ts.map