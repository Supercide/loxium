import { BuildLogMessage } from './BuildLogMessage';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';
import { LogMessage } from './LogMessage';
import { LogSerialiser } from './logSerialiser';
import { MessageLogBuilder } from './MessageLogBuilder';

export class LoxiumLogger implements Logger {
    constructor(private _serialiser: LogSerialiser, private _context: string) {
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
        const messageLogBuilder = new MessageLogBuilder(level, this._context, method);
        configuration(messageLogBuilder);
        const messageLog = messageLogBuilder.build();
        this.Log(messageLog);
    }

    private Log(messageLog: LogMessage) {
        this._serialiser.Write(messageLog);
    }
}
