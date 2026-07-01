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
  const [customKeywords, setCustomKeywords] = useState<string[] | null>(null);

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
    setCustomKeywords(null);
    setIsCopied(false);
  };

  const handleLoadContent = (contentItem: typeof MOCK_CONTENTS[0]) => {
    setWritingText(contentItem.content);
    setCustomKeywords(contentItem.keywords);
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
    const currentKeywords = customKeywords || WRITE_TEMPLATES[selectedWriteTemplate].keywords;
    return currentKeywords.map(kw => ({
      name: kw,
      included: textLower.includes(kw.toLowerCase())
    }));
  }, [writingText, selectedWriteTemplate, customKeywords]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Centered Portfolio Tab Navigation */}
      <div className="mb-12 flex flex-col items-center justify-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-1.5 rounded-full border border-emerald-150 shadow-xs mb-1">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase font-display bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 bg-clip-text text-transparent">
            Portfolio Workspace
          </span>
        </div>
        
        <div className="inline-flex p-1.5 bg-gray-50 rounded-2xl border border-gray-100 flex-wrap justify-center gap-1.5 md:gap-2">
          <button
            onClick={() => handleLibraryTabChange('brief')}
            className={`flex items-center space-x-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeLibrary === 'brief'
                ? 'bg-emerald-600 text-white shadow shadow-emerald-200'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Layers className="h-4 w-4 shrink-0" />
            <span>Brief</span>
          </button>

          <button
            onClick={() => handleLibraryTabChange('outline')}
            className={`flex items-center space-x-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeLibrary === 'outline'
                ? 'bg-emerald-600 text-white shadow shadow-emerald-200'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span>Outline</span>
          </button>

          <button
            onClick={() => handleLibraryTabChange('content')}
            className={`flex items-center space-x-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeLibrary === 'content' || activeLibrary === 'write'
                ? 'bg-emerald-600 text-white shadow shadow-emerald-200'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <PenTool className="h-4 w-4 shrink-0" />
            <span>Content Write</span>
          </button>
        </div>
      </div>

      {/* Main Full Width Dynamic Display Area */}
      <div className="w-full space-y-6">
        
        <AnimatePresence mode="wait">
            
            {/* VIEW 1: BRIEF LIBRARY (Primary Catalog) */}
            {activeLibrary === 'brief' && (
              <motion.div
                key="brief-library"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="min-h-[300px]"
              />
            )}

            {/* VIEW 2: OUTLINE LIBRARY */}
            {activeLibrary === 'outline' && (
              <motion.div
                key="outline-library"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="min-h-[300px]"
              />
            )}

            {/* VIEW 3 & 4: UNIFIED CONTENT WRITE WORKSPACE */}
            {(activeLibrary === 'content' || activeLibrary === 'write') && (
              <motion.div
                key="content-write-library"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="min-h-[300px]"
              />
            )}

          </AnimatePresence>

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
