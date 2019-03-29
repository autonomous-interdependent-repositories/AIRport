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
	IRepositoryEntity,
	RepositoryEntityEId,
	RepositoryEntityEUpdateColumns,
	RepositoryEntityEUpdateProperties,
	RepositoryEntityESelect,
	QRepositoryEntityQId,
	QRepositoryEntityQRelation,
	QRepositoryEntity,
} from '../repository/qrepositoryentity';
import {
	IUser,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from '@airport/travel-document-checkpoint';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IImmutableRepoRow extends IRepositoryEntity {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties
	createdAt?: Date;

	// Non-Id Relations
	user?: IUser;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableRepoRowESelect
    extends RepositoryEntityESelect, ImmutableRepoRowEOptionalId {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	user?: UserESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableRepoRowEId
    extends RepositoryEntityEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableRepoRowEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableRepoRowEUpdateProperties
	extends RepositoryEntityEUpdateProperties {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's
	user?: UserEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableRepoRowEUpdateColumns
	extends RepositoryEntityEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableRepoRowECreateProperties
extends Partial<ImmutableRepoRowEId>, ImmutableRepoRowEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableRepoRowECreateColumns
extends ImmutableRepoRowEId, ImmutableRepoRowEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QImmutableRepoRow extends QRepositoryEntity
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	createdAt: IQDateField;

	// Non-Id Relations
	user: QUserQRelation;

}


// Entity Id Interface
export interface QImmutableRepoRowQId extends QRepositoryEntityQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QImmutableRepoRowQRelation<SubType extends IQEntityInternal>
	extends QRepositoryEntityQRelation<QImmutableRepoRow>, QImmutableRepoRowQId {
}

