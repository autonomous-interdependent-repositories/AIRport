/**
 * All possible types of serialized JSON clauses.
 */
export var JSONClauseObjectType;
(function (JSONClauseObjectType) {
    JSONClauseObjectType[JSONClauseObjectType["FIELD"] = 0] = "FIELD";
    JSONClauseObjectType[JSONClauseObjectType["FIELD_FUNCTION"] = 1] = "FIELD_FUNCTION";
    JSONClauseObjectType[JSONClauseObjectType["FIELD_QUERY"] = 2] = "FIELD_QUERY";
    JSONClauseObjectType[JSONClauseObjectType["DISTINCT_FUNCTION"] = 3] = "DISTINCT_FUNCTION";
    JSONClauseObjectType[JSONClauseObjectType["EXISTS_FUNCTION"] = 4] = "EXISTS_FUNCTION";
    JSONClauseObjectType[JSONClauseObjectType["MANY_TO_ONE_RELATION"] = 5] = "MANY_TO_ONE_RELATION"; // A many-to-one relation (used in a query)
})(JSONClauseObjectType || (JSONClauseObjectType = {}));
/**
 * Types of data
 */
export var SQLDataType;
(function (SQLDataType) {
    // Allowing ANY allows developers to de-type their data
    SQLDataType[SQLDataType["ANY"] = 0] = "ANY";
    SQLDataType[SQLDataType["BOOLEAN"] = 1] = "BOOLEAN";
    SQLDataType[SQLDataType["DATE"] = 2] = "DATE";
    // Allowing JSON allows developers to de-normalize their data
    SQLDataType[SQLDataType["JSON"] = 3] = "JSON";
    SQLDataType[SQLDataType["NUMBER"] = 4] = "NUMBER";
    SQLDataType[SQLDataType["STRING"] = 5] = "STRING";
})(SQLDataType || (SQLDataType = {}));
export function getSqlDataType(type) {
    switch (type) {
        case 'any':
            return SQLDataType.ANY;
        case 'boolean':
            return SQLDataType.BOOLEAN;
        case 'Date':
            return SQLDataType.DATE;
        case 'Json':
            return SQLDataType.JSON;
        case 'number':
            return SQLDataType.NUMBER;
        case 'string':
            return SQLDataType.STRING;
        default:
            throw new Error(`Uknown type: ${type}`);
    }
}
//# sourceMappingURL=JSONClause.js.map