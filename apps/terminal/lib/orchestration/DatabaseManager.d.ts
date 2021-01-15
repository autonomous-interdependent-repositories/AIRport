import { IContext } from '@airport/di';
import { JsonSchema } from '@airport/ground-control';
export interface IDatabaseManager {
    isInitialized(): boolean;
    initWithDb(domainName: string, context: IContext, ...schemas: JsonSchema[]): Promise<void>;
    initNoDb(domainName: string, context: IContext, ...schemas: JsonSchema[]): Promise<void>;
}
export declare class DatabaseManager implements IDatabaseManager {
    private airDb;
    initNoDb(domainName: string, context: IContext, ...schemas: JsonSchema[]): Promise<void>;
    initWithDb(domainName: string, context: IContext, ...schemas: JsonSchema[]): Promise<void>;
    isInitialized(): boolean;
    private initFeatureSchemas;
    private initTerminal;
    private installAirportSchema;
}
//# sourceMappingURL=DatabaseManager.d.ts.map