import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	SequenceGenerator,
	Table,
	Transient
}                                     from '@airport/air-control'
import {
	ATransactionHistory,
	SyncSchemaMap,
	TransactionType
}                                     from '@airport/ground-control'
import {OperationHistory}             from './OperationHistory'
import {RecordHistory}                from './RecordHistory'
import {RecordHistoryNewValue}        from './RecordHistoryNewValue'
import {RecordHistoryOldValue}        from './RecordHistoryOldValue'
import {RepositoryTransactionHistory} from './RepositoryTransactionHistory'

export type TransactionHistoryNumberOfOperations = number;

/**
 * Created by Papa on 5/1/2017.
 */

export type TransactionHistoryId = number

@Entity()
@Table({name: 'TRANSACTION_HISTORY'})
export class TransactionHistory
	implements ATransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({allocationSize: 100})
	id: TransactionHistoryId

	@Column({name: 'TRANSACTION_TYPE', nullable: false})
	@DbString()
	transactionType: TransactionType

	@OneToMany({mappedBy: 'transactionHistory'})
	repositoryTransactionHistories: RepositoryTransactionHistory[] = []

	@Transient()
	repoTransHistoryMap: { [repositoryId: number]: RepositoryTransactionHistory } = {}

	@Transient()
	schemaMap: SyncSchemaMap = new SyncSchemaMap()

	@Transient()
	allOperationHistory: OperationHistory[] = []

	@Transient()
	allRecordHistory: RecordHistory[] = []

	@Transient()
	allRecordHistoryNewValues: RecordHistoryNewValue[] = []

	@Transient()
	allRecordHistoryOldValues: RecordHistoryOldValue[] = []

	@Transient()
	numberOfOperations: TransactionHistoryNumberOfOperations = 0

}
