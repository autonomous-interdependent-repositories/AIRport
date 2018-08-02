import { IDao, IUtils } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord } from './missingRecord/qmissingrecord';
import { IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock } from './missingRecord/qmissingrecordrepotransblock';
import { IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage } from './qrecordupdatestage';
import { IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage } from './repositoryTransactionBlock/qrepotransblockresponsestage';
import { IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, QRepoTransBlockSchemaToChange } from './repositoryTransactionBlock/qrepotransblockschematochange';
import { IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock } from './repositoryTransactionBlock/qrepositorytransactionblock';
import { IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage } from './repositoryTransactionBlock/qrepositorytransactionhistoryupdatestage';
import { ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage } from './sharingMessage/qsharingmessage';
import { ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock } from './sharingMessage/qsharingmessagerepotransblock';
import { ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode } from './sharingNode/qsharingnode';
import { ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock } from './sharingNode/qsharingnoderepotransblock';
import { ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage } from './sharingNode/qsharingnoderepotransblockstage';
import { ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository } from './sharingNode/qsharingnoderepository';
import { ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, QSharingNodeTerminal } from './sharingNode/qsharingnodeterminal';
import { ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
export interface IBaseMissingRecordDao extends IDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord> {
}
export declare class BaseMissingRecordDao extends Dao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord> implements IBaseMissingRecordDao {
    constructor(utils: IUtils);
}
export interface IBaseMissingRecordRepoTransBlockDao extends IDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock> {
}
export declare class BaseMissingRecordRepoTransBlockDao extends Dao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock> implements IBaseMissingRecordRepoTransBlockDao {
    constructor(utils: IUtils);
}
export interface IBaseRecordUpdateStageDao extends IDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage> {
}
export declare class BaseRecordUpdateStageDao extends Dao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage> implements IBaseRecordUpdateStageDao {
    constructor(utils: IUtils);
}
export interface IBaseRepoTransBlockResponseStageDao extends IDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage> {
}
export declare class BaseRepoTransBlockResponseStageDao extends Dao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage> implements IBaseRepoTransBlockResponseStageDao {
    constructor(utils: IUtils);
}
export interface IBaseRepoTransBlockSchemaToChangeDao extends IDao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, QRepoTransBlockSchemaToChange> {
}
export declare class BaseRepoTransBlockSchemaToChangeDao extends Dao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, QRepoTransBlockSchemaToChange> implements IBaseRepoTransBlockSchemaToChangeDao {
    constructor(utils: IUtils);
}
export interface IBaseRepositoryTransactionBlockDao extends IDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock> {
}
export declare class BaseRepositoryTransactionBlockDao extends Dao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock> implements IBaseRepositoryTransactionBlockDao {
    constructor(utils: IUtils);
}
export interface IBaseRepositoryTransactionHistoryUpdateStageDao extends IDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage> {
}
export declare class BaseRepositoryTransactionHistoryUpdateStageDao extends Dao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage> implements IBaseRepositoryTransactionHistoryUpdateStageDao {
    constructor(utils: IUtils);
}
export interface IBaseSharingMessageDao extends IDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage> {
}
export declare class BaseSharingMessageDao extends Dao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage> implements IBaseSharingMessageDao {
    constructor(utils: IUtils);
}
export interface IBaseSharingMessageRepoTransBlockDao extends IDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock> {
}
export declare class BaseSharingMessageRepoTransBlockDao extends Dao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock> implements IBaseSharingMessageRepoTransBlockDao {
    constructor(utils: IUtils);
}
export interface IBaseSharingNodeDao extends IDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode> {
}
export declare class BaseSharingNodeDao extends Dao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode> implements IBaseSharingNodeDao {
    constructor(utils: IUtils);
}
export interface IBaseSharingNodeRepoTransBlockDao extends IDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock> {
}
export declare class BaseSharingNodeRepoTransBlockDao extends Dao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock> implements IBaseSharingNodeRepoTransBlockDao {
    constructor(utils: IUtils);
}
export interface IBaseSharingNodeRepoTransBlockStageDao extends IDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage> {
}
export declare class BaseSharingNodeRepoTransBlockStageDao extends Dao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage> implements IBaseSharingNodeRepoTransBlockStageDao {
    constructor(utils: IUtils);
}
export interface IBaseSharingNodeRepositoryDao extends IDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository> {
}
export declare class BaseSharingNodeRepositoryDao extends Dao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository> implements IBaseSharingNodeRepositoryDao {
    constructor(utils: IUtils);
}
export interface IBaseSharingNodeTerminalDao extends IDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, QSharingNodeTerminal> {
}
export declare class BaseSharingNodeTerminalDao extends Dao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, QSharingNodeTerminal> implements IBaseSharingNodeTerminalDao {
    constructor(utils: IUtils);
}
export interface IBaseSynchronizationConflictDao extends IDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict> {
}
export declare class BaseSynchronizationConflictDao extends Dao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict> implements IBaseSynchronizationConflictDao {
    constructor(utils: IUtils);
}
export interface IBaseSynchronizationConflictPendingNotificationDao extends IDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification> {
}
export declare class BaseSynchronizationConflictPendingNotificationDao extends Dao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification> implements IBaseSynchronizationConflictPendingNotificationDao {
    constructor(utils: IUtils);
}
export interface IBaseSynchronizationConflictValuesDao extends IDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues> {
}
export declare class BaseSynchronizationConflictValuesDao extends Dao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues> implements IBaseSynchronizationConflictValuesDao {
    constructor(utils: IUtils);
}
