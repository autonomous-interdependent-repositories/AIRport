import { QApplication } from '@airport/aviation-communication';
import { DbApplication, ApplicationEntity_LocalId } from '@airport/ground-control';
import { QClassification } from './type/qclassification';
import { QClient } from './client/qclient';
import { QClientType } from './client/qclienttype';
import { QContinent } from './locality/qcontinent';
import { QCountry } from './locality/qcountry';
import { QDatabase } from './database/qdatabase';
import { QDatabaseType } from './database/qdatabasetype';
import { QMetroArea } from './locality/qmetroarea';
import { QMetroAreaState } from './locality/qmetroareastate';
import { QState } from './locality/qstate';
import { QTerminal } from './terminal/qterminal';
import { QTerminalType } from './terminal/qterminaltype';
import { QType } from './type/qtype';
import { QTypeClassification } from './type/qtypeclassification';
import { QUserAccount } from './quseraccount';
export interface LocalQApplication extends QApplication {
    db: DbApplication;
    Classification: QClassification;
    Client: QClient;
    ClientType: QClientType;
    Continent: QContinent;
    Country: QCountry;
    Database: QDatabase;
    DatabaseType: QDatabaseType;
    MetroArea: QMetroArea;
    MetroAreaState: QMetroAreaState;
    State: QState;
    Terminal: QTerminal;
    TerminalType: QTerminalType;
    Type: QType;
    TypeClassification: QTypeClassification;
    UserAccount: QUserAccount;
}
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(dbEntityId: ApplicationEntity_LocalId): boolean;
//# sourceMappingURL=qApplication.d.ts.map