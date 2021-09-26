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
	SharingMessageGraph,
	SharingMessageEId,
	SharingMessageEOptionalId,
	SharingMessageEUpdateProperties,
	SharingMessageESelect,
	QSharingMessage,
	QSharingMessageQId,
	QSharingMessageQRelation,
} from '../sharingMessage/qsharingmessage';
import {
	SharingMessage,
} from '../../ddl/sharingMessage/SharingMessage';
import {
	SharingNodeRepoTransBlockGraph,
	SharingNodeRepoTransBlockEId,
	SharingNodeRepoTransBlockEOptionalId,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockESelect,
	QSharingNodeRepoTransBlock,
	QSharingNodeRepoTransBlockQId,
	QSharingNodeRepoTransBlockQRelation,
} from './qsharingnoderepotransblock';
import {
	SharingNodeRepoTransBlock,
} from '../../ddl/sharingNode/SharingNodeRepoTransBlock';
import {
	SharingNode,
} from '../../ddl/sharingNode/SharingNode';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeESelect
    extends IEntitySelectProperties, SharingNodeEOptionalId {
	// Non-Id Properties
	sharingMechanism?: string | IQStringField;
	isActive?: boolean | IQBooleanField;
	syncFrequency?: number | IQNumberField;
	connectionProtocol?: string | IQStringField;
	connectionUrl?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	messages?: SharingMessageESelect;
	sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	sharingMechanism?: string | IQStringField;
	isActive?: boolean | IQBooleanField;
	syncFrequency?: number | IQNumberField;
	connectionProtocol?: string | IQStringField;
	connectionUrl?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SharingNodeGraph
	extends SharingNodeEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	sharingMechanism?: string | IQStringField;
	isActive?: boolean | IQBooleanField;
	syncFrequency?: number | IQNumberField;
	connectionProtocol?: string | IQStringField;
	connectionUrl?: string | IQStringField;

	// Relations
	messages?: SharingMessageGraph[];
	sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SHARING_MECHANISM?: string | IQStringField;
	IS_ACTIVE?: boolean | IQBooleanField;
	SYNC_FREQUENCY?: number | IQNumberField;
	CONNECTION_PROTOCOL?: string | IQStringField;
	CONNECTION_URL?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeECreateProperties
extends Partial<SharingNodeEId>, SharingNodeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeECreateColumns
extends SharingNodeEId, SharingNodeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNode extends IQEntity<SharingNode>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	sharingMechanism: IQStringField;
	isActive: IQBooleanField;
	syncFrequency: IQNumberField;
	connectionProtocol: IQStringField;
	connectionUrl: IQStringField;

	// Non-Id Relations
	messages: IQOneToManyRelation<SharingMessage, QSharingMessage>;
	sharingNodeRepoTransBlocks: IQOneToManyRelation<SharingNodeRepoTransBlock, QSharingNodeRepoTransBlock>;

}


// Entity Id Interface
export interface QSharingNodeQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSharingNodeQRelation
	extends IQRelation<SharingNode, QSharingNode>, QSharingNodeQId {
}

