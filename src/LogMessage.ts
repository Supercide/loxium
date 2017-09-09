import { LogLevel } from './LogLevel';
import { KeyValuePair } from './property';

export class LogMessage {
    level: LogLevel;
    tags: string[];
    error: any;
    properties: any;
    message: string;
    context: string;
    method: string;

    constructor() {
        this.tags = [];
        this.properties = [];
    }

    addTags(tag: string): void {
        this.tags.push(tag);
    }

    addProperty(property: string, value: any) {
        this.properties[property] = value;
    }
}
