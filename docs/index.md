---
layout: default
---
# Loxium

## Contents
- [Getting Started](./getting-started)
  - [Installation](./getting-started#installation)
  - [Usage](./getting-started#usage)
  - [Structured logging](./getting-started#structured-logging)
  - [Log Levels](./getting-started#log-levels)
- Advance
  - [Enrichers](./advance/Enrichers)
  - [Writers](./advance/Writers)

# What?

Loxium allows you to do so much more than simply log a message, With Loxium not only can you log messages but you can add tags, Properties and enrich your logs with contextual information. It's also built with maximum extensibility allowing you to control where, when and how your logs are sent through it's clean and simple API. Loxium has been heavily influenced by [Serilog](https://serilog.net/), a logging package for .Net and my co-workers at [Sequensis](http://www.sequensis.co.uk)

## Features

* Supports standard trace/debug/info/warn/error logging levels 
* Works in all modern browsers & node.js
* Filter logging by level
* No dependencies, 
* Highly extensible allowing you to take logging further

### Example - Browser

```js
let builder = new loxium.LogBuilder();
    
let logger = builder.setMinimumLevel(loxium.LogLevel.Debug)
                    .build();

logger.debug((logBuilder) => logBuilder.withMessage('hello world'));
```

Output:
- `17/09/2017, 14:40:16 [Debug] hello world`

### Example - Node
```js
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

CDN - `<script src="https://cdn.jsdelivr.net/npm/loxium@latest/dist/loxium.min.js"></script>`