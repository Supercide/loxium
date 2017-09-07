
import { ILogger } from './ILogger'
import { IBuildLogMessage } from "./IBuildLogMessage";
import { LogLevel } from "./LogLevel";
import { MessageLogBuilder } from "./buildLogMessage";
import { LogMessage } from "./logMessage";

export class LoxiumLogger implements ILogger
{
    constructor(private _logger:any){ }

    error(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        this.LogMessage(LogLevel.error, logMessageBuilder);
    }

    
    Warn(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        this.LogMessage(LogLevel.warning, logMessageBuilder);        
    }
    
    Debug(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        this.LogMessage(LogLevel.debug, logMessageBuilder);        
    }
    
    Information(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        this.LogMessage(LogLevel.information, logMessageBuilder);        
    }
    
    Trace(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        this.LogMessage(LogLevel.trace, logMessageBuilder);        
    }

    private LogMessage(level:LogLevel, configuration:(logMessageBuilder:IBuildLogMessage)=>void) {
        let buildLogMessage = new MessageLogBuilder(level);
        configuration(buildLogMessage);
        this.Log(buildLogMessage, level);
    }

    Log(messageLogBuilder:MessageLogBuilder, level:LogLevel)
    {
        switch(level)
        {
            case LogLevel.error:
            this._logger.error(messageLogBuilder);
            break;
            case LogLevel.warning:
            this._logger.warn(messageLogBuilder);
            break;
            case LogLevel.debug:
            this._logger.debug(messageLogBuilder);
            break;
            case LogLevel.information:
            this._logger.info(messageLogBuilder);
            break;
            case LogLevel.trace:
            this._logger.trace(messageLogBuilder);    
            break;
        }
    }
}
