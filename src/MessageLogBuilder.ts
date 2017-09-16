import { IBuildLogMessage } from './IBuildLogMessage';
import { LogMessage } from './LogMessage';
import { LogLevel } from './LogLevel';

export class MessageLogBuilder implements IBuildLogMessage {
    private _message: string;
    private _error: any;
    private _properties: any = {};
    private _tags: any = {};
    constructor(public level: LogLevel, private _context: string, private _method: string) {

    }

    withMessage(message: string): IBuildLogMessage {
        this._message = message;

        return this;
    }

    withProperty(property: string, value: any): IBuildLogMessage {
        this._properties[property] = value;

        return this;
    }

    withException(error: any): IBuildLogMessage {
        this._error = error;

        return this;
    }

    withTag(tag: string): IBuildLogMessage {
        this._tags[tag] = tag;

        return this;
    }

    build(): LogMessage {
        let logMessage = new LogMessage();
        logMessage.error = this._error;
        logMessage.level = this.level;
        logMessage.message = this._message;
        logMessage.properties = this._properties;
        logMessage.tags = Object.keys(this._tags);
        logMessage.context = this._context;
        logMessage.method = this._method;

        return logMessage;
    }
}