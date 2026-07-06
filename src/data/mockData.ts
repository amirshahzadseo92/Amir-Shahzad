import { ArticleBrief, BlogPost, ContentOrder, DownloadedOutline, OutlineItem, ContentItem, HomeConfig, AboutConfig, ServiceItem, ExperienceItem, TestimonialItem, ContactSubmission, EducationItem, CertificationItem, SkillItem } from '../types';

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

export const MOCK_OUTLINES: OutlineItem[] = [
  {
    id: 'out-1',
    title: 'High-Performance SaaS Product Landing Page Layout',
    category: 'SaaS Strategy',
    wordCount: '1,500 - 2,000 words',
    headings: 8,
    entities: 24,
    score: 92,
    difficulty: 'Medium',
    sections: ['Hero Headline Optimization', 'Feature Bento Grid Structure', 'Social Proof Integration', 'Technical FAQ Segment'],
  },
  {
    id: 'out-2',
    title: 'Ultimate Developer Tutorial & Integration Blueprint',
    category: 'Web Development',
    wordCount: '2,500 - 3,200 words',
    headings: 12,
    entities: 38,
    score: 95,
    difficulty: 'Hard',
    sections: ['Architecture Overview', 'Step-by-Step Code Walkthrough', 'Performance Benchmarks', 'Security Best Practices'],
  },
  {
    id: 'out-3',
    title: 'B2B Thought Leadership Lead Magnet Outline',
    category: 'Content Marketing',
    wordCount: '1,800 - 2,200 words',
    headings: 6,
    entities: 18,
    score: 89,
    difficulty: 'Medium',
    sections: ['Industry Pain Points Analysis', 'Statistical Proof points', 'Actionable Strategic Framework', 'Conversion CTA Optimization'],
  },
  {
    id: 'out-4',
    title: 'E-commerce Category Page SEO Entity Map',
    category: 'SEO & Growth',
    wordCount: '1,200 - 1,500 words',
    headings: 5,
    entities: 32,
    score: 88,
    difficulty: 'Easy',
    sections: ['User Search Intent Mapping', 'Product Selection Guidelines', 'Value Proposition Callouts', 'Internal Linking Strategy'],
  }
];

export const MOCK_CONTENTS: ContentItem[] = [
  {
    id: 'cnt-1',
    title: 'Getting Started with Node.js Multi-Threading & Worker Pools',
    category: 'Web Development',
    readTime: '6 min read',
    gradeLevel: 'Grade 10',
    density: '1.8%',
    summary: 'A deep-dive tutorial explaining CPU-bound task optimization in Node.js, implementing custom thread worker pools to scale background processing safely.',
    keywords: ['Worker Threads', 'CPU Bound', 'Performance Optimization', 'Thread Pool'],
    content: `# Getting Started with Node.js Multi-Threading & Worker Pools\n\nTraditional Node.js operates on a single-event loop. While this asynchronous design works perfectly for I/O operations, heavy mathematical calculations or data compression can block the main loop.\n\n### Why Worker Threads matter\nBy spawning background threads, we can leverage multi-core processors. Let's see how optimization is handled dynamically:\n\n1. Spawning workers keeps primary loops responsive.\n2. In high-performance systems, worker pools manage queueing overhead.\n\nImplementing this scalable architecture keeps enterprise backends running smoothly.`
  },
  {
    id: 'cnt-2',
    title: 'Top 10 Marketing Automation Frameworks for Enterprise Scale',
    category: 'Content Marketing',
    readTime: '8 min read',
    gradeLevel: 'Grade 12',
    density: '2.1%',
    summary: 'Analyze and compare multi-channel CRM, email delivery networks, and automated funnel triggers to scale lead acquisition seamlessly.',
    keywords: ['Lead Funnels', 'CRM Automation', 'ROI Metrics', 'Enterprise SaaS'],
    content: `# Top 10 Marketing Automation Frameworks\n\nEnterprise client acquisition requires flawless integration across disparate funnel systems. By centralizing your CRM metrics, marketing campaigns gain massive compounding leverage.\n\n### Key Pillars of Automation\n- Multi-stage sequence onboarding\n- Real-time attribution routing\n- Automated email workflows\n\nTransitioning to advanced automated flows drives higher user retention and long-term customer life value.`
  },
  {
    id: 'cnt-3',
    title: 'Ultimate Guide to Headless CMS Architecture and Deployment',
    category: 'AI & Automation',
    readTime: '10 min read',
    gradeLevel: 'Grade 11',
    density: '1.9%',
    summary: 'How decoupling content APIs from presentation layers enhances static site rendering speeds, improves core web vitals, and secures user interfaces.',
    keywords: ['GraphQL APIs', 'Decoupled Architecture', 'Static Site Rendering', 'Core Web Vitals'],
    content: `# Ultimate Guide to Headless CMS Architecture\n\nDecoupled architectures separate structured database elements from front-end layout presentations. Utilizing GraphQL APIs ensures lightning-fast hydration rates.\n\n### Performance Benchmarks\nStatic rendering speeds up Largest Contentful Paint (LCP) times, raising search results directly. Security is also significantly increased because databases aren't directly exposed on public domains.`
  }
];

