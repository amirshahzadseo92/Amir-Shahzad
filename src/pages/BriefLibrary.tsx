import React, { useState, useEffect } from 'react';
import { 
  Layers,
  PenTool,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ArticleBrief, ActivePage, OutlineItem, ContentItem } from '../types';

interface BriefLibraryProps {
  briefs: ArticleBrief[];
  outlines: OutlineItem[];
  contents: ContentItem[];
  setCurrentPage: (page: ActivePage) => void;
  setSelectedBriefId: (id: string | null) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  initialLibrary?: 'brief' | 'outline' | 'content' | 'write';
  onLibraryChange?: (library: 'brief' | 'outline' | 'content' | 'write') => void;
}

export default function BriefLibrary({
  briefs,
  outlines,
  contents,
  initialLibrary = 'brief',
  onLibraryChange,
}: BriefLibraryProps) {
  const [activeLibrary, setActiveLibrary] = useState<'brief' | 'outline' | 'content' | 'write'>(initialLibrary);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  useEffect(() => {
    setExpandedId(null);
  }, [activeLibrary]);

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 110, 
        damping: 15 
      } 
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Centered Portfolio Tab Navigation */}
      <div className="mb-8 flex flex-col items-center justify-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200 shadow-xs mb-1">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase font-mono text-slate-700">
            Portfolio Workspace
          </span>
        </div>
        
        <div className="inline-flex p-1.5 bg-slate-50 rounded-2xl border border-slate-200 flex-wrap justify-center gap-1.5 md:gap-2">
          <button
            onClick={() => handleLibraryTabChange('brief')}
            className={`flex items-center space-x-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeLibrary === 'brief'
                ? 'bg-emerald-600 text-white shadow shadow-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={listVariants}
                className="space-y-4 max-w-3xl mx-auto"
              >
                {briefs.length === 0 ? (
                  <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-white">
                    <p className="text-sm font-medium text-slate-400 font-sans">No topics published yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {briefs.map((brief) => {
                      const isExpanded = expandedId === brief.id;
                      return (
                        <motion.div 
                          key={brief.id} 
                          variants={itemVariants}
                          className="border border-slate-150 rounded-xl bg-white overflow-hidden transition-all shadow-2xs hover:border-emerald-100"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : brief.id)}
                            className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                          >
                            <span className={`text-base font-bold ${brief.titleColor || 'text-slate-800'} ${brief.fontStyle || 'font-sans'}`}>{brief.title}</span>
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono shrink-0 ml-4">
                              {isExpanded ? 'Hide' : 'Show'}
                            </span>
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-t border-slate-100"
                              >
                                <div className="px-5 pb-5 pt-4 whitespace-pre-wrap text-sm text-slate-600 leading-relaxed font-sans">
                                  {brief.fullBrief}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* VIEW 2: OUTLINE LIBRARY */}
            {activeLibrary === 'outline' && (
              <motion.div
                key="outline-library"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={listVariants}
                className="space-y-4 max-w-3xl mx-auto"
              >
                {outlines.length === 0 ? (
                  <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-white">
                    <p className="text-sm font-medium text-slate-400 font-sans">No outlines published yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {outlines.map((out) => {
                      const isExpanded = expandedId === out.id;
                      return (
                        <motion.div 
                          key={out.id} 
                          variants={itemVariants}
                          className="border border-slate-150 rounded-xl bg-white overflow-hidden transition-all shadow-2xs hover:border-emerald-100"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : out.id)}
                            className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                          >
                            <span className="text-base font-bold text-slate-800 font-sans">{out.title}</span>
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono shrink-0 ml-4">
                              {isExpanded ? 'Hide' : 'Show'}
                            </span>
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-t border-slate-100"
                              >
                                <div className="px-5 pb-5 pt-4 bg-slate-50/30 space-y-2">
                                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Outline Sections</h4>
                                  <ul className="list-decimal list-inside text-sm text-slate-600 space-y-1 font-sans">
                                    {out.sections.map((sec, idx) => (
                                      <li key={idx} className="font-sans">{sec}</li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* VIEW 3: CONTENT WRITE WORKSPACE */}
            {(activeLibrary === 'content' || activeLibrary === 'write') && (
              <motion.div
                key="content-write-library"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={listVariants}
                className="space-y-4 max-w-3xl mx-auto"
              >
                {contents.length === 0 ? (
                  <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-white">
                    <p className="text-sm font-medium text-slate-400 font-sans">No contents published yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {contents.map((cnt) => {
                      const isExpanded = expandedId === cnt.id;
                      return (
                        <motion.div 
                          key={cnt.id} 
                          variants={itemVariants}
                          className="border border-slate-150 rounded-xl bg-white overflow-hidden transition-all shadow-2xs hover:border-emerald-100"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : cnt.id)}
                            className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                          >
                            <span className="text-base font-bold text-slate-800 font-sans">{cnt.title}</span>
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono shrink-0 ml-4">
                              {isExpanded ? 'Hide' : 'Show'}
                            </span>
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-t border-slate-100"
                              >
                                <div className="px-5 pb-5 pt-4 whitespace-pre-wrap text-sm text-slate-600 leading-relaxed font-sans">
                                  {cnt.content}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>

        </div>

    </div>
  );
}
