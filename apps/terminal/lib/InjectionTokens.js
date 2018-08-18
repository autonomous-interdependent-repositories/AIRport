"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const approach_lighting_system_1 = require("@airport/approach-lighting-system");
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
const typedi_1 = require("typedi");
exports.DatabaseManagerToken = new typedi_1.Token();
exports.DeleteManagerToken = new typedi_1.Token();
exports.HistoryManagerToken = new typedi_1.Token();
exports.InsertManagerToken = new typedi_1.Token();
exports.OfflineDeltaStoreToken = new typedi_1.Token();
exports.OnlineManagerToken = new typedi_1.Token();
exports.QueryManagerToken = new typedi_1.Token();
exports.RepositoryManagerToken = new typedi_1.Token();
exports.StoreDriverToken = new typedi_1.Token();
exports.UpdateManagerToken = new typedi_1.Token();
exports.TerminalLogger = new approach_lighting_system_1.LoggedPackage("terminal", runway_edge_lighting_1.LogLevel.TRACE);
exports.TerminalAppLogger = new approach_lighting_system_1.LoggedApplication("Airport");
exports.TerminalAppLogger.addPackage(exports.TerminalLogger);
//# sourceMappingURL=InjectionTokens.js.map