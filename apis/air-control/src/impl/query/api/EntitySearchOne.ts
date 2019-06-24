import {QueryResultType}         from '@airport/ground-control'
import {
	IObservable,
	Observable
}                                from '@airport/observe'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IEntitySearchOne}        from '../../../lingo/query/api/EntitySearchOne'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {EntityLookup}            from './EntityLookup'

export interface IEntitySearchOneInternal<Entity, IESP extends IEntitySelectProperties>
	extends IEntitySearchOne<Entity, IESP> {

	searchOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<IObservable<Entity>>

}

/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearchOne<Entity, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearchOne<Entity, IESP>,
		EntitySearchOne<Entity, IESP>, IESP>
	implements IEntitySearchOneInternal<Entity, IESP> {

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<Entity> {
		return Observable.from(this.searchOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH))
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<Entity> {
		return Observable.from(this.searchOne(rawTreeQuery, QueryResultType.ENTITY_TREE))
	}

	searchOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<IObservable<Entity>> {
		return this.entityLookup(rawEntityQuery, queryResultType,
			true, true)
	}

}
