import * as fs from 'fs';
import * as path from 'path';

function setup(): void {
  try {
    const rootDir = process.cwd();
    console.log(`🔍 Checking project at: ${rootDir}`);

    // Let's check for common Next.js config files to identify a Next.js project
    const isNextProject =
      fs.existsSync(path.join(rootDir, 'next.config.js')) ||
      fs.existsSync(path.join(rootDir, 'next.config.mjs')) ||
      fs.existsSync(path.join(rootDir, 'next.config.ts'));

    if (!isNextProject) {
      console.warn('⚠️  Not a Next.js project. Skipping auto-setup.');
      return;
    }

    const publicDir = path.join(rootDir, 'public');

    if (!fs.existsSync(publicDir)) {
      console.log('📁 Creating public directory...');
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const robotsTxt = `# Block AI crawlers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Omgilibot
Disallow: /

User-agent: FacebookBot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: *
Allow: /
`;

    const robotsPath = path.join(publicDir, 'robots.txt');

    if (fs.existsSync(robotsPath)) {
      const backupPath = path.join(publicDir, 'robots.txt.backup');
      fs.copyFileSync(robotsPath, backupPath);
      console.log('📦 Backed up existing robots.txt');
    }

    fs.writeFileSync(robotsPath, robotsTxt);
    console.log('✅ Created robots.txt to block AI crawlers');
  } catch (error) {
    console.error('❌ Error during ai-crowl-shield setup:', error);
    // Don't throw - we don't want to break the user's npm install
  }
}

export default setup;