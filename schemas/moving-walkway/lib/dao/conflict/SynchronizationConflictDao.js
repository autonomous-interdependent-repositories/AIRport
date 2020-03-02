"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
const generated_1 = require("../../generated/generated");
class SynchronizationConflictDao extends generated_1.BaseSynchronizationConflictDao {
}
exports.SynchronizationConflictDao = SynchronizationConflictDao;
di_1.DI.set(tokens_1.SYNC_CONFLICT_DAO, SynchronizationConflictDao);
//# sourceMappingURL=SynchronizationConflictDao.js.map