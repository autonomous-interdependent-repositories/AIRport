import { DbEntity } from '@airport/ground-control';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntityFindOne } from '../../../lingo/query/api/EntityFindOne';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntityFindOne<Entity, IESP extends IEntitySelectProperties> extends EntityLookup<EntityFindOne<Entity, IESP>, EntityFindOne<Entity, IESP>> implements IEntityFindOne<Entity, IESP> {
    protected dbEntity: DbEntity;
    constructor(dbEntity: DbEntity);
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Promise<Entity>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Promise<Entity>;
}
