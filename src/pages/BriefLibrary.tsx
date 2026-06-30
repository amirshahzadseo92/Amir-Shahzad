import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Filter, 
  AlertCircle, 
  RefreshCw, 
  Layers,
  BookOpen,
  PenTool,
  FileText,
  CheckSquare,
  Sparkles,
  Copy,
  X,
  DownloadCloud,
  Eye,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ArticleBrief, ActivePage } from '../types';
import { CATEGORIES } from '../data/mockData';
import BriefCard from '../components/BriefCard';

// Mock data for Outline templates
const MOCK_OUTLINES = [
  {
    id: 'out-1',
    title: 'High-Performance SaaS Product Landing Page Layout',
    category: 'SaaS',
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
    category: 'Technology',
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
    category: 'Marketing',
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
    category: 'E-commerce',
    wordCount: '1,200 - 1,500 words',
    headings: 5,
    entities: 32,
    score: 88,
    difficulty: 'Easy',
    sections: ['User Search Intent Mapping', 'Product Selection Guidelines', 'Value Proposition Callouts', 'Internal Linking Strategy'],
  }
];

// Mock data for ready-to-deploy optimized content
const MOCK_CONTENTS = [
  {
    id: 'cnt-1',
    title: 'Getting Started with Node.js Multi-Threading & Worker Pools',
    category: 'Technology',
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
    category: 'Marketing',
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
    category: 'SaaS',
    readTime: '10 min read',
    gradeLevel: 'Grade 11',
    density: '1.9%',
    summary: 'How decoupling content APIs from presentation layers enhances static site rendering speeds, improves core web vitals, and secures user interfaces.',
    keywords: ['GraphQL APIs', 'Decoupled Architecture', 'Static Site Rendering', 'Core Web Vitals'],
    content: `# Ultimate Guide to Headless CMS Architecture\n\nDecoupled architectures separate structured database elements from front-end layout presentations. Utilizing GraphQL APIs ensures lightning-fast hydration rates.\n\n### Performance Benchmarks\nStatic rendering speeds up Largest Contentful Paint (LCP) times, raising search results directly. Security is also significantly increased because databases aren't directly exposed on public domains.`
  }
];

// Boilerplate contents for the writing assistant templates
const WRITE_TEMPLATES = {
  tech: {
    name: 'Technical Article Blueprint',
    placeholder: 'Write your high-performance tech post here...',
    defaultText: `# Decoupled Backend Service Integration Guide\n\nTo ensure scalable and high performance APIs, we must build resilient database pipelines. This architecture prevents standard bottlenecks during peak concurrent traffic loops.\n\n### Step 1: Interface Definition\nBy implementing custom interface routers, we ensure seamless data transfer with headless CMS nodes. This optimization decreases response latencies significantly.\n\n### Step 2: System Validation\nRun global tests regularly to confirm pipeline integrity and secure authorization channels.`,
    keywords: ['performance', 'scalable', 'integration', 'architecture', 'optimization', 'API']
  },
  product: {
    name: 'SEO Product Comparison Layout',
    placeholder: 'Compare top products or frameworks...',
    defaultText: `# Framework A versus Framework B: The Definitive Verdict\n\nWhen evaluating modern rendering options, developers face a classic dilemma: prioritizing lightweight features or choosing enterprise support.\n\n### Pricing & Value Propositions\nBoth platforms offer generous free tiers. However, the premium pricing tiers are where major feature differences start appearing.\n\n### Speed Benchmarks\nIn terms of performance, Framework A wins with 30% faster static generation, making it the ultimate alternative for content networks.`,
    keywords: ['versus', 'pricing', 'features', 'performance', 'verdict', 'alternative']
  },
  saas: {
    name: 'High-Converting SaaS Copy',
    placeholder: 'Write engaging copy for your SaaS landing pages...',
    defaultText: `# Supercharge Your Daily Marketing Workflows\n\nMeet the first headless automation engine designed specifically to unlock enterprise revenue channels. Experience seamless integration in minutes.\n\n### Smooth User Onboarding\nOur streamlined setup ensures that writing teams start generating copy immediately, cutting typical onboarding cycles by 80%.\n\n### Launch Your Free Trial\nUnlock a smarter workflow today. Zero credit card required to start your team trial!`,
    keywords: ['seamless', 'automation', 'revenue', 'onboarding', 'trial', 'workflow']
  }
};

