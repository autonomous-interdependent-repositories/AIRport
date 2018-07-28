"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const moving_walkway_1 = require("@airport/moving-walkway");
const typedi_1 = require("typedi");
const lib_1 = require("zipson/lib");
const InjectionTokens_1 = require("../../../InjectionTokens");
let SyncInRepositoryTransactionBlockCreator = class SyncInRepositoryTransactionBlockCreator {
    constructor(repositoryTransactionBlockDao, missingRecordRepoTransBlockDao, sharingMessageRepoTransBlockDao) {
        this.repositoryTransactionBlockDao = repositoryTransactionBlockDao;
        this.missingRecordRepoTransBlockDao = missingRecordRepoTransBlockDao;
        this.sharingMessageRepoTransBlockDao = sharingMessageRepoTransBlockDao;
    }
    async createRepositoryTransBlocks(dataMessagesWithIncompatibleSchemas, dataMessagesWithIncompatibleData, dataMessagesToBeUpgraded, dataMessagesWithCompatibleSchemasAndData, dataMessagesWithInvalidData) {
        let allRepositoryTransactionBlocks = [];
        const repoTransBlocksNeedingSchemaChanges = this.createRepositoryTransactionBlocks(dataMessagesWithIncompatibleSchemas, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_SCHEMA_CHANGES, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingSchemaChanges);
        const repoTransBlocksNeedingDataUpgrades = this.createRepositoryTransactionBlocks(dataMessagesToBeUpgraded, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_DATA_UPGRADES, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingDataUpgrades);
        const repoTransBlocksNeedingAdditionalData = this.createRepositoryTransactionBlocks(dataMessagesWithIncompatibleData, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_ADDITIONAL_DATA, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingAdditionalData);
        const repoTransBlocksWithInvalidData = this.createRepositoryTransactionBlocks(dataMessagesWithInvalidData, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_INVALID_DATA);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksWithInvalidData);
        const repoTransBlocksWithValidDataAndSchemas = this.createRepositoryTransactionBlocks(dataMessagesWithCompatibleSchemasAndData, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_SUCCESSFUL);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksWithValidDataAndSchemas);
        await this.repositoryTransactionBlockDao.bulkCreate(allRepositoryTransactionBlocks, false, false);
        let allDataToTM = [];
        allDataToTM = allDataToTM.concat(dataMessagesWithIncompatibleSchemas);
        allDataToTM = allDataToTM.concat(dataMessagesWithIncompatibleData);
        allDataToTM = allDataToTM.concat(dataMessagesToBeUpgraded);
        allDataToTM = allDataToTM.concat(dataMessagesWithCompatibleSchemasAndData);
        allDataToTM = allDataToTM.concat(dataMessagesWithInvalidData);
        return allDataToTM;
    }
    createRepositoryTransactionBlocks(dataMessages, syncOutcomeType, recordContents = false) {
        const repositoryTransactionBlocks = [];
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            const repositoryTransactionBlock = {
                contents: recordContents ? lib_1.stringify(data) : null,
                hash: null,
                repository: data.repository,
                source: data.terminal,
                syncOutcomeType,
            };
            dataMessage.repositoryTransactionBlock = repositoryTransactionBlock;
            repositoryTransactionBlocks.push(repositoryTransactionBlock);
        }
        return repositoryTransactionBlocks;
    }
    async createMissingRecordRepoTransBlocks(missingRecordDataToTMs) {
        const missingRecordRepoTransBlocks = missingRecordDataToTMs.map(missingRecordDataToTM => ({
            missingRecord: missingRecordDataToTM.missingRecord,
            repositoryTransactionBlock: missingRecordDataToTM
                .dataMessage.repositoryTransactionBlock
        }));
        await this.missingRecordRepoTransBlockDao.bulkCreate(missingRecordRepoTransBlocks, false, false);
    }
    async createSharingMessageRepoTransBlocks(allDataToTM) {
        const sharingMessageRepoTransBlocks = allDataToTM.map(dataToTM => ({
            sharingMessage: dataToTM.sharingMessage,
            repositoryTransactionBlock: dataToTM.repositoryTransactionBlock
        }));
        await this.sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false, false);
    }
    async recordSharingMessageToHistoryRecords(sharingMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessages, actorMapById) {
        const repoTransHistoryMapByRepositoryId = await this.getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById);
        const repositoryTransactionBlocks = [];
        const sharingMessageRepoTransBlocks = [];
        const repoTransBlockRepoTransHistories = [];
        const transactionHistory = this.transactionManager.currentTransHistory;
        transactionHistory.transactionType = ground_control_1.TransactionType.REMOTE_SYNC;
        // split messages by repository and record actor information
        for (let i = 0; i < dataMessages.length; i++) {
            const sharingMessage = sharingMessages[i];
            const dataMessage = dataMessages[i];
            const data = dataMessage.data;
            const repositoryTransactionBlock = {
                repository: data.repository,
                syncOutcomeType: arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_SUCCESSFUL
            };
            repositoryTransactionBlocks.push(repositoryTransactionBlock);
            sharingMessageRepoTransBlocks.push({
                sharingMessage,
                repositoryTransactionBlock
            });
            transactionHistory.repositoryTransactionHistories
                = transactionHistory.repositoryTransactionHistories.concat(data.repoTransHistories);
            data.repoTransHistories.forEach((repositoryTransactionHistory) => {
                repositoryTransactionHistory.repositoryTransactionType = holding_pattern_1.RepositoryTransactionType.REMOTE;
                repoTransBlockRepoTransHistories.push({
                    repositoryTransactionHistory,
                    repositoryTransactionBlock
                });
                transactionHistory.allOperationHistory = transactionHistory
                    .allOperationHistory.concat(repositoryTransactionHistory.operationHistory);
                repositoryTransactionHistory.operationHistory.forEach((operationHistory) => {
                    transactionHistory.allRecordHistory = transactionHistory
                        .allRecordHistory.concat(operationHistory.recordHistory);
                    operationHistory.recordHistory.forEach((recordHistory) => {
                        transactionHistory.allRecordHistoryNewValues = transactionHistory
                            .allRecordHistoryNewValues.concat(recordHistory.newValues);
                        transactionHistory.allRecordHistoryOldValues = transactionHistory
                            .allRecordHistoryOldValues.concat(recordHistory.oldValues);
                    });
                });
            });
        }
        await this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
        await this.sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false, false);
        await this.repoTransBlockRepoTransHistoryDao.bulkCreate(repoTransBlockRepoTransHistories, false, false);
        return repoTransHistoryMapByRepositoryId;
    }
};
SyncInRepositoryTransactionBlockCreator = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncInRepositoryTransactionBlockCreatorToken),
    __param(0, typedi_1.Inject(moving_walkway_1.RepositoryTransactionBlockDaoToken)),
    __param(1, typedi_1.Inject(moving_walkway_1.MissingRecordRepoTransBlockDaoToken)),
    __param(2, typedi_1.Inject(moving_walkway_1.SharingMessageRepoTransBlockDaoToken)),
    __metadata("design:paramtypes", [Object, Object, Object])
], SyncInRepositoryTransactionBlockCreator);
exports.SyncInRepositoryTransactionBlockCreator = SyncInRepositoryTransactionBlockCreator;
//# sourceMappingURL=SyncInRepositoryTransactionBlockCreator.js.map