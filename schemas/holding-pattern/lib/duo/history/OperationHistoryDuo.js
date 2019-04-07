"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class OperationHistoryDuo extends generated_1.BaseOperationHistoryDuo {
    constructor() {
        super();
        di_1.DI.get((recordHistoryDuo) => {
            this.recHistoryDuo = recordHistoryDuo;
        }, diTokens_1.REC_HISTORY_DUO);
    }
    getNewRecord(entityChangeType, dbEntity, repositoryTransactionHistory) {
        let operationHistory = {
            repositoryTransactionHistory: repositoryTransactionHistory,
            changeType: entityChangeType,
            orderNumber: ++repositoryTransactionHistory.transactionHistory.numberOfOperations,
            entity: dbEntity
        };
        return operationHistory;
    }
    sort(ew1, ew2) {
        let startId1 = ew1.orderNumber;
        let startId2 = ew2.orderNumber;
        if (startId1 > startId2) {
            return 1;
        }
        if (startId2 > startId1) {
            return -1;
        }
        return 0;
    }
    startRecordHistory(operationHistory, actorRecordId) {
        const recordHistory = this.recHistoryDuo.getNewRecord(actorRecordId);
        operationHistory.recordHistory.push(recordHistory);
        operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistory.push(recordHistory);
        return recordHistory;
    }
}
exports.OperationHistoryDuo = OperationHistoryDuo;
di_1.DI.set(diTokens_1.OPER_HISTORY_DUO, OperationHistoryDuo);
//# sourceMappingURL=OperationHistoryDuo.js.map