import { IBuildLogMessage } from '../src/IBuildLogMessage';
import { IEnrichLogs } from '../src/IEnrichLogs';
import { LogMessage } from '../src/LogMessage';

export class TestEnricher implements IEnrichLogs {
    messageLogs: LogMessage[] = [];
    enrich(messageLog: LogMessage) {
        this.messageLogs.push(messageLog);
    }
}
