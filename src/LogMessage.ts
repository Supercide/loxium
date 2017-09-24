import { LogLevel } from './LogLevel';

export class LogMessage {
    level: LogLevel;
    tags: string[];
    error: any;
    properties: any;
    message: string;
    context: string;
    method: string;
    timestamp: Date;

    constructor() {
        this.timestamp = new Date();
    }
}
