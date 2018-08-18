import { IUtils, MappedEntityArray, ReferencedColumnData } from '@airport/air-control';
import { DbEntity, QueryResultType, SQLDataType } from '@airport/ground-control';
export declare class GraphQueryConfiguration {
    strict: boolean;
    mapped: boolean;
}
export interface IEntityResultParser {
    addEntity(entityAlias: string, dbEntity: DbEntity): any;
    addProperty(entityAlias: string, resultObject: any, dataType: SQLDataType, propertyName: string, propertyValue: any): boolean;
    bufferManyToOneStub(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relationInfos: ReferencedColumnData[]): void;
    bufferBlankManyToOneStub(entityAlias: string, resultObject: any, propertyName: string, relationInfos: ReferencedColumnData[]): void;
    bufferManyToOneObject(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relatedEntityId: any): void;
    bufferBlankManyToOneObject(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferOneToManyStub(otmDbEntity: DbEntity, otmPropertyName: string): void;
    bufferOneToManyCollection(entityAlias: string, resultObject: any, otmDbEntity: DbEntity, propertyName: string, relationDbEntity: DbEntity, childResultObject: any): void;
    bufferBlankOneToMany(entityAlias: string, resultObject: any, otmEntityName: string, propertyName: string, relationDbEntity: DbEntity): void;
    flushEntity(entityAlias: string, dbEntity: DbEntity, selectClauseFragment: any, idValue: any, resultObject: any): any;
    flushRow(): void;
    bridge(parsedResults: any[], selectClauseFragment: any): any[] | MappedEntityArray<any>;
}
export declare function getObjectResultParser(utils: IUtils, queryResultType: QueryResultType, config?: GraphQueryConfiguration, rootDbEntity?: DbEntity): IEntityResultParser;
export declare abstract class AbstractObjectResultParser {
    protected utils: IUtils;
    constructor(utils: IUtils);
    protected addManyToOneStub(resultObject: any, propertyName: string, relationInfos: ReferencedColumnData[]): boolean;
}
