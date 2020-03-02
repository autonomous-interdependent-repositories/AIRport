"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const moving_walkway_1 = require("@airport/moving-walkway");
const tokens_1 = require("../../tokens");
class Stage2SyncedInDataProcessor {
    async applyChangesToDb(stage1Result, schemasBySchemaVersionIdMap) {
        const [airDb, dbFacade, recordUpdateStageDao] = await di_1.container(this).get(air_control_1.AIR_DB, air_control_1.DB_FACADE, moving_walkway_1.RECORD_UPDATE_STAGE_DAO);
        await this.performCreates(stage1Result.recordCreations, schemasBySchemaVersionIdMap, airDb, dbFacade);
        await this.performUpdates(stage1Result.recordUpdates, schemasBySchemaVersionIdMap, recordUpdateStageDao);
        await this.performDeletes(stage1Result.recordDeletions, schemasBySchemaVersionIdMap, airDb, dbFacade);
    }
    /**
     * Remote changes come in with SchemaVersionIds not SchemaIndexes, so it makes
     * sense to keep this structure.  NOTE: only one version of a given schema is
     * processed at one time:
     *
     *  Changes for a schema version below the one in this Terminal must first be upgraded.
     *  Terminal itself must first be upgraded to newer schema versions, before changes
     *  for that schema version are processed.
     *
     *  To tie in a given SchemaVersionId to its SchemaIndex an additional mapping data
     *  structure is passed in.
     */
    async performCreates(recordCreations, schemasBySchemaVersionIdMap, airDb, dbFacade) {
        for (const [schemaVersionId, creationInSchemaMap] of recordCreations) {
            for (const [tableIndex, creationInTableMap] of creationInSchemaMap) {
                const schemaIndex = schemasBySchemaVersionIdMap[schemaVersionId];
                const dbEntity = airDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
                const qEntity = airDb.qSchemas[schemaIndex][dbEntity.name];
                const columns = [
                    qEntity.repository.id,
                    qEntity.actor.id,
                    qEntity.actorRecordId
                ];
                let creatingColumns = true;
                let numInserts = 0;
                const values = [];
                for (const [repositoryId, creationForRepositoryMap] of creationInTableMap) {
                    for (const [actorId, creationForActorMap] of creationForRepositoryMap) {
                        for (const [actorRecordId, creationOfRowMap] of creationForActorMap) {
                            const rowValues = [
                                repositoryId,
                                actorId,
                                actorRecordId
                            ];
                            const columnIndexedValues = [];
                            for (const [columnIndex, columnValue] of creationOfRowMap) {
                                columnIndexedValues.push([columnIndex, columnValue]);
                            }
                            if (columnIndexedValues.length) {
                                numInserts++;
                            }
                            columnIndexedValues.sort((col1IndexAndValue, col2IndexAndValue) => {
                                return air_control_1.compareNumbers(col1IndexAndValue[0], col2IndexAndValue[0]);
                            });
                            for (const [columnIndex, columnValue] of columnIndexedValues) {
                                if (creatingColumns) {
                                    columns.push(qEntity.__driver__.allColumns[columnIndex]);
                                }
                                rowValues.push(columnValue);
                            }
                            if (columnIndexedValues.length) {
                                values.push(rowValues);
                            }
                            creatingColumns = false;
                        }
                    }
                }
                if (numInserts) {
                    await dbFacade.insertValues(dbEntity, {
                        insertInto: qEntity,
                        columns,
                        values
                    });
                }
            }
        }
    }
    async performUpdates(recordUpdates, schemasBySchemaVersionIdMap, recordUpdateStageDao) {
        const finalUpdateMap = new Map();
        const recordUpdateStage = [];
        // Build the final update data structure
        for (const [schemaVersionId, schemaUpdateMap] of recordUpdates) {
            const finalSchemaUpdateMap = ground_control_1.ensureChildJsMap(finalUpdateMap, schemaVersionId);
            for (const [tableIndex, tableUpdateMap] of schemaUpdateMap) {
                const finalTableUpdateMap = ground_control_1.ensureChildJsMap(finalSchemaUpdateMap, tableIndex);
                for (const [repositoryId, repositoryUpdateMap] of tableUpdateMap) {
                    for (const [actorId, actorUpdates] of repositoryUpdateMap) {
                        for (const [actorRecordId, recordUpdateMap] of actorUpdates) {
                            const recordKeyMap = this.getRecordKeyMap(recordUpdateMap, finalTableUpdateMap);
                            ground_control_1.ensureChildJsSet(ground_control_1.ensureChildJsMap(recordKeyMap, repositoryId), actorId)
                                .add(actorRecordId);
                            for (const [columnIndex, columnUpdate] of recordUpdateMap) {
                                recordUpdateStage.push([
                                    schemaVersionId,
                                    tableIndex,
                                    repositoryId,
                                    actorId,
                                    actorRecordId,
                                    columnIndex,
                                    columnUpdate.newValue
                                ]);
                            }
                        }
                    }
                }
            }
        }
        await recordUpdateStageDao.insertValues(recordUpdateStage);
        // Perform the updates
        for (const [schemaVersionId, updateMapForSchema] of finalUpdateMap) {
            const schema = schemasBySchemaVersionIdMap.get(schemaVersionId);
            for (const [tableIndex, updateMapForTable] of updateMapForSchema) {
                await this.runUpdatesForTable(schema.index, schemaVersionId, tableIndex, updateMapForTable, recordUpdateStageDao);
            }
        }
        await recordUpdateStageDao.delete();
    }
    async performDeletes(recordDeletions, schemasBySchemaVersionIdMap, airDb, dbFacade) {
        for (const [schemaVersionId, deletionInSchemaMap] of recordDeletions) {
            const schema = schemasBySchemaVersionIdMap.get(schemaVersionId);
            for (const [tableIndex, deletionInTableMap] of deletionInSchemaMap) {
                const dbEntity = airDb.schemas[schema.index].currentVersion.entities[tableIndex];
                const qEntity = airDb.qSchemas[schema.index][dbEntity.name];
                let numClauses = 0;
                let repositoryWhereFragments = [];
                for (const [repositoryId, deletionForRepositoryMap] of deletionInTableMap) {
                    let actorWhereFragments = [];
                    for (const [actorId, actorRecordIdSet] of deletionForRepositoryMap) {
                        numClauses++;
                        actorWhereFragments.push(air_control_1.and(qEntity.actorRecordId.in(Array.from(actorRecordIdSet)), qEntity.actor.id.equals(actorId)));
                    }
                    repositoryWhereFragments.push(air_control_1.and(qEntity.repository.id.equals(repositoryId), air_control_1.or(...actorWhereFragments)));
                }
                if (numClauses) {
                    await dbFacade.deleteWhere(dbEntity, {
                        deleteFrom: qEntity,
                        where: air_control_1.or(...repositoryWhereFragments)
                    });
                }
            }
        }
    }
    /**
     * Get the record key map (RecordKeyMap = RepositoryId -> ActorId
     * -> RepositoryEntityActorRecordId) for the recordUpdateMap (the specified combination
     * of columns/values being updated)
     * @param {Map<ColumnIndex, RecordUpdate>} recordUpdateMap
     * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
     * @returns {RecordKeyMap}
     */
    getRecordKeyMap(recordUpdateMap, // combination of columns/values
    // being updated
    finalTableUpdateMap) {
        const updatedColumns = [];
        for (const columnIndex of recordUpdateMap.keys()) {
            updatedColumns.push(columnIndex);
        }
        // Sort the updated columns by column index, to ensure that all records with the
        // same combination of updated columns are grouped
        updatedColumns.sort(air_control_1.compareNumbers);
        // Navigate down the table UpdateKeyMap to find the matching combination of
        // columns being updated
        let columnValueUpdate;
        let updateKeyMap = finalTableUpdateMap;
        for (const columnIndex of updatedColumns) {
            columnValueUpdate = updateKeyMap.get(columnIndex);
            // If no update statements with the specified combination of columns exist yet
            if (!columnValueUpdate) {
                columnValueUpdate = {
                    childColumnUpdateKeyMap: new Map(),
                    recordKeyMap: new Map(),
                    updatedColumns: null,
                };
                updateKeyMap.set(columnIndex, columnValueUpdate);
            }
            // Navigate down
            updateKeyMap = columnValueUpdate.childColumnUpdateKeyMap;
        }
        columnValueUpdate.updatedColumns = updatedColumns;
        // Return the map of the records for the update statement of the specified combination
        // of columns/values
        return columnValueUpdate.recordKeyMap;
    }
    /**
     * Run all updates for a particular table.  One update per updated column combination
     * is run.
     *
     * @param {SchemaIndex} schemaIndex
     * @param {TableIndex} tableIndex
     * @param {ColumnUpdateKeyMap} updateKeyMap
     * @returns {Promise<void>}
     */
    async runUpdatesForTable(schemaIndex, schemaVersionId, tableIndex, updateKeyMap, recordUpdateStageDao) {
        for (const columnValueUpdate of updateKeyMap.values()) {
            const updatedColumns = columnValueUpdate.updatedColumns;
            if (updatedColumns) {
                await recordUpdateStageDao.updateEntityWhereIds(schemaIndex, schemaVersionId, tableIndex, columnValueUpdate.recordKeyMap, updatedColumns);
            }
            // Traverse down into nested column update combinations
            await this.runUpdatesForTable(schemaIndex, schemaVersionId, tableIndex, columnValueUpdate.childColumnUpdateKeyMap, recordUpdateStageDao);
        }
    }
}
exports.Stage2SyncedInDataProcessor = Stage2SyncedInDataProcessor;
di_1.DI.set(tokens_1.STAGE2_SYNCED_IN_DATA_PROCESSOR, Stage2SyncedInDataProcessor);
//# sourceMappingURL=Stage2SyncedInDataProcessor.js.map