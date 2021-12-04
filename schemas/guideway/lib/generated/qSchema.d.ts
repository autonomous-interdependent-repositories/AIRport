import { QApplication as AirportQApplication } from '@airport/air-control';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QAgtRepositoryTransactionBlock } from './synchronization/qagtrepositorytransactionblock';
import { QAgtSharingMessage } from './synchronization/qagtsharingmessage';
import { QArchive } from './repository/qarchive';
import { QDailyArchiveLog } from './archive/qdailyarchivelog';
import { QDailyTerminalSyncLog } from './archive/qdailyterminalsynclog';
import { QMonthlyArchiveLog } from './archive/qmonthlyarchivelog';
import { QMonthlyTerminalSyncLog } from './archive/qmonthlyterminalsynclog';
import { QRepository } from './repository/qrepository';
import { QRepositoryArchive } from './repository/qrepositoryarchive';
import { QSecurityAnswer } from './user/security/qsecurityanswer';
import { QSecurityQuestion } from './user/security/qsecurityquestion';
import { QServer } from './server/qserver';
import { QServerSyncLog } from './server/qserversynclog';
import { QSyncLog } from './synchronization/qsynclog';
import { QTerminal } from './terminal/qterminal';
import { QTerminalRepository } from './terminal/qterminalrepository';
import { QTuningParameters } from './tuning/qtuningparameters';
import { QUser } from './user/quser';
import { QUserRepository } from './user/quserrepository';
export interface LocalQApplication extends AirportQApplication {
    db: DbApplication;
    AgtRepositoryTransactionBlock: QAgtRepositoryTransactionBlock;
    AgtSharingMessage: QAgtSharingMessage;
    Archive: QArchive;
    DailyArchiveLog: QDailyArchiveLog;
    DailyTerminalSyncLog: QDailyTerminalSyncLog;
    MonthlyArchiveLog: QMonthlyArchiveLog;
    MonthlyTerminalSyncLog: QMonthlyTerminalSyncLog;
    Repository: QRepository;
    RepositoryArchive: QRepositoryArchive;
    SecurityAnswer: QSecurityAnswer;
    SecurityQuestion: QSecurityQuestion;
    Server: QServer;
    ServerSyncLog: QServerSyncLog;
    SyncLog: QSyncLog;
    Terminal: QTerminal;
    TerminalRepository: QTerminalRepository;
    TuningParameters: QTuningParameters;
    User: QUser;
    UserRepository: QUserRepository;
}
export declare const Q_SCHEMA: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map