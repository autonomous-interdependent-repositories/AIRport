import {
    DbDomain,
    DomainName
} from '@airport/ground-control'
import {
    IDomainRetriever
} from '@airport/terminal-map'

export class DomainRetriever
    implements IDomainRetriever {

    async retrieveDomain(
        domainName: DomainName,
        domainNameMapByName: Map<string, DbDomain>,
		allDomains: DbDomain[],
		newDomains: DbDomain[]
    ): Promise<DbDomain> {
        return domainNameMapByName.get(domainName)
    }

}
