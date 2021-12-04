export declare const SCHEMA: {
    domain: string;
    index: any;
    name: string;
    packageName: string;
    sinceVersion: number;
    versions: {
        api: {
            apiObjectMap: {};
        };
        entities: ({
            columns: {
                index: number;
                isGenerated: boolean;
                manyRelationColumnRefs: any[];
                name: string;
                notNull: boolean;
                propertyRefs: {
                    index: number;
                }[];
                sinceVersion: number;
                type: string;
            }[];
            idColumnRefs: {
                index: number;
            }[];
            index: number;
            isLocal: boolean;
            isRepositoryEntity: boolean;
            name: string;
            properties: {
                columnRef: {
                    index: number;
                };
                index: number;
                isId: boolean;
                name: string;
                sinceVersion: number;
            }[];
            relations: any[];
            sinceVersion: number;
            tableConfig: {
                name: string;
                indexes: any[];
            };
            operations: {};
        } | {
            columns: any[];
            idColumnRefs: any[];
            index: number;
            isLocal: boolean;
            isRepositoryEntity: boolean;
            name: string;
            properties: any[];
            relations: any[];
            sinceVersion: number;
            tableConfig: {
                indexes: any[];
                name?: undefined;
            };
            operations?: undefined;
        })[];
        integerVersion: number;
        referencedApplications: any[];
        versionString: string;
    }[];
};
//# sourceMappingURL=schema.d.ts.map