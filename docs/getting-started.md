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

## tags
## properties
## messages
## errors
## output
## context
## methods