import { BuildLogMessage } from './BuildLogMessage';

export abstract class Logger {
    abstract error(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
    abstract warn(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
    abstract debug(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
    abstract information(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
    abstract trace(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
}
