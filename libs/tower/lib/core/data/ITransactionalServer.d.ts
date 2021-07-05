import { IContext } from '@airport/di';
import { DistributionStrategy, PlatformType, PortableQuery } from '@airport/ground-control';
import { Observable } from 'rxjs';
import { ICredentials } from '@airport/terminal-map';
import { ITransaction } from '../../transaction/ITransaction';
import { IOperationContext } from '../../processing/OperationContext';
export interface ITransactionalServer {
    init(context?: IContext): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, credentials: ICredentials, context: IOperationContext<any, any>): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<Observable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<Observable<E>>;
    insertValues(portableQuery: PortableQuery, transaction: ITransaction, context: IOperationContext<any, any>, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, transaction: ITransaction, context: IOperationContext<any, any>): Promise<number[] | string[] | number[][] | string[][]>;
    updateValues(portableQuery: PortableQuery, transaction: ITransaction, context: IOperationContext<any, any>): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, transaction: ITransaction, context: IOperationContext<any, any>): Promise<number>;
}
//# sourceMappingURL=ITransactionalServer.d.ts.map