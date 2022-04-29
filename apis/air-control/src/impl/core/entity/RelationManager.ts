import {
	JSONEntityRelation,
	JSONRelation
} from '@airport/ground-control'
import {
	IQEntityDriver,
	IQEntityInternal
} from '../../../lingo/core/entity/Entity'
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils'

export interface IRelationManager {

	getPositionAlias(
		rootEntityPrefix: string,
		fromClausePosition: number[]
	): string

	getAlias(
		jsonRelation: JSONRelation
	): string

	getParentAlias(
		jsonRelation: JSONRelation
	): string

	createRelatedQEntity<IQ extends IQEntityInternal>(
		joinRelation: JSONRelation,
		context: IRelationManagerContext,
	): IQ

	getNextChildJoinPosition(
		joinParentDriver: IQEntityDriver
	): number[]

}

export interface IRelationManagerContext {
}

export class RelationManager
	implements IRelationManager {

	applicationUtils: IApplicationUtils

	getPositionAlias(
		rootEntityPrefix: string,
		fromClausePosition: number[]
	): string {
		return `${rootEntityPrefix}_${fromClausePosition.join('_')}`
	}

	getAlias(
		jsonRelation: JSONRelation
	): string {
		return this.getPositionAlias(jsonRelation.rep, jsonRelation.fromClausePosition)
	}

	getParentAlias(
		jsonRelation: JSONRelation
	): string {
		let fromClausePosition = jsonRelation.fromClausePosition
		if (fromClausePosition.length === 0) {
			throw new Error(`Cannot find alias of a parent entity for the root entity`)
		}
		return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1))
	}

	createRelatedQEntity<IQ extends IQEntityInternal>(
		joinRelation: JSONRelation,
		context: IRelationManagerContext,
	): IQ {
		const dbEntity = this.applicationUtils.getDbEntity(
			joinRelation.si, joinRelation.ti)
		let QEntityConstructor = this.applicationUtils.getQEntityConstructor(
			dbEntity)
		return new QEntityConstructor(
			dbEntity,
			this.applicationUtils,
			this,
			joinRelation.fromClausePosition,
			dbEntity.relations[(<JSONEntityRelation>joinRelation).ri],
			joinRelation.jt)
	}

	getNextChildJoinPosition(
		joinParentDriver: IQEntityDriver
	): number[] {
		let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice()
		nextChildJoinPosition.push(++joinParentDriver.currentChildIndex)

		return nextChildJoinPosition
	}

}
