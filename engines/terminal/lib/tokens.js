import { system } from '@airport/di';
const terminal = system('airport').lib('terminal');
export const CASCADE_GRAPH_VERIFIER = terminal.token('ICascadeGraphVerifier');
export const DATABASE_MANAGER = terminal.token('IDatabaseManager');
export const DELETE_MANAGER = terminal.token('IDeleteManager');
export const DEPENDENCY_GRAPH_RESOLVER = terminal.token('IDependencyGraphResolver');
export const ENTITY_GRAPH_RECONSTRUCTOR = terminal.token('IEntityGraphReconstructor');
export const HISTORY_MANAGER = terminal.token('IHistoryManager');
export const INSERT_MANAGER = terminal.token('IInsertManager');
export const INTERNAL_RECORD_MANAGER = terminal.token('IInternalRecordManager');
export const OFFLINE_DELTA_STORE = terminal.token('IOfflineDeltaStore');
export const ONLINE_MANAGER = terminal.token('IOnlineManager');
export const OPERATION_MANAGER = terminal.token('IOperationManager');
export const QUERY_MANAGER = terminal.token('IQueryManager');
export const REPOSITORY_MANAGER = terminal.token('IRepositoryManager');
export const STRUCTURAL_ENTITY_VALIDATOR = terminal.token('IStructuralEntityValidator');
export const UPDATE_MANAGER = terminal.token('IUpdateManager');
//# sourceMappingURL=tokens.js.map