import * as fs from 'fs';
import * as path from 'path';
import { loadConfig } from '../config';
import { getPublicDir } from '../utils';

export function restore(): void {
  try {
    const config = loadConfig();
    const publicDir = getPublicDir(config);
    const robotsPath = path.join(publicDir, 'robots.txt');
    const backupPath = path.join(publicDir, 'robots.txt.backup');

    console.log('🔄 Restoring robots.txt from backup...\n');

    // Check if backup exists
    if (!fs.existsSync(backupPath)) {
      console.error('❌ No backup file found');
      console.log(`   Expected location: ${backupPath}`);
      process.exit(1);
    }

    // Create a backup of current file before restoring
    if (fs.existsSync(robotsPath)) {
      const tempBackup = path.join(publicDir, 'robots.txt.temp');
      fs.copyFileSync(robotsPath, tempBackup);
      console.log('📦 Created temporary backup of current robots.txt');
    }

    // Restore from backup
    fs.copyFileSync(backupPath, robotsPath);
    console.log('✅ robots.txt restored from backup successfully!\n');

    // Show preview
    const content = fs.readFileSync(robotsPath, 'utf8');
    const previewLines = content.split('\n').slice(0, 10);
    console.log('📄 Preview of restored file:');
    console.log('   ' + previewLines.join('\n   '));

    if (content.split('\n').length > 10) {
      console.log('   ...');
    }

  } catch (error) {
    console.error('❌ Error during restore:', error);
    process.exit(1);
  }
}

export default restore;
