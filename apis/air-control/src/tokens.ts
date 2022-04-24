import { lib } from '@airport/direction-indicator'
import { IRepositoryLoader } from '.'
import { IRelationManager, RelationManager } from './impl/core/entity/RelationManager'
import { IQueryContextLoader, QueryContextLoader } from './impl/query/QueryContext'
import { IAirportDatabase } from './lingo/AirportDatabase'
import {
	IDatabaseFacade,
	IQueryFacade
} from './lingo/core/repository/DatabaseFacade'
import { IUpdateCacheManager } from './lingo/core/UpdateCacheManager'
import { ILookup } from './lingo/query/api/Lookup'
import { IEntityUtils } from './lingo/utils/EntityUtils'
import { IFieldUtils } from './lingo/utils/FieldUtils'
import { IQMetadataUtils } from './lingo/utils/QMetadataUtils'
import { IQueryUtils } from './lingo/utils/QueryUtils'
import { IApplicationUtils } from './lingo/utils/ApplicationUtils'
import { ENTITY_STATE_MANAGER } from '@airport/ground-control'
import { Lookup } from './impl/query/api/Lookup'
import { EntityUtils } from './impl/utils/EntityUtils'
import { QMetadataUtils } from './impl/utils/QMetadataUtils'
import { QueryUtils } from './impl/utils/QueryUtils'
import { ApplicationUtils } from './impl/utils/ApplicationUtils'

const airControl = lib('air-control')

export const AIRPORT_DATABASE = airControl.token<IAirportDatabase>({
	class: null,
	interface: 'IAirportDatabase',
	token: 'AIRPORT_DATABASE'
})
export const DATABASE_FACADE = airControl.token<IDatabaseFacade>({
	class: null,
	interface: 'IDatabaseFacade',
	token: 'DATABASE_FACADE'
})
export const LOOKUP = airControl.token<ILookup>({
	class: Lookup,
	interface: 'ILookup',
	token: 'LOOKUP'
})
export const ENTITY_UTILS = airControl.token<IEntityUtils>({
	class: EntityUtils,
	interface: 'IEntityUtils',
	token: 'ENTITY_UTILS'
})
export const FIELD_UTILS = airControl.token<IFieldUtils>({
	class: EntityUtils,
	interface: 'IFieldUtils',
	token: 'FIELD_UTILS'
})
export const Q_METADATA_UTILS = airControl.token<IQMetadataUtils>({
	class: QMetadataUtils,
	interface: 'IQMetadataUtils',
	token: 'Q_METADATA_UTILS'
})
export const QUERY_CONTEXT_LOADER = airControl.token<IQueryContextLoader>({
	class: QueryContextLoader,
	interface: 'IQueryContextLoader',
	token: 'QUERY_CONTEXT_LOADER'
})

export const QUERY_FACADE = airControl.token<IQueryFacade>({
	class: QueryContextLoader,
	interface: 'IQueryFacade',
	token: 'QUERY_FACADE'
})

export const QUERY_UTILS = airControl.token<IQueryUtils>({
	class: QueryUtils,
	interface: 'IQueryUtils',
	token: 'QUERY_UTILS'
})

export const RELATION_MANAGER = airControl.token<IRelationManager>({
	class: RelationManager,
	interface: 'IRelationManager',
	token: 'RELATION_MANAGER'
})
export const REPOSITORY_LOADER = airControl.token<IRepositoryLoader>({
	class: null,
	interface: 'IRepositoryLoader',
	token: 'REPOSITORY_LOADER'
})
export const APPLICATION_UTILS = airControl.token<IApplicationUtils>({
	class: ApplicationUtils,
	interface: 'IApplicationUtils',
	token: 'APPLICATION_UTILS'
})
export const UPDATE_CACHE_MANAGER = airControl.token<IUpdateCacheManager>({
	class: null,
	interface: 'IUpdateCacheManager',
	token: 'UPDATE_CACHE_MANAGER'
})

AIRPORT_DATABASE.setDependencies({
	databaseFacade: DATABASE_FACADE
})
APPLICATION_UTILS.setDependencies({
	entityStateManager: ENTITY_STATE_MANAGER
})
DATABASE_FACADE.setDependencies({
	applicationUtils: APPLICATION_UTILS,
	entityStateManager: ENTITY_STATE_MANAGER,
	queryContextLoader: QUERY_CONTEXT_LOADER,
	updateCacheManager: UPDATE_CACHE_MANAGER
})
QUERY_FACADE.setDependencies({
	queryContextLoader: QUERY_CONTEXT_LOADER
})
UPDATE_CACHE_MANAGER.setDependencies({
	applicationUtils: APPLICATION_UTILS,
	entityStateManager: ENTITY_STATE_MANAGER,
})
