import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table,
}                                               from '@airport/air-control'
import {Actor}                                  from '../infrastructure/Actor'
import {Repository}                             from '../repository/Repository'
import {OperationHistory}                       from './OperationHistory'
import {RepositoryTransactionType}              from './RepositoryTransactionType'
import {TransactionHistory}                     from './TransactionHistory'

/**
 * Created by Papa on 9/15/2016.
 */

export type RepositoryTransactionHistory_Id = number;
export type RepositoryTransactionHistory_SaveTimestamp = number;
export type RepositoryTransactionHistory_BlockId = number;
export type RepositoryTransactionHistory_Synced = boolean;

@Entity()
@Table({name: 'REPOSITORY_TRANSACTION_HISTORY'})
export class RepositoryTransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({allocationSize: 200})
	id: RepositoryTransactionHistory_Id

	@Column({name: 'SAVE_TIMESTAMP', nullable: false})
	@DbNumber()
	saveTimestamp: RepositoryTransactionHistory_SaveTimestamp

	@Column({name: 'REPOSITORY_TRANSACTION_TYPE', nullable: false})
	@DbString()
	repositoryTransactionType: RepositoryTransactionType = RepositoryTransactionType.LOCAL

	@Column({
		name: 'SYNCED'
	})
	synced: RepositoryTransactionHistory_Synced

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_ID',
		referencedColumnName: 'ID', nullable: false
	})
	repository: Repository

	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_ID', referencedColumnName: 'ID',
		nullable: false
	})
	actor: Actor

	@ManyToOne()
	@JoinColumn({
		name: 'TRANSACTION_HISTORY_ID',
		referencedColumnName: 'ID', nullable: false
	})
	transactionHistory: TransactionHistory

	@OneToMany({mappedBy: 'repositoryTransactionHistory'})
	operationHistory: OperationHistory[] = []


	constructor(
		data?: RepositoryTransactionHistory
	) {
		if (!data) {
			return
		}

		this.id                 = data.id
		this.transactionHistory = data.transactionHistory
		this.repository         = data.repository
		this.actor              = data.actor
		this.saveTimestamp      = data.saveTimestamp
		this.operationHistory   = data.operationHistory
	}


}
