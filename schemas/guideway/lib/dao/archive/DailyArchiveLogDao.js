import { AIR_DB } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { BaseDailyArchiveLogDao, Q } from '../../generated/generated';
import { DAILY_ARCHIVE_LOG_DAO } from '../../tokens';
export class DailyArchiveLogDao extends BaseDailyArchiveLogDao {
    async insertValues(values) {
        const dbEntity = Q.db.currentVersion.entityMapByName.DailyArchiveLog;
        let dal;
        const airDb = await container(this)
            .get(AIR_DB);
        return await airDb.insertValues({
            insertInto: dal = Q.DailyArchiveLog,
            columns: [
                dal.repository.id,
                dal.dateNumber,
                dal.numberOfChanges
            ],
            values
        }, {
            dbEntity
        });
    }
}
DI.set(DAILY_ARCHIVE_LOG_DAO, DailyArchiveLogDao);
//# sourceMappingURL=DailyArchiveLogDao.js.map