
export interface IBuildLogMessage {
    withException(error: any): IBuildLogMessage;
    withMessage(message: string): IBuildLogMessage;
    withProperty(property: string, value: string): IBuildLogMessage;
    withTag(tag: string): IBuildLogMessage;
}
