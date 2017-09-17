import { LogMessage } from './LogMessage';

export abstract class WriteLogMessage {
    abstract write(logMessage: LogMessage);
}