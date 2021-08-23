import { ISaveResult } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { ITransaction } from '@airport/terminal-map';
import { IOperationContext } from './OperationContext';
/**
 * Created by Papa on 11/15/2016.
 */
export interface IOperationManager {
    performSave<E, EntityCascadeGraph>(entities: E | E[], actor: IActor, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<ISaveResult>;
}
export declare class OperationManager implements IOperationManager {
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    performSave<E, EntityCascadeGraph>(entities: E | E[], actor: IActor, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<ISaveResult>;
    protected internalCreate<E, EntityCascadeGraph>(entities: E[], actor: IActor, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>, ensureGeneratedValues?: boolean): Promise<number>;
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    protected internalUpdate<E, EntityCascadeGraph>(entity: E, originalEntity: E, actor: IActor, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
    protected internalDelete<E, EntityCascadeGraph>(entity: E, actor: IActor, transaction: ITransaction, context: IOperationContext<E, EntityCascadeGraph>): Promise<number>;
}
//# sourceMappingURL=OperationManager.d.ts.map