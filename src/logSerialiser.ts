import { IBuildLogMessage } from './IBuildLogMessage';
import { IEnrichLogs } from './IEnrichLogs';
import { IWriteLogMessage } from './IWriteLogMessage';
import { MessageLog } from './MessageLog';
import { LogLevel } from './LogLevel';

export class LogSerialiser {
    constructor(private _enrichers: IEnrichLogs[], private _writers: IWriteLogMessage[], private _logLevel: LogLevel) {

    }

    Write(messageLog: MessageLog) {
        if (messageLog.level >= this._logLevel) {
            this.ProcessEnrichers(messageLog);

            this.ProcessLogWriters(messageLog);
        }        
    }
    
    private ProcessEnrichers(messageLog: MessageLog): void {
        if (this._enrichers) {
            this._enrichers.forEach((enricher: IEnrichLogs) => {
                enricher.enrich(messageLog);
            });
        }
    }

    private ProcessLogWriters(messageLog: MessageLog) {
        if (this._writers) {
            this._writers.forEach((writer: IWriteLogMessage) => {
                writer.write(messageLog);
            });
        }
    }
}
