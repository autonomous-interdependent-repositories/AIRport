import { IContext, Injected } from '@airport/direction-indicator'
import { ApplicationVersion_LocalId } from '@airport/ground-control'
import {
	BaseApplicationEntityDao,
	IBaseApplicationEntityDao,
	IApplicationEntity,
	Q,
	QApplicationEntity,
} from '../generated/generated'

export interface IApplicationEntityDao
	extends IBaseApplicationEntityDao {

	findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersion_LocalId[]
	): Promise<IApplicationEntity[]>

	insert(
		applicationEntities: IApplicationEntity[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationEntityDao
	extends BaseApplicationEntityDao
	implements IApplicationEntityDao {

	async findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersion_LocalId[]
	): Promise<IApplicationEntity[]> {
		let se: QApplicationEntity

		return await this.db.find.tree({
			select: {},
			from: [
				se = Q.ApplicationEntity
			],
			where: se.applicationVersion._localId.in(applicationVersionIds)
		})
	}

	async insert(
		applicationEntities: IApplicationEntity[],
		context: IContext
	): Promise<void> {
		let se: QApplicationEntity;
		const values = []
		for (const applicationEntity of applicationEntities) {
			values.push([
				applicationEntity._localId, applicationEntity.index,
				applicationEntity.isLocal, applicationEntity.isAirEntity,
				applicationEntity.name, applicationEntity.tableConfig,
				applicationEntity.applicationVersion._localId,
				applicationEntity.deprecatedSinceVersion ? applicationEntity.deprecatedSinceVersion._localId : null,
				applicationEntity.removedInVersion ? applicationEntity.removedInVersion._localId : null,
				applicationEntity.sinceVersion ? applicationEntity.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: se = Q.ApplicationEntity,
			columns: [
				se._localId,
				se.index,
				se.isLocal,
				se.isAirEntity,
				se.name,
				se.tableConfig,
				se.applicationVersion._localId,
				se.deprecatedSinceVersion._localId,
				se.removedInVersion._localId,
				se.sinceVersion._localId
			],
			values
		}, context)
	}

}
