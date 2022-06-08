import { Inject, Injected } from '@airport/direction-indicator'
import { RawEntityQuery } from '../../lingo/query/facade/EntityQuery'
import { IQuery, RawQuery } from '../../lingo/query/facade/Query'
import { IEntityUtils } from '../../lingo/utils/EntityUtils'
import { IUtils } from '../../lingo/Utils'
import { QOperableField } from '../core/field/OperableField'
import { EntityQuery } from '../query/facade/EntityQuery'
import { TreeQuery } from '../query/facade/TreeQuery'
import { ITreeEntity, RawTreeQuery } from '../../lingo/query/facade/TreeQuery'
import { IEntityAliases } from '../../lingo/core/entity/Aliases'
import { QTree, QTreeDriver } from '../core/entity/Tree'
import { IEntityRelationFrom, IEntitySelectProperties, IFrom, IQEntity, IQEntityDriver, IQEntityInternal, IQTree } from '../../lingo/core/entity/Entity'
import { QEntity } from '../core/entity/Entity'
import { QField } from '../core/field/Field'
import { ENTITY_UTILS } from '../../core-tokens'
import { Y } from '../../lingo/query/facade/Query'
import { DbEntity } from '@airport/ground-control'

/**
 * Created by Papa on 6/14/2016.
 */
@Injected()
export class EntityUtils
	implements IEntityUtils {

	@Inject()
	utils: IUtils

	getObjectClassName(object: any): string {
		if (typeof object != 'object' || object === null) {
			throw new Error(`Not an object instance`)
		}
		return this.getClassName(object.constructor)
	}

	getClassName(clazz: Function): string {
		if (typeof clazz != 'function') {
			throw new Error(`Not a constructor function`)
		}

		let className = clazz['name']
		// let className = /(\w+)\(/.exec(clazz.toString())[1];

		return className
	}

	exists(object: any) {
		return this.utils.objectExists(object)
	}

	/*
	 static isBlank(
	 object: any
	 ) {
	 for (let propertyName in object) {
	 let property = object[propertyName];
	 if (this.exists(property)) {
	 if (property instanceof Array) {
	 if (property.length > 0) {
	 return false;
	 }
	 } else {
	 return false;
	 }
	 }
	 }
	 return true;
	 }
	 */

	isAppliable(object: any): boolean {
		return object instanceof QOperableField
	}

	getQuery<Q>(
		query: Q | { (...args: any[]): Q }
	): Q {
		return <Q><any>this.getRawQuery(<any>query)
	}
	ensureUuid<EntitySelect extends IEntitySelectProperties>(
		rawEntityQuery: RawEntityQuery<EntitySelect>
			| { (...args: any[]): RawEntityQuery<EntitySelect> }
	): RawEntityQuery<EntitySelect> {
		let theRawEntityQuery = this.getRawQuery(rawEntityQuery) as RawEntityQuery<EntitySelect>

		this.ensureUuIdAtLevel(
			theRawEntityQuery.select, theRawEntityQuery.from[0] as IQEntityInternal)

		return theRawEntityQuery
	}

	private ensureUuIdAtLevel<EntitySelect extends IEntitySelectProperties>(
		selectClauseFragment: any,
		qEntity: IQEntityInternal
	) {
		for(const propertyName in selectClauseFragment) {
			const subFragment = selectClauseFragment[propertyName]
			if(subFragment instanceof Object
				&& typeof subFragment.airportSelectField !== 'boolean'
				&& !subFragment.__allFields__) {

					let matchingQEntity
					for(const childQEntity of qEntity.__driver__.childQEntities) {
						if(childQEntity.__driver__.dbRelation.property.name === propertyName) {
							matchingQEntity = childQEntity
							break
						}
					}
					if(matchingQEntity) {
						this.ensureUuIdAtLevel(subFragment, matchingQEntity)
					}
				}
		}
		if (selectClauseFragment.uuId) {
			let repository = selectClauseFragment.repository
			if (repository) {
				if (!(repository instanceof Object)) {
					throw new Error(`uuId queries must include a repository object in the select clause.
It must be an Object with the uuId property.`)
				}
				repository.uuId = Y

			}
			let actor = selectClauseFragment.actor
			if (actor) {
				if (!(actor instanceof Object)) {
					throw new Error(`uuId queries must include an actor object in the select clause.
It must be an Object with the uuId property.`)
				}
				actor.uuId = Y

			}
			selectClauseFragment.actorRecordId = Y

			let repositoryJoinFound = false
			for(const childQEntity of qEntity.__driver__.childQEntities) {
				if(childQEntity.__driver__.dbRelation.property.name === 'repository') {
					repositoryJoinFound = true
				}
			}
			if(!repositoryJoinFound) {
				(qEntity as any).repository.leftJoin()
			}

			let actorJoinFound = false
			for(const childQEntity of qEntity.__driver__.childQEntities) {
				if(childQEntity.__driver__.dbRelation.property.name === 'actor') {
					actorJoinFound = true
				}
			}
			if(!actorJoinFound) {
				(qEntity as any).actor.leftJoin()
			}
		}
	}

	private findRepositoryQEntity() {
	}

	private findActorQEntity() {
	}

	// Removes circular dependency at code initialization time
	getRawQuery(
		rawQuery: RawQuery | { (...args: any[]): RawQuery }
	): RawQuery {
		if (rawQuery instanceof Function) {
			return rawQuery()
		} else {
			return rawQuery
		}
	}

	// Removes circular dependency at code initialization time
	getEntityQuery(
		rawGraphQuery: RawEntityQuery<any> | { (...args: any[]): RawEntityQuery<any> }
	): EntityQuery<any> {
		return new EntityQuery(this.getRawQuery(rawGraphQuery))
	}

	// Removes circular dependency at code initialization time
	getTreeQuery<ITE extends ITreeEntity>(
		rawQuery: RawTreeQuery<ITE>,
		entityAliases: IEntityAliases
	): IQuery {
		return new TreeQuery(rawQuery, entityAliases)
	}

	// Removes circular dependency at code initialization time
	isQEntity<IF extends IFrom>(
		qEntity: IF | IEntityRelationFrom | RawTreeQuery<any>
	): boolean {
		return qEntity instanceof QEntity
	}

	// Removes circular dependency at code initialization time
	isQTree<IF extends IFrom>(
		qEntity: IQEntityDriver | IF | IEntityRelationFrom | RawTreeQuery<any>
	): boolean {
		return qEntity instanceof QTreeDriver
	}

	// Removes circular dependency at code initialization time
	getQTree(
		fromClausePosition: number[],
		subQuery: RawTreeQuery<any>
	): IQTree {
		return new QTree(fromClausePosition, subQuery)
	}

	// Removes circular dependency at code initialization time
	isQField(
		qEntity: IQEntity
	): boolean {
		return qEntity instanceof QField
	}

}
ENTITY_UTILS.setClass(EntityUtils)
