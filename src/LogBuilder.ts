import { IEnrichLogs } from './IEnrichLogs';
import { ILogger } from './ILogger';
import { IWriteLogMessage } from './IWriteLogMessage';
import { LogLevel } from './LogLevel';
import { LogSerialiser } from './logSerialiser';
import { LoxiumLogger } from './LoxiumLogger';

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

    createLogger(): ILogger {
        const serialiser = this.CreateSerialiser();

        return new LoxiumLogger(serialiser, this._context);
    }

    private CreateSerialiser() {
        return new LogSerialiser(this._logEnrichers, this._logMessageWriters, this._level);
    }
}
