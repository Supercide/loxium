import { IBuildLogMessage } from './IBuildLogMessage';
import { IEnrichLogs } from './IEnrichLogs';
import { IWriteLogMessage } from './IWriteLogMessage';
import { LogLevel } from './LogLevel';
import { LogMessage } from './LogMessage';

export class LogSerialiser {
    constructor(private _enrichers: IEnrichLogs[], private _writers: IWriteLogMessage[], private _logLevel: LogLevel) {

    }

    Write(messageLog: LogMessage) {
        if (messageLog.level >= this._logLevel) {
            this.ProcessEnrichers(messageLog);

            this.ProcessLogWriters(messageLog);
        }
    }

    private ProcessEnrichers(messageLog: LogMessage): void {
        if (this._enrichers) {
            this._enrichers.forEach((enricher: IEnrichLogs) => {
                enricher.enrich(messageLog);
            });
        }
    }

    private ProcessLogWriters(messageLog: LogMessage) {
        if (this._writers) {
            this._writers.forEach((writer: IWriteLogMessage) => {
                writer.write(messageLog);
            });
        }
    }
}
