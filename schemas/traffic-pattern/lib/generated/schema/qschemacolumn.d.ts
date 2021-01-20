import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField } from '@airport/air-control';
import { VersionedSchemaObjectGraph, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { SchemaEntityGraph, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from './qschemaentity';
import { SchemaPropertyColumnGraph, SchemaPropertyColumnESelect, QSchemaPropertyColumn } from './qschemapropertycolumn';
import { SchemaPropertyColumn } from '../../ddl/schema/SchemaPropertyColumn';
import { SchemaRelationColumnGraph, SchemaRelationColumnESelect, QSchemaRelationColumn } from './qschemarelationcolumn';
import { SchemaRelationColumn } from '../../ddl/schema/SchemaRelationColumn';
import { SchemaColumn } from '../../ddl/schema/SchemaColumn';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaColumnESelect extends VersionedSchemaObjectESelect, SchemaColumnEOptionalId {
    index?: number | IQNumberField;
    idIndex?: number | IQNumberField;
    isGenerated?: boolean | IQBooleanField;
    allocationSize?: number | IQNumberField;
    name?: string | IQStringField;
    notNull?: boolean | IQBooleanField;
    precision?: number | IQNumberField;
    scale?: number | IQNumberField;
    type?: number | IQNumberField;
    entity?: SchemaEntityESelect;
    propertyColumns?: SchemaPropertyColumnESelect;
    manyRelationColumns?: SchemaRelationColumnESelect;
    oneRelationColumns?: SchemaRelationColumnESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaColumnEId extends VersionedSchemaObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaColumnEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaColumnEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
    index?: number | IQNumberField;
    idIndex?: number | IQNumberField;
    isGenerated?: boolean | IQBooleanField;
    allocationSize?: number | IQNumberField;
    name?: string | IQStringField;
    notNull?: boolean | IQBooleanField;
    precision?: number | IQNumberField;
    scale?: number | IQNumberField;
    type?: number | IQNumberField;
    entity?: SchemaEntityEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaColumnGraph extends SchemaColumnEOptionalId, VersionedSchemaObjectGraph {
    index?: number | IQNumberField;
    idIndex?: number | IQNumberField;
    isGenerated?: boolean | IQBooleanField;
    allocationSize?: number | IQNumberField;
    name?: string | IQStringField;
    notNull?: boolean | IQBooleanField;
    precision?: number | IQNumberField;
    scale?: number | IQNumberField;
    type?: number | IQNumberField;
    entity?: SchemaEntityGraph;
    propertyColumns?: SchemaPropertyColumnGraph[];
    manyRelationColumns?: SchemaRelationColumnGraph[];
    oneRelationColumns?: SchemaRelationColumnGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaColumnEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    COLUMN_INDEX?: number | IQNumberField;
    ID_INDEX?: number | IQNumberField;
    IS_GENERATED?: boolean | IQBooleanField;
    ALLOCATION_SIZE?: number | IQNumberField;
    NAME?: string | IQStringField;
    NOT_NULL?: boolean | IQBooleanField;
    PRECISION?: number | IQNumberField;
    SCALE?: number | IQNumberField;
    TYPE?: number | IQNumberField;
    SCHEMA_ENTITY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaColumnECreateProperties extends Partial<SchemaColumnEId>, SchemaColumnEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaColumnECreateColumns extends SchemaColumnEId, SchemaColumnEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaColumn extends QVersionedSchemaObject<SchemaColumn> {
    id: IQNumberField;
    index: IQNumberField;
    idIndex: IQNumberField;
    isGenerated: IQBooleanField;
    allocationSize: IQNumberField;
    name: IQStringField;
    notNull: IQBooleanField;
    precision: IQNumberField;
    scale: IQNumberField;
    type: IQNumberField;
    entity: QSchemaEntityQRelation;
    propertyColumns: IQOneToManyRelation<SchemaPropertyColumn, QSchemaPropertyColumn>;
    manyRelationColumns: IQOneToManyRelation<SchemaRelationColumn, QSchemaRelationColumn>;
    oneRelationColumns: IQOneToManyRelation<SchemaRelationColumn, QSchemaRelationColumn>;
}
export interface QSchemaColumnQId extends QVersionedSchemaObjectQId {
    id: IQNumberField;
}
export interface QSchemaColumnQRelation extends QVersionedSchemaObjectQRelation<SchemaColumn, QSchemaColumn>, QSchemaColumnQId {
}
//# sourceMappingURL=qschemacolumn.d.ts.map