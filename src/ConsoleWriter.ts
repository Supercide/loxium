import { WriteLogMessage } from './WriteLogMessage';
import { LogMessage } from './LogMessage';
import { LogLevel } from './LogLevel';

export class ConsoleWriter implements WriteLogMessage {
    write(logMessage: LogMessage) {
        let now = new Date();
        console.log(`${now.toLocaleString()} [${LogLevel[logMessage.level]}] ${logMessage.message}`);
    }
}