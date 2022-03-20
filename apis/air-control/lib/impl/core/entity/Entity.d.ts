import { DbEntity, DbRelation, JoinType, JSONBaseOperation, JSONEntityRelation, JSONJoinRelation, JSONRelation, JSONViewJoinRelation } from '@airport/ground-control';
import { IAirportDatabase } from '../../../lingo/AirportDatabase';
import { IFieldColumnAliases } from '../../../lingo/core/entity/Aliases';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IFrom, IQEntity, IQEntityDriver, IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IJoinFields } from '../../../lingo/core/entity/Joins';
import { IQInternalRelation } from '../../../lingo/core/entity/Relation';
import { IQOperableFieldInternal } from '../../../lingo/core/field/OperableField';
import { IEntityDatabaseFacade } from '../../../lingo/core/repository/EntityDatabaseFacade';
import { RawTreeQuery } from '../../../lingo/query/facade/TreeQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils';
import { FieldColumnAliases } from './Aliases';
/**
 * Created by Papa on 4/21/2016.
 */
export interface IQEntityInternalConstructor {
    entityConstructor: {
        new (...args: any[]): any;
    };
    applicationHash: string;
    entityIndex: number;
    new <IQE extends IQEntityInternal>(...args: any[]): IQE;
}
export declare namespace QEntity {
    function db<IEntity>(databaseName?: string): IEntityDatabaseFacade<IEntity, IEntitySelectProperties, IEntityCreateProperties, IEntityUpdateProperties, IEntityUpdateColumns, IEntityIdProperties, IEntityCascadeGraph, IQEntity>;
}
export interface QEntityConstructor {
    new <IQE extends IQEntityInternal>(dbEntity: DbEntity, fromClausePosition?: number[], dbRelation?: DbRelation, joinType?: JoinType, QDriver?: {
        new (...args: any[]): IQEntityDriver;
    }): IQE;
}
export declare function QEntity<IEntity>(dbEntity: DbEntity, fromClausePosition?: number[], dbRelation?: any, joinType?: JoinType, QDriver?: {
    new (...args: any[]): IQEntityDriver;
}): void;
export declare class QEntityDriver implements IQEntityDriver {
    dbEntity: DbEntity;
    fromClausePosition: number[];
    dbRelation: DbRelation;
    joinType: JoinType;
    private qEntity;
    entityFieldMap: {
        [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any>;
    };
    entityRelations: IQInternalRelation<any>[];
    entityRelationMapByIndex: {
        [relationPropertyIndex: number]: IQInternalRelation<any>;
    };
    idColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    allColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    relations: IQInternalRelation<any>[];
    currentChildIndex: number;
    joinWhereClause: JSONBaseOperation;
    parentJoinEntity: IQEntityInternal;
    private entityRelationMap;
    private oneToManyConfigMap;
    constructor(dbEntity: DbEntity, fromClausePosition: number[], dbRelation: DbRelation, joinType: JoinType, qEntity: IQEntityInternal);
    getInstance(airDb: IAirportDatabase, applicationUtils: IApplicationUtils): IQEntityInternal;
    getRelationJson(columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONRelation;
    getJoinRelationJson(jsonRelation: JSONJoinRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONJoinRelation;
    getEntityRelationJson(jsonRelation: JSONEntityRelation): JSONEntityRelation;
    getRootRelationJson(jsonRelation: JSONRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONJoinRelation;
    getQ(): IQEntityInternal;
    join<IF extends IFrom>(right: IF, joinType: JoinType): IJoinFields<IF>;
    isRootEntity(): boolean;
    getRootJoinEntity(): IQEntityInternal;
}
export declare function QTree(fromClausePosition: number[], subQuery: RawTreeQuery<any>): void;
export interface IQTreeDriver extends IQEntityDriver {
    subQuery: RawTreeQuery<any>;
}
export declare class QTreeDriver extends QEntityDriver implements IQTreeDriver {
    subQuery: RawTreeQuery<any>;
    getInstance(airDb: IAirportDatabase, applicationUtils: IApplicationUtils): IQEntityInternal;
    getJoinRelationJson(jsonRelation: JSONViewJoinRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONViewJoinRelation;
    getRootRelationJson(jsonRelation: JSONViewJoinRelation, columnAliases: FieldColumnAliases, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONViewJoinRelation;
}
//# sourceMappingURL=Entity.d.ts.map