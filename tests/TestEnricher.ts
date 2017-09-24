import { BuildLogMessage } from '../src/BuildLogMessage';
import { EnrichLogs } from '../src/EnrichLogs';
import { LogMessage } from '../src/LogMessage';

export class TestEnricher implements EnrichLogs {
    callCount: number = 0;

    enrich(logMessage: LogMessage) {
        logMessage.tags.push('EnrichedTag');
        logMessage.properties['enriched'] = true;
        this.callCount++;
    }
}