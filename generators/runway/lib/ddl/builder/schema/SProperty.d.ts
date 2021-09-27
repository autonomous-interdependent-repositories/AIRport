import { ColumnIndex, DatabaseForeignKey, DatabaseManyToOneElements, DatabaseOneToManyElements, EntityRelationType, PropertyIndex, SchemaReferenceByIndex } from '@airport/ground-control';
/**
 * A property of an object in a schema.
 */
export interface SProperty {
    /**
     * All columns that the property is represented by.
     */
    columns: SColumn[];
    /**
     * Index of the the property for the entity (parent properties included).
     */
    index: number;
    /**
     * Is this property annotated with @Id
     */
    isId: boolean;
    /**
     * Name of the property.
     */
    name: string;
    /**
     * Relation (if any) represented by the property.
     */
    relation?: SRelation | undefined;
}
/**
 * A schema relation.
 */
export interface SRelation {
    /**
     * Name of the entity behind the relation.
     */
    entityName: string;
    /**
     * Index of the schema of the related entity (if not local).
     */
    referencedSchemaIndex?: number;
    /**
     * Explicitly defined foreign key (if any)
     */
    foreignKey?: DatabaseForeignKey;
    /**
     * Relation index.
     */
    index: number;
    /**
     * Many-to-One configuration object (or 'true' if @ManyToOne but no object is present).
     */
    manyToOne?: DatabaseManyToOneElements;
    /**
     * One-to-Many configuration object (if @OneToMany)
     */
    oneToMany?: DatabaseOneToManyElements;
    /**
     * Type of the relation (Many-to-One or One-to-Many)
     */
    relationType: EntityRelationType;
    /**
     * For @ManyToOne's not annotated with (R)JoinColumn(s)
     */
    relationMustBeSingleIdEntity: boolean;
    /**
     * Does this join automatically join REPOSITORY_ID?
     * Not needed - all joins to and from Repository entities are automatically repository joins
     */
    /**
     * Intermediate representation of relation columns
     */
    sRelationColumns: SRelationColumn[];
}
/**
 * A column in a schema table.
 */
export interface SColumn extends SchemaReferenceByIndex<ColumnIndex> {
    /**
     * How many ids to allocate for a sequence at a time.
     */
    allocationSize?: number;
    /**
     * Verbatim DDL for the column (after the name of the column)
     */
    columnDefinition?: string;
    /**
     * Id Index of the column (if any).
     */
    idIndex?: number;
    /**
     * Is the value for this column generated?
     */
    isGenerated?: boolean;
    /**
     * One-to-Many relations that are mapped to this column.
     */
    /**
     * Name of the column.
     */
    name: string;
    notNull: boolean;
    precision?: number;
    /**
     * Properties that are mapped to this column.
     */
    propertyRefs: PropertyIndex[];
    scale?: number;
    /**
     * Columns related to this one (needed for type assignment only).
     */
    tempColumnTypeLinks?: SColumn[];
    /**
     * Column data type.
     */
    type: 'any' | 'boolean' | 'Date' | 'number' | 'string' | 'Json';
}
export interface SRelationColumn {
    /**
     * This this relation column for the Many-To-One side
     */
    manyToOne: boolean;
    oneSideRelationIndex: number;
    /**
     * Id index in own table (if available)
     */
    /**
     * Name of the column in own table (if available), or id index encoded definition
     */
    ownColumnReference: string;
    /**
     * Id index in related table (if available)
     */
    /**
     * Name of the column in related table (if available), or id index encoded definition
     */
    relationColumnReference: string;
}
//# sourceMappingURL=SProperty.d.ts.map