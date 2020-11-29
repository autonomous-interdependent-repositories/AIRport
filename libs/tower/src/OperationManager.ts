import {
	and,
	Delete,
	EntityIdData,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	InsertColumnValues,
	InsertValues,
	IQEntity,
	IQOperableFieldInternal,
	ISchemaUtils,
	IUpdateCache,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	UpdateColumns,
	UpdateProperties,
	UpdateRecord,
	valuesEqual
}                          from '@airport/air-control'
import {
	CRUDOperation,
	DbColumn,
	DbEntity,
	DbProperty,
	DbRelation,
	EntityRelationType,
	JSONValueOperation,
	PortableQuery,
	SQLDataType
}                          from '@airport/ground-control'
import {ITransaction}      from './ITransaction'
import {IOperationContext} from './OperationContext'

/**
 * Created by Papa on 11/15/2016.
 */

export interface ResultWithCascade {
	recordChanged?: boolean;
	numberOfAffectedRecords: number;
	cascadeRecords: CascadeRecord[];
}

export interface CascadeRecord {
	relation: DbRelation;
	manyEntities: any[];
}

export interface IOperationManager {

	throwUnexpectedProperty(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	);

}

export abstract class OperationManager
	implements IOperationManager {

	// higherOrderOpsYieldLength: number = 100
	// transactionInProgress: boolean    = false

	throwUnexpectedProperty(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	) {
		throw new Error(
			`Unexpected property value '${value.toString()}' in property '${dbProperty.entity.name}.${dbProperty.name}'
		(column: '${dbColumn.name}').`)
	}

	protected warn(message: string) {
		console.log(message)
	}

	protected async internalInsertColumnValues<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE>,
		transaction: ITransaction,
		ctx: IOperationContext<any, any>
	): Promise<number> {
		const insertColumnValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = ctx.ioc.queryFacade.getPortableQuery(
			insertColumnValues, null, ctx)

		return await ctx.ioc.transactionalServer.insertValues(portableQuery, transaction, ctx)
	}

	protected async internalInsertValues<E, EntityCascadeGraph, IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE>,
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>,
		ensureGeneratedValues?: boolean
	): Promise<number> {
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = ctx.ioc.queryFacade.getPortableQuery(
			insertValues, null, ctx)

		return await ctx.ioc.transactionalServer.insertValues(portableQuery, transaction, ctx, ensureGeneratedValues)
	}

	protected async internalInsertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE>,
		transaction: ITransaction,
		ctx: IOperationContext<any, any>
	): Promise<number[] | string[] | number[][] | string[][]> {

		const insertValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = ctx.ioc.queryFacade.getPortableQuery(
			insertValues, null, ctx)

		return await ctx.ioc.transactionalServer.insertValuesGetIds(portableQuery, transaction, ctx)
	}

	/**
	 * Transactional context must have been started by the time this method is called.
	 *
	 * @param qEntity
	 * @param entity
	 */
	protected async performUpdate<E, EntityCascadeGraph>(
		entity: E,
		operatedOnEntityIndicator: boolean[],
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>,
		originalValue?: E,
	): Promise<number> {
		if (!originalValue) {
			let [isProcessed, entityIdData] = this.isProcessed(
				entity, operatedOnEntityIndicator, ctx.dbEntity, ctx.ioc.schemaUtils)
			if (isProcessed === true) {
				return 0
			}
			if (!entityIdData.idKey) {
				throw new Error(
					`Cannot update ${ctx.dbEntity.name}, not all @Id(s) are set.`)
			}
			originalValue = await this.getOriginalRecord(
				ctx.dbEntity, entity, ctx.ioc.updateCache)
			// if (!originalValue) {
			// 	throw new Error(`Cannot update ${dbEntity.name}, entity not found.`)
			// }
		}
		this.markAsProcessed(entity, operatedOnEntityIndicator)
		let result = await this.internalUpdate(entity,
			originalValue, transaction, ctx)
		await this.cascadeOnPersist(result.cascadeRecords, ctx.dbEntity,
			operatedOnEntityIndicator, transaction, ctx)

		return result.numberOfAffectedRecords
	}

	protected async internalInsertValuesGetIds<E, EntityCascadeGraph, IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE>,
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>
	): Promise<number[] | string[] | number[][] | string[][]> {

		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = ctx.ioc.queryFacade.getPortableQuery(
			insertValues, null, ctx)

		return await ctx.ioc.transactionalServer.insertValuesGetIds(portableQuery, transaction, ctx)
	}

	protected abstract async getOriginalRecord<T>(
		dbEntity: DbEntity,
		entity: T,
		updateCache: IUpdateCache
	): Promise<any>;

	/*
	protected abstract async getOriginalValues(
		entitiesToUpdate: UpdateRecord[],
		dbEntity: DbEntity,
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transactionalServer: ITransactionalServer,
		updateCache: IUpdateCache
	): Promise<MappedEntityArray<any>>;
*/

	/*
	protected getIdsWhereClause(
		entitiesToUpdate: UpdateRecord[],
		qEntity: IQEntity
	): JSONBaseOperation {
		let idsWhereClause: JSONBaseOperation
		if (entitiesToUpdate[0].idData.idColumnValueData.length > 1) {
			let idsWhereClauseFragments = entitiesToUpdate.map((entityToUpdate) => {
				let singleIdWhereClauseFragments: JSONValueOperation[] = entityToUpdate.idData.idColumnValueData.map((
					referencedData: {
						idColumn: DbColumn,
						idValue: number | string,
						propertyNameChains: string[][],
					}) => {
					let currentQObject: any = qEntity
					for (const propertyName of referencedData.propertyNameChains[0]) {
						currentQObject = currentQObject[propertyName]
					}
					return currentQObject.equals(referencedData.idValue)
				})
				return and(...singleIdWhereClauseFragments)
			})
			if (entitiesToUpdate.length > 1) {
				idsWhereClause = or(...idsWhereClauseFragments)
			} else {
				return idsWhereClauseFragments[0]
			}
		} else {
			let idsWhereClauseFragments = entitiesToUpdate.map((entityToUpdate) => {
				return entityToUpdate.idData.idColumnValueData[0].idValue
			})
			let currentQObject: any     = qEntity
			for (const propertyName of entitiesToUpdate[0].idData.idColumnValueData[0].propertyNameChains[0]) {
				currentQObject = currentQObject[propertyName]
			}
			if (entitiesToUpdate.length > 1) {
				idsWhereClause = currentQObject.in(idsWhereClauseFragments)
			} else {
				idsWhereClause = currentQObject.equals(idsWhereClauseFragments[0])
			}
		}

		return idsWhereClause
	}
*/

	protected async internalUpdateColumnsWhere<E, EntityCascadeGraph, IEUC extends IEntityUpdateColumns,
		IQE extends IQEntity>(
		updateColumns: UpdateColumns<IEUC, IQE>,
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {
		const portableQuery: PortableQuery = ctx.ioc.queryFacade.getPortableQuery(
			updateColumns, null, ctx)

		return await ctx.ioc.transactionalServer.updateValues(portableQuery, transaction, ctx)
	}

	protected async internalUpdateWhere<E, EntityCascadeGraph, IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity>(
		update: UpdateProperties<IEUP, IQE>,
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {
		const portableQuery: PortableQuery = ctx.ioc.queryFacade.getPortableQuery(
			update, null, ctx)

		return await ctx.ioc.transactionalServer.updateValues(portableQuery, transaction, ctx)
	}

	/**
	 * Transactional context must have been started by the time this method is called.
	 * @param qEntity
	 * @param entity
	 */
	protected async performDelete<E, EntityCascadeGraph>(
		entity: E,
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {
		return await this.internalDelete(entity, transaction, ctx)

		// Delete cascading is done on the server - there is no new information
		// to pull for this from the client
	}

	protected async internalDeleteWhere<E, EntityCascadeGraph, IQE extends IQEntity>(
		aDelete: Delete<IQE>,
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {
		let portableQuery: PortableQuery = ctx.ioc.queryFacade.getPortableQuery(
			aDelete, null, ctx)

		return await ctx.ioc.transactionalServer.deleteWhere(portableQuery, transaction, ctx)
	}

	private async internalCreate<E, EntityCascadeGraph>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>,
		ensureGeneratedValues?: boolean
	): Promise<ResultWithCascade> {
		const qEntity = ctx.ioc.airDb.qSchemas
			[ctx.dbEntity.schemaVersion.schema.index][ctx.dbEntity.name]

		let rawInsert: RawInsertValues<any> = {
			insertInto: qEntity,
			columns: ctx.ioc.metadataUtils.getAllNonGeneratedColumns(qEntity),
			values: []
		}
		let columnIndexesInValues           = []

		rawInsert.columns.forEach((
			qField: IQOperableFieldInternal<any, any, any, any>,
			index
		) => {
			columnIndexesInValues[qField.dbColumn.index] = index
		})

		let cascadeRecords: CascadeRecord[] = []

		for (const entity of entities) {
			if (ctx.checkIfProcessed && this.isProcessed(
				entity, operatedOnEntityIndicator, ctx.dbEntity, ctx.ioc.schemaUtils)[0] === true) {
				continue
			}
			this.markAsProcessed(entity, operatedOnEntityIndicator)
			let foundValues         = []
			let valuesFragment: any = []

			for (const dbProperty of ctx.dbEntity.properties) {
				let newValue: any = entity[dbProperty.name]
				if (newValue === undefined) {
					newValue = null
				}
				if (dbProperty.relation && dbProperty.relation.length) {
					const dbRelation = dbProperty.relation[0]
					this.assertRelationValueIsAnObject(newValue, dbProperty)
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							this.assertManyToOneNotArray(newValue)
							ctx.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
								dbColumn: DbColumn,
								columnValue: any,
								propertyNameChains: string[][],
							) => {
								if (dbProperty.isId) {
									if (ctx.ioc.schemaUtils.isIdEmpty(columnValue)) {
										throw new Error(
											`non-@GeneratedValue() @Id() ${ctx.dbEntity.name}.${dbProperty.name} 
											must have a value for 'create' operations.`)
									}
								}
								if (ctx.ioc.schemaUtils.isRepositoryId(dbColumn.name)) {
									if (ctx.ioc.schemaUtils.isEmpty(columnValue)) {
										throw new Error(`Repository Id must be specified on an insert`)
									}
								}
								this.columnProcessed(dbProperty, foundValues, dbColumn, columnValue)
								if (dbColumn.isGenerated && dbProperty.isId && columnValue < 0) {
									// Do not insert negative integers for temporary identification
									// within the circular dependency management lookup
									return
								}
								valuesFragment[columnIndexesInValues[dbColumn.index]]
									= columnValue === undefined ? null : columnValue
							}, false)
							// Cascading on manyToOne is not currently implemented, nothing else needs
							// to be done
							continue
						case EntityRelationType.ONE_TO_MANY:
							this.checkCascade(newValue, dbProperty,
								dbRelation, ctx.ioc.schemaUtils, CRUDOperation.CREATE, cascadeRecords)
							break
					}
				} else {
					let column = dbProperty.propertyColumns[0].column
					this.ensureNonRelationalValue(dbProperty, column, newValue)
					if (ctx.ioc.schemaUtils.isRepositoryId(column.name)
						&& ctx.ioc.schemaUtils.isEmpty(newValue)) {
						throw new Error(`Repository Id must be specified on an insert`)
					}
					let addValue = true
					if (column.isGenerated && (newValue !== undefined && newValue !== null)) {
						// Allowing negative integers for temporary identification
						// within the circular dependency management lookup
						if (!dbProperty.isId || newValue >= 0) {
							throw new Error(`@GeneratedValue() "${ctx.dbEntity.name}.${dbProperty.name}" 
							cannot have a value for 'create' operations.`)
						}
						addValue = false
					}
					if (dbProperty.isId) {
						if (!column.isGenerated && ctx.ioc.schemaUtils.isIdEmpty(newValue)) {
							throw new Error(
								`non-@GeneratedValue() @Id() "${ctx.dbEntity.name}.${dbProperty.name}" 
							must have a value for 'create' operations.`)
						}
					}
					if (addValue) {
						this.columnProcessed(dbProperty, foundValues, column, newValue)
						valuesFragment[columnIndexesInValues[column.index]] = newValue
					}
				}
			}
			rawInsert.values.push(valuesFragment)
		}

		let numberOfAffectedRecords = 0

		if (rawInsert.values.length) {
			const generatedColumns = ctx.dbEntity.columns.filter(
				column => column.isGenerated)
			if (generatedColumns.length && ensureGeneratedValues) {
				const idsAndGeneratedValues = await this.internalInsertValuesGetIds(
					rawInsert, transaction, ctx)
				for (let i = 0; i < entities.length; i++) {
					for (const generatedColumn of generatedColumns) {
						// Return index for generated column values is: DbColumn.index
						entities[i][generatedColumn.propertyColumns[0].property.name]
							= idsAndGeneratedValues[i][generatedColumn.index]
					}
				}
				numberOfAffectedRecords = idsAndGeneratedValues.length
			} else {
				numberOfAffectedRecords = await
					this.internalInsertValues(
						rawInsert, transaction, ctx, ensureGeneratedValues)
			}
		}

		return {
			cascadeRecords,
			numberOfAffectedRecords,
		}
	}

	/*
		private checkCascade<EntityCascadeGraph>(
			value: any,
			dbProperty: DbProperty,
			dbRelation: DbRelation,
			schemaUtils: ISchemaUtils,
			crudOperation: CRUDOperation,
			cascadeRecords: CascadeRecord[]
		): boolean {
			this.assertOneToManyIsArray(value)

			if (!schemaUtils.doCascade(dbRelation, crudOperation)) {
				return false
			}

			cascadeRecords.push({
				relation: dbRelation,
				manyEntities: value,
			})

			return true
		}
	*/
	/*
	 Values for the same column could be repeated in different places in the object graph.
	 For example, if the same column is mapped to two different @ManyToOne relations.
	 In this case, when persisting an entity we need to make sure that all values for the
	 entity in question are being persisted.
	 */

	/*
	private columnProcessed(
		dbProperty: DbProperty,
		foundValues: any[],
		dbColumn: DbColumn,
		value: any,
	): boolean {
		// if (value === undefined) {
		// 	throw new Error(`Values cannot be undefined, please use null.`);
		// }
		if (foundValues[dbColumn.index] === undefined) {
			foundValues[dbColumn.index] = value
			return false
		}
		if (!valuesEqual(foundValues[dbColumn.index], value)) {
			throw new Error(
				`Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.index]} !== ${value}`)
		}
		return true
	}
	 */

	private async cascadeOnPersist<E, EntityCascadeGraph>(
		cascadeRecords: CascadeRecord[],
		parentDbEntity: DbEntity,
		operatedOnEntityIndicator: boolean[],
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>
	): Promise<void> {
		if (!cascadeRecords.length) {
			return
		}
		const previousDbEntity = ctx.dbEntity
		for (const cascadeRecord of cascadeRecords) {
			if (!cascadeRecord.relation.oneToManyElems) {
				continue
			}

			const entitiesWithIds: UpdateRecord[] = []
			// const entitiesWithIdMap: { [idKey: string]: UpdateRecord } = {}
			const entitiesWithoutIds: any[]       = []
			const dbEntity                        = cascadeRecord.relation.relationEntity
			ctx.dbEntity                          = dbEntity
			if (cascadeRecord.manyEntities) {
				for (const manyEntity of cascadeRecord.manyEntities) {
					const [isProcessed, entityIdData] = this.isProcessed(manyEntity,
						operatedOnEntityIndicator, dbEntity, ctx.ioc.schemaUtils)
					if (isProcessed === true) {
						return
					}
					const record: UpdateRecord = {
						newValue: manyEntity,
						originalValue: null,
						idData: entityIdData
					}
					if (entityIdData.idKey) {
						entitiesWithIds.push(record)
					} else {
						entitiesWithoutIds.push(manyEntity)
					}
				}
			}
			if (entitiesWithIds.length) {
				// entitiesWithIds.map(entityWithId)
				// updateCache.getEntityUpdateCache()
				// const originalValues = await this.getOriginalValues(
				// 	entitiesWithIds, dbEntity, airDb, fieldUtils,
				// 	queryFacade, queryUtils, schemaUtils,
				// 	transactionalServer, updateCache)
				// for (const idKey in originalValues.dataMap) {
				// 	entitiesWithIdMap[idKey].originalValue = originalValues.dataMap[idKey]
				// }
				for (let i = 0; i < entitiesWithIds.length; i++) {
					let entityToOperateOn = entitiesWithIds[i]
					let originalValue     = ctx.ioc.updateCache.getEntityUpdateCache(entityToOperateOn.originalValue)
					if (!originalValue) {
						if (entityToOperateOn.idData.idColumnValueData.length == 1) {
							// Entity with a single Id always has the @Id generated
							// hence, it must have since been deleted, skip it
							return
						}
						// Don't know if the entity has been deleted or is a brand new one, create it
						// TODO: figure out if the entity has been deleted and if it has, throw an
						// exception?
						await
							this.performCreate(entityToOperateOn.newValue, operatedOnEntityIndicator,
								transaction, ctx, entityToOperateOn.idData)
					} else {
						await this.performUpdate(entityToOperateOn.newValue, operatedOnEntityIndicator, transaction,
							ctx, entityToOperateOn.originalValue)
					}
				}
			}
			for (let i = 0; i < entitiesWithoutIds.length; i++) {
				let entityToCreate = entitiesWithoutIds[i]
				await this.performCreate(entityToCreate, operatedOnEntityIndicator, transaction,
					ctx, entityToCreate.idData)
			}
		}
		ctx.dbEntity = previousDbEntity
	}

	/**
	 * On an update operation, can a nested create contain an update?
	 * Via:
	 *  OneToMany:
	 *    Yes, if the child entity is itself in the update cache
	 *  ManyToOne:
	 *    Cascades do not travel across ManyToOne
	 */
	private async internalUpdate<E, EntityCascadeGraph>(
		entity: E,
		originalEntity: E,
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>
	): Promise<ResultWithCascade> {
		const qEntity                                =
			      ctx.ioc.airDb.qSchemas[ctx.dbEntity.schemaVersion.schema.index][ctx.dbEntity.name]
		const cascadeRecords: CascadeRecord[]        = []
		const setFragment: any                       = {}
		const idWhereFragments: JSONValueOperation[] = []
		let numUpdates                               = 0
		const valuesMapByColumn: any[]               = []

		for (const dbProperty of ctx.dbEntity.properties) {
			const updatedValue = entity[dbProperty.name]
			if (!dbProperty.relation || !dbProperty.relation.length) {
				const dbColumn = dbProperty.propertyColumns[0].column
				this.ensureNonRelationalValue(dbProperty, dbColumn, updatedValue)
				if (this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, updatedValue)) {
					continue
				}
				const originalValue = originalEntity[dbColumn.name]
				if (dbProperty.isId) {
					// For an id property, the value is guaranteed to be the same (and not empty) -
					// cannot entity-update id fields
					idWhereFragments.push((<any>qEntity)[dbProperty.name].equals(updatedValue))
				} else if (!valuesEqual(originalValue, updatedValue)) {
					setFragment[dbColumn.name] = updatedValue
					numUpdates++
				}
				continue
			}
			// It's a relation property
			this.assertRelationValueIsAnObject(updatedValue, dbProperty)
			const dbRelation = dbProperty.relation[0]
			switch (dbRelation.relationType) {
				case EntityRelationType.MANY_TO_ONE:
					this.assertManyToOneNotArray(updatedValue)
					ctx.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
						dbColumn: DbColumn,
						value: any,
						propertyNameChains: string[][],
					) => {
						if (this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, value)) {
							return
						}
						let originalValue = originalEntity[dbColumn.name]
						if (dbProperty.isId) {
							let idQProperty = qEntity
							for (const propertyNameLink of propertyNameChains[0]) {
								idQProperty = idQProperty[propertyNameLink]
							}
							// For an id property, the value is guaranteed to be the same (and not
							// empty) - cannot entity-update id fields
							idWhereFragments.push(idQProperty.equals(value))
						} else if (!valuesEqual(originalValue, value)) {
							setFragment[dbColumn.name] = value
							numUpdates++
						}
					}, dbProperty.isId)
					// Cascading on manyToOne is not currently implemented, nothing else needs to
					// be done
					continue
				case EntityRelationType.ONE_TO_MANY:
					this.checkCascade(updatedValue, dbProperty,
						dbRelation, ctx.ioc.schemaUtils, CRUDOperation.UPDATE, cascadeRecords)
					break
			}
		}

		let numberOfAffectedRecords = 0
		if (numUpdates) {
			let whereFragment
			if (idWhereFragments.length > 1) {
				whereFragment = and(...idWhereFragments)
			} else {
				whereFragment = idWhereFragments[0]
			}
			let rawUpdate                          = {
				update: qEntity,
				set: setFragment,
				where: whereFragment
			}
			let update: UpdateProperties<any, any> =
				    new UpdateProperties(rawUpdate)

			numberOfAffectedRecords = await this.internalUpdateWhere(update, transaction, ctx)
		}
		return {
			recordChanged: !!numUpdates,
			numberOfAffectedRecords: numberOfAffectedRecords,
			cascadeRecords: cascadeRecords
		}
	}

	private ensureNonRelationalValue(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	) {
		if (value === undefined || value === null) {
			return
		}
		switch (dbColumn.type) {
			case SQLDataType.ANY:
				break
			case SQLDataType.BOOLEAN:
				if (typeof value !== 'boolean') {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.DATE:
				if (typeof value !== 'object' || !(value instanceof Date)) {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.JSON:
				if (typeof value !== 'object' || value instanceof Date) {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.NUMBER:
				if (typeof value !== 'number') {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.STRING:
				if (typeof value !== 'string') {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
		}
	}

	/*
	private assertRelationValueIsAnObject(
		relationValue: any,
		dbProperty: DbProperty,
	): void {
		if (relationValue !== null && relationValue !== undefined &&
			(typeof relationValue != 'object' || relationValue instanceof Date)
		) {
			throw new Error(
				`Unexpected value in relation property: ${dbProperty.name}, 
				of entity ${dbProperty.entity.name}`)
		}
	}

	private assertManyToOneNotArray(
		relationValue: any
	): void {
		if (relationValue instanceof Array) {
			throw new Error(`@ManyToOne relation cannot be an array`)
		}
	}

	private assertOneToManyIsArray(
		relationValue: any
	): void {
		if (relationValue !== null
			&& relationValue !== undefined
			&& !(relationValue instanceof Array)) {
			throw new Error(`@OneToMany relation must be an array`)
		}
	}
	 */

	private markAsProcessed<E>(
		entity: E,
		operatedOnEntityIndicator: boolean[]
	): void {
		const operationUniqueId                      = getOperationUniqueId(entity)
		operatedOnEntityIndicator[operationUniqueId] = true
	}

	/**
	 * TODO: the client should identify all entities (makes sense since it has an interlinked
	 * graph before serialization) and they all should come in marked already.  Then its a
	 * matter of checking those markings on the server.
	 * @param entity
	 * @param operatedOnEntityMap
	 * @param dbEntity
	 * @param schemaUtils
	 * @private
	 */
	private isProcessed<E>(
		entity: E,
		// This is a per-operation map (for a single update or create or delete with cascades)
		operatedOnEntityIndicator: boolean[],
		dbEntity: DbEntity,
		schemaUtils: ISchemaUtils
	): [boolean, EntityIdData] {
		if (isStub(entity)) {
			return [true, null]
		}

		if (!dbEntity.idColumns.length) {
			throw new Error(
				`Cannot run 'create'|'bulkCreate'|'update' for entity '${dbEntity.name}' with no @Id(s).
			Please use 'insert'|'updateWhere' instead.`)
		}

		const entityIdData: EntityIdData = {
			idColumnValueData: [],
			idKey: null
		}

		const operationUniqueId = getOperationUniqueId(entity)
		const entityOperatedOn  = !!operatedOnEntityIndicator[operationUniqueId]

		// Attempt to get the id, allowing for non-ided entities,
		// fail if (part of) an id is empty.
		const idKey        = schemaUtils.getIdKey(entity, dbEntity,
			false, (
				idColumn: DbColumn,
				idValue: number | string,
				propertyNameChains: string[][],
			) => {
				entityIdData.idColumnValueData.push({
					idColumn,
					idValue,
					propertyNameChains,
				})
			})
		entityIdData.idKey = idKey
		if (!idKey) {
			return [entityOperatedOn, entityIdData]
		}

		if (!entityOperatedOn) {
			return [entityOperatedOn, entityIdData]
		}

		// if (entityOperatedOn) {
		// 	// The Update operation for this entity was already recorded, nothing to do
		return [entityOperatedOn, null]
		// }

		// // If it's new entity, not in cache
		// let hasNonIdProperties = false
		// for (let propertyName in entity) {
		// 	if (!dbEntity.idColumnMap[propertyName]
		// 		&& entity.hasOwnProperty(propertyName)) {
		// 		hasNonIdProperties = true
		// 		break
		// 	}
		// }
		// // If there is at least one non-id property set, then it's not an id-stub
		// if (hasNonIdProperties) {
		// 	throw new Error(
		// 		`More than one non-id-stub instance of '${dbEntity.name}'
		// 		with @Id(s) value '${entityIdData.idKey}' during mutation operation`)
		// }
		//
		// // The Update operation for this entity was already recorded, nothing to do
		// return [entityOperatedOn, null]
	}

	private async internalDelete<E, EntityCascadeGraph>(
		entity: E,
		transaction: ITransaction,
		ctx: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {

		const dbEntity                               = ctx.dbEntity
		const qEntity                                =
			      ctx.ioc.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
		const idWhereFragments: JSONValueOperation[] = []
		const valuesMapByColumn: any[]               = []
		for (let propertyName in entity) {
			if (!entity.hasOwnProperty(propertyName)) {
				continue
			}
			const dbProperty = dbEntity.propertyMap[propertyName]
			// Skip transient fields
			if (!dbProperty) {
				continue
			}
			const deletedValue = entity[propertyName]

			let dbRelation
			if (dbProperty.relation && dbProperty.relation.length) {
				dbRelation = dbProperty.relation[0]
			}
			if (!dbRelation) {
				// If the property is not a transient field and not a relation
				const dbColumn = dbProperty.propertyColumns[0].column
				this.ensureNonRelationalValue(dbProperty, dbColumn, deletedValue)
				if (this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, deletedValue)) {
					continue
				}
				if (dbProperty.isId) {
					// For an id property, the value is guaranteed to be the same (and not empty) -
					// cannot entity-update id fields
					idWhereFragments.push((<any>qEntity)[propertyName].equals(deletedValue))
				}
				continue
			}

			this.assertRelationValueIsAnObject(deletedValue, dbProperty)
			switch (dbRelation.relationType) {
				case EntityRelationType.MANY_TO_ONE:
					this.assertManyToOneNotArray(deletedValue)
					ctx.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, dbEntity, (
						dbColumn: DbColumn,
						value: any,
						propertyNameChains: string[][]
					) => {
						if (dbProperty.isId && valuesMapByColumn[dbColumn.index] === undefined) {
							if (ctx.ioc.schemaUtils.isIdEmpty(value)) {
								throw new Error(`Required Id value is missing in:
								'${dbEntity.name}.${propertyNameChains.join('.')}'`)
							}
							let idQProperty = qEntity
							for (const propertyNameLink of propertyNameChains[0]) {
								idQProperty = idQProperty[propertyNameLink]
							}
							// For an id property, the value is guaranteed to be the same (and not
							// empty) - cannot entity-update id fields
							idWhereFragments.push(idQProperty.equals(value))
						}
						this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, value)
					}, false)
					// Cascading on manyToOne is not currently implemented, nothing else needs to
					// be done
					break
				case EntityRelationType.ONE_TO_MANY:
					// Delete cascading is done on the server - there is no new information
					// to pull for this from the client
					break
				default:
					throw new Error(
						`Unknown relationType '${dbRelation.relationType}' 
						for '${dbEntity.name}.${dbProperty.name}'.`)
			}
		}

		let idWhereClause
		if (idWhereFragments.length > 1) {
			idWhereClause = and(...idWhereFragments)
		} else {
			idWhereClause = idWhereFragments[0]
		}

		let rawDelete: RawDelete<any> = {
			deleteFrom: qEntity,
			where: idWhereClause
		}
		let deleteWhere: Delete<any>  = new Delete(rawDelete)
		return await this.internalDeleteWhere(deleteWhere, transaction, ctx)
	}

}
