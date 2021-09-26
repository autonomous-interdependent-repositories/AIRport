import { AliasCache } from '@airport/air-control';
import { DI } from '@airport/di';
import { JSONClauseObjectType, QueryResultType } from '@airport/ground-control';
import { MappedOrderByParser } from '../orderBy/MappedOrderByParser';
import { TreeQueryResultParser } from '../result/TreeQueryResultParser';
import { Q_VALIDATOR, SQL_QUERY_ADAPTOR } from '../tokens';
import { ClauseType } from './core/SQLWhereBase';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
import { SqlFunctionField } from './SqlFunctionField';
/**
 * Created by Papa on 10/28/2016.
 */
export class TreeSQLQuery extends NonEntitySQLQuery {
    constructor(jsonQuery, dialect, context) {
        super(jsonQuery, dialect, QueryResultType.TREE, context);
        const validator = DI.db()
            .getSync(Q_VALIDATOR);
        this.queryParser = new TreeQueryResultParser();
        this.orderByParser = new MappedOrderByParser(validator);
    }
    /**
     * Entities get merged if they are right next to each other in the result set.  If they
     * are not, they are treated as separate entities - hence, your sort order matters.
     *
     * @param results
     * @returns {any[]}
     */
    async parseQueryResults(results, internalFragments, queryResultType, context, bridgedQueryConfiguration) {
        let parsedResults = [];
        if (!results || !results.length) {
            return parsedResults;
        }
        parsedResults = [];
        let lastResult;
        results.forEach((result) => {
            let aliasCache = new AliasCache();
            let parsedResult = this.parseQueryResult(this.jsonQuery.S, result, [0], aliasCache, aliasCache.getFollowingAlias());
            if (!lastResult) {
                parsedResults.push(parsedResult);
            }
            else if (lastResult !== parsedResult) {
                lastResult = parsedResult;
                parsedResults.push(parsedResult);
            }
            this.queryParser.flushRow();
        });
        return parsedResults;
    }
    getSELECTFragment(nested, selectClauseFragment, internalFragments, context) {
        const distinctClause = selectClauseFragment;
        if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
            if (nested) {
                throw new Error(`Cannot have DISTINCT specified in a nested select clause`);
            }
            const distinctSelect = this.getSELECTFragment(nested, distinctClause.af[0].p[0], internalFragments, context);
            return `DISTINCT ${distinctSelect}`;
        }
        let numProperties = 0;
        for (let propertyName in selectClauseFragment) {
            if (propertyName === '*') {
                throw new Error(`'*' operator isn't yet implemented in mapped queries`);
            }
            numProperties++;
        }
        if (numProperties === 0) {
            if (nested) {
                throw new Error(`Mapped query must have fields in a nested-select clause`);
            }
            else {
                return '*';
            }
        }
        let fieldIndex = 0;
        let selectSqlFragment = '';
        for (let propertyName in selectClauseFragment) {
            const value = selectClauseFragment[propertyName];
            // Skip undefined values
            if (value === undefined) {
                continue;
            }
            if (value instanceof SqlFunctionField) {
                selectSqlFragment += value.getValue(this, context);
                continue;
            }
            selectSqlFragment += this.getFieldSelectFragment(value, ClauseType.MAPPED_SELECT_CLAUSE, () => {
                return this.getSELECTFragment(true, value, internalFragments, context);
            }, fieldIndex++, context);
        }
        return selectSqlFragment;
    }
    parseQueryResult(selectClauseFragment, resultRow, nextFieldIndex, aliasCache, entityAlias) {
        const sqlAdaptor = DI.db()
            .getSync(SQL_QUERY_ADAPTOR);
        // Return blanks, primitives and Dates directly
        if (!resultRow || !(resultRow instanceof Object) || resultRow instanceof Date) {
            return resultRow;
        }
        {
            let distinctClause = selectClauseFragment;
            if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
                return this.parseQueryResult(distinctClause.af[0].p[0], resultRow, nextFieldIndex, aliasCache, entityAlias);
            }
        }
        let resultObject = this.queryParser.addEntity(entityAlias);
        for (let propertyName in selectClauseFragment) {
            if (selectClauseFragment[propertyName] === undefined) {
                continue;
            }
            let jsonClauseField = selectClauseFragment[propertyName];
            let dataType = jsonClauseField.dt;
            // Must be a sub-query
            if (!dataType) {
                let childResultObject = this.parseQueryResult(jsonClauseField, resultRow, nextFieldIndex, aliasCache, aliasCache.getFollowingAlias());
                this.queryParser.bufferOneToManyCollection(entityAlias, resultObject, propertyName, childResultObject);
            }
            else {
                let propertyValue = sqlAdaptor.getResultCellValue(resultRow, jsonClauseField.fa, nextFieldIndex[0], dataType, null);
                this.queryParser.addProperty(entityAlias, resultObject, dataType, propertyName, propertyValue);
            }
            nextFieldIndex[0]++;
        }
        return this.queryParser.flushEntity(entityAlias, resultObject);
    }
}
//# sourceMappingURL=TreeSQLQuery.js.map