import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Sparkles, 
  Edit, 
  Trash2, 
  Layers, 
  FileText, 
  PenTool, 
  FolderOpen,
  X,
  Palette,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ArticleBrief, OutlineItem, ContentItem, ContentOrder } from '../types';

interface DashboardProps {
  userEmail: string;
  unlockedBriefIds: string[];
  allBriefsCount: number;
  orders: ContentOrder[];
  onAddNewOrder: (newOrder: ContentOrder) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
  onNavigateToLibrary: () => void;
  briefs: ArticleBrief[];
  outlines: OutlineItem[];
  contents: ContentItem[];
  onPublishBrief: (b: ArticleBrief) => void;
  onPublishOutline: (o: OutlineItem) => void;
  onPublishContent: (c: ContentItem) => void;
  onEditBrief: (b: ArticleBrief) => void;
  onDeleteBrief: (id: string) => void;
  onEditOutline: (o: OutlineItem) => void;
  onDeleteOutline: (id: string) => void;
  onEditContent: (c: ContentItem) => void;
  onDeleteContent: (id: string) => void;
}

const PRESET_COLORS = [
  { id: 'slate', value: 'text-slate-800', bgClass: 'bg-slate-800', hex: '#1e293b', label: 'Slate Charcoal', ringClass: 'focus:ring-slate-800/30' },
  { id: 'emerald', value: 'text-emerald-600', bgClass: 'bg-emerald-500', hex: '#10b981', label: 'Emerald Green', ringClass: 'focus:ring-emerald-500/30' },
  { id: 'blue', value: 'text-blue-600', bgClass: 'bg-blue-500', hex: '#3b82f6', label: 'Royal Blue', ringClass: 'focus:ring-blue-500/30' },
  { id: 'indigo', value: 'text-indigo-600', bgClass: 'bg-indigo-500', hex: '#6366f1', label: 'Indigo Purple', ringClass: 'focus:ring-indigo-500/30' },
  { id: 'amber', value: 'text-amber-600', bgClass: 'bg-amber-500', hex: '#f59e0b', label: 'Sunset Amber', ringClass: 'focus:ring-amber-500/30' },
  { id: 'rose', value: 'text-rose-600', bgClass: 'bg-rose-500', hex: '#f43f5e', label: 'Rose Pink', ringClass: 'focus:ring-rose-500/30' },
  { id: 'cyan', value: 'text-cyan-600', bgClass: 'bg-cyan-500', hex: '#06b6d4', label: 'Cyber Cyan', ringClass: 'focus:ring-cyan-500/30' },
  { id: 'violet', value: 'text-violet-600', bgClass: 'bg-violet-500', hex: '#8b5cf6', label: 'Violet Lavender', ringClass: 'focus:ring-violet-500/30' }
];

const PRESET_FONTS = [
  { id: 'font-sans', label: 'Modern Sans', value: 'font-sans font-bold', desc: 'Default Clean Interface' },
  { id: 'font-serif', label: 'Elegant Serif', value: 'font-serif font-bold italic', desc: 'Editorial & Traditional' },
  { id: 'font-mono', label: 'Tech Mono', value: 'font-mono font-bold tracking-tight', desc: 'Technical & Developers' },
  { id: 'font-display', label: 'Impact Display', value: 'font-sans font-black uppercase tracking-tight', desc: 'SaaS Headline Accent' },
  { id: 'font-serif-classic', label: 'Classic Serif', value: 'font-serif font-extrabold', desc: 'Vintage & Classical Headers' },
  { id: 'font-sans-light', label: 'Minimalist Light', value: 'font-sans font-light tracking-wide', desc: 'Elegant & Sophisticated' },
  { id: 'font-sans-ultra', label: 'Bold Geometric', value: 'font-sans font-extrabold tracking-tight', desc: 'Dynamic Marketing Accent' }
];

