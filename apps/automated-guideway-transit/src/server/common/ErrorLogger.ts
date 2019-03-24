import {ILogger}             from "@airport/approach-lighting-system";
import {TerminalCredentials} from "@airport/arrivals-n-departures";
import {DI}                  from '@airport/di'
import {ERROR_LOGGER}        from "../../diTokens";
import {ServerErrorType}     from "../../model/ServerErrorType";

export type ErroneousEntityInfo = string | number;

export interface IErrorLogger {

	logError(
		log: ILogger,
		errorType: ServerErrorType,
		terminalCredentials: TerminalCredentials,
		erroneousEntityInfo: ErroneousEntityInfo
	): Promise<void>;

}

export class ErrorLogger
	implements IErrorLogger {

	async logError(
		log: ILogger,
		errorType: ServerErrorType,
		terminalCredentials: TerminalCredentials,
		erroneousEntityInfo: ErroneousEntityInfo
	): Promise<void> {
		log.error(`AGT error:
		Type:               {1}
		TerminalId:         {2}
		TerminalPassword:   {3}
		Entity w/ Error Id: {4}`,
			errorType, terminalCredentials[0], terminalCredentials[1], erroneousEntityInfo);
	}

}

DI.set(ERROR_LOGGER, ErrorLogger)
