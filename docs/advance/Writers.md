---
layout: default
---
[Home](http://www.loxiumjs.com) > [Getting Started](http://www.loxiumjs.com/GettingStarted) > Advance > Writers

# Writers
[![example](../assets/imgs/codepen.io-Example.svg)](https://codepen.io/supercide/pen/aLBoWx)

## What are they?

Writers determine how a log is serialized and where is it sent to, be it a console window, written to file or sent to a server for processing. The choice is yours however if you don't supply a writer then the default console writer will be use. This writer outputs a simple message to the console window.

## Limits

### Performance 
The number of writers you can use is limitless, chained methods will append to the existing registered writers. However excessive writers will have an impact on performance as it's another thing running in the logging pipeline.

### Scope
Modifications done inside of a writer do not persist outside of the writer.

## Getting Started 

### How to create and use your own writer

Writers are pretty simple, they have one method called `write` which takes a `LogMessage`, what you do with this is up to you.

### Example creating a writer
Define your writer. For this example we will 

[Home](http://www.loxiumjs.com) > [Getting Started](http://www.loxiumjs.com/GettingStarted) > Advance > Writers