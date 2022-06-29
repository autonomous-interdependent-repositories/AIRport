import { DbRelation } from '@airport/ground-control';
import { IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { JSONLogicalOperation } from '../../../lingo/core/operation/LogicalOperation';
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils';
import type { IRelationManager } from './RelationManager';
/**
 * Created by Papa on 4/26/2016.
 */
export declare function QRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare function QAirEntityRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare const qAirEntityRelationMethods: {
    isNull(): JSONLogicalOperation;
    isNotNull(): JSONLogicalOperation;
};
//# sourceMappingURL=Relation.d.ts.map