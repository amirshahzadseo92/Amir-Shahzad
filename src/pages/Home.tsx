import React from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
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
}: HomeProps) {
  return (
    <div className="bg-white min-h-[calc(100vh-140px)] w-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-emerald-50 to-cyan-50 blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-cyan-50 to-emerald-50 blur-3xl opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[1.75rem] sm:text-4xl md:text-6xl font-black tracking-tight font-display whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          >
            HAFIZ AMIR SHAHZAD
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-bold tracking-widest text-slate-500 uppercase font-display"
          >
            SEO & DEVELOPMENT SPECIALIST
          </motion.h2>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Helping Businesses Grow Through SEO, Content Strategy & Web Development.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto text-sm tracking-wide group"
          >
            Hire Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setCurrentPage('library')}
            className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold py-3.5 px-8 rounded-full transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 w-full sm:w-auto text-sm tracking-wide"
          >
            <Briefcase className="w-4 h-4 text-emerald-500" />
            View Portfolio
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
