export declare enum EntityState {
    NEW = 0,
    STUB = 1,
    EXISTING = 2
}
export interface EntityWithState {
    __state__: EntityState;
}
export declare function getEntityState(entity: any): EntityState;
export declare function isStub(entity: any): boolean;
export declare function markAsStub<T>(entity: T): T;
export declare function isNew(entity: any): boolean;
export declare function markAsNew<T>(entity: T): T;
export declare function isExisting(entity: any): boolean;
export declare function markAsExisting<T>(entity: T): T;
//# sourceMappingURL=EntityState.d.ts.map