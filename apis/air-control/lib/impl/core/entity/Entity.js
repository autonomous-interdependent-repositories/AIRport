"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const TreeQuery_1 = require("../../query/facade/TreeQuery");
const qSchemaBuilderUtils_1 = require("../../utils/qSchemaBuilderUtils");
const Joins_1 = require("../Joins");
const Relation_1 = require("./Relation");
function QEntity(dbEntity, fromClausePosition = [], dbRelation = null, joinType = null, QDriver = QEntityDriver) {
    this.__driver__ = new QDriver(dbEntity, fromClausePosition, dbRelation, joinType, this);
}
exports.QEntity = QEntity;
QEntity.prototype.fullJoin = function (right) {
    return this.__driver__.join(right, ground_control_1.JoinType.FULL_JOIN);
};
QEntity.prototype.innerJoin = function (right) {
    return this.__driver__.join(right, ground_control_1.JoinType.INNER_JOIN);
};
QEntity.prototype.leftJoin = function (right) {
    return this.__driver__.join(right, ground_control_1.JoinType.LEFT_JOIN);
};
QEntity.prototype.rightJoin = function (right) {
    return this.__driver__.join(right, ground_control_1.JoinType.RIGHT_JOIN);
};
class QEntityDriver {
    constructor(dbEntity, fromClausePosition = [], dbRelation = null, joinType = null, qEntity) {
        this.dbEntity = dbEntity;
        this.fromClausePosition = fromClausePosition;
        this.dbRelation = dbRelation;
        this.joinType = joinType;
        this.qEntity = qEntity;
        this.entityFieldMap = {};
        this.entityRelations = [];
        this.idColumns = [];
        this.allColumns = [];
        this.relations = [];
        this.currentChildIndex = -1;
    }
    getInstance(airDb, schemaUtils) {
        const qEntityConstructor = schemaUtils
            .getQEntityConstructor(this.dbEntity, airDb);
        let instance = new qEntityConstructor(this.dbEntity, this.fromClausePosition, this.dbRelation, this.joinType);
        instance.__driver__.currentChildIndex = this.currentChildIndex;
        instance.__driver__.joinWhereClause = this.joinWhereClause;
        instance.__driver__.entityFieldMap = this.entityFieldMap;
        instance.__driver__.entityRelations = this.entityRelations;
        return instance;
    }
    /*
    addEntityRelation<R extends IQEntityInternal>(
        relation: IQInternalRelation<R>
    ): void {
        this.entityRelations[relation.parentRelationIndex] = relation;
    }

    addEntityField<T, IQF extends IQOperableFieldInternal<T, JSONBaseOperation, any, any>>(
        field: IQF
    ): void {
        this.entityFieldMap[field.fieldName] = field;
    }
    */
    /*
    getRelationPropertyName(): string {
        return QMetadataUtils.getRelationPropertyName(QMetadataUtils.getRelationByIndex(this.qEntity, this.relationIndex));
    }
*/
    getRelationJson(columnAliases, queryUtils, fieldUtils) {
        let jsonRelation = {
            cci: this.currentChildIndex,
            ti: this.dbEntity.index,
            fcp: this.fromClausePosition,
            jt: this.joinType,
            rt: null,
            rep: columnAliases.entityAliases.getNextAlias(this.getRootJoinEntity()),
            si: this.dbEntity.schemaVersion.id
        };
        if (this.joinWhereClause) {
            this.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils);
        }
        else if (this.dbRelation) {
            this.getEntityRelationJson(jsonRelation);
        }
        else {
            this.getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils);
        }
        return jsonRelation;
    }
    getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils) {
        jsonRelation.rt = ground_control_1.JSONRelationType.ENTITY_JOIN_ON;
        jsonRelation.jwc = queryUtils.whereClauseToJSON(this.joinWhereClause, columnAliases, fieldUtils);
        return jsonRelation;
    }
    getEntityRelationJson(jsonRelation) {
        jsonRelation.rt = ground_control_1.JSONRelationType.ENTITY_SCHEMA_RELATION;
        jsonRelation.ri = this.dbRelation.index;
        // if (!this.dbRelation.whereJoinTable) {
        return jsonRelation;
        // }
        // let otmQEntity;
        // let mtoQEntity;
        // switch (this.dbRelation.relationType) {
        // 	case EntityRelationType.ONE_TO_MANY:
        // 		mtoQEntity = this.qEntity;
        // 		otmQEntity = this.parentJoinEntity;
        // 		break;
        // 	case EntityRelationType.MANY_TO_ONE:
        // 		otmQEntity = this.qEntity;
        // 		mtoQEntity = this.parentJoinEntity;
        // 		break;
        // 	default:
        // 		throw new Error(`Unknown EntityRelationType: ${this.dbRelation.relationType}`);
        // }
        //
        // let joinWhereClause = this.dbRelation.whereJoinTable.addToJoinFunction(otmQEntity,
        // mtoQEntity, this.airportDb, this.airportDb.F); jsonRelation.jwc    =
        // this.utils.Query.whereClauseToJSON(joinWhereClause, columnAliases);
        // jsonRelation.wjto   = this.dbRelation.joinFunctionWithOperator;  return
        // jsonRelation;
    }
    getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils) {
        jsonRelation.rt = (this instanceof QTreeDriver) ? ground_control_1.JSONRelationType.SUB_QUERY_ROOT : ground_control_1.JSONRelationType.ENTITY_ROOT;
        return jsonRelation;
    }
    getQ() {
        return this.qEntity;
    }
    join(right, joinType, airDb, schemaUtils) {
        let joinChild = right
            .__driver__.getInstance(airDb, schemaUtils);
        joinChild.__driver__.currentChildIndex = 0;
        let nextChildPosition = Relation_1.QRelation.getNextChildJoinPosition(this);
        joinChild.__driver__.fromClausePosition = nextChildPosition;
        joinChild.__driver__.joinType = joinType;
        joinChild.__driver__.parentJoinEntity = this.qEntity;
        return new Joins_1.JoinFields(joinChild);
    }
    isRootEntity() {
        return !this.parentJoinEntity;
    }
    getRootJoinEntity() {
        let rootEntity = this.qEntity;
        while (rootEntity.__driver__.parentJoinEntity) {
            rootEntity = rootEntity.__driver__.parentJoinEntity;
        }
        return rootEntity;
    }
}
exports.QEntityDriver = QEntityDriver;
function QTree(fromClausePosition = [], subQuery) {
    QTree.base.constructor.call(this, null, fromClausePosition, null, null, QTreeDriver);
    this.__driver__.subQuery = subQuery;
}
exports.QTree = QTree;
qSchemaBuilderUtils_1.extend(QEntity, QTree, {});
class QTreeDriver extends QEntityDriver {
    getInstance(airDb, schemaUtils) {
        let instance = super.getInstance(airDb, schemaUtils);
        instance.__driver__
            .subQuery = this.subQuery;
        return instance;
    }
    // getRelationPropertyName(): string {
    // 	throw new Error(`not implemented`);
    // }
    getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils);
        jsonRelation.rt = ground_control_1.JSONRelationType.SUB_QUERY_JOIN_ON;
        jsonRelation.sq = new TreeQuery_1.TreeQuery(this.subQuery, columnAliases.entityAliases)
            .toJSON(queryUtils, fieldUtils);
        return jsonRelation;
    }
    getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils);
        jsonRelation.rt = ground_control_1.JSONRelationType.SUB_QUERY_ROOT;
        jsonRelation.sq = new TreeQuery_1.TreeQuery(this.subQuery, columnAliases.entityAliases)
            .toJSON(queryUtils, fieldUtils);
        return jsonRelation;
    }
}
exports.QTreeDriver = QTreeDriver;
//# sourceMappingURL=Entity.js.map