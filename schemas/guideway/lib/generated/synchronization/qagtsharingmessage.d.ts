import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/air-control';
import { TerminalGraph, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from '../terminal/qterminal';
import { SyncLogGraph, SyncLogESelect, QSyncLog } from './qsynclog';
import { SyncLog } from '../../ddl/synchronization/SyncLog';
import { AgtSharingMessage } from '../../ddl/synchronization/AgtSharingMessage';
/**
 * SELECT - All fields and relations (optional).
 */
export interface AgtSharingMessageESelect extends IEntitySelectProperties, AgtSharingMessageEOptionalId {
    tmSharingMessageId?: number | IQNumberField;
    acknowledged?: number | IQNumberField;
    terminal?: TerminalESelect;
    syncLogs?: SyncLogESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AgtSharingMessageEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface AgtSharingMessageEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AgtSharingMessageEUpdateProperties extends IEntityUpdateProperties {
    tmSharingMessageId?: number | IQNumberField;
    acknowledged?: number | IQNumberField;
    terminal?: TerminalEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AgtSharingMessageGraph extends AgtSharingMessageEOptionalId, IEntityCascadeGraph {
    tmSharingMessageId?: number | IQNumberField;
    acknowledged?: number | IQNumberField;
    terminal?: TerminalGraph;
    syncLogs?: SyncLogGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface AgtSharingMessageEUpdateColumns extends IEntityUpdateColumns {
    TM_SHARING_MESSAGE_ID?: number | IQNumberField;
    ACKNOWLEDGED?: number | IQNumberField;
    SYNCED_TERMINAL_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AgtSharingMessageECreateProperties extends Partial<AgtSharingMessageEId>, AgtSharingMessageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgtSharingMessageECreateColumns extends AgtSharingMessageEId, AgtSharingMessageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgtSharingMessage extends IQEntity<AgtSharingMessage> {
    id: IQNumberField;
    tmSharingMessageId: IQNumberField;
    acknowledged: IQNumberField;
    terminal: QTerminalQRelation;
    syncLogs: IQOneToManyRelation<SyncLog, QSyncLog>;
}
export interface QAgtSharingMessageQId {
    id: IQNumberField;
}
export interface QAgtSharingMessageQRelation extends IQRelation<AgtSharingMessage, QAgtSharingMessage>, QAgtSharingMessageQId {
}
//# sourceMappingURL=qagtsharingmessage.d.ts.map