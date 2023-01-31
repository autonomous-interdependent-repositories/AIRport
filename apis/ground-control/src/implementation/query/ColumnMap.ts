import { ApplicationEntity_TableIndex } from "../../definition/application/Entity";
import { ApplicationColumn_Index } from "../../definition/application/Property";

export class ColumnMap {
	columnMap: { [columnIndex: ApplicationColumn_Index]: boolean } = {};

	constructor(
		public tableIndex: ApplicationEntity_TableIndex,
		allColumns: boolean = false
	) {
		if (allColumns) {
			this.columnMap[globalThis.ALL_TABLE_COLUMNS] = true;
		}
	}

	ensure(columnIndex: ApplicationColumn_Index): void {
		this.columnMap[columnIndex] = true;
	}

}
globalThis.ColumnMap = ColumnMap
