
import { LogLevel } from "./LogLevel";
import { IWriteLogMessage } from "./IWriteLogMessage";
import { IEnrichLogs } from "./IEnrichLogs";
import { ILogger } from "./ILogger";
import { LoxiumLogger } from "./loxiumLogger";
import * as logger from 'loglevel'
import * as logSerialiser from './logSerialiser'

export class LogBuilder {
    private _name: string;
    private _level: LogLevel;
    private _logMessageWriters: IWriteLogMessage[] = [];
    private _logEnrichers:IEnrichLogs[] = [];

    writeTo(logMessageWriter:IWriteLogMessage) : LogBuilder
    {
        this._logMessageWriters.push(logMessageWriter);

        return this;
    }

    enrichWith(logEnricher:IEnrichLogs) : LogBuilder
    {
        this._logEnrichers.push(logEnricher);

        return this;
    }

    setMinimumLevel(logLevel:LogLevel) : LogBuilder
    {
        this._level = logLevel;

        return this;
    }

    setName(name:string) : LogBuilder
    {
        this._name = name;

        return this;
    }

    createLogger() : ILogger{
        let log = this.createUnderlyingLogger();

        return new LoxiumLogger(log);
    }

    private createUnderlyingLogger(){
        let log = logger.getLogger(this._name);
        log.methodFactory = logSerialiser.CreateSerialiser(this._logEnrichers, this._logMessageWriters);
        log.setLevel(this._level);
        return log;
    }
}
