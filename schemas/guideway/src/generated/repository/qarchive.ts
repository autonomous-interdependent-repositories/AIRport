import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IEntityDatabaseFacade,
	IEntityFind,
	IEntityFindOne,
	IEntitySearch,
	IEntitySearchOne,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IArchive {
	
	// Id Properties
	id: string;

	// Id Relations

	// Non-Id Properties
	location?: string;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ArchiveESelect
    extends IEntitySelectProperties, ArchiveEOptionalId {
	// Non-Id Properties
	location?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ArchiveEId
    extends IEntityIdProperties {
	// Id Properties
	id: string | IQStringField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ArchiveEOptionalId {
	// Id Properties
	id?: string | IQStringField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ArchiveEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	location?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ArchiveEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	LOCATION?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ArchiveECreateProperties
extends Partial<ArchiveEId>, ArchiveEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ArchiveECreateColumns
extends ArchiveEId, ArchiveEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QArchive extends IQEntity
{
	// Id Fields
	id: IQStringField;

	// Id Relations

	// Non-Id Fields
	location: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QArchiveQId
{
	
	// Id Fields
	id: IQStringField;

	// Id Relations


}

// Entity Relation Interface
export interface QArchiveQRelation
	extends IQRelation<QArchive>, QArchiveQId {
}

