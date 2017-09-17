import { WriteLogMessage } from '../src/WriteLogMessage';
import { LogMessage } from '../src/LogMessage';

export class TestWriter implements WriteLogMessage {

    logMessages: LogMessage[] = [];

    write(logMessage: LogMessage) {
        this.logMessages.push(logMessage);
    }
}