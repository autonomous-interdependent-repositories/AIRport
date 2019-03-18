export const SCHEMA = {
	"domain": "public",
	"index": null,
	"name": "@airport/holding-pattern",
	"sinceVersion": 1,
	"versions": [
		{
			"entities": [
				{
					"columns": [
						{
							"allocationSize": 600,
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ORDER_NUMBER",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "CHANGE_TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 5,
									"oneRelationIndex": 4,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_TRANSACTION_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 0,
									"oneTableIndex": 5,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "ENTITY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 3
						}
					],
					"index": 0,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "OperationHistory",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "repositoryTransactionHistory",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "orderNumber",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 3,
							"isId": false,
							"name": "changeType",
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "recordHistory",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 5,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 5,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "operationHistory"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_OPERATION_HISTORY"
					}
				},
				{
					"columns": [
						{
							"allocationSize": 2000,
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ACTOR_RECORD_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 0,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_OPERATION_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 1,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RecordHistory",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "actor",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "actorRecordId",
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "operationHistory",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "newValues",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "oldValues",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "recordHistory"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 2,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "recordHistory"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 3,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_RECORD_HISTORY",
						"indexes": [
							{
								"name": "RCRD_HSTR_TO_OPRTN_HSTR_FX",
								"columnList": [
									"REPOSITORY_OPERATION_HISTORY_ID"
								],
								"unique": false
							}
						]
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "COLUMN_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NEW_VALUE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 0
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 1,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_RECORD_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 2
						}
					],
					"index": 2,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RecordHistoryNewValue",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "recordHistory",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 1,
							"isId": true,
							"name": "columnIndex",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "newValue",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_RECORD_HISTORY_NEW_VALUES",
						"primaryKey": [
							"REPOSITORY_RECORD_HISTORY_ID",
							"COLUMN_INDEX"
						]
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "COLUMN_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "OLD_VALUE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 0
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 1,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_RECORD_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 2
						}
					],
					"index": 3,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RecordHistoryOldValue",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "recordHistory",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 1,
							"isId": true,
							"name": "columnIndex",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "oldValue",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_RECORD_HISTORY_OLD_VALUES",
						"primaryKey": [
							"REPOSITORY_RECORD_HISTORY_ID",
							"COLUMN_INDEX"
						]
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "REFERENCE_TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 5,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_TRANSACTION_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 9,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 4,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RepoTransHistoryChangedRepositoryActor",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "repositoryTransactionHistory",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "repository",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "actor",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 4,
							"isId": false,
							"name": "referenceType",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 5,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS"
					}
				},
				{
					"columns": [
						{
							"allocationSize": 200,
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "REMOTE_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SAVE_TIMESTAMP",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 2
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "REPOSITORY_TRANSACTION_TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "REPOSITORY_TRANSACTION_HISTORY_BLOCK_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 6,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "TRANSACTION_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 6,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 7,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 5,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RepositoryTransactionHistory",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "remoteId",
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "transactionHistory",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "repository",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "changedRepositoryActors",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "actor",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 6,
							"isId": false,
							"name": "saveTimestamp",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 7,
							"isId": false,
							"name": "repositoryTransactionType",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 8,
							"isId": false,
							"name": "blockId",
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "operationHistory",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repositoryTransactionHistory"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "repositoryTransactionHistory"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_TRANSACTION_HISTORY"
					}
				},
				{
					"columns": [
						{
							"allocationSize": 100,
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TRANSACTION_TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 6,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "TransactionHistory",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "transactionType",
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "repositoryTransactionHistories",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repoTransHistory"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 5,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "TRANSACTION_HISTORY"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "RANDOM_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 1,
									"oneTableIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "USER_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 1,
									"oneTableIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "TERMINAL_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 7,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "Actor",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "user",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "terminal",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 3,
							"isId": false,
							"name": "randomId",
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "actorApplications",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "repositoryActor",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 2,
							"relationTableSchemaIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 3,
							"relationTableSchemaIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "actor"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 12,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "ACTOR_ID"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "HOST",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "PORT",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 8,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "Application",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "host",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "port",
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "actorApplications",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "repositoryApplications",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "application"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 12,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "application"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 13,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ORDERED_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "RANDOM_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "REPOSITORY_URL",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "PLATFORM_CONFIG",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SYNC_PRIORITY",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 10
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 7,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "OWNER_ACTOR_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 9,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "Repository",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "ownerActor",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "orderedId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 3,
							"isId": false,
							"name": "randomId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 4,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 5,
							"isId": false,
							"name": "url",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 6,
							"isId": false,
							"name": "platformConfig",
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "repositoryActors",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "repositoryApplications",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "repositoryTransactionHistory",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 10,
							"isId": false,
							"name": "syncPriority",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "repository"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "repository"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 13,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "repository"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 5,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 1
						}
					],
					"index": 10,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RepositoryActor",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "actor",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": true,
							"name": "repository",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_ACTORS"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "REPOSITORY_SCHEMA_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCHEMA_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 9,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 2
						}
					],
					"index": 11,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RepositorySchema",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "repository",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "schemaIndex",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_SCHEMAS"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneRelationIndex": 0,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 1
						}
					],
					"index": 12,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "ActorApplication",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "actor",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "application",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "ACTOR_APPLICATION"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 1
						}
					],
					"index": 13,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RepositoryApplication",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "application",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": true,
							"name": "repository",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_APPLICATION"
					}
				}
			],
			"integerVersion": 1,
			"referencedSchemas": [
				{
					"domain": "npmjs.org",
					"index": 0,
					"name": "@airport/traffic-pattern",
					"sinceVersion": 1,
					"versions": [
						{
							"entities": null,
							"integerVersion": 1,
							"referencedSchemas": null,
							"versionString": "1.0.0"
						}
					]
				},
				{
					"domain": "public",
					"index": 1,
					"name": "@airport/travel-document-checkpoint",
					"sinceVersion": 1,
					"versions": [
						{
							"entities": null,
							"integerVersion": 1,
							"referencedSchemas": null,
							"versionString": "1.0.0"
						}
					]
				}
			],
			"versionString": "1.0.0"
		}
	]
};