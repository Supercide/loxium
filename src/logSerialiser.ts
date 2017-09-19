import { BuildLogMessage } from './BuildLogMessage';
import { EnrichLogs } from './EnrichLogs';
import { LogLevel } from './LogLevel';
import { LogMessage } from './LogMessage';
import { WriteLogMessage } from './WriteLogMessage';

export class LogSerialiser {
    constructor(private _enrichers: EnrichLogs[], private _writers: WriteLogMessage[], private _logLevel: LogLevel) {

    }

    Write(logMessage: LogMessage) {
        if (logMessage.level >= this._logLevel) {
            this.ProcessEnrichers(logMessage);

            this.ProcessLogWriters(logMessage);
        }
    }

    private ProcessEnrichers(logMessage: LogMessage): void {

        if (this._enrichers) {
            this._enrichers.forEach((enricher: EnrichLogs) => {
                const enrichedMessage = JSON.parse(JSON.stringify(logMessage)) as LogMessage;

                enricher.enrich(enrichedMessage);

                this.mergeEnrichedMessage(logMessage, enrichedMessage);
            });
        }
    }

    private mergeEnrichedMessage(logMessage: LogMessage, enrichedMessage: LogMessage) {
        logMessage.properties = Object.assign({}, enrichedMessage.properties, logMessage.properties);                
        logMessage.tags = Array.from(new Set([...logMessage.tags, ...enrichedMessage.tags]));
    }

    private ProcessLogWriters(logMessage: LogMessage) {
        if (this._writers) {
            this._writers.forEach((writer: WriteLogMessage) => {
                writer.write(logMessage);
            });
        }
    }
}
