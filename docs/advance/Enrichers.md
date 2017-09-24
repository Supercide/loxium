---
layout: default
---
[Home](http://www.loxiumjs.com) > Advance > Enrichers

# Enrichers
[![example](../assets/imgs/codepen.io-Example.svg)](https://codepen.io/supercide/pen/aLBoWx)

## What are they?

Enrichers provide a way of adding extra information to all of your logs. You may want to use enrichers to add contextual information such as the page the user was on when a log was created or add the user agent they were using. When used the logger would produce output containing this information automatically similar to this
  
```json
{
    'level': 2,
    'message': 'User created ticket',
    'properties': {
        'ticket_id': 1234567,
        'location': 'https://localhost/foo/bar',
        'user_agent': 'Mozilla/5.0 Chrome/60.0.3112.113 Safari/537.36'
    },
    'tags': []
}
```

Where `location` and `user_agent` were added to the log automatically

## Limits

### Performance 
The number of enrichers you can use is limitless, chained methods will append registered enrichers. There is no limit on the amount of enrichers you can use, but it will have an impact on performance as it's another thing running in the logging pipeline.

### Scope
Enrichers only have the ability to enrich properties and tags. If a property already exists in the logMessage when adding the same property from an enricher, the property that already exists in the logMessage will take priority. Tags are simpler, they are an array of unique strings. If duplicates are inserted they will be removed automatically.

## Getting Started 

### How to create and use your own enricher

Enrichers are pretty simple, they have one method called enrich which takes a `LogMessage`. Enrichers only have the ability to add properties and tags, if they change any other information on the LogMessage it will be ignored.

> There is no limit to how many enrichers you can use but be sure to keep it simple as too many enrichers will start to impact performance.

### Example
Define your enricher. This enricher will take the users current user agent and add it in a property field called `user_agent`

```js
const userAgentEnricher = {
    enrich: function(logMessage) {
        logMessage.properties['user_agent'] = navigator.userAgent
    }
}
```

Register your enricher when creating the logger. 

> For this example, we will also create a console logger to log out the full log message as the default console logger only logs out the text message. 

```js
let builder = new loxium.LogBuilder();

let consoleWriter = {
    write: function(logMessage) {
        console.log(JSON.stringify(logMessage, null, 4))
    }
}
    
let logger = builder.setMinimumLevel(loxium.LogLevel.Debug)
                    .enrichWith(userAgentEnricher)
                    .writeTo(consoleWriter)
                    .build();
```

Log something

```js
logger.debug((logBuilder) => logBuilder.withMessage('hello world'));
```

Output
```json
{
    'level': 1,
    'message': 'hello world',
    'properties': {
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
    },
    'tags': []
}
```

It's as simple as that.

[Home](http://www.loxiumjs.com) > Advance > Enrichers