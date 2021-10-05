import { DI } from '@airport/di'
import {
	DomainId,
	DomainName
} from '@airport/ground-control'
import { DOMAIN_DAO } from '../tokens'
import {
	BaseDomainDao,
	IBaseDomainDao,
	IDomain,
	Q,
	QDomain
} from '../generated/generated'

export interface IDomainDao
	extends IBaseDomainDao {

	findByIdIn(
		domainIds: DomainId[]
	): Promise<IDomain[]>

	findMapByNameWithNames(
		domainNames: DomainName[]
	): Promise<Map<DomainName, IDomain>>

	findByName(
		domainName: DomainName
	): Promise<IDomain>

}

export class DomainDao
	extends BaseDomainDao
	implements IDomainDao {

	async findByIdIn(
		domainIds: DomainId[]
	): Promise<IDomain[]> {
		let d: QDomain

		return await this.db.find.tree({
			select: {},
			from: [
				d = Q.Domain
			],
			where: d.id.in(domainIds)
		})
	}

	async findMapByNameWithNames(
		domainNames: DomainName[]
	): Promise<Map<DomainName, IDomain>> {
		let d: QDomain
		const domains = await this.db.find.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.in(domainNames)
		})

		const domainMapByNameWithNames: Map<DomainName, IDomain> = new Map()

		for (const domain of domains) {
			domainMapByNameWithNames.set(domain.name, domain)
		}

		return domainMapByNameWithNames
	}

	async findByName(
		name: DomainName
	): Promise<IDomain> {
		let d: QDomain
		return await this.db.findOne.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.equals(name)
		})
	}

}

DI.set(DOMAIN_DAO, DomainDao)
