import {
	DbRelation,
	JoinType,
	JSONEntityRelation,
	JSONRelation
}                         from '@airport/ground-control'
import {IAirportDatabase} from '../../../lingo/AirportDatabase'
import {
	IQEntityDriver,
	IQEntityInternal
}                         from '../../../lingo/core/entity/Entity'
import {ISchemaUtils}     from '../../../lingo/utils/SchemaUtils'

/**
 * Created by Papa on 4/26/2016.
 */

export function QRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal
) {
	this.dbRelation = dbRelation
	this.parentQ    = parentQ
}

QRelation.getPositionAlias = function (
	rootEntityPrefix: string,
	fromClausePosition: number[]
) {
	return `${rootEntityPrefix}_${fromClausePosition.join('_')}`
}

QRelation.getAlias = function (
	jsonRelation: JSONRelation
): string {
	return this.getPositionAlias(jsonRelation.rep, jsonRelation.fcp)
}

QRelation.getParentAlias = function (
	jsonRelation: JSONRelation
): string {
	let fromClausePosition = jsonRelation.fcp
	if (fromClausePosition.length === 0) {
		throw new Error(`Cannot find alias of a parent entity for the root entity`)
	}
	return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1))
}

QRelation.createRelatedQEntity = function <IQ extends IQEntityInternal>(
	joinRelation: JSONRelation,
	airDb: IAirportDatabase,
	schemaUtils: ISchemaUtils
): IQ {
	const dbEntity         = schemaUtils.getDbEntity(
		joinRelation.si, joinRelation.ti, airDb)
	let QEntityConstructor = schemaUtils.getQEntityConstructor(
		dbEntity, airDb)
	return new QEntityConstructor<IQ>(
		dbEntity,
		joinRelation.fcp,
		dbEntity.relations[(<JSONEntityRelation>joinRelation).ri],
		joinRelation.jt)
}

QRelation.getNextChildJoinPosition = function (
	joinParentDriver: IQEntityDriver
): number[] {
	let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice()
	nextChildJoinPosition.push(++joinParentDriver.currentChildIndex)

	return nextChildJoinPosition
}

QRelation.prototype.innerJoin = function <IQ extends IQEntityInternal>(): IQ {
	return this.getNewQEntity(JoinType.INNER_JOIN)
}

QRelation.prototype.leftJoin = function <IQ extends IQEntityInternal>(): IQ {
	return this.getNewQEntity(JoinType.LEFT_JOIN)
}

QRelation.prototype.getNewQEntity = function <IQ extends IQEntityInternal>(joinType: JoinType): IQ {
	const dbEntity           = this.dbRelation.property.entity
	const utils              = this.parentQ.__driver__.utils
	const qEntityConstructor = utils.Schema.getQEntityConstructor(
		this.dbRelation.relationEntity)

	let newQEntity: IQEntityInternal       = new qEntityConstructor(
		dbEntity,
		QRelation.getNextChildJoinPosition(this.parentQ.__driver__),
		this.dbRelation,
		joinType
	)
	newQEntity.__driver__.parentJoinEntity = this.parentQ
	return <IQ>newQEntity
}
