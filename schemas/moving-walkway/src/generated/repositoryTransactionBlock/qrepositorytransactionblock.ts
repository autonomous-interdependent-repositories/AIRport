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
	TerminalECascadeGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from '@airport/travel-document-checkpoint';
import {
	RepositoryECascadeGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	RepositoryTransactionHistoryECascadeGraph,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
} from '@airport/holding-pattern';
import {
	SharingNodeRepoTransBlockECascadeGraph,
	SharingNodeRepoTransBlockEId,
	SharingNodeRepoTransBlockEOptionalId,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockESelect,
	QSharingNodeRepoTransBlock,
	QSharingNodeRepoTransBlockQId,
	QSharingNodeRepoTransBlockQRelation,
} from '../sharingnode/qsharingnoderepotransblock';
import {
	SharingMessageRepoTransBlockECascadeGraph,
	SharingMessageRepoTransBlockEId,
	SharingMessageRepoTransBlockEOptionalId,
	SharingMessageRepoTransBlockEUpdateProperties,
	SharingMessageRepoTransBlockESelect,
	QSharingMessageRepoTransBlock,
	QSharingMessageRepoTransBlockQId,
	QSharingMessageRepoTransBlockQRelation,
} from '../sharingmessage/qsharingmessagerepotransblock';
import {
	MissingRecordRepoTransBlockECascadeGraph,
	MissingRecordRepoTransBlockEId,
	MissingRecordRepoTransBlockEOptionalId,
	MissingRecordRepoTransBlockEUpdateProperties,
	MissingRecordRepoTransBlockESelect,
	QMissingRecordRepoTransBlock,
	QMissingRecordRepoTransBlockQId,
	QMissingRecordRepoTransBlockQRelation,
} from '../missingrecord/qmissingrecordrepotransblock';
import {
	RepoTransBlockSchemaToChangeECascadeGraph,
	RepoTransBlockSchemaToChangeEId,
	RepoTransBlockSchemaToChangeEOptionalId,
	RepoTransBlockSchemaToChangeEUpdateProperties,
	RepoTransBlockSchemaToChangeESelect,
	QRepoTransBlockSchemaToChange,
	QRepoTransBlockSchemaToChangeQId,
	QRepoTransBlockSchemaToChangeQRelation,
} from './qrepotransblockschematochange';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionBlockESelect
    extends IEntitySelectProperties, RepositoryTransactionBlockEOptionalId {
	// Non-Id Properties
	sourceId?: number | IQNumberField;
	hash?: string | IQStringField;
	syncOutcomeType?: number | IQNumberField;
	contents?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	source?: TerminalESelect;
	repository?: RepositoryESelect;
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
	sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockESelect;
	sharingMessageRepoTransBlocks?: SharingMessageRepoTransBlockESelect;
	missingRecordRepoTransBlocks?: MissingRecordRepoTransBlockESelect;
	repoTransBlockSchemasToChange?: RepoTransBlockSchemaToChangeESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTransactionBlockEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTransactionBlockEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTransactionBlockEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	sourceId?: number | IQNumberField;
	hash?: string | IQStringField;
	syncOutcomeType?: number | IQNumberField;
	contents?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	source?: TerminalEOptionalId;
	repository?: RepositoryEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTransactionBlockECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations
	repositoryTransactionHistory?: RepositoryTransactionHistoryECascadeGraph;
	sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockECascadeGraph;
	sharingMessageRepoTransBlocks?: SharingMessageRepoTransBlockECascadeGraph;
	missingRecordRepoTransBlocks?: MissingRecordRepoTransBlockECascadeGraph;
	repoTransBlockSchemasToChange?: RepoTransBlockSchemaToChangeECascadeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionBlockEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SOURCE_ID?: number | IQNumberField;
	HASH?: string | IQStringField;
	SYNC_OUTCOME_TYPE?: number | IQNumberField;
	CONTENTS?: string | IQStringField;
	SOURCE_TERMINAL_ID?: number | IQNumberField;
	REPOSITORY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTransactionBlockECreateProperties
extends Partial<RepositoryTransactionBlockEId>, RepositoryTransactionBlockEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTransactionBlockECreateColumns
extends RepositoryTransactionBlockEId, RepositoryTransactionBlockEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryTransactionBlock extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	sourceId: IQNumberField;
	hash: IQStringField;
	syncOutcomeType: IQNumberField;
	contents: IQStringField;

	// Non-Id Relations
	source: QTerminalQRelation;
	repository: QRepositoryQRelation;
	repositoryTransactionHistory: IQOneToManyRelation<QRepositoryTransactionHistory>;
	sharingNodeRepoTransBlocks: IQOneToManyRelation<QSharingNodeRepoTransBlock>;
	sharingMessageRepoTransBlocks: IQOneToManyRelation<QSharingMessageRepoTransBlock>;
	missingRecordRepoTransBlocks: IQOneToManyRelation<QMissingRecordRepoTransBlock>;
	repoTransBlockSchemasToChange: IQOneToManyRelation<QRepoTransBlockSchemaToChange>;

}


// Entity Id Interface
export interface QRepositoryTransactionBlockQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryTransactionBlockQRelation
	extends IQRelation<QRepositoryTransactionBlock>, QRepositoryTransactionBlockQId {
}

