import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { SharingNodeGraph, SharingNodeEId, SharingNodeEOptionalId, SharingNodeESelect, QSharingNodeQId, QSharingNodeQRelation } from './qsharingnode';
import { TerminalGraph, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from '@airport/travel-document-checkpoint';
import { SharingNodeTerminal } from '../../ddl/sharingNode/SharingNodeTerminal';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeTerminalESelect extends IEntitySelectProperties, SharingNodeTerminalEOptionalId {
    agtTerminalId?: number | IQNumberField;
    agtTerminalPassword?: string | IQStringField;
    terminalSyncStatus?: string | IQStringField;
    sharingNode?: SharingNodeESelect;
    terminal?: TerminalESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeTerminalEId extends IEntityIdProperties {
    sharingNode: SharingNodeEId;
    terminal: TerminalEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeTerminalEOptionalId {
    sharingNode?: SharingNodeEOptionalId;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeTerminalEUpdateProperties extends IEntityUpdateProperties {
    agtTerminalId?: number | IQNumberField;
    agtTerminalPassword?: string | IQStringField;
    terminalSyncStatus?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SharingNodeTerminalGraph extends SharingNodeTerminalEOptionalId, IEntityCascadeGraph {
    agtTerminalId?: number | IQNumberField;
    agtTerminalPassword?: string | IQStringField;
    terminalSyncStatus?: string | IQStringField;
    sharingNode?: SharingNodeGraph;
    terminal?: TerminalGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeTerminalEUpdateColumns extends IEntityUpdateColumns {
    AGT_TERMINAL_ID?: number | IQNumberField;
    TERMINAL_PASSWORD?: string | IQStringField;
    TERMINAL_SYNC_STATUS?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeTerminalECreateProperties extends Partial<SharingNodeTerminalEId>, SharingNodeTerminalEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeTerminalECreateColumns extends SharingNodeTerminalEId, SharingNodeTerminalEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeTerminal extends IQEntity<SharingNodeTerminal> {
    sharingNode: QSharingNodeQRelation;
    terminal: QTerminalQRelation;
    agtTerminalId: IQNumberField;
    agtTerminalPassword: IQStringField;
    terminalSyncStatus: IQStringField;
}
export interface QSharingNodeTerminalQId {
    sharingNode: QSharingNodeQId;
    terminal: QTerminalQId;
}
export interface QSharingNodeTerminalQRelation extends IQRelation<SharingNodeTerminal, QSharingNodeTerminal>, QSharingNodeTerminalQId {
}
//# sourceMappingURL=qsharingnodeterminal.d.ts.map