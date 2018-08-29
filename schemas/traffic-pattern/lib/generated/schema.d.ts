export declare const SCHEMA: {
    "domain": string;
    "index": any;
    "name": string;
    "sinceVersion": number;
    "versions": {
        "entities": ({
            "columns": ({
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneColumnIndex": number;
                    "sinceVersion": number;
                }[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
                "isGenerated"?: undefined;
            } | {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneRelationIndex": number;
                    "oneColumnIndex": number;
                    "sinceVersion": number;
                }[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "sinceVersion": number;
                "columnRef"?: undefined;
            } | {
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "sinceVersion": number;
                "relationRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "cascade": number;
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
            })[];
            "sinceVersion": number;
            "tableConfig": {
                "name": string;
            };
        } | {
            "columns": ({
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneColumnIndex": number;
                    "sinceVersion": number;
                }[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
                "isGenerated"?: undefined;
            } | {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneRelationIndex": number;
                    "oneColumnIndex": number;
                    "sinceVersion": number;
                }[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "sinceVersion": number;
                "columnRef"?: undefined;
            } | {
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "sinceVersion": number;
                "relationRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
            })[];
            "sinceVersion": number;
            "tableConfig": {
                "name": string;
            };
        } | {
            "columns": ({
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneRelationIndex": number;
                    "oneColumnIndex": number;
                    "sinceVersion": number;
                }[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
                "isGenerated"?: undefined;
            } | {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "sinceVersion": number;
                "columnRef"?: undefined;
            } | {
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "sinceVersion": number;
                "relationRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "mappedBy": string;
                    "cascade"?: undefined;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "cascade": number;
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
            })[];
            "sinceVersion": number;
            "tableConfig": {
                "name": string;
            };
        } | {
            "columns": ({
                "allocationSize": number;
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
            } | {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
                "allocationSize"?: undefined;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneRelationIndex": number;
                    "oneColumnIndex": number;
                    "sinceVersion": number;
                }[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
                "allocationSize"?: undefined;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "sinceVersion": number;
                "relationRef"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "sinceVersion": number;
                "columnRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
            })[];
            "sinceVersion": number;
            "tableConfig": {
                "name": string;
            };
        } | {
            "columns": ({
                "allocationSize": number;
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
            } | {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
                "allocationSize"?: undefined;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": number;
                    "oneTableIndex": number;
                    "oneColumnIndex": number;
                    "sinceVersion": number;
                }[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
                "type": number;
                "allocationSize"?: undefined;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "sinceVersion": number;
                "columnRef"?: undefined;
            } | {
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "sinceVersion": number;
                "relationRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
                "relationTableSchemaIndex"?: undefined;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "relationTableSchemaIndex": number;
                "sinceVersion": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "sinceVersion": number;
                "relationTableSchemaIndex"?: undefined;
            })[];
            "sinceVersion": number;
            "tableConfig": {
                "name": string;
            };
        })[];
        "integerVersion": number;
        "referencedSchemas": {
            "domain": string;
            "index": number;
            "name": string;
            "sinceVersion": number;
            "versions": {
                "entities": any;
                "integerVersion": number;
                "referencedSchemas": any;
                "versionString": string;
            }[];
        }[];
        "versionString": string;
    }[];
};
