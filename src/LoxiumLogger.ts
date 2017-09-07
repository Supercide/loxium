import { IBuildLogMessage } from './IBuildLogMessage';
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
import { LogSerialiser } from './logSerialiser';
import { MessageLog } from './MessageLog';
import { MessageLogBuilder } from './MessageLogBuilder';

export class LoxiumLogger implements ILogger {
        constructor(private serialiser: LogSerialiser, private _context: string) {

        }

        Error(messageLogBuilder: (b: IBuildLogMessage) => void, method?: string): void {
                this.LogMessage(LogLevel.Error, messageLogBuilder, method);
        }

        Warn(messageLogBuilder: (b: IBuildLogMessage) => void, method?: string): void {
                this.LogMessage(LogLevel.Warn, messageLogBuilder, method);
        }

        Debug(messageLogBuilder: (b: IBuildLogMessage) => void, method?: string): void {
                this.LogMessage(LogLevel.Debug, messageLogBuilder, method);
        }

        Information(messageLogBuilder: (b: IBuildLogMessage) => void, method?: string): void {
                this.LogMessage(LogLevel.Info, messageLogBuilder, method);
        }

        Trace(messageLogBuilder: (b: IBuildLogMessage) => void, method?: string): void {
                this.LogMessage(LogLevel.Trace, messageLogBuilder, method);
        }

        private LogMessage(level: LogLevel, configuration: (b: IBuildLogMessage) => void, method?: string) {
                const messageLogBuilder = new MessageLogBuilder(level, this._context, method);
                configuration(messageLogBuilder);
                const messageLog = messageLogBuilder.build();
                this.Log(messageLog);
        }

        private Log(messageLog: MessageLog) {
                this.serialiser.Write(messageLog);
        }
}
