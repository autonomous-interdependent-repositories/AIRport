import { AIRPORT_DATABASE } from '@airport/air-control';
import { IOC } from '@airport/direction-indicator';
import { STORE_DRIVER } from '@airport/terminal-map';
import { DATABASE_MANAGER } from '@airport/terminal';
export * from './PostgreQueryAdaptor';
export * from './PostgreSchemaBuilder';
export * from './PostgreSqlDriver';
export * from './PostgreTransaction';
export * from './tokens';
export async function startDb(domainName, connectionString) {
    const storeDriver = await IOC.get(STORE_DRIVER);
    await storeDriver.initialize(connectionString, {});
    await IOC.get(AIRPORT_DATABASE);
    const dbManager = await IOC.get(DATABASE_MANAGER);
    await dbManager.initWithDb(domainName, {});
}
export async function closeDb() {
}
//# sourceMappingURL=index.js.map