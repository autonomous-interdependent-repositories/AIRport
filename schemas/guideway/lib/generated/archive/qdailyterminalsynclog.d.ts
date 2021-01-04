import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { DailyArchiveLogGraph, DailyArchiveLogEId, DailyArchiveLogEOptionalId, DailyArchiveLogESelect, QDailyArchiveLogQId, QDailyArchiveLogQRelation } from './qdailyarchivelog';
import { TerminalGraph, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from '../terminal/qterminal';
import { DailyTerminalSyncLog } from '../../ddl/archive/DailyTerminalSyncLog';
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DailyTerminalSyncLogGraph extends DailyTerminalSyncLogEOptionalId, IEntityCascadeGraph {
    acknowledged?: number | IQNumberField;
    dailyArchiveLog?: DailyArchiveLogGraph;
    terminal?: TerminalGraph;
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
export interface QDailyTerminalSyncLog extends IQEntity<DailyTerminalSyncLog> {
    dailyArchiveLog: QDailyArchiveLogQRelation;
    terminal: QTerminalQRelation;
    acknowledged: IQNumberField;
}
export interface QDailyTerminalSyncLogQId {
    dailyArchiveLog: QDailyArchiveLogQId;
    terminal: QTerminalQId;
}
export interface QDailyTerminalSyncLogQRelation extends IQRelation<DailyTerminalSyncLog, QDailyTerminalSyncLog>, QDailyTerminalSyncLogQId {
}
//# sourceMappingURL=qdailyterminalsynclog.d.ts.map