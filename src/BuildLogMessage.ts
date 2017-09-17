export abstract class BuildLogMessage {
    abstract withMessage(message: string): BuildLogMessage;
    abstract withProperty(property: string, value: any): BuildLogMessage;
    abstract withException(error: any): BuildLogMessage;
    abstract withTag(tag: string): BuildLogMessage;
}