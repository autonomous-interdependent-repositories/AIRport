import { container, DI } from '@airport/di';
import { SCHEMA_VERSION_DAO } from '@airport/airspace';
import { SYNC_IN_SCHEMA_VERSION_CHECKER } from '../../../tokens';
export class SyncInSchemaVersionChecker {
    async ensureSchemaVersions(message) {
        try {
            let schemaCheckMap = await this.checkVersionsSchemasDomains(message);
            for (let i = 0; i < message.schemaVersions.length; i++) {
                const schemaVersion = message.schemaVersions[i];
                message.schemaVersions[i] = schemaCheckMap
                    .get(schemaVersion.schema.domain.name).get(schemaVersion.schema.name)
                    .schemaVersion;
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async checkVersionsSchemasDomains(message) {
        const { allSchemaNames, domainNames, schemaVersionCheckMap } = this.getNames(message);
        const schemaVersionDao = await container(this).get(SCHEMA_VERSION_DAO);
        const schemaVersions = await schemaVersionDao.findByDomainNamesAndSchemaNames(domainNames, allSchemaNames);
        let lastDomainName;
        let lastSchemaName;
        for (let schemaVersion of schemaVersions) {
            let domainName = schemaVersion.schema.domain.name;
            let schemaName = schemaVersion.schema.name;
            if (lastDomainName !== domainName
                && lastSchemaName !== schemaName) {
                let schemaVersionNumber = schemaVersion.integerVersion;
                for (let [_, schemaCheck] of schemaVersionCheckMap.get(domainName)) {
                    if (schemaCheck.schemaName === schemaName) {
                        schemaCheck.found = true;
                        if (schemaCheck.schemaVersionNumber > schemaVersionNumber) {
                            throw new Error(`Installed schema ${schemaName} for domain ${domainName}
	is at a lower version ${schemaVersionNumber} than needed in message ${schemaCheck.schemaVersionNumber}.`);
                        }
                        schemaCheck.schemaVersion = schemaVersion;
                    }
                }
                lastDomainName = domainName;
                lastSchemaName = schemaName;
            }
        }
        for (const [domainName, schemaChecks] of schemaVersionCheckMap) {
            for (let [_, schemaCheck] of schemaChecks) {
                if (!schemaCheck.found) {
                    // TODO: download and install the schema
                    throw new Error(`Schema ${schemaCheck.schemaName} for domain ${domainName} is not installed.`);
                }
            }
        }
        return schemaVersionCheckMap;
    }
    getNames(message) {
        if (!message.schemaVersions || !(message.schemaVersions instanceof Array)) {
            throw new Error(`Did not find schemaVersions in TerminalMessage.`);
        }
        const schemaVersionCheckMap = new Map();
        for (let schemaVersion of message.schemaVersions) {
            if (!schemaVersion.integerVersion || typeof schemaVersion.integerVersion !== 'number') {
                throw new Error(`Invalid SchemaVersion.integerVersion.`);
            }
            const schema = message.schemas[schemaVersion.schema];
            if (typeof schema !== 'object') {
                throw new Error(`Invalid SchemaVersion.schema`);
            }
            schemaVersion.schema = schema;
            const domain = schema.domain;
            let schemaChecksForDomain = schemaVersionCheckMap.get(domain.name);
            if (!schemaChecksForDomain) {
                schemaChecksForDomain = new Map();
                schemaVersionCheckMap.set(domain.name, schemaChecksForDomain);
            }
            if (!schemaChecksForDomain.has(schema.name)) {
                schemaChecksForDomain.set(schema.name, {
                    schemaName: schema.name,
                    schemaVersionNumber: schemaVersion.integerVersion
                });
            }
        }
        const domainNames = [];
        const allSchemaNames = [];
        for (const [domainName, schemaChecksForDomainMap] of schemaVersionCheckMap) {
            domainNames.push(domainName);
            for (let [schemaName, _] of schemaChecksForDomainMap) {
                allSchemaNames.push(schemaName);
            }
        }
        return {
            allSchemaNames,
            domainNames,
            schemaVersionCheckMap
        };
    }
}
DI.set(SYNC_IN_SCHEMA_VERSION_CHECKER, SyncInSchemaVersionChecker);
//# sourceMappingURL=SyncInSchemaVersionChecker.js.map