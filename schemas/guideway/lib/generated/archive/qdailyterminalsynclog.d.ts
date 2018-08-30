import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IDailyArchiveLog, DailyArchiveLogEId, DailyArchiveLogEOptionalId, DailyArchiveLogESelect, QDailyArchiveLogQId, QDailyArchiveLogQRelation } from './qdailyarchivelog';
import { ITerminal, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from '../terminal/qterminal';
export interface IDailyTerminalSyncLog {
    dailyArchiveLog?: IDailyArchiveLog;
    terminal?: ITerminal;
    acknowledged?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface DailyTerminalSyncLogESelect extends IEntitySelectProperties, DailyTerminalSyncLogEOptionalId {
    acknowledged?: number | IQNumberField;
    dailyArchiveLog?: DailyArchiveLogESelect;
    terminal?: TerminalESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DailyTerminalSyncLogEId extends IEntityIdProperties {
    dailyArchiveLog: DailyArchiveLogEId;
    terminal: TerminalEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface DailyTerminalSyncLogEOptionalId {
    dailyArchiveLog?: DailyArchiveLogEOptionalId;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DailyTerminalSyncLogEUpdateProperties extends IEntityUpdateProperties {
    acknowledged?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface DailyTerminalSyncLogEUpdateColumns extends IEntityUpdateColumns {
    ACKNOWLEDGED?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DailyTerminalSyncLogECreateProperties extends Partial<DailyTerminalSyncLogEId>, DailyTerminalSyncLogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DailyTerminalSyncLogECreateColumns extends DailyTerminalSyncLogEId, DailyTerminalSyncLogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDailyTerminalSyncLog extends QEntity {
    dailyArchiveLog: QDailyArchiveLogQRelation;
    terminal: QTerminalQRelation;
    acknowledged: IQNumberField;
}
export interface QDailyTerminalSyncLogQId {
    dailyArchiveLog: QDailyArchiveLogQId;
    terminal: QTerminalQId;
}
export interface QDailyTerminalSyncLogQRelation extends QRelation<QDailyTerminalSyncLog>, QDailyTerminalSyncLogQId {
}
