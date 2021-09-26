/**
 * Operations define how records can be Created, Updated and Deleted.
 * They specify the structure of the inputted objects (as well as nested
 * objects).  That in turn defines exactly which objects are
 * created/updated/deleted by an operation.
 */
import { ISchemaQuery } from '../query/PortableQuery';
import { DbEntity } from './Entity';
export declare type Operation_Id = number;
export declare type Operation_Name = string;
export declare type Operation_Rule = string;
export declare type Operation_Type = number;
export declare enum OperationType {
    DELETE = "DELETE",
    FIND_ONE_GRAPH = "FIND_ONE_GRAPH",
    FIND_ONE_TREE = "FIND_ONE_TREE",
    FIND_GRAPH = "FIND_GRAPH",
    FIND_TREE = "FIND_TREE",
    SAVE = "SAVE",
    SEARCH_ONE_GRAPH = "SEARCH_ONE_GRAPH",
    SEARCH_ONE_TREE = "SEARCH_ONE_TREE",
    SEARCH_GRAPH = "SEARCH_GRAPH",
    SEARCH_TREE = "SEARCH_TREE"
}
export interface JsonOperations {
    [operationName: string]: JsonOperation;
}
export interface JsonOperation {
    type: OperationType;
}
export declare enum QueryInputKind {
    PARAMETER = "PARAMETER",
    Q = "Q",
    QENTITY = "QENTITY"
}
export declare enum QueryParameterType {
    BOOLEAN = "BOOLEAN",
    DATE = "DATE",
    NUMBER = "NUMBER",
    STRING = "STRING"
}
export interface QueryInput {
    clazz?: string;
    name: string;
    type: QueryInputKind;
}
export interface QueryParameter extends QueryInput {
    isArray: boolean;
    parameterType: QueryParameterType;
    type: QueryInputKind.PARAMETER;
}
export interface QueryInputQEntity extends QueryInput {
    type: QueryInputKind.QENTITY;
}
export interface JsonFormattedQuery extends JsonOperation {
    inputs: QueryInput[];
    query: ISchemaQuery;
    type: OperationType.FIND_GRAPH | OperationType.FIND_TREE | OperationType.FIND_ONE_GRAPH | OperationType.FIND_ONE_TREE | OperationType.SEARCH_GRAPH | OperationType.SEARCH_TREE | OperationType.SEARCH_ONE_GRAPH | OperationType.SEARCH_ONE_TREE;
}
export interface JsonPersistRule extends JsonOperation, JsonOperationRule {
    type: OperationType.DELETE | OperationType.SAVE;
}
export interface JsonOperationRule {
    anyValue?: boolean;
    functionCall?: JsonFunctionCall;
    isArray?: boolean;
    isNull?: boolean;
    numericValue?: number;
    operator?: '|';
    subRules?: {
        [key: string]: JsonOperationRule;
    } | JsonOperationRule[];
}
export interface JsonFunctionCall {
    functionName: string;
    parameters: number[];
}
export interface DbOperation {
    id: Operation_Id;
    name: Operation_Name;
    rule: Operation_Rule;
    type: Operation_Type;
    entity: DbEntity;
}
//# sourceMappingURL=Operation.d.ts.map