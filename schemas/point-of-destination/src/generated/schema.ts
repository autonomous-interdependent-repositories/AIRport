export const SCHEMA = {
	"domain": "public",
	"index": null,
	"name": "@airport/point-of-destination",
	"sinceVersion": 1,
	"versions": [
		{
			"entities": [
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "REPOSITORY_DATA",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 1,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 0,
									"oneTableIndex": 17,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								},
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 0,
									"oneTableIndex": 18,
									"oneColumnIndex": 2,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								},
								{
									"index": 0
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
									"oneSchemaIndex": 0,
									"oneTableIndex": 18,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DATE_NUMBER",
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
							"index": 1
						},
						{
							"index": 2
						}
					],
					"index": 0,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "DailyArchive",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "repository",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "dailyArchiveLog",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 2,
							"isId": false,
							"name": "repositoryData",
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
							"relationTableIndex": 18,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 17,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "DAILY_ARCHIVES"
					}
				}
			],
			"integerVersion": 1,
			"referencedSchemas": [
				{
					"domain": "public",
					"index": 0,
					"name": "@airport/guideway",
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