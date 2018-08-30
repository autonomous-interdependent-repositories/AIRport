import {
	Column,
	DbDate,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                 from "@airport/air-control";
import {IServer}  from "../../generated/server/qserver";
import {SyncType} from "../synchronization/SyncType";

export type ServerSyncLogId = number;
export type ServerSyncLogStartDatetime = Date;
export type ServerSyncLogEndDatetime = Date;
export type ServerSyncLogNumberOfConnections = number;
export type ServerSyncLogNumberOfRecords = number;
export type ServerSyncLogDataCharsTotal = number;

@Entity()
@Table({name: "AGT_SERVER_SYNC_LOG"})
export class ServerSyncLog {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: ServerSyncLogId;

	@ManyToOne()
	@JoinColumn(
		{name: "SERVER_ID", referencedColumnName: "ID", nullable: false}
	)
	server: IServer;

	@Column({name: 'TYPE', nullable: false})
	@DbNumber()
	type: SyncType;

	@Column({name: "START_DATETIME", nullable: false})
	@DbDate()
	startDatetime: ServerSyncLogStartDatetime;

	@Column({name: "PROCESSED_DATETIME", nullable: false})
	@DbDate()
	endDatetime: ServerSyncLogEndDatetime;

	@Column({name: "NUMBER_OF_CONNECTIONS", nullable: false})
	@DbNumber()
	numberOfConnections: ServerSyncLogNumberOfConnections;

	@Column({name: "NUMBER_OF_SYNC_RECORDS", nullable: false})
	@DbNumber()
	numberOfRecords: ServerSyncLogNumberOfRecords;

	@Column({name: "DATA_CHARS_TOTAL", nullable: false})
	@DbNumber()
	dataCharsTotal: ServerSyncLogDataCharsTotal;

}