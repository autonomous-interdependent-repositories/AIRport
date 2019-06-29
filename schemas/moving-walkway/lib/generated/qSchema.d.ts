import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QMissingRecord } from './missingrecord/qmissingrecord';
import { QMissingRecordRepoTransBlock } from './missingrecord/qmissingrecordrepotransblock';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { QRepoTransBlockResponseStage } from './repositorytransactionblock/qrepotransblockresponsestage';
import { QRepoTransBlockSchemaToChange } from './repositorytransactionblock/qrepotransblockschematochange';
import { QRepositoryTransactionBlock } from './repositorytransactionblock/qrepositorytransactionblock';
import { QRepositoryTransactionHistoryUpdateStage } from './repositorytransactionblock/qrepositorytransactionhistoryupdatestage';
import { QSharingMessage } from './sharingmessage/qsharingmessage';
import { QSharingMessageRepoTransBlock } from './sharingmessage/qsharingmessagerepotransblock';
import { QSharingNode } from './sharingnode/qsharingnode';
import { QSharingNodeRepoTransBlock } from './sharingnode/qsharingnoderepotransblock';
import { QSharingNodeRepoTransBlockStage } from './sharingnode/qsharingnoderepotransblockstage';
import { QSharingNodeRepository } from './sharingnode/qsharingnoderepository';
import { QSharingNodeTerminal } from './sharingnode/qsharingnodeterminal';
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
