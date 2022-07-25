import {EntityCandidate} from '../../../parser/EntityCandidate'
import {
	entityExtendsAirEntity,
}                        from '../../application/SApplicationBuilder'
import {IBuilder}         from '../../Builder'
import {VColumnBuilder}   from './VColumnBuilder'
import {VEntityBuilder}   from './VEntityBuilder'
import {VPropertyBuilder} from './VPropertyBuilder'
import {VRelationBuilder} from './VRelationBuilder'

/**
 * Created by Papa on 5/20/2016.
 */
export class IVEntityInterfaceBuilder
	implements IBuilder {

	idPropertyBuilders: VPropertyBuilder[]
	idRelationBuilders: VRelationBuilder[]
	nonIdColumnBuilders: VColumnBuilder[]
	nonIdPropertyBuilders: VPropertyBuilder[]
	nonIdRelationBuilders: VRelationBuilder[]

	constructor(
		public entity: EntityCandidate,
		private vEntityBuilder: VEntityBuilder
	) {
		this.idPropertyBuilders    = vEntityBuilder.idPropertyBuilders
		this.idRelationBuilders    = vEntityBuilder.idRelationBuilders
		this.nonIdColumnBuilders   = vEntityBuilder.nonIdColumnBuilders
		this.nonIdPropertyBuilders = vEntityBuilder.nonIdPropertyBuilders
		this.nonIdRelationBuilders = vEntityBuilder.nonIdRelationBuilders
	}

	build(): string {
		let entityName = `${this.entity.docEntry.name}`

		let idEProperties = ``
		this.idPropertyBuilders.forEach((
			builder: VPropertyBuilder
		) => {
			idEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`
		})

		let optionalIdEProperties = ``
		this.idPropertyBuilders.forEach((
			builder: VPropertyBuilder
		) => {
			optionalIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let idRelationsEntityIdEProperties = ``
		this.idRelationBuilders.forEach((
			builder: VRelationBuilder
		) => {
			const idRelationsEntityIdProperty = builder.buildInterfaceDefinition(true, false)
			if (idRelationsEntityIdProperty) {
				idRelationsEntityIdEProperties += `\t${idRelationsEntityIdProperty}\n`
			}
		})

		let optionalIdRelationsEntityIdEProperties = ``
		this.idRelationBuilders.forEach((
			builder: VRelationBuilder
		) => {
			const idRelationsEntityIdProperty = builder.buildInterfaceDefinition(true)
			if (idRelationsEntityIdProperty) {
				optionalIdRelationsEntityIdEProperties += `\t${idRelationsEntityIdProperty}\n`
			}
		})

		let idRelationsForEntityEProperties = ``
		this.idRelationBuilders.forEach((
			builder: VRelationBuilder
		) => {
			idRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`
		})

		let nonIdEProperties = ``
		this.nonIdPropertyBuilders.forEach((
			builder: VPropertyBuilder
		) => {
			nonIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let nonIdEColumns = ``
		this.nonIdColumnBuilders.forEach((
			builder: VColumnBuilder
		) => {
			nonIdEColumns += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let nonIdRelationsForUpdateEProperties = ``
		this.nonIdRelationBuilders.forEach((
			builder: VRelationBuilder
		) => {
			const nonIdRelationForUpdateProperties = builder.buildInterfaceDefinition(true)
			if (nonIdRelationForUpdateProperties) {
				nonIdRelationsForUpdateEProperties += `\t${nonIdRelationForUpdateProperties}\n`
			}
		})

		let nonIdRelationsForEntityEProperties = ``
		this.nonIdRelationBuilders.forEach((
			builder: VRelationBuilder
		) => {
			nonIdRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`
		})

		const [isAirEntity, isLocal]
			                           = entityExtendsAirEntity(this.entity)
		let relationsForCascadeGraph = ``
		if (!isAirEntity) {
			this.idRelationBuilders.forEach((
				builder: VRelationBuilder
			) => {
				// if (getManyToOneDecorator(builder.entityProperty)) {
				// 	// Do NOT cascade @ManyToOne's
				// 	return
				// }
				relationsForCascadeGraph += `\t${builder.buildInterfaceDefinition(
					false, true, true, true)}\n`
			})
		}

		this.nonIdRelationBuilders.forEach((
			builder: VRelationBuilder
		) => {
			// if (getManyToOneDecorator(builder.entityProperty)) {
			// 	// Do NOT cascade @ManyToOne's
			// 	return
			// }
			relationsForCascadeGraph += `\t${builder.buildInterfaceDefinition(
				false, true, true, true)}\n`
		})

		let extendedVInterface                 = `IEntitySelectProperties`
		let extendedVUpdatePropertiesInterface = `IEntityUpdateProperties`
		let extendedVCascadeGraphInterface     = `IEntityCascadeGraph`
		let extendedVUpdateColumnsInterface    = `IEntityUpdateColumns`
		let extendedVIdInterface               = 'IEntityIdProperties'
		if (this.entity.parentEntity) {
			const parentType                   = this.entity.parentEntity.type
			extendedVInterface                 = `${parentType}ESelect`
			extendedVUpdatePropertiesInterface = `${parentType}EUpdateProperties`
			extendedVCascadeGraphInterface     = `${parentType}Graph`
			extendedVUpdateColumnsInterface    = `${parentType}EUpdateColumns`
			extendedVIdInterface               = `${parentType}EId`
		}

		let interfaceSource = `
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ${entityName}ESelect
    extends ${extendedVInterface}, ${entityName}EOptionalId {
	// Non-Id Properties
${nonIdEProperties}
	// Id Relations - full property interfaces
${idRelationsForEntityEProperties}
  // Non-Id relations (including OneToMany's)
${nonIdRelationsForEntityEProperties}
}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ${entityName}EId
    extends ${extendedVIdInterface} {
	// Id Properties
${idEProperties}
	// Id Relations - Ids only
${idRelationsEntityIdEProperties}
}

/**
 * Ids fields and relations only (optional).
 */
export interface ${entityName}EOptionalId {
	// Id Properties
${optionalIdEProperties}
	// Id Relations - Ids only
${optionalIdRelationsEntityIdEProperties}
}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ${entityName}EUpdateProperties
	extends ${extendedVUpdatePropertiesInterface} {
	// Non-Id Properties
${nonIdEProperties}
	// Non-Id Relations - _localIds only & no OneToMany's
${nonIdRelationsForUpdateEProperties}
}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ${entityName}Graph
	extends ${entityName}EOptionalId, ${extendedVCascadeGraphInterface} {
// NOT USED: Cascading Relations
// NOT USED: \${relationsForCascadeGraph}
\t// Non-Id Properties
${nonIdEProperties}
\t// Relations
${relationsForCascadeGraph}
}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ${entityName}EUpdateColumns
	extends ${extendedVUpdateColumnsInterface} {
	// Non-Id Columns
${nonIdEColumns}
}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ${entityName}ECreateProperties
extends Partial<${entityName}EId>, ${entityName}EUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ${entityName}ECreateColumns
extends ${entityName}EId, ${entityName}EUpdateColumns {
}

`

		return interfaceSource
	}

}
