export class LogBuilder {

    writeTo(logMessageWriter: WriteLogMessage): LogBuilder; 

    enrichWith(logEnricher: EnrichLogs): LogBuilder;

    setMinimumLevel(logLevel: LogLevel): LogBuilder;

    setContext(context: string): LogBuilder;

    build(): Logger;
}

export abstract class BuildLogMessage {
    abstract withMessage(message: string): BuildLogMessage;
    abstract withProperty(property: string, value: any): BuildLogMessage;
    abstract withException(error: any): BuildLogMessage;
    abstract withTag(tag: string): BuildLogMessage;
}

export abstract class EnrichLogs {
    abstract enrichProperties(): {};
    abstract enrichTags(): string[];
}

export abstract class Logger {
    abstract error(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
    abstract warn(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
    abstract debug(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
    abstract information(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
    abstract trace(logMessageBuilder: (b: BuildLogMessage) => void, method?: string): void;
}

export class LogMessage {
    constructor();
    addProperty(property: string, value: any): void;
    addTags(tag: string): void;
}

export class LogSerialiser {
    constructor(_enrichers: EnrichLogs[], _writers: WriteLogMessage[], _logLevel: LogLevel);

    Write(logMessage: LogMessage);

    private ProcessEnrichers(logMessage: LogMessage): void;

    private ProcessLogWriters(logMessage: LogMessage);
}

export class LoxiumLogger implements Logger {
    constructor(serialiser: LogSerialiser, _context: string);

    error(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void;

    warn(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void;

    debug(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void;

    information(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void;

    trace(messageLogBuilder: (b: BuildLogMessage) => void, method?: string): void;
}

export class MessageLogBuilder implements BuildLogMessage {

    constructor(level: LogLevel, _context: string, _method: string);

    withMessage(message: string): BuildLogMessage;

    withProperty(property: string, value: any): BuildLogMessage;

    withException(error: any): BuildLogMessage;

    withTag(tag: string): BuildLogMessage;

    build(): LogMessage;
}

export abstract class WriteLogMessage {
    abstract write(logMessage: LogMessage);
}

export enum LogLevel {
    Trace,
    Debug,
    Info,
    Warn,
    Error
}
