import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QMissingRecord } from './missingRecord/qmissingrecord';
import { QMissingRecordRepoTransBlock } from './missingRecord/qmissingrecordrepotransblock';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { QRepoTransBlockResponseStage } from './repositoryTransactionBlock/qrepotransblockresponsestage';
import { QRepoTransBlockSchemaToChange } from './repositoryTransactionBlock/qrepotransblockschematochange';
import { QRepositoryTransactionBlock } from './repositoryTransactionBlock/qrepositorytransactionblock';
import { QRepositoryTransactionHistoryUpdateStage } from './repositoryTransactionBlock/qrepositorytransactionhistoryupdatestage';
import { QSharingMessage } from './sharingMessage/qsharingmessage';
import { QSharingMessageRepoTransBlock } from './sharingMessage/qsharingmessagerepotransblock';
import { QSharingNode } from './sharingNode/qsharingnode';
import { QSharingNodeRepoTransBlock } from './sharingNode/qsharingnoderepotransblock';
import { QSharingNodeRepoTransBlockStage } from './sharingNode/qsharingnoderepotransblockstage';
import { QSharingNodeRepository } from './sharingNode/qsharingnoderepository';
import { QSharingNodeTerminal } from './sharingNode/qsharingnodeterminal';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    MissingRecord: QMissingRecord;
    MissingRecordRepoTransBlock: QMissingRecordRepoTransBlock;
    RecordUpdateStage: QRecordUpdateStage;
    RepoTransBlockResponseStage: QRepoTransBlockResponseStage;
    RepoTransBlockSchemaToChange: QRepoTransBlockSchemaToChange;
    RepositoryTransactionBlock: QRepositoryTransactionBlock;
    RepositoryTransactionHistoryUpdateStage: QRepositoryTransactionHistoryUpdateStage;
    SharingMessage: QSharingMessage;
    SharingMessageRepoTransBlock: QSharingMessageRepoTransBlock;
    SharingNode: QSharingNode;
    SharingNodeRepoTransBlock: QSharingNodeRepoTransBlock;
    SharingNodeRepoTransBlockStage: QSharingNodeRepoTransBlockStage;
    SharingNodeRepository: QSharingNodeRepository;
    SharingNodeTerminal: QSharingNodeTerminal;
    SynchronizationConflict: QSynchronizationConflict;
    SynchronizationConflictPendingNotification: QSynchronizationConflictPendingNotification;
    SynchronizationConflictValues: QSynchronizationConflictValues;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map