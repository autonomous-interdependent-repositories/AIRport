import { ISharingNode } from '../sharingNode/sharingnode';
import { ISharingMessageRepoTransBlock } from './sharingmessagerepotransblock';
export interface ISharingMessage {
    id: number;
    sharingNode: ISharingNode;
    origin?: number;
    agtSharingMessageId?: number;
    syncTimestamp?: Date;
    sharingMessageRepoTransBlocks?: ISharingMessageRepoTransBlock[];
}
//# sourceMappingURL=sharingmessage.d.ts.map