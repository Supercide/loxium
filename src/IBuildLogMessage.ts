export interface IBuildLogMessage {
    withMessage(message: string): IBuildLogMessage;
    withProperty(property: string, value: any): IBuildLogMessage;
    withException(error: any): IBuildLogMessage;
    withTag(tag: string): IBuildLogMessage;
}