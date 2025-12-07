# AI Crowl Shield

Block AI crawlers from training on your website content. One command, zero config.

[![npm version](https://img.shields.io/npm/v/ai-crowl-shield.svg)](https://www.npmjs.com/package/ai-crowl-shield)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Why?

AI companies are scraping everything. Your blog posts, documentation, code examples - all of it ends up training models you don't control.

I built this because I was tired of seeing GPTBot hammering my sites. One `npx` command and you're protected.

## What it does

Creates a `robots.txt` file that tells AI crawlers to back off. Regular search engines (Google, Bing) still work fine - this only blocks the AI training bots.

## Quick Start

```bash
npx ai-crowl-shield setup
```

That's it. Your site is now protected from AI crawlers.

## Features

- **21+ AI Crawlers Blocked** - Comprehensive list including GPTBot, CCBot, Claude, Perplexity, and more
- **Multi-Framework Support** - Works with Next.js, React, Vue, and static sites
- **Configuration File** - Customize which bots to block
- **Sitemap Support** - Automatically add sitemap references
- **Custom Rules** - Add your own robots.txt rules
- **Verification** - Check your current protection status
- **Auto-Backup** - Never lose your existing robots.txt
- **Zero Dependencies** - Lightweight and fast

## Commands

### Setup
```bash
npx ai-crowl-shield setup
```
Creates robots.txt with AI crawler blocking rules.

### Verify
```bash
npx ai-crowl-shield verify
```
Check if robots.txt is properly configured and see what's blocked.

### Update
```bash
npx ai-crowl-shield update
```
Update robots.txt with the latest bot list and your config changes.

### List
```bash
npx ai-crowl-shield list
```
See all available AI crawlers that can be blocked.

### Restore
```bash
npx ai-crowl-shield restore
```
Restore robots.txt from backup.

## What Gets Blocked

By default, we block 21+ AI crawlers:

**AI Training Bots:**
- GPTBot (OpenAI)
- CCBot (Common Crawl - used by many AI companies)
- Google-Extended (Google's AI training, not search)
- anthropic-ai (Anthropic/Claude)
- FacebookBot (Meta AI)
- Bytespider (ByteDance/TikTok)
- Amazonbot (Amazon)
- cohere-ai (Cohere)
- And 13+ more...

**AI Assistants:**
- ChatGPT-User
- Claude-Web
- PerplexityBot

Your site still shows up in Google search. This just stops AI companies from using your content as free training data.

## Configuration

Create `ai-shield.config.js` in your project root:

```javascript
module.exports = {
  // Customize which bots to block
  bots: {
    block: ['GPTBot', 'CCBot', 'anthropic-ai'],  // Only block these
    allow: ['PerplexityBot']                      // Exception: don't block this one
  },

  // Add your sitemap
  sitemap: 'https://yoursite.com/sitemap.xml',
  // Or multiple sitemaps
  sitemap: [
    'https://yoursite.com/sitemap.xml',
    'https://yoursite.com/sitemap-blog.xml'
  ],

  // Add custom rules
  customRules: [
    {
      userAgent: 'MyCustomBot',
      rules: ['Disallow: /admin', 'Disallow: /private']
    }
  ],

  // Override auto-detection
  framework: 'nextjs', // 'nextjs' | 'react' | 'vue' | 'static' | 'auto'

  // Custom output directory
  publicDir: 'public'
};
```

Run `npx ai-crowl-shield list` to see all available bot names.

## Framework Support

Automatically detects and works with:
- Next.js
- Create React App
- Vue CLI / Vite
- Static sites
- Any project with a `public/` directory

## Programmatic Usage

```javascript
const { setup } = require('ai-crowl-shield');

setup();
```

Or with ES modules:
```javascript
import { setup } from 'ai-crowl-shield';

setup();
```

## FAQ

**Will this hurt my SEO?**
No. Search crawlers like Googlebot and Bingbot are specifically allowed. Only AI training bots are blocked.

**Does this actually work?**
Yes, for companies that respect robots.txt (most major ones do). It's not foolproof, but it's the industry standard way to control crawler access.

**What about static exports?**
Works perfectly. It's just a file in your `public/` folder.

**Can I block some bots but not others?**
Yes! Use the configuration file to customize exactly which bots to block.

**Already have a robots.txt?**
No problem. We automatically backup your existing file to `robots.txt.backup` before making changes.

**What if I want to restore my old robots.txt?**
Run `npx ai-crowl-shield restore` to restore from backup.

**Does this work with middleware/dynamic robots.txt?**
This creates a static file. If you need dynamic rules, you can use this as a base and extend it.

**Can I contribute more bots?**
Absolutely! PRs welcome. See the Contributing section.

## How It Works

1. Detects your framework (Next.js, React, Vue, etc.)
2. Finds or creates your `public/` directory
3. Backs up any existing robots.txt
4. Generates a new robots.txt with AI crawler blocks
5. Keeps search engines and other legitimate crawlers working

## Migration from v1

v2 is backward compatible. Your existing setup will continue to work, but you now have access to:
- Configuration files
- More commands (verify, update, restore, list)
- 10+ new bots blocked by default
- Framework auto-detection

Simply run `npx ai-crowl-shield update` to get the latest bot list.

## Examples

### Basic Setup
```bash
npx ai-crowl-shield setup
```

### Custom Configuration
```javascript
// ai-shield.config.js
module.exports = {
  bots: {
    block: ['GPTBot', 'CCBot']  // Only block these two
  },
  sitemap: 'https://myblog.com/sitemap.xml'
};
```

```bash
npx ai-crowl-shield setup
```

### Verify Protection
```bash
npx ai-crowl-shield verify
```

Output:
```
✅ robots.txt exists
📊 Checking blocked bots:
  ✓ GPTBot is blocked
  ✓ CCBot is blocked
  ✓ anthropic-ai is blocked
  ...
📈 Summary: Blocked 21/21 bots
```

## Contributing

PRs welcome! Please:
- Keep it simple
- Add tests if adding new features
- Update the bot list with credible sources
- Follow existing code style

## Changelog

### v2.0.0
- Configuration file support
- 10+ new AI crawlers added
- Multi-framework support (React, Vue, static)
- New commands: verify, update, restore, list
- Sitemap support
- Custom rules support
- Framework auto-detection
- Better CLI output

### v1.0.x
- Initial release
- Basic Next.js support
- 10 AI crawlers blocked

## License

MIT

---

**Protect your content. Block AI crawlers. Stay in control.**