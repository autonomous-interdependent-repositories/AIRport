import {DI}             from '@airport/di'
import {
	getTableName,
	IStoreDriver,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	PropertyReference,
	QueryType,
	STORE_DRIVER,
}                       from '@airport/ground-control'
import {ISchemaBuilder} from './ISchemaBuilder'

export abstract class SqlSchemaBuilder
	implements ISchemaBuilder {

	protected storeDriver: IStoreDriver

	constructor() {
		DI.get((
			storeDriver
		) => {
			this.storeDriver = storeDriver
		}, STORE_DRIVER)
	}

	async build(
		jsonSchema: JsonSchema
	): Promise<void> {
		await this.createSchema(jsonSchema)

		for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
			await this.buildTable(jsonSchema, jsonEntity)
		}
	}

	abstract createSchema(
		jsonSchema: JsonSchema
	): Promise<void>;

	async buildTable(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): Promise<void> {
		const primaryKeyColumnNames: string[] = []
		const tableColumnsDdl: string[]       = jsonEntity.columns.map((
			jsonColumn: JsonSchemaColumn
		) => {
			let columnDdl = `${jsonColumn.name} ${this.getColumnSuffix(jsonSchema, jsonEntity, jsonColumn)}`

			if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
				primaryKeyColumnNames.push(jsonColumn.name)
			}

			return columnDdl
		})

		const createTableSuffix = this.getCreateTableSuffix(jsonSchema, jsonEntity)

		const tableName = getTableName(jsonSchema, jsonEntity)

		let primaryKeySubStatement = ``
		if (primaryKeyColumnNames.length) {
			primaryKeySubStatement = this.getPrimaryKeyStatement(primaryKeyColumnNames)
		}

		const createTableDdl = `CREATE TABLE ${tableName} (
		${tableColumnsDdl.join(',\n')}${primaryKeySubStatement}
		)${createTableSuffix}`

		await this.storeDriver.query(QueryType.DDL, createTableDdl, [], false)

		await this.buildSequences(jsonSchema, jsonEntity)

		for (const indexConfig of jsonEntity.tableConfig.indexes) {
			let uniquePrefix = ''
			if (indexConfig.unique) {
				uniquePrefix = ' UNIQUE'
			}

			const createIndexDdl = `CREATE${uniquePrefix} INDEX ${indexConfig.name}
			ON ${tableName} (
			${indexConfig.columnList.join(', ')}
			)`

			await this.storeDriver.query(QueryType.DDL, createIndexDdl, [], false)
		}
		//
	}

	async buildAllSequences(
		jsonSchemas: JsonSchema[]
	): Promise<void> {
		for (const jsonSchema of jsonSchemas) {
			for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
				await this.buildSequences(jsonSchema, jsonEntity)
			}
		}
	}

	abstract getColumnSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity,
		column: JsonSchemaColumn
	): string

	abstract getCreateTableSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string

	abstract buildSequences(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): Promise<void>


	protected isPrimaryKeyColumn(
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): boolean {
		return jsonColumn.propertyRefs.some((
			propertyRef: PropertyReference
		) => {
			const jsonProperty = jsonEntity.properties[propertyRef.index]

			if (jsonProperty.isId) {
				return true
			}

		})

	}

	/*
	protected abstract isForeignKey(
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): boolean
	*/

	protected getPrimaryKeyStatement(
		columnNames: string[]
	): string {
		return `,
			PRIMARY KEY (
			${columnNames.join(',\n')}
			)`
	}

}
