import React, { useState } from 'react';
import { ActivePage } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PenTool, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  ChevronRight, 
  Loader2,
  FileText,
  ArrowLeft
} from 'lucide-react';

interface PricingProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export default function Pricing({ setCurrentPage, onToast }: PricingProps) {
  // Navigation inside Apex Tool
  const [isToolOpened, setIsToolOpened] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState('English');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  // Supported languages list
  const languages = [
    'English',
    'Urdu',
    'Punjabi',
    'Hindi',
    'Spanish',
    'French',
    'German',
    'Arabic'
  ];

  // API handler to request content from backend
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      onToast('Please enter a keyword first.', 'info');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');
    onToast(`Generating article in ${language}...`, 'info');

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content. Please check your Gemini API configuration.');
      }

      const data = await response.json();
      if (data.success && data.content) {
        setGeneratedContent(data.content);
        onToast('Content generated successfully!', 'success');
      } else {
        throw new Error(data.error || 'No content returned from the generator.');
      }
    } catch (err: any) {
      console.error('Generation failed:', err);
      onToast(err.message || 'Error occurred during content generation.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Export content as text file download
  const handleExport = () => {
    if (!generatedContent) return;
    try {
      const element = document.createElement("a");
      const file = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      const fileName = `${keyword.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-article.txt`;
      element.download = fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      onToast('Content exported successfully as text file!', 'success');
    } catch (err) {
      onToast('Failed to export file.', 'error');
    }
  };

  // Copy content to clipboard helper
  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    onToast('Content copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col justify-center" id="apex-tool-root">
      
      <AnimatePresence mode="wait">
        {!isToolOpened ? (
          /* Landing screen showcasing the single "Content Write" tool */
          <motion.div
            key="launcher"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-8 py-10"
            id="tool-launcher-view"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest font-mono shadow-xs">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>Apex Premium Tool Suite</span>
              </span>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl font-sans">
                Apex AI Assistant
              </h1>
              <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                Unlock high-fidelity AI-powered copy generation tuned for target search volume indexation and natural readability.
              </p>
            </div>

            {/* Content Write Card */}
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setIsToolOpened(true)}
                className="group w-full relative flex flex-col items-center justify-center p-8 bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-300 rounded-3xl shadow-md hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                id="content-write-launcher-card"
              >
                <div className="rounded-2xl bg-emerald-50 text-emerald-600 p-4 mb-4 border border-emerald-100 group-hover:scale-110 transition-transform">
                  <PenTool className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-sans group-hover:text-emerald-700 transition-colors">
                  Content Write
                </h2>
                <p className="text-xs text-slate-400 mt-2 max-w-xs">
                  Generate fully-fledged SEO articles and custom copy by inputting keyword prompts and local target dialects.
                </p>
                <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 mt-6 group-hover:translate-x-1 transition-transform">
                  <span>Open Tool</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Actual workspace showing the Content Writer Tool */
          <motion.div
            key="workspace"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 py-6"
            id="tool-workspace-view"
          >
            {/* Header & Back Action */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <button
                onClick={() => {
                  setIsToolOpened(false);
                  setKeyword('');
                  setGeneratedContent('');
                }}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
              <h2 className="text-xl font-black text-slate-900 font-sans tracking-tight" id="active-tool-title">
                Content Write
              </h2>
              <div className="w-16" /> {/* Spacer */}
            </div>

            {/* Inputs Box Block */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4" id="tool-inputs-block">
              <form onSubmit={handleGenerate} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Keyword Input Box */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-2xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      Keyword Prompt
                    </label>
                    <input
                      type="text"
                      required
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="e.g. Modern Web Architecture or Sustainable Tech Solutions"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-400 font-medium transition-all"
                      disabled={isGenerating}
                    />
                  </div>

                  {/* Language Selector Select */}
                  <div className="space-y-1.5">
                    <label className="text-2xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      Select Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium transition-all"
                      disabled={isGenerating}
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:bg-emerald-400/80 px-6 py-3 rounded-xl shadow-md cursor-pointer transition-all focus:outline-none"
                    id="submit-generation-button"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating Copy...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Generate Article</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

            {/* Output Display Area: No dummy or cached placeholder data printed above/below */}
            <AnimatePresence>
              {generatedContent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-4"
                  id="generated-content-display"
                >
                  {/* Top Bar with export choices */}
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
                      <FileText className="h-4 w-4 text-emerald-600" />
                      <span>Article Compiled Successfully ({language})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center space-x-1.5 text-2xs font-bold bg-white text-slate-600 hover:text-slate-800 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                        title="Copy text to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleExport}
                        className="inline-flex items-center space-x-1.5 text-2xs font-bold bg-slate-900 text-white hover:bg-slate-800 px-3 py-2 rounded-lg cursor-pointer transition-colors"
                        title="Download text file"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  {/* Content Container (clean and professional markdown rendering style) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-inner overflow-y-auto max-h-[500px] text-slate-800 text-sm leading-relaxed prose prose-emerald max-w-none">
                    <p className="whitespace-pre-wrap font-sans">{generatedContent}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
