import { AND, Y } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import { DbApplication_Name, DbApplicationVersion, DbDomain_Name } from '@airport/ground-control'
import { BaseDdlApplicationVersionDao, IBaseDdlApplicationVersionDao } from '../generated/baseDaos'
import { QDdlApplication, QDdlApplicationVersion, QDdlDomain } from '../generated/qInterfaces'
import Q_airport____at_airport_slash_airspace from '../generated/qApplication'

export interface IApplicationVersionDao
	extends IBaseDdlApplicationVersionDao {

	findAllActiveOrderByDbApplication_IndexAndId(): Promise<DbApplicationVersion[]>

	findByDomain_NamesAndDbApplication_Names(
		domainNames: string[],
		applicationNames: string[]
	): Promise<DbApplicationVersion[]>

	insert(
		applicationVersions: DbApplicationVersion[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationVersionDao
	extends BaseDdlApplicationVersionDao
	implements IApplicationVersionDao {

	/*
	async findAllLatestForDbApplication_Indexes(
		applicationIndexes: DbApplication_Index[]
	): Promise<DbApplicationVersion[]> {
		let sv: QAppVersion

		return await this.db.find.tree({
			FROM: [
				sv = Q.ApplicationVersion
			],
			SELECT: {},
			WHERE: AND(
				sv._localId.IN(this._localIdsForMaxVersionSelect()),
				sv.application.index.IN(applicationIndexes)
			)
		})
	}
	*/

	async findAllActiveOrderByDbApplication_IndexAndId(): Promise<DbApplicationVersion[]> {
		let av: QDdlApplicationVersion,
			a: QDdlApplication

		return await this.db.find.tree({
			FROM: [
				av = Q_airport____at_airport_slash_airspace.ApplicationVersion,
				a = av.application.INNER_JOIN()
			],
			SELECT: {},
			ORDER_BY: [
				a.index.ASC(),
				av._localId.DESC()
			]
		})
	}

	async findByDomain_NamesAndDbApplication_Names(
		domainNames: DbDomain_Name[],
		applicationNames: DbApplication_Name[]
	): Promise<DbApplicationVersion[]> {
		let av: QDdlApplicationVersion
		let a: QDdlApplication
		let d: QDdlDomain

		return await this.db.find.tree({
			SELECT: {
				_localId: Y,
				integerVersion: Y,
				application: {
					domain: {
						name: Y
					},
					fullName: Y,
					name: Y
				}
			},
			FROM: [
				av = Q_airport____at_airport_slash_airspace.ApplicationVersion,
				a = av.application.INNER_JOIN(),
				d = a.domain.INNER_JOIN()
			],
			WHERE: AND(
				d.name.IN(domainNames),
				a.name.IN(applicationNames)
			),
			ORDER_BY: [
				d.name.DESC(),
				a.name.DESC()
			]
		})
	}

	/*
	async findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: DbDomain_Name[],
		applicationNames: DbApplication_Name[]
	): Promise<Map<DbDomain_Name, Map<DbApplication_Name, DbApplicationVersion>>> {
		const maxVersionedMapByApplicationAndDomain_Names
				  : Map<DbDomain_Name, Map<DbApplication_Name, DbApplicationVersion>>
				  = new Map()

		let sv: QAppVersion
		let s: QApp
		let d: QDdlDomain

		const maxApplicationVersions: DbApplicationVersion[] = <any>await this.db.find.tree({
			SELECT: {
				integerVersion: Y,
				majorVersion: Y,
				minorVersion: Y,
				patchVersion: Y,
				application: {
					index: Y,
					name: Y,
					domain: {
						_localId: Y,
						name: Y
					}
				},
				_localId: Y
			},
			FROM: [
				sv = Q.ApplicationVersion,
				s = sv.application.INNER_JOIN(),
				d = s.domain.INNER_JOIN()
			],
			WHERE: AND(
				sv._localId.IN(this._localIdsForMaxVersionSelect()),
				d.name.IN(applicationDomain_Names),
				s.name.IN(applicationNames)
			),
		})

		for (const maxApplicationVersion of maxApplicationVersions) {
			const application = maxApplicationVersion.application
			this.utils.ensureChildJsMap(
				maxVersionedMapByApplicationAndDomain_Names, application.domain.name)
				.set(application.name, maxApplicationVersion)
		}


		return maxVersionedMapByApplicationAndDomain_Names
	}

	private idsForMaxVersionSelect(): RawFieldQuery<IQNumberField> {
		let svMax
		let sv2: QAppVersion

		return field({
			FROM: [
				svMax = tree({
					FROM: [
						sv2 = Q.ApplicationVersion
					],
					SELECT: DISTINCT({
						integerVersion: max(sv2.integerVersion),
						_localId: sv2._localId,
						applicationIndex: sv2.application.index
					})
				})
			],
			SELECT: svMax._localId
		})
	}
*/
	async insert(
		applicationVersions: DbApplicationVersion[],
		context: IContext
	): Promise<void> {
		let sv: QDdlApplicationVersion;
		const VALUES = []
		for (const applicationVersion of applicationVersions) {
			VALUES.push([
				applicationVersion._localId, applicationVersion.integerVersion,
				applicationVersion.versionString, applicationVersion.majorVersion,
				applicationVersion.minorVersion, applicationVersion.patchVersion,
				applicationVersion.application.index, applicationVersion.jsonApplication
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: sv = Q_airport____at_airport_slash_airspace.ApplicationVersion,
			columns: [
				sv._localId,
				sv.integerVersion,
				sv.versionString,
				sv.majorVersion,
				sv.minorVersion,
				sv.patchVersion,
				sv.application.index,
				sv.jsonApplication
			],
			VALUES: VALUES
		}, context)
	}

}
