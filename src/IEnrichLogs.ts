import { MessageLog } from './MessageLog';

export interface IEnrichLogs {
    enrich(messageLog: MessageLog);
}
