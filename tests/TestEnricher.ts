import { EnrichLogs } from '../src/EnrichLogs';
import { BuildLogMessage } from '../src/BuildLogMessage';
import { LogMessage } from '../src/LogMessage';

export class TestEnricher implements EnrichLogs {
    callCount: number = 0;

    enrichTags(): string[] {
        return new Array('EnrichedTag');
    }

    enrichProperties(): any {
        this.callCount++;
        return { enriched: true };
    }
}