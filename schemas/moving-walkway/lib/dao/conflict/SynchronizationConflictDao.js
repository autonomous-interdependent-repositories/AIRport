import { BaseSynchronizationConflictDao, Q } from '../../generated/generated';
export class SynchronizationConflictDao extends BaseSynchronizationConflictDao {
    async insert(synchronizationConflicts) {
        let sc;
        const values = [];
        for (const synchronizationConflict of synchronizationConflicts) {
            values.push([
                synchronizationConflict.type,
                synchronizationConflict.acknowledged,
                synchronizationConflict.repository.id,
                synchronizationConflict.overwrittenRecordHistory.id,
                synchronizationConflict.overwritingRecordHistory.id
            ]);
        }
        const ids = await this.db.insertValuesGenerateIds({
            insertInto: sc = Q.SynchronizationConflict,
            columns: [
                sc.type,
                sc.acknowledged,
                sc.repository.id,
                sc.overwrittenRecordHistory.id,
                sc.overwritingRecordHistory.id
            ],
            values
        });
        for (let i = 0; i < synchronizationConflicts.length; i++) {
            let synchronizationConflict = synchronizationConflicts[i];
            synchronizationConflict.id = ids[i][0];
        }
    }
}
//# sourceMappingURL=SynchronizationConflictDao.js.map