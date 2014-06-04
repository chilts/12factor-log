# 12factor-log #

A log module which only outputs to stdout. For Node.js that means using `console.log()`.

This logger does not do hierarchical logging. It does not log to files, it doesn't log to external services. You should
do that yourself.

However, this logger does log in JSON so you can log whatever you want in a structured way, and filter and format your
logs yourself at a later date.

## Synopsis ##

```js
var log = require('12factor-log')({ name : 'example' })

log.info('Hello, World!')
log.info({ 'an': 'object' }, 'Some Data')
```

This outputs:

```
{"ts":"2014-06-04T00:40:35.842Z","msg":"Hello, World!","name":"example","type":"info","level":3,"hostname":"tiger","pid":12942}
{"ts":"2014-06-04T00:40:35.844Z","msg":"Some Data","name":"example","type":"info","level":3,"hostname":"tiger","pid":12942,"data":{"an":"object"}}
```

## API ##

Firstly, create your logger object:

```
var Log = require('12factor-log')

// a regular logger at level 'info' and above
var logger = new Log({ name : 'mylog' })

// a logger at level 'debug'
var logger = new Log({ name : 'mylog', level : Log.debug })

// a logger which logs all levels
var logger = new Log({ name : 'an-all-logger', level : Log.all })

// a logger which logs nothing at all
var logger = new Log({ name : 'no-log', level : Log.none })
```

Once you have your logger, you can log at any level:

```
log.trace('This is a Trace Message')
log.debug('This is a Debug Message')
log.info('This is an Info Message')
log.warn('This is a Warn Message')
log.error('This is an Error Message')
log.fatal('This is a Fatal Message')
```

And you can log with a data object (which must come first):

```
log.trace({ a : 1 }, 'Trace')
log.debug({ a : 1 }, 'Debug')
log.info({ a : 1 }, 'Info')
log.warn({ a : 1 }, 'Warn')
log.error({ a : 1 }, 'Error')
log.fatal({ a : 1 }, 'Fatal')
```

## Fields ##

```
+----------+----------------------------+--------------------------------------+
| Field    | Description                | From                                 |
+----------+----------------------------+--------------------------------------+
| hostname | hostname of this machine   | generated at startup                 |
| pid      | process id of this process | generated at startup                 |
| name     | the name of this logger    | provided at logger instance creation |
| type     | message type (see below)   | set for each log line                |
| level    | numeric level (1-6)        | set for each log line                |
| ts       | the timestamp              | generated each log line              |
| msg      | the message iteself        | provided for each log line           |
| data     | any data to log            | for each log line (if provided)      |
+----------+----------------------------+--------------------------------------+
```

## Log Levels ##

```
+-------+-------+
| Type  | Level |
+-------+-------+
| trace |   1   |
| debug |   2   |
| info  |   3   |
| warn  |   4   |
| error |   5   |
| fatal |   6   |
+-------+-------+
```

Note: In each log line both `type` and `level` are output and always correspond to each other.

## Author ##

Written by [Andrew Chilton](http://chilts.org/) - [Blog](http://chilts.org/) -
[Twitter](https://twitter.com/andychilton).

## License ##

MIT - http://chilts.mit-license.org/2014/

(Ends)
