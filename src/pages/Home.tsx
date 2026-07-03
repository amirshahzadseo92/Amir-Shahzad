import React, { useState, useEffect } from 'react';
import { Search, Compass, BookOpen, PenTool, CheckCircle, TrendingUp, Sparkles, ArrowRight, Star, ArrowUpRight, Cpu, Database, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ArticleBrief, ActivePage } from '../types';
import BriefCard from '../components/BriefCard';

interface HomeProps {
  briefs: ArticleBrief[];
  setCurrentPage: (page: ActivePage) => void;
  setSelectedBriefId: (id: string | null) => void;
  setSearchKeyword: (keyword: string) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
}

const LIVE_CRAWLS = [
  {
    seed: "Next.js 15 Crawler Engine",
    volume: "9.4k Vol",
    lcp: "1.2s (Excellent)",
    score: "98.4% (Perfect)",
    checks: ["Dynamic layout schemas generated", "12 Primary cluster nodes mapped"]
  },
  {
    seed: "Tailwind v4 CSS Compiler",
    volume: "4.1k Vol",
    lcp: "0.8s (Instant)",
    score: "99.2% (Perfect)",
    checks: ["CSS bundle sizes reduced by 40%", "LightningCSS node parsing successful"]
  },
  {
    seed: "SaaS SEO Automated Engine",
    volume: "8.4k Vol",
    lcp: "1.4s (Excellent)",
    score: "97.8% (Optimal)",
    checks: ["Generative search intents mapped", "Internal logical siloing completed"]
  },
  {
    seed: "Remix SSR Meta Stream",
    volume: "5.2k Vol",
    lcp: "1.1s (Excellent)",
    score: "98.1% (Optimal)",
    checks: ["Nested routing layouts resolved", "JSON-LD schema structured correctly"]
  }
];

const MARQUEE_ITEMS = [
  { keyword: 'SaaS SEO Strategy', volume: '12.4k/mo', score: '98%', status: 'Indexed' },
  { keyword: 'Next.js 15 SSR', volume: '8.2k/mo', score: '99%', status: 'Synced' },
  { keyword: 'B2B Link Acquisition', volume: '14.5k/mo', score: '97%', status: 'Active' },
  { keyword: 'Topic Cluster Maps', volume: '18.1k/mo', score: '99%', status: 'Indexed' },
  { keyword: 'Tailwind v4 Speed Index', volume: '6.4k/mo', score: '100%', status: 'Optimized' },
  { keyword: 'GEO Optimization Node', volume: '11.0k/mo', score: '98%', status: 'Scanned' },
  { keyword: 'AI Agent Pipelines', volume: '9.3k/mo', score: '97%', status: 'Active' },
];

