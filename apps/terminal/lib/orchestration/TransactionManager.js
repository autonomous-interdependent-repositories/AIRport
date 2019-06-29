"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const fuel_hydrant_system_1 = require("@airport/fuel-hydrant-system");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const AbstractMutationManager_1 = require("./AbstractMutationManager");
class TransactionManager extends AbstractMutationManager_1.AbstractMutationManager {
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
    init(dbName) {
        return di_1.DI.get(ground_control_1.STORE_DRIVER).then(storeDriver => storeDriver.initialize(dbName));
        // await this.dataStore.initialize(dbName)
        // await this.repositoryManager.initialize();
    }
    async transact(credentials) {
        const [storeDriver, transHistoryDuo] = await di_1.DI.get(ground_control_1.STORE_DRIVER, holding_pattern_1.TRANS_HISTORY_DUO);
        if (credentials.domainAndPort === this.transactionInProgress
            || this.transactionIndexQueue.filter(transIndex => transIndex === credentials.domainAndPort).length) {
            // Either just continue using the current transaction
            // or return (domain shouldn't be initiating multiple transactions
            // at the same time
            return;
        }
        this.transactionIndexQueue.push(credentials.domainAndPort);
        while (!this.canRunTransaction(credentials.domainAndPort)) {
            await this.wait(this.yieldToRunningTransaction);
        }
        this.transactionIndexQueue = this.transactionIndexQueue.filter(transIndex => transIndex !== credentials.domainAndPort);
        this.transactionInProgress = credentials.domainAndPort;
        let fieldMap = new ground_control_1.SyncSchemaMap();
        this.currentTransHistory = transHistoryDuo.getNewRecord();
        await storeDriver.transact();
    }
    async rollback(credentials) {
        if (this.transactionInProgress !== credentials.domainAndPort) {
            let foundTransactionInQueue = false;
            this.transactionIndexQueue.filter(transIndex => {
                if (transIndex === credentials.domainAndPort) {
                    foundTransactionInQueue = true;
                    return false;
                }
                return true;
            });
            if (!foundTransactionInQueue) {
                throw `Could not find transaction '${credentials.domainAndPort}' is not found`;
            }
            return;
        }
        try {
            await (await di_1.DI.get(ground_control_1.STORE_DRIVER)).rollback();
        }
        finally {
            this.clearTransaction();
        }
    }
    async commit(credentials) {
        const [activeQueries, idGenerator, storeDriver] = await di_1.DI.get(fuel_hydrant_system_1.ACTIVE_QUERIES, fuel_hydrant_system_1.ID_GENERATOR, ground_control_1.STORE_DRIVER);
        if (this.transactionInProgress !== credentials.domainAndPort) {
            throw `Cannot commit inactive transaction '${credentials.domainAndPort}'.`;
        }
        let transaction = this.currentTransHistory;
        try {
            await this.saveRepositoryHistory(transaction, idGenerator);
            await storeDriver.saveTransaction(transaction);
            activeQueries.rerunQueries();
            await storeDriver.commit();
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
        this.currentTransHistory = null;
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
        schemaMap.ensureEntity(holding_pattern_1.Q.TransactionHistory.__driver__.dbEntity, true);
        transaction.id = transHistoryIds.transactionHistoryId;
        await this.doInsertValues(holding_pattern_1.Q.TransactionHistory, [transaction]);
        schemaMap.ensureEntity(holding_pattern_1.Q.RepositoryTransactionHistory.__driver__.dbEntity, true);
        transaction.repositoryTransactionHistories.forEach((repositoryTransactionHistory, index) => {
            repositoryTransactionHistory.id = transHistoryIds.repositoryHistoryIds[index];
        });
        await this.doInsertValues(holding_pattern_1.Q.RepositoryTransactionHistory, transaction.repositoryTransactionHistories);
        schemaMap.ensureEntity(holding_pattern_1.Q.OperationHistory.__driver__.dbEntity, true);
        transaction.allOperationHistory.forEach((operationHistory, index) => {
            operationHistory.id = transHistoryIds.operationHistoryIds[index];
        });
        await this.doInsertValues(holding_pattern_1.Q.OperationHistory, transaction.allOperationHistory);
        schemaMap.ensureEntity(holding_pattern_1.Q.RecordHistory.__driver__.dbEntity, true);
        transaction.allRecordHistory.forEach((recordHistory, index) => {
            recordHistory.id = transHistoryIds.recordHistoryIds[index];
        });
        await this.doInsertValues(holding_pattern_1.Q.RecordHistory, transaction.allRecordHistory);
        if (transaction.allRecordHistoryNewValues.length) {
            schemaMap.ensureEntity(holding_pattern_1.Q.RecordHistoryNewValue.__driver__.dbEntity, true);
            await this.doInsertValues(holding_pattern_1.Q.RecordHistoryNewValue, transaction.allRecordHistoryNewValues);
        }
        if (transaction.allRecordHistoryOldValues.length) {
            schemaMap.ensureEntity(holding_pattern_1.Q.RecordHistoryOldValue.__driver__.dbEntity, true);
            await this.doInsertValues(holding_pattern_1.Q.RecordHistoryOldValue, transaction.allRecordHistoryOldValues);
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
    canRunTransaction(domainAndPort) {
        if (this.transactionInProgress) {
            return false;
        }
        return this.transactionIndexQueue[this.transactionIndexQueue.length - 1]
            === domainAndPort;
    }
}
exports.TransactionManager = TransactionManager;
di_1.DI.set(terminal_map_1.TRANSACTION_MANAGER, TransactionManager);
//# sourceMappingURL=TransactionManager.js.map