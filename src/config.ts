export interface BotDefinition {
  name: string;
  userAgent: string;
  description: string;
  category: 'ai-training' | 'ai-assistant' | 'scraper' | 'other';
}

export interface ShieldConfig {
  bots?: {
    block?: string[];
    allow?: string[];
  };
  customRules?: Array<{
    userAgent: string;
    rules: string[];
  }>;
  sitemap?: string | string[];
  outputPath?: string;
  framework?: 'nextjs' | 'react' | 'vue' | 'static' | 'auto';
  publicDir?: string;
}

export const DEFAULT_BOTS: BotDefinition[] = [
  // OpenAI
  {
    name: 'GPTBot',
    userAgent: 'GPTBot',
    description: 'OpenAI\'s web crawler for ChatGPT training',
    category: 'ai-training'
  },
  {
    name: 'ChatGPT-User',
    userAgent: 'ChatGPT-User',
    description: 'ChatGPT user-initiated browsing',
    category: 'ai-assistant'
  },
  {
    name: 'OAI-SearchBot',
    userAgent: 'OAI-SearchBot',
    description: 'OpenAI search bot',
    category: 'ai-training'
  },

  // Anthropic
  {
    name: 'anthropic-ai',
    userAgent: 'anthropic-ai',
    description: 'Anthropic\'s Claude crawler',
    category: 'ai-training'
  },
  {
    name: 'Claude-Web',
    userAgent: 'Claude-Web',
    description: 'Claude web browsing',
    category: 'ai-assistant'
  },

  // Google
  {
    name: 'Google-Extended',
    userAgent: 'Google-Extended',
    description: 'Google\'s AI training bot (not search)',
    category: 'ai-training'
  },
  {
    name: 'GoogleOther',
    userAgent: 'GoogleOther',
    description: 'Google\'s miscellaneous crawler',
    category: 'scraper'
  },

  // Common Crawl
  {
    name: 'CCBot',
    userAgent: 'CCBot',
    description: 'Common Crawl bot (used by many AI companies)',
    category: 'ai-training'
  },

  // Perplexity
  {
    name: 'PerplexityBot',
    userAgent: 'PerplexityBot',
    description: 'Perplexity AI crawler',
    category: 'ai-training'
  },

  // Meta/Facebook
  {
    name: 'FacebookBot',
    userAgent: 'FacebookBot',
    description: 'Meta\'s AI data collector',
    category: 'ai-training'
  },
  {
    name: 'Meta-ExternalAgent',
    userAgent: 'Meta-ExternalAgent',
    description: 'Meta\'s external agent',
    category: 'ai-training'
  },

  // Apple
  {
    name: 'Applebot-Extended',
    userAgent: 'Applebot-Extended',
    description: 'Apple\'s AI training bot',
    category: 'ai-training'
  },

  // Amazon
  {
    name: 'Amazonbot',
    userAgent: 'Amazonbot',
    description: 'Amazon\'s web crawler',
    category: 'ai-training'
  },

  // Bytedance/TikTok
  {
    name: 'Bytespider',
    userAgent: 'Bytespider',
    description: 'ByteDance\'s crawler',
    category: 'ai-training'
  },

  // Other AI crawlers
  {
    name: 'Omgilibot',
    userAgent: 'Omgilibot',
    description: 'Omgili crawler',
    category: 'scraper'
  },
  {
    name: 'YouBot',
    userAgent: 'YouBot',
    description: 'You.com search bot',
    category: 'ai-training'
  },
  {
    name: 'Diffbot',
    userAgent: 'Diffbot',
    description: 'Diffbot web scraper',
    category: 'scraper'
  },
  {
    name: 'ImagesiftBot',
    userAgent: 'ImagesiftBot',
    description: 'Image scraping bot',
    category: 'scraper'
  },
  {
    name: 'cohere-ai',
    userAgent: 'cohere-ai',
    description: 'Cohere AI crawler',
    category: 'ai-training'
  },
  {
    name: 'AI2Bot',
    userAgent: 'AI2Bot',
    description: 'Allen Institute for AI bot',
    category: 'ai-training'
  },
  {
    name: 'img2dataset',
    userAgent: 'img2dataset',
    description: 'Image dataset scraper',
    category: 'scraper'
  }
];

export const DEFAULT_CONFIG: ShieldConfig = {
  bots: {
    block: DEFAULT_BOTS.map(bot => bot.name),
    allow: []
  },
  framework: 'auto',
  customRules: []
};

export function loadConfig(): ShieldConfig {
  const configPaths = [
    'ai-shield.config.js',
    'ai-shield.config.mjs',
    'ai-shield.config.json',
    '.aishieldrc',
    '.aishieldrc.json'
  ];

  for (const configPath of configPaths) {
    try {
      const fullPath = require.resolve(process.cwd() + '/' + configPath);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const userConfig = require(fullPath);
      return { ...DEFAULT_CONFIG, ...userConfig };
    } catch {
      // Config file doesn't exist, continue
    }
  }

  return DEFAULT_CONFIG;
}

export function getBotByName(name: string): BotDefinition | undefined {
  return DEFAULT_BOTS.find(bot => bot.name === name);
}

export function getBotsToBlock(config: ShieldConfig): BotDefinition[] {
  const blockList = config.bots?.block || DEFAULT_BOTS.map(bot => bot.name);
  const allowList = config.bots?.allow || [];

  return DEFAULT_BOTS.filter(bot =>
    blockList.includes(bot.name) && !allowList.includes(bot.name)
  );
}
