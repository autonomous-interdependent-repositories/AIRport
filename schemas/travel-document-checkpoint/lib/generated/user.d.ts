import { IContinent } from './locality/continent';
import { ICountry } from './locality/country';
import { IState } from './locality/state';
import { IMetroArea } from './locality/metroarea';
export interface IUser {
    _localId?: number;
    origin?: string;
    originId?: string;
    email?: string;
    passwordHash?: string;
    ranking?: number;
    username?: string;
    GUID?: string;
    continent?: IContinent;
    country?: ICountry;
    state?: IState;
    metroArea?: IMetroArea;
}
//# sourceMappingURL=user.d.ts.map