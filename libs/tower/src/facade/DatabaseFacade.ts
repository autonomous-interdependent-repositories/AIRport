import {
	DATABASE_FACADE,
	Delete,
	IDatabaseFacade,
	IEntityContext,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFunctionWrapper,
	InsertColumnValues,
	InsertValues,
	IQEntity,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns,
	UpdateColumns,
	UpdateProperties,
} from '@airport/air-control'
import {
	container,
	DI,
	IContext
} from '@airport/di'
import {
	DbEntity,
	EntityRelationType,
	ISaveResult,
	PortableQuery,
	TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control'
import {
	ENTITY_STATE_MANAGER,
	IEntityStateManager
} from '@airport/pressurization'
import {
	DistributionStrategy,
	PlatformType
} from '@airport/terminal-map'

/**
 * Created by Papa on 5/23/2016.
 */
export class DatabaseFacade
	implements IDatabaseFacade {

	name: string

	async addRepository(
		name: string,
		url: string = null,
		platform: PlatformType = PlatformType.GOOGLE_DOCS,
		platformConfig: string = null,
		distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
		context: IContext
	): Promise<number> {
		// TODO: figure out how addRepository will work
		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.addRepository(
			name, url, platform, platformConfig, distributionStrategy, context)
	}

	async insertColumnValues<IQE extends IQEntity<any>>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IContext
	): Promise<number> {
		if (!rawInsertColumnValues) {
			return 0
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		const insertColumnValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertColumnValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValues(portableQuery, context)
	}

	async insertValues<IQE extends IQEntity<any>>(
		rawInsertValues: RawInsertValues<IQE> | { (...args: any[]): RawInsertValues<IQE> },
		context: IContext
	): Promise<number> {
		if (!rawInsertValues) {
			return 0
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValues(portableQuery, context)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity<any>>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertColumnValues) {
			return []
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		const insertValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValuesGetIds(portableQuery, context)
	}

	async insertValuesGenerateIds<IQE extends IQEntity<any>>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		},
		context: IContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertValues) {
			return []
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValuesGetIds(portableQuery, context)
	}

	async deleteWhere<IQE extends IQEntity<any>>(
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		},
		context: IContext
	): Promise<number> {
		if (!rawDelete) {
			return 0
		}
		if (rawDelete instanceof Function) {
			rawDelete = rawDelete()
		}
		let deleteWhere: Delete<IQE> = new Delete(rawDelete)

		let portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			deleteWhere, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.deleteWhere(portableQuery, context)
	}

	async save<E>(
		entity: E,
		dbEntity: DbEntity,
		context: IEntityContext,
	): Promise<ISaveResult> {
		if (!entity) {
			return null
		}
		const [entityStateManager, transactionalConnector]
			= await container(this).get(ENTITY_STATE_MANAGER, TRANSACTIONAL_CONNECTOR)

		this.setOperationState(entity, dbEntity, entityStateManager, new Set())
		const saveResult = await transactionalConnector.save(entity, context)
		this.removeDeletedEntities(entity, dbEntity, saveResult,
			entityStateManager, new Set())

		return saveResult
	}

	private setOperationState<E, T = E | E[]>(
		entity: T,
		dbEntity: DbEntity,
		entityStateManager: IEntityStateManager,
		processedEntities: Set<any>
	): void {
		if (entity instanceof Array) {
			for (let i = entity.length; i >= 0; i--) {
				if (this.removeDeletedEntities(
					entity[i], dbEntity, entityStateManager, processedEntities)) {
					(entity as unknown as E[]).splice(i, 1)
				}
			}
			return !(entity as unknown as E[]).length
		} else {
			if (processedEntities.has(entity)) {
				return entityStateManager.isDeleted(entity)
			}
			processedEntities.add(entity)
			const originalValuesObject: any = entityStateManager
				.getOriginalValues(entity)

			let entityState: EntityState = entity[entityStateManager.getStateFieldName()]
			if (!entity['id']) {
				if (entityState === EntityState.DELETE) {
					throw new Error(
						'Entity is marked for deletion but does not have an "id" property')
				} else {
					entityState = EntityState.CREATE
				}
			}
			for (const propertyName in serializedEntity) {
				const property = entity[propertyName]
				const serializedProperty = serializedEntity[propertyName]
				const originalValue = originalValuesObject[propertyName]
				const propertyState = serializedProperty[entityStateManager.getStateFieldName()]
				if (property instanceof Object) {
					if (property instanceof Array) {
						if (propertyState === EntityState.RESULT_JSON_ARRAY) {
							if (serializedProperty.value != originalValue.value) {
								entityState = EntityState.UPDATE
							}
						} else {
							property.forEach(aProperty => this.setOperationState(
								serializedProperty, aProperty, entityStateManager))
						}
					} else if (propertyState === EntityState.RESULT_DATE) {
						if (serializedProperty.value != originalValue.value) {
							entityState = EntityState.UPDATE
						}
					} else {
						if (propertyState === EntityState.RESULT_JSON) {
							if (serializedProperty.value != originalValue.value) {
								entityState = EntityState.UPDATE
							}
						} else {
							this.setOperationState(
								serializedProperty, property, entityStateManager)
						}
					}
				} else if (property != originalValue) {
					entityState = EntityState.UPDATE
				}
			}
			if (!entityState || entityStateManager.isDeleted(entity)) {
				entityState = EntityState.PARENT_ID
			}
			entity[entityStateManager.getStateFieldName()] = entityState
		}
	}

	private removeDeletedEntities<E, T = E | E[]>(
		entity: T,
		dbEntity: DbEntity,
		saveResult: ISaveResult,
		entityStateManager: IEntityStateManager,
		processedEntities: Set<any>
	): boolean {
		if (entity instanceof Array) {
			for (let i = entity.length; i >= 0; i--) {
				if (this.removeDeletedEntities(
					entity[i], dbEntity, saveResult, entityStateManager, processedEntities)) {
					(entity as unknown as E[]).splice(i, 1)
				}
			}
			return !(entity as unknown as E[]).length
		} else {
			if (processedEntities.has(entity)) {
				return entityStateManager.isDeleted(entity)
			}
			processedEntities.add(entity)
			for (const relation of dbEntity.relations) {
				const relationProperty = relation.property
				const property = entity[relationProperty.name];
				if (!property) {
					continue
				}
				switch (relation.relationType) {
					case EntityRelationType.MANY_TO_ONE:
						if (this.removeDeletedEntities(property, relation.relationEntity,
							saveResult, entityStateManager, processedEntities)) {
							entity[relationProperty.name] = null
						}
						break;
					case EntityRelationType.ONE_TO_MANY:
						this.removeDeletedEntities(property, relation.relationEntity,
							saveResult, entityStateManager, processedEntities)
						break;
				}
			}
			return entityStateManager.isDeleted(entity)
		}
		return false
	}

	/**
	 * Updates an entity with a where clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity<any>>(
		rawUpdate: RawUpdateColumns<IEUC, IQE>
			| {
				(...args: any[]): RawUpdateColumns<IEUC, IQE>
			},
		context: IContext
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}

		let updateColumns: UpdateColumns<any, IQE> = new UpdateColumns(rawUpdate)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			updateColumns, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.updateValues(portableQuery, context)
	}

	async updateWhere<IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity<any>>(
			rawUpdate: RawUpdate<IEUP, IQE> | {
				(...args: any[]): RawUpdate<IEUP, IQE>
			},
			context: IContext
		): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}
		let update: UpdateProperties<any, IQE> = new UpdateProperties(rawUpdate)
		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			update, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.updateValues(portableQuery, context)
	}

	prepare<QF extends Function>(
		queryFunction: QF
	): IFunctionWrapper<QF> {
		return <IFunctionWrapper<QF>><any>new FunctionWrapper<QF>(queryFunction)
	}

}

DI.set(DATABASE_FACADE, DatabaseFacade)

export class FunctionWrapper<QF extends Function>
	implements IFunctionWrapper<any> {

	constructor(queryFunction: QF) {
		throw new Error('Not Implemented')
	}

	find(...params: any[]): any {

	}
}
