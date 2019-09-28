import {
	DbSchema,
	EntityId
}                                    from '@airport/ground-control'
import * as fs                       from 'fs'
import * as ts                       from 'typescript'
import {DaoBuilder}                  from './builder/DaoBuilder'
import {DuoBuilder}                  from './builder/DuoBuilder'
import {EntityInterfaceFileBuilder}  from './builder/entity/EntityInterfaceFileBuilder'
import {QEntityFileBuilder}          from './builder/entity/QEntityFileBuilder'
import {GeneratedFileListingBuilder} from './builder/GeneratedFileListingBuilder'
import {GeneratedSummaryBuilder}     from './builder/GeneratedSummaryBuilder'
import {PathBuilder}                 from './builder/PathBuilder'
import {QSchemaBuilder}              from './builder/QSchemaBuilder'
import {JsonSchemaBuilder}           from './builder/schema/JsonSchemaBuilder'
import {MappedSuperclassBuilder}     from './builder/superclass/MappedSuperclassBuilder'
import {Configuration}               from './options/Options'
import {EntityCandidate}             from './parser/EntityCandidate'
import {generateEntityDefinitions} from './parser/EntityDefinitionGenerator'
import {AirportDatabase} from '@airport/tower'

(AirportDatabase as any).bogus = 'loaded for schema generation'

/**
 * Created by Papa on 3/30/2016.
 */

