
import { LogLevel } from './LogLevel';
import { IWriteLogMessage } from './IWriteLogMessage';
import { IEnrichLogs } from './IEnrichLogs';
import { ILogger } from './ILogger';
import { LoxiumLogger } from './LoxiumLogger';
import { LogSerialiser } from './logSerialiser';
import { ConsoleWriter } from './ConsoleWriter';

export class LogBuilder {
    private _context: string;
    private _level: LogLevel;
    private _logMessageWriters: IWriteLogMessage[] = [];
    private _logEnrichers: IEnrichLogs[] = [];

    writeTo(logMessageWriter: IWriteLogMessage): LogBuilder {
        this._logMessageWriters.push(logMessageWriter);

        return this;
    }

    enrichWith(logEnricher: IEnrichLogs): LogBuilder {
        this._logEnrichers.push(logEnricher);

        return this;
    }

    setMinimumLevel(logLevel: LogLevel): LogBuilder {
        this._level = logLevel;

        return this;
    }

    setContext(context: string): LogBuilder {
        this._context = context;

        return this;
    }

    build(): ILogger {
        let serialiser = this.createSerialiser();

        return new LoxiumLogger(serialiser, this._context);
    }

    private createSerialiser() {
        if (this._logMessageWriters.length === 0) {
            this.writeTo(new ConsoleWriter());
        }
        return new LogSerialiser(this._logEnrichers, this._logMessageWriters, this._level);
    }
}