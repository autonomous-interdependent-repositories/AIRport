import {
	DbRelation,
	JoinType,
	JSONEntityRelation,
	JSONRelation,
	JSONRelationType,
	ApplicationRelation_Index,
	Application_Index,
	ApplicationEntity_TableIndex
} from "@airport/ground-control";

/**
 * Created by Papa on 10/18/2016.
 */


export class JoinTreeNode {

	constructor(
		public jsonRelation: JSONRelation,
		public childNodes: JoinTreeNode[],
		public parentNode: JoinTreeNode
	) {
	}

	addChildNode(
		joinTreeNode: JoinTreeNode
	): void {
		let childFromClausePositionArray = joinTreeNode.jsonRelation.fromClausePosition;
		let childPosition                = childFromClausePositionArray[childFromClausePositionArray.length - 1];
		this.childNodes[childPosition]   = joinTreeNode;
	}

	getEntityRelationChildNode(
		dbRelation: DbRelation
	): JoinTreeNode {
		return this.getEntityRelationChildNodeByIndexes(
			dbRelation.property.entity.applicationVersion._localId,
			dbRelation.property.entity.index,
			dbRelation.index
		);
	}

	getEntityRelationChildNodeByIndexes(
		applicationIndex: Application_Index,
		tableIndex: ApplicationEntity_TableIndex,
		relationIndex: ApplicationRelation_Index
	): JoinTreeNode {
		let matchingNodes = this.childNodes.filter((childNode) => {
			return (<JSONEntityRelation>childNode.jsonRelation).ri === relationIndex;
		});
		switch (matchingNodes.length) {
			case 0:
				break;
			case 1:
				return matchingNodes[0];
			default:
				throw new Error(`More than one child node matched relation property index '${relationIndex}'`)
		}
		// No node matched, this must be reference to a sub-entity in select clause (in a Entity
		// query)
		let childPosition = this.jsonRelation.fromClausePosition.slice();
		childPosition.push(this.childNodes.length);
		let rootEntityPrefix;
		if (this.parentNode) {
			rootEntityPrefix = this.parentNode.jsonRelation.rep;
		} else {
			rootEntityPrefix = this.jsonRelation.rep;
		}
		let jsonEntityRelation: JSONEntityRelation = {
			currentChildIndex: 0,
			fromClausePosition: childPosition,
			ti: tableIndex,
			jt: JoinType.LEFT_JOIN,
			rt: JSONRelationType.ENTITY_APPLICATION_RELATION,
			rep: rootEntityPrefix,
			ri: relationIndex,
			si: applicationIndex
		};
		let childTreeNode                          = new JoinTreeNode(jsonEntityRelation, [], this);
		this.addChildNode(childTreeNode);

		return childTreeNode;
	}
}
