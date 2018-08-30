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
	IUser,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
	ITerminal,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from '@airport/travel-document-checkpoint';
import {
	IActorApplication,
	ActorApplicationEId,
	ActorApplicationEOptionalId,
	ActorApplicationEUpdateProperties,
	ActorApplicationESelect,
	QActorApplication,
	QActorApplicationQId,
	QActorApplicationQRelation,
} from './qactorapplication';
import {
	IRepositoryActor,
	RepositoryActorEId,
	RepositoryActorEOptionalId,
	RepositoryActorEUpdateProperties,
	RepositoryActorESelect,
	QRepositoryActor,
	QRepositoryActorQId,
	QRepositoryActorQRelation,
} from '../repository/qrepositoryactor';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IActor {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	randomId?: number;

	// Non-Id Relations
	user?: IUser;
	terminal?: ITerminal;
	actorApplications?: IActorApplication[];
	repositoryActor?: IRepositoryActor[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorESelect
    extends IEntitySelectProperties, ActorEOptionalId {
	// Non-Id Properties
	randomId?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	user?: UserESelect;
	terminal?: TerminalESelect;
	actorApplications?: ActorApplicationESelect;
	repositoryActor?: RepositoryActorESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ActorEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ActorEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ActorEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	randomId?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	user?: UserEOptionalId;
	terminal?: TerminalEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	RANDOM_ID?: number | IQNumberField;
	USER_ID?: number | IQNumberField;
	TERMINAL_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ActorECreateProperties
extends Partial<ActorEId>, ActorEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ActorECreateColumns
extends ActorEId, ActorEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QActor extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	randomId: IQNumberField;

	// Non-Id Relations
	user: QUserQRelation;
	terminal: QTerminalQRelation;
	actorApplications: IQOneToManyRelation<QActorApplication>;
	repositoryActor: IQOneToManyRelation<QRepositoryActor>;

}


// Entity Id Interface
export interface QActorQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QActorQRelation
	extends QRelation<QActor>, QActorQId {
}

