export var EntityState;
(function (EntityState) {
    EntityState["CREATE"] = "CREATE";
    EntityState["DATE"] = "DATE";
    EntityState["DELETE"] = "DELETE";
    EntityState["PARENT_ID"] = "PARENT_ID";
    EntityState["STUB"] = "STUB";
    EntityState["UPDATE"] = "UPDATE";
})(EntityState || (EntityState = {}));
export class UiStateManager {
    isStub(entity) {
        return this.getEntityState(entity) === EntityState.STUB;
    }
    isParentId(entity) {
        return this.getEntityState(entity) === EntityState.PARENT_ID;
    }
    markForDeletion(entity, arrayToRemoveFrom) {
        entity[UiStateManager.STATE_FIELD] = EntityState.DELETE;
        if (!arrayToRemoveFrom) {
            return;
        }
        for (let i = arrayToRemoveFrom.length - 1; i >= 0; i--) {
            if (arrayToRemoveFrom[i] === entity) {
                arrayToRemoveFrom.splice(i, 1);
                break;
            }
        }
    }
    isDeleted(entity) {
        return entity[UiStateManager.STATE_FIELD] === EntityState.DELETE;
    }
    markAsStub(entity) {
        entity[UiStateManager.STATE_FIELD] = EntityState.STUB;
    }
    getEntityState(entity) {
        return entity[UiStateManager.STATE_FIELD];
    }
}
UiStateManager.STATE_FIELD = '__state__';
//# sourceMappingURL=UiStateManager.js.map