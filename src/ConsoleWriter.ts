import { LogLevel } from './LogLevel';
import { LogMessage } from './LogMessage';
import { WriteLogMessage } from './WriteLogMessage';

export class ConsoleWriter implements WriteLogMessage {
    write(logMessage: LogMessage) {
        const now = new Date();
        console.log(`${now.toLocaleString()} [${LogLevel[logMessage.level]}] ${logMessage.message}`);
    }
}
