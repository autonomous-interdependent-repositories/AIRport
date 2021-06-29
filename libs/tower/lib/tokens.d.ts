import { ITransactionalServer } from './core/data/ITransactionalServer';
import { ICascadeGraphVerifier } from './processing/CascadeGraphVerifier';
import { IDependencyGraphResolver } from './processing/DependencyGraphResolver';
import { IEntityGraphReconstructor } from './processing/EntityGraphReconstructor';
import { IOperationContextLoader } from './processing/OperationContext';
import { IStructuralEntityValidator } from './processing/StructuralEntityValidator';
export declare const CASCADE_GRAPH_VERIFIER: import("@airport/di").IDiToken<ICascadeGraphVerifier>;
export declare const DEPENDENCY_GRAPH_RESOLVER: import("@airport/di").IDiToken<IDependencyGraphResolver>;
export declare const ENTITY_GRAPH_RECONSTRUCTOR: import("@airport/di").IDiToken<IEntityGraphReconstructor>;
export declare const OPERATION_CONTEXT_LOADER: import("@airport/di").IDiToken<IOperationContextLoader>;
export declare const STRUCTURAL_ENTITY_VALIDATOR: import("@airport/di").IDiToken<IStructuralEntityValidator>;
export declare const TRANSACTIONAL_SERVER: import("@airport/di").IDiToken<ITransactionalServer>;
//# sourceMappingURL=tokens.d.ts.map