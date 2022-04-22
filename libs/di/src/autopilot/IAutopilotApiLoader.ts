import { IDependencyInjectionToken } from "../dependencyInjection/Token";

export interface IAutopilotApiLoader {

    loadApiAutopilot<Injectable = any>(
        token: IDependencyInjectionToken<Injectable>
    ): any;

}