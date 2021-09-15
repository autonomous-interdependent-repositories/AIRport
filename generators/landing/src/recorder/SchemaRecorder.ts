import {
	AIRPORT_DATABASE,
	IAirportDatabase,
	IDao
}                        from '@airport/air-control'
import {
	container,
	DI,
	IContext
}                        from '@airport/di'
import {DdlObjects}      from '@airport/takeoff'
import {
	DOMAIN_DAO,
	IDomainDao
}                        from '@airport/territory'
import {transactional}   from '@airport/tower'
import {
	ISchemaColumnDao,
	ISchemaDao,
	ISchemaEntityDao,
	ISchemaPropertyColumnDao,
	ISchemaPropertyDao,
	ISchemaReferenceDao,
	ISchemaRelationColumnDao,
	ISchemaRelationDao,
	ISchemaVersionDao,
	SCHEMA_COLUMN_DAO,
	SCHEMA_DAO,
	SCHEMA_ENTITY_DAO,
	SCHEMA_PROPERTY_COLUMN_DAO,
	SCHEMA_PROPERTY_DAO,
	SCHEMA_REFERENCE_DAO,
	SCHEMA_RELATION_COLUMN_DAO,
	SCHEMA_RELATION_DAO,
	SCHEMA_VERSION_DAO,
	SchemaPropertyColumnECreateProperties,
	SchemaReferenceECreateProperties,
	SchemaRelationColumnECreateProperties
}                        from '@airport/traffic-pattern'
import {SCHEMA_RECORDER} from '../tokens'

export interface ISchemaRecorder {

	record(
		ddlObjects: DdlObjects,
		normalOperation: boolean,
		context: IContext
	): Promise<void>

}

