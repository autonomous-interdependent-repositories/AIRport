import {
	IAirportDatabase,
	ISchemaUtils,
	isStub,
	IUtils,
	MappedEntityArray,
	markAsStub,
	ReferencedColumnData
}                                from '@airport/air-control'
import {
	DbEntity,
	QueryResultType,
	SQLDataType
}                                from '@airport/ground-control'
import {EntityGraphResultParser} from './EntityGraphResultParser'
import {EntityTreeResultParser}  from './EntityTreeResultParser'

/**
 * Created by Papa on 10/16/2016.
 */

declare function require(moduleName: string): any;

export class GraphQueryConfiguration {
	// This is for conflicts on OneToMany references
	strict: boolean = true
	mapped: boolean = true
	// Always fail on no ID - bridged entities must have IDs
	// failOnNoId: boolean = true;
	// Assume there are no conflicts on ManyToOneReferences
	//failOnManyToOneConflicts: boolean = true;
}

export interface IEntityResultParser {

	addEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils
	): any;

	addProperty(
		entityAlias: string,
		resultObject: any,
		dataType: SQLDataType,
		propertyName: string,
		propertyValue: any
	): boolean;

	bufferManyToOneStub(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		relationInfos: ReferencedColumnData[],
		schemaUtils: ISchemaUtils
	): void;

	bufferBlankManyToOneStub(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
		relationInfos: ReferencedColumnData[]
	): void;

	bufferManyToOneObject(
		entityAlias: string,
		dbEntity: DbEntity,
		resultObject: any,
		propertyName: string,
		relationDbEntity: DbEntity,
		relatedEntityId: any,
		schemaUtils: ISchemaUtils
	): void;

	bufferBlankManyToOneObject(
		entityAlias: string,
		resultObject: any,
		propertyName: string,
	): void;

	bufferOneToManyStub(
		otmDbEntity: DbEntity,
		otmPropertyName: string
	): void;

	bufferOneToManyCollection(
		entityAlias: string,
		resultObject: any,
		otmDbEntity: DbEntity,
		propertyName: string,
		relationDbEntity: DbEntity,
		childResultObject: any,
		schemaUtils: ISchemaUtils
	): void;

	bufferBlankOneToMany(
		entityAlias: string,
		resultObject: any,
		otmEntityName: string,
		propertyName: string,
		relationDbEntity: DbEntity,
		schemaUtils: ISchemaUtils
	): void;

	flushEntity(
		entityAlias: string,
		dbEntity: DbEntity,
		selectClauseFragment: any,
		idValue: any,
		resultObject: any,
		schemaUtils: ISchemaUtils
	): any;

	flushRow(): void;

	bridge(
		parsedResults: any[],
		selectClauseFragment: any,
		schemaUtils: ISchemaUtils
	): any[] | MappedEntityArray<any>;

}

export function getObjectResultParser(
	utils: IUtils,
	queryResultType: QueryResultType,
	config?: GraphQueryConfiguration,
	rootDbEntity?: DbEntity,
): IEntityResultParser {
	switch (queryResultType) {
		case QueryResultType.ENTITY_GRAPH:
			let EntityGraphResultParserClass: typeof EntityGraphResultParser = require('./EntityGraphResultParser').EntityGraphResultParser
			return new EntityGraphResultParserClass(config, rootDbEntity)
		case QueryResultType.ENTITY_TREE:
			let EntityTreeResultParserClass: typeof EntityTreeResultParser = require('./EntityTreeResultParser').EntityTreeResultParser
			return new EntityTreeResultParserClass()
		default:
			throw `ObjectQueryParser not supported for QueryResultType: ${queryResultType}`
	}
}

export abstract class AbstractObjectResultParser {

	protected addManyToOneStub(
		resultObject: any,
		propertyName: string,
		relationInfos: ReferencedColumnData[],
		schemaUtils: ISchemaUtils
	): boolean {
		let manyToOneStub = {}
		isStub(manyToOneStub)
		resultObject[propertyName] = manyToOneStub
		let haveAllIds             = true
		relationInfos.forEach((relationInfo) => {
			if (schemaUtils.isIdEmpty(relationInfo.value)) {
				haveAllIds = false
				return
			}
			let lastObject
			let currentObject       = manyToOneStub
			let currentIndex        = 0
			const propertyNameChain = relationInfo.propertyNameChains[0]
			while (currentIndex < propertyNameChain.length) {
				// If there is no object in context, create one
				if (!currentObject) {
					currentObject = {}
					markAsStub(currentObject)
					lastObject[propertyNameChain[currentIndex - 1]] = currentObject
				}
				// If it's not a leaf (more objects in the chain exist)
				if (currentIndex < propertyNameChain.length - 1) {
					lastObject    = currentObject
					currentObject = lastObject[propertyNameChain[currentIndex]]
				} else {
					// Otherwise, just assign the value
					currentObject[propertyNameChain[currentIndex]] = relationInfo.value
				}
				currentIndex++
			}
		})

		return haveAllIds
	}

}
