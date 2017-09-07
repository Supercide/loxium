import { IEnrichLogs } from '../src/IEnrichLogs';
import { IBuildLogMessage } from '../src/IBuildLogMessage';
import { MessageLog } from '../src/MessageLog';

export class TestEnricher implements IEnrichLogs {
    messageLogs: MessageLog[] = [];
    enrich(messageLog: MessageLog) {
        this.messageLogs.push(messageLog);
    }
}
