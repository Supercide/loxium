import { LogMessage } from './LogMessage';

export interface IEnrichLogs {
    enrichProperties(): {};
    enrichTags(): string[];
}