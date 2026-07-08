import React from 'react';
import { 
  Layers, 
  PenTool, 
  FileText,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { ActivePage, ArticleBrief, OutlineItem, ContentItem } from '../types';

interface HomeProps {
  setCurrentPage: (page: ActivePage) => void;
  briefs?: ArticleBrief[];
  outlines?: OutlineItem[];
  contents?: ContentItem[];
  setSelectedBriefId?: (id: string | null) => void;
  setSearchKeyword?: (keyword: string) => void;
  setActiveLibraryTab?: (tab: 'brief' | 'outline' | 'content') => void;
  setActiveLibraryItemId?: (id: string | null) => void;
  onToast?: (msg: string, type: 'success' | 'info') => void;
  homeConfig?: any;
  onAddBrief?: (b: ArticleBrief) => void;
  onAddOutline?: (o: OutlineItem) => void;
  onAddContent?: (c: ContentItem) => void;
}

export default function Home({ 
  setCurrentPage, 
  briefs = [], 
  outlines = [], 
  contents = [],
  setActiveLibraryTab,
  setActiveLibraryItemId,
  onToast
}: HomeProps) {

  const handleTabClick = (tab: 'brief' | 'outline' | 'content') => {
    if (setActiveLibraryTab) {
      setActiveLibraryTab(tab);
    }
    setCurrentPage('library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-white min-h-[calc(100vh-140px)] flex flex-col items-center justify-start py-10 px-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-50/50 to-emerald-50/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-emerald-50/30 to-emerald-50/5 blur-3xl" />

      {/* Main Container */}
      <div className="w-full max-w-3xl mx-auto space-y-10 mt-4 text-center">
        
        {/* Animated non-clickable SEO & Performance Results badge/button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center justify-center"
          id="seo-performance-badge-container"
        >
          <div className="animated-gradient-border-thin rounded-2xl p-[2px] shadow-sm select-none cursor-default">
            <div className="bg-slate-900 text-white font-extrabold text-xs px-6 py-3.5 rounded-[14px] tracking-wider uppercase flex items-center justify-center gap-2.5">
              <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>SEO & Performance Results</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
        </motion.div>

        {/* Tab Buttons & Counters Section */}
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="animated-tab-box-border rounded-[22px] shadow-lg inline-flex w-full sm:w-auto items-center justify-center">
            <div className="bg-white/95 p-3.5 rounded-[19px] flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              
              {/* Brief Tab Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="animated-gradient-border-thin rounded-2xl p-[2px] shadow-sm w-full sm:w-auto"
              >
                <button
                  onClick={() => handleTabClick('brief')}
                  className="bg-slate-900 text-white font-extrabold text-xs px-6 py-3.5 rounded-[14px] tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer w-full"
                >
                  <Layers className="h-4 w-4 text-emerald-400" />
                  <span>Brief</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                    {briefs.length}
                  </span>
                </button>
              </motion.div>

              {/* Outline Tab Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="animated-gradient-border-thin rounded-2xl p-[2px] shadow-sm w-full sm:w-auto"
              >
                <button
                  onClick={() => handleTabClick('outline')}
                  className="bg-slate-900 text-white font-extrabold text-xs px-6 py-3.5 rounded-[14px] tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer w-full"
                >
                  <PenTool className="h-4 w-4 text-cyan-400" />
                  <span>Outline</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                    {outlines.length}
                  </span>
                </button>
              </motion.div>

              {/* Content Tab Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="animated-gradient-border-thin rounded-2xl p-[2px] shadow-sm w-full sm:w-auto"
              >
                <button
                  onClick={() => handleTabClick('content')}
                  className="bg-slate-900 text-white font-extrabold text-xs px-6 py-3.5 rounded-[14px] tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer w-full"
                >
                  <FileText className="h-4 w-4 text-violet-400" />
                  <span>Content</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-violet-500/20 text-violet-400 rounded-full border border-violet-500/30">
                    {contents.length}
                  </span>
                </button>
              </motion.div>

              {/* Non-clickable SEO & Performance Results button inside the box */}
              <motion.div
                className="animated-gradient-border-thin rounded-2xl p-[2px] shadow-sm w-full sm:w-auto select-none pointer-events-none opacity-95"
              >
                <div
                  className="bg-slate-900 text-white font-extrabold text-xs px-6 py-3.5 rounded-[14px] tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-default"
                >
                  <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span>SEO & Performance Results</span>
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
