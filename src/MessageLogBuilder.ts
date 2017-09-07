import { IBuildLogMessage } from './IBuildLogMessage';
import { KeyValuePair } from './property';
import { LogLevel } from './LogLevel';
import { MessageLog } from './MessageLog';

export class MessageLogBuilder implements IBuildLogMessage {
    private _message: string;
    private _error: any;
    private _properties: KeyValuePair[] = [];
    private _tags: string[] = [];
    constructor(public level: LogLevel, private _context: string, private _method: string) {

    }

    withMessage(message: string): IBuildLogMessage {
        this._message = message;

        return this;
    }

    withProperty(property: string, value: string): IBuildLogMessage {
        this._properties.push(new KeyValuePair(property, value));

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

    build(): MessageLog {
        const logMessage = new MessageLog();
        logMessage.error = this._error;
        logMessage.level = this.level;
        logMessage.message = this._message;

        this._properties.forEach((property: KeyValuePair) => {
            logMessage.addProperty(property.key, property.value);
        });

        logMessage.tags = this._tags;
        logMessage.context = this._context;
        logMessage.method = this._method;

        return logMessage;
    }
}
