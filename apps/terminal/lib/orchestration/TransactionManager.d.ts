import { IContext } from '@airport/di';
import { IStoreDriver, StoreType } from '@airport/ground-control';
import { ICredentials, ITransactionManager } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export declare class TransactionManager extends AbstractMutationManager implements ITransactionManager {
    storeType: StoreType;
    transactionIndexQueue: string[];
    transactionInProgress: string;
    yieldToRunningTransaction: number;
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    init(dbName: string, context: IContext): Promise<void>;
    transact(credentials: ICredentials, transactionalCallback: {
        (transaction: IStoreDriver): Promise<void>;
    }, context: IContext): Promise<void>;
    private rollback;
    private commit;
    private clearTransaction;
    private saveRepositoryHistory;
    private wait;
    private canRunTransaction;
}
//# sourceMappingURL=TransactionManager.d.ts.map