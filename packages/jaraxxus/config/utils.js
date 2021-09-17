const fs = require('fs')
const path = require('path')
const net = require('net')

function isBoolean(val) {
  return Object.prototype.toString.call(val) === '[object Boolean]'
}

function isUndefined(val) {
  return Object.prototype.toString.call(val) === '[object Undefined]';
}

function isString(val) {
  return Object.prototype.toString.call(val) === '[object String]';
}

function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

function mergeBooleanVal(defaultVal, newVal) {
  return isBoolean(newVal) ? newVal : !!newVal ? !!newVal : defaultVal
}

const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

function portInUse(port) {
  return new Promise((resolve, reject) => {
    let server = net.createServer().listen(port, '0.0.0.0');
    server.on('listening', function () {
      server.close();
      resolve(port);
    });
    server.on('error', function (err) {
      if (err.code == 'EADDRINUSE') {
        reject(err);
      }
    });
  });
}

module.exports = {
  appDirectory,

  resolveApp,

  isBoolean,
  isUndefined,
  isString,
  isArray,
  isObject,

  mergeBooleanVal,

  portInUse,

  isDevMode: process.env.NODE_ENV !== 'production',
}
