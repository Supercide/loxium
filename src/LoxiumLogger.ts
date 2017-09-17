import { Logger } from './Logger';
import { BuildLogMessage } from './BuildLogMessage';
import { LogLevel } from './LogLevel';
import { MessageLogBuilder } from './MessageLogBuilder';
import { LogMessage } from './LogMessage';
import { LogSerialiser } from './logSerialiser';

export class LoxiumLogger implements Logger {
    constructor(private serialiser: LogSerialiser, private _context: string) {
    }

    error(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void {
        this.LogMessage(LogLevel.Error, messageLogBuilder, method);
    }

    warn(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void {
        this.LogMessage(LogLevel.Warn, messageLogBuilder, method);
    }

    debug(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void {
        this.LogMessage(LogLevel.Debug, messageLogBuilder, method);
    }

    information(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void {
        this.LogMessage(LogLevel.Info, messageLogBuilder, method);
    }

    trace(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void {
        this.LogMessage(LogLevel.Trace, messageLogBuilder, method);
    }

    private LogMessage(level: LogLevel, configuration: (b: BuildLogMessage) => void, method?: string) {
        let messageLogBuilder = new MessageLogBuilder(level, this._context, method);
        configuration(messageLogBuilder);
        let messageLog = messageLogBuilder.build();
        this.Log(messageLog);
    }

    private Log(messageLog: LogMessage) {
        this.serialiser.Write(messageLog);
    }
}