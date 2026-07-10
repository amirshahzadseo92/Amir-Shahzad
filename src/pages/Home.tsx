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
        initial={{ opacity: 0, y: 20, borderColor: "rgba(0, 0, 0, 0.1)" }}
        animate={{ 
          opacity: 1, 
          y: 0,
          borderColor: ["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0.1)"]
        }}
        transition={{ 
          default: { duration: 0.8, ease: "easeOut" },
          borderColor: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }}
        className="max-w-3xl w-[96%] sm:w-full mx-auto space-y-8 bg-white/80 backdrop-blur-xl border-2 p-4 min-[400px]:p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)]"
      >
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[1.35rem] min-[400px]:text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight font-luxury whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600"
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
          <motion.button 
            animate={{ 
              scale: [1, 1.03, 1],
              backgroundColor: ["#0f172a", "#064e3b", "#0f172a"], // slate-900 to emerald-900 to slate-900
              boxShadow: [
                "0px 4px 6px rgba(0,0,0,0.1)", 
                "0px 10px 15px rgba(16,185,129,0.3)", 
                "0px 4px 6px rgba(0,0,0,0.1)"
              ]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('contact')}
            className="text-white font-bold py-3.5 px-8 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto text-sm tracking-wide group"
          >
            Hire Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button 
            animate={{ 
              scale: [1, 1.03, 1],
              borderColor: ["#e2e8f0", "#10b981", "#e2e8f0"],
              backgroundColor: ["#ffffff", "#f0fdf4", "#ffffff"]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('library')}
            className="text-slate-900 border-2 font-bold py-3.5 px-8 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto text-sm tracking-wide shadow-sm"
          >
            <Briefcase className="w-4 h-4 text-emerald-500" />
            View Portfolio
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
