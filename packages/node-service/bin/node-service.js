#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program.name('node-service').version(process.env.npm_package_version);

program.command(`start`).action(function (env, options) {
  require('../cjs/index.js');
});

program.parse(process.argv);
