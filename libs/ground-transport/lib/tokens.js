import { system } from '@airport/di';
const groundTransport = system('airport').lib('ground-transport');
// FIXME: tokens names do not match the interface name
export const STAGE1_SYNCED_IN_DATA_PROCESSOR = groundTransport.token('IStage1SyncedInDataProcessor');
export const STAGE2_SYNCED_IN_DATA_PROCESSOR = groundTransport.token('IStage2SyncedInDataProcessor');
export const SYNC_IN_ACTOR_CHECKER = groundTransport.token('ISyncInActorChecker');
export const SYNC_IN_CHECKER = groundTransport.token('ISyncInChecker');
export const SYNC_IN_DATA_CHECKER = groundTransport.token('ISyncInDataChecker');
export const SYNC_IN_TERMINAL_CHECKER = groundTransport.token('ISyncInTerminalChecker');
export const SYNC_IN_REPOSITORY_CHECKER = groundTransport.token('ISyncInRepositoryChecker');
export const SYNC_IN_SCHEMA_CHECKER = groundTransport.token('ISyncInSchemaChecker');
export const SYNC_IN_SCHEMA_VERSION_CHECKER = groundTransport.token('ISyncInSchemaVersionChecker');
export const SYNC_IN_USER_CHECKER = groundTransport.token('ISyncInUserChecker');
export const SYNC_NODE_MANAGER = groundTransport.token('ISyncNodeManager');
export const SYNCHRONIZATION_IN_MANAGER = groundTransport.token('ISynchronizationInManager');
export const SYNCHRONIZATION_OUT_COORDINATOR = groundTransport.token('ISynchronizationOutCoordinator');
export const SYNC_OUT_MANAGER = groundTransport.token('ISynchronizationOutManager');
export const SYNC_OUT_MSG_SENDER = groundTransport.token('ISyncOutMessageSender');
export const SYNC_OUT_REPO_TRANS_BLOCK_CREATOR = groundTransport.token('ISyncOutRepositoryTransactionBlockCreator');
export const SYNC_OUT_SERIALIZER = groundTransport.token('ISyncOutSerializer');
export const TWO_STAGE_SYNCED_IN_DATA_PROCESSOR = groundTransport.token('ITwoStageSyncedInDataProcessor');
//# sourceMappingURL=tokens.js.map