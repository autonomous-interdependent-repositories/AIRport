import {
	container,
	DEPENDENCY_INJECTION
} from '@airport/direction-indicator';
import {
	AllDdlObjects,
	IQueryObjectInitializer,
	ITerminalStore
} from '@airport/terminal-map';
import {
	IDomain,
	IApplication
} from '@airport/airspace';
import {
	DDL_OBJECT_LINKER,
	DDL_OBJECT_RETRIEVER,
	QUERY_ENTITY_CLASS_CREATOR,
	QUERY_OBJECT_INITIALIZER
} from './tokens';

export class QueryObjectInitializer
	implements IQueryObjectInitializer {

	terminalStore: ITerminalStore

	generateQObjectsAndPopulateStore(
		allDdlObjects: AllDdlObjects
	): void {
		const [ddlObjectLinker, queryEntityClassCreator] = await container(this)
			.get(DDL_OBJECT_LINKER, QUERY_ENTITY_CLASS_CREATOR);
		ddlObjectLinker.link(allDdlObjects, this.terminalStore);
		queryEntityClassCreator.createAll(allDdlObjects.all.applications);
		const lastTerminalState = this.terminalStore.getTerminalState();

		const existingDomainMap = {};
		for (const domain of lastTerminalState.domains) {
			existingDomainMap[domain.name] = domain;
		}
		for (const domain of allDdlObjects.added.domains) {
			delete existingDomainMap[domain.name];
		}
		const unmodifiedDomains: IDomain[] = [];
		for (const domainName in existingDomainMap) {
			unmodifiedDomains.push(existingDomainMap[domainName]);
		}

		const existingApplicationMap = {};
		for (const application of lastTerminalState.applications) {
			existingApplicationMap[application.fullName] = application;
		}
		for (const application of allDdlObjects.added.applications) {
			delete existingApplicationMap[application.fullName];
		}
		const unmodifiedApplications: IApplication[] = [];
		for (const applicationName in existingApplicationMap) {
			unmodifiedApplications.push(existingApplicationMap[applicationName]);
		}

		this.terminalStore.state.next({
			...lastTerminalState,
			domains: [
				...unmodifiedDomains,
				...allDdlObjects.added.domains
			],
			applications: [
				...unmodifiedApplications,
				...allDdlObjects.added.applications
			]
		});
	}

	async initialize(
	): Promise<AllDdlObjects> {
		DDL_OBJECT_RETRIEVER
		const ddlObjects = await ddlObjectRetriever.retrieveDdlObjects();

		const allApplicationVersionsByIds = []

		for (const applicationVersion of ddlObjects.applicationVersions) {
			allApplicationVersionsByIds[applicationVersion.id] = applicationVersion
		}

		let allDdlObjects: AllDdlObjects = {
			all: ddlObjects,
			allApplicationVersionsByIds,
			added: ddlObjects
		}

		this.generateQObjectsAndPopulateStore(allDdlObjects);

		return allDdlObjects;
	}

}

DEPENDENCY_INJECTION.set(QUERY_OBJECT_INITIALIZER, QueryObjectInitializer);
