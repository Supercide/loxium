import {IBuildLogMessage} from './IBuildLogMessage'
export interface IEnrichLogs
{    
    enrich(logMessageBuilder:IBuildLogMessage);
}