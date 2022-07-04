import { DbEntity, ApplicationEntity_TableIndex } from "../../lingo/application/Entity";
import { ApplicationColumn_Index } from "../../lingo/application/Property";
import { ApplicationVersion_LocalId } from "../../lingo/application/Application";
import { ColumnMap } from "./ColumnMap";
import { TableMap } from "./TableMap";
export declare class ApplicationMap {
    applicationMap: {
        [applicationVersion_localId: string]: TableMap;
    };
    constructor(applicationMap?: {
        [applicationVersion_localId: string]: TableMap;
    });
    ensureEntity(entity: DbEntity, allColumns?: boolean, TableMapConstructor?: typeof TableMap): ColumnMap;
    ensure(applicationVersionLocalId: ApplicationVersion_LocalId, tableIndex: ApplicationEntity_TableIndex, allColumns?: boolean, TableMapConstructor?: typeof TableMap): ColumnMap;
    existsByStructure(applicationVersionLocalId: ApplicationVersion_LocalId, tableIndex: ApplicationEntity_TableIndex, columnIndex: ApplicationColumn_Index): boolean;
}
//# sourceMappingURL=ApplicationMap.d.ts.map