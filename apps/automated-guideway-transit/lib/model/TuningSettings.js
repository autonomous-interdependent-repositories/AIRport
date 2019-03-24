"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
class TuningSettings {
    constructor() {
        this.archiving = {
            numRepositoriesToProcessAtATime: 20
        };
        this.daily = {};
        this.recent = {
            incomingBatchFrequencyMillis: 300000,
            maxIncomingRTBBatchSize: Number.MAX_SAFE_INTEGER,
            maxIncomingSharingMessageBatchSize: Number.MAX_SAFE_INTEGER,
            maxToSaveSyncLogBatchSize: Number.MAX_SAFE_INTEGER,
            minMillisSinceLastConnection: 300000,
        };
    }
}
exports.TuningSettings = TuningSettings;
di_1.DI.set(diTokens_1.TUNNING_SETTINGS, TuningSettings);
//# sourceMappingURL=TuningSettings.js.map