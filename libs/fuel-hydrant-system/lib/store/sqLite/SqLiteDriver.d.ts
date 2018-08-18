import { QueryType } from "@airport/ground-control";
import { SqlDriver } from "../SqlDriver";
/**
 * Created by Papa on 11/27/2016.
 */
export declare abstract class SqLiteDriver extends SqlDriver {
    protected findNative(sqlQuery: string, parameters: any[]): Promise<any[]>;
    protected executeNative(sql: string, parameters: any[]): Promise<number>;
    protected convertValueIn(value: any): number | string;
    protected abstract query(queryType: QueryType, query: string, params: any, saveTransaction?: boolean): Promise<any>;
    initAllTables(): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
}
