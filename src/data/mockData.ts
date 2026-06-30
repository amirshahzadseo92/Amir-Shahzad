import { ArticleBrief, BlogPost, ContentOrder, DownloadedOutline } from '../types';

export const CATEGORIES = [
  'All',
  'SaaS Strategy',
  'SEO & Growth',
  'Web Development',
  'Content Marketing',
  'AI & Automation'
];

export const MOCK_BRIEFS: ArticleBrief[] = [
  {
    id: 'brief-1',
    title: 'The Future of AI-Driven SaaS Content Automation in 2026',
    category: 'AI & Automation',
    previewText: 'Discover how modern generative models and agentic AI pipelines are transforming SEO content generation, bypassing simple word-stuffing in favor of deep structured semantic search nodes.',
    fullBrief: `This brief outlines a highly researched editorial direction covering the intersection of Generative AI, agentic systems, and SEO authority.

### Target Audience:
- SaaS Founders, VP of Marketing, Content Strategists, SEO Specialists looking to scale content production responsibly without sacrificing authority.

### Key Editorial Themes:
1. Shift from quantitative keyword stuffing to expert domain knowledge.
2. The role of search intent clustering and multi-agent workflows.
3. Building a continuous human-in-the-loop validation chain.
4. Integrating proprietary product data to build unbeatable organic search moats.`,
    keywords: ['SaaS SEO', 'AI Content Automation', 'Semantic Search', 'Topic Authority'],
    targetAudience: 'Marketing Executives & Content Directors',
    searchVolume: '8,400 / mo',
    difficulty: 'Medium',
    status: 'Premium',
    unlocked: false,
    date: 'June 2026'
  },
  {
    id: 'brief-2',
    title: 'Next.js 15 vs Remix: The Definitive SEO Performance Comparison',
    category: 'Web Development',
    previewText: 'An in-depth analysis comparing Next.js 15 App Router and Remix SSR engines with concrete telemetry data on Core Web Vitals, partial pre-rendering, and search crawler efficiency.',
    fullBrief: `A masterclass brief evaluating modern React frameworks on absolute crawlability, Time to First Byte (TTFB), and metadata injection patterns.

### Target Audience:
- Technical SEO Leads, Lead Frontend Engineers, Engineering Managers, and Product Owners.

### Key Editorial Themes:
1. Dynamic server rendering strategies: PPR (Partial Pre-rendering) in Next.js 15 vs Remix’s standard streaming.
2. Handling high-frequency dynamic routing pages without degrading Cumulative Layout Shift (CLS).
3. Structured Schema markup injection at the nested layout tier.
4. Crawler performance test cases under slow-network rendering constraints.`,
    keywords: ['Next.js 15 SEO', 'Remix vs NextJS', 'Core Web Vitals', 'Technical SEO'],
    targetAudience: 'Technical SEOs & React Engineers',
    searchVolume: '5,200 / mo',
    difficulty: 'Hard',
    status: 'Free',
    unlocked: true,
    date: 'May 2026'
  },
  {
    id: 'brief-3',
    title: '10 Proven B2B SaaS Link Building Tactics for Highly Competitive Niches',
    category: 'SEO & Growth',
    previewText: 'Forget generic outreach. Learn how high-growth startups are capturing premium domain links via original data research, free calculators, and programmatic integrations.',
    fullBrief: `An authoritative strategic breakdown outlining precise backlink acquisition workflows that don't involve spammy email templates.

### Target Audience:
- B2B SaaS Founders, Growth Marketers, Backlink Outreach Specialists.

### Key Editorial Themes:
1. The "Interactive Asset" blueprint: Building lightweight utility tools that rank organically.
2. Formulating original industry surveys and converting statistical findings into citation magnets.
3. Designing highly referenceable visual flowcharts that editors steal and attribute.
4. Implementing broken-link campaigns using programmatic competitor API intelligence.`,
    keywords: ['B2B Link Building', 'SaaS Backlinks', 'Programmatic SEO', 'Digital PR'],
    targetAudience: 'Growth Marketers & SEO Agency Leads',
    searchVolume: '12,500 / mo',
    difficulty: 'Hard',
    status: 'Premium',
    unlocked: false,
    date: 'June 2026'
  },
  {
    id: 'brief-4',
    title: 'Tailwind CSS v4: Core Performance Benchmarks and SEO Impact',
    category: 'Web Development',
    previewText: 'Explore how Tailwind CSS v4’s rebuilt LightningCSS compiler slashes bundle sizes by 40%, directly boosting cumulative page speeds and performance scores.',
    fullBrief: `Technical brief on CSS weight optimization, its positive impact on the Largest Contentful Paint (LCP) metric, and modern build-tool integrations.

### Target Audience:
- Frontend Developers, UI Designers, Performance Engineers.

### Key Editorial Themes:
1. Re-evaluation of the CSS bundle sizes in standard enterprise landing environments.
2. Implementing absolute critical CSS rendering natively using Vite and Tailwind v4.
3. Transitioning away from post-processing bottlenecks.
4. Impact of layout layout performance on automated search indexers.`,
    keywords: ['Tailwind v4 CSS', 'Vite CSS Optimization', 'Largest Contentful Paint', 'Page Speed'],
    targetAudience: 'Web Developers & Frontend Architects',
    searchVolume: '4,100 / mo',
    difficulty: 'Easy',
    status: 'Free',
    unlocked: true,
    date: 'June 2026'
  },
  {
    id: 'brief-5',
    title: 'Topic Clustering: How to Build a Domain Authority Strategy from Scratch',
    category: 'Content Marketing',
    previewText: 'A comprehensive framework to map your pillar pages and cluster articles, building logical interlinking webs that establish unmatched Google E-E-A-T credentials.',
    fullBrief: `A foundational guide focusing on search engine logical clusters rather than independent keyword targets.

### Target Audience:
- Content Managers, Copywriters, Inbound Specialists.

### Key Editorial Themes:
1. Defining the core high-difficulty Pillar Node.
2. Generating 10 supportive Cluster Nodes mapping unique user intents.
3. Best-practice internal anchor text formulas.
4. Tracking search cannibalization and resolving duplicated structural topics.`,
    keywords: ['Topic Clustering', 'E-E-A-T Framework', 'SEO Pillar Pages', 'Internal Linking'],
    targetAudience: 'Content Marketers & SEO Planners',
    searchVolume: '15,600 / mo',
    difficulty: 'Medium',
    status: 'Premium',
    unlocked: false,
    date: 'April 2026'
  },
  {
    id: 'brief-6',
    title: 'Decentralized Search Engines: Navigating the Brave New World of LLM Citations',
    category: 'SaaS Strategy',
    previewText: 'Understand Perplexity, ChatGPT Search, and Gemini Overviews optimization. Learn how search engines are evolving from standard blue links to conversational agent synthesis.',
    fullBrief: `An essential strategic brief for next-gen search paradigms, defining the transition from search engine optimization (SEO) to Generative Engine Optimization (GEO).

### Target Audience:
- Startup Executives, Founders, Advanced SEO Strategists.

### Key Editorial Themes:
1. Mapping brand citations inside major model parameters and prompt systems.
2. The importance of formatted tables, structured JSON-LD, and factual density in content.
3. Optimizing for the LLM conversational feedback loops.
4. Analyzing CTR differences between direct link citations and generative summaries.`,
    keywords: ['GEO Strategy', 'Generative Engine Optimization', 'LLM Search Citations', 'Perplexity SEO'],
    targetAudience: 'SaaS Executives & Modern Growth Leaders',
    searchVolume: '9,800 / mo',
    difficulty: 'Hard',
    status: 'Premium',
    unlocked: false,
    date: 'June 2026'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Understanding Generative Engine Optimization (GEO) in 2026',
    category: 'SEO & Growth',
    preview: 'With AI search models changing the internet landscape, standard SEO tactics are no longer enough. Here is your roadmap to capture citations in conversational AI summaries.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    author: 'Sarah Jenkins',
    date: 'June 24, 2026',
    readTime: '6 min read',
    content: [
      'The traditional search paradigm is fracturing. Millions of tech-forward users are now bypassing Google Search altogether, using conversational assistants like ChatGPT Search, Gemini, and Perplexity to answer complex, compound questions.',
      'To succeed in this modern landscape, marketers must shift their thinking from simple Search Engine Optimization (SEO) to Generative Engine Optimization (GEO). GEO is the process of optimizing your brand and content so that LLM agents can easily locate, ingest, and synthesize your information as trusted citations.',
      'Key tactics include maximizing structural clarity, providing factual tabular data with zero fluff, and embedding highly specific, brand-aligned answers to long-tail user intents.'
    ]
  },
  {
    id: 'blog-2',
    title: 'How We Scaled Our Client’s SaaS MRR from $12k to $85k with Semantic Hubs',
    category: 'SaaS Strategy',
    preview: 'We did not build backlinks, and we did not publish 100 articles a week. Learn how our focused topical coverage model earned absolute market authority.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    author: 'Marcus Vance',
    date: 'June 12, 2026',
    readTime: '8 min read',
    content: [
      'In saturated SaaS spaces, competing on general keywords is a losing, expensive game. For our enterprise client, we designed a semantic cluster structure of 12 interconnected high-value pages.',
      'By fully answering every user question about the specific micro-niche before moving to broader segments, search crawlers recognized our client’s domain as an expert site within 60 days.',
      'This resulted in top-3 rankings for high-intent buyer keywords, proving that focused depth is significantly superior to shallow volume.'
    ]
  },
  {
    id: 'blog-3',
    title: 'Maximizing Crawl Budgets for Enterprise Angular & React SPAs',
    category: 'Web Development',
    preview: 'Is JavaScript hydration killing your search engine rankings? A guide to proper Server-Side Rendering setups that keep crawler bots happy.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    author: 'Aris Thorne',
    date: 'May 28, 2026',
    readTime: '10 min read',
    content: [
      'Client-side Javascript application rendering is highly intensive on Google and Bing crawl budgets. Bots render pages in a two-stage process: first HTML parsing, then queueing resources for dynamic rendering.',
      'If your critical navigation links and SEO descriptions depend on slow async API hydration, search bots will index empty placeholders or leave your application pages completely unparsed.',
      'This technical breakdown explains how to verify pre-rendered static content delivery pipelines and measure crawler response latency.'
    ]
  }
];

export const MOCK_ORDERS: ContentOrder[] = [
  {
    id: 'ord-101',
    title: 'Topic Cluster: CRM Migration Best Practices (3 articles)',
    serviceType: 'Custom Content Pack',
    status: 'In Progress',
    amount: '$1,200',
    date: 'June 25, 2026'
  },
  {
    id: 'ord-102',
    title: 'Premium Outline: SEO Strategy for Tailwind v4',
    serviceType: 'Outline Access',
    status: 'Completed',
    amount: '$49',
    date: 'June 20, 2026'
  },
  {
    id: 'ord-103',
    title: 'Article: The Ultimate Guide to Headless Shopify Dev',
    serviceType: 'Single Expert Article',
    status: 'Under Review',
    amount: '$450',
    date: 'June 18, 2026'
  }
];

export const MOCK_DOWNLOADS: DownloadedOutline[] = [
  {
    id: 'dl-1',
    title: 'The Future of AI-Driven SaaS Content Automation',
    unlockedAt: 'June 21, 2026',
    size: '142 KB'
  },
  {
    id: 'dl-2',
    title: 'B2B SaaS Link Building Tactics - Premium Framework',
    unlockedAt: 'June 15, 2026',
    size: '288 KB'
  }
];
