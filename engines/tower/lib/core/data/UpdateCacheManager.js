import { UPDATE_CACHE_MANAGER } from "@airport/air-control";
import { DI } from "@airport/di";
import { EntityRelationType, EntityState, SQLDataType } from "@airport/ground-control";
export class UpdateCacheManager {
    saveOriginalValues(entity, dbEntity, entityStateManager, applicationUtils) {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.saveOriginalValues(entity[i], dbEntity, entityStateManager, applicationUtils);
            }
            return;
        }
        if (!entity) {
            return;
        }
        const originalValuesObject = {};
        entityStateManager.setOriginalValues(originalValuesObject, entity);
        for (let dbProperty of dbEntity.properties) {
            const property = entity[dbProperty.name];
            if (dbProperty.relation && dbProperty.relation.length) {
                if (!property) {
                    continue;
                }
                if (dbProperty.relation[0].relationType === EntityRelationType.MANY_TO_ONE) {
                    // Save the nested child object Ids in the original values of this object
                    // in case the object behind this relation is changed
                    applicationUtils.forEachColumnTypeOfRelation(dbProperty.relation[0], (_dbColumn, propertyNameChains) => {
                        for (let propertyNameChain of propertyNameChains) {
                            let nestedProperty = entity;
                            let currentPropertyOriginalValue = originalValuesObject;
                            for (let i = 0; i < propertyNameChain.length; i++) {
                                const propertyName = propertyNameChain[i];
                                if (nestedProperty instanceof Object) {
                                    nestedProperty = nestedProperty[propertyName];
                                    let originalValue;
                                    // Nested object continues
                                    if (i === propertyNameChain.length - 1) {
                                        originalValue = nestedProperty;
                                    }
                                    else {
                                        originalValue = {};
                                    }
                                    currentPropertyOriginalValue[propertyName] = originalValue;
                                    currentPropertyOriginalValue = currentPropertyOriginalValue[propertyName];
                                }
                                else {
                                    // This is the actual value
                                    currentPropertyOriginalValue[propertyName] = nestedProperty;
                                }
                            }
                        }
                    });
                }
                this.saveOriginalValues(property, dbProperty.relation[0].relationEntity, entityStateManager, applicationUtils);
            }
            else {
                originalValuesObject[dbProperty.name] = entity[dbProperty.name];
            }
        }
    }
    setOperationState(entityCopy, dbEntity, entityStateManager, applicationUtils, processedEntities) {
        if (entityCopy instanceof Array) {
            for (var i = 0; i < entityCopy.length; i++) {
                this.setOperationState(entityCopy[i], dbEntity, entityStateManager, applicationUtils, processedEntities);
            }
            return;
        }
        if (processedEntities.has(entityCopy)) {
            return;
        }
        processedEntities.add(entityCopy);
        const originalValuesObject = entityStateManager
            .getOriginalValues(entityCopy);
        let entityState = entityCopy[entityStateManager.getStateFieldName()];
        let hasId = true;
        let hasGeneratedIds = false;
        for (const dbProperty of dbEntity.properties) {
            if (!dbProperty.isId) {
                continue;
            }
            for (const propertyColumn of dbProperty.propertyColumns) {
                if (propertyColumn.column.isGenerated) {
                    hasGeneratedIds = true;
                }
            }
            if (dbProperty.relation && dbProperty.relation.length) {
                applicationUtils.forEachColumnTypeOfRelation(dbProperty.relation[0], (_dbColumn, propertyNameChains) => {
                    for (let propertyNameChain of propertyNameChains) {
                        let nestedProperty = entityCopy;
                        for (let i = 0; i < propertyNameChain.length; i++) {
                            const propertyName = propertyNameChain[i];
                            if (nestedProperty) {
                                nestedProperty = nestedProperty[propertyName];
                            }
                        }
                        if (!nestedProperty) {
                            if (entityState === EntityState.DELETE) {
                                throw new Error(`Entity is marked for deletion but does not have an @Id() property:
            ${propertyNameChain.join('.')}
                                    `);
                            }
                            else {
                                entityState = EntityState.CREATE;
                                hasId = false;
                                return true;
                            }
                        }
                    }
                });
            }
            else if (!entityCopy[dbProperty.name] && entityCopy[dbProperty.name] !== 0) {
                hasId = false;
            }
        }
        if (originalValuesObject) {
            for (const dbProperty of dbEntity.properties) {
                const property = entityCopy[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length) {
                    if (!property) {
                        continue;
                    }
                    const dbRelation = dbProperty.relation[0];
                    const propertyOriginalValuesObject = entityStateManager
                        .getOriginalValues(property);
                    applicationUtils.forEachColumnTypeOfRelation(dbRelation, (_dbColumn, propertyNameChains) => {
                        const propertyOriginalValuesObject = entityStateManager
                            .getOriginalValues(property);
                        // const firstPropertyNameChain = propertyNameChains[0];
                        for (const propertyNameChain of propertyNameChains) {
                            let value = entityCopy;
                            let originalValue = propertyOriginalValuesObject;
                            for (let i = 0; i < propertyNameChain.length; i++) {
                                const propertyName = propertyNameChain[i];
                                value = value[propertyName];
                                // Skip the property itself since the original values object
                                // belongs to the property and not the checked object
                                // (in the case of relations only)
                                if (i !== 0) {
                                    originalValue = originalValue[propertyName];
                                }
                                let noValue = value === null || value === undefined;
                                let noOriginalValue = originalValue === null
                                    || originalValue === undefined;
                                if (noValue) {
                                    if (originalValue) {
                                        entityState = EntityState.UPDATE;
                                        return true;
                                    }
                                    break;
                                }
                                if (noOriginalValue) {
                                    if (value) {
                                        entityState = EntityState.UPDATE;
                                        return true;
                                    }
                                    break;
                                }
                                // If it's a nested object
                                if (typeof value === 'object') {
                                    // If original isn't a nested object
                                    if (typeof originalValue !== 'object') {
                                        entityState = EntityState.UPDATE;
                                        return true;
                                    }
                                    // Values should not be dates or json objects, only
                                    // nested object references to eventual Ids
                                }
                                else if (typeof originalValue === 'object') {
                                    // value is not a nested object but originalValue is
                                    entityState = EntityState.UPDATE;
                                    return true;
                                }
                                else {
                                    // Both values are primitives (nested ids)
                                    if (value !== originalValue) {
                                        entityState = EntityState.UPDATE;
                                        return true;
                                    }
                                }
                            }
                        }
                    });
                }
                else {
                    if (entityState) {
                        continue;
                    }
                    let originalValue = originalValuesObject[dbProperty.name];
                    let propertyValue;
                    switch (dbProperty.propertyColumns[0].column.type) {
                        case SQLDataType.DATE:
                            if (originalValue) {
                                originalValue = originalValue.getTime();
                            }
                            if (property) {
                                propertyValue = property.getTime();
                            }
                            break;
                        case SQLDataType.JSON:
                            if (originalValue) {
                                originalValue = JSON.stringify(originalValue);
                            }
                            if (property) {
                                propertyValue = JSON.stringify(property);
                            }
                            break;
                        default:
                            propertyValue = property;
                            break;
                    }
                    if (propertyValue !== originalValue) {
                        entityState = EntityState.UPDATE;
                    }
                }
            }
        }
        for (const dbProperty of dbEntity.properties) {
            const property = entityCopy[dbProperty.name];
            if (property && dbProperty.relation && dbProperty.relation.length) {
                this.setOperationState(property, dbProperty.relation[0].relationEntity, entityStateManager, applicationUtils, processedEntities);
            }
        }
        if (!entityState) {
            if ((hasId && hasGeneratedIds) || originalValuesObject) {
                entityState = EntityState.PASS_THROUGH;
            }
            else {
                entityState = EntityState.CREATE;
            }
        }
        entityCopy[entityStateManager.getStateFieldName()] = entityState;
    }
    afterSaveModifications(entity, dbEntity, saveResult, entityStateManager, applicationUtils, processedEntities) {
        this.updateOriginalValuesAfterSave(entity, dbEntity, saveResult, entityStateManager, applicationUtils, new Set());
        this.removeDeletedEntities(entity, dbEntity, saveResult, entityStateManager, processedEntities);
    }
    updateOriginalValuesAfterSave(entity, dbEntity, saveResult, entityStateManager, applicationUtils, processedEntities) {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.updateOriginalValuesAfterSave(entity[i], dbEntity, saveResult, entityStateManager, applicationUtils, processedEntities);
            }
        }
        else {
            if (processedEntities.has(entity)) {
                return;
            }
            processedEntities.add(entity);
            let operationUniqueId = entityStateManager.getOperationUniqueId(entity, false, dbEntity);
            let originalValuesObject = {};
            if (operationUniqueId) {
                originalValuesObject = this.doUpdateOriginalValuesAfterSave(entity, dbEntity, saveResult, entityStateManager, applicationUtils, processedEntities, operationUniqueId);
            }
            entityStateManager.setOriginalValues(originalValuesObject, entity);
        }
    }
    doUpdateOriginalValuesAfterSave(entity, dbEntity, saveResult, entityStateManager, applicationUtils, processedEntities, operationUniqueId) {
        let createdRecord = saveResult.created[operationUniqueId];
        if (createdRecord) {
            if (createdRecord !== true) {
                for (const generatedPropertyName in createdRecord) {
                    entity[generatedPropertyName] = createdRecord[generatedPropertyName];
                }
                if (dbEntity.isRepositoryEntity) {
                    let repositoryEntity = entity;
                    if (!repositoryEntity.repository || !repositoryEntity.repository.id) {
                        repositoryEntity.repository = saveResult.newRepository;
                    }
                    repositoryEntity.actor = saveResult.actor;
                }
            }
        }
        else if (saveResult.deleted[operationUniqueId]) {
            entityStateManager.setIsDeleted(true, entity);
            entityStateManager.setOriginalValues(null, entity);
            return;
        }
        let originalValuesObject = {};
        for (const dbProperty of dbEntity.properties) {
            const property = entity[dbProperty.name];
            if (property && dbProperty.relation && dbProperty.relation.length) {
                if (dbProperty.relation[0].relationType === EntityRelationType.MANY_TO_ONE) {
                    // Save the nested child object Ids in the original values of this object
                    // in case the object behind this relation is changed
                    applicationUtils.forEachColumnTypeOfRelation(dbProperty.relation[0], (_dbColumn, propertyNameChains) => {
                        for (let propertyNameChain of propertyNameChains) {
                            let nestedProperty = entity;
                            let currentPropertyOriginalValue = originalValuesObject;
                            for (let i = 0; i < propertyNameChain.length; i++) {
                                const propertyName = propertyNameChain[i];
                                if (nestedProperty instanceof Object) {
                                    nestedProperty = nestedProperty[propertyName];
                                    let originalValue;
                                    // Nested object continues
                                    if (i === propertyNameChain.length - 1) {
                                        originalValue = nestedProperty;
                                    }
                                    else {
                                        originalValue = {};
                                    }
                                    currentPropertyOriginalValue[propertyName] = originalValue;
                                    currentPropertyOriginalValue = currentPropertyOriginalValue[propertyName];
                                }
                                else {
                                    // This is the actual value
                                    currentPropertyOriginalValue[propertyName] = nestedProperty;
                                }
                            }
                        }
                    });
                }
                this.updateOriginalValuesAfterSave(property, dbProperty.relation[0].relationEntity, saveResult, entityStateManager, applicationUtils, processedEntities);
            }
            else {
                originalValuesObject[dbProperty.name] = property;
            }
        }
        return originalValuesObject;
    }
    removeDeletedEntities(entity, dbEntity, saveResult, entityStateManager, processedEntities) {
        if (entity instanceof Array) {
            for (let i = entity.length - 1; i >= 0; i--) {
                if (this.removeDeletedEntities(entity[i], dbEntity, saveResult, entityStateManager, processedEntities)) {
                    entity.splice(i, 1);
                }
            }
            return !entity.length;
        }
        else {
            if (processedEntities.has(entity)) {
                return entityStateManager.isDeleted(entity);
            }
            processedEntities.add(entity);
            for (const dbRelation of dbEntity.relations) {
                const dbRelationProperty = dbRelation.property;
                const property = entity[dbRelationProperty.name];
                if (!property) {
                    continue;
                }
                switch (dbRelation.relationType) {
                    case EntityRelationType.MANY_TO_ONE:
                        if (this.removeDeletedEntities(property, dbRelation.relationEntity, saveResult, entityStateManager, processedEntities)) {
                            entity[dbRelationProperty.name] = null;
                        }
                        break;
                    case EntityRelationType.ONE_TO_MANY:
                        this.removeDeletedEntities(property, dbRelation.relationEntity, saveResult, entityStateManager, processedEntities);
                        break;
                }
            }
            return entityStateManager.isDeleted(entity);
        }
    }
}
DI.set(UPDATE_CACHE_MANAGER, UpdateCacheManager);
//# sourceMappingURL=UpdateCacheManager.js.map