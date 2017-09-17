# loxium

lightweight structured logging for JavaScript. Loxium allows you to do so much more then simply log a message, With Loxium not only can you log messages but you can add tags, Properties and enrich your logs with contextual information. It is also built with maximum extensibility allowing you to control where, when and how your logs are sent through it's clean and simple api. Loxium has been heavily influence by Serilog, a logging package for .Net and my co-workers at Sequensis.


## Features


* Supports standard trace/debug/info/warn/error logging levels 
* Works in all modern browsers & node.js
* Filter logging by level
* No dependencies, 
* Highly extensible allowing you to take logging further

### Example

```
let builder = new loxium.LogBuilder();
    
let logger = builder.setMinimumLevel(loxium.LogLevel.Debug)
                    .build();

logger.debug((logBuilder) => logBuilder.withMessage('hello world'));
```

Which will output: 
- `17/09/2017, 14:40:16 [Debug] hello world`

for more advance examples such as adding properties, tags, contextual information and shipping logs off to a server [see docs]() (todo: add getting started guide)

## Downloading loxium

### Via NPM
`npm install loxium`.

### VIA CDN
(todo: add cdn)

