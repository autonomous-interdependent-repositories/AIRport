/* eslint-disable */
export const APPLICATION = {
    "domain": "air",
    "index": null,
    "name": "@airport/travel-document-checkpoint",
    "sinceVersion": 1,
    "versions": [
        {
            "api": {
                "apiObjectMap": {
                    "UserApi": {
                        "operationMap": {
                            "addUser": {
                                "isAsync": true,
                                "parameters": []
                            },
                            "findUser": {
                                "isAsync": true,
                                "parameters": []
                            }
                        }
                    }
                }
            },
            "entities": [
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
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 4,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CONTINENT_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 0,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Country",
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
                            "name": "name",
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "continent",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "users",
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
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 4,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "country"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 3,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "COUNTRIES",
                        "columnIndexes": []
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
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 1,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "State",
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
                            "name": "name",
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "metroAreaStates",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "users",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "state"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "state"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 3,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "STATES",
                        "columnIndexes": []
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
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 2,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "MetroArea",
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
                            "name": "name",
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "metroAreaStates",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "users",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "metroArea"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "metroArea"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 3,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "METRO_AREAS",
                        "columnIndexes": []
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
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ORIGIN",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ORIGIN_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "EMAIL",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PASSWORD_HASH",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "RANKING",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 6,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "USERNAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 6
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 7,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "GUID",
                            "notNull": true,
                            "propertyRefs": [
                                {
                                    "index": 7
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 8,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 4,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CONTINENT_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 8
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 9,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 0,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 9
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 10,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 1,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "STATE_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 10
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 11,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 2,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "METRO_AREA_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 11
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 3,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "User",
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
                            "name": "origin",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "originId",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "email",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 4,
                            "isId": false,
                            "name": "passwordHash",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 5
                            },
                            "index": 5,
                            "isId": false,
                            "name": "ranking",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 6
                            },
                            "index": 6,
                            "isId": false,
                            "name": "username",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 7
                            },
                            "index": 7,
                            "isId": false,
                            "name": "GUID",
                            "sinceVersion": 1
                        },
                        {
                            "index": 8,
                            "isId": false,
                            "name": "continent",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 9,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 10,
                            "isId": false,
                            "name": "state",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 11,
                            "isId": false,
                            "name": "metroArea",
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
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 8
                            },
                            "relationTableIndex": 4,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 9
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 10
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 11
                            },
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "columnIndexes": []
                    },
                    "operations": {}
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
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 4,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Continent",
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
                            "name": "name",
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "countries",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "users",
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
                                "mappedBy": "continent"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "continent"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 3,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "CONTINENTS",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "STATE_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "METRO_AREA_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
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
                    "index": 5,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "MetroAreaState",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "state",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "metroArea",
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
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "METRO_AREA_STATES",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 6,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "ClientType",
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
                            "name": "name",
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "CLIENT_TYPE",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DOMAIN",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "GUID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 6,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CLIENT_TYPE_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 4,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CONTINENT_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 6,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "STATE_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 6
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 7,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 4,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "METRO_AREA_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 7
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 7,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Client",
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
                            "name": "domain",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "GUID",
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "clienType",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "continent",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "state",
                            "relationRef": {
                                "index": 3
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "metroArea",
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
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 6,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 4,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 8,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "TerminalType",
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
                            "name": "name",
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "TERMINAL_TYPE",
                        "columnIndexes": []
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
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "GUID",
                            "notNull": true,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "IS_LOCAL",
                            "notNull": true,
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "BOOLEAN"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 8,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "TERMINAL_TYPE_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 3,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "OWNER_USER_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 4,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CONTINENT_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 6,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 6
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 7,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 4,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "STATE_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 7
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 8,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 5,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "METRO_AREA_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 8
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 9,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Terminal",
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
                            "name": "GUID",
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "terminalType",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "owner",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 4,
                            "isId": false,
                            "name": "isLocal",
                            "sinceVersion": 1
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "continent",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 3
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "state",
                            "relationRef": {
                                "index": 4
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 8,
                            "isId": false,
                            "name": "metroArea",
                            "relationRef": {
                                "index": 5
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 8,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 3,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 4,
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 8
                            },
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "TERMINAL",
                        "propertyIndexes": [
                            {
                                "propertyIndex": 1,
                                "unique": true
                            }
                        ]
                    },
                    "operations": {}
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 3,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "USER_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplicationIndex": null,
                                    "oneTableIndex": 9,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "TERMINAL_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
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
                    "isAirEntity": false,
                    "name": "UserTerminal",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "user",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "terminal",
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
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 3,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 9,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "USER_TERMINAL",
                        "columnIndexes": []
                    }
                }
            ],
            "integerVersion": 1,
            "referencedApplications": [],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=application.js.map