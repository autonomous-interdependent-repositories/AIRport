import { IQEntityInternal, IQDateField } from '@airport/air-control';
import { IRepositoryEntity, RepositoryEntityEId, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityESelect, QRepositoryEntityQId, QRepositoryEntityQRelation, QRepositoryEntity } from '../repository/qrepositoryentity';
export interface IImmutableRepoRow extends IRepositoryEntity {
    createdAt?: Date;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableRepoRowESelect extends RepositoryEntityESelect, ImmutableRepoRowEOptionalId {
    createdAt?: Date | IQDateField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableRepoRowEId extends RepositoryEntityEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableRepoRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableRepoRowEUpdateProperties extends RepositoryEntityEUpdateProperties {
    createdAt?: Date | IQDateField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableRepoRowEUpdateColumns extends RepositoryEntityEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableRepoRowECreateProperties extends Partial<ImmutableRepoRowEId>, ImmutableRepoRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableRepoRowECreateColumns extends ImmutableRepoRowEId, ImmutableRepoRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QImmutableRepoRow extends QRepositoryEntity {
    createdAt: IQDateField;
}
export interface QImmutableRepoRowQId extends QRepositoryEntityQId {
}
export interface QImmutableRepoRowQRelation<SubType extends IQEntityInternal> extends QRepositoryEntityQRelation<QImmutableRepoRow>, QImmutableRepoRowQId {
}
