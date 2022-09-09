import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	UserAccountVDescriptor,
	UserAccount,
	ContinentVDescriptor,
	Continent,
	CountryVDescriptor,
	Country,
	StateVDescriptor,
	State,
	MetroAreaVDescriptor,
	MetroArea,
} from '@airport/travel-document-checkpoint';
import {
	RepositoryTransactionHistoryVDescriptor,
} from '../history/VRepositoryTransactionHistory';
import {
	RepositoryTransactionHistory,
} from '../../../ddl/history/RepositoryTransactionHistory';
import {
	RepositoryApplicationVDescriptor,
} from './VRepositoryApplication';
import {
	RepositoryApplication,
} from '../../../ddl/repository/RepositoryApplication';
import {
	RepositoryClientVDescriptor,
} from './VRepositoryClient';
import {
	RepositoryClient,
} from '../../../ddl/repository/RepositoryClient';
import {
	RepositoryDatabaseVDescriptor,
} from './VRepositoryDatabase';
import {
	RepositoryDatabase,
} from '../../../ddl/repository/RepositoryDatabase';
import {
	RepositoryTerminalVDescriptor,
} from './VRepositoryTerminal';
import {
	RepositoryTerminal,
} from '../../../ddl/repository/RepositoryTerminal';
import {
	RepositoryTypeVDescriptor,
} from './VRepositoryType';
import {
	RepositoryType,
} from '../../../ddl/repository/RepositoryType';
import {
	IRepository,
} from '../../entity/repository/IRepository';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	GUID?: string | IVStringField;
	name?: string | IVStringField;
	ageSuitability?: number | IVNumberField;
	createdAt?: Date | IVDateField;
	immutable?: boolean | IVBooleanField;
	source?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	owner?: UserAccountVDescriptor<UserAccount>
	repositoryTransactionHistory?: RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>
	continent?: ContinentVDescriptor<Continent>
	country?: CountryVDescriptor<Country>
	state?: StateVDescriptor<State>
	metroArea?: MetroAreaVDescriptor<MetroArea>
	repositoryApplications?: RepositoryApplicationVDescriptor<RepositoryApplication>
	repositoryClients?: RepositoryClientVDescriptor<RepositoryClient>
	repositoryDatabases?: RepositoryDatabaseVDescriptor<RepositoryDatabase>
	repositoryTerminals?: RepositoryTerminalVDescriptor<RepositoryTerminal>
	repositoryTypes?: RepositoryTypeVDescriptor<RepositoryType>

}


