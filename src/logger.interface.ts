import {IBuildLogMessage} from './buildLogMessage.interface'

export interface ILogger{
    error(logMessageBuilder: (b:IBuildLogMessage) => void) : void;
    Warn(logMessageBuilder: (b:IBuildLogMessage) => void) : void;
    Debug(logMessageBuilder: (b:IBuildLogMessage) => void) : void;
    Information(logMessageBuilder: (b:IBuildLogMessage) => void) : void;
    Verbose(logMessageBuilder: (b:IBuildLogMessage) => void) : void;
}