export function watchFiles(
	configuration: Configuration,
	options: ts.CompilerOptions,
	rootFileNames: string[]
) {
	const files: { [fileName: string]: { version: number } } = {}
	const pathBuilder                                        = new PathBuilder(configuration)

	// initialize the list of files
	rootFileNames.forEach(
		fileName => {
			files[fileName] = {version: 0}
		})

	// Create the language service host to allow the LS to communicate with the host
	const servicesHost: ts.LanguageServiceHost = {
		getCompilationSettings: () => options,
		getScriptFileNames: () => rootFileNames,
		getScriptVersion: (fileName) => files[fileName] && files[fileName].version.toString(),
		getScriptSnapshot: (fileName) => {
			if (!fs.existsSync(fileName)) {
				return undefined
			}

			return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString())
		},
		getCurrentDirectory: () => process.cwd(),
		getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options)
	}

	// Create the language service files
	const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry())

	// First time around, process all files
	processFiles(rootFileNames, options, configuration)

	// Now let's watch the files
	rootFileNames.forEach(
		fileName => {
			// Add a watch on the file to handle next change
			fs.watchFile(fileName,
				{persistent: true, interval: 250},
				(
					curr,
					prev
				) => {
					// Check timestamp
					if (+curr.mtime <= +prev.mtime) {
						return
					}

					// Update the version to signal a change in the file
					files[fileName].version++

					// process file
					processFiles(
						[fileName], options, configuration)
				})
		})

	function processFiles(
		rootFileNames: string[],
		options: ts.CompilerOptions,
		configuration: Configuration
	): void {
		options.target                                                    = ts.ScriptTarget.ES5
		const schemaMapByProjectName: { [projectName: string]: DbSchema } = {}
		let entityMapByName                                               = generateEntityDefinitions(rootFileNames, options, configuration, schemaMapByProjectName)
		emitFiles(entityMapByName, configuration, schemaMapByProjectName)
	}

	function emitFiles(
		entityMapByName: { [entityName: string]: EntityCandidate },
		configuration: Configuration,
		schemaMapByProjectName: { [projectName: string]: DbSchema },
	): void {
		const generatedDirPath = pathBuilder.workingDirPath + '/' + pathBuilder.generatedDirPath
		const schemaPath       = generatedDirPath + '/schema.json'
		const schemaSourcePath = generatedDirPath + '/schema.ts'

		if (!fs.existsSync(generatedDirPath)) {
			fs.mkdirSync(generatedDirPath)
		}

		let schemaString
		if (fs.existsSync(schemaPath)) {
			schemaString = fs.readFileSync(schemaPath, 'utf8')
		}

		const schemaBuilder                     = new JsonSchemaBuilder(
			configuration, entityMapByName, schemaString)
		const [schemaJsonString, indexedSchema] =
			      schemaBuilder.build(configuration.airport.domain, schemaMapByProjectName)

		const schemaSourceString = `export const SCHEMA = `
			+ schemaJsonString + ';'

		fs.writeFileSync(schemaPath, schemaJsonString)
		fs.writeFileSync(schemaSourcePath, schemaSourceString)

		const entityFileReference: { [entityName: string]: string } = {}

		const generatedSummaryBuilder = new GeneratedSummaryBuilder(pathBuilder)
		const entityInterfaceListingBuilder = new GeneratedFileListingBuilder(pathBuilder, 'interfaces.ts')
		const entityQInterfaceListingBuilder = new GeneratedFileListingBuilder(pathBuilder, 'qInterfaces.ts')
		const qSchemaBuilder          = new QSchemaBuilder(pathBuilder)
		const daoBuilder              = new DaoBuilder(pathBuilder)
		const duoBuilder              = new DuoBuilder(pathBuilder)

		for (const entityName in entityMapByName) {
			const entity: EntityCandidate = entityMapByName[entityName]

			const fullGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.path, false)
			const fullQGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.path)
			const qEntityFileBuilder  = new QEntityFileBuilder(entity, fullGenerationPath, pathBuilder,
				entityMapByName, configuration, indexedSchema.entityMapByName[entityName])
			const entityInterfaceFileBuilder  = new EntityInterfaceFileBuilder(entity, fullGenerationPath, pathBuilder,
				entityMapByName, configuration, indexedSchema.entityMapByName[entityName])

			if (!entity.isSuperclass) {
				entityFileReference[entity.docEntry.name] = fullGenerationPath
			}
			entityInterfaceListingBuilder.addFileNameAndPaths(entityName, entity.path, fullGenerationPath)
			entityQInterfaceListingBuilder.addFileNameAndPaths(entityName, entity.path, fullQGenerationPath)
			qSchemaBuilder.addFileNameAndPaths(entityName, entity.path, fullQGenerationPath)

			const sIndexedEntity = indexedSchema.entityMapByName[entityName]

			let tableIndex: EntityId
			if (sIndexedEntity) {
				tableIndex = sIndexedEntity.entity.tableIndex
			}
			daoBuilder.addFileNameAndPaths(tableIndex, entityName, entity.path, fullGenerationPath)
			duoBuilder.addFileNameAndPaths(tableIndex, entityName, entity.path, fullGenerationPath)
			const qGenerationPath     = pathBuilder.setupFileForGeneration(entity.path)
			const generationPath     = pathBuilder.setupFileForGeneration(entity.path, false)
			const qEntitySourceString = qEntityFileBuilder.build()
			fs.writeFileSync(qGenerationPath, qEntitySourceString)
			const entityInterfaceSourceString = entityInterfaceFileBuilder.build()
			fs.writeFileSync(generationPath, entityInterfaceSourceString)
		}
		fs.writeFileSync(daoBuilder.daoListingFilePath, daoBuilder.build())
		fs.writeFileSync(duoBuilder.daoListingFilePath, duoBuilder.build())
		fs.writeFileSync(qSchemaBuilder.qSchemaFilePath, qSchemaBuilder.build(
			configuration.airport.domain,
			indexedSchema.schema.name
		))
		fs.writeFileSync(entityInterfaceListingBuilder.generatedListingFilePath, entityInterfaceListingBuilder.build())
		fs.writeFileSync(entityQInterfaceListingBuilder.generatedListingFilePath, entityQInterfaceListingBuilder.build())
		fs.writeFileSync(generatedSummaryBuilder.generatedListingFilePath, generatedSummaryBuilder.build())

		const mappedSuperclassBuilder = new MappedSuperclassBuilder(
			configuration, entityMapByName)

		const mappedSuperclassPath = generatedDirPath + '/mappedSuperclass.ts'
		fs.writeFileSync(mappedSuperclassPath, mappedSuperclassBuilder.build())
	}

	function emitFile(
		fileName: string
	) {
		let output = services.getEmitOutput(fileName)

		if (!output.emitSkipped) {
			console.log(`Emitting ${fileName}`)
		} else {
			console.log(`Emitting ${fileName} failed`)
			logErrors(fileName)
		}

		output.outputFiles.forEach(
			o => {
				fs.writeFileSync(o.name, o.text, 'utf8')
			})
	}

	function logErrors(
		fileName: string
	) {
		let allDiagnostics = services.getCompilerOptionsDiagnostics()
			.concat(services.getSyntacticDiagnostics(fileName))
			.concat(services.getSemanticDiagnostics(fileName))

		allDiagnostics.forEach(
			diagnostic => {
				let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
				if (diagnostic.file) {
					let {line, character} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
					console.log(`  Error ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`)
				} else {
					console.log(`  Error: ${message}`)
				}
			})
	}
}
