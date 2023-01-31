import { ApplicationEntity_TableIndex } from "../../definition/application/Entity";
import { ApplicationColumn_Index } from "../../definition/application/Property";
import { ApplicationVersion_LocalId } from "../../definition/application/Application";
import { ColumnMap } from "./ColumnMap";

/**
 * Created by Papa on 9/10/2016.
 */

globalThis.ALL_TABLE_COLUMNS = '__ALL_TABLE_COLUMNS__';

export class TableMap {

	constructor(
		public applicationVersionId: ApplicationVersion_LocalId,
		public tableMap: { [tableIndex: ApplicationEntity_TableIndex]: ColumnMap } = {}
	) {
	}

	ensure(
		tableIndex: ApplicationEntity_TableIndex,
		allColumns: boolean = false,
		ColumnMapConstructor = globalThis.ColumnMap as typeof ColumnMap,
	): ColumnMap {
		let tableColumnMap = this.tableMap[tableIndex];
		if (!tableColumnMap) {
			tableColumnMap = new ColumnMapConstructor(tableIndex, allColumns);
			this.tableMap[tableIndex] = tableColumnMap;
		}

		return tableColumnMap;
	}

	existsByStructure(
		tableIndex: ApplicationEntity_TableIndex,
		columnIndex: ApplicationColumn_Index
	): boolean {
		let tableColumnMap = this.tableMap[tableIndex];
		if (!tableColumnMap) {
			return false;
		}
		return !!tableColumnMap.columnMap[columnIndex];
	}

}
globalThis.TableMap = TableMap
