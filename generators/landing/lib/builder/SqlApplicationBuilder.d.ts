import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { IContext } from '@airport/direction-indicator';
import { JsonApplication, JsonApplicationColumn, JsonApplicationEntity } from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/security-check';
import { IStoreDriver } from '@airport/terminal-map';
import { IApplication } from '@airport/airspace';
import { IApplicationBuilder } from './IApplicationBuilder';
export declare abstract class SqlApplicationBuilder implements IApplicationBuilder {
    airportDatabase: IAirportDatabase;
    build(jsonApplication: JsonApplication, existingApplicationMap: Map<string, IApplication>, newJsonApplicationMap: Map<string, JsonApplicationWithLastIds>, context: IContext): Promise<void>;
    abstract createApplication(jsonApplication: JsonApplication, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    buildTable(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity, existingApplicationMap: Map<string, IApplication>, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    buildForeignKeys(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity, existingApplicationMap: Map<string, IApplication>, newJsonApplicationMap: Map<string, JsonApplicationWithLastIds>, relatedJsonApplicationMap: Map<string, JsonApplication>, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    buildForeignKeysForTable(): Promise<void>;
    protected abstract getIndexSql(indexName: string, tableName: string, columnNameList: string[], unique: boolean): string;
    protected abstract getForeignKeySql(tableName: string, foreignKeyName: string, foreignKeyColumnNames: string[], referencedTableName: string, referencedColumnNames: string[]): string;
    abstract buildAllSequences(jsonApplications: JsonApplication[], context: IContext): Promise<ISequence[]>;
    abstract stageSequences(jsonApplications: JsonApplication[], context: IContext): ISequence[];
    abstract getColumnSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity, column: JsonApplicationColumn): string;
    abstract getCreateTableSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity): string;
    protected isPrimaryKeyColumn(jsonEntity: JsonApplicationEntity, jsonColumn: JsonApplicationColumn): boolean;
    protected getPrimaryKeyStatement(columnNames: string[]): string;
}
//# sourceMappingURL=SqlApplicationBuilder.d.ts.map