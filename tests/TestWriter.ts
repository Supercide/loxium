import { IWriteLogMessage } from '../src/IWriteLogMessage';
import { LogMessage } from '../src/LogMessage';

export class TestWriter implements IWriteLogMessage {

    logMessages: LogMessage[] = [];

    write(logMessage: LogMessage) {
        this.logMessages.push(logMessage);
    }
}