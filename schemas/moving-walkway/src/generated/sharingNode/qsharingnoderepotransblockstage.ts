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
	SharingNodeRepoTransBlockStage,
} from '../../ddl/sharingNode/SharingNodeRepoTransBlockStage';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockStageESelect
    extends IEntitySelectProperties, SharingNodeRepoTransBlockStageEOptionalId {
	// Non-Id Properties
	syncStatus?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeRepoTransBlockStageEId
    extends IEntityIdProperties {
	// Id Properties
	sharingNodeId: number | IQNumberField;
	repositoryTransactionBlockId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeRepoTransBlockStageEOptionalId {
	// Id Properties
	sharingNodeId?: number | IQNumberField;
	repositoryTransactionBlockId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockStageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	syncStatus?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SharingNodeRepoTransBlockStageGraph
	extends SharingNodeRepoTransBlockStageEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	syncStatus?: number | IQNumberField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockStageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SYNC_STATUS?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockStageECreateProperties
extends Partial<SharingNodeRepoTransBlockStageEId>, SharingNodeRepoTransBlockStageEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockStageECreateColumns
extends SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeRepoTransBlockStage extends IQEntity<SharingNodeRepoTransBlockStage>
{
	// Id Fields
	sharingNodeId: IQNumberField;
	repositoryTransactionBlockId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	syncStatus: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSharingNodeRepoTransBlockStageQId
{
	
	// Id Fields
	sharingNodeId: IQNumberField;
	repositoryTransactionBlockId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSharingNodeRepoTransBlockStageQRelation
	extends IQRelation<SharingNodeRepoTransBlockStage, QSharingNodeRepoTransBlockStage>, QSharingNodeRepoTransBlockStageQId {
}

