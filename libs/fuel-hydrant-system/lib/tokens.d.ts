import { ISubStatementSqlGenerator } from './sql/core/SubStatementSqlGenerator';
import { IObjectResultParserFactory } from './result/entity/ObjectResultParserFactory';
import { ISQLQueryAdaptor } from './adaptor/SQLQueryAdaptor';
import { IActiveQueries } from './store/ActiveQueries';
import { IIdGenerator } from './store/IdGenerator';
import { IValidator } from './validation/Validator';
import { IStoreDriver } from '@airport/terminal-map';
import { SQLWhereBase } from './sql/core/SQLWhereBase';
export declare const ACTIVE_QUERIES: import("@airport/direction-indicator").IDependencyInjectionToken<IActiveQueries>;
export declare const SUB_STATEMENT_SQL_GENERATOR: import("@airport/direction-indicator").IDependencyInjectionToken<ISubStatementSqlGenerator>;
export declare const ID_GENERATOR: import("@airport/direction-indicator").IDependencyInjectionToken<IIdGenerator>;
export declare const OBJECT_RESULT_PARSER_FACTORY: import("@airport/direction-indicator").IDependencyInjectionToken<IObjectResultParserFactory>;
export declare const Q_VALIDATOR: import("@airport/direction-indicator").IDependencyInjectionToken<IValidator>;
export declare const SQL_QUERY_ADAPTOR: import("@airport/direction-indicator").IDependencyInjectionToken<ISQLQueryAdaptor>;
export declare const ABSTRACT_SQL_DRIVER: import("@airport/direction-indicator").IDependencyInjectionToken<IStoreDriver>;
export declare const SQL_WHERE_BASE: import("@airport/direction-indicator").IDependencyInjectionToken<SQLWhereBase>;
//# sourceMappingURL=tokens.d.ts.map