import { IChildContainer } from "./IChildContainer"
import { IContainer } from "./IContainer"

export interface IRootContainer
    extends IContainer {

    objectPoolMap: Map<string, any[]>

    db(
        id?: string
    ): IChildContainer

    ui(
        componentName: string
    ): IChildContainer

    remove(
        container: IChildContainer
    ): void

}