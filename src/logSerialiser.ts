import { IBuildLogMessage } from './IBuildLogMessage'
import {IEnrichLogs} from './IEnrichLogs'
import {IWriteLogMessage} from './IWriteLogMessage'
import { MessageLogBuilder } from "./buildLogMessage";

export function CreateSerialiser(enrichers:IEnrichLogs[], writers:IWriteLogMessage[]){
    return (logType, logLevel, loggerName) => {
        return (messageLogBuilder:MessageLogBuilder) => {
            let messageLog = messageLogBuilder.build();
            if(writers){
                writers.forEach((writer:IWriteLogMessage) => {
                    writer.write(messageLog)
                })
            }
        };
    }
}
