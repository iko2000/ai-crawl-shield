/**
 * Example configuration file for ai-crowl-shield
 *
 * Copy this file to your project root as:
 * - ai-shield.config.js
 * - ai-shield.config.mjs
 * - .aishieldrc
 * - .aishieldrc.json
 */

module.exports = {
  /**
   * Configure which bots to block
   */
  bots: {
    // List of bot names to block (default: all available bots)
    // Run 'npx ai-crowl-shield list' to see all available bots
    block: [
      'GPTBot',
      'CCBot',
      'anthropic-ai',
      'Google-Extended',
      'FacebookBot',
      'Bytespider',
      // ... add more from the list
    ],

    // Exceptions: bots from the block list that you want to allow
    allow: [
      // 'PerplexityBot', // Uncomment to allow specific bots
    ]
  },

  /**
   * Add sitemap reference(s) to robots.txt
   */
  sitemap: 'https://yoursite.com/sitemap.xml',

  // Or multiple sitemaps:
  // sitemap: [
  //   'https://yoursite.com/sitemap.xml',
  //   'https://yoursite.com/sitemap-blog.xml',
  // ],

  /**
   * Add custom robots.txt rules
   */
  customRules: [
    {
      userAgent: 'CustomBot',
      rules: [
        'Disallow: /admin',
        'Disallow: /private',
        'Allow: /public'
      ]
    }
  ],

  /**
   * Framework detection
   * Options: 'auto', 'nextjs', 'react', 'vue', 'static'
   * Default: 'auto'
   */
  framework: 'auto',

  /**
   * Custom public directory path (relative to project root)
   * Default: 'public'
   */
  publicDir: 'public',
};
