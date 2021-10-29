import { Repository_Id } from '@airport/holding-pattern';
import { SharingNodeId } from '@airport/moving-walkway';
import { IDataToTM } from '../SyncInUtils';
export interface RepositoryCheckResults {
    consistentMessages: IDataToTM[];
    sharingNodeRepositoryMap: Map<SharingNodeId, Set<Repository_Id>>;
}
export interface ISyncInRepositoryChecker {
    ensureRepositories(incomingMessages: IDataToTM[], dataMessagesWithInvalidData: IDataToTM[]): Promise<RepositoryCheckResults>;
}
export declare class SyncInRepositoryChecker implements ISyncInRepositoryChecker {
    ensureRepositories(incomingMessages: IDataToTM[], dataMessagesWithInvalidData: IDataToTM[]): Promise<RepositoryCheckResults>;
    private areRepositoryIdsConsistentInMessage;
}
//# sourceMappingURL=SyncInRepositoryChecker.d.ts.map