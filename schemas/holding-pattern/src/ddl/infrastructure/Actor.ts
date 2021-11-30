import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany
} from '@airport/air-control'
import {
	Terminal,
	User
} from '@airport/travel-document-checkpoint'
import { Schema } from '@airport/airspace';

export type Actor_Id = number;
export type Actor_UuId = string;

@Entity()
export class Actor {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'ID' })
	id: Actor_Id

	@Column({ name: 'UU_ID', nullable: false })
	@DbString()
	uuId: Actor_UuId

	@ManyToOne()
	@JoinColumn({
		name: 'USER_ID', referencedColumnName: 'ID',
		nullable: false
	})
	user: User

	@ManyToOne()
	@JoinColumn({
		name: 'TERMINAL_ID', referencedColumnName: 'ID',
		nullable: false
	})
	terminal: Terminal

	@ManyToOne()
	@JoinColumn({ name: "SCHEMA_INDEX", referencedColumnName: "SCHEMA_INDEX" })
	schema: Schema

}
