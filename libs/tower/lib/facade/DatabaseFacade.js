import { DATABASE_FACADE, Delete, InsertColumnValues, InsertValues, UpdateColumns, UpdateProperties, } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { UPDATE_CACHE_MANAGER, ENTITY_STATE_MANAGER, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { ENTITY_COPIER } from '../tokens';
/**
 * Created by Papa on 5/23/2016.
 */
export class DatabaseFacade {
    async addRepository(name, url = null, platform = PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH, context) {
        // TODO: figure out how addRepository will work
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.addRepository(name, url, platform, platformConfig, distributionStrategy, context);
    }
    async insertColumnValues(rawInsertColumnValues, context) {
        if (!rawInsertColumnValues) {
            return 0;
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const insertColumnValues = new InsertColumnValues(rawInsertColumnValues);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(insertColumnValues, null, context);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.insertValues(portableQuery, context);
    }
    async insertValues(rawInsertValues, context) {
        if (!rawInsertValues) {
            return 0;
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const insertValues = new InsertValues(rawInsertValues);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(insertValues, null, context);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.insertValues(portableQuery, context);
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues, context) {
        if (!rawInsertColumnValues) {
            return [];
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const insertValues = new InsertColumnValues(rawInsertColumnValues);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(insertValues, null, context);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.insertValuesGetIds(portableQuery, context);
    }
    async insertValuesGenerateIds(rawInsertValues, context) {
        if (!rawInsertValues) {
            return [];
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const insertValues = new InsertValues(rawInsertValues);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(insertValues, null, context);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.insertValuesGetIds(portableQuery, context);
    }
    async deleteWhere(rawDelete, context) {
        if (!rawDelete) {
            return 0;
        }
        if (rawDelete instanceof Function) {
            rawDelete = rawDelete();
        }
        let deleteWhere = new Delete(rawDelete);
        let portableQuery = context.ioc.queryFacade.getPortableQuery(deleteWhere, null, context);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.deleteWhere(portableQuery, context);
    }
    async save(entity, context) {
        if (!entity) {
            return null;
        }
        const [updateCacheManager, entityCopier, entityStateManager, transactionalConnector] = await container(this).get(UPDATE_CACHE_MANAGER, ENTITY_COPIER, ENTITY_STATE_MANAGER, TRANSACTIONAL_CONNECTOR);
        const dbEntity = context.dbEntity;
        const entityCopy = entityCopier
            .copyEntityForProcessing(entity, dbEntity, entityStateManager);
        updateCacheManager.setOperationState(entityCopy, dbEntity, entityStateManager, new Set());
        const saveResult = await transactionalConnector.save(entityCopy, context);
        updateCacheManager.afterSaveModifications(entity, dbEntity, saveResult, entityStateManager, new Set());
        return saveResult;
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdate, context) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        let updateColumns = new UpdateColumns(rawUpdate);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(updateColumns, null, context);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.updateValues(portableQuery, context);
    }
    async updateWhere(rawUpdate, context) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        let update = new UpdateProperties(rawUpdate);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(update, null, context);
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.updateValues(portableQuery, context);
    }
    prepare(queryFunction) {
        return new FunctionWrapper(queryFunction);
    }
}
DI.set(DATABASE_FACADE, DatabaseFacade);
export class FunctionWrapper {
    constructor(queryFunction) {
        throw new Error('Not Implemented');
    }
    find(...params) {
    }
}
//# sourceMappingURL=DatabaseFacade.js.map