#!/usr/bin/env node

import setup from './setup';
import verify from './commands/verify';
import update from './commands/update';
import restore from './commands/restore';
import list from './commands/list';

const args = process.argv.slice(2);
const command = args[0];
const subCommand = args[1];

function showHelp(): void {
  console.log(`
ai-crowl-shield - Block AI crawlers from your web projects

Usage:
  npx ai-crowl-shield <command> [options]

Commands:
  setup       Set up robots.txt to block AI crawlers
  verify      Check robots.txt configuration status
  update      Update robots.txt with latest bot list
  restore     Restore robots.txt from backup
  list        List all available AI crawlers to block
  help        Show this help message
  version     Show version

Examples:
  npx ai-crowl-shield setup          # Initial setup
  npx ai-crowl-shield verify         # Check current status
  npx ai-crowl-shield update         # Update to latest bot list
  npx ai-crowl-shield restore        # Restore from backup
  npx ai-crowl-shield list           # Show all available bots

Configuration:
  Create ai-shield.config.js in your project root to customize:

  module.exports = {
    bots: {
      block: ['GPTBot', 'CCBot', 'anthropic-ai'],  // Bots to block
      allow: ['PerplexityBot']                      // Exceptions
    },
    sitemap: 'https://example.com/sitemap.xml',     // Add sitemap
    customRules: [                                   // Custom rules
      {
        userAgent: 'MyBot',
        rules: ['Disallow: /admin']
      }
    ]
  };

Documentation:
  https://github.com/anthropics/ai-crowl-shield
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
  case 'verify':
    verify();
    break;
  case 'update':
    update();
    break;
  case 'restore':
    restore();
    break;
  case 'list':
    list();
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