export const DEFAULT_HOME_CONFIG: HomeConfig = {
  heroTitle: "Create Content That",
  heroTitleGradient: "Dominates Search Engine",
  heroSubtitle: "Browse professional-grade article briefs, unlock semantic SEO outlines, or order complete ready-to-publish custom content verified by organic keyword experts.",
  badgeText: "Smart SEO & Copywriting Redefined"
};

export const DEFAULT_ABOUT_CONFIG: AboutConfig = {
  fullName: "Hafiz Amir Saifi",
  roleTitle: "SEO Specialist, Content Architect & Automation Developer",
  bio: "I design and develop enterprise-grade organic growth systems. By pairing deep technical SEO execution with custom-built automation dashboards (like Apex OS), I help content teams save thousands of manual research hours and secure long-term, high-intent ranking stability.",
  philosophyTitle: "Organic Campaign Philosophy",
  philosophyText: "Organic search is no longer just about filling pages with target search keys. True sustainable growth comes from establishing robust Topical Authority, ensuring frictionless crawler accessibility, and structuring templates around exact search intents.",
  missionText: "My core mission is to bridge the gap between technical search engines and high-performing copywriting teams. By analyzing semantic search patterns, I configure pristine blueprints, clear header distributions, and strict internal siloing schemas that search engines can easily parse and index."
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Topical Authority & Semantic Strategy',
    shortDesc: 'Establish unbreakable authority nodes through semantic content siloing and NLP-optimized intent clustering.',
    iconName: 'Layers',
    color: 'emerald',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
    highlights: [
      'Semantic Keyword Clustering (up to 5,000 entities)',
      'NLP-based Competitor Content Gap Analysis',
      'Topical Authority Silo Maps & Interlinking Schemas',
      'Intent-First Search Layout Models'
    ]
  },
  {
    id: 'srv-2',
    title: 'Technical On-Page & Schema Engineering',
    shortDesc: 'Tune your site codebase for frictionless indexability, rapid rendering speed, and deep crawl efficiency.',
    iconName: 'Cpu',
    color: 'blue',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
    highlights: [
      'Advanced JSON-LD Rich Snippet Schemas',
      'Core Web Vitals & Loading Performance Audits',
      'Crawl Budget Tuning & Sitemaps/Robots Optimization',
      'Mobile-First Rendering & Crawler Behavior Logs'
    ]
  },
  {
    id: 'srv-3',
    title: 'SEO Dashboard & Automation Tools',
    shortDesc: 'Eliminate manual research hours. Build tailor-made scraping, outline-generating, and metrics tracking dashboards.',
    iconName: 'Gauge',
    color: 'indigo',
    bgGradient: 'from-indigo-500/10 to-purple-500/10',
    highlights: [
      'Custom React & TypeScript Dashboard Design',
      'SEO API Connectors (Ahrefs, Semrush, Search Console)',
      'Automated AI-Driven Brief Generator Logic',
      'Crawl and Scrape Data Analysis Pipelines'
    ]
  },
  {
    id: 'srv-4',
    title: 'Content Brief & Layout Planning',
    shortDesc: 'Generate detailed writing briefs structured with pristine headings, target entities, and exact intent parameters.',
    iconName: 'FileText',
    color: 'amber',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
    highlights: [
      'Premium Layout Schemes (SEO Core Silo)',
      'Strict H1-H4 Structural Heading Blueprinting',
      'Secondary Entity Distributions & Word Count Directives',
      'Reader Experience (UX) Conversion Optimization'
    ]
  }
];