export class SchemaRecorder
	implements ISchemaRecorder {

	async record(
		ddlObjects: DdlObjects,
		normalOperation: boolean,
		context: IContext
	): Promise<void> {
		const [airDb, domainDao, schemaColumnDao, schemaDao,
			      schemaEntityDao, schemaPropertyColumnDao, schemaPropertyDao,
			      schemaReferenceDao, schemaRelationColumnDao, schemaRelationDao,
			      schemaVersionDao] = await container(this)
			.get(
				AIRPORT_DATABASE, DOMAIN_DAO, SCHEMA_COLUMN_DAO, SCHEMA_DAO,
				SCHEMA_ENTITY_DAO, SCHEMA_PROPERTY_COLUMN_DAO, SCHEMA_PROPERTY_DAO,
				SCHEMA_REFERENCE_DAO, SCHEMA_RELATION_COLUMN_DAO,
				SCHEMA_RELATION_DAO, SCHEMA_VERSION_DAO
			)

		await transactional(async () => {
			// FIXME: add support for real schema versioning
			this.setDefaultVersioning(ddlObjects)
			if (normalOperation) {
				await this.normalRecord(ddlObjects, domainDao, schemaDao,
					schemaVersionDao, schemaReferenceDao,
					schemaEntityDao, schemaPropertyDao,
					schemaRelationDao, schemaColumnDao,
					schemaPropertyColumnDao, schemaRelationColumnDao, context)
			} else {
				await this.bootstrapRecord(airDb, ddlObjects, domainDao, schemaDao,
					schemaVersionDao, schemaReferenceDao,
					schemaEntityDao, schemaPropertyDao,
					schemaRelationDao, schemaColumnDao,
					schemaPropertyColumnDao, schemaRelationColumnDao, context)
			}
		}, context)
	}

	private async normalRecord(
		ddlObjects: DdlObjects,
		domainDao: IDomainDao,
		schemaDao: ISchemaDao,
		schemaVersionDao: ISchemaVersionDao,
		schemaReferenceDao: ISchemaReferenceDao,
		schemaEntityDao: ISchemaEntityDao,
		schemaPropertyDao: ISchemaPropertyDao,
		schemaRelationDao: ISchemaRelationDao,
		schemaColumnDao: ISchemaColumnDao,
		schemaPropertyColumnDao: ISchemaPropertyColumnDao,
		schemaRelationColumnDao: ISchemaRelationColumnDao,
		context: IContext
	) {
		// await domainDao.save(ddlObjects.domains, context)
		await schemaDao.save(ddlObjects.schemas, context)
		// await schemaVersionDao.save(ddlObjects.schemaVersions, context)
		// await schemaReferenceDao.save(
		// 	ddlObjects.schemaReferences as SchemaReferenceECreateProperties[], context)
		// await schemaEntityDao.save(ddlObjects.entities, context)
		// await schemaPropertyDao.save(ddlObjects.properties, context)
		// await schemaRelationDao.save(ddlObjects.relations, context)
		// await schemaColumnDao.save(ddlObjects.columns, context)
		// await schemaPropertyColumnDao.save(
		// 	ddlObjects.propertyColumns as SchemaPropertyColumnECreateProperties[],
		// 	context)
		// await schemaRelationColumnDao.save(
		// 	ddlObjects.relationColumns as SchemaRelationColumnECreateProperties[],
		// 	context)
	}

	private setDefaultVersioning(
		ddlObjects: DdlObjects,
	) {
		for (const schemaReference of ddlObjects.schemaReferences) {
			schemaReference.deprecatedSinceVersion = null
			schemaReference.removedInVersion       = null
			schemaReference.sinceVersion           = schemaReference.ownSchemaVersion
		}
		for (const entity of ddlObjects.entities) {
			entity.deprecatedSinceVersion = null
			entity.removedInVersion       = null
			entity.sinceVersion           = entity.schemaVersion
		}
		for (const property of ddlObjects.properties) {
			property.deprecatedSinceVersion = null
			property.removedInVersion       = null
			property.sinceVersion           = property.entity.schemaVersion
		}
		for (const relation of ddlObjects.relations) {
			relation.deprecatedSinceVersion = null
			relation.removedInVersion       = null
			relation.sinceVersion           = relation.entity.schemaVersion
		}
		for (const column of ddlObjects.columns) {
			column.deprecatedSinceVersion = null
			column.removedInVersion       = null
			column.sinceVersion           = column.entity.schemaVersion
		}
		for (const propertyColumn of ddlObjects.propertyColumns) {
			propertyColumn.deprecatedSinceVersion = null
			propertyColumn.removedInVersion       = null
			propertyColumn.sinceVersion           = propertyColumn.property.entity.schemaVersion
		}
		for (const relationColumn of ddlObjects.relationColumns) {
			relationColumn.deprecatedSinceVersion = null
			relationColumn.removedInVersion       = null
			relationColumn.sinceVersion           = relationColumn.parentRelation.entity.schemaVersion
		}
	}

	private async bootstrapRecord(
		airDb: IAirportDatabase,
		ddlObjects: DdlObjects,
		domainDao: IDomainDao,
		schemaDao: ISchemaDao,
		schemaVersionDao: ISchemaVersionDao,
		schemaReferenceDao: ISchemaReferenceDao,
		schemaEntityDao: ISchemaEntityDao,
		schemaPropertyDao: ISchemaPropertyDao,
		schemaRelationDao: ISchemaRelationDao,
		schemaColumnDao: ISchemaColumnDao,
		schemaPropertyColumnDao: ISchemaPropertyColumnDao,
		schemaRelationColumnDao: ISchemaRelationColumnDao,
		context: IContext
	) {
		// await this.bulkCreate(domainDao, ddlObjects.domains, context)
		await this.bulkCreate(schemaDao, ddlObjects.schemas, context)
		// await this.bulkCreate(schemaVersionDao, ddlObjects.latestSchemaVersions, context)
		// await this.bulkCreate(schemaReferenceDao,
		// 	ddlObjects.schemaReferences as SchemaReferenceECreateProperties[], context)
		// await this.bulkCreate(schemaEntityDao, ddlObjects.entities, context)
		// await this.bulkCreate(schemaPropertyDao, ddlObjects.properties, context)
		// await this.bulkCreate(schemaRelationDao, ddlObjects.relations, context)
		// await this.bulkCreate(schemaColumnDao, ddlObjects.columns, context)
		// await this.bulkCreate(schemaPropertyColumnDao,
		// 	ddlObjects.propertyColumns as SchemaPropertyColumnECreateProperties[], context)
		// await this.bulkCreate(schemaRelationColumnDao,
		// 	ddlObjects.relationColumns as SchemaRelationColumnECreateProperties[], context)
	}

	private async bulkCreate(
		dao: IDao<any, any, any, any, any, any, any, any>,
		entities: any[],
		context: IContext
	) {
		await dao.save(entities, context)
	}

}

DI.set(SCHEMA_RECORDER, SchemaRecorder)