const TEXT_TEMPLATES = [
  {
    id: 'saas-landing',
    name: 'SaaS Launch Framework',
    desc: 'USP, challenge statements, features & CTAs',
    category: 'SaaS',
    title: 'Apex Workspace Software Launch Brief',
    data: `### 1. Headline (USP)
Unlock ultimate productivity with our automated workspace optimization toolkit.

### 2. Pain Point / Challenge
Modern product managers lose 15+ hours weekly on manual data synchronization and report formatting.

### 3. Core Solution & Benefits
- Real-time API connectors with auto-mapping
- Single-pane-of-glass dashboards
- Instant export formats for stakeholders

### 4. Primary Call To Action (CTA)
Start Your Free 14-Day Trial Today. No credit card required.`,
  },
  {
    id: 'seo-optimized',
    name: 'SEO Pillar Strategy',
    desc: 'High search-intent structure & core headers',
    category: 'SEO',
    title: 'SEO Topical Authority Optimization Brief',
    data: `### Focus Keyphrase:
"Sustainable green cloud storage architectures"

### Target Audience:
Enterprise CTOs, infrastructure leads, and sustainable tech coordinators.

### Instructions:
Focus on energy-grid efficiency metrics, renewable hosting datacenters, carbon-offset calculations, and data lifecycle management policies. Incorporate 5 high-fidelity LSI keywords.`,
  },
  {
    id: 'product-versus',
    name: 'Competitive Versus Layout',
    desc: 'Brand vs competitors, pricing & pros/cons',
    category: 'Copywriting',
    title: 'Competitive Strategy Brief: Apex vs Competitors',
    data: `### Objective:
Highlight key developer-experience differentiators when choosing Apex over legacy enterprise monoliths.

### Value Props:
- Sub-second hot start cold boots
- Fully open-source local emulation environment
- Predictable pay-as-you-grow tiered pricing model`,
  },
  {
    id: 'email-funnel',
    name: 'Converting Email Copy',
    desc: 'Compelling hooks, personal pain & conversion',
    category: 'Marketing',
    title: 'Lead Magnet Funnel Conversion Email Brief',
    data: `### Goal:
Deliver high-value organic traffic checklists to new newsletter subscribers and pitch the Apex Pro upgrade.

### Tone:
Approachable, highly authoritative, urgent but reassuring.`,
  },
  {
    id: 'tech-whitepaper',
    name: 'Technical Deep-Dive',
    desc: 'Executive technical details, charts & roadmaps',
    category: 'Technical',
    title: 'Distributed State Synchronization Whitepaper Brief',
    data: `### Context:
Technical whitepaper detailing consensus scaling in edge-nodes without central state managers.

### Audience:
Staff Distributed Systems Engineers. Ensure rigorous vocabulary.`,
  },
  {
    id: 'social-hooks',
    name: 'Viral Social Hooks',
    desc: 'High CTR social media post templates',
    category: 'Social',
    title: 'Social Media Organic Hook Strategy Brief',
    data: `### Platforms:
LinkedIn & Twitter/X.

### Objective:
Generate high click-through-rates for the launch of the new Apex AI Assistant Copy Generator.`,
  },
  {
    id: 'how-to-guide',
    name: 'Ultimate Step-By-Step Guide',
    desc: 'Hierarchical tutorial layouts with tips & FAQs',
    category: 'Tutorials',
    title: 'Step-by-Step Practical Optimization Tutorial Brief',
    data: `### Goal:
Write a comprehensive step-by-step tutorial explaining how to build modern serverless websites.

### Layout:
- Setup step
- Build step
- Performance audit
- Common troubleshooting FAQ block`
  }
];

