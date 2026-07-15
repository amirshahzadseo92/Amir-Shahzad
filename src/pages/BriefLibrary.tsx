import React, { useState, useEffect } from 'react';
import { 
  Layers,
  PenTool,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Cpu,
  AlertCircle,
  X, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage, ArticleBrief, OutlineItem, ContentItem, SeoImage } from '../types';

interface BriefLibraryProps {
  briefs: ArticleBrief[];
  outlines: OutlineItem[];
  contents: ContentItem[];
  setCurrentPage: (page: ActivePage) => void;
  setSelectedBriefId: (id: string | null) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  initialLibrary?: 'brief' | 'outline' | 'content' | 'seo';
  onLibraryChange?: (library: 'brief' | 'outline' | 'content' | 'seo') => void;
  activeLibraryItemId?: string | null;
  setActiveLibraryItemId?: (id: string | null) => void;
  onAddBrief?: (b: ArticleBrief) => void;
  onAddOutline?: (o: OutlineItem) => void;
  onAddContent?: (c: ContentItem) => void;
  onDeleteBrief?: (id: string) => void;
  onDeleteOutline?: (id: string) => void;
  onDeleteContent?: (id: string) => void;
  onClearAll?: () => void;
  onNavigateToSeo?: () => void;
  seoImages?: SeoImage[];
  onToast?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export default function BriefLibrary({
  briefs,
  outlines,
  contents,
  setCurrentPage,
  setSelectedBriefId,
  initialLibrary = 'brief',
  onLibraryChange,
  activeLibraryItemId,
  setActiveLibraryItemId,
  onAddBrief,
  onAddOutline,
  onAddContent,
  onDeleteBrief,
  onDeleteOutline,
  onDeleteContent,
  onClearAll,
  onNavigateToSeo,
  seoImages = [],
  onToast,
}: BriefLibraryProps) {
  const [activeTab, setActiveTab] = useState<'brief' | 'outline' | 'content' | 'seo'>(() => {
    if (initialLibrary === 'content') return 'content';
    if (initialLibrary === 'outline') return 'outline';
    if (initialLibrary === 'seo') return 'seo';
    return 'brief';
  });

  // Generator states
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [generationType, setGenerationType] = useState<'brief' | 'outline' | 'content'>('brief');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationLog, setGenerationLog] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Track expanded item IDs for Briefs, Outlines and Contents
  const [expandedBriefId, setExpandedBriefId] = useState<string | null>(null);
  const [expandedOutlineId, setExpandedOutlineId] = useState<string | null>(null);
  const [expandedContentId, setExpandedContentId] = useState<string | null>(null);

