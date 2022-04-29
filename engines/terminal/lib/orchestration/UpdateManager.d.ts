import { IAirportDatabase, IApplicationUtils, IFieldUtils, IQueryFacade, IQueryUtils, IRelationManager } from '@airport/air-control';
import { ISequenceGenerator } from '@airport/check-in';
import { IRootTransaction, PortableQuery } from '@airport/ground-control';
import { IActor, IOperationHistoryDuo, IRecordHistoryDuo, IRepositoryTransactionHistoryDuo } from '@airport/holding-pattern';
import { IHistoryManager, IOperationContext, ITransaction, IUpdateManager } from '@airport/terminal-map';
export declare class UpdateManager implements IUpdateManager {
    airportDatabase: IAirportDatabase;
    applicationUtils: IApplicationUtils;
    fieldUtils: IFieldUtils;
    historyManager: IHistoryManager;
    operationHistoryDuo: IOperationHistoryDuo;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    recordHistoryDuo: IRecordHistoryDuo;
    relationManager: IRelationManager;
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    sequenceGenerator: ISequenceGenerator;
    updateValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context: IOperationContext): Promise<number>;
    private addUpdateHistory;
    private addNewValueHistory;
    private groupRecordsByRepository;
}
//# sourceMappingURL=UpdateManager.d.ts.map