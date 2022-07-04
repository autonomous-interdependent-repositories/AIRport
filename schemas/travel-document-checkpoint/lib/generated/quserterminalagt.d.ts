import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation } from './quser';
import { TerminalGraph, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from './qterminal';
import { AgtGraph, AgtEOptionalId, AgtESelect, QAgtQRelation } from './qagt';
import { TerminalAgtGraph, TerminalAgtEOptionalId, TerminalAgtESelect, QTerminalAgtQRelation } from './qterminalagt';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserTerminalAgtESelect extends IEntitySelectProperties, UserTerminalAgtEOptionalId {
    password?: number | IQNumberField;
    user?: UserESelect;
    terminal?: TerminalESelect;
    agt?: AgtESelect;
    terminalAgt?: TerminalAgtESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserTerminalAgtEId extends IEntityIdProperties {
    id: number | IQNumberField;
    agtId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserTerminalAgtEOptionalId {
    id?: number | IQNumberField;
    agtId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserTerminalAgtEUpdateProperties extends IEntityUpdateProperties {
    password?: number | IQNumberField;
    user?: UserEOptionalId;
    terminal?: TerminalEOptionalId;
    agt?: AgtEOptionalId;
    terminalAgt?: TerminalAgtEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserTerminalAgtGraph extends UserTerminalAgtEOptionalId, IEntityCascadeGraph {
    password?: number | IQNumberField;
    user?: UserGraph;
    terminal?: TerminalGraph;
    agt?: AgtGraph;
    terminalAgt?: TerminalAgtGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserTerminalAgtEUpdateColumns extends IEntityUpdateColumns {
    PASSWORD?: number | IQNumberField;
    USER_ID?: number | IQNumberField;
    TERMINAL_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserTerminalAgtECreateProperties extends Partial<UserTerminalAgtEId>, UserTerminalAgtEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserTerminalAgtECreateColumns extends UserTerminalAgtEId, UserTerminalAgtEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QUserTerminalAgt extends IQEntity {
    id: IQNumberField;
    agtId: IQNumberField;
    password: IQNumberField;
    user: QUserQRelation;
    terminal: QTerminalQRelation;
    agt: QAgtQRelation;
    terminalAgt: QTerminalAgtQRelation;
}
export interface QUserTerminalAgtQId {
    id: IQNumberField;
    agtId: IQNumberField;
}
export interface QUserTerminalAgtQRelation extends IQRelation<QUserTerminalAgt>, QUserTerminalAgtQId {
}
//# sourceMappingURL=quserterminalagt.d.ts.map