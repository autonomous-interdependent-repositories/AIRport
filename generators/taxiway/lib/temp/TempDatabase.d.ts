import { JsonSchema } from '@airport/ground-control';
import { JsonSchemaWithLastIds } from '../../../takeoff/node_modules/@airport/security-check/lib';
export interface ITempDatabase {
    initialize(schemas: JsonSchema[]): Promise<void>;
}
export declare class TempDatabase implements ITempDatabase {
    private tempDbInitialized;
    initialize(schemas: JsonSchemaWithLastIds[]): Promise<void>;
}
//# sourceMappingURL=TempDatabase.d.ts.map