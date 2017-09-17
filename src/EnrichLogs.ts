import { LogMessage } from './LogMessage';

export abstract class EnrichLogs {
    abstract enrichProperties(): {};
    abstract enrichTags(): string[];
}
