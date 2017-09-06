import {IBuildLogMessage} from './buildLogMessage.interface'
import {LogMessage} from './logMessage'
import {Property} from './property'

export class BuildLogMessage implements IBuildLogMessage
{
    private _message:string;
    private _error:any;
    private _properties:Property[];
    private _tags:string[];
    constructor(private _level:string){}

    withMessage(message: string): IBuildLogMessage {
        this._message = message;

        return this;
    }

    withProperty(property: string, value: string): IBuildLogMessage {
        this._properties.push(new Property(property, value))

        return this;
    }

    withException(error: any): IBuildLogMessage {
        this._error = error;

        return this;
    }

    withTag(tag: string): IBuildLogMessage {
        this._tags.push(tag);
        
        return this;
    }

    build() : LogMessage{
        let logMessage = new LogMessage();
        logMessage.Error = this._error;
        logMessage.Level = this._level;
        logMessage.Message = this._message;
        logMessage.Properties = this._properties;
        logMessage.Tags = this._tags;

        return logMessage;
    }

}