import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
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
import {
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';
import {
	Repository,
} from '../../ddl/repository/Repository';
import {
	UserGraph,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from './quser';
import {
	User,
} from '../../ddl/user/User';
import {
	UserRepository,
} from '../../ddl/user/UserRepository';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface UserRepositoryESelect
    extends IEntitySelectProperties, UserRepositoryEOptionalId {
	// Non-Id Properties
	permission?: string | IQStringField;

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	user?: UserESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserRepositoryEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	user: UserEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserRepositoryEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	user?: UserEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserRepositoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	permission?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserRepositoryGraph
	extends UserRepositoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	permission?: string | IQStringField;

	// Relations
	repository?: RepositoryGraph;
	user?: UserGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserRepositoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	PERMISSION?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserRepositoryECreateProperties
extends Partial<UserRepositoryEId>, UserRepositoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserRepositoryECreateColumns
extends UserRepositoryEId, UserRepositoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUserRepository extends IQEntity<UserRepository>
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	user: QUserQRelation;

	// Non-Id Fields
	permission: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QUserRepositoryQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	user: QUserQId;


}

// Entity Relation Interface
export interface QUserRepositoryQRelation
	extends IQRelation<UserRepository, QUserRepository>, QUserRepositoryQId {
}

