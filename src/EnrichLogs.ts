import { LogMessage } from './LogMessage';

export abstract class EnrichLogs {
    abstract enrich(logMessage: LogMessage);
}
