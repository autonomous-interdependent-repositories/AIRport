import { AIRPORT_DATABASE } from '@airport/air-control';
import { lib } from '@airport/direction-indicator';
import { ENTITY_STATE_MANAGER } from '@airport/ground-control';
import { Dao } from './dao/Dao';
import { SelectorManager } from './Selector';
const checkIn = lib('check-in');
export const API_REGISTRY = checkIn.token({
    class: null,
    interface: 'IApiRegistry',
    token: 'API_REGISTRY'
});
export const API_VALIDATOR = checkIn.token({
    class: null,
    interface: 'IApiValidator',
    token: 'API_VALIDATOR'
});
export const CLIENT_QUERY_MANAGER = checkIn.token({
    class: null,
    interface: 'IClientQueryManager',
    token: 'CLIENT_QUERY_MANAGER'
});
export const DAO = checkIn.token({
    class: Dao,
    interface: 'IDao',
    token: 'DAO'
});
export const OPERATION_DESERIALIZER = checkIn.token({
    class: null,
    interface: 'IOperationDeserializer',
    token: 'OPERATION_DESERIALIZER'
});
export const QUERY_PARAMETER_DESERIALIZER = checkIn.token({
    class: null,
    interface: 'IQueryParameterDeserializer',
    token: 'QUERY_PARAMETER_DESERIALIZER'
});
export const QUERY_RESULTS_SERIALIZER = checkIn.token({
    class: null,
    interface: 'IQueryParameterDeserializer',
    token: 'QUERY_RESULTS_SERIALIZER'
});
export const SELECTOR_MANAGER = checkIn.token({
    class: SelectorManager,
    interface: 'ISelectorManager',
    token: 'SELECTOR_MANAGER'
});
export const SEQUENCE_GENERATOR = checkIn.token({
    class: null,
    interface: 'ISequenceGenerator',
    token: 'SEQUENCE_GENERATOR'
});
DAO.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    entityStateManager: ENTITY_STATE_MANAGER
});
//# sourceMappingURL=tokens.js.map