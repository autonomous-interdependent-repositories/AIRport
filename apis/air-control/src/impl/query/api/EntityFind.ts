import {QueryResultType}         from '@airport/ground-control'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IEntityFind}             from '../../../lingo/query/api/EntityFind'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {MappedEntityArray}       from '../../../lingo/query/MappedEntityArray'
import {EntityLookup}            from './EntityLookup'

export interface IEntityFindInternal<Entity, EntityArray extends Array<Entity>,
	IESP extends IEntitySelectProperties>
	extends IEntityFind<Entity, EntityArray, IESP> {

	find(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<EntityArray>

}

/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFind<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntityFind<Entity, Array<Entity>, IESP>,
		EntityFind<Entity, MappedEntityArray<Entity>, IESP>, IESP>
	implements IEntityFindInternal<Entity, EntityArray, IESP> {

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<EntityArray> {
		return this.find(rawGraphQuery, QueryResultType.ENTITY_GRAPH)
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<EntityArray> {
		return this.find(rawTreeQuery, QueryResultType.ENTITY_TREE)
	}

	find(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<EntityArray> {
		return this.entityLookup(rawEntityQuery, queryResultType,
			false, false)
	}

}
