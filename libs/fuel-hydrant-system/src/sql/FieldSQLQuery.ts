import {
	IAirportDatabase,
	IQMetadataUtils,
	ISchemaUtils
}                           from '@airport/air-control'
import {
	JSONClauseField,
	JSONClauseObjectType,
	JsonFieldQuery,
	QueryResultType
}                           from '@airport/ground-control'
import {ExactOrderByParser} from '../orderBy/ExactOrderByParser'
import {SQLDialect}         from './core/SQLQuery'
import {ClauseType}         from './core/SQLWhereBase'
import {NonEntitySQLQuery}  from './NonEntitySQLQuery'

/**
 * Created by Papa on 10/29/2016.
 */

export class FieldSQLQuery
	extends NonEntitySQLQuery<JsonFieldQuery> {

	constructor(
		jsonQuery: JsonFieldQuery,
		dialect: SQLDialect
	) {
		super(jsonQuery, dialect, QueryResultType.FIELD)
		this.orderByParser = new ExactOrderByParser(this.validator)
	}

	protected getSELECTFragment(
		nested: boolean,
		selectClauseFragment: any,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		if (!selectClauseFragment) {
			throw new Error(`SELECT clause is not defined for a Field Query`)
		}
		{
			let distinctClause = <JSONClauseField>selectClauseFragment
			if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
				let distinctSelect = this.getSELECTFragment(
					nested, distinctClause.af[0].p[0],
					airDb, schemaUtils, metadataUtils)
				return `DISTINCT ${distinctSelect}`
			}
		}

		let field             = <JSONClauseField>selectClauseFragment
		let fieldIndex        = 0
		let selectSqlFragment = this.getFieldSelectFragment(
			field, ClauseType.NON_MAPPED_SELECT_CLAUSE,
			null, fieldIndex++,
			airDb, schemaUtils, metadataUtils)
		return selectSqlFragment
	}

	parseQueryResults(
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		results: any[]
	): any[] {
		let parsedResults: any[] = []
		if (!results || !results.length) {
			return parsedResults
		}
		parsedResults = []
		let lastResult
		results.forEach((result) => {
			let parsedResult = this.parseQueryResult(this.jsonQuery.S, result, [0])
			parsedResults.push(parsedResult)
		})

		return parsedResults
	}

	protected parseQueryResult(
		selectClauseFragment: any,
		resultRow: any,
		nextFieldIndex: number[],
	): any {
		let field         = <JSONClauseField>selectClauseFragment
		let propertyValue = this.sqlAdaptor.getResultCellValue(resultRow, field.fa, nextFieldIndex[0], field.dt, null)
		nextFieldIndex[0]++

		return propertyValue
	}

}
