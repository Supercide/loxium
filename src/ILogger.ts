import { IBuildLogMessage } from './IBuildLogMessage';

export interface ILogger {
    Error(logMessageBuilder: (b: IBuildLogMessage) => void, method?: string): void;
    Warn(logMessageBuilder: (b: IBuildLogMessage) => void, method?: string): void;
    Debug(logMessageBuilder: (b: IBuildLogMessage) => void, method?: string): void;
    Information(logMessageBuilder: (b: IBuildLogMessage) => void, method?: string): void;
    Trace(logMessageBuilder: (b: IBuildLogMessage) => void, method?: string): void;
}
