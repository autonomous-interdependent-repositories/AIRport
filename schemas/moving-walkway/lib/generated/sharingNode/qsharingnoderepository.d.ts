import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { SharingNodeGraph, SharingNodeEId, SharingNodeEOptionalId, SharingNodeESelect, QSharingNodeQId, QSharingNodeQRelation } from './qsharingnode';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from '@airport/holding-pattern';
import { SharingNodeRepository } from '../../ddl/sharingNode/SharingNodeRepository';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeRepositoryESelect extends IEntitySelectProperties, SharingNodeRepositoryEOptionalId {
    agtRepositoryId?: number | IQNumberField;
    advisedSyncPriority?: string | IQStringField;
    repositorySyncStatus?: string | IQStringField;
    sharingNode?: SharingNodeESelect;
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeRepositoryEId extends IEntityIdProperties {
    sharingNode: SharingNodeEId;
    repository: RepositoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeRepositoryEOptionalId {
    sharingNode?: SharingNodeEOptionalId;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeRepositoryEUpdateProperties extends IEntityUpdateProperties {
    agtRepositoryId?: number | IQNumberField;
    advisedSyncPriority?: string | IQStringField;
    repositorySyncStatus?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SharingNodeRepositoryGraph extends SharingNodeRepositoryEOptionalId, IEntityCascadeGraph {
    agtRepositoryId?: number | IQNumberField;
    advisedSyncPriority?: string | IQStringField;
    repositorySyncStatus?: string | IQStringField;
    sharingNode?: SharingNodeGraph;
    repository?: RepositoryGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeRepositoryEUpdateColumns extends IEntityUpdateColumns {
    AGT_REPOSITORY_ID?: number | IQNumberField;
    ADVISED_SYNC_PRIORITY?: string | IQStringField;
    REPOSITORY_SYNC_STATUS?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeRepositoryECreateProperties extends Partial<SharingNodeRepositoryEId>, SharingNodeRepositoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeRepositoryECreateColumns extends SharingNodeRepositoryEId, SharingNodeRepositoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeRepository extends IQEntity<SharingNodeRepository> {
    sharingNode: QSharingNodeQRelation;
    repository: QRepositoryQRelation;
    agtRepositoryId: IQNumberField;
    advisedSyncPriority: IQStringField;
    repositorySyncStatus: IQStringField;
}
export interface QSharingNodeRepositoryQId {
    sharingNode: QSharingNodeQId;
    repository: QRepositoryQId;
}
export interface QSharingNodeRepositoryQRelation extends IQRelation<SharingNodeRepository, QSharingNodeRepository>, QSharingNodeRepositoryQId {
}
//# sourceMappingURL=qsharingnoderepository.d.ts.map