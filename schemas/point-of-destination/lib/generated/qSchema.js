import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getApplicationName } from '@airport/ground-control';
import { DailyArchive } from '../ddl/ddl';
const __constructors__ = {
    DailyArchive: DailyArchive
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'air',
    name: '@airport/point-of-destination'
};
export const Q = Q_SCHEMA;
export function diSet(dbEntityId) {
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DI.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getApplicationName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map