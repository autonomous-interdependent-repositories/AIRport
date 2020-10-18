import { RepositoryTransactionHistoryBlockId, RepositoryTransactionHistoryId } from '@airport/holding-pattern';
import { BaseRepositoryTransactionHistoryUpdateStageDao, IBaseRepositoryTransactionHistoryUpdateStageDao } from '../../generated/generated';
export declare type RepositoryTransactionHistoryUpdateStageValues = [
    RepositoryTransactionHistoryId,
    RepositoryTransactionHistoryBlockId
];
export interface IRepositoryTransactionHistoryUpdateStageDao extends IBaseRepositoryTransactionHistoryUpdateStageDao {
    insertValues(values: RepositoryTransactionHistoryUpdateStageValues[]): Promise<number>;
    updateRepositoryTransactionHistory(): Promise<number>;
    delete(): Promise<number>;
}
export declare class RepositoryTransactionHistoryUpdateStageDao extends BaseRepositoryTransactionHistoryUpdateStageDao implements IRepositoryTransactionHistoryUpdateStageDao {
    insertValues(values: RepositoryTransactionHistoryUpdateStageValues[]): Promise<number>;
    updateRepositoryTransactionHistory(): Promise<number>;
    delete(): Promise<number>;
}
//# sourceMappingURL=RepositoryTransactionHistoryUpdateStageDao.d.ts.map