import {
	DEPENDENCY_INJECTION,
	IContext
} from '@airport/direction-indicator';
import {
	INTERNAL_DOMAIN,
	IOperationContextLoader,
	ISaveResult,
	PortableQuery
} from '@airport/ground-control';
import { Actor, IActor, Repository_Id } from '@airport/holding-pattern';
import {
	ICredentials,
	IOperationContext,
	IQueryOperationContext,
	ITransaction,
	ITransactionalServer,
	TRANSACTIONAL_SERVER,
	ITransactionContext,
	IApiCallContext,
	ITransactionCredentials,
	ITerminalStore,
	ITransactionManager,
	IOperationManager,
	IInsertManager,
	IDeleteManager,
	IQueryManager,
	IRepositoryManager,
	IUpdateManager
} from '@airport/terminal-map';
import { transactional } from '@airport/tower';
import { Observable } from 'rxjs';

export interface InternalPortableQuery
	extends PortableQuery {
	domainAndPort: string
}

/**
 * Keeps track of transactions, per client and validates that a given
 * transaction belongs to the provided client.  If the connection
 * information matches, passes the transaction for handling.
 *
 * All transactions are queued.  Read operations are not blocked while
 * any transaction is in progress.  Best way to make sure that you get
 * the latest state is to subscribe to a query, which is guaranteed to
 * be updated after data has changed.
 *
 *
 * Should read operations be blocked while transactions are in process?
 * Probably not since they will just get snapshot of the state at any
 * given point in time and transactionality takes care of not exposing
 * inconsistent state.  There doesn't appear to be a need to que-up
 * read transactions, since SqLite can handle it:
 *
 * https://www.skoumal.net/en/parallel-read-and-write-in-sqlite/
 *
 * Also, there doesn't appear to be a reason to prioritize remote transactions
 * over local ones, since ultimately the state needs to sync either way.
 * A single transactional queue should be enough.
 *
 */
