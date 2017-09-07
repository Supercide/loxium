import { IEnrichLogs } from '../IEnrichLogs';
import { IBuildLogMessage } from '../IBuildLogMessage';
import { MessageLog } from '../MessageLog';

export class TestEnricher implements IEnrichLogs {
    messageLogs: MessageLog[] = [];
    enrich(messageLog: MessageLog) {
        this.messageLogs.push(messageLog);
    }
}
