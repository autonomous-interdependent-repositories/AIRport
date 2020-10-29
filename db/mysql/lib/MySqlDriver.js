import { DI } from '@airport/di';
import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType, STORE_DRIVER } from '@airport/ground-control';
import { transactional } from '@airport/tower';
import * as mysql from 'mysql2/promise';
import { DDLManager } from './DDLManager';
import { MySqlTransaction } from './MySqlTransaction';
export class MySqlDriver extends SqlDriver {
    async query(queryType, query, params, saveTransaction) {
        return await this.doQuery(queryType, query, params, this.queryApi, saveTransaction);
    }
    async doQuery(queryType, query, params, connection, saveTransaction) {
        let nativeParameters = params.map((value) => this.convertValueIn(value));
        const results = await connection.query(query, nativeParameters);
        return results[0];
    }
    initialize(dbName) {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        this.queryApi = this.pool;
        return null;
    }
    numFreeConnections() {
        return this.pool._freeConnections.length;
    }
    isServer() {
        return true;
    }
    async transact(keepAlive) {
        const connection = await this.pool.getConnection();
        await connection.beginTransaction();
        return new MySqlTransaction(this, this.pool, connection);
    }
    isValueValid(value, sqlDataType) {
        throw new Error('Method not implemented.');
    }
    async doesTableExist(schemaName, tableName) {
        const result = await this.findNative(
        // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
        `select count(1) from information_schema.TABLES
where TABLE_SCHEMA = '${schemaName}'
and TABLE_NAME = '${tableName}';`, []);
        return result == 1;
    }
    async dropTable(schemaName, tableName) {
        await this.findNative(`DROP TABLE '${schemaName}'.'${tableName}'`, []);
        return true;
    }
    async findNative(sqlQuery, parameters) {
        return await this.query(QueryType.SELECT, sqlQuery, parameters);
    }
    async initAllTables() {
        let createOperations;
        let createQueries = [];
        let createSql = DDLManager.getCreateDDL();
        await transactional(async () => {
            for (const createSqlStatement of createSql) {
                const createTablePromise = this.query(QueryType.DDL, createSqlStatement, [], false);
                createQueries.push(createTablePromise);
            }
            await this.initTables(createQueries);
        });
    }
    async initTables(createQueries) {
        for (let i = 0; i < createQueries.length; i++) {
            let currentQuery = createQueries[i];
            await currentQuery;
        }
    }
    getDialect() {
        return SQLDialect.MYSQL;
    }
    async executeNative(sql, parameters) {
        return await this.query(QueryType.MUTATE, sql, parameters);
    }
    convertValueIn(value) {
        switch (typeof value) {
            case 'boolean':
            // return value ? 1 : 0
            case 'number':
            case 'string':
                return value;
            case 'undefined':
                return null;
            case 'object':
                if (!value) {
                    return null;
                }
                else if (value instanceof Date) {
                    // return value.getTime()
                    return value;
                }
                else {
                    throw new Error(`Unexpected non-date object ${value}`);
                }
            default:
                throw new Error(`Unexpected typeof value: ${typeof value}`);
        }
    }
}
DI.set(STORE_DRIVER, MySqlDriver);
//# sourceMappingURL=MySqlDriver.js.map