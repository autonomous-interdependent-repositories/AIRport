import { container, DI } from '@airport/di';
import { transactional } from '@airport/tower';
import { SYNCHRONIZATION_IN_MANAGER, TWO_STAGE_SYNCED_IN_DATA_PROCESSOR } from '../../tokens';
/**
 * Synchronization in Manager implementation.
 */
export class SynchronizationInManager {
    /**
     * @param {MessageToTM[][]} incomingMessages    All of the incoming messages, grouped
     *   into arrays by sharing node
     * @returns {Promise<void>}   Return when all of the messages have been processed
     */
    async receiveMessages(messages) {
        const twoStageSyncedInDataProcessor = await container(this)
            .get(TWO_STAGE_SYNCED_IN_DATA_PROCESSOR);
        const syncTimestamp = new Date().getTime();
        // Split up messages by type
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            if (!this.isValidLastChangeTime(syncTimestamp, message.syncTimestamp, 'Sync Timestamp')) {
                continue;
            }
            if (!this.isValidLastChangeTime(message.syncTimestamp, message.history.saveTimestamp, 'Sync Timestamp', 'Save Timestamp')) {
                continue;
            }
            await transactional(async () => {
                await twoStageSyncedInDataProcessor.syncDataMessage(message);
            });
        }
    }
    isValidLastChangeTime(syncTimestamp, remoteTimestamp, remoteFieldName, syncFieldName = 'Reception Time:') {
        if (syncTimestamp < remoteTimestamp) {
            console.error(`Message ${syncFieldName} is less than
			the ${remoteFieldName} in received message:
				${syncFieldName}:               ${syncTimestamp}
				${remoteFieldName}:           ${remoteTimestamp}
			`);
            return false;
        }
        return true;
    }
}
DI.set(SYNCHRONIZATION_IN_MANAGER, SynchronizationInManager);
//# sourceMappingURL=SynchronizationInManager.js.map