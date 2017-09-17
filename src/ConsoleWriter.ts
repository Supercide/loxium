import { IWriteLogMessage } from './IWriteLogMessage';
import { LogMessage } from './LogMessage';
import { LogLevel } from './LogLevel';

export class ConsoleWriter implements IWriteLogMessage {
    write(logMessage: LogMessage) {
        let now = new Date();
        console.log(`${now.toLocaleString()} [${LogLevel[logMessage.level]}] ${logMessage.message}`);
    }
}