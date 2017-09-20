---
layout: default
---
# What?

Loxium allows you to do so much more then simply log a message, With Loxium not only can you log messages but you can add tags, Properties and enrich your logs with contextual information. It's also built with maximum extensibility allowing you to control where, when and how your logs are sent through it's clean and simple api. Loxium has been heavily influence by Serilog, a logging package for .Net and my co-workers at Sequensis.

## Features


* Supports standard trace/debug/info/warn/error logging levels 
* Works in all modern browsers & node.js
* Filter logging by level
* No dependencies, 
* Highly extensible allowing you to take logging further

### Example - Browser

```JS
let builder = new loxium.LogBuilder();
    
let logger = builder.setMinimumLevel(loxium.LogLevel.Debug)
                    .build();

logger.debug((logBuilder) => logBuilder.withMessage('hello world'));
```

Output:
- `17/09/2017, 14:40:16 [Debug] hello world`

### Example - Node
```JS
import { LogBuilder, LogLevel } from 'loxium'

let builder = new LogBuilder();

let logger = builder.setMinimumLevel(LogLevel.Debug)
                    .build();

logger.debug((logBuilder) => logBuilder.withMessage('hello world'));
```

Output:
- `17/09/2017, 14:40:16 [Debug] hello world`

## Installation
Node - `npm install loxium`

CDN - `<script src=""></script>`

for more advance examples such as adding properties, tags, contextual information and shipping logs off to a server [see docs](https://github.com/Supercide/loxium/wiki)