
import { ConsoleWriter } from './ConsoleWriter';
import { EnrichLogs } from './EnrichLogs';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';
import { LogSerialiser } from './logSerialiser';
import { LoxiumLogger } from './LoxiumLogger';
import { WriteLogMessage } from './WriteLogMessage';

export class LogBuilder {
    private _name: string;
    private _level: LogLevel;
    private _logMessageWriters: WriteLogMessage[] = [];
    private _logEnrichers: EnrichLogs[] = [];

    writeTo(logMessageWriter: WriteLogMessage): LogBuilder {
        this._logMessageWriters.push(logMessageWriter);

        return this;
    }

    enrichWith(logEnricher: EnrichLogs): LogBuilder {
        this._logEnrichers.push(logEnricher);

        return this;
    }

    setMinimumLevel(logLevel: LogLevel): LogBuilder {
        this._level = logLevel;

        return this;
    }

    setName(name: string): LogBuilder {
        this._name = name;

        return this;
    }

    build(): Logger {
        const serialiser = this.createSerialiser();

        return new LoxiumLogger(serialiser, this._name);
    }

    private createSerialiser() {
        if (this._logMessageWriters.length === 0) {
            this.writeTo(new ConsoleWriter());
        }
        return new LogSerialiser(this._logEnrichers, this._logMessageWriters, this._level);
    }
}
