import {
    IEntityContext,
    IQueryContext
} from '@airport/air-control';
import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from '@airport/aviation-communication';
import {
    container,
    DEPENDENCY_INJECTION,
    IContext
} from '@airport/direction-indicator';
import {
    ISaveResult,
    ITransactionalConnector,
    PortableQuery,
    TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control';
import { ITerminalStore, ITransactionalServer, TERMINAL_STORE, TRANSACTIONAL_SERVER } from '@airport/terminal-map';
import { Observable } from 'rxjs';

export class InternalTransactionalConnector
    implements ITransactionalConnector {

    terminalStore: ITerminalStore
    transactionalServer: ITransactionalServer

    callApi<Request, Response>(
        _: ILocalAPIRequest
    ): Promise<ILocalAPIResponse> {
        throw new Error(`InternalTransactionalConnector.callApi should never be called.
Interal Application API requests should be made directly (since
they are internal to the AIRport framework).`)
    }

    async addRepository(
        // url: string,
        // platform: PlatformType,
        // platformConfig: string,
        // distributionStrategy: DistributionStrategy,
        context: IContext
    ): Promise<number> {
        return await this.transactionalServer.addRepository(
            // url,
            // platform,
            // platformConfig,
            // distributionStrategy,
            this.terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context
            }
        )
    }

    async find<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext,
        cachedSqlQueryId?: number,
    ): Promise<EntityArray> {
        return await this.transactionalServer.find(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            },
            cachedSqlQueryId
        );
    }

    async findOne<E>(
        portableQuery: PortableQuery,
        context: IQueryContext,
        cachedSqlQueryId?: number,
    ): Promise<E> {
        return await this.transactionalServer.findOne(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            },
            cachedSqlQueryId
        );
    }

    search<E, EntityArray extends Array<E>>(
        portableQuery: PortableQuery,
        context: IQueryContext,
        cachedSqlQueryId?: number,
    ): Observable<EntityArray> {
        return this.transactionalServer.search(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            },
            cachedSqlQueryId
        );
    }

    searchOne<E>(
        portableQuery: PortableQuery,
        context: IQueryContext,
        cachedSqlQueryId?: number,
    ): Observable<E> {
        return this.transactionalServer.searchOne(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials,
            {
                internal: true,
                ...context as any
            },
            cachedSqlQueryId
        );
    }

    async save<E, T = E | E[]>(
        entity: T,
        context: IEntityContext,
    ): Promise<ISaveResult> {
        return await this.transactionalServer.save(entity,
            this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }

    async saveToDestination<E, T = E | E[]>(
        repositoryDestination: string,
        entity: T,
        context?: IContext,
    ): Promise<ISaveResult> {
        return await this.transactionalServer.saveToDestination(repositoryDestination, entity,
            this.terminalStore.getInternalConnector().internalCredentials, {
                internal: true,
                ...context
            } as any);
    }

    async insertValues(
        portableQuery: PortableQuery,
        context: IContext,
        ensureGeneratedValues?: boolean // For internal use only
    ): Promise<number> {
        return await this.transactionalServer.insertValues(
            portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, ensureGeneratedValues)
    }

    async insertValuesGetIds(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number[][]> {
        return await this.transactionalServer.insertValuesGetIds(portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    async updateValues(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        return await this.transactionalServer.updateValues(portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    async deleteWhere(
        portableQuery: PortableQuery,
        context: IContext,
    ): Promise<number> {
        return await this.transactionalServer.deleteWhere(portableQuery,
            this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        })
    }

    onMessage(callback: (
        message: any
    ) => void) {
        // Nothing to do, onMessage callback was added for demo purposes for Web implementations
    }

}
DEPENDENCY_INJECTION.set(TRANSACTIONAL_CONNECTOR, InternalTransactionalConnector)
TRANSACTIONAL_CONNECTOR.setDependencies({
    terminalStore: TERMINAL_STORE,
    transactionalServer: TRANSACTIONAL_SERVER
})

export function injectTransactionalConnector(): void {
    console.log('Injecting TransactionalConnector')
}
