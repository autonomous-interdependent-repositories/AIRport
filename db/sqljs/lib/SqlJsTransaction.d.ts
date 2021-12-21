import { IContext } from '@airport/di';
import { ApplicationName, DbEntity, DomainName, FullApplicationName, InternalFragments, IStoreDriver, PortableQuery, QueryType, SQLDataType, StoreType } from '@airport/ground-control';
import { ITransactionHistory } from '@airport/holding-pattern';
import { ICredentials, IOperationContext, ITransaction } from '@airport/terminal-map';
import { Observable } from 'rxjs';
import type { SqlJsDriver } from "./SqlJsDriver";
export declare class SqlJsTransaction implements ITransaction {
    private driver;
    credentials: ICredentials;
    isSync: boolean;
    transHistory: ITransactionHistory;
    type: StoreType;
    constructor(driver: SqlJsDriver);
    commit(): Promise<void>;
    rollback(): Promise<void>;
    saveTransaction(transaction: ITransactionHistory): Promise<any>;
    query(queryType: QueryType, query: string, params: any[], context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    doesTableExist(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    dropTable(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    getEntityTableName(dbEntity: DbEntity, context: IContext): string;
    getTableName(application: {
        domain: DomainName | {
            name: DomainName;
        };
        name: ApplicationName;
        fullName?: FullApplicationName;
    }, table: {
        name: string;
        tableConfig?: {
            name?: string;
        };
    }, context: IContext): string;
    initialize(dbName: string, context: IContext): Promise<any>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Observable<E>;
    transact(transactionalCallback: {
        (transaction: IStoreDriver): Promise<void> | void;
    }, context: IContext): Promise<void>;
    isServer(context?: IContext): boolean;
    deleteWhere(portableQuery: PortableQuery, context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Promise<E>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext): Promise<any[]>;
    insertValues(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<number>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext): Promise<number>;
    isValueValid(value: any, sqlDataType: SQLDataType, context: IOperationContext): boolean;
}
//# sourceMappingURL=SqlJsTransaction.d.ts.map