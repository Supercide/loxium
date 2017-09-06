
export interface IBuildLogMessage {
    withMessage(message:string) : IBuildLogMessage;
    withProperty(property:string, value:string) : IBuildLogMessage;
    withException(error:any) : IBuildLogMessage;
    withTag(tag:string) : IBuildLogMessage;
}
