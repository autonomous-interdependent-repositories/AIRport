import { JsonFieldQuery } from '../../query/facade/FieldQuery';
import { JSONSqlFunctionCall } from './Functions';
/**
 * All possible types of serialized JSON clauses.
 */
export declare enum JSONClauseObjectType {
    FIELD = 0,
    FIELD_FUNCTION = 1,
    FIELD_QUERY = 2,
    DISTINCT_FUNCTION = 3,
    EXISTS_FUNCTION = 4,
    MANY_TO_ONE_RELATION = 5,
}
/**
 * Types of data
 */
export declare enum SQLDataType {
    ANY = 0,
    BOOLEAN = 1,
    DATE = 2,
    JSON = 3,
    NUMBER = 4,
    STRING = 5,
}
export declare function getSqlDataType(type: string): SQLDataType;
/**
 * Base serialized JSON clause.
 */
export interface JSONClauseObject {
    /**
     * Applied Functions
     * All functions applied to this clause, in order of definition
     */
    af: JSONSqlFunctionCall[];
    /**
     * Object Type
     * Type of clause
     */
    ot: JSONClauseObjectType;
    /**
     * Data Type
     * Data contentType of the clause (contentType of what it evaluates to)
     */
    dt: SQLDataType;
}
/**
 * Serialized field (as used in a query)
 */
export interface JSONClauseField extends JSONClauseObject {
    /**
     * Schema Version id
     */
    si?: number;
    /**
     * Table Index
     * Index of the entity to which this field belongs
     */
    ti?: number;
    /**
     * Field Alias
     * Alias of the field/column (in the query)
     */
    fa: string;
    /**
     * Property Index
     * Property index (representing a property on the entity).
     */
    pi?: number;
    /**
     * Column Index
     * Column index (representing a column on the entity).
     */
    ci?: number;
    /**
     * Field Sub Query
     * A reference pointer from a field to a sub-query, as defined in SELECT clause via the field function
     */
    fsq?: JsonFieldQuery;
    /**
     * Table Alias
     * Alias of the table to which this field/column belongs
     */
    ta?: string;
    /**
     * Value
     * alias of the field/column or (a) serialized function call(s) / sub-query
     */
    v?: string | JSONClauseField | JsonFieldQuery;
}
