import { LogMessage } from '../src/LogMessage';
import { WriteLogMessage } from '../src/WriteLogMessage';

export class TestWriter implements WriteLogMessage {

    logMessages: LogMessage[] = [];

    write(logMessage: LogMessage) {
        this.logMessages.push(logMessage);
    }
}