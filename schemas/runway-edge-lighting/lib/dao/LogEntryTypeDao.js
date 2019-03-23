"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const baseDaos_1 = require("../generated/baseDaos");
class LogEntryTypeDao extends baseDaos_1.BaseLogEntryTypeDao {
}
exports.LogEntryTypeDao = LogEntryTypeDao;
di_1.DI.set(diTokens_1.LOG_ENTRY_TYPE_DAO, LogEntryTypeDao);
//# sourceMappingURL=LogEntryTypeDao.js.map