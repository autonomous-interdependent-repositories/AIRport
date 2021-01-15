import { DI }              from '@airport/di';
import { QUERY_VALIDATOR } from '../tokens';
import {
	IQueryRequest,
	QueryType
}                          from './Query';

export interface IQueryValidator {

	validate(
		request: IQueryRequest
	): void
}

export class QueryValidator
	implements IQueryValidator {

	validate(request: IQueryRequest) {
		switch (request.type) {
			case QueryType.DYNAMIC:
				throw new Error(`Dynamic queries are not (yet) supported by Highway.`);
			case QueryType.PREPARED:
				// TODO: implement
				return null;
			default:
				throw new Error(`Unknown Query type: ${request.type}`);
		}

	}
}

DI.set(QUERY_VALIDATOR, QueryValidator);
