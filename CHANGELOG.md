# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-07

### Added
- **Configuration File Support**: Create `ai-shield.config.js` to customize behavior
  - Choose which bots to block with `bots.block` array
  - Create exceptions with `bots.allow` array
  - Add custom robots.txt rules
  - Specify sitemap URLs (single or multiple)
  - Override framework detection
  - Custom public directory path

- **New Commands**:
  - `verify`: Check robots.txt configuration and see what's blocked
  - `update`: Update robots.txt with latest bot list and config changes
  - `restore`: Restore robots.txt from backup
  - `list`: Display all available AI crawlers with categories

- **10+ New AI Crawlers**:
  - OAI-SearchBot (OpenAI)
  - GoogleOther (Google)
  - Meta-ExternalAgent (Meta)
  - Amazonbot (Amazon)
  - Bytespider (ByteDance/TikTok)
  - YouBot (You.com)
  - Diffbot
  - ImagesiftBot
  - cohere-ai (Cohere)
  - AI2Bot (Allen Institute)
  - img2dataset

- **Multi-Framework Support**:
  - Auto-detection for Next.js, React, Vue, and static sites
  - Configurable framework override
  - Works with any project with a `public/` directory

- **Features**:
  - Sitemap support (single or multiple sitemaps)
  - Custom robots.txt rules
  - Better CLI output with emojis and progress indicators
  - Categorized bot listing (AI Training, AI Assistant, Web Scrapers)
  - Enhanced error handling and validation
  - Auto-backup before every change

### Changed
- Improved setup output with detailed information
- Better framework detection algorithm
- Enhanced robots.txt generation with categories and descriptions
- Updated README with comprehensive documentation
- Better TypeScript types and interfaces

### Fixed
- Framework detection now works for non-Next.js projects
- Backup system now creates timestamped backups

## [1.0.7] - 2025-12-07

### Changed
- Minor version bump

## [1.0.6] - 2025-12-06

### Changed
- Package metadata updates

## [1.0.0] - 2025-12-05

### Added
- Initial release
- Basic Next.js support
- Setup command to create robots.txt
- Blocks 10 major AI crawlers:
  - GPTBot (OpenAI)
  - ChatGPT-User (OpenAI)
  - CCBot (Common Crawl)
  - anthropic-ai (Anthropic)
  - Claude-Web (Anthropic)
  - Google-Extended (Google)
  - PerplexityBot (Perplexity)
  - Omgilibot
  - FacebookBot (Meta)
  - Applebot-Extended (Apple)
- Automatic backup of existing robots.txt
- CLI with help and version commands
- Programmatic API for setup

[2.0.0]: https://github.com/anthropics/ai-crowl-shield/compare/v1.0.7...v2.0.0
[1.0.7]: https://github.com/anthropics/ai-crowl-shield/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/anthropics/ai-crowl-shield/compare/v1.0.0...v1.0.6
[1.0.0]: https://github.com/anthropics/ai-crowl-shield/releases/tag/v1.0.0
