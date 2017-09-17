import { BuildLogMessage } from './BuildLogMessage';
import { LogLevel } from './LogLevel';
import { LogMessage } from './LogMessage';

export class MessageLogBuilder implements BuildLogMessage {
    private _message: string;
    private _error: any;
    private _properties: any = {};
    private _tags: any = {};
    constructor(public level: LogLevel, private _context: string, private _method: string) {

    }

    withMessage(message: string): BuildLogMessage {
        this._message = message;

        return this;
    }

    withProperty(property: string, value: any): BuildLogMessage {
        this._properties[property] = value;

        return this;
    }

    withException(error: any): BuildLogMessage {
        this._error = error;

        return this;
    }

    withTag(tag: string): BuildLogMessage {
        this._tags[tag] = tag;

        return this;
    }

    build(): LogMessage {
        const logMessage = new LogMessage();
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