export const DEFAULT_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead SEO Content Architect & Automation Developer',
    company: 'Apex Organic Solutions (Self-Employed / Freelance)',
    period: '2023 - Present',
    location: 'Remote / Global',
    achievements: [
      'Built custom outline-generation dashboards and NLP metrics scraper pipelines reducing manual content research overhead by 68%.',
      'Engineered dynamic semantic entity distributions for client websites, consistently achieving sub-24h Google index rates.',
      'Managed a portfolio of 25+ active content hubs, resulting in an average organic search impression increase of 145% within 90 days.',
      'Standardized programmatic schema markup implementations across diverse CMS frameworks (React, Webflow, WordPress).'
    ],
    skillsUsed: ['SEO Automation', 'React', 'TypeScript', 'NLP Analysis', 'Entity Optimization']
  },
  {
    id: 'exp-2',
    role: 'Senior SEO Technical Analyst',
    company: 'Digital Horizon Growth',
    period: '2021 - 2023',
    location: 'Hybrid',
    achievements: [
      'Audited and re-structured sitemaps, interlinking loops, and canonical schemas for complex enterprise portals (10k+ pages).',
      'Optimized site-wide Core Web Vitals (LCP, FID, CLS), improving baseline mobile search CTR by 22%.',
      'Coached a team of 12 content copywriters on utilizing semantic silos and structuring editorial headers (H1-H4) around user search intent.',
      'Analyzed crawl budgets and server-side rendering logs to eliminate duplicate indexation paths.'
    ],
    skillsUsed: ['Crawl Budget', 'Core Web Vitals', 'Schema.org', 'Sitemap Tuning', 'Ahrefs / Semrush']
  },
  {
    id: 'exp-3',
    role: 'Organic Search Consultant',
    company: 'WebSphere Marketing Studio',
    period: '2019 - 2021',
    location: 'In-office',
    achievements: [
      'Developed end-to-end keyword clustering blueprints matching localized intents for multi-region retail portals.',
      'Executed competitor gap analyses focusing on Google Knowledge Graph entities and rich-snippet feature triggers.',
      'Successfully migrated 4 high-traffic web apps without losing legacy backlink equity or organic search impressions.'
    ],
    skillsUsed: ['Keyword Clustering', 'SEO Migration', 'Competitor Gap Analysis', 'Google Analytics']
  }
];

export const DEFAULT_EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Master of Science in Computer Science & Automation Systems',
    school: 'Global University of Technology',
    period: '2017 - 2019',
    details: 'Specialization in Data Scraping, NLP (Natural Language Processing), and Semantic Web Architecture.'
  },
  {
    id: 'edu-2',
    degree: 'Bachelor of Science in Information Technology',
    school: 'State Institute of Engineering',
    period: '2013 - 2017',
    details: 'Core focus on Algorithms, Web Development, Databases, and Software Engineering Principles.'
  }
];

