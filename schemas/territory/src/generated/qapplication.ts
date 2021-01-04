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
	DomainGraph,
	DomainEId,
	DomainEOptionalId,
	DomainEUpdateProperties,
	DomainESelect,
	QDomain,
	QDomainQId,
	QDomainQRelation,
} from './qdomain';
import {
	Domain,
} from '../ddl/Domain';
import {
	ApplicationPackageGraph,
	ApplicationPackageEId,
	ApplicationPackageEOptionalId,
	ApplicationPackageEUpdateProperties,
	ApplicationPackageESelect,
	QApplicationPackage,
	QApplicationPackageQId,
	QApplicationPackageQRelation,
} from './qapplicationpackage';
import {
	ApplicationPackage,
} from '../ddl/ApplicationPackage';
import {
	Application,
} from '../ddl/Application';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationESelect
    extends IEntitySelectProperties, ApplicationEOptionalId {
	// Non-Id Properties
	name?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	domain?: DomainESelect;
	applicationPackages?: ApplicationPackageESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	name?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	domain?: DomainEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationGraph
	extends ApplicationEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	name?: string | IQStringField;

	// Relations
	domain?: DomainGraph;
	applicationPackages?: ApplicationPackageGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NAME?: string | IQStringField;
	DOMAIN_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationECreateProperties
extends Partial<ApplicationEId>, ApplicationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationECreateColumns
extends ApplicationEId, ApplicationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplication extends IQEntity<Application>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	name: IQStringField;

	// Non-Id Relations
	domain: QDomainQRelation;
	applicationPackages: IQOneToManyRelation<ApplicationPackage, QApplicationPackage>;

}


// Entity Id Interface
export interface QApplicationQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationQRelation
	extends IQRelation<Application, QApplication>, QApplicationQId {
}

