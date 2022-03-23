import {
	AIRPORT_DATABASE,
	IAirportDatabase
} from '@airport/air-control';
import {
	ISequenceGenerator,
	SEQUENCE_GENERATOR
} from '@airport/check-in';
import {
	container,
	IContext
} from '@airport/di';
import {
	DbApplication,
	FullApplicationName,
	getFullApplicationName,
	JsonApplication
} from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/security-check';
import {
	DDL_OBJECT_LINKER,
	DDL_OBJECT_RETRIEVER,
	QUERY_ENTITY_CLASS_CREATOR,
	QUERY_OBJECT_INITIALIZER
} from '@airport/takeoff';
import {
	AllDdlObjects,
	IApplicationInitializer,
	IQueryObjectInitializer,
	TERMINAL_STORE
} from '@airport/terminal-map';
import {
	APPLICATION_DAO,
	IApplication
} from '@airport/airspace';
import {
	APPLICATION_BUILDER,
	APPLICATION_CHECKER,
	APPLICATION_COMPOSER,
	APPLICATION_LOCATOR,
	APPLICATION_RECORDER
} from './tokens';

export abstract class ApplicationInitializer
	implements IApplicationInitializer {

	addNewApplicationVersionsToAll(ddlObjects: AllDdlObjects) {
		for (const applicationVersion of ddlObjects.added.applicationVersions) {
			ddlObjects.allApplicationVersionsByIds[applicationVersion.id] = applicationVersion;
		}
	}

	async hydrate(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IContext,
	): Promise<void> {
		const [airDb, queryObjectInitializer, sequenceGenerator] =
			await this.stage(jsonApplications, context);
		// Hydrate all DDL objects and Sequences

		const ddlObjects = await queryObjectInitializer.initialize(airDb);

		this.addNewApplicationVersionsToAll(ddlObjects);

		this.setAirDbApplications(airDb, ddlObjects);

		await sequenceGenerator.initialize();
	}

	/*
	 * Initialization scenarios:
	 *
	 * Brand new install - initialize BLUEPRINT applications
	 * Install new App - initialize New application (and any new dependency applications)
	 * Reload existing install - hydrate all applications
	 * Reload exiting App - nothing to do
	 */

	async initialize(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IContext,
		checkDependencies: boolean,
		loadExistingApplications: boolean
	): Promise<void> {
		const [airDb, applicationDao, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			queryObjectInitializer, applicationBuilder, applicationComposer,
			applicationLocator, applicationRecorder, sequenceGenerator, terminalStore]
			= await container(this).get(AIRPORT_DATABASE, APPLICATION_DAO, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
				QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, APPLICATION_BUILDER,
				APPLICATION_COMPOSER, APPLICATION_LOCATOR, APPLICATION_RECORDER,
				SEQUENCE_GENERATOR, TERMINAL_STORE);

		const applicationsWithValidDependencies = await this.
			getApplicationsWithValidDependencies(jsonApplications, checkDependencies)

		const existingApplicationMap: Map<FullApplicationName, IApplication> = new Map()
		if (loadExistingApplications) {
			const applications = await applicationDao.findAllWithJson()
			for (const application of applications) {
				existingApplicationMap.set(application.fullName, application)
			}
		}

		const newJsonApplicationMap: Map<string, JsonApplicationWithLastIds> = new Map()
		for (const jsonApplication of jsonApplications) {
			const existingApplication = existingApplicationMap.get(getFullApplicationName(jsonApplication))
			if (existingApplication) {
				jsonApplication.lastIds = existingApplication.versions[0].jsonApplication.lastIds
			} else {
				newJsonApplicationMap.set(getFullApplicationName(jsonApplication), jsonApplication);
			}
		}

		let checkedApplicationsWithValidDependencies = []
		for (const jsonApplication of applicationsWithValidDependencies) {
			const existingApplication = existingApplicationMap.get(getFullApplicationName(jsonApplication))
			if (!existingApplication) {
				checkedApplicationsWithValidDependencies.push(jsonApplication)
				await applicationBuilder.build(jsonApplication, existingApplicationMap, newJsonApplicationMap, context);
			}
		}

		const allDdlObjects = await applicationComposer.compose(
			checkedApplicationsWithValidDependencies, ddlObjectRetriever, applicationLocator, {
			terminalStore
		});

		this.addNewApplicationVersionsToAll(allDdlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(
			allDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);

		this.setAirDbApplications(airDb, allDdlObjects);

		const newSequences = await applicationBuilder.buildAllSequences(
			applicationsWithValidDependencies, context);

		await sequenceGenerator.initialize(newSequences);

		await applicationRecorder.record(allDdlObjects.added, context);
	}

	async initializeForAIRportApp(
		jsonApplication: JsonApplicationWithLastIds
	): Promise<void> {
		const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			queryObjectInitializer, applicationComposer, applicationLocator, terminalStore]
			= await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
				QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER,
				APPLICATION_COMPOSER, APPLICATION_LOCATOR, TERMINAL_STORE);

		const applicationsWithValidDependencies = await this.
			getApplicationsWithValidDependencies([jsonApplication], false)

		const ddlObjects = await applicationComposer.compose(
			applicationsWithValidDependencies, ddlObjectRetriever, applicationLocator, {
			deepTraverseReferences: true,
			terminalStore
		})

		this.addNewApplicationVersionsToAll(ddlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(
			ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);

		this.setAirDbApplications(airDb, ddlObjects);
	}

	async stage(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IContext,
	): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]> {
		const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			queryObjectInitializer, applicationBuilder, applicationComposer,
			applicationLocator, sequenceGenerator, terminalStore]
			= await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
				QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, APPLICATION_BUILDER,
				APPLICATION_COMPOSER, APPLICATION_LOCATOR, SEQUENCE_GENERATOR, TERMINAL_STORE);

		// Temporarily Initialize application DDL objects and Sequences to allow for normal hydration

		const tempDdlObjects = await applicationComposer.compose(
			jsonApplications, ddlObjectRetriever, applicationLocator, {
			terminalStore
		});

		this.addNewApplicationVersionsToAll(tempDdlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(
			tempDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);

		this.setAirDbApplications(airDb, tempDdlObjects);

		const newSequences = await applicationBuilder.stageSequences(
			jsonApplications, airDb, context);

		await sequenceGenerator.tempInitialize(newSequences);

		return [airDb, queryObjectInitializer, sequenceGenerator];
	}

	abstract nativeInitializeApplication(
		domain: string,
		application: string,
		fullApplicationName: string,
	): Promise<void>

	protected async wait(
		milliseconds: number
	): Promise<void> {
		return new Promise((resolve, _reject) => {
			setTimeout(() => {
				resolve()
			}, milliseconds)
		})
	}

	private async getApplicationsWithValidDependencies(
		jsonApplications: JsonApplicationWithLastIds[],
		checkDependencies: boolean
	): Promise<JsonApplicationWithLastIds[]> {
		const [applicationChecker, applicationLocator, terminalStore]
			= await container(this).get(APPLICATION_CHECKER, APPLICATION_LOCATOR, TERMINAL_STORE);
		const jsonApplicationsToInstall: JsonApplication[] = [];

		for (const jsonApplication of jsonApplications) {
			await applicationChecker.check(jsonApplication);
			const existingApplication = applicationLocator.locateExistingApplicationVersionRecord(
				jsonApplication, terminalStore);

			if (existingApplication) {
				// Nothing needs to be done, we already have this application version
				continue;
			}
			jsonApplicationsToInstall.push(jsonApplication);
		}

		let applicationsWithValidDependencies;

		if (checkDependencies) {
			const applicationReferenceCheckResults = await applicationChecker
				.checkDependencies(jsonApplicationsToInstall);

			if (applicationReferenceCheckResults.applicationsInNeedOfAdditionalDependencies.length) {
				// const
				for (let i = 0; i < applicationReferenceCheckResults.neededDependencies.length; i++) {
					const neededDependency = applicationReferenceCheckResults.neededDependencies[i]
					const fullApplicationName = getFullApplicationName(neededDependency)

					await this.nativeInitializeApplication(neededDependency.domain, neededDependency.name,
						fullApplicationName)
				}
			}
			applicationsWithValidDependencies = [
				...applicationReferenceCheckResults.applicationsWithValidDependencies,
				...applicationReferenceCheckResults.applicationsInNeedOfAdditionalDependencies
			];
		} else {
			applicationsWithValidDependencies = jsonApplicationsToInstall;
		}

		return applicationsWithValidDependencies
	}

	private setAirDbApplications(
		airDb: IAirportDatabase,
		ddlObjects: AllDdlObjects
	) {
		for (let application of ddlObjects.all.applications) {
			airDb.applications[application.index] = application as DbApplication;
		}
	}

}
