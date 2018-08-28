import {
	DbEntity,
	JsonSchemaEntity
}                               from './Entity'
import {SchemaReferenceByIndex} from './Property'

export type DatabaseIndex = number;
export type DomainId = number;
export type DomainName = string;
export type JsonSchemaName = string;
export type SchemaIndex = number;
export type SchemaName = string;
export type SchemaReferenceIndex = number;
export type SchemaVersionId = number;
export type SchemaVersionInteger = number;
export type SchemaVersionMajor = number;
export type SchemaVersionMinor = number;
export type SchemaVersionPatch = number;
export type SchemaVersionString = string;


export interface DbDomain {
	id: DomainId;
	name: DomainName;
	/**
	 * Schemas by index
	 */
	schemas: DbSchema[];
}

/**
 * A schema.
 */
export interface JsonSchema
	extends SchemaReferenceByIndex<SchemaIndex>,
	        JsonDatabaseObject {

	/**
	 * Domain of the schema ('public' if published).
	 */
	domain: DomainName;

	/**
	 * Name of the schema (npm package name).
	 */
	name: JsonSchemaName;
	/**
	 * Versions by integer version
	 */
	versions: JsonSchemaVersion[];

}

/**
 * A schema with additional indexes (maps).
 */
export interface DbSchema
	extends SchemaReferenceByIndex<SchemaIndex>,
	        DbObject {

	currentVersion: DbSchemaVersion;

	/**
	 * Domain of the schema ('public' if published).
	 */
	domain: DbDomain;

	name: SchemaName;

	/**
	 * Versions by integer version
	 */
	versions: DbSchemaVersion[];

}

export interface JsonDatabaseObject {

	deprecatedSinceVersion?: SchemaVersionInteger
	removedInVersion?: SchemaVersionInteger
	sinceVersion: SchemaVersionInteger

}

export interface JsonSchemaVersionReference {

	/**
	 * Integer version of the schema
	 */
	integerVersion: SchemaVersionInteger;

}

export interface JsonSchemaVersion
	extends JsonSchemaVersionReference {

	/**
	 * Semantic version of the schema.
	 */
	versionString: SchemaVersionString;

	/**
	 * Entities by their schema table indexes.
	 */
	entities: JsonSchemaEntity[];

	/**
	 * Schemas, referenced in this schema, by internal index.
	 */
	referencedSchemas: JsonSchema[];

}

export interface DbObject {

	deprecatedSinceVersion?: JsonSchemaVersionReference
	removedInVersion?: JsonSchemaVersionReference
	sinceVersion: JsonSchemaVersionReference

}

export interface DbSchemaVersionReference {

	integerVersion: SchemaVersionInteger;

}

/**
 * A schema with additional indexes (maps).
 */
export interface DbSchemaVersion
	extends DbSchemaVersionReference {

	id: SchemaVersionId;

	/**
	 * Entities by their schema table indexes.
	 */
	entities: DbEntity[];

	/**
	 * Map of all entities by name.
	 */
	entityMapByName?: { [entityName: string]: DbEntity };

	/**
	 * Schemas referenced in this schema, by database index.
	 *
	 */
	references: DbSchemaReference[];

	/**
	 * Schemas referencing in this schema, by database index.
	 *
	 */
	referencedBy: DbSchemaReference[];

	/**
	 * Map of all referenced schemas, by name.
	 */
	referencesMapByName?: { [schemaName: string]: DbSchemaReference };

	/**
	 * Map of all referencing schemas, by name.
	 */
	referencedByMapByName?: { [schemaName: string]: DbSchemaReference };

	versionString: SchemaVersionString;

	majorVersion: SchemaVersionMajor;

	minorVersion: SchemaVersionMinor;

	patchVersion: SchemaVersionPatch;

	schema: DbSchema;

}

export interface DbSchemaReference {

	index: SchemaReferenceIndex;
	ownSchemaVersion: DbSchemaVersion;
	referencedSchemaVersion: DbSchemaVersion;

}

/**
 * A physical database on a given device.  A device can
 * have multiple databases.  For example when loading an old repository
 * that went though a number of incompatible schema upgrades, that
 * repository will have to be loaded in a different database and then
 * upgraded.
 *
 * The default database keeps track of all databases on a device.  Each
 * other database will have only itself as the entry this this table.
 *
 * Each database can have different set of schemas.
 *
 * @externs
 */
export interface DbDatabase {
	name: string;
	schemas: DbSchema[];
	schemaMapByName: { [name: string]: DbSchema };
	storeType: number;
}