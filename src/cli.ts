#!/usr/bin/env node

import setup from './setup';

const args = process.argv.slice(2);
const command = args[0];

function showHelp(): void {
  console.log(`
ai-crowl-shield - Block AI crawlers from your Next.js site

Usage:
  npx ai-crowl-shield setup    Set up robots.txt to block AI crawlers
  npx ai-crowl-shield help     Show this help message
  npx ai-crowl-shield version  Show version

Examples:
  npx ai-crowl-shield setup
`);
}

function showVersion(): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require('../package.json');
  console.log(`ai-crowl-shield v${pkg.version}`);
}

switch (command) {
  case 'setup':
    setup();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  case 'version':
  case '--version':
  case '-v':
    showVersion();
    break;
  default:
    if (!command) {
      console.log('Please specify a command. Run "npx ai-crowl-shield help" for usage.');
    } else {
      console.log(`Unknown command: ${command}`);
      showHelp();
    }
    process.exit(1);
}