export default function Home({
  briefs,
  setCurrentPage,
  setSelectedBriefId,
  setSearchKeyword,
  onToast,
}: HomeProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [crawlIndex, setCrawlIndex] = useState(0);

  // Auto-cycle the mockup terminal card to simulate real-time crawler updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCrawlIndex((prev) => (prev + 1) % LIVE_CRAWLS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredBriefs = briefs.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(localSearch);
    setCurrentPage('library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePopularSearch = (word: string) => {
    setLocalSearch(word);
    setSearchKeyword(word);
    setCurrentPage('library');
    onToast(`Filtering briefs by key phrase: "${word}"`, 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadBrief = (id: string) => {
    setSelectedBriefId(id);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-50/50 to-emerald-50/10 blur-3xl" />
      <div className="absolute top-[400px] left-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-emerald-50/30 to-emerald-50/5 blur-3xl" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Hero Texts */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-sm">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Smart SEO & Copywriting Redefined</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
              Create Content That <br />
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                Dominates Search Engine
              </span>{' '}
              Indexes
            </h1>

            <p className="max-w-2xl text-lg text-gray-500 leading-relaxed">
              Browse professional-grade article briefs, unlock semantic SEO outlines, or order complete ready-to-publish custom content verified by organic keyword experts.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  setCurrentPage('library');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 font-semibold text-sm transition-all shadow-lg hover:shadow-xl shadow-emerald-100 hover:scale-[1.01]"
              >
                <span>Browse Briefs</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-6 py-4 font-semibold text-sm transition-all"
              >
                <span>Order Custom Content</span>
              </button>
            </div>

            {/* Social Trust Metadata */}
            <div className="pt-8 border-t border-gray-100 flex flex-wrap items-center gap-6">
              <div className="flex -space-x-2">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-emerald-100 text-2xs font-bold flex items-center justify-center text-emerald-700 font-mono">JS</div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-amber-100 text-2xs font-bold flex items-center justify-center text-amber-700 font-mono">MV</div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-sky-100 text-2xs font-bold flex items-center justify-center text-sky-700 font-mono">TH</div>
              </div>
              <p className="text-xs text-gray-500">
                Trusted by <span className="font-bold text-gray-900">120+ high-growth SaaS brands</span> and inbound agencies worldwide.
              </p>
            </div>
          </div>

          {/* Right Hero Interactive Mockup Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-emerald-400/10 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-2xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">Apex OS Optimizer</span>
              </div>

              <div className="space-y-3 min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={crawlIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="p-3 bg-gray-50/80 rounded-xl space-y-1 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-3xs font-bold text-gray-400 font-mono flex items-center space-x-1">
                          <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
                          <span>ORGANIC ENTITY SEED</span>
                        </span>
                        <span className="text-3xs bg-emerald-500 text-white rounded px-1.5 py-0.5 font-mono text-[9px] animate-pulse">LIVE CRAWL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800">{LIVE_CRAWLS[crawlIndex].seed}</span>
                        <span className="text-2xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">{LIVE_CRAWLS[crawlIndex].volume}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-gray-50/80 rounded-xl space-y-1 border border-slate-100">
                        <span className="text-3xs font-bold text-gray-400 font-mono">LCP SPEED METRIC</span>
                        <span className="block text-sm font-extrabold text-emerald-600">{LIVE_CRAWLS[crawlIndex].lcp}</span>
                      </div>
                      <div className="p-3 bg-gray-50/80 rounded-xl space-y-1 border border-slate-100">
                        <span className="text-3xs font-bold text-gray-400 font-mono">OUTLINE SCORE</span>
                        <span className="block text-sm font-extrabold text-indigo-600">{LIVE_CRAWLS[crawlIndex].score}</span>
                      </div>
                    </div>

                    <div className="p-4 border border-dashed border-emerald-100 rounded-xl bg-emerald-50/10 space-y-2">
                      {LIVE_CRAWLS[crawlIndex].checks.map((check, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span className="text-xs font-semibold text-gray-800">{check}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gray-50/60 border-y border-gray-100 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Search Our SEO Brief Index</h2>
            <p className="text-sm text-gray-500">Locate pre-structured blueprints covering software strategy, framework comparisons, and growth channels</p>
          </div>

          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center relative">
            <label htmlFor="home-search-input" className="sr-only">Search article title or keyword</label>
            <div className="relative w-full shadow-md rounded-2xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                id="home-search-input"
                type="text"
                placeholder="Search by article title, keyword, or topic segment..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full rounded-2xl border border-transparent bg-white py-4 pl-12 pr-32 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-xs font-bold tracking-wide transition-all shadow-sm"
              >
                Search Index
              </button>
            </div>
          </form>

          {/* Popular searches suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-semibold text-gray-400">Popular Searches:</span>
            {['SaaS SEO', 'Next.js 15', 'Link Building', 'Topic Clustering'].map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                className="rounded-full bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 text-xs text-gray-600 hover:text-emerald-800 px-3 py-1 font-medium transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Live Crawler Marquee */}
      <section className="bg-slate-950 text-white overflow-hidden py-5 border-y border-emerald-500/20 shadow-inner relative">
        <div className="mx-auto max-w-7xl px-4 mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-3xs font-extrabold tracking-wider font-mono text-emerald-400 uppercase">Live Indexing & Crawler Stream</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">Active Nodes: 128/128 • Speed: 42.8ms/node • Health: 100%</span>
        </div>

        <div className="relative flex overflow-x-hidden">
          {/* Gradients to fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 22,
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap gap-6"
          >
            {/* Duplicate the items to make the infinite scroll seamless */}
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-3 bg-slate-900 rounded-xl px-4 py-2.5 border border-slate-800 hover:border-emerald-500/30 transition-colors"
              >
                <div className="rounded-full bg-emerald-500/10 p-1 shrink-0">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                </div>
                <span className="text-xs font-bold text-slate-100">{item.keyword}</span>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">Vol: {item.volume}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-900/30 shrink-0">
                  Score: {item.score}
                </span>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-900/30 uppercase tracking-wider text-2xs shrink-0">
                  {item.status}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Briefs */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end mb-12">
          <div className="space-y-1.5">
            <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase font-mono">Curated Selection</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Featured Inbound Briefs</h2>
            <p className="text-sm text-gray-500 max-w-xl">
              Explore high-performance research nodes created for immediate execution. Read full summaries for free.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('library');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline self-start sm:self-auto"
          >
            <span>View Complete Library</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Brief Grid Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredBriefs.map((brief) => (
            <BriefCard
              key={brief.id}
              brief={brief}
              onRead={handleReadBrief}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50/50 border-t border-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase font-mono">Operational Workflow</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">How Apex OS Scales Your Traffic</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              Our seamless, professional modular system takes the guesswork out of strategic marketing content.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col items-center text-center relative group hover:border-emerald-200 transition-colors">
              <div className="absolute -top-4 bg-emerald-600 text-white font-mono font-bold text-xs h-8 w-8 rounded-full flex items-center justify-center shadow">
                1
              </div>
              <div className="rounded-xl bg-emerald-50 p-4 text-emerald-600 mb-6 mt-2">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Browse Free Briefs</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Filter our extensive, categorized library for high-intent queries that perfectly match your industry and customer needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col items-center text-center relative group hover:border-emerald-200 transition-colors">
              <div className="absolute -top-4 bg-emerald-600 text-white font-mono font-bold text-xs h-8 w-8 rounded-full flex items-center justify-center shadow">
                2
              </div>
              <div className="rounded-xl bg-teal-50 p-4 text-teal-600 mb-6 mt-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Unlock Premium Outline</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Unlock granular, developer-ready headers, LCP guidelines, and keyword distribution grids to instantly guide your authors.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col items-center text-center relative group hover:border-emerald-200 transition-colors">
              <div className="absolute -top-4 bg-emerald-600 text-white font-mono font-bold text-xs h-8 w-8 rounded-full flex items-center justify-center shadow">
                3
              </div>
              <div className="rounded-xl bg-emerald-50 p-4 text-emerald-600 mb-6 mt-2">
                <PenTool className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Order Custom Content</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Let our elite, technical copywriting agency write the article. Fully polished, complete with schema, and ready to post.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
