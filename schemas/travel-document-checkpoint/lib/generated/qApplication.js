import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { getFullApplicationName } from '@airport/ground-control';
import { Agt, Continent, Country, Terminal, TerminalAgt, User, UserTerminal, UserTerminalAgt } from '../ddl/ddl';
const __constructors__ = {
    Agt: Agt,
    Continent: Continent,
    Country: Country,
    Terminal: Terminal,
    TerminalAgt: TerminalAgt,
    User: User,
    UserTerminal: UserTerminal,
    UserTerminalAgt: UserTerminalAgt
};
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/travel-document-checkpoint'
};
export const Q = Q_APPLICATION;
export function diSet(dbEntityId) {
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DEPENDENCY_INJECTION.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getFullApplicationName(Q_APPLICATION)] = Q;
});
//# sourceMappingURL=qApplication.js.map