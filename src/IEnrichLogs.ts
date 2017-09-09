import { LogMessage } from './LogMessage';

export interface IEnrichLogs {
    enrich(messageLog: LogMessage);
}