export const DEFAULT_CERTIFICATIONS: CertificationItem[] = [
  { id: 'cert-1', title: 'Google Analytics Individual Qualification (GAIQ)', issuer: 'Google', date: '2025' },
  { id: 'cert-2', title: 'Advanced Technical SEO Certification', issuer: 'Semrush Academy', date: '2024' },
  { id: 'cert-3', title: 'Enterprise Content Architecture & NLP Standard', issuer: 'SEO Certified Institute', date: '2024' }
];

export const DEFAULT_SKILLS: SkillItem[] = [
  { id: 'skill-1', name: 'Semantic Silos & Architecture', level: 98 },
  { id: 'skill-2', name: 'Crawl Audit & Index Tuning', level: 95 },
  { id: 'skill-3', name: 'React & TypeScript Development', level: 90 },
  { id: 'skill-4', name: 'Automated Brief Generation Pipelines', level: 92 },
  { id: 'skill-5', name: 'Advanced JSON-LD Structured Data', level: 96 }
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'VP of Growth',
    company: 'ScribeSaaS Platforms',
    category: 'saas',
    rating: 5,
    metric: '+180% Organic Leads',
    quote: 'Hafiz Amir Saifi transformed how our editing team approaches topic outlines. The semantic silos he designed eliminated our keyword cannibalization problems within weeks. True expertise.',
    logoBg: 'bg-emerald-50 text-emerald-700'
  },
  {
    id: 'test-2',
    name: 'David Kael',
    role: 'Director of Content',
    company: 'TechFlow Systems',
    category: 'automation',
    rating: 5,
    metric: '-50 Hours Manual Work / Mo',
    quote: 'The outline automation pipeline Hafiz engineered for our dashboard is phenomenal. It takes our primary seed entities and generates clean, structurally correct content outlines ready for our writing team in seconds.',
    logoBg: 'bg-blue-50 text-blue-700'
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    role: 'Founder',
    company: 'LearnSphere Education',
    category: 'seo',
    rating: 5,
    metric: 'Sub-24h Index Coverage',
    quote: 'Our site struggled to get indexed after our migration. Hafiz audited our schema structures, resolved crawler budget bottlenecks, and got our vital hub pages ranking in record time. Exceeded expectations.',
    logoBg: 'bg-indigo-50 text-indigo-700'
  },
  {
    id: 'test-4',
    name: 'Marcus Brody',
    role: 'Head of SEO Strategy',
    company: 'FinTech Capital',
    category: 'seo',
    rating: 5,
    metric: 'Top 3 rankings for 42 core phrases',
    quote: 'His grasp of Topical Authority is exceptional. Instead of telling us to write more blogs, Hafiz configured beautiful interlinking pathways that mapped directly to consumer search intent. Our visibility has never been better.',
    logoBg: 'bg-amber-50 text-amber-700'
  },
  {
    id: 'test-5',
    name: 'Amiya Gupta',
    role: 'Product Manager',
    company: 'Veloce Logistics Corp',
    category: 'automation',
    rating: 5,
    metric: '100% Schema accuracy rate',
    quote: 'We hired Hafiz to inject pristine JSON-LD markup on our service pages. Not only is our structured data now error-free, but we have unlocked rich FAQ listings that boosted search CTR on day one.',
    logoBg: 'bg-purple-50 text-purple-700'
  }
];

export const DEFAULT_CONTACT_SUBMISSIONS: ContactSubmission[] = [
  {
    id: 'sub-1',
    fullName: 'Jonathan Stark',
    businessName: 'Stark Growth Inbound',
    email: 'jonathan@starkgrowth.io',
    phoneNumber: '+1 (555) 321-4567',
    websiteUrl: 'https://starkgrowth.io',
    serviceRequired: 'Technical SEO',
    subject: 'Core Web Vitals & Index Coverage Audit',
    message: 'Hello Hafiz, we are seeing major indexing drops since our React platform hydration update last month. We would love for you to audit our site architecture and schema setup as soon as possible.',
    date: '2026-07-04'
  }
];

