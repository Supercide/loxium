[Home](http://www.loxiumjs.com) > Getting Started

# Getting started

## Contents
- [Installation](#installation)
- [Usage](#usage)
- [Structured logging](#structured-logging)
- [Log Levels](#log-levels)

## Installation
If you are using npm you can use `npm install loxium`. If you are in a web project you can add a script reference to `https://cdn.jsdelivr.net/npm/loxium@latest/dist/loxium.min.js`.
once this is done usage is simple.

ES6 style imports
```js
import { LogBuilder } from 'loxium';
```

Using require
```js
const LogBuilder = require('loxium').LogBuilder;
```

In the browser
```js
const LogBuilder = loxium.LogBuilder;
```
## Usage
Creation of the logger is simple and can be broken down into X main steps

1 - First Create the logger builder. This provides us a fluent easy to use syntax to create the logger
```js
const logBuilder = new loxium.LogBuilder();
```

2 - Define what you want the logger to be built with. There are only a few options in this stage to keep things simple, it mainly boils down to the name of the logger, where do you want the logs to be written/sent, What level are you interested in and what additional information do you want your logs to contain.

>If you dont specify a writer then the default console writer will be used

```js
let logger = logBuilder.setName('my logger')
                       .setMinimumLevel(loxium.LogLevel.Debug)
                       .enrichWith(sampleEnricher /*Adds additional contextual information to all logs*/)
                       .writeTo(sampleWriter /*Specifies how to handle log messages*/)
                       .build();
```
3 - Finally use the logger to log something

```js
logger.debug((logBuilder) => logBuilder.withMessage('hello world'));
```

## Structured logging
Typically, you will see log message output looking similar to this `"24/09/2017, 15:24:00 [Debug] hello world"` which is fine and easily understood by humans but what about when you want to build a fancy dashboard from these logs? The answer typically comes in the form of some sort of ReGex query to pull out the relevant information which can get pretty complex especially with complicated logs. Structured logging brakes this information down into individual fields which are easily digestible by machine's but still keeps the log in a human-readable format. Logs are defined by the `LogMessage` class which has the following properties:

```js
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

```js
// Adds a message to the log
// This maps to LogMessage.message 
// Only one message is allowed per log otherwise the last message will overwrite the previous
logger.debug((logBuilder) => logBuilder.withMessage('hello world'));

// Adds the method to the log
// This maps to LogMessage.Method
// Only one method is allowed per log otherwise the last method will overwrite the previous
logger.debug((logBuilder) => {}, 'someMethod');

// Adds a property to the log
// This maps to LogMessage.properties
// The value of the property can be anything
// It is left to you to determine how to serialize it 
logger.debug((logBuilder) => logBuilder.withProperty('some_property', 'any value'));

// Adds a tag to the log
// This maps to LogMessage.tags
// Tags are unique so you should never receive duplicate tags in enrichers or writers
logger.debug((logBuilder) => logBuilder.withTag('some tag'));

// Adds an error to the log
// this is mapped to LogMessage.error
// Only one error is allowed per log otherwise the last error will overwrite the previous
logger.debug((logBuilder) => logBuilder.withException(new Error('uh oh')));

// All methods use fluent syntax so you can chain all the methods together
logger.debug((logBuilder) => logBuilder.withMessage('hello world')
                                       .withProperty('some_property', 'any value')
                                       .withTag('some tag'));
```

> It's recommended that you use a package like [Tracekit](https://github.com/csnover/TraceKit) to standardize errors across different environments

## Log levels
These are the different logging level you can filter at. The minimum logging level is set during construction of the logger and cannot be changed after it has been set.

```
Trace,
Debug,
Info,
Warn,
Error,
Silent
```

[Home](http://www.loxiumjs.com) > Getting Started