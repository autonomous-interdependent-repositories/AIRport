export class EntityCopier {
    copyEntityForProcessing(entity, dbEntity, entityStateManager, context) {
        const operation = {
            processedEntityMap: new Map(),
            sequence: context.lastOUID ? context.lastOUID : 0,
        };
        const copy = this.doCopyEntityForProcessing(entity, dbEntity, entityStateManager, operation);
        context.lastOUID = operation.sequence;
        return copy;
    }
    doCopyEntityForProcessing(entity, dbEntity, entityStateManager, operation) {
        if (entity instanceof Array) {
            return entity.map(anEntity => this.doCopyEntityForProcessing(anEntity, dbEntity, entityStateManager, operation));
        }
        else {
            let entityCopy = {};
            if (operation.processedEntityMap.has(entity)) {
                return operation.processedEntityMap.get(entity);
            }
            operation.processedEntityMap.set(entity, entityCopy);
            const operationUniqueId = ++operation.sequence;
            entityCopy[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
            entity[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
            entityStateManager.setOriginalValues(entityStateManager.getOriginalValues(entity), entityCopy);
            for (let dbProperty of dbEntity.properties) {
                const property = entity[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length && property) {
                    entityCopy[dbProperty.name] = this.doCopyEntityForProcessing(property, dbProperty.relation[0].relationEntity, entityStateManager, operation);
                }
                else {
                    // No need to clone dates or JSON objects - they
                    // won't be modified by the save process
                    entityCopy[dbProperty.name] = property;
                }
            }
            entityCopy[entityStateManager.getStateFieldName()]
                = entity[entityStateManager.getStateFieldName()];
            return entityCopy;
        }
    }
}
//# sourceMappingURL=EntityCopier.js.map