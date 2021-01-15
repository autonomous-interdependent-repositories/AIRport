import {
	AIR_DB,
	IAirportDatabase
}                         from '@airport/air-control';
import {
	ISequenceGenerator,
	SEQUENCE_GENERATOR
}                         from '@airport/check-in';
import {
	container,
	DI,
	IContext
}                         from '@airport/di';
import {
	DbSchema,
	JsonSchema
}                         from '@airport/ground-control';
import {
	DDL_OBJECT_LINKER,
	DDL_OBJECT_RETRIEVER,
	DdlObjects,
	IQueryObjectInitializer,
	QUERY_ENTITY_CLASS_CREATOR,
	QUERY_OBJECT_INITIALIZER
}                         from '@airport/takeoff';
import { TERMINAL_STORE } from '@airport/terminal-map';
import {
	SCHEMA_BUILDER,
	SCHEMA_CHECKER,
	SCHEMA_COMPOSER,
	SCHEMA_INITIALIZER,
	SCHEMA_LOCATOR,
	SCHEMA_RECORDER
}                         from './tokens';

export interface ISchemaInitializer {

	initialize(
		jsonSchemas: JsonSchema[],
		context: IContext,
		normalOperation?: boolean
	): Promise<void>

	hydrate(
		jsonSchemas: JsonSchema[],
		context: IContext,
	): Promise<void>

	stage(
		jsonSchemas: JsonSchema[],
		context: IContext,
	): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]>

}

export class SchemaInitializer
	implements ISchemaInitializer {

	addNewSchemaVersionsToAll(ddlObjects: DdlObjects) {
		for (const schemaVersion of ddlObjects.schemaVersions) {
			ddlObjects.allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
		}
	}

	async hydrate(
		jsonSchemas: JsonSchema[],
		context: IContext,
	): Promise<void> {
		const [airDb, queryObjectInitializer, sequenceGenerator] =
			      await this.stage(jsonSchemas, context);
		// Hydrate all DDL objects and Sequences

		const ddlObjects = await queryObjectInitializer.initialize(airDb);

		this.addNewSchemaVersionsToAll(ddlObjects);

		this.setAirDbSchemas(airDb, ddlObjects);

		await sequenceGenerator.initialize();
	}

	async initialize(
		jsonSchemas: JsonSchema[],
		context: IContext,
		normalOperation: boolean = true
	): Promise<void> {
		const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			      queryObjectInitializer, schemaBuilder, schemaChecker, schemaComposer,
			      schemaLocator, schemaRecorder, sequenceGenerator, terminalStore]
			      = await container(this).get(AIR_DB, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
			QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, SCHEMA_BUILDER,
			SCHEMA_CHECKER, SCHEMA_COMPOSER, SCHEMA_LOCATOR, SCHEMA_RECORDER,
			SEQUENCE_GENERATOR, TERMINAL_STORE);

		const jsonSchemasToInstall: JsonSchema[] = [];

		for (const jsonSchema of jsonSchemas) {
			await schemaChecker.check(jsonSchema);
			const existingSchema = schemaLocator.locateExistingSchemaVersionRecord(
				jsonSchema, terminalStore);

			if (existingSchema) {
				// Nothing needs to be done, we already have this schema version
				continue;
			}
			jsonSchemasToInstall.push(jsonSchema);
		}

		let schemasWithValidDependencies;

		if (normalOperation) {
			const schemaReferenceCheckResults = await schemaChecker
				.checkDependencies(jsonSchemasToInstall);

			if (schemaReferenceCheckResults.neededDependencies.length
				|| schemaReferenceCheckResults.schemasInNeedOfAdditionalDependencies.length) {
				throw new Error(`Installing schemas with external dependencies
			is not currently supported.`);
			}
			schemasWithValidDependencies = schemaReferenceCheckResults.schemasWithValidDependencies;
		} else {
			schemasWithValidDependencies = jsonSchemasToInstall;
		}

		for (const jsonSchema of schemasWithValidDependencies) {
			await schemaBuilder.build(jsonSchema, context);
		}

		const ddlObjects = schemaComposer.compose(
			schemasWithValidDependencies, ddlObjectRetriever, schemaLocator, terminalStore);

		if (normalOperation) {
			await schemaRecorder.record(ddlObjects, normalOperation);
		}

		this.addNewSchemaVersionsToAll(ddlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(
			ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);

		this.setAirDbSchemas(airDb, ddlObjects);

		const newSequences = await schemaBuilder.buildAllSequences(
			schemasWithValidDependencies, context);

		await sequenceGenerator.initialize(newSequences);

		if (!normalOperation) {
			await schemaRecorder.record(ddlObjects, normalOperation);
		}
	}

	async stage(
		jsonSchemas: JsonSchema[],
		context: IContext,
	): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]> {
		const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			      queryObjectInitializer, schemaBuilder, schemaComposer,
			      schemaLocator, sequenceGenerator, terminalStore]
			      = await container(this).get(AIR_DB, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
			QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, SCHEMA_BUILDER,
			SCHEMA_COMPOSER, SCHEMA_LOCATOR, SEQUENCE_GENERATOR, TERMINAL_STORE);

		// Temporarily Initialize schema DDL objects and Sequences to allow for normal hydration

		const tempDdlObjects = schemaComposer.compose(
			jsonSchemas, ddlObjectRetriever, schemaLocator, terminalStore);

		this.addNewSchemaVersionsToAll(tempDdlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(
			tempDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);

		this.setAirDbSchemas(airDb, tempDdlObjects);

		const newSequences = await schemaBuilder.stageSequences(
			jsonSchemas, airDb, context);

		await sequenceGenerator.tempInitialize(newSequences);

		return [airDb, queryObjectInitializer, sequenceGenerator];
	}

	private setAirDbSchemas(
		airDb: IAirportDatabase,
		ddlObjects: DdlObjects
	) {
		for (let schema of ddlObjects.allSchemas) {
			airDb.schemas[schema.index] = schema as DbSchema;
		}
	}

}

DI.set(SCHEMA_INITIALIZER, SchemaInitializer);
