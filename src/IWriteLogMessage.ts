import { MessageLog } from './MessageLog';

export interface IWriteLogMessage {
    write(logMessage: MessageLog);
}
