import {
	IUtils,
	UTILS,
	Y
}                                       from '@airport/air-control'
import {DI}                             from '@airport/di'
import {RepositoryTransactionBlockData} from '@airport/moving-walkway'
import {
	IUser,
	IUserDao,
	USER_DAO,
	UserId,
	UserUniqueId
}                                       from '@airport/travel-document-checkpoint'
import {SYNC_IN_USER_CHECKER}           from '../../../diTokens'
import {IDataToTM}                      from '../SyncInUtils'

export interface UserCheckResults {
	map: Map<UserUniqueId, IUser>;
	mapById: Map<UserId, IUser>;
	mapByMessageIndexAndRemoteUserId: Map<UserId, IUser>[];
	consistentMessages: IDataToTM[];
	inconsistentMessages: IDataToTM[];
}

export interface ISyncInUserChecker {

	ensureUsersAndGetAsMaps(
		dataMessages: IDataToTM[]
	): Promise<UserCheckResults>;

}

export class SyncInUserChecker
	implements ISyncInUserChecker {

	private userDao: IUserDao
	private utils: IUtils

	constructor() {
		DI.get((
			userDao,
			utils
		) => {
			this.userDao = userDao
			this.utils   = utils
		}, USER_DAO, UTILS)
	}

	async ensureUsersAndGetAsMaps(
		dataMessages: IDataToTM[]
	): Promise<UserCheckResults> {
		const remoteUserMapByUniqueId: Map<UserUniqueId, IUser>      = new Map()
		const mapById: Map<UserId, IUser>                            = new Map()
		const mapByMessageIndexAndRemoteUserId: Map<UserId, IUser>[] = []

		const consistentMessages: IDataToTM[]   = []
		const inconsistentMessages: IDataToTM[] = []
		for (const message of dataMessages) {
			const data = message.data
			if (!this.areUserIdsConsistentInMessageData(data)) {
				inconsistentMessages.push(message)
				continue
			}

			const mapForMessageByRemoteUserId = this.gatherUserUniqueIds(
				data, remoteUserMapByUniqueId)
			consistentMessages.push(message)
			mapByMessageIndexAndRemoteUserId.push(mapForMessageByRemoteUserId)
		}

		const map = await this.userDao.findFieldsMapByUniqueId(
			Array.from(remoteUserMapByUniqueId.keys()), {
				id: Y,
				uniqueId: Y
			})

		await this.addMissingUsers(remoteUserMapByUniqueId, map, mapById)

		return {
			map,
			mapById,
			mapByMessageIndexAndRemoteUserId,
			consistentMessages,
			inconsistentMessages
		}
	}

	private areUserIdsConsistentInMessageData(
		data: RepositoryTransactionBlockData
	): boolean {
		const userIdSet: Set<UserId> = new Set()
		for (const user of data.users) {
			const userId = user.id
			if (userIdSet.has(userId)) {
				return false
			}
		}
		if (!userIdSet.has(data.terminal.owner.id)) {
			return false
		}
		for (const actor of data.actors) {
			if (!userIdSet.has(actor.user.id)) {
				return false
			}
		}

		return true
	}

	private gatherUserUniqueIds(
		data: RepositoryTransactionBlockData,
		remoteUserMapByUniqueId: Map<UserUniqueId, IUser>
	): Map<UserId, IUser> {
		const mapForMessageByRemoteUserId: Map<UserId, IUser> = new Map()
		for (const remoteUser of data.users) {
			const user = {
				...remoteUser
			}
			remoteUserMapByUniqueId.set(user.uniqueId, user)
			mapForMessageByRemoteUserId.set(user.id, user)
		}
		return mapForMessageByRemoteUserId
	}

	private async addMissingUsers(
		remoteUserMapByUniqueId: Map<UserUniqueId, IUser>,
		userMap: Map<UserUniqueId, IUser>,
		userMapById: Map<UserId, IUser>
	): Promise<void> {
		const newUsers: IUser[] = []
		for (const [uniqueId, user] of remoteUserMapByUniqueId) {
			const existingUser = userMap.get(uniqueId)
			if (!existingUser) {
				delete user.id
				newUsers.push(user)
				userMap.set(uniqueId, user)
			} else {
				user.id = existingUser.id
				userMapById.set(existingUser.id, user)
			}
		}
		if (newUsers.length) {
			await this.userDao.bulkCreate(newUsers, false, false)
			for (const newUser of newUsers) {
				userMapById.set(newUser.id, newUser)
			}
		}
	}

}

DI.set(SYNC_IN_USER_CHECKER, SyncInUserChecker)
