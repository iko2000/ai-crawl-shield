import * as fs from 'fs';
import * as path from 'path';
import { loadConfig } from '../config';
import { generateRobotsTxt, getPublicDir } from '../utils';

export function update(): void {
  try {
    const config = loadConfig();
    const publicDir = getPublicDir(config);
    const robotsPath = path.join(publicDir, 'robots.txt');

    console.log('🔄 Updating robots.txt...\n');

    // Check if public directory exists
    if (!fs.existsSync(publicDir)) {
      console.error(`❌ Public directory not found: ${publicDir}`);
      console.log('💡 Run "npx ai-crowl-shield setup" first');
      process.exit(1);
    }

    // Create backup if robots.txt exists
    if (fs.existsSync(robotsPath)) {
      const backupPath = path.join(publicDir, 'robots.txt.backup');
      fs.copyFileSync(robotsPath, backupPath);
      console.log('📦 Backed up existing robots.txt');
    }

    // Generate and write new robots.txt
    const content = generateRobotsTxt(config);
    fs.writeFileSync(robotsPath, content);

    console.log('✅ robots.txt updated successfully!\n');
    console.log('🤖 Blocking the following bots:');

    const lines = content.split('\n');
    const userAgents = lines
      .filter(line => line.startsWith('User-agent:') && !line.includes('User-agent: *'))
      .map(line => line.replace('User-agent:', '').trim());

    userAgents.forEach(agent => console.log(`   - ${agent}`));

  } catch (error) {
    console.error('❌ Error during update:', error);
    process.exit(1);
  }
}

export default update;
