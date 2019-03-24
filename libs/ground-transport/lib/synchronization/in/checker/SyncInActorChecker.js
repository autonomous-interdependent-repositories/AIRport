"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const holding_pattern_1 = require("@airport/holding-pattern");
const travel_document_checkpoint_1 = require("@airport/travel-document-checkpoint");
const diTokens_1 = require("../../../diTokens");
class SyncInActorChecker {
    constructor() {
        di_1.DI.get((actorDao, terminalDao, utils) => {
            this.actorDao = actorDao;
            this.terminalDao = terminalDao;
            this.utils = utils;
        }, holding_pattern_1.ACTOR_DAO, travel_document_checkpoint_1.TERMINAL_DAO, air_control_1.UTILS);
    }
    async ensureActorsAndGetAsMaps(dataMessages, actorMap, actorMapById, userCheckResults, terminalCheckResults, dataMessagesWithInvalidData) {
        const actorRandomIdSet = new Set();
        const userUniqueIdsSet = new Set();
        const terminalNameSet = new Set();
        const terminalSecondIdSet = new Set();
        const ownerUniqueIdSet = new Set();
        const consistentMessages = [];
        // split messages by repository and record actor information
        for (const message of dataMessages) {
            if (!this.areActorIdsConsistentInMessage(message)) {
                dataMessagesWithInvalidData.push(message);
                continue;
            }
            const data = message.data;
            terminalNameSet.add(data.terminal.name);
            terminalSecondIdSet.add(data.terminal.secondId);
            ownerUniqueIdSet.add(data.terminal.owner.uniqueId);
            consistentMessages.push(message);
            for (const actor of data.actors) {
                actorRandomIdSet.add(actor.randomId);
                userUniqueIdsSet.add(actor.user.uniqueId);
            }
        }
        const terminalMapByGlobalIds = await this.terminalDao.findMapByGlobalIds(Array.from(ownerUniqueIdSet), Array.from(terminalNameSet), Array.from(terminalSecondIdSet));
        const terminalIdSet = new Set();
        for (const message of dataMessages) {
            const terminal = message.data.terminal;
            const terminalId = terminalMapByGlobalIds
                .get(terminal.owner.uniqueId)
                .get(terminal.name).get(terminal.secondId).id;
            terminalIdSet.add(terminalId);
        }
        // NOTE: remote actors should not contain terminal info, it should be populated here
        // this is because a given RTB is always generated in one and only one terminal
        await this.actorDao.findMapsWithDetailsByGlobalIds(Array.from(actorRandomIdSet), Array.from(userUniqueIdsSet), Array.from(terminalIdSet), actorMap, actorMapById);
        const newActors = this.getNewActors(consistentMessages, actorMap);
        await this.actorDao.bulkCreate(newActors, false, false);
        for (const newActor of newActors) {
            actorMapById.set(newActor.id, newActor);
        }
        this.updateActorIdsInMessages(actorMap, consistentMessages);
        return {
            actorMap,
            actorMapById,
            consistentMessages
        };
    }
    areActorIdsConsistentInMessage(message) {
        const actorIdSet = new Set();
        const usedActorIdSet = new Set();
        for (const actor of message.data.actors) {
            actorIdSet.add(actor.id);
        }
        const data = message.data;
        for (const repoTransHistory of data.repoTransHistories) {
            const transactionRemoteActorId = repoTransHistory.actor.id;
            if (!actorIdSet.has(transactionRemoteActorId)) {
                return false;
            }
            usedActorIdSet.add(transactionRemoteActorId);
            for (const operationHistory of repoTransHistory.operationHistory) {
                for (const recordHistory of operationHistory.recordHistory) {
                    const recordRemoteActorId = recordHistory.actor.id;
                    if (!actorIdSet.has(recordRemoteActorId)) {
                        return false;
                    }
                    usedActorIdSet.add(recordRemoteActorId);
                }
            }
        }
        return actorIdSet.size === usedActorIdSet.size;
    }
    updateActorIdsInMessages(actorMap, dataMessages) {
        for (const message of dataMessages) {
            const messageActorMapByRemoteId = new Map();
            const updatedActors = [];
            for (const actor of message.data.actors) {
                const localActor = actorMap
                    .get(actor.randomId)
                    .get(actor.user.uniqueId)
                    .get(actor.terminal.name)
                    .get(actor.terminal.secondId)
                    .get(actor.terminal.owner.uniqueId);
                updatedActors.push(localActor);
                messageActorMapByRemoteId.set(actor.id, localActor);
            }
            const data = message.data;
            data.actors = updatedActors;
            for (const repoTransHistory of data.repoTransHistories) {
                const transactionRemoteActorId = repoTransHistory.actor.id;
                const transactionLocalActor = messageActorMapByRemoteId.get(transactionRemoteActorId);
                repoTransHistory.actor.id = transactionLocalActor.id;
                for (const operationHistory of repoTransHistory.operationHistory) {
                    for (const recordHistory of operationHistory.recordHistory) {
                        const recordRemoteActorId = recordHistory.actor.id;
                        const recordLocalActor = messageActorMapByRemoteId.get(recordRemoteActorId);
                        recordHistory.actor.id = recordLocalActor.id;
                    }
                }
            }
        }
    }
    getNewActors(dataMessages, actorMap) {
        const newActorMap = new Map();
        // split messages by repository
        for (const message of dataMessages) {
            for (let actor of message.data.actors) {
                actor = {
                    id: undefined,
                    ...actor,
                };
                const actorsForRandomId = actorMap.get(actor.randomId);
                if (!actorsForRandomId) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const actorsForUserUniqueId = actorsForRandomId.get(actor.user.uniqueId);
                if (!actorsForUserUniqueId) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const actorsForTerminalName = actorsForUserUniqueId.get(actor.terminal.name);
                if (!actorsForTerminalName) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const actorsForTerminalSecondId = actorsForTerminalName.get(actor.terminal.secondId);
                if (!actorsForTerminalSecondId) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
                const existingActor = actorsForTerminalSecondId.get(actor.terminal.owner.uniqueId);
                if (!existingActor) {
                    this.addActorToMap(actor, newActorMap);
                    this.addActorToMap(actor, actorMap);
                    break;
                }
            }
        }
        const newActors = [];
        for (const [actorRandomId, actorsForRandomId] of newActorMap) {
            for (const [userUniqueId, actorsForUserUniqueId] of actorsForRandomId) {
                for (const [terminalName, actorsForTerminalName] of actorsForUserUniqueId) {
                    for (const [terminalSecondId, actorsForTerminalSecondId] of actorsForTerminalName) {
                        for (const [terminalOwnerUniqueId, actor] of actorsForTerminalSecondId) {
                            newActors.push(actor);
                        }
                    }
                }
            }
        }
        return newActors;
    }
    addActorToMap(actor, actorMap) {
        this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(actorMap, actor.randomId), actor.user.uniqueId), actor.terminal.name), actor.terminal.secondId).set(actor.terminal.owner.uniqueId, actor);
    }
}
exports.SyncInActorChecker = SyncInActorChecker;
di_1.DI.set(diTokens_1.SYNC_IN_ACTOR_CHECKER, SyncInActorChecker);
//# sourceMappingURL=SyncInActorChecker.js.map