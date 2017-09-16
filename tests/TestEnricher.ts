import { IEnrichLogs } from '../src/IEnrichLogs';
import { IBuildLogMessage } from '../src/IBuildLogMessage';
import { LogMessage } from '../src/LogMessage';

export class TestEnricher implements IEnrichLogs {
    callCount: number = 0;

    enrichTags(): string[] {
        return new Array('EnrichedTag');
    }

    enrichProperties(): any {
        this.callCount++;
        return { enriched: true };
    }
}