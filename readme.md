# Next AI Shield

Block AI crawlers from training on your Next.js site. Install and forget.

[![npm version](https://img.shields.io/npm/v/ai-crowl-shield.svg)](https://www.npmjs.com/package/ai-crowl-shield)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Why?

AI companies are scraping everything. Your blog posts, documentation, code examples - all of it ends up training models you don't control. 

I built this because I was tired of seeing GPTBot  hammering my Next.js sites. One `npm install` and you're done.

## What it does

Drops a `robots.txt` in your `public/` folder that tells AI crawlers to back off. Regular search engines (Google, Bing) still work fine - this only blocks the training bots.

## Install
```bash
npm install ai-corwl-shield
```

Done. It runs on install and sets everything up.

## What gets blocked

- **GPTBot** - OpenAI's crawler for ChatGPT training
- **CCBot** - Common Crawl (used by basically everyone)
- **anthropic-ai** - Anthropic's Claude crawler
- **Google-Extended** - Google's AI training bot (not regular search)
- **PerplexityBot** - Perplexity's crawler
- **FacebookBot** - Meta's AI data collector
- A few others

Your site still shows up in Google search. This just stops AI companies from using your content as free training data.

## Already have a robots.txt?

No problem. It backs up your existing file to `robots.txt.backup` before making changes.

## Manual setup

If you want to run it yourself instead of on install:
```javascript
const { setup } = require('ai-crowl-shield');
setup();
```

## Configuration

Right now it uses sane defaults. Future versions will let you pick which bots to block, but honestly the defaults work for most cases.

If you need custom rules now, just edit `public/robots.txt` after install.

## FAQ

**Will this hurt my SEO?**  
Nope. Search crawlers are specifically allowed.

**What about static exports?**  
Works fine. It's just a file in `public/`.

**Can I block more/fewer bots?**  
Edit `public/robots.txt` manually for now. Config file coming in v2.

**Why not just do this myself?**  
You could. But then you'd do it on every project, forget to update it, and have 5 different versions. This way it's consistent and maintained.

## Coming eventually

- Config file so you can customize the blocklist
- CLI tool for manual control
- Maybe middleware support for dynamic serving

## Contributing

PRs welcome. Keep it simple.

## License

MIT

---

