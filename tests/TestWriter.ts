import { IWriteLogMessage } from '../src/IWriteLogMessage';
import { MessageLog } from '../src/MessageLog';

export class TestWriter implements IWriteLogMessage {

    logMessages: MessageLog[] = [];

    write(logMessage: MessageLog) {
        this.logMessages.push(logMessage);
    }
}