export class TransactionalServer
	implements ITransactionalServer {

	deleteManager: IDeleteManager
	insertManager: IInsertManager
	operationManager: IOperationManager
	operationContextLoader: IOperationContextLoader
	queryManager: IQueryManager
	repositoryManager: IRepositoryManager
	terminalStore: ITerminalStore
	transactionManager: ITransactionManager
	updateManager: IUpdateManager

	tempActor: IActor;

	async init(
		context: IContext = {}
	): Promise<void> {
		return await this.transactionManager.initialize('airport', context);
	}

	async addRepository(
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext
	): Promise<Repository_Id> {
		await this.ensureContext(context)

		this.transactionManager.getTransactionFromContextOrCredentials(
			credentials, context)

		const actor = await this.getActor(credentials);

		// FIXME: check actor

		let repositoryId = 0

		await transactional(async () => {
			const repository = await this.repositoryManager.createRepository(
				// url, platform, platformConfig, distributionStrategy
				actor,
				context);
			repositoryId = repository.id
		}, context)

		return repositoryId
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ITransactionCredentials,
		context: IQueryOperationContext & ITransactionContext,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		await this.ensureContext(context)

		if (credentials.transactionId) {
			this.transactionManager.getTransactionFromContextOrCredentials(
				credentials, context)
		}

		return await this.queryManager.find<E, EntityArray>(
			portableQuery, context, cachedSqlQueryId);
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		credentials: ITransactionCredentials,
		context: IQueryOperationContext & ITransactionContext,
		cachedSqlQueryId?: number,
	): Promise<E> {
		await this.ensureContext(context)

		if (credentials.transactionId) {
			this.transactionManager.getTransactionFromContextOrCredentials(
				credentials, context)
		}

		return await this.queryManager.findOne<E>(
			portableQuery, context, cachedSqlQueryId);
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ITransactionCredentials,
		context: IQueryOperationContext & ITransactionContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		this.ensureContextSync(context)

		if (credentials.transactionId) {
			this.transactionManager.getTransactionFromContextOrCredentials(
				credentials, context)
		}

		return this.queryManager.search<E, EntityArray>(
			portableQuery, context);
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		credentials: ITransactionCredentials,
		context: IQueryOperationContext & ITransactionContext,
		cachedSqlQueryId?: number,
	): Observable<E> {
		this.ensureContextSync(context)

		if (credentials.transactionId) {
			this.transactionManager.getTransactionFromContextOrCredentials(
				credentials, context)
		}

		return this.queryManager.searchOne<E>(portableQuery, context);
	}

	async startTransaction(
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext & IApiCallContext
	): Promise<boolean> {
		try {
			await this.ensureContext(context)
			await this.transactionManager.startTransaction(credentials, context)
			return true
		} catch (e) {
			context.errorMessage = e.message
			console.error(e)
			return false
		}
	}

	async commit(
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext & IApiCallContext
	): Promise<boolean> {
		try {
			await this.ensureContext(context)
			await this.transactionManager.commit(credentials, context)
			return true
		} catch (e) {
			console.error(e)
			context.errorMessage = e.message
			return false
		}
	}

	async rollback(
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext & IApiCallContext
	): Promise<boolean> {
		if (context.transaction) {

		}
		try {
			await this.ensureContext(context)
			await this.transactionManager.rollback(credentials, context)
			return true
		} catch (e) {
			console.error(e)
			context.errorMessage = e.message
			return false
		}
	}

	async save<E>(
		entity: E,
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext,
	): Promise<ISaveResult> {
		if (!entity) {
			return null
		}
		await this.ensureContext(context)

		this.transactionManager.getTransactionFromContextOrCredentials(
			credentials, context)

		const actor = await this.getActor(credentials);
		context.actor = actor

		let saveResult: ISaveResult
		await transactional(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			saveResult = await this.operationManager.performSave(
				entity, actor, transaction, context.rootTransaction, context)
		}, context)

		return saveResult
	}

	async saveToDestination<E>(
		repositoryDestination: string,
		entity: E,
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext,
	): Promise<ISaveResult> {
		if (!entity) {
			return null
		}
		await this.ensureContext(context)

		this.transactionManager.getTransactionFromContextOrCredentials(
			credentials, context)

		const actor = await this.getActor(credentials);
		context.actor = actor

		let saveResult: ISaveResult
		await transactional(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			// TODO: save to serialized repository to the specified destination
			saveResult = await this.operationManager.performSave(
				entity, actor, transaction, context.rootTransaction, context)
		}, context)

		return saveResult
	}


	async insertValues(
		portableQuery: PortableQuery,
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext,
		ensureGeneratedValues?: boolean // for internal use only
	): Promise<number> {
		await this.ensureContext(context)

		this.transactionManager.getTransactionFromContextOrCredentials(
			credentials, context)

		const actor = await this.getActor(credentials)

		let numInsertedRecords
		await transactional(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			numInsertedRecords = await this.insertManager.insertValues(
				portableQuery, actor, transaction, context.rootTransaction,
				context, ensureGeneratedValues);
		}, context)

		return numInsertedRecords
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext
	): Promise<number[][]> {
		await this.ensureContext(context)

		this.transactionManager.getTransactionFromContextOrCredentials(
			credentials, context)

		const actor = await this.getActor(credentials)

		let ids
		await transactional(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			ids = await this.insertManager.insertValuesGetIds(
				portableQuery, actor, transaction, context.rootTransaction, context);
		}, context)

		return ids
	}

	async updateValues(
		portableQuery: PortableQuery,
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext
	): Promise<number> {
		await this.ensureContext(context)

		this.transactionManager.getTransactionFromContextOrCredentials(
			credentials, context)

		const actor = await this.getActor(credentials)

		let numUpdatedRecords
		await transactional(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			numUpdatedRecords = await this.updateManager.updateValues(
				portableQuery, actor, transaction, context.rootTransaction, context);
		}, context)

		return numUpdatedRecords
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		credentials: ITransactionCredentials,
		context: IOperationContext & ITransactionContext
	): Promise<number> {
		await this.ensureContext(context)

		this.transactionManager.getTransactionFromContextOrCredentials(
			credentials, context)

		const actor = await this.getActor(credentials)

		let numDeletedRecords
		await transactional(async (
			transaction: ITransaction,
			context: IOperationContext & ITransactionContext
		) => {
			numDeletedRecords = await this.deleteManager.deleteWhere(
				portableQuery, actor, transaction, context.rootTransaction, context);
		}, context)

		return numDeletedRecords
	}

	private async getActor(
		credentials: ICredentials,
	): Promise<IActor> {
		if (this.tempActor) {
			return this.tempActor;
		}
		if (credentials.domain === INTERNAL_DOMAIN) {
			return new Actor()
		}
		let actors: IActor[]
		const actorMapForDomain = this.terminalStore
			.getApplicationActorMapByDomainAndApplicationNames().get(credentials.domain)
		if (actorMapForDomain) {
			actors = actorMapForDomain.get(credentials.application)
		} else {
			throw new Error(
				`No Actors found for
	Domain:
		${credentials.domain}
			`)
		}
		if (!actors) {
			throw new Error(
				`No Actors found for
	Domain:
		${credentials.domain}
	Application:
		${credentials.application}
			`)
		}

		const localTerminal = this.terminalStore.getFrameworkActor().terminal
		if (!localTerminal.isLocal) {
			throw new Error(
				`Expecting terminal of the TerminalStore.frameworkActor to be .isLocal`)
		}

		let actor: IActor
		for (const anActor of actors) {
			if (anActor.terminal.uuId === localTerminal.uuId) {
				actor = anActor
				break
			}
		}
		if (!actor) {
			throw new Error(`Could not find actor for
	Domain:
		${credentials.domain}
	Application:
		${credentials.application}
			`);
		}

		return actor
	}

	private async ensureContext(
		context: IOperationContext
	): Promise<void> {
		await this.operationContextLoader.ensure(context)
	}

	private async ensureContextSync(
		context: IOperationContext
	): Promise<void> {
		this.operationContextLoader.ensureSync(context)
	}

}

DEPENDENCY_INJECTION.set(TRANSACTIONAL_SERVER, TransactionalServer);

export function injectTransactionalServer(): void {
	console.log('Injecting TransactionalServer')
}
