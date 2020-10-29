import { container, DI } from '@airport/di';
import { ACTIVE_QUERIES, ID_GENERATOR } from '@airport/fuel-hydrant-system';
import { STORE_DRIVER, SyncSchemaMap } from '@airport/ground-control';
import { Q, TRANS_HISTORY_DUO } from '@airport/holding-pattern';
import { TRANSACTION_MANAGER } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export class TransactionManager extends AbstractMutationManager {
    constructor() {
        super(...arguments);
        this.transactionIndexQueue = [];
        this.transactionInProgress = null;
        this.yieldToRunningTransaction = 200;
    }
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    async init(dbName) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        return await storeDriver.initialize(dbName);
        // await this.dataStore.initialize(dbName)
        // await this.repositoryManager.initialize();
    }
    async transact(credentials) {
        const [storeDriver, transHistoryDuo] = await container(this).get(STORE_DRIVER, TRANS_HISTORY_DUO);
        if (!storeDriver.isServer()) {
            if (credentials.domainAndPort === this.transactionInProgress
                || this.transactionIndexQueue.filter(transIndex => transIndex === credentials.domainAndPort).length) {
                // Either just continue using the current transaction
                // or return (domain shouldn't be initiating multiple transactions
                // at the same time
                return;
            }
            this.transactionIndexQueue.push(credentials.domainAndPort);
        }
        while (!this.canRunTransaction(credentials.domainAndPort, storeDriver)) {
            await this.wait(this.yieldToRunningTransaction);
        }
        if (!storeDriver.isServer()) {
            this.transactionIndexQueue = this.transactionIndexQueue.filter(transIndex => transIndex !== credentials.domainAndPort);
            this.transactionInProgress = credentials.domainAndPort;
        }
        let fieldMap = new SyncSchemaMap();
        const transaction = await storeDriver.transact();
        transaction.transHistory = transHistoryDuo.getNewRecord();
        transaction.credentials = credentials;
        return transaction;
    }
    async rollback(transaction) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        if (!storeDriver.isServer() && this.transactionInProgress !== transaction.credentials.domainAndPort) {
            let foundTransactionInQueue = false;
            this.transactionIndexQueue.filter(transIndex => {
                if (transIndex === transaction.credentials.domainAndPort) {
                    foundTransactionInQueue = true;
                    return false;
                }
                return true;
            });
            if (!foundTransactionInQueue) {
                throw new Error(`Could not find transaction '${transaction.credentials.domainAndPort}' is not found`);
            }
            return;
        }
        try {
            await transaction.rollback();
        }
        finally {
            this.clearTransaction();
        }
    }
    async commit(transaction) {
        const [activeQueries, idGenerator, storeDriver] = await container(this).get(ACTIVE_QUERIES, ID_GENERATOR, STORE_DRIVER);
        if (!storeDriver.isServer() && this.transactionInProgress !== transaction.credentials.domainAndPort) {
            throw new Error(`Cannot commit inactive transaction '${transaction.credentials.domainAndPort}'.`);
        }
        try {
            await this.saveRepositoryHistory(transaction.transHistory, idGenerator);
            await transaction.saveTransaction(transaction.transHistory);
            activeQueries.rerunQueries();
            await transaction.commit();
        }
        finally {
            this.clearTransaction();
        }
    }
    // @Transactional()
    // private async recordRepositoryTransactionBlock(
    // 	transaction: IRepositoryTransactionHistory
    // ): Promise<void> {
    // 	if (this.onlineManager.isOnline()) {
    // 		// let repository = transaction.repository;
    // 		transaction.serialize();
    //
    // 		let deltaStore = this.repositoryManager.getDeltaStore(transaction.repository);
    // 		await deltaStore.addChanges(deltaStore.config.changeListConfig, [transaction]);
    //
    // 		transaction.deserialize(
    // 			// repository
    // 		);
    // 		await this.offlineDeltaStore.markChangesAsSynced(transaction.repository,
    // [transaction]);
    // this.queries.markQueriesToRerun(transaction.transactionHistory.schemaMap); } }
    clearTransaction() {
        this.transactionInProgress = null;
        if (this.transactionIndexQueue.length) {
            this.transactionInProgress = this.transactionIndexQueue.shift();
        }
    }
    async saveRepositoryHistory(transaction, idGenerator) {
        if (!transaction.allRecordHistory.length) {
            return false;
        }
        let schemaMap = transaction.schemaMap;
        const transHistoryIds = await idGenerator.generateTransactionHistoryIds(transaction.repositoryTransactionHistories.length, transaction.allOperationHistory.length, transaction.allRecordHistory.length);
        schemaMap.ensureEntity(Q.TransactionHistory.__driver__.dbEntity, true);
        transaction.id = transHistoryIds.transactionHistoryId;
        await this.doInsertValues(Q.TransactionHistory, [transaction]);
        schemaMap.ensureEntity(Q.RepositoryTransactionHistory.__driver__.dbEntity, true);
        transaction.repositoryTransactionHistories.forEach((repositoryTransactionHistory, index) => {
            repositoryTransactionHistory.id = transHistoryIds.repositoryHistoryIds[index];
        });
        await this.doInsertValues(Q.RepositoryTransactionHistory, transaction.repositoryTransactionHistories);
        schemaMap.ensureEntity(Q.OperationHistory.__driver__.dbEntity, true);
        transaction.allOperationHistory.forEach((operationHistory, index) => {
            operationHistory.id = transHistoryIds.operationHistoryIds[index];
        });
        await this.doInsertValues(Q.OperationHistory, transaction.allOperationHistory);
        schemaMap.ensureEntity(Q.RecordHistory.__driver__.dbEntity, true);
        transaction.allRecordHistory.forEach((recordHistory, index) => {
            recordHistory.id = transHistoryIds.recordHistoryIds[index];
        });
        await this.doInsertValues(Q.RecordHistory, transaction.allRecordHistory);
        if (transaction.allRecordHistoryNewValues.length) {
            schemaMap.ensureEntity(Q.RecordHistoryNewValue.__driver__.dbEntity, true);
            await this.doInsertValues(Q.RecordHistoryNewValue, transaction.allRecordHistoryNewValues);
        }
        if (transaction.allRecordHistoryOldValues.length) {
            schemaMap.ensureEntity(Q.RecordHistoryOldValue.__driver__.dbEntity, true);
            await this.doInsertValues(Q.RecordHistoryOldValue, transaction.allRecordHistoryOldValues);
        }
        return true;
    }
    async wait(timeoutMillis) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve();
                }, timeoutMillis);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    canRunTransaction(domainAndPort, storeDriver) {
        if (storeDriver.isServer()) {
            return storeDriver.numFreeConnections() > 0;
        }
        if (this.transactionInProgress) {
            return false;
        }
        return this.transactionIndexQueue[this.transactionIndexQueue.length - 1]
            === domainAndPort;
    }
}
DI.set(TRANSACTION_MANAGER, TransactionManager);
//# sourceMappingURL=TransactionManager.js.map