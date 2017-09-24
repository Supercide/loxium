# Getting started
## installation
in you are using npm you can do `npm install loxium`. If it is a web project you can add a script reference to `https://cdn.jsdelivr.net/npm/loxium@latest/dist/loxium.min.js`.
once this is done usage is simple.

ES6 style imports
```JS
import { LogBuilder } from 'loxium';
```

Using require
```JS
const LogBuilder = require('loxium').LogBuilder;
```

In the browser
```JS
const LogBuilder = loxium.LogBuilder;
```
## Usage
Creation of the logger is simple and can be broken down into X main steps

1 - First Create the logger builder. This provides us a fluent easy to use syntax to create the logger
```JS
const logBuilder = new loxium.LogBuilder();
```

2 - Define what you want the logger to be built with. There are only a few options in this stage to keep things simple, it mainly boils down to where do you want the logs to be written/sent, What level are you interested in and what additional information do you want your logs to contain.

>If you dont specify a writer then the default console writer will be used

```JS
let logger = logBuilder.setMinimumLevel(loxium.LogLevel.Debug)
                       .enrichWith(sampleEnricher /*Adds additional contextual information to all logs*/)
                       .writeTo(sampleWriter /*Specifies how to handle log messages*/)
                       .build();
```
3 - Finally use the logger to log something

```JS
logger.debug((logBuilder) => logBuilder.withMessage('hello world'));
```

## Structured logging
Typically, you will see log message output looking similar to this `"24/09/2017, 15:24:00 [Debug] hello world"` which is fine and easily understood by humans but what about when you want to build a fancy dashboard from these logs? The answer typically comes in the form of some sort of ReGex query to pull out the relevant information which can get pretty complex especially with complicated logs. Structured logging brakes this information down into individual fields which are easily digestible by machine's but still keeps the log in a human-readable format. Logs are defined by the `LogMessage` class which has the following properties:

```JS
class LogMessage {
    level: LogLevel;
    tags: string[];
    error: any;
    properties: {};
    message: string;
    context: string;
    method: string;
    timestamp: Date;
}
```

Population of these properties is done through the logger

```JS
// Adds a message to the log
// this maps to LogMessage.message 
logger.debug((logBuilder) => logBuilder.withMessage('hello world'));

// Adds a property to the log
// this maps to LogMessage.properties
// the value of the property can be anything
// it is left to you to determine how to serialize it 
logger.debug((logBuilder) => logBuilder.withProperty('some_property', 'any value'));

// Adds a tag to the log
// this maps to LogMessage.tags
// tags are unique so you should never 
// receive duplicate tags in enrichers or writers
logger.debug((logBuilder) => logBuilder.withTag('some tag'));

// All methods use fluent syntax 
// so you could chain all the methods together
logger.debug((logBuilder) => logBuilder.withMessage('hello world')
                                       .withProperty('some_property', 'any value')
                                       .withTag('some tag'));
```
## errors
## output
## context
## methods