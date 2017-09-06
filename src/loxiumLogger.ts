
import { ILogger } from './logger.interface'
import { IBuildLogMessage } from './buildLogMessage.interface'
import { BuildLogMessage } from './buildLogMessage'
import { LogMessage } from './logMessage'
import * as logger from 'loglevel'
export enum LogLevel {
    trace = 'trace',
    debug = 'debug', 
    information = 'info',
    warning = 'warn',
    error = 'error'

}

export class LoggerFactory {

    createLogger(name:string, logLevel:LogLevel) : ILogger {
        let log = logger.getLogger(name);
        log.setLevel(logLevel);
        var originalFactory = log.methodFactory;

        log.methodFactory = function (methodName, logLevel, loggerName) {
            var rawMethod = originalFactory(methodName, logLevel, loggerName);
         
            return function (message) {
                rawMethod(JSON.stringify(message));
            };
        };

        return new LoxiumLogger(log);
    }
}


export class LoxiumLogger implements ILogger
{
    constructor(private _logger:any){
        
    }

    error(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        let buildLogMessage = new BuildLogMessage('error');
        
        logMessageBuilder(buildLogMessage);

        this.LogBuildLogMessage(buildLogMessage);
    }

    Warn(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        let buildLogMessage = new BuildLogMessage('warn');
        logMessageBuilder(buildLogMessage);
        this.LogBuildLogMessage(buildLogMessage);
    }

    Debug(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        let buildLogMessage = new BuildLogMessage('debug');
        logMessageBuilder(buildLogMessage);
        this.LogBuildLogMessage(buildLogMessage);
    }

    Information(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        let buildLogMessage = new BuildLogMessage('info');
        logMessageBuilder(buildLogMessage);
        this.LogBuildLogMessage(buildLogMessage);
    }

    Verbose(logMessageBuilder: (b: IBuildLogMessage) => void): void {
        let buildLogMessage = new BuildLogMessage('verbose');
        logMessageBuilder(buildLogMessage);
        this.LogBuildLogMessage(buildLogMessage);
    }
    
    LogBuildLogMessage(buildLogMessage:BuildLogMessage){
        let logMessage = buildLogMessage.build();
        
        this.LogMessage(logMessage);
    }

    LogMessage(logMessage:LogMessage)
    {
        switch(logMessage.Level)
        {
            case 'error':
                this._logger.error(logMessage);
            break;
            case 'warn':
                this._logger.warn(logMessage);
            break;
            case 'debug':
                this._logger.debug(logMessage);
            break;
            case 'information':
                this._logger.info(logMessage);
            break;
            case 'verbose':
                this._logger.verbose(logMessage);    
            break;
        }
    }
}
