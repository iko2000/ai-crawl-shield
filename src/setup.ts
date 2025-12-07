import * as fs from 'fs';
import * as path from 'path';
import { loadConfig } from './config';
import { generateRobotsTxt, getPublicDir, detectFramework, formatBotList, getBotsToBlock } from './utils';

function setup(): void {
  try {
    const rootDir = process.cwd();
    console.log(`🔍 Checking project at: ${rootDir}\n`);

    // Load configuration
    const config = loadConfig();

    // Detect framework
    const framework = config.framework === 'auto' ? detectFramework() : config.framework;

    if (!framework) {
      console.warn('⚠️  Could not detect project framework.');
      console.log('💡 Creating robots.txt in ./public directory anyway...\n');
    } else {
      console.log(`✓ Detected framework: ${framework}\n`);
    }

    const publicDir = getPublicDir(config);

    if (!fs.existsSync(publicDir)) {
      console.log('📁 Creating public directory...');
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const robotsPath = path.join(publicDir, 'robots.txt');

    // Backup existing robots.txt
    if (fs.existsSync(robotsPath)) {
      const backupPath = path.join(publicDir, 'robots.txt.backup');
      fs.copyFileSync(robotsPath, backupPath);
      console.log('📦 Backed up existing robots.txt');
    }

    // Generate and write robots.txt
    const robotsTxt = generateRobotsTxt(config);
    fs.writeFileSync(robotsPath, robotsTxt);

    console.log('✅ Created robots.txt to block AI crawlers\n');

    // Show what's being blocked
    const botsToBlock = getBotsToBlock(config);
    console.log(`🤖 Blocking ${botsToBlock.length} AI crawlers:`);
    console.log(formatBotList(botsToBlock));

    console.log('📍 Location: ' + robotsPath);

    // Show configuration hints
    if (config === loadConfig()) {
      console.log('\n💡 Tip: Create ai-shield.config.js to customize which bots to block');
      console.log('   Run "npx ai-crowl-shield list" to see all available bots');
    }

  } catch (error) {
    console.error('❌ Error during ai-crowl-shield setup:', error);
    // Don't throw - we don't want to break the user's npm install
  }
}

export default setup;