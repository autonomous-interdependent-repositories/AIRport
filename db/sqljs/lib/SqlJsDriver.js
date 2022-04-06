import { SQLDialect } from '@airport/fuel-hydrant-system';
import { QueryType, StoreType } from '@airport/ground-control';
import { SqLiteDriver } from '@airport/sqlite';
import { STORE_DRIVER } from '@airport/terminal-map';
import { DI } from '@airport/di';
import { SqlJsTransaction } from './SqlJsTransaction';
/**
 * Created by Papa on 11/27/2016.
 */
export class SqlJsDriver extends SqLiteDriver {
    constructor() {
        super();
        this.type = StoreType.SQLJS;
    }
    async initialize() {
        const SQL = await initSqlJs({
            // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
            // You can omit locateFile completely when running in node
            locateFile: file => `./${file}`
        });
        this._db = new SQL.Database();
    }
    async setupTransaction(context, parentTransaction) {
        const transaction = new SqlJsTransaction(this, parentTransaction);
        await this.internalSetupTransaction(transaction, context);
        return transaction;
    }
    async internalStartTransaction(transaction, context) {
        this._db.exec(`SAVEPOINT ${transaction.id}`);
    }
    async internalCommit(transaction, context) {
        this._db.exec(`RELEASE SAVEPOINT ${transaction.id}`);
    }
    async internalRollback(transaction, context) {
        this._db.exec(`ROLLBACK TO SAVEPOINT ${transaction.id}`);
    }
    async query(queryType, query, params = [], context, saveTransaction = false) {
        return new Promise((resolve, reject) => {
            let stmt;
            try {
                if (!['TQ_BOOLEAN_FIELD_CHANGE', 'TQ_DATE_FIELD_CHANGE', 'TQ_NUMBER_FIELD_CHANGE', 'TQ_STRING_FIELD_CHANGE',
                    'TQ_ENTITY_CHANGE', 'TQ_ENTITY_WHERE_CHANGE', 'TQ_TRANSACTION'].some((deltaTableName) => {
                    return query.indexOf(deltaTableName) > -1;
                })) {
                    console.log(query);
                    console.log(params);
                }
                stmt = this._db.prepare(query);
                stmt.bind(params);
                let results = [];
                while (stmt.step()) {
                    results.push(stmt.get());
                }
                console.log(results);
                resolve(results);
            }
            catch (error) {
                reject(error);
            }
            finally {
                if (stmt) {
                    stmt.free();
                }
            }
        });
    }
    handleError(error) {
        throw error;
    }
    getRows(result) {
        return result;
    }
    getReturnValue(queryType, response) {
        switch (queryType) {
            case QueryType.MUTATE:
                return response.rowsAffected;
            case QueryType.SELECT:
                return response.rows;
            default:
                return null;
        }
    }
    getDialect() {
        return SQLDialect.SQLITE;
    }
}
DI.set(STORE_DRIVER, SqlJsDriver);
//# sourceMappingURL=SqlJsDriver.js.map