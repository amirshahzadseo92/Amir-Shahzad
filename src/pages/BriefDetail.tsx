import React from 'react';
import { 
  ArrowLeft, 
  Lock, 
  Sparkles, 
  CheckCircle, 
  PenTool, 
  TrendingUp, 
  Layers, 
  AlertCircle, 
  Eye, 
  BookOpen, 
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  LockOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { ArticleBrief, ActivePage } from '../types';
import BriefCard from '../components/BriefCard';

interface BriefDetailProps {
  brief: ArticleBrief;
  onBack: () => void;
  isUnlocked: boolean;
  onUnlock: (id: string) => void;
  onOrderContent: (title: string) => void;
  relatedBriefs: ArticleBrief[];
  setSelectedBriefId: (id: string | null) => void;
}

export default function BriefDetail({
  brief,
  onBack,
  isUnlocked,
  onUnlock,
  onOrderContent,
  relatedBriefs,
  setSelectedBriefId,
}: BriefDetailProps) {
  
  const handleReadRelated = (id: string) => {
    setSelectedBriefId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Brief Library</span>
      </button>

      {/* Hero Meta Header */}
      <div className="border-b border-gray-100 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-block rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1 text-xs font-semibold">
            {brief.category}
          </span>
          <span className="text-sm font-mono text-gray-400">{brief.date}</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl leading-tight">
          {brief.title}
        </h1>

        <p className="text-base text-gray-500 leading-relaxed max-w-3xl">
          {brief.previewText}
        </p>

        {/* Dynamic Metric Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
          <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
            <span className="block text-3xs font-bold text-gray-400 uppercase tracking-wider font-mono">SEARCH VOLUME</span>
            <div className="mt-1 flex items-center space-x-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-bold text-gray-900">{brief.searchVolume}</span>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
            <span className="block text-3xs font-bold text-gray-400 uppercase tracking-wider font-mono">INTENSITY DIFFICULTY</span>
            <span className="mt-1 block text-sm font-bold text-gray-900">{brief.difficulty}</span>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
            <span className="block text-3xs font-bold text-gray-400 uppercase tracking-wider font-mono">TARGET AUDIENCE</span>
            <span className="mt-1 block text-sm font-bold text-gray-900 truncate" title={brief.targetAudience}>
              {brief.targetAudience}
            </span>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
            <span className="block text-3xs font-bold text-gray-400 uppercase tracking-wider font-mono">OUTLINE TIER</span>
            <span className="mt-1 block text-sm font-bold text-emerald-700 font-semibold">
              {brief.status === 'Premium' ? '🔒 Premium Elite' : '🔓 Free Public'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Brief Content */}
      <div className="py-10 grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        
        {/* Editorial Brief Body */}
        <article className="lg:col-span-8 space-y-6">
          <div className="prose prose-emerald max-w-none">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2 border-b border-gray-50 pb-2 mb-4">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              <span>Core Editorial Brief</span>
            </h2>
            
            {/* Split paragraphs/headers on mock markdown data */}
            <div className="text-gray-600 space-y-4 leading-relaxed whitespace-pre-line text-sm">
              {brief.fullBrief}
            </div>
          </div>

          {/* Keywords Tagging Block */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 font-mono">Target Semantic Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {brief.keywords.map((key, index) => (
                <span key={index} className="rounded-lg bg-gray-50 border border-gray-100 text-xs font-mono text-gray-600 px-3 py-1.5">
                  {key}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar / CTA Locks */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Action Widget */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Blueprint Quick Actions</h3>
            <div className="space-y-2.5">
              <button
                onClick={() => onOrderContent(brief.title)}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white py-3 text-xs font-semibold shadow transition-all hover:scale-[1.01]"
              >
                <PenTool className="h-4 w-4" />
                <span>Order Custom Copy</span>
              </button>
            </div>
          </div>

          {/* Trust assurances info list */}
          <div className="rounded-2xl bg-gray-50/50 p-6 border border-gray-100 space-y-4 text-xs text-gray-500">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider font-mono text-2xs">Apex OS Quality Safeguards</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>100% human editorial verification, zero AI hallucination.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Rigorous layout schema tags applied for immediate rich-snippet indexing.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Pre-scanned difficulty analysis using deep API domain authority logs.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Premium Outline Locked Area */}
      <section className="mt-8 border-t border-gray-100 pt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Lock className="h-5 w-5 text-amber-500" />
            <span>🔒 Premium Semantic Outline Structure</span>
          </h2>
          {isUnlocked && (
            <span className="rounded bg-emerald-100 text-emerald-800 text-2xs font-bold px-2 py-0.5">UNLOCKED</span>
          )}
        </div>

        {isUnlocked ? (
          /* Unlocked Genuine Content Presentation */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-emerald-100 bg-emerald-50/10 p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center space-x-2 text-emerald-700">
              <LockOpen className="h-5 w-5" />
              <span className="text-sm font-semibold">Premium SEO Layout Scheme Active</span>
            </div>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <div className="border-l-4 border-emerald-500 pl-4 py-1">
                <h4 className="font-bold text-gray-900 text-base">H1: {brief.title}</h4>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Intent: Informational & Authoritative | Primary keyword placement</p>
              </div>

              <div className="pl-6 space-y-4">
                <div className="border-l-2 border-gray-200 pl-3">
                  <h5 className="font-bold text-gray-900">H2: Introduction to {brief.category} Challenges</h5>
                  <p className="text-xs text-gray-500">Suggested length: 250 words. Target latent entity: market metrics.</p>
                </div>

                <div className="border-l-2 border-gray-200 pl-3">
                  <h5 className="font-bold text-gray-900">H2: Deep-Dive Core Strategy</h5>
                  <p className="text-xs text-gray-500">Suggested length: 600 words. Target semantic entities: {brief.keywords.join(', ')}.</p>
                  <p className="text-xs text-gray-400 italic mt-1">&#8226; Key Action Checklist for writing teams included in zip download assets.</p>
                </div>

                <div className="border-l-2 border-gray-200 pl-3">
                  <h5 className="font-bold text-gray-900">H2: Tactical Case Study & Practical Implementation</h5>
                  <p className="text-xs text-gray-500">Suggested length: 450 words. Introduce interactive element or diagnostic layout tool.</p>
                </div>

                <div className="border-l-2 border-gray-200 pl-3">
                  <h5 className="font-bold text-gray-900">H2: Conclusion & Strategic Summary</h5>
                  <p className="text-xs text-gray-500">Suggested length: 150 words. Include structured FAQ JSON-LD markup blocks.</p>
                </div>
              </div>
            </div>

            {/* Custom Content Direct CTA */}
            <div className="pt-6 border-t border-emerald-100 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Ready for elite production?</h4>
                <p className="text-xs text-gray-500">Hire our professional agency experts to draft this article flawlessly.</p>
              </div>
              <button 
                onClick={() => onOrderContent(brief.title)}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-xs font-semibold shadow self-start sm:self-auto"
              >
                Order Expert Copywriting
              </button>
            </div>
          </motion.div>
        ) : (
          /* Locked Blurred Showcase Overlay */
          <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-gray-50/50 p-6 sm:p-8">
            {/* Blurred Template Preview Lines */}
            <div className="space-y-4 filter blur-[4px] select-none pointer-events-none opacity-40">
              <div className="h-6 w-3/4 bg-gray-400 rounded" />
              <div className="h-4 w-1/2 bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-6 w-2/3 bg-gray-400 rounded pt-6" />
              <div className="h-4 w-1/3 bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>

            {/* Unlock Dialog Box overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 p-4 text-center">
              <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-xl max-w-md space-y-4">
                <div className="mx-auto rounded-full bg-amber-50 p-3 text-amber-600 w-fit">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Unlock Premium Content Blueprint</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Gain full access to the granular SEO headers layout, micro-intent specifications, and targeted entity mapping checklist.
                  </p>
                </div>
                <button
                  onClick={() => onUnlock(brief.id)}
                  className="w-full flex items-center justify-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 text-xs font-semibold shadow transition-all hover:scale-[1.01]"
                >
                  <LockOpen className="h-4 w-4" />
                  <span>Unlock Outline</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Need Complete Article? Big Card Banner */}
      <section className="mt-12 rounded-2xl bg-gradient-to-tr from-emerald-900 to-emerald-800 text-white p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-64 w-64 bg-emerald-700 rounded-full blur-3xl opacity-30" />
        <div className="space-y-4 max-w-xl">
          <span className="text-2xs font-bold tracking-wider text-emerald-300 uppercase font-mono">Expert Agency Copywriting</span>
          <h3 className="text-2xl font-bold tracking-tight">Need a completely polished, ready-to-publish article?</h3>
          <p className="text-sm text-emerald-100 leading-relaxed">
            Our network of highly technical industry copywriters will expand this brief into a master-class, fully structured publication. Double-checked by senior editors for absolute readability.
          </p>
          <button 
            onClick={() => onOrderContent(brief.title)}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-white hover:bg-gray-50 text-emerald-900 font-bold text-xs px-5 py-3 shadow transition-all"
          >
            <span>Order Custom Copywriting</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Related Articles Footer */}
      {relatedBriefs.length > 0 && (
        <section className="mt-16 border-t border-gray-100 pt-12 space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Related Marketing Blueprints</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedBriefs.map((b) => (
              <BriefCard
                key={b.id}
                brief={b}
                onRead={handleReadRelated}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
