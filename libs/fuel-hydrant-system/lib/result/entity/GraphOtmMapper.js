import { newMappedEntityArray } from '@airport/air-control';
import { ensureChildArray, ensureChildMap } from '@airport/ground-control';
// For OtM mapping in bridged queries
export class GraphOtmMapper {
    constructor() {
        // Map of MtO referred objects by OtM references
        // [] OTM Reference Entity Schema Index
        // [] OTM Reference Entity Index
        this.mtoEntityReferenceMap = [];
        // Map of objects with OtM references by
        // [] OtM reference Schema Entity Index
        // [] OtM reference Entity Index
        this.otmEntityReferenceMap = [];
    }
    addMtoReference(mtoStubReference, mtoEntityId, dbEntity, context) {
        // If the @OneToMany({ mappedBy: ... }) is missing, there is nothing to map to
        if (!mtoStubReference.otmEntityField) {
            return;
        }
        // Add into mtoEntityReferenceMap
        const otmDbEntity = mtoStubReference.otmDbEntity;
        let mtoEntityReferenceMapForEntity = ensureChildMap(ensureChildArray(this.mtoEntityReferenceMap, otmDbEntity.schemaVersion.schema.index), otmDbEntity.index);
        let mapForOtmEntity = mtoEntityReferenceMapForEntity[mtoStubReference.otmEntityId];
        if (!mapForOtmEntity) {
            mapForOtmEntity = {};
            mtoEntityReferenceMapForEntity[mtoStubReference.otmEntityId] = mapForOtmEntity;
        }
        let mtoCollection = mapForOtmEntity[mtoStubReference.otmEntityField];
        if (!mtoCollection) {
            mtoCollection = newMappedEntityArray(context.ioc.schemaUtils, dbEntity);
            mapForOtmEntity[mtoStubReference.otmEntityField]
                = mtoCollection;
        }
        mtoCollection.put(mtoStubReference.mtoParentObject);
    }
    addOtmReference(otmStubReference, otmEntityIdValue) {
        // Add into otoEntityReferenceMap
        const otmDbEntity = otmStubReference.otmDbEntity;
        let mtoEntityReferenceMapForEntity = ensureChildMap(ensureChildArray(this.otmEntityReferenceMap, otmDbEntity.schemaVersion.schema.index), otmDbEntity.index);
        let otmRecordByPropertyName = mtoEntityReferenceMapForEntity[otmEntityIdValue];
        if (!otmRecordByPropertyName) {
            otmRecordByPropertyName = {};
            mtoEntityReferenceMapForEntity[otmEntityIdValue] = otmRecordByPropertyName;
        }
        otmRecordByPropertyName[otmStubReference.otmPropertyName] = otmStubReference.otmObject;
    }
    populateOtms(entityMap, keepMappedEntityArrays) {
        for (const schemaIndex in this.mtoEntityReferenceMap) {
            const mtoEntityReferenceMapForSchema = this.mtoEntityReferenceMap[schemaIndex];
            for (const entityIndex in mtoEntityReferenceMapForSchema) {
                const mtoEntityReferenceMapForEntity = mtoEntityReferenceMapForSchema[entityIndex];
                // If there are no entities of this type in query results, just keep the stubs
                if (!entityMap[schemaIndex]) {
                    continue;
                }
                let entityOfTypeMap = entityMap[schemaIndex][entityIndex];
                // If there are no entities of this type in query results, just keep the stubs
                if (!entityOfTypeMap) {
                    continue;
                }
                // If there are no OTM for this type in query results, no mapping needs to happen
                if (!this.otmEntityReferenceMap[schemaIndex]) {
                    continue;
                }
                let entityWithOtmMap = this.otmEntityReferenceMap[schemaIndex][entityIndex];
                // If there are no OTM for this type in query results, no mapping needs to happen
                if (!entityWithOtmMap) {
                    continue;
                }
                for (let otmEntityId in mtoEntityReferenceMapForEntity) {
                    let referencedEntitiesByPropertyMap = mtoEntityReferenceMapForEntity[otmEntityId];
                    let otmRecordByPropertyName = entityWithOtmMap[otmEntityId];
                    // If there are no OtMs for this entity, no mapping needs to happen
                    if (!otmRecordByPropertyName) {
                        continue;
                    }
                    for (let otmProperty in referencedEntitiesByPropertyMap) {
                        let otmEntity = otmRecordByPropertyName[otmProperty];
                        // If OtM entity doesn't have this collection, no mapping needs to happen
                        if (!otmEntity) {
                            continue;
                        }
                        let referencedEntityMap = referencedEntitiesByPropertyMap[otmProperty];
                        let otmCollection = otmEntity[otmProperty];
                        // If @OneToMany isn't set yet
                        if (!otmCollection) {
                            otmEntity[otmProperty] = referencedEntityMap;
                        }
                        else {
                            otmCollection.putAll(referencedEntityMap);
                        }
                        if (!keepMappedEntityArrays) {
                            otmRecordByPropertyName[otmProperty] = otmEntity[otmProperty].slice();
                        }
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=GraphOtmMapper.js.map