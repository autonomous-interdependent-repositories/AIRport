import { IDependencyInjectionToken } from "../dependencyInjection/Token";

export interface IAutopilotApiLoader {

    loadApiAutopilot<Injected = any>(
        token: IDependencyInjectionToken<Injected>
    ): any;

}