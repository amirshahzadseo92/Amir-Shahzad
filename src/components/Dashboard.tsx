import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Sparkles, 
  Plus, 
  Edit, 
  Trash2, 
  Layers, 
  FileText, 
  PenTool, 
  CreditCard,
  X,
  PlusCircle,
  FolderOpen
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

  // Tab State
  const [activeTab, setActiveTab] = useState<'briefs' | 'outlines' | 'contents' | 'orders'>('briefs');

  // Form Modals states
  const [editingBrief, setEditingBrief] = useState<ArticleBrief | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [briefForm, setBriefForm] = useState({
    title: '',
    category: '',
    previewText: '',
    fullBrief: '',
    keywords: '',
    targetAudience: '',
    searchVolume: '',
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    status: 'Free' as 'Free' | 'Premium',
  });

  const [editingOutline, setEditingOutline] = useState<OutlineItem | null>(null);
  const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false);
  const [outlineForm, setOutlineForm] = useState({
    title: '',
    category: '',
    wordCount: '',
    headings: 5,
    entities: 10,
    score: 85,
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    sections: '',
  });

  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentForm, setContentForm] = useState({
    title: '',
    category: '',
    readTime: '',
    gradeLevel: '10th Grade',
    density: '2.5%',
    summary: '',
    keywords: '',
    content: '',
  });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    title: '',
    serviceType: 'Premium Copywriting Service',
    amount: '$199',
    status: 'In Queue' as 'In Queue' | 'In Progress' | 'Under Review' | 'Completed',
  });

  // Check localStorage for unlock state on mount
  useEffect(() => {
    const savedUnlock = localStorage.getItem('apex_admin_unlocked');
    if (savedUnlock === 'true') {
      setIsUnlocked(true);
    }
  }, []);

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

  // ---------------- BRIEF CRUD ----------------
  const openNewBrief = () => {
    setEditingBrief(null);
    setBriefForm({
      title: '',
      category: 'SaaS Technology',
      previewText: '',
      fullBrief: '',
      keywords: 'saas, optimization',
      targetAudience: 'Product Managers',
      searchVolume: '4,500/mo',
      difficulty: 'Easy',
      status: 'Free',
    });
    setIsBriefModalOpen(true);
  };

  const openEditBrief = (brief: ArticleBrief) => {
    setEditingBrief(brief);
    setBriefForm({
      title: brief.title,
      category: brief.category,
      previewText: brief.previewText,
      fullBrief: brief.fullBrief,
      keywords: brief.keywords.join(', '),
      targetAudience: brief.targetAudience,
      searchVolume: brief.searchVolume,
      difficulty: brief.difficulty,
      status: brief.status,
    });
    setIsBriefModalOpen(true);
  };

  const saveBrief = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanBrief: ArticleBrief = {
      id: editingBrief ? editingBrief.id : `brief-${Date.now()}`,
      title: briefForm.title,
      category: briefForm.category,
      previewText: briefForm.previewText,
      fullBrief: briefForm.fullBrief,
      keywords: briefForm.keywords.split(',').map(s => s.trim()).filter(Boolean),
      targetAudience: briefForm.targetAudience,
      searchVolume: briefForm.searchVolume,
      difficulty: briefForm.difficulty,
      status: briefForm.status,
      date: editingBrief ? editingBrief.date : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    if (editingBrief) {
      onEditBrief(cleanBrief);
      onToast('Brief updated successfully!', 'success');
    } else {
      onPublishBrief(cleanBrief);
      onToast('New Brief published!', 'success');
    }
    setIsBriefModalOpen(false);
  };

  // ---------------- OUTLINE CRUD ----------------
  const openNewOutline = () => {
    setEditingOutline(null);
    setOutlineForm({
      title: '',
      category: 'Technology',
      wordCount: '1,500 words',
      headings: 6,
      entities: 12,
      score: 88,
      difficulty: 'Easy',
      sections: 'Introduction\nCore Concepts\nDetailed Case Studies\nConclusion & Takeaways',
    });
    setIsOutlineModalOpen(true);
  };

  const openEditOutline = (out: OutlineItem) => {
    setEditingOutline(out);
    setOutlineForm({
      title: out.title,
      category: out.category,
      wordCount: out.wordCount,
      headings: out.headings,
      entities: out.entities,
      score: out.score,
      difficulty: out.difficulty,
      sections: out.sections.join('\n'),
    });
    setIsOutlineModalOpen(true);
  };

  const saveOutline = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOutline: OutlineItem = {
      id: editingOutline ? editingOutline.id : `outline-${Date.now()}`,
      title: outlineForm.title,
      category: outlineForm.category,
      wordCount: outlineForm.wordCount,
      headings: Number(outlineForm.headings),
      entities: Number(outlineForm.entities),
      score: Number(outlineForm.score),
      difficulty: outlineForm.difficulty,
      sections: outlineForm.sections.split('\n').map(s => s.trim()).filter(Boolean),
    };

    if (editingOutline) {
      onEditOutline(cleanOutline);
      onToast('Outline updated successfully!', 'success');
    } else {
      onPublishOutline(cleanOutline);
      onToast('New Outline published!', 'success');
    }
    setIsOutlineModalOpen(false);
  };

  // ---------------- CONTENT CRUD ----------------
  const openNewContent = () => {
    setEditingContent(null);
    setContentForm({
      title: '',
      category: 'SEO Strategy',
      readTime: '6 min read',
      gradeLevel: '11th Grade',
      density: '2.1%',
      summary: '',
      keywords: 'seo, content strategy',
      content: '',
    });
    setIsContentModalOpen(true);
  };

  const openEditContent = (cnt: ContentItem) => {
    setEditingContent(cnt);
    setContentForm({
      title: cnt.title,
      category: cnt.category,
      readTime: cnt.readTime,
      gradeLevel: cnt.gradeLevel,
      density: cnt.density,
      summary: cnt.summary,
      keywords: cnt.keywords.join(', '),
      content: cnt.content,
    });
    setIsContentModalOpen(true);
  };

  const saveContent = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanContent: ContentItem = {
      id: editingContent ? editingContent.id : `content-${Date.now()}`,
      title: contentForm.title,
      category: contentForm.category,
      readTime: contentForm.readTime,
      gradeLevel: contentForm.gradeLevel,
      density: contentForm.density,
      summary: contentForm.summary,
      keywords: contentForm.keywords.split(',').map(s => s.trim()).filter(Boolean),
      content: contentForm.content,
    };

    if (editingContent) {
      onEditContent(cleanContent);
      onToast('Content updated successfully!', 'success');
    } else {
      onPublishContent(cleanContent);
      onToast('New Content published!', 'success');
    }
    setIsContentModalOpen(false);
  };

  // ---------------- ORDER CRUD ----------------
  const saveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrd: ContentOrder = {
      id: `ord-${Math.floor(100 + Math.random() * 900)}`,
      title: orderForm.title,
      serviceType: orderForm.serviceType,
      amount: orderForm.amount,
      status: orderForm.status,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    onAddNewOrder(newOrd);
    onToast('Simulated order generated!', 'success');
    setIsOrderModalOpen(false);
    setOrderForm({ title: '', serviceType: 'Premium Copywriting Service', amount: '$199', status: 'In Queue' });
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
            <p className="text-xs text-zinc-400">Enter secure password key to access admin parameters</p>
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
              <p className="text-xs text-red-400 text-center font-medium bg-red-950/20 border border-red-900/30 rounded-lg py-2">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs py-3.5 shadow-lg shadow-emerald-950/40 transition-all"
            >
              Unlock Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Full Admin Dashboard
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 min-h-[600px]" id="dashboard-admin-main">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* Sidebar */}
        <aside className="lg:col-span-1" id="admin-sidebar">
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-4 space-y-3 shadow-lg text-white">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-2xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Admin Control</span>
              <button 
                onClick={handleLockPanel}
                className="text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded px-2.5 py-1 font-bold text-zinc-400 transition-all cursor-pointer"
              >
                Lock Panel
              </button>
            </div>

            <div className="space-y-1">
              {/* Briefs Tab button */}
              <button
                onClick={() => setActiveTab('briefs')}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  activeTab === 'briefs' 
                    ? 'bg-zinc-900 text-emerald-400 border border-zinc-800' 
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Briefs Manager</span>
              </button>

              {/* Outlines Tab button */}
              <button
                onClick={() => setActiveTab('outlines')}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  activeTab === 'outlines' 
                    ? 'bg-zinc-900 text-emerald-400 border border-zinc-800' 
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Outlines Manager</span>
              </button>

              {/* Contents Tab button */}
              <button
                onClick={() => setActiveTab('contents')}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  activeTab === 'contents' 
                    ? 'bg-zinc-900 text-emerald-400 border border-zinc-800' 
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <PenTool className="h-4 w-4" />
                <span>Contents Manager</span>
              </button>

              {/* Orders Tab button */}
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  activeTab === 'orders' 
                    ? 'bg-zinc-900 text-emerald-400 border border-zinc-800' 
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <CreditCard className="h-4 w-4" />
                <span>Orders Database</span>
              </button>
            </div>

            <div className="pt-4 border-t border-zinc-900 text-center">
              <button
                onClick={onNavigateToLibrary}
                className="w-full text-2xs font-bold text-zinc-400 hover:text-white flex items-center justify-center space-x-1"
              >
                <FolderOpen className="h-3 w-3" />
                <span>Go to Portfolio Library</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Content Panel Area */}
        <main className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm min-h-[480px]">
            
            {/* --- BRIEFS TAB --- */}
            {activeTab === 'briefs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 font-sans">Article Briefs Database</h2>
                    <p className="text-xs text-slate-500">Add, edit, and publish topic instructions for writers</p>
                  </div>
                  <button
                    onClick={openNewBrief}
                    className="inline-flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 shadow-xs transition-all cursor-pointer"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Publish Brief</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-3 px-2">Title</th>
                        <th className="py-3 px-2">Category</th>
                        <th className="py-3 px-2">Access Status</th>
                        <th className="py-3 px-2">Difficulty</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {briefs.map(b => (
                        <tr key={b.id} className="hover:bg-slate-50/40 text-slate-700">
                          <td className="py-3.5 px-2 font-bold text-slate-800">{b.title}</td>
                          <td className="py-3.5 px-2">{b.category}</td>
                          <td className="py-3.5 px-2">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              b.status === 'Free' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-2">{b.difficulty}</td>
                          <td className="py-3.5 px-2 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button onClick={() => openEditBrief(b)} className="p-1 hover:text-emerald-600" title="Edit">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button onClick={() => onDeleteBrief(b.id)} className="p-1 hover:text-red-600" title="Delete">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* --- OUTLINES TAB --- */}
            {activeTab === 'outlines' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 font-sans">Article Outlines Database</h2>
                    <p className="text-xs text-slate-500">Manage structure parameters and heading elements</p>
                  </div>
                  <button
                    onClick={openNewOutline}
                    className="inline-flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 shadow-xs transition-all cursor-pointer"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Publish Outline</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-3 px-2">Title</th>
                        <th className="py-3 px-2">Category</th>
                        <th className="py-3 px-2">Headings Count</th>
                        <th className="py-3 px-2">Content Score</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {outlines.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50/40 text-slate-700">
                          <td className="py-3.5 px-2 font-bold text-slate-800">{o.title}</td>
                          <td className="py-3.5 px-2">{o.category}</td>
                          <td className="py-3.5 px-2">{o.headings} headings</td>
                          <td className="py-3.5 px-2">
                            <span className="font-semibold text-emerald-600">{o.score}% SEO Match</span>
                          </td>
                          <td className="py-3.5 px-2 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button onClick={() => openEditOutline(o)} className="p-1 hover:text-emerald-600" title="Edit">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button onClick={() => onDeleteOutline(o.id)} className="p-1 hover:text-red-600" title="Delete">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* --- CONTENTS TAB --- */}
            {activeTab === 'contents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 font-sans">Full Content Articles</h2>
                    <p className="text-xs text-slate-500">Write, edit, and store finalized copies for indexation</p>
                  </div>
                  <button
                    onClick={openNewContent}
                    className="inline-flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 shadow-xs transition-all cursor-pointer"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Publish Copy</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-3 px-2">Title</th>
                        <th className="py-3 px-2">Category</th>
                        <th className="py-3 px-2">Reading Time</th>
                        <th className="py-3 px-2">Keyword Density</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {contents.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50/40 text-slate-700">
                          <td className="py-3.5 px-2 font-bold text-slate-800">{c.title}</td>
                          <td className="py-3.5 px-2">{c.category}</td>
                          <td className="py-3.5 px-2">{c.readTime}</td>
                          <td className="py-3.5 px-2">{c.density}</td>
                          <td className="py-3.5 px-2 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button onClick={() => openEditContent(c)} className="p-1 hover:text-emerald-600" title="Edit">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button onClick={() => onDeleteContent(c.id)} className="p-1 hover:text-red-600" title="Delete">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* --- ORDERS TAB --- */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 font-sans">Active Copywriting Orders</h2>
                    <p className="text-xs text-slate-500">Track client transactional order metrics and delivery statuses</p>
                  </div>
                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Order</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-3 px-2">Order ID</th>
                        <th className="py-3 px-2">Title</th>
                        <th className="py-3 px-2">Service Line</th>
                        <th className="py-3 px-2">Investment</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50/40 text-slate-700">
                          <td className="py-3.5 px-2 font-mono text-slate-500 text-[11px]">{o.id}</td>
                          <td className="py-3.5 px-2 font-bold text-slate-800">{o.title}</td>
                          <td className="py-3.5 px-2">{o.serviceType}</td>
                          <td className="py-3.5 px-2 font-mono font-semibold text-slate-900">{o.amount}</td>
                          <td className="py-3.5 px-2">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                              o.status === 'In Progress' ? 'bg-indigo-50 text-indigo-700' :
                              o.status === 'Under Review' ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-700'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-slate-400">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* --- MODAL: BRIEF WRITE/EDIT --- */}
      <AnimatePresence>
        {isBriefModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBriefModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-100 p-6 shadow-2xl z-10 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-150 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">{editingBrief ? 'Modify Existing Brief' : 'Publish New Content Brief'}</h3>
                <button onClick={() => setIsBriefModalOpen(false)}><X className="h-4 w-4 text-slate-400 hover:text-slate-600" /></button>
              </div>
              <form onSubmit={saveBrief} className="space-y-4 text-xs text-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Topic Title</label>
                    <input type="text" required value={briefForm.title} onChange={e => setBriefForm({ ...briefForm, title: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Category Tag</label>
                    <input type="text" required value={briefForm.category} onChange={e => setBriefForm({ ...briefForm, category: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Search Volume</label>
                    <input type="text" value={briefForm.searchVolume} onChange={e => setBriefForm({ ...briefForm, searchVolume: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Target Audience</label>
                    <input type="text" value={briefForm.targetAudience} onChange={e => setBriefForm({ ...briefForm, targetAudience: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Keywords (Comma split)</label>
                    <input type="text" value={briefForm.keywords} onChange={e => setBriefForm({ ...briefForm, keywords: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Difficulty Parameter</label>
                    <select value={briefForm.difficulty} onChange={e => setBriefForm({ ...briefForm, difficulty: e.target.value as any })} className="w-full border border-slate-200 rounded-lg p-2 text-xs">
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">License Access Level</label>
                    <select value={briefForm.status} onChange={e => setBriefForm({ ...briefForm, status: e.target.value as any })} className="w-full border border-slate-200 rounded-lg p-2 text-xs">
                      <option value="Free">Free</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Brief Preview Paragraph</label>
                  <textarea rows={2} required value={briefForm.previewText} onChange={e => setBriefForm({ ...briefForm, previewText: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Full Copywriter Outline Instructions</label>
                  <textarea rows={5} required value={briefForm.fullBrief} onChange={e => setBriefForm({ ...briefForm, fullBrief: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm cursor-pointer">
                    {editingBrief ? 'Save Modifications' : 'Publish to Catalog'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL: OUTLINE WRITE/EDIT --- */}
      <AnimatePresence>
        {isOutlineModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOutlineModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-100 p-6 shadow-2xl z-10 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-150 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">{editingOutline ? 'Edit Core Outline' : 'Publish Core Outline'}</h3>
                <button onClick={() => setIsOutlineModalOpen(false)}><X className="h-4 w-4 text-slate-400 hover:text-slate-600" /></button>
              </div>
              <form onSubmit={saveOutline} className="space-y-4 text-xs text-slate-700">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Outline Article Title</label>
                  <input type="text" required value={outlineForm.title} onChange={e => setOutlineForm({ ...outlineForm, title: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Category Tag</label>
                    <input type="text" required value={outlineForm.category} onChange={e => setOutlineForm({ ...outlineForm, category: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Target Wordcount</label>
                    <input type="text" required value={outlineForm.wordCount} onChange={e => setOutlineForm({ ...outlineForm, wordCount: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Headings</label>
                    <input type="number" required value={outlineForm.headings} onChange={e => setOutlineForm({ ...outlineForm, headings: Number(e.target.value) })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">SEO Entities</label>
                    <input type="number" required value={outlineForm.entities} onChange={e => setOutlineForm({ ...outlineForm, entities: Number(e.target.value) })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">SEO Score Match</label>
                    <input type="number" required value={outlineForm.score} onChange={e => setOutlineForm({ ...outlineForm, score: Number(e.target.value) })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Sections Hierarchy (One per line)</label>
                  <textarea rows={5} required value={outlineForm.sections} onChange={e => setOutlineForm({ ...outlineForm, sections: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs font-sans" />
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-lg cursor-pointer">Publish Outline</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL: CONTENT WRITE/EDIT --- */}
      <AnimatePresence>
        {isContentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsContentModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-100 p-6 shadow-2xl z-10 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-150 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">{editingContent ? 'Edit Copy Article' : 'Publish Completed Copy'}</h3>
                <button onClick={() => setIsContentModalOpen(false)}><X className="h-4 w-4 text-slate-400 hover:text-slate-600" /></button>
              </div>
              <form onSubmit={saveContent} className="space-y-4 text-xs text-slate-700">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Article Title</label>
                    <input type="text" required value={contentForm.title} onChange={e => setContentForm({ ...contentForm, title: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Category Tag</label>
                    <input type="text" required value={contentForm.category} onChange={e => setContentForm({ ...contentForm, category: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Read Time</label>
                    <input type="text" required value={contentForm.readTime} onChange={e => setContentForm({ ...contentForm, readTime: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Grade Score</label>
                    <input type="text" required value={contentForm.gradeLevel} onChange={e => setContentForm({ ...contentForm, gradeLevel: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Keyword Density</label>
                    <input type="text" required value={contentForm.density} onChange={e => setContentForm({ ...contentForm, density: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Keywords</label>
                    <input type="text" required value={contentForm.keywords} onChange={e => setContentForm({ ...contentForm, keywords: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Executive Summary</label>
                  <textarea rows={2} required value={contentForm.summary} onChange={e => setContentForm({ ...contentForm, summary: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Main Core Markdown / Text Article Copy</label>
                  <textarea rows={8} required value={contentForm.content} onChange={e => setContentForm({ ...contentForm, content: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs font-sans" />
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-lg cursor-pointer">Publish Copy</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL: ORDER ADD --- */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOrderModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white rounded-2xl border border-slate-100 p-6 shadow-2xl z-10 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-150 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">Create Simulated Order</h3>
                <button onClick={() => setIsOrderModalOpen(false)}><X className="h-4 w-4 text-slate-400 hover:text-slate-600" /></button>
              </div>
              <form onSubmit={saveOrder} className="space-y-4 text-xs text-slate-700">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Order/Campaign Title</label>
                  <input type="text" required value={orderForm.title} onChange={e => setOrderForm({ ...orderForm, title: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Service Line Type</label>
                  <input type="text" required value={orderForm.serviceType} onChange={e => setOrderForm({ ...orderForm, serviceType: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Investment Amount</label>
                    <input type="text" required value={orderForm.amount} onChange={e => setOrderForm({ ...orderForm, amount: e.target.value })} className="w-full border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Current Status</label>
                    <select value={orderForm.status} onChange={e => setOrderForm({ ...orderForm, status: e.target.value as any })} className="w-full border border-slate-200 rounded-lg p-2 text-xs">
                      <option value="In Queue">In Queue</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-lg cursor-pointer">Generate Order Record</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