interface BriefLibraryProps {
  briefs: ArticleBrief[];
  setCurrentPage: (page: ActivePage) => void;
  setSelectedBriefId: (id: string | null) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  initialLibrary?: 'brief' | 'outline' | 'content' | 'write';
  onLibraryChange?: (library: 'brief' | 'outline' | 'content' | 'write') => void;
}

export default function BriefLibrary({
  briefs,
  setCurrentPage,
  setSelectedBriefId,
  searchKeyword,
  setSearchKeyword,
  initialLibrary = 'brief',
  onLibraryChange,
}: BriefLibraryProps) {
  // Navigation tabs state for Libraries Selector in Sidebar
  const [activeLibrary, setActiveLibrary] = useState<'brief' | 'outline' | 'content' | 'write'>(initialLibrary);
  const [isContentHubOpen, setIsContentHubOpen] = useState(true);

  // Keep state in sync with prop from Header / App.tsx
  useEffect(() => {
    if (initialLibrary) {
      setActiveLibrary(initialLibrary);
    }
  }, [initialLibrary]);

  const handleLibraryTabChange = (tab: 'brief' | 'outline' | 'content' | 'write') => {
    setActiveLibrary(tab);
    if (onLibraryChange) {
      onLibraryChange(tab);
    }
  };
  
  // Local state managers
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'volume'>('newest');

  // Writing assistant interactive states
  const [selectedWriteTemplate, setSelectedWriteTemplate] = useState<'tech' | 'product' | 'saas'>('tech');
  const [writingText, setWritingText] = useState(WRITE_TEMPLATES.tech.defaultText);
  const [isCopied, setIsCopied] = useState(false);

  // Content Preview modal simulation state
  const [activePreviewContent, setActivePreviewContent] = useState<typeof MOCK_CONTENTS[0] | null>(null);

  // Multi-tier filtering for primary briefs
  const filteredBriefs = useMemo(() => {
    return briefs.filter((brief) => {
      const keywordLower = searchKeyword.toLowerCase();
      const matchesSearch = 
        brief.title.toLowerCase().includes(keywordLower) ||
        brief.previewText.toLowerCase().includes(keywordLower) ||
        brief.keywords.some((k) => k.toLowerCase().includes(keywordLower)) ||
        brief.category.toLowerCase().includes(keywordLower);

      const matchesCategory = selectedCategory === 'All' || brief.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || brief.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    }).sort((a, b) => {
      if (sortBy === 'volume') {
        const volA = parseInt(a.searchVolume.replace(/[^0-9]/g, ''), 10) || 0;
        const volB = parseInt(b.searchVolume.replace(/[^0-9]/g, ''), 10) || 0;
        return volB - volA;
      }
      return 0;
    });
  }, [briefs, searchKeyword, selectedCategory, selectedDifficulty, sortBy]);

  // Load selected write assistant template boilerplate
  const handleLoadTemplate = (type: 'tech' | 'product' | 'saas') => {
    setSelectedWriteTemplate(type);
    setWritingText(WRITE_TEMPLATES[type].defaultText);
    setIsCopied(false);
  };

  const handleReadBrief = (id: string) => {
    setSelectedBriefId(id);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSortBy('newest');
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(writingText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Writing assistant real-time computations
  const stats = useMemo(() => {
    const textToAnalyze = writingText.trim();
    const words = textToAnalyze ? textToAnalyze.split(/\s+/).length : 0;
    const characters = textToAnalyze.length;
    
    // Simple reading level grade computation (simulated)
    let readingLevel = 'Beginner';
    if (words > 120) readingLevel = 'Intermediate';
    if (words > 220) readingLevel = 'Professional SEO copy';
    
    return { words, characters, readingLevel };
  }, [writingText]);

  // Dynamic keyword checking for writing assistant
  const checkedKeywords = useMemo(() => {
    const textLower = writingText.toLowerCase();
    const currentKeywords = WRITE_TEMPLATES[selectedWriteTemplate].keywords;
    return currentKeywords.map(kw => ({
      name: kw,
      included: textLower.includes(kw.toLowerCase())
    }));
  }, [writingText, selectedWriteTemplate]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Dynamic Header based on selected Library */}
      <div className="mb-10 text-center md:text-left md:flex md:items-end md:justify-between gap-4 border-b border-gray-100 pb-8">
        <div>
          <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase font-mono">
            {activeLibrary === 'brief' && 'Expert Blueprints'}
            {activeLibrary === 'outline' && 'Structural SEO Drafts'}
            {activeLibrary === 'content' && 'Ready Publications'}
            {activeLibrary === 'write' && 'Writing Workspace'}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mt-1">
            {activeLibrary === 'brief' && 'SEO Brief & Blueprint Library'}
            {activeLibrary === 'outline' && 'Premium Outline Library'}
            {activeLibrary === 'content' && 'Pre-Optimized Content Write Library'}
            {activeLibrary === 'write' && 'Interactive Write Library'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeLibrary === 'brief' && 'Analyze volume-backed article intents, entity maps, and technical layouts across high-growth domains.'}
            {activeLibrary === 'outline' && 'Export optimized skeleton drafts, structured subheading guides, and semantic entity lists.'}
            {activeLibrary === 'content' && 'Browse, review and download ready-to-publish articles written to fit strict search engine criteria inside the Content Write Library.'}
            {activeLibrary === 'write' && 'Draft your copywriting utilizing our real-time SEO scoring panel, keyword tracker and layout formats.'}
          </p>
        </div>
        

      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 items-start mb-10">
        
        {/* Left Sidebar Controller with Library Selector + Filters */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* LIBRARIES SELECTOR PANEL */}
          <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-3">
            <h3 className="text-2xs font-extrabold text-gray-400 tracking-widest uppercase font-mono mb-1">Library Hub</h3>
            <div className="space-y-2">
              {/* Parent Content Hub Button */}
              <button
                onClick={() => setIsContentHubOpen(!isContentHubOpen)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-extrabold transition-all border ${
                  isContentHubOpen 
                    ? 'bg-emerald-50/50 text-emerald-950 border-emerald-100/60 shadow-sm' 
                    : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50/80'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Layers className={`h-4.5 w-4.5 shrink-0 ${isContentHubOpen ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <span className="font-semibold text-gray-900">Content Hub</span>
                </div>
                {isContentHubOpen ? (
                  <ChevronDown className="h-4 w-4 text-emerald-600" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {/* Sub-libraries expanded when Content Hub is open */}
              <AnimatePresence initial={false}>
                {isContentHubOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    className="overflow-hidden pl-3 border-l-2 border-emerald-100 ml-4 space-y-1.5 pt-1"
                  >
                    <button
                      onClick={() => {
                        handleLibraryTabChange('write');
                        handleResetFilters();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        activeLibrary === 'write'
                          ? 'bg-emerald-600 text-white shadow shadow-emerald-100'
                          : 'text-gray-600 hover:bg-white hover:text-emerald-700 hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <PenTool className="h-3.5 w-3.5 shrink-0" />
                        <span>New Article</span>
                      </div>
                      <ChevronRight className={`h-3 w-3 opacity-60 ${activeLibrary === 'write' ? 'text-white' : ''}`} />
                    </button>

                    <button
                      onClick={() => {
                        handleLibraryTabChange('brief');
                        handleResetFilters();
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        activeLibrary === 'brief'
                          ? 'bg-emerald-600 text-white shadow shadow-emerald-100'
                          : 'text-gray-600 hover:bg-white hover:text-emerald-700 hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Layers className="h-3.5 w-3.5 shrink-0" />
                        <span>Brief Library</span>
                      </div>
                      <ChevronRight className={`h-3 w-3 opacity-60 ${activeLibrary === 'brief' ? 'text-white' : ''}`} />
                    </button>

                    <button
                      onClick={() => {
                        handleLibraryTabChange('outline');
                        handleResetFilters();
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        activeLibrary === 'outline'
                          ? 'bg-emerald-600 text-white shadow shadow-emerald-100'
                          : 'text-gray-600 hover:bg-white hover:text-emerald-700 hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span>Outline Library</span>
                      </div>
                      <ChevronRight className={`h-3 w-3 opacity-60 ${activeLibrary === 'outline' ? 'text-white' : ''}`} />
                    </button>

                    <button
                      onClick={() => {
                        handleLibraryTabChange('content');
                        handleResetFilters();
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        activeLibrary === 'content'
                          ? 'bg-emerald-600 text-white shadow shadow-emerald-100'
                          : 'text-gray-600 hover:bg-white hover:text-emerald-700 hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-3.5 w-3.5 shrink-0" />
                        <span>Content Write Library</span>
                      </div>
                      <ChevronRight className={`h-3 w-3 opacity-60 ${activeLibrary === 'content' ? 'text-white' : ''}`} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* DYNAMIC SIDEBAR CONTROLS (Only visible for Briefs / Outlines Search) */}
          {(activeLibrary === 'brief' || activeLibrary === 'outline') && (
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-xs font-bold text-gray-900 flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-emerald-600" />
                  <span>Filter Workspace</span>
                </h3>
                {(searchKeyword || selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
                  <button 
                    onClick={handleResetFilters}
                    className="text-xs text-gray-400 hover:text-emerald-600 transition-colors flex items-center space-x-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Search input */}
              <div className="space-y-1.5">
                <label htmlFor="library-search-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Search Keyword</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    id="library-search-input"
                    type="text"
                    placeholder="Search titles, concepts..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="space-y-1.5">
                <label htmlFor="difficulty-select" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Keyword Difficulty</label>
                <select
                  id="difficulty-select"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="All">All Intensities</option>
                  <option value="Easy">Easy (Low competition)</option>
                  <option value="Medium">Medium (Balanced)</option>
                  <option value="Hard">Hard (Enterprise authority)</option>
                </select>
              </div>

              {/* Sorting option */}
              <div className="space-y-1.5">
                <label htmlFor="sorting-select" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Sort Metrics By</label>
                <select
                  id="sorting-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="newest">Newest Releases</option>
                  <option value="volume">Search Volume (High to Low)</option>
                </select>
              </div>
            </div>
          )}

          {/* QUICK DOCUMENTATION HELP CARD */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-5 space-y-3">
            <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Apex Automation</span>
            </h4>
            <p className="text-2xs text-emerald-800 leading-relaxed font-medium">
              Switch libraries freely to explore ready-made publications, export master outlines, or draft high-performing blog copy in our real-time editor.
            </p>
          </div>

        </div>

        {/* Right Main Dynamic Display Area */}
        <div className="lg:col-span-3 space-y-6">
          
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: BRIEF LIBRARY (Primary Catalog) */}
            {activeLibrary === 'brief' && (
              <motion.div
                key="brief-library"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                {/* Category Horizontal Pills */}
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition-all border ${
                        selectedCategory === category
                          ? 'bg-emerald-600 text-white border-transparent shadow-sm shadow-emerald-50'
                          : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50 hover:text-emerald-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Briefs list layout */}
                {filteredBriefs.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center bg-gray-50/30">
                    <AlertCircle className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-base font-bold text-gray-900">No matching briefs found</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                      We could not find any SEO briefs matching those search parameters. Try resetting filters.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-5 inline-flex items-center justify-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5"
                    >
                      <span>Reset Filters</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {filteredBriefs.map((brief) => (
                      <BriefCard
                        key={brief.id}
                        brief={brief}
                        onRead={handleReadBrief}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* VIEW 2: OUTLINE LIBRARY */}
            {activeLibrary === 'outline' && (
              <motion.div
                key="outline-library"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-5">
                  {MOCK_OUTLINES.map((outline) => (
                    <div 
                      key={outline.id}
                      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                      
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="space-y-1">
                          <span className="text-2xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono uppercase">
                            {outline.category} TEMPLATE
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 mt-1">{outline.title}</h3>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-xs bg-gray-50 border border-gray-100 rounded-lg p-1.5 px-2.5 font-mono text-gray-500">
                          <span className="font-bold text-gray-900">{outline.score}/100</span>
                          <span className="text-gray-300">|</span>
                          <span>SEO Score</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 my-2 border-t border-b border-gray-50 text-xs">
                        <div className="space-y-0.5">
                          <span className="block text-gray-400 font-mono text-2xs uppercase">Target Length</span>
                          <span className="font-semibold text-gray-700">{outline.wordCount}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="block text-gray-400 font-mono text-2xs uppercase">Headings Required</span>
                          <span className="font-semibold text-gray-700">{outline.headings} optimized H2/H3s</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="block text-gray-400 font-mono text-2xs uppercase">Core Semantic Entities</span>
                          <span className="font-semibold text-gray-700">{outline.entities} LSI elements</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className="block text-2xs font-extrabold text-gray-400 uppercase tracking-wider font-mono mb-2">Outline Subsections Blueprint</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {outline.sections.map((section, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600 font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100/50">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span className="truncate">{section}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 mt-6 border-t border-gray-50 pt-4">
                        <button 
                          onClick={() => {
                            // Populate Write template
                            let writeKey: 'tech' | 'product' | 'saas' = 'tech';
                            if (outline.category === 'SaaS') writeKey = 'saas';
                            if (outline.category === 'Marketing') writeKey = 'product';
                            
                            handleLoadTemplate(writeKey);
                            setActiveLibrary('write');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-3.5 py-2 rounded-xl transition-all"
                        >
                          <PenTool className="h-3.5 w-3.5" />
                          <span>Load in Writer</span>
                        </button>
                        
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`Outline: ${outline.title}\n` + outline.sections.map((s, i) => `${i+1}. ${s}`).join('\n'));
                            alert(`Success: Copied SEO outline layout template of "${outline.title}" to your clipboard.`);
                          }}
                          className="flex items-center space-x-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition-all"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Structure</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* VIEW 3: CONTENT LIBRARY */}
            {activeLibrary === 'content' && (
              <motion.div
                key="content-library"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-5">
                  {MOCK_CONTENTS.map((contentItem) => (
                    <div 
                      key={contentItem.id}
                      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow transition-shadow"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div className="space-y-1">
                          <span className="text-2xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase font-mono">
                            {contentItem.category} ARTICLE
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 mt-1">{contentItem.title}</h3>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-2xs font-mono bg-gray-50 text-gray-400 p-1 px-2 rounded">
                          <span>{contentItem.readTime}</span>
                          <span>&#8226;</span>
                          <span>Grade Level: {contentItem.gradeLevel}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {contentItem.summary}
                      </p>

                      <div className="mb-4">
                        <span className="block text-2xs font-extrabold text-gray-400 uppercase tracking-wider font-mono mb-2">Optimized Keyword Clusters (Density: {contentItem.density})</span>
                        <div className="flex flex-wrap gap-1.5">
                          {contentItem.keywords.map((kw, i) => (
                            <span key={i} className="text-2xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-6 border-t border-gray-50 pt-4">
                        <span className="text-xs font-medium text-emerald-600 flex items-center space-x-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>100% SEO Optimised</span>
                        </span>

                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setActivePreviewContent(contentItem)}
                            className="flex items-center space-x-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition-all"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Preview Text</span>
                          </button>
                          
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(contentItem.content);
                              alert('Success: Copied full markdown content body to clipboard.');
                            }}
                            className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-3.5 py-2 rounded-xl transition-all"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Article</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* VIEW 4: WRITE LIBRARY (SEO Writing Assistant) */}
            {activeLibrary === 'write' && (
              <motion.div
                key="write-library"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 xl:grid-cols-3 gap-6"
              >
                
                {/* Editor column (col-span-2) */}
                <div className="xl:col-span-2 space-y-4">
                  
                  {/* Select writing template */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
                    <span className="block text-2xs font-extrabold text-gray-400 uppercase tracking-widest font-mono">Select Template Asset</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleLoadTemplate('tech')}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
                          selectedWriteTemplate === 'tech'
                            ? 'bg-emerald-600 text-white border-transparent shadow'
                            : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'
                        }`}
                      >
                        Technical Blueprint
                      </button>
                      <button
                        onClick={() => handleLoadTemplate('product')}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
                          selectedWriteTemplate === 'product'
                            ? 'bg-emerald-600 text-white border-transparent shadow'
                            : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'
                        }`}
                      >
                        Product Comparison
                      </button>
                      <button
                        onClick={() => handleLoadTemplate('saas')}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
                          selectedWriteTemplate === 'saas'
                            ? 'bg-emerald-600 text-white border-transparent shadow'
                            : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'
                        }`}
                      >
                        SaaS Page Copy
                      </button>
                    </div>
                  </div>

                  {/* Interactive Text Editor */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 flex flex-col h-[520px]">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-900 flex items-center space-x-1.5">
                        <ClipboardList className="h-4.5 w-4.5 text-emerald-600" />
                        <span>Interactive Writing Pad</span>
                      </h4>
                      <span className="text-2xs font-mono font-medium text-gray-400">
                        Type in editor to calculate realtime density targets
                      </span>
                    </div>

                    <textarea
                      value={writingText}
                      onChange={(e) => setWritingText(e.target.value)}
                      placeholder={WRITE_TEMPLATES[selectedWriteTemplate].placeholder}
                      className="w-full flex-grow rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 font-mono focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none overflow-y-auto leading-relaxed"
                    />

                    <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                      <button
                        onClick={() => setWritingText('')}
                        className="text-xs text-red-500 hover:text-red-700 font-bold transition-colors"
                      >
                        Clear Canvas
                      </button>

                      <button
                        onClick={handleCopyDraft}
                        className="flex items-center space-x-1.5 text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 px-4 py-2 rounded-xl transition-all shadow"
                      >
                        {isCopied ? (
                          <>
                            <CheckSquare className="h-3.5 w-3.5" />
                            <span>Copied Draft!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Final Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Score & Keyword Tracker Panel (col-span-1) */}
                <div className="space-y-6">
                  
                  {/* Realtime SEO Scoring card */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono border-b border-gray-50 pb-2">
                      SEO Scoring Panel
                    </h3>
                    
                    {/* Live score meter */}
                    <div className="text-center py-4 space-y-2">
                      <span className="block text-2xs font-bold text-gray-400 uppercase font-mono">Optimization Index</span>
                      
                      <div className="relative inline-flex items-center justify-center">
                        {/* Circle meter */}
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle cx="48" cy="48" r="40" stroke="#f3f4f6" strokeWidth="6" fill="transparent" />
                          <circle 
                            cx="48" 
                            cy="48" 
                            r="40" 
                            stroke="#10b981" 
                            strokeWidth="6" 
                            fill="transparent" 
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * Math.min(100, Math.floor((checkedKeywords.filter(k => k.included).length / checkedKeywords.length) * 100))) / 100}
                          />
                        </svg>
                        <div className="absolute text-xl font-black text-gray-900 font-mono">
                          {Math.floor((checkedKeywords.filter(k => k.included).length / checkedKeywords.length) * 100)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-0.5 bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                        <span className="block text-gray-400 font-mono text-2xs uppercase">Word Count</span>
                        <span className="font-extrabold text-gray-900 text-sm font-mono">{stats.words} words</span>
                      </div>
                      <div className="space-y-0.5 bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                        <span className="block text-gray-400 font-mono text-2xs uppercase">Reading Level</span>
                        <span className="font-extrabold text-gray-900 text-xs shrink-0 truncate">{stats.readingLevel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Realtime Target Keyword Checklist */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
                    <div className="border-b border-gray-50 pb-2">
                      <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">
                        Target Keyword Checklist
                      </h3>
                      <p className="text-2xs text-gray-400 mt-1">Include keywords in your draft above to light them green!</p>
                    </div>

                    <div className="space-y-2">
                      {checkedKeywords.map((kw, i) => (
                        <div 
                          key={i} 
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                            kw.included 
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-800 shadow-sm'
                              : 'bg-white border-gray-100 text-gray-500'
                          }`}
                        >
                          <span className="font-mono">{kw.name}</span>
                          <span className={`text-2xs uppercase px-1.5 py-0.5 rounded font-mono ${
                            kw.included ? 'bg-emerald-200 text-emerald-900 font-bold' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {kw.included ? 'Optimized' : 'Missing'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

      {/* POPUP: Content Library Markdown preview modal */}
      <AnimatePresence>
        {activePreviewContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePreviewContent(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-2xl z-10 flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div className="space-y-0.5">
                  <span className="text-2xs font-bold text-blue-600 uppercase font-mono tracking-wider">{activePreviewContent.category} Blueprint preview</span>
                  <h3 className="text-lg font-bold text-gray-900">{activePreviewContent.title}</h3>
                </div>
                <button 
                  onClick={() => setActivePreviewContent(null)}
                  className="rounded-lg p-1 hover:bg-gray-100 text-gray-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto py-5 text-sm text-gray-700 leading-relaxed font-mono whitespace-pre-line bg-gray-50/50 rounded-2xl p-4 my-4 border border-gray-100/50">
                {activePreviewContent.content}
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                <button 
                  onClick={() => setActivePreviewContent(null)}
                  className="rounded-xl border border-gray-200 text-gray-600 px-4 py-2 text-xs font-semibold hover:bg-gray-50"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(activePreviewContent.content);
                    alert('Success: Copied article to clipboard!');
                    setActivePreviewContent(null);
                  }}
                  className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-xs font-semibold hover:bg-emerald-500 shadow"
                >
                  Copy All Content
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
