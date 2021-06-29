import { system } from '@airport/di';
const groundControl = system('airport').lib('ground-control');
export const STORE_DRIVER = groundControl.token('IStoreDriver');
export const TRANSACTIONAL_CONNECTOR = groundControl.token('ITransactionalConnector');
//# sourceMappingURL=tokens.js.map