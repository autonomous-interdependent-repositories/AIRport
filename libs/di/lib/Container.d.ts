import { IContext } from './Context';
import { DiToken } from './Token';
export interface IContainer {
    get<A>(tokenA: DiToken<A>): Promise<A>;
    get<A, B>(tokenA: DiToken<A>, tokenB: DiToken<B>): Promise<[A, B]>;
    get<A, B, C>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>): Promise<[A, B, C]>;
    get<A, B, C, D>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>): Promise<[A, B, C, D]>;
    get<A, B, C, D, E>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>): Promise<[A, B, C, D, E]>;
    get<A, B, C, D, E, F>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>): Promise<[A, B, C, D, E, F]>;
    get<A, B, C, D, E, F, G>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>): Promise<[A, B, C, D, E, F, G]>;
    get<A, B, C, D, E, F, G, H>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>): Promise<[A, B, C, D, E, F, G, H]>;
    get<A, B, C, D, E, F, G, H, I>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>): Promise<[A, B, C, D, E, F, G, H, I]>;
    get<A, B, C, D, E, F, G, H, I, J>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>): Promise<[A, B, C, D, E, F, G, H, I, J]>;
    get<A, B, C, D, E, F, G, H, I, J, K>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>): Promise<[A, B, C, D, E, F, G, H, I, J, K]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>, tokenO: DiToken<O>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>;
    get(...tokens: DiToken<any>[]): Promise<any[]>;
    getSync<A>(tokenA: DiToken<A>): A;
    getSync<A, B>(tokenA: DiToken<A>, tokenB: DiToken<B>): [A, B];
    getSync<A, B, C>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>): [A, B, C];
    getSync<A, B, C, D>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>): [A, B, C, D];
    getSync<A, B, C, D, E>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>): [A, B, C, D, E];
    getSync<A, B, C, D, E, F>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>): [A, B, C, D, E, F];
    getSync<A, B, C, D, E, F, G>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>): [A, B, C, D, E, F, G];
    getSync<A, B, C, D, E, F, G, H>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>): [A, B, C, D, E, F, G, H];
    getSync<A, B, C, D, E, F, G, H, I>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>): [A, B, C, D, E, F, G, H, I];
    getSync<A, B, C, D, E, F, G, H, I, J>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>): [A, B, C, D, E, F, G, H, I, J];
    getSync<A, B, C, D, E, F, G, H, I, J, K>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>): [A, B, C, D, E, F, G, H, I, J, K];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>): [A, B, C, D, E, F, G, H, I, J, K, L];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>): [A, B, C, D, E, F, G, H, I, J, K, L, M];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>, tokenO: DiToken<O>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O];
    getSync(...tokens: DiToken<any>[]): any;
    set<I>(token: DiToken<I>, clazz: new () => I): void;
}
export interface IRootContainer extends IContainer {
    db(): IContainer;
    ui(componentName: string): IContainer;
    remove(container: IContainer): void;
}
export declare class Container implements IContainer {
    static classes: any[];
    static numPendingInits: number;
    static objects: any[];
    get<A>(tokenA: DiToken<A>): Promise<A>;
    get<A, B>(tokenA: DiToken<A>, tokenB: DiToken<B>): Promise<[A, B]>;
    get<A, B, C>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>): Promise<[A, B, C]>;
    get<A, B, C, D>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>): Promise<[A, B, C, D]>;
    get<A, B, C, D, E>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>): Promise<[A, B, C, D, E]>;
    get<A, B, C, D, E, F>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>): Promise<[A, B, C, D, E, F]>;
    get<A, B, C, D, E, F, G>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>): Promise<[A, B, C, D, E, F, G]>;
    get<A, B, C, D, E, F, G, H>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>): Promise<[A, B, C, D, E, F, G, H]>;
    get<A, B, C, D, E, F, G, H, I>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>): Promise<[A, B, C, D, E, F, G, H, I]>;
    get<A, B, C, D, E, F, G, H, I, J>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>): Promise<[A, B, C, D, E, F, G, H, I, J]>;
    get<A, B, C, D, E, F, G, H, I, J, K>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>): Promise<[A, B, C, D, E, F, G, H, I, J, K]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>, tokenO: DiToken<O>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>;
    set<I>(token: DiToken<I>, clazz: new () => I): void;
    getSync<A>(tokenA: DiToken<A>): A;
    getSync<A, B>(tokenA: DiToken<A>, tokenB: DiToken<B>): [A, B];
    getSync<A, B, C>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>): [A, B, C];
    getSync<A, B, C, D>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>): [A, B, C, D];
    getSync<A, B, C, D, E>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>): [A, B, C, D, E];
    getSync<A, B, C, D, E, F>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>): [A, B, C, D, E, F];
    getSync<A, B, C, D, E, F, G>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>): [A, B, C, D, E, F, G];
    getSync<A, B, C, D, E, F, G, H>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>): [A, B, C, D, E, F, G, H];
    getSync<A, B, C, D, E, F, G, H, I>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>): [A, B, C, D, E, F, G, H, I];
    getSync<A, B, C, D, E, F, G, H, I, J>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>): [A, B, C, D, E, F, G, H, I, J];
    getSync<A, B, C, D, E, F, G, H, I, J, K>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>): [A, B, C, D, E, F, G, H, I, J, K];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>): [A, B, C, D, E, F, G, H, I, J, K, L];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>): [A, B, C, D, E, F, G, H, I, J, K, L, M];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>, tokenO: DiToken<O>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O];
    private doGet;
    private doGetCore;
}
export declare class RootContainer extends Container implements IRootContainer {
    childContainers: Set<IContainer>;
    db(): IContainer;
    ui(componentName: string): IContainer;
    remove(container: IContainer): void;
    private addContainer;
}
export declare class ChildContainer extends Container {
    context: IContext;
    constructor(context: IContext);
}
export declare const DI: IRootContainer;
