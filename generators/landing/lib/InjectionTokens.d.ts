import { ISchemaBuilder } from './builder/ISchemaBuilder';
import { ISchemaChecker } from './checker/SchemaChecker';
import { ISchemaRecorder } from './recorder/SchemaRecorder';
import { ISchemaInitializer } from './SchemaInitializer';
export declare const SCHEMA_BUILDER: import("@airport/di").DiToken<ISchemaBuilder>;
export declare const SCHEMA_CHECKER: import("@airport/di").DiToken<ISchemaChecker>;
export declare const SCHEMA_INITIALIZER: import("@airport/di").DiToken<ISchemaInitializer>;
export declare const SCHEMA_LOCATOR: import("@airport/di").DiToken<ISchemaBuilder>;
export declare const SCHEMA_RECORDER: import("@airport/di").DiToken<ISchemaRecorder>;
