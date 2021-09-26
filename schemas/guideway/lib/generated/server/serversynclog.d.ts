import { IServer } from './server';
export interface IServerSyncLog {
    id: number;
    type?: string;
    startDatetime?: Date;
    endDatetime?: Date;
    numberOfConnections?: number;
    numberOfRecords?: number;
    dataCharsTotal?: number;
    server?: IServer;
}
//# sourceMappingURL=serversynclog.d.ts.map