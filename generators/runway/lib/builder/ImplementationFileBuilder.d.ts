import { EntityId } from '@airport/ground-control';
import { PathBuilder } from './PathBuilder';
import { IBuilder } from './Builder';
export declare abstract class ImplementationFileBuilder implements IBuilder {
    protected pathBuilder: PathBuilder;
    daoListingFilePath: any;
    protected entityIdMapByName: {
        [entityName: string]: EntityId;
    };
    protected entityNames: string[];
    protected ddlPathMapByEntityName: {
        [entityName: string]: string;
    };
    protected generatedPathMapByEntityName: {
        [entityName: string]: string;
    };
    constructor(fileName: string, pathBuilder: PathBuilder);
    addFileNameAndPaths(entityId: EntityId, entityName: string, fullDdlPath: string, fullGenerationPath: string): void;
    abstract build(): string;
}
