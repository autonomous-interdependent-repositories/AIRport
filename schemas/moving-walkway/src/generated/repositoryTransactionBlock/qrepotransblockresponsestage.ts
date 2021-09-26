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
	RepoTransBlockResponseStage,
} from '../../ddl/repositoryTransactionBlock/RepoTransBlockResponseStage';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransBlockResponseStageESelect
    extends IEntitySelectProperties, RepoTransBlockResponseStageEOptionalId {
	// Non-Id Properties
	syncOutcomeType?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepoTransBlockResponseStageEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepoTransBlockResponseStageEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepoTransBlockResponseStageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	syncOutcomeType?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepoTransBlockResponseStageGraph
	extends RepoTransBlockResponseStageEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	syncOutcomeType?: string | IQStringField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransBlockResponseStageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SYNC_OUTCOME_TYPE?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepoTransBlockResponseStageECreateProperties
extends Partial<RepoTransBlockResponseStageEId>, RepoTransBlockResponseStageEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransBlockResponseStageECreateColumns
extends RepoTransBlockResponseStageEId, RepoTransBlockResponseStageEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransBlockResponseStage extends IQEntity<RepoTransBlockResponseStage>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	syncOutcomeType: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepoTransBlockResponseStageQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepoTransBlockResponseStageQRelation
	extends IQRelation<RepoTransBlockResponseStage, QRepoTransBlockResponseStage>, QRepoTransBlockResponseStageQId {
}

