import { IBuildLogMessage } from './IBuildLogMessage';

export interface ILogger {
    error(logMessageBuilder: (b: IBuildLogMessage) => void, method: string): void;
    warn(logMessageBuilder: (b: IBuildLogMessage) => void, method: string): void;
    debug(logMessageBuilder: (b: IBuildLogMessage) => void, method: string): void;
    information(logMessageBuilder: (b: IBuildLogMessage) => void, method: string): void;
    trace(logMessageBuilder: (b: IBuildLogMessage) => void, method: string): void;
}