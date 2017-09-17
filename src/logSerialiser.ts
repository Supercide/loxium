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
        let properties = {};
        let tags: string[] = [];
        if (this._enrichers) {
            this._enrichers.forEach((enricher: EnrichLogs) => {
                const enrichedProperties = enricher.enrichProperties();

                tags = tags.concat(enricher.enrichTags());

                if (enrichedProperties) {
                    properties = Object.assign(properties, enrichedProperties);
                }
            });

            logMessage.properties = Object.assign(properties, logMessage.properties);
            logMessage.tags = Array.from(new Set(logMessage.tags.concat(tags)));
        }
    }

    private ProcessLogWriters(logMessage: LogMessage) {
        if (this._writers) {
            this._writers.forEach((writer: WriteLogMessage) => {
                writer.write(logMessage);
            });
        }
    }
}
