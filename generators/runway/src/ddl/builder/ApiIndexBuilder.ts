import { resolveRelativePath } from "../../resolve/pathResolver";
import { IBuilder } from "./Builder";
import { FileBuilder } from "./entity/FileBuilder";
import { PathBuilder } from "./PathBuilder";

export class ApiIndexBuilder
    extends FileBuilder
    implements IBuilder {

    apiFilePaths: string[] = []

    constructor(
        pathBuilder: PathBuilder
    ) {
        super(null, null, pathBuilder, null);
        this.fullGenerationPath = pathBuilder.fullGeneratedDirPath
            + `/api/api.ts`;
    }

    addApiFilePath(
        filePath: string
    ): void {
        this.apiFilePaths.push(filePath.split('.')[0])
    }

    addImports() {
    }

    build(): string {
        let exports = ''
        for (const apiFilePath of this.apiFilePaths) {
            let relativePathToImport = resolveRelativePath(
                this.fullGenerationPath, apiFilePath)
            exports += `export * from '${relativePathToImport}'
`
        }
        return exports
    }
}