import { Context, ContextType } from "../Context";
import { ChildContainer } from "./ChildContainer";
import { Container } from "./Container";
export class RootContainer extends Container {
    constructor() {
        super(...arguments);
        this.uiContainers = new Set();
    }
    // NOTE: Object pooling is not supported because of possible callbacks
    // that are out of synchronous flow of a transaction.  Thus objects are
    // retained in the container even after the container is removed
    // in order to allow for transactionId reference
    // objectPoolMap: Map<string, any[]> = new Map();
    db(id) {
        let dbContainer = this.dbContainerMap.get(id);
        if (!dbContainer) {
            dbContainer = new ChildContainer(this, new Context(id, ContextType.DB));
            this.dbContainerMap.set(id, dbContainer);
        }
        return dbContainer;
    }
    remove(container) {
        if (!container) {
            return;
        }
        const dbContainer = this.dbContainerMap.get(container.context.id);
        if (dbContainer) {
            this.dbContainerMap.delete(container.context.id);
            // NOTE: objectPooling is not supported, see above
            // const objectTokens = dbContainer.objectMap.keys()
            // for (const objectToken of objectTokens) {
            // const object = dbContainer.objectMap.get(objectToken)
            // let objectPool = this.objectPoolMap.get(objectToken)
            // if (!objectPool) {
            //     objectPool = []
            //     this.objectPoolMap.set(objectToken, objectPool)
            // }
            // objectPool.push(object)
            // }
        }
        else {
            this.uiContainers.delete(container);
        }
    }
    ui(componentName) {
        const context = new Context(componentName, ContextType.UI);
        const childContainer = new ChildContainer(this, context);
        this.uiContainers.add(childContainer);
        return childContainer;
    }
}
//# sourceMappingURL=RootContainer.js.map