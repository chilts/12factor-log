// ----------------------------------------------------------------------------
//
// 12factor-log - Simple log infrastructure..
//
// Copyright (c) 2014 Andrew Chilton <andychilton@gmail.com> - http://chilts.org/
//
// License: http://opensource.org/licenses/MIT
//
// ----------------------------------------------------------------------------

// core
var os = require('os')

// ----------------------------------------------------------------------------
// consts

var pid = process.pid
var hostname = os.hostname()

var levelInfo = {
  all   : 0,
  trace : 1,
  debug : 2,
  info  : 3,
  warn  : 4,
  error : 5,
  fatal : 6,
  none  : 7,
}
var levelNames = [
  'all',
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
  'none',
]

// ----------------------------------------------------------------------------

module.exports = function createLog(opts) {
  return new Logger(opts)
}

function Logger(opts) {
  if (!opts.name) {
    throw new Error('12factor-log: You must provide a name')
  }
  if ( opts.level === 0 ) {
    // just clarify 0, this is ok, will log them 'all'
    opts.level = 0
  }
  else {
    opts.level = opts.level || levelInfo.info
  }
  if ( opts.level < levelInfo.all && opts.level > levelInfo.none ) {
    throw new Error('12factor-log: Unknown log level')
  }

  this.name = opts.name
  this.level = opts.level

  return this
}

Logger.prototype.log = function log(level, data, msg) {
  // don't log unless the level goes down this far
  if (level < this.level) return

  // set msg properly if no data given
  if ( typeof msg === 'undefined' ) {
    msg = data
    data = undefined
  }

  var ts = (new Date()).toISOString()
  var info = {
    ts       : ts,
    msg      : msg,
    name     : this.name,
    type     : levelNames[level],
    level    : level,
    hostname : hostname,
    pid      : pid,
  }
  if (data) {
    info.data = data
  }

  console.log(JSON.stringify(info))
}

Logger.prototype.trace = function(data, msg) { this.log(levelInfo.trace, data, msg) }
Logger.prototype.debug = function(data, msg) { this.log(levelInfo.debug, data, msg) }
Logger.prototype.info  = function(data, msg) { this.log(levelInfo.info,  data, msg) }
Logger.prototype.warn  = function(data, msg) { this.log(levelInfo.warn,  data, msg) }
Logger.prototype.error = function(data, msg) { this.log(levelInfo.error, data, msg) }
Logger.prototype.fatal = function(data, msg) { this.log(levelInfo.fatal, data, msg) }

module.exports = Logger
module.exports.all   = levelInfo.all
module.exports.trace = levelInfo.trace
module.exports.debug = levelInfo.debug
module.exports.info  = levelInfo.info
module.exports.warn  = levelInfo.warn
module.exports.error = levelInfo.error
module.exports.fatal = levelInfo.fatal
module.exports.none  = levelInfo.none

// ----------------------------------------------------------------------------
