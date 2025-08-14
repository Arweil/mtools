#!/usr/bin/env node

import { Command } from 'commander';
import { build, start } from '../scripts';

const program = new Command();

program
  .name('jaraxxus')
  .description('A modern web development tool')
  .version(process.env.npm_package_version || '');

program
  .command('start')
  .description('Start development server')
  .action(async () => {
    try {
      await start();
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('build')
  .description('Build for production')
  .action(async () => {
    try {
      await build();
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
