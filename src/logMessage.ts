import { Property } from './property'

export class LogMessage {
        Level: string;
        Tags:string[];
        Error:any;
        Properties:Property[];
        Message:string;
        
        constructor()
        {
            this.Tags = [];
            this.Properties =[];
        }

        addTags(tag:string):void
        {
            this.Tags.push(tag);
        }

        addProperties(property:Property)
        {
            this.Properties.push(property);
        }
}
