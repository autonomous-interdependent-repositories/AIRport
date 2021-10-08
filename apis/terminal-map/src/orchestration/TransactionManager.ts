import { IContext } from '@airport/di';
import {
	IStoreDriver,
	StoreType
} from '@airport/ground-control';
import { ITransaction } from '../transaction/ITransaction';
import { ICredentials } from '../Credentials';


export interface ITransactionContext {
	transaction: ITransaction
}
export interface ITransactionManager {

	storeType: StoreType;

	signatureOfTransactionInProgress: string
	transactionInProgress: ITransaction

	initialize(
		dbName: string,
		context: IContext,
	): Promise<void>;

	isServer(
		contex?: IContext
	): boolean;

	transact(
		credentials: ICredentials,
		callback: {
			(
				transaction: IStoreDriver,
				context?: IContext
			): Promise<void> | void
		},
		context: IContext,
	): Promise<void>;

	// NOTE: Removed commit and rollback in favor of a callback solution.
	// This is the lowest common denominator that includes the WebSQL requirement
	// to finish the transaction before the thread goes to sleep.
	// rollback(
	// 	transaction: ITransaction
	// ): Promise<void>;
	//
	// commit(
	// 	transaction: ITransaction
	// ): Promise<void>;

	// saveRepositoryHistory(
	// 	transaction: ITransactionHistory
	// ): Promise<boolean>;

}