export default function Dashboard({
  userEmail,
  unlockedBriefIds,
  allBriefsCount,
  orders,
  onAddNewOrder,
  onToast,
  onNavigateToLibrary,
  briefs,
  outlines,
  contents,
  onPublishBrief,
  onPublishOutline,
  onPublishContent,
  onEditBrief,
  onDeleteBrief,
  onEditOutline,
  onDeleteOutline,
  onEditContent,
  onDeleteContent,
}: DashboardProps) {
  // Password Lock state
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Tab State - Only Brief Outline Content
  const [activeTab, setActiveTab] = useState<'briefs'>('briefs');
  const [adminView, setAdminView] = useState<'clean' | 'brief' | 'outline' | 'content'>('clean');

  // Brief Outline Content Form State
  const [briefTitle, setBriefTitle] = useState('');
  const [briefData, setBriefData] = useState('');
  const [editingBriefId, setEditingBriefId] = useState<string | null>(null);
  const [selectedBriefColor, setSelectedBriefColor] = useState('text-slate-800');
  const [selectedBriefFont, setSelectedBriefFont] = useState('font-sans font-bold');

  // Check localStorage for unlock state on mount
  useEffect(() => {
    const savedUnlock = localStorage.getItem('apex_admin_unlocked');
    if (savedUnlock === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  // Reusable styling and layout generators
  const renderColorPicker = (
    currentColor: string, 
    setColor: (val: string) => void
  ) => {
    return (
      <div className="space-y-1.5 pt-1">
        <label className="font-bold text-slate-500 flex items-center space-x-1">
          <Palette className="h-3 w-3 text-slate-400" />
          <span>Accent Color (Choose 1 of 7)</span>
        </label>
        <div className="flex items-center gap-2 flex-wrap bg-white border border-slate-200/60 rounded-xl p-2">
          {PRESET_COLORS.map(c => {
            const isSelected = currentColor === c.value;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.value)}
                className={`h-7 w-7 rounded-full ${c.bgClass} flex items-center justify-center transition-all cursor-pointer relative group`}
                title={c.label}
              >
                {isSelected && (
                  <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                )}
                {/* Custom modern tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-zinc-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-sm">
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTemplateSelector = (
    setTitle: (val: string) => void,
    setData: (val: string) => void
  ) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-500 flex items-center space-x-1">
            <Sparkles className="h-3 w-3 text-emerald-500" />
            <span>Preset Layout Templates (Choose 1 of 7)</span>
          </label>
          <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-mono uppercase">
            Click to Auto-Fill
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[145px] overflow-y-auto pr-1">
          {TEXT_TEMPLATES.map(t => {
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTitle(t.title);
                  setData(t.data);
                  onToast(`Loaded ${t.name} template!`, 'success');
                }}
                className="text-left p-2.5 bg-white border border-slate-200/80 rounded-xl hover:border-emerald-500 hover:shadow-2xs transition-all duration-200 group relative cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {t.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono bg-slate-50 px-1 py-0.2 rounded">
                    {t.category}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 leading-normal">
                  {t.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Password submission logic
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Hafiz@9263') {
      setIsUnlocked(true);
      setErrorMsg('');
      localStorage.setItem('apex_admin_unlocked', 'true');
      onToast('Admin Panel unlocked successfully!', 'success');
    } else {
      setErrorMsg('Incorrect password. Please try again.');
    }
  };

  const handleLockPanel = () => {
    setIsUnlocked(false);
    localStorage.removeItem('apex_admin_unlocked');
    setPassword('');
    onToast('Admin Panel locked.', 'info');
  };

  // ---------------- BRIEF ACTIONS ----------------
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefTitle.trim() || !briefData.trim()) {
      onToast('Please enter both Title and Data.', 'info');
      return;
    }

    if (adminView === 'brief') {
      const preview = briefData.length > 120 ? briefData.substring(0, 120) + '...' : briefData;
      let cleanBrief: ArticleBrief;

      if (editingBriefId) {
        const original = briefs.find(b => b.id === editingBriefId);
        cleanBrief = {
          ...original,
          id: editingBriefId,
          title: briefTitle,
          previewText: preview,
          fullBrief: briefData,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        } as ArticleBrief;
      } else {
        cleanBrief = {
          id: `brief-${Date.now()}`,
          title: briefTitle,
          category: 'SaaS Technology',
          previewText: preview,
          fullBrief: briefData,
          keywords: ['seo', 'optimized'],
          targetAudience: 'General Audience',
          searchVolume: '1,500/mo',
          difficulty: 'Easy',
          status: 'Premium',
          date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        };
      }

      if (editingBriefId) {
        onEditBrief(cleanBrief);
        onToast('Brief updated successfully!', 'success');
        setEditingBriefId(null);
      } else {
        onPublishBrief(cleanBrief);
        onToast('New Brief published!', 'success');
      }
    } else if (adminView === 'outline') {
      const sectionsList = briefData.split('\n').map(s => s.trim()).filter(Boolean);
      let cleanOutline: OutlineItem;

      if (editingBriefId) {
        const original = outlines.find(o => o.id === editingBriefId);
        cleanOutline = {
          ...original,
          id: editingBriefId,
          title: briefTitle,
          headings: sectionsList.length,
          sections: sectionsList,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        } as OutlineItem;
      } else {
        cleanOutline = {
          id: `outline-${Date.now()}`,
          title: briefTitle,
          category: 'Technology',
          wordCount: '1,500 words',
          headings: sectionsList.length,
          entities: 10,
          score: 90,
          difficulty: 'Easy',
          sections: sectionsList,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        };
      }

      if (editingBriefId) {
        onEditOutline(cleanOutline);
        onToast('Outline updated successfully!', 'success');
        setEditingBriefId(null);
      } else {
        onPublishOutline(cleanOutline);
        onToast('New Outline published!', 'success');
      }
    } else if (adminView === 'content') {
      let cleanContent: ContentItem;

      if (editingBriefId) {
        const original = contents.find(c => c.id === editingBriefId);
        cleanContent = {
          ...original,
          id: editingBriefId,
          title: briefTitle,
          summary: briefData.length > 150 ? briefData.substring(0, 150) + '...' : briefData,
          content: briefData,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        } as ContentItem;
      } else {
        cleanContent = {
          id: `content-${Date.now()}`,
          title: briefTitle,
          category: 'General Copy',
          readTime: '5 min read',
          gradeLevel: '10th Grade',
          density: '2.5%',
          summary: briefData.length > 150 ? briefData.substring(0, 150) + '...' : briefData,
          keywords: ['article', 'content'],
          content: briefData,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        };
      }

      if (editingBriefId) {
        onEditContent(cleanContent);
        onToast('Content updated successfully!', 'success');
        setEditingBriefId(null);
      } else {
        onPublishContent(cleanContent);
        onToast('New Content published!', 'success');
      }
    }

    setBriefTitle('');
    setBriefData('');
    setSelectedBriefColor('text-slate-800');
    setSelectedBriefFont('font-sans font-bold');
    setAdminView('clean');
  };

  const handleTriggerEditBrief = (b: ArticleBrief) => {
    setEditingBriefId(b.id);
    setBriefTitle(b.title);
    setBriefData(b.fullBrief);
    setSelectedBriefColor(b.titleColor || 'text-slate-800');
    setSelectedBriefFont(b.fontStyle || 'font-sans font-bold');
    setAdminView('brief');

    // Scroll smoothly to top of form
    setTimeout(() => {
      const container = document.getElementById('form-admin-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleTriggerEditOutline = (o: OutlineItem) => {
    setEditingBriefId(o.id);
    setBriefTitle(o.title);
    setBriefData(o.sections.join('\n'));
    setSelectedBriefColor(o.titleColor || 'text-slate-800');
    setSelectedBriefFont(o.fontStyle || 'font-sans font-bold');
    setAdminView('outline');

    // Scroll smoothly to top of form
    setTimeout(() => {
      const container = document.getElementById('form-admin-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleTriggerEditContent = (c: ContentItem) => {
    setEditingBriefId(c.id);
    setBriefTitle(c.title);
    setBriefData(c.content);
    setSelectedBriefColor(c.titleColor || 'text-slate-800');
    setSelectedBriefFont(c.fontStyle || 'font-sans font-bold');
    setAdminView('content');

    // Scroll smoothly to top of form
    setTimeout(() => {
      const container = document.getElementById('form-admin-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleCancelBriefEdit = () => {
    setEditingBriefId(null);
    setBriefTitle('');
    setBriefData('');
    setSelectedBriefColor('text-slate-800');
    setSelectedBriefFont('font-sans font-bold');
  };


  // 1. Password Gate screen
  if (!isUnlocked) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-zinc-950 text-white rounded-3xl m-4 sm:m-8 border border-zinc-800 shadow-2xl relative overflow-hidden" id="admin-security-gate">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        <div className="w-full max-w-md p-8 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto rounded-full bg-emerald-950 text-emerald-400 p-3.5 w-fit border border-emerald-900">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">Admin Security Gate</h2>
            <p className="text-xs text-zinc-400 font-sans">Enter secure password key to access admin parameters</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-2xs font-bold text-zinc-400 uppercase tracking-wider block">Admin Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono placeholder-zinc-700"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 text-center font-medium bg-red-950/20 border border-red-900/30 rounded-lg py-2 font-sans">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs py-3.5 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer font-sans"
            >
              Unlock Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Full Simplified Admin Dashboard
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 min-h-[600px]" id="dashboard-admin-main">
      <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-xs relative overflow-hidden transition-all duration-300">
        
        {/* Top Control Header - Minimal Back / Lock */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-100/80 mb-8 text-xs text-slate-400">
          <span className="font-mono tracking-wider uppercase text-[10px] font-bold text-slate-300">Admin Session Active</span>
          <button 
            onClick={handleLockPanel}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl px-3 py-1.5 font-bold text-slate-600 transition-all cursor-pointer font-sans"
            id="btn-lock-admin"
          >
            Lock Panel
          </button>
        </div>

        {adminView === 'clean' ? (
          /* Clean View: Only Brief, Outline, and Content are shown separately, rest is clean */
          <div className="flex flex-col items-center justify-center py-28 space-y-8" id="view-admin-clean">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12" id="admin-options-row">
              <button
                onClick={() => {
                  setEditingBriefId(null);
                  setBriefTitle('');
                  setBriefData('');
                  setAdminView('brief');
                }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-sans border-b-2 border-transparent hover:border-emerald-500 pb-2 active:scale-98"
                id="btn-brief-trigger"
              >
                Brief
              </button>
              
              <span className="hidden sm:inline text-slate-200 text-2xl font-light">|</span>
              
              <button
                onClick={() => {
                  setEditingBriefId(null);
                  setBriefTitle('');
                  setBriefData('');
                  setAdminView('outline');
                }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-sans border-b-2 border-transparent hover:border-emerald-500 pb-2 active:scale-98"
                id="btn-outline-trigger"
              >
                Outline
              </button>
              
              <span className="hidden sm:inline text-slate-200 text-2xl font-light">|</span>
              
              <button
                onClick={() => {
                  setEditingBriefId(null);
                  setBriefTitle('');
                  setBriefData('');
                  setAdminView('content');
                }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-sans border-b-2 border-transparent hover:border-emerald-500 pb-2 active:scale-98"
                id="btn-content-trigger"
              >
                Content
              </button>
            </div>
            
            <p className="text-xs text-slate-400 font-sans tracking-wide">
              Click any option to publish that item separately
            </p>
          </div>
        ) : (
          /* Form View: Topic / Title box and below it Article / Content box */
          <div className="space-y-8" id="form-admin-container">
            <form onSubmit={handleSubmitForm} className="space-y-8 animate-fadeIn" id="form-admin-generic">
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight font-sans mb-1 capitalize">
                  {editingBriefId ? 'Edit' : 'Publish'} {adminView}
                </h2>
                <p className="text-xs text-slate-400">Publish or update {adminView} copy inside the portfolio library</p>
              </div>

              {editingBriefId && (
                <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs text-amber-800 animate-fadeIn" id="edit-mode-indicator-banner">
                  <div className="flex items-center space-x-2">
                    <span className="p-1 bg-amber-100 rounded-lg text-amber-600">✏️</span>
                    <span>
                      You are editing <strong>"{briefTitle || 'Untitled'}"</strong>.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBriefId(null);
                      setBriefTitle('');
                      setBriefData('');
                      setSelectedBriefColor('text-slate-800');
                      setSelectedBriefFont('font-sans font-bold');
                      setAdminView('clean');
                      onToast('Edit cancelled successfully.', 'info');
                    }}
                    className="text-amber-700 hover:text-amber-900 font-extrabold underline cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Topic / Title
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder={`Enter ${adminView} topic title...`}
                  value={briefTitle} 
                  onChange={e => setBriefTitle(e.target.value)} 
                  className="w-full border-2 border-slate-100 rounded-2xl p-4 text-sm bg-white focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans" 
                  id="input-brief-title"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {adminView === 'outline' ? 'Outline Headings' : 'Article / Content'}
                </label>
                <textarea 
                  rows={12} 
                  required 
                  placeholder={
                    adminView === 'brief'
                      ? "Write full instructions or details of the brief here..."
                      : adminView === 'outline'
                      ? "Enter outline sections/headings (one per line)..."
                      : "Write or paste your full-length article content copy here..."
                  }
                  value={briefData} 
                  onChange={e => setBriefData(e.target.value)} 
                  className="w-full border-2 border-slate-100 rounded-2xl p-4 text-sm bg-white focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans leading-relaxed" 
                  id="textarea-brief-article"
                />
              </div>

              {/* Title & Topic Styling Studio Box */}
              <div className="p-5 bg-slate-50/70 border-2 border-slate-100 rounded-2xl space-y-4" id="topic-style-customize-box">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-sans">
                    Title & Topic Styling Studio
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Color Selector */}
                  <div className="space-y-2">
                    <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Title Color
                    </span>
                    <div className="flex items-center gap-2 flex-wrap bg-white border border-slate-200/50 rounded-xl p-2.5 shadow-2xs">
                      {PRESET_COLORS.map(c => {
                        const isSelected = selectedBriefColor === c.value;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedBriefColor(c.value)}
                            className={`h-7 w-7 rounded-full ${c.bgClass} flex items-center justify-center transition-all cursor-pointer relative group`}
                            title={c.label}
                          >
                            {isSelected && (
                              <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Font Style Selector */}
                  <div className="space-y-2">
                    <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Font Family & Style
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 bg-white border border-slate-200/50 rounded-xl p-1.5 shadow-2xs">
                      {PRESET_FONTS.map(f => {
                        const isSelected = selectedBriefFont === f.value;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setSelectedBriefFont(f.value)}
                            className={`px-3 py-2 rounded-lg text-left transition-all text-xs cursor-pointer ${
                              isSelected 
                                ? 'bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold' 
                                : 'bg-slate-50/50 hover:bg-slate-50 text-slate-600 border border-transparent'
                            }`}
                          >
                            <div className="font-sans leading-none">{f.label}</div>
                            <span className="text-[9px] font-normal text-slate-400 mt-0.5 block leading-none">{f.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Realtime Live Interactive Preview Box */}
                <div className="pt-2">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    Live Library Preview
                  </span>
                  <div className="p-4 bg-white border border-slate-150 rounded-xl flex items-center justify-between shadow-2xs">
                    <span className={`text-base font-bold ${selectedBriefColor} ${selectedBriefFont} truncate max-w-[280px] sm:max-w-[450px]`}>
                      {briefTitle.trim() || 'Untitled Topic Title'}
                    </span>
                    <span className="text-2xs font-bold text-emerald-600 uppercase tracking-widest font-mono shrink-0 ml-4">
                      Show
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-xs cursor-pointer font-sans text-center text-xs transition-colors"
                  id="btn-publish-submit"
                >
                  {editingBriefId ? 'Save Changes' : `Publish ${adminView === 'brief' ? 'Brief' : adminView === 'outline' ? 'Outline' : 'Content'}`}
                </button>
                
                <button 
                  type="button" 
                  onClick={() => {
                    setBriefTitle('');
                    setBriefData('');
                    setEditingBriefId(null);
                    setAdminView('clean');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-xl cursor-pointer font-sans text-xs transition-colors"
                  id="btn-back-to-clean"
                >
                  Back
                </button>
              </div>
            </form>

            {/* Individual List for Active Tab only */}
            {adminView === 'brief' && (
              <div className="space-y-4 pt-10 border-t border-slate-100 text-left" id="active-briefs-list">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <span>Published Briefs ({briefs.length})</span>
                </div>
                {briefs.length === 0 ? (
                  <p className="text-xs text-slate-300 italic pl-2 font-sans">No briefs published yet</p>
                ) : (
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {briefs.map(b => (
                      <div key={b.id} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-100 transition-all text-xs font-sans">
                        <div className="flex-1 min-w-0 pr-4">
                          <span className="font-bold text-slate-700 block truncate">
                            {b.title}
                          </span>
                          <span className="text-[11px] text-slate-400 line-clamp-1 block mt-0.5">
                            {b.fullBrief}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleTriggerEditBrief(b)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteBrief(b.id);
                              onToast('Brief deleted successfully', 'success');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {adminView === 'outline' && (
              <div className="space-y-4 pt-10 border-t border-slate-100 text-left" id="active-outlines-list">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <span>Published Outlines ({outlines.length})</span>
                </div>
                {outlines.length === 0 ? (
                  <p className="text-xs text-slate-300 italic pl-2 font-sans">No outlines published yet</p>
                ) : (
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {outlines.map(o => (
                      <div key={o.id} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-100 transition-all text-xs font-sans">
                        <div className="flex-1 min-w-0 pr-4">
                          <span className="font-bold text-slate-700 block truncate">
                            {o.title}
                          </span>
                          <span className="text-[11px] text-slate-400 line-clamp-1 block mt-0.5">
                            {o.sections.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleTriggerEditOutline(o)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteOutline(o.id);
                              onToast('Outline deleted successfully', 'success');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {adminView === 'content' && (
              <div className="space-y-4 pt-10 border-t border-slate-100 text-left" id="active-contents-list">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <span>Published Contents ({contents.length})</span>
                </div>
                {contents.length === 0 ? (
                  <p className="text-xs text-slate-300 italic pl-2 font-sans">No content published yet</p>
                ) : (
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {contents.map(c => (
                      <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-100 transition-all text-xs font-sans">
                        <div className="flex-1 min-w-0 pr-4">
                          <span className="font-bold text-slate-700 block truncate">
                            {c.title}
                          </span>
                          <span className="text-[11px] text-slate-400 line-clamp-1 block mt-0.5">
                            {c.content}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleTriggerEditContent(c)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteContent(c.id);
                              onToast('Content deleted successfully', 'success');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
