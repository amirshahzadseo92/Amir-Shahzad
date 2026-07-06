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
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage, ArticleBrief, OutlineItem, ContentItem } from '../types';

interface BriefLibraryProps {
  briefs: ArticleBrief[];
  outlines: OutlineItem[];
  contents: ContentItem[];
  setCurrentPage: (page: ActivePage) => void;
  setSelectedBriefId: (id: string | null) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  initialLibrary?: 'brief' | 'outline' | 'content';
  onLibraryChange?: (library: 'brief' | 'outline' | 'content') => void;
  onAddBrief?: (b: ArticleBrief) => void;
  onAddOutline?: (o: OutlineItem) => void;
  onAddContent?: (c: ContentItem) => void;
  onDeleteBrief?: (id: string) => void;
  onDeleteOutline?: (id: string) => void;
  onDeleteContent?: (id: string) => void;
  onClearAll?: () => void;
}

export default function BriefLibrary({
  briefs,
  outlines,
  contents,
  setCurrentPage,
  setSelectedBriefId,
  initialLibrary = 'brief',
  onLibraryChange,
  onAddBrief,
  onAddOutline,
  onAddContent,
  onDeleteBrief,
  onDeleteOutline,
  onDeleteContent,
  onClearAll,
}: BriefLibraryProps) {
  const [activeTab, setActiveTab] = useState<'brief' | 'outline' | 'content'>(() => {
    if (initialLibrary === 'content') return 'content';
    if (initialLibrary === 'outline') return 'outline';
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

  useEffect(() => {
    if (initialLibrary) {
      setActiveTab(initialLibrary);
    }
  }, [initialLibrary]);

  const handleTabChange = (tab: 'brief' | 'outline' | 'content') => {
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
      <div className="mb-12 flex flex-col items-center justify-center gap-4 animate-fadeIn">
        <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 inline-flex flex-wrap items-center justify-center gap-1.5 shadow-3xs">
          
          {/* Brief Tab Button */}
          <button
            id="tab-btn-brief"
            onClick={() => handleTabChange('brief')}
            className={`flex items-center rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'brief'
                ? 'animated-gradient-border-thin shadow-sm p-[2px]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40 px-6 py-3 text-xs sm:text-sm font-bold'
            }`}
          >
            {activeTab === 'brief' ? (
              <div className="bg-white text-slate-900 rounded-[10px] px-5 py-2.5 flex items-center space-x-2 text-xs sm:text-sm font-extrabold shadow-3xs">
                <Layers className="h-4.5 w-4.5 shrink-0 text-emerald-600 animate-pulse" />
                <span>Brief</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Layers className="h-4.5 w-4.5 shrink-0" />
                <span>Brief</span>
              </div>
            )}
          </button>

          {/* Outline Tab Button */}
          <button
            id="tab-btn-outline"
            onClick={() => handleTabChange('outline')}
            className={`flex items-center rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'outline'
                ? 'animated-gradient-border-thin shadow-sm p-[2px]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40 px-6 py-3 text-xs sm:text-sm font-bold'
            }`}
          >
            {activeTab === 'outline' ? (
              <div className="bg-white text-slate-900 rounded-[10px] px-5 py-2.5 flex items-center space-x-2 text-xs sm:text-sm font-extrabold shadow-3xs">
                <PenTool className="h-4.5 w-4.5 shrink-0 text-cyan-600 animate-pulse" />
                <span>Outline</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <PenTool className="h-4.5 w-4.5 shrink-0" />
                <span>Outline</span>
              </div>
            )}
          </button>

          {/* Content Tab Button */}
          <button
            id="tab-btn-content"
            onClick={() => handleTabChange('content')}
            className={`flex items-center rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'content'
                ? 'animated-gradient-border-thin shadow-sm p-[2px]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40 px-6 py-3 text-xs sm:text-sm font-bold'
            }`}
          >
            {activeTab === 'content' ? (
              <div className="bg-white text-slate-900 rounded-[10px] px-5 py-2.5 flex items-center space-x-2 text-xs sm:text-sm font-extrabold shadow-3xs">
                <FileText className="h-4.5 w-4.5 shrink-0 text-violet-600 animate-pulse" />
                <span>Content</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <FileText className="h-4.5 w-4.5 shrink-0" />
                <span>Content</span>
              </div>
            )}
          </button>

        </div>


      </div>

      {/* Main Content Display Area */}
      <div className="w-full max-w-3xl mx-auto animate-fadeIn animated-gradient-border-thin p-[2px] rounded-3xl shadow-xs">
        <div className={`bg-white flex flex-col transition-all duration-350 rounded-[22px] ${
          ((activeTab === 'brief' && briefs.length > 0) || 
           (activeTab === 'outline' && outlines.length > 0) || 
           (activeTab === 'content' && contents.length > 0))
            ? 'p-6 sm:p-10 min-h-[350px]'
            : 'p-6 sm:p-10 min-h-[200px]'
        }`}>
          
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
                                <div className="text-slate-400 hover:text-slate-600 shrink-0">
                                  {isExpanded ? (
                                    <ChevronUp className="h-5 w-5" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5" />
                                  )}
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
                                <div className="text-slate-400 hover:text-slate-600 shrink-0">
                                  {isExpanded ? (
                                    <ChevronUp className="h-5 w-5" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5" />
                                  )}
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
                                <div className="text-slate-400 hover:text-slate-600 shrink-0">
                                  {isExpanded ? (
                                    <ChevronUp className="h-5 w-5" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5" />
                                  )}
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

          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
