import { JsonEntityUpdateColumns, JsonUpdate } from '@airport/ground-control';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IQEntity } from '../../../lingo/core/entity/Entity';
import { AbstractRawUpdate } from '../../../lingo/query/facade/Update';
import { AbstractQuery } from './AbstractQuery';
import { IRelationManager } from '../../core/entity/RelationManager';
export declare abstract class AbstractUpdate<IQE extends IQEntity, ARE extends AbstractRawUpdate<IQE>> extends AbstractQuery {
    rawUpdate: ARE;
    protected constructor(rawUpdate: ARE);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonUpdate<JsonEntityUpdateColumns>;
    protected abstract setToJSON(set: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonEntityUpdateColumns;
}
//# sourceMappingURL=AbstractUpdate.d.ts.map