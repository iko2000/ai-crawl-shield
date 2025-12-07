import * as fs from 'fs';
import * as path from 'path';
import { loadConfig } from '../config';
import { getPublicDir, getBotsToBlock } from '../utils';

export function verify(): void {
  try {
    const config = loadConfig();
    const publicDir = getPublicDir(config);
    const robotsPath = path.join(publicDir, 'robots.txt');

    console.log('🔍 Verifying robots.txt configuration...\n');

    // Check if robots.txt exists
    if (!fs.existsSync(robotsPath)) {
      console.log('❌ robots.txt not found');
      console.log(`   Expected location: ${robotsPath}`);
      console.log('\n💡 Run "npx ai-crowl-shield setup" to create it');
      return;
    }

    console.log(`✅ robots.txt exists at: ${robotsPath}\n`);

    // Read and analyze robots.txt
    const content = fs.readFileSync(robotsPath, 'utf8');
    const botsToBlock = getBotsToBlock(config);

    console.log('📊 Checking blocked bots:\n');

    let blockedCount = 0;
    let missingCount = 0;

    for (const bot of botsToBlock) {
      const isBlocked = content.includes(`User-agent: ${bot.userAgent}`) &&
                        content.includes('Disallow: /');

      if (isBlocked) {
        console.log(`  ✓ ${bot.name} is blocked`);
        blockedCount++;
      } else {
        console.log(`  ✗ ${bot.name} is NOT blocked`);
        missingCount++;
      }
    }

    console.log(`\n📈 Summary:`);
    console.log(`   Blocked: ${blockedCount}/${botsToBlock.length} bots`);

    if (missingCount > 0) {
      console.log(`   Missing: ${missingCount} bots`);
      console.log('\n💡 Run "npx ai-crowl-shield update" to fix this');
    } else {
      console.log('\n✅ All configured bots are blocked!');
    }

    // Check for backup
    const backupPath = path.join(publicDir, 'robots.txt.backup');
    if (fs.existsSync(backupPath)) {
      console.log(`\n📦 Backup available at: ${backupPath}`);
    }

  } catch (error) {
    console.error('❌ Error during verification:', error);
    process.exit(1);
  }
}

export default verify;
