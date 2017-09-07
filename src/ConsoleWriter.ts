import { IWriteLogMessage } from "./IWriteLogMessage";
import { LogMessage } from "./logMessage";

export class ConsoleWriter implements IWriteLogMessage {

    write(logMessage: LogMessage) {
        var date = new Date();
        var now = date.toLocaleString();

        console.log(`${now} [${logMessage.Level}] ${logMessage.Message}`)   
    }

}