  // SEO image modal
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);

  useEffect(() => {
    if (initialLibrary) {
      setActiveTab(initialLibrary);
    }
  }, [initialLibrary]);

  useEffect(() => {
    if (activeLibraryItemId) {
      if (activeTab === 'brief') {
        setExpandedBriefId(activeLibraryItemId);
      } else if (activeTab === 'outline') {
        setExpandedOutlineId(activeLibraryItemId);
      } else if (activeTab === 'content') {
        setExpandedContentId(activeLibraryItemId);
      }
      if (setActiveLibraryItemId) {
        // Clear it after applying so the user can interact freely
        setActiveLibraryItemId(null);
      }
    }
  }, [activeLibraryItemId, activeTab]);

  const handleTabChange = (tab: 'brief' | 'outline' | 'content' | 'seo') => {
    setActiveTab(tab);
    if (onLibraryChange) {
      onLibraryChange(tab);
    }
  };

  const toggleBrief = (id: string) => {
    setExpandedBriefId(expandedBriefId === id ? null : id);
  };

  const toggleOutline = (id: string) => {
    setExpandedOutlineId(expandedOutlineId === id ? null : id);
  };

  const toggleContent = (id: string) => {
    setExpandedContentId(expandedContentId === id ? null : id);
  };

  // Automated Writer / Generator Handler
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGenerationError(null);
    setGenerationProgress(5);
    setGenerationLog('Connecting to Gemini-3.5 high-performance API gateway...');

    // Progress bar simulation interval
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        
        // Dynamic logs based on progress
        if (prev < 25) {
          setGenerationLog('Analyzing topic SEO entities and search intent...');
        } else if (prev < 50) {
          setGenerationLog('Synthesizing high-density LCP structure nodes...');
        } else if (prev < 75) {
          setGenerationLog(`Drafting comprehensive ${generationType} in ${language} language...`);
        } else {
          setGenerationLog('Formatting W3C plain text compliance nodes safely...');
        }

        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 250);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: topic.trim(),
          language,
          type: generationType
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate. Please check dev server connections.');
      }

      const data = await response.json();
      clearInterval(interval);
      setGenerationProgress(100);
      setGenerationLog('Asset compiled successfully!');

      if (data.success && data.content) {
        if (generationType === 'brief') {
          const newBrief: ArticleBrief = {
            id: `brief-${Date.now()}`,
            title: topic.trim(),
            category: 'AI Strategy',
            previewText: data.content.slice(0, 180).trim() + '...',
            fullBrief: data.content,
            keywords: [topic.trim(), 'Best Practices', 'SEO Plan', `${language} Edition`],
            targetAudience: `Target audiences seeking professional-grade insights about ${topic.trim()} in ${language}.`,
            searchVolume: `${1 + Math.floor(Math.random() * 19)}K/mo`,
            difficulty: Math.random() > 0.5 ? 'Medium' : 'Hard',
            status: 'Free',
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          };
          if (onAddBrief) onAddBrief(newBrief);
          setActiveTab('brief');
        } else if (generationType === 'outline') {
          // split lines and filter meaningful outline structures
          const sectionList = data.content
            .split('\n')
            .map((line: string) => line.trim())
            .filter((line: string) => line.length > 0 && (line.startsWith('•') || line.match(/^[IVX]+\./) || line.startsWith('-') || line.length > 10))
            .slice(0, 10);

          const newOutline: OutlineItem = {
            id: `outline-${Date.now()}`,
            title: topic.trim(),
            category: 'AI Structure',
            wordCount: `${1200 + Math.floor(Math.random() * 1600)} words`,
            headings: sectionList.length || 7,
            entities: 18 + Math.floor(Math.random() * 15),
            score: 86 + Math.floor(Math.random() * 13),
            difficulty: 'Medium',
            sections: sectionList.length ? sectionList : [
              'I. INTRODUCTION & PROBLEM DEFINITION',
              'II. UNDERLYING CONCEPTUAL PRINCIPLES',
              'III. TACTICAL ACTION STEP-BY-STEP PLAYBOOK',
              'IV. EVALUATION & ONGOING OPTIMIZATION METRICS'
            ],
          };
          if (onAddOutline) onAddOutline(newOutline);
          setActiveTab('outline');
        } else if (generationType === 'content') {
          const newContent: ContentItem = {
            id: `content-${Date.now()}`,
            title: topic.trim(),
            category: 'AI Article',
            readTime: `${6 + Math.floor(Math.random() * 8)} min read`,
            gradeLevel: 'Grade 10',
            density: `${(1.3 + Math.random() * 1.2).toFixed(1)}%`,
            summary: `Expertly crafted comprehensive ${language} research article focusing on ${topic.trim()} to drive high engagement.`,
            keywords: [topic.trim(), 'organic seo', 'conversion growth'],
            content: data.content
          };
          if (onAddContent) onAddContent(newContent);
          setActiveTab('content');
        }

        // Clean topic input on success
        setTopic('');
      } else {
        throw new Error('Invalid content payload received from system.');
      }
    } catch (err: any) {
      clearInterval(interval);
      setGenerationError(err.message || 'An error occurred during Gemini writing pipeline.');
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
      }, 1500);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
           {/* Dynamic Tab Navigation Buttons */}
      <div className="mb-12 flex flex-col items-center justify-center animate-fadeIn w-full max-w-md mx-auto">
        <div className="animated-tab-box-border rounded-[24px] shadow-lg w-full p-[2px]">
          <div className="bg-[#050b14]/95 p-5 rounded-[22px] flex flex-col gap-4 w-full border border-slate-800">
          
            {/* Brief Tab Button */}
            {activeTab === 'brief' ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#091E0F] border-2 border-emerald-500 rounded-xl p-4 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-between cursor-pointer"
                onClick={() => handleTabChange('brief')}
              >
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-extrabold text-sm uppercase tracking-wider">Brief</span>
                </div>
                <span className="px-3 py-1 text-xs font-black bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 font-mono">
                  {briefs.length}
                </span>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-950/40 hover:bg-slate-900/60 border border-slate-850 hover:border-slate-700 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300"
                onClick={() => handleTabChange('brief')}
              >
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-slate-500" />
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Brief</span>
                </div>
                <span className="px-3 py-1 text-xs font-bold bg-slate-900 text-slate-500 rounded-full border border-slate-800 font-mono">
                  {briefs.length}
                </span>
              </motion.div>
            )}

            {/* Outline Tab Button */}
            {activeTab === 'outline' ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#0c2331] border-2 border-cyan-500 rounded-xl p-4 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-between cursor-pointer"
                onClick={() => handleTabChange('outline')}
              >
                <div className="flex items-center gap-3">
                  <PenTool className="h-5 w-5 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 font-extrabold text-sm uppercase tracking-wider">Outline</span>
                </div>
                <span className="px-3 py-1 text-xs font-black bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30 font-mono">
                  {outlines.length}
                </span>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-950/40 hover:bg-slate-900/60 border border-slate-850 hover:border-slate-700 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300"
                onClick={() => handleTabChange('outline')}
              >
                <div className="flex items-center gap-3">
                  <PenTool className="h-5 w-5 text-slate-500" />
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Outline</span>
                </div>
                <span className="px-3 py-1 text-xs font-bold bg-slate-900 text-slate-500 rounded-full border border-slate-800 font-mono">
                  {outlines.length}
                </span>
              </motion.div>
            )}

            {/* Content Tab Button */}
            {activeTab === 'content' ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#1b1236] border-2 border-violet-500 rounded-xl p-4 shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center justify-between cursor-pointer"
                onClick={() => handleTabChange('content')}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-violet-400 animate-pulse" />
                  <span className="text-violet-400 font-extrabold text-sm uppercase tracking-wider">Content</span>
                </div>
                <span className="px-3 py-1 text-xs font-black bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30 font-mono">
                  {contents.length}
                </span>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-950/40 hover:bg-slate-900/60 border border-slate-850 hover:border-slate-700 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300"
                onClick={() => handleTabChange('content')}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-slate-500" />
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Content</span>
                </div>
                <span className="px-3 py-1 text-xs font-bold bg-slate-900 text-slate-500 rounded-full border border-slate-800 font-mono">
                  {contents.length}
                </span>
              </motion.div>
            )}

            {/* SEO & Performance Results Button */}
            {activeTab === 'seo' ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#1e190b] border-2 border-amber-500 rounded-xl p-4 shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-between cursor-pointer"
                onClick={() => handleTabChange('seo')}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
                  <span className="text-amber-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider">SEO & Performance</span>
                </div>
                <TrendingUp className="h-4.5 w-4.5 text-amber-400 animate-bounce" />
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-950/40 hover:bg-slate-900/60 border border-slate-850 hover:border-slate-700 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300"
                onClick={() => handleTabChange('seo')}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-slate-500" />
                  <span className="text-slate-400 font-bold text-xs sm:text-sm uppercase tracking-wider">SEO & Performance</span>
                </div>
                <TrendingUp className="h-4.5 w-4.5 text-slate-500" />
              </motion.div>
            )}

          </div>
        </div>
      </div>

      {/* Main Content Display Area */}
      <div className="w-full max-w-3xl mx-auto animate-fadeIn mt-6">
        <div className="flex flex-col transition-all duration-350 min-h-[350px]">
          
          {/* Header Row with Active Category title and Clear All Action */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100/80">
            <h2 className="text-sm sm:text-base font-bold text-slate-800 capitalize font-sans flex items-center gap-2">
              {activeTab === 'brief' && <Layers className="h-5 w-5 text-emerald-600" />}
              {activeTab === 'outline' && <PenTool className="h-5 w-5 text-cyan-600" />}
              {activeTab === 'content' && <FileText className="h-5 w-5 text-violet-600" />}
              {activeTab === 'seo' && <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />}
              <span>{activeTab === 'seo' ? 'SEO & Performance Results' : `${activeTab}s Library`}</span>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                {activeTab === 'brief' ? briefs.length : activeTab === 'outline' ? outlines.length : activeTab === 'content' ? contents.length : 'Live'}
              </span>
            </h2>
            

          </div>

          <AnimatePresence mode="wait">

            {/* VIEW 1: BRIEF */}
            {activeTab === 'brief' && (
              <motion.div
                key="brief"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left flex-1 flex flex-col justify-between"
              >
                <div>
                  {briefs.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm font-medium font-sans">
                      No briefs published yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {briefs.map((brief) => {
                        const isExpanded = expandedBriefId === brief.id;
                        return (
                          <div 
                            key={brief.id} 
                            className={`rounded-2xl transition-all duration-300 ${
                              isExpanded 
                                ? 'animated-gradient-border-thin shadow-md scale-[1.01]' 
                                : 'border border-slate-200/80 bg-white hover:border-slate-300 shadow-3xs hover:scale-[1.005]'
                            }`}
                          >
                            <div className="bg-white rounded-[13px] overflow-hidden">
                              {/* Header bar (clickable) */}
                              <div 
                                className="p-5 cursor-pointer hover:bg-slate-50/50 flex items-center justify-between gap-4"
                                onClick={() => toggleBrief(brief.id)}
                              >
                                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                                  {brief.title}
                                </h3>
                                <div className="flex items-center gap-2 shrink-0">

                                  <div className="text-slate-400 hover:text-slate-600 shrink-0">
                                    {isExpanded ? (
                                      <ChevronUp className="h-5 w-5" />
                                    ) : (
                                      <ChevronDown className="h-5 w-5" />
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Expandable brief content */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden bg-slate-50 border-t border-slate-100"
                                  >
                                    <div className="p-6 sm:p-8 space-y-4">
                                      <div className="border border-slate-200 bg-white rounded-xl p-5 shadow-3xs">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Topic:</div>
                                        <h4 className="text-base font-bold text-slate-900 mb-4">{brief.title}</h4>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Article / Content:</div>
                                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                                          {brief.fullBrief || brief.previewText}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* VIEW 2: OUTLINE */}
            {activeTab === 'outline' && (
              <motion.div
                key="outline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left flex-1 flex flex-col justify-between"
              >
                <div>
                  {outlines.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm font-medium font-sans">
                      No outlines published yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {outlines.map((outline) => {
                        const isExpanded = expandedOutlineId === outline.id;
                        return (
                          <div 
                            key={outline.id} 
                            className={`rounded-2xl transition-all duration-300 ${
                              isExpanded 
                                ? 'animated-gradient-border-thin shadow-md scale-[1.01]' 
                                : 'border border-slate-200/80 bg-white hover:border-slate-300 shadow-3xs hover:scale-[1.005]'
                            }`}
                          >
                            <div className="bg-white rounded-[13px] overflow-hidden">
                              {/* Header bar (clickable) */}
                              <div 
                                className="p-5 cursor-pointer hover:bg-slate-50/50 flex items-center justify-between gap-4"
                                onClick={() => toggleOutline(outline.id)}
                              >
                                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                                  {outline.title}
                                </h3>
                                <div className="flex items-center gap-2 shrink-0">

                                  <div className="text-slate-400 hover:text-slate-600 shrink-0">
                                    {isExpanded ? (
                                      <ChevronUp className="h-5 w-5" />
                                    ) : (
                                      <ChevronDown className="h-5 w-5" />
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Expandable outline content */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden bg-slate-50 border-t border-slate-100"
                                  >
                                    <div className="p-6 sm:p-8 space-y-4">
                                      <div className="border border-slate-200 bg-white rounded-xl p-5 shadow-3xs">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Topic:</div>
                                        <h4 className="text-base font-bold text-slate-900 mb-4">{outline.title}</h4>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Article / Content:</div>
                                        <div className="space-y-2 mt-2">
                                          {outline.sections.map((section, idx) => (
                                            <p key={idx} className="text-xs sm:text-sm font-semibold text-slate-800">
                                              {section}
                                            </p>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* VIEW 3: CONTENT */}
            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left flex-1 flex flex-col justify-between"
              >
                <div>
                  {contents.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm font-medium font-sans">
                      No content published yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {contents.map((contentItem) => {
                        const isExpanded = expandedContentId === contentItem.id;
                        return (
                          <div 
                            key={contentItem.id} 
                            className={`rounded-2xl transition-all duration-300 ${
                              isExpanded 
                                ? 'animated-gradient-border-thin shadow-md scale-[1.01]' 
                                : 'border border-slate-200/80 bg-white hover:border-slate-300 shadow-3xs hover:scale-[1.005]'
                            }`}
                          >
                            <div className="bg-white rounded-[13px] overflow-hidden">
                              {/* Header bar (clickable) */}
                              <div 
                                className="p-5 cursor-pointer hover:bg-slate-50/50 flex items-center justify-between gap-4"
                                onClick={() => toggleContent(contentItem.id)}
                              >
                                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                                  {contentItem.title}
                                </h3>
                                <div className="flex items-center gap-2 shrink-0">

                                  <div className="text-slate-400 hover:text-slate-600 shrink-0">
                                    {isExpanded ? (
                                      <ChevronUp className="h-5 w-5" />
                                    ) : (
                                      <ChevronDown className="h-5 w-5" />
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Expandable content area */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden bg-slate-50 border-t border-slate-100"
                                  >
                                    <div className="p-6 sm:p-8 space-y-4">
                                      <div className="border border-slate-200 bg-white rounded-xl p-5 shadow-3xs">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Topic:</div>
                                        <h4 className="text-base font-bold text-slate-900 mb-4">{contentItem.title}</h4>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Article / Content:</div>
                                        <article className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                                          {contentItem.content}
                                        </article>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* VIEW 4: SEO & PERFORMANCE RESULTS */}
            {activeTab === 'seo' && (
              <motion.div
                key="seo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 flex-1 flex flex-col justify-start"
              >
                <div className="w-full">
                  {seoImages.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8">
                      {seoImages.map((img) => (
                        <div key={img.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                          <h4 className="font-extrabold text-slate-800 text-base mb-4 text-center">{img.title || img.imageName || 'Transformation'}</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div 
                              className="group cursor-pointer flex flex-col items-center"
                              onClick={() => setSelectedImageModal(img.beforeImage || img.originalImage || '')}
                            >
                              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex justify-between w-full px-1">
                                <span>Before</span>
                                <span className="font-mono text-slate-400">{( (img.originalSize || 0) / 1024).toFixed(1)} KB</span>
                              </div>
                              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm transition-transform transform group-hover:scale-[1.02]">
                                <img 
                                  src={img.beforeImage || img.originalImage} 
                                  alt="Before Transformation" 
                                  className="w-full h-auto object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>
                            <div 
                              className="group cursor-pointer flex flex-col items-center"
                              onClick={() => setSelectedImageModal(img.afterImage || img.optimizedImage || '')}
                            >
                              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 flex justify-between w-full px-1">
                                <span>After</span>
                                <span className="font-mono text-emerald-500">{( (img.optimizedSize || 0) / 1024).toFixed(1)} KB</span>
                              </div>
                              <div className="rounded-xl overflow-hidden border border-emerald-200 shadow-sm transition-transform transform group-hover:scale-[1.02]">
                                <img 
                                  src={img.afterImage || img.optimizedImage} 
                                  alt="After Transformation" 
                                  className="w-full h-auto object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-slate-400 text-sm font-medium font-sans flex flex-col items-center">
                      <Sparkles className="h-8 w-8 text-slate-300 mb-4 animate-pulse" />
                      No SEO & Performance screenshot uploaded yet.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImageModal(null)}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImageModal}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
            <button 
              className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors cursor-pointer bg-slate-800/50 hover:bg-slate-800 p-2 rounded-full"
              onClick={() => setSelectedImageModal(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
