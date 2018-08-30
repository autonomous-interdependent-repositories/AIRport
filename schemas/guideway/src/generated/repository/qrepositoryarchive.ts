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
	QEntity,
	QRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from './qrepository';
import {
	IArchive,
	ArchiveEId,
	ArchiveEOptionalId,
	ArchiveEUpdateProperties,
	ArchiveESelect,
	QArchive,
	QArchiveQId,
	QArchiveQRelation,
} from './qarchive';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryArchive {
	
	// Id Properties

	// Id Relations
	repository?: IRepository;
	archive?: IArchive;

	// Non-Id Properties

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
export interface RepositoryArchiveESelect
    extends IEntitySelectProperties, RepositoryArchiveEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	archive?: ArchiveESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryArchiveEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	archive: ArchiveEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryArchiveEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	archive?: ArchiveEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryArchiveEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryArchiveEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryArchiveECreateProperties
extends Partial<RepositoryArchiveEId>, RepositoryArchiveEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryArchiveECreateColumns
extends RepositoryArchiveEId, RepositoryArchiveEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryArchive extends QEntity
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	archive: QArchiveQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepositoryArchiveQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	archive: QArchiveQId;


}

// Entity Relation Interface
export interface QRepositoryArchiveQRelation
	extends QRelation<QRepositoryArchive>, QRepositoryArchiveQId {
}

