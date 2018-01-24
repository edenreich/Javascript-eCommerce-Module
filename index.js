#!bin/usr/env node

var full = require('./demo/js/node-module.js');
var minified = require('./demo/js/node-module.min.js');

module.exports = { minified, full };