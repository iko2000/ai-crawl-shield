import { DEFAULT_BOTS, BotDefinition } from '../config';

export function list(options?: { category?: string }): void {
  console.log('🤖 Available AI Crawlers:\n');

  const categories = {
    'ai-training': '🎓 AI Training Crawlers',
    'ai-assistant': '💬 AI Assistant Browsing',
    'scraper': '🕷️  Web Scrapers',
    'other': '📦 Other'
  };

  let botsToShow = DEFAULT_BOTS;

  if (options?.category) {
    botsToShow = DEFAULT_BOTS.filter(bot => bot.category === options.category);
  }

  if (options?.category) {
    console.log(`Showing: ${categories[options.category as keyof typeof categories]}\n`);
    botsToShow.forEach(bot => {
      console.log(`  ${bot.name}`);
      console.log(`    User-Agent: ${bot.userAgent}`);
      console.log(`    ${bot.description}\n`);
    });
  } else {
    // Group by category
    for (const [category, title] of Object.entries(categories)) {
      const categoryBots = DEFAULT_BOTS.filter(bot => bot.category === category);
      if (categoryBots.length > 0) {
        console.log(`${title}:`);
        categoryBots.forEach(bot => {
          console.log(`  • ${bot.name} - ${bot.description}`);
        });
        console.log('');
      }
    }
  }

  console.log(`Total: ${botsToShow.length} bots\n`);
  console.log('💡 Use these bot names in your ai-shield.config.js to customize blocking');
}

export default list;
