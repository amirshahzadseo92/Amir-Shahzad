import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  Download, 
  User, 
  Settings, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Plus, 
  ArrowUpRight, 
  Search, 
  DownloadCloud, 
  Database,
  Briefcase,
  Layers,
  Award,
  Globe,
  BellRing,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ORDERS, MOCK_DOWNLOADS } from '../data/mockData';
import { ContentOrder, DownloadedOutline } from '../types';

interface DashboardProps {
  userEmail: string;
  unlockedBriefIds: string[];
  allBriefsCount: number;
  orders: ContentOrder[];
  onAddNewOrder: (order: ContentOrder) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
  onNavigateToLibrary: () => void;
}

export default function Dashboard({
  userEmail,
  unlockedBriefIds,
  allBriefsCount,
  orders,
  onAddNewOrder,
  onToast,
  onNavigateToLibrary,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'outlines' | 'orders' | 'downloads' | 'profile' | 'settings'>('overview');
  
  // Custom states
  const [newOrderTitle, setNewOrderTitle] = useState('');
  const [newOrderService, setNewOrderService] = useState('Single Expert Article');
  const [newOrderCost, setNewOrderCost] = useState('$399');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [userProfileName, setUserProfileName] = useState('Enterprise Growth partner');
  const [userWebsite, setUserWebsite] = useState('https://growthmetric.io');

  // Trigger simulated custom order insertion
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderTitle.trim()) {
      onToast('Please provide a descriptive article topic.', 'info');
      return;
    }

    const created: ContentOrder = {
      id: `ord-${Math.floor(100 + Math.random() * 900)}`,
      title: newOrderTitle,
      serviceType: newOrderService,
      status: 'In Queue',
      amount: newOrderCost,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    onAddNewOrder(created);
    onToast(`Successfully submitted order: ${newOrderTitle}`, 'success');
    setNewOrderTitle('');
    setShowOrderForm(false);
  };

  // Adjust cost preview on service type change
  const handleServiceChange = (service: string) => {
    setNewOrderService(service);
    if (service === 'Single Expert Article') setNewOrderCost('$399');
    else if (service === 'Custom Content Pack') setNewOrderCost('$1,199');
    else if (service === 'High Authority Whitepaper') setNewOrderCost('$1,899');
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'outlines', label: 'Purchased Outlines', icon: FileText, badge: unlockedBriefIds.length ? `${unlockedBriefIds.length}` : null },
    { id: 'orders', label: 'Content Orders', icon: ShoppingBag, badge: orders.filter(o => o.status !== 'Completed').length ? `${orders.filter(o => o.status !== 'Completed').length}` : null },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Workspace Greeting Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase font-mono">Workspace Overview</span>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-1">
            Welcome, {userProfileName.split(' ')[0]}!
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Account: <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">{userEmail}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setActiveTab('orders');
              setShowOrderForm(true);
            }}
            className="flex items-center space-x-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-100 hover:bg-emerald-500 transition-all hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            <span>Order Custom Content</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Tabs */}
        <aside className="lg:col-span-1">
          <nav className="space-y-1 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setShowOrderForm(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-50'
                      : 'text-gray-600 hover:bg-white hover:text-emerald-700 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-emerald-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`inline-block rounded-full px-2 py-0.5 text-2xs font-bold leading-none ${
                      isActive ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Dynamic Area */}
        <main className="lg:col-span-3 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* Tab: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Stats Row */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-gray-400 font-mono">OUTLINES UNLOCKED</span>
                        <p className="text-3xl font-extrabold text-gray-900">{unlockedBriefIds.length} <span className="text-xs font-normal text-gray-400">/ {allBriefsCount}</span></p>
                        <div className="w-24 bg-gray-100 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-emerald-500 h-1.5 rounded-full" 
                            style={{ width: `${Math.min(100, (unlockedBriefIds.length / Math.max(1, allBriefsCount)) * 100)}%` }} 
                          />
                        </div>
                      </div>
                      <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                        <Layers className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-gray-400 font-mono">ACTIVE WRITING ORDERS</span>
                        <p className="text-3xl font-extrabold text-gray-900">{orders.filter(o => o.status !== 'Completed').length}</p>
                        <span className="text-xs text-emerald-600 flex items-center space-x-1 mt-1 font-semibold">
                          <CheckCircle className="h-3.5 w-3.5 inline mr-1" />
                          <span>100% On-time delivery</span>
                        </span>
                      </div>
                      <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                        <Briefcase className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-gray-400 font-mono">SEO DOMAIN RANK GROWTH</span>
                        <p className="text-3xl font-extrabold text-gray-900">+14.2%</p>
                        <span className="text-xs text-emerald-600 flex items-center space-x-0.5 mt-1 font-semibold">
                          <TrendingUp className="h-3.5 w-3.5 inline mr-0.5" />
                          <span>Standard projection</span>
                        </span>
                      </div>
                      <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                        <Award className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* Order Activity */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Recent Content Campaigns</h3>
                        <p className="text-xs text-gray-500">Live operational status of your custom written articles</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center space-x-1"
                      >
                        <span>Manage All</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-50 text-2xs font-bold text-gray-400 uppercase tracking-wider">
                            <th className="pb-3 font-semibold">Campaign Topic</th>
                            <th className="pb-3 font-semibold">Tier Level</th>
                            <th className="pb-3 font-semibold">Order Status</th>
                            <th className="pb-3 font-semibold text-right">Investment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                          {orders.slice(0, 3).map((ord) => (
                            <tr key={ord.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-3 font-semibold text-gray-900 max-w-xs truncate">{ord.title}</td>
                              <td className="py-3 text-gray-500 text-xs font-medium">{ord.serviceType}</td>
                              <td className="py-3">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-bold border ${
                                  ord.status === 'Completed' 
                                    ? 'bg-green-50 text-green-700 border-green-100'
                                    : ord.status === 'Under Review'
                                    ? 'bg-amber-50 text-amber-700 border-amber-100'
                                    : 'bg-blue-50 text-blue-700 border-blue-100'
                                }`}>
                                  {ord.status}
                                </span>
                              </td>
                              <td className="py-3 text-right font-semibold font-mono text-gray-900">{ord.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Instant CTA Grid */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 via-white to-transparent p-6 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-2xs font-bold tracking-wider text-emerald-600 font-mono uppercase">Premium Research</span>
                        <h4 className="text-base font-bold text-gray-900">Need more technical outlines?</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Access 50+ master-class frameworks detailing topic entities, target word lengths, and dynamic internal link schemes.
                        </p>
                      </div>
                      <button 
                        onClick={onNavigateToLibrary}
                        className="mt-4 inline-flex items-center justify-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 shadow transition-all self-start"
                      >
                        <span>Launch Brief Library</span>
                      </button>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col justify-between shadow-sm">
                      <div className="space-y-2">
                        <span className="text-2xs font-bold tracking-wider text-gray-400 font-mono uppercase">Interactive Tools</span>
                        <h4 className="text-base font-bold text-gray-900">Configure custom API Hook</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Integrate Apex OS briefs directly with Headless CMS pipelines to automate layout schema setups.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('settings')}
                        className="mt-4 inline-flex items-center justify-center space-x-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-semibold text-xs px-4 py-2.5 transition-all self-start"
                      >
                        <span>View Settings</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* Tab: PURCHASED OUTLINES */}
              {activeTab === 'outlines' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Unlocked SEO Outlines</h3>
                    <p className="text-sm text-gray-500">Your unlocked professional guidelines ready for writing teams</p>
                  </div>

                  {unlockedBriefIds.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center">
                      <FileText className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                      <h4 className="text-base font-bold text-gray-900">No premium outlines unlocked yet</h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                        Once you unlock any premium briefs inside our catalog, the full structured layouts and semantic SEO instructions will appear here.
                      </p>
                      <button 
                        onClick={onNavigateToLibrary}
                        className="mt-4 inline-flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2"
                      >
                        <span>Browse Catalog</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {MOCK_DOWNLOADS.map((dl) => (
                        <div key={dl.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow transition-shadow flex items-start justify-between">
                          <div className="space-y-1.5">
                            <span className="inline-block text-2xs font-bold text-emerald-600 bg-emerald-50 rounded px-1.5 py-0.5">UNLOCKED</span>
                            <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">{dl.title}</h4>
                            <p className="text-2xs text-gray-400 font-mono">Unlocked on {dl.unlockedAt}</p>
                          </div>
                          <button 
                            onClick={() => onToast(`Downloading: ${dl.title}.zip containing SEO outline files, schema specs and keywords.`, 'success')}
                            className="rounded-lg bg-gray-50 p-2 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="Download Assets"
                          >
                            <DownloadCloud className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: CONTENT ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Custom Content Orchestrator</h3>
                      <p className="text-sm text-gray-500">Submit topics and watch our expert marketing authors create master-class publications</p>
                    </div>
                    
                    {!showOrderForm && (
                      <button 
                        onClick={() => setShowOrderForm(true)}
                        className="flex items-center space-x-1 rounded-xl bg-emerald-600 text-white px-3.5 py-2 text-xs font-semibold shadow hover:bg-emerald-500 transition-all"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Place New Request</span>
                      </button>
                    )}
                  </div>

                  {/* Order Request Form */}
                  {showOrderForm && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-6 space-y-4"
                    >
                      <h4 className="text-sm font-bold text-gray-900 flex items-center space-x-1.5">
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        <span>Request Custom SEO Copywriting</span>
                      </h4>

                      <form onSubmit={handleCreateOrder} className="space-y-4">
                        <div>
                          <label htmlFor="order-title-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Article Title or Target Keyword</label>
                          <input 
                            id="order-title-input"
                            type="text" 
                            required
                            placeholder="e.g. NextJS App Router Advanced Image Optimization Guidelines"
                            value={newOrderTitle}
                            onChange={(e) => setNewOrderTitle(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="order-service-select" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Service Package Tier</label>
                            <select 
                              id="order-service-select"
                              value={newOrderService}
                              onChange={(e) => handleServiceChange(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            >
                              <option value="Single Expert Article">Single Expert Article ($399)</option>
                              <option value="Custom Content Pack">Custom Content Pack ($1,199)</option>
                              <option value="High Authority Whitepaper">High Authority Whitepaper ($1,899)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Estimated Cost</label>
                            <div className="w-full rounded-xl border border-transparent bg-gray-100/80 px-3 py-2 text-sm font-mono font-bold text-gray-900">
                              {newOrderCost}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <button 
                            type="submit"
                            className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-semibold shadow"
                          >
                            Confirm & Queue Order
                          </button>
                          <button 
                            type="button"
                            onClick={() => setShowOrderForm(false)}
                            className="rounded-xl border border-gray-200 text-gray-600 px-4 py-2.5 text-xs font-semibold hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Active Orders List */}
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div key={ord.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xs font-mono font-bold text-gray-400">ID: {ord.id}</span>
                            <span className="text-xs text-emerald-600 font-bold">&#8226;</span>
                            <span className="text-2xs font-semibold text-gray-500 font-mono">{ord.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900">{ord.title}</h4>
                          <p className="text-xs text-gray-500">{ord.serviceType}</p>
                        </div>

                        <div className="flex items-center space-x-4 justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                          <div className="text-right">
                            <span className="block text-2xs font-bold text-gray-400 uppercase font-mono">STATUS</span>
                            <span className={`inline-flex items-center space-x-1 text-xs font-bold ${
                              ord.status === 'Completed' 
                                ? 'text-green-600'
                                : ord.status === 'Under Review'
                                ? 'text-amber-600'
                                : 'text-blue-600'
                            }`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              <span>{ord.status}</span>
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="block text-2xs font-bold text-gray-400 uppercase font-mono">INVESTMENT</span>
                            <span className="text-sm font-bold font-mono text-gray-900">{ord.amount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* Tab: DOWNLOADS */}
              {activeTab === 'downloads' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Document Hub</h3>
                    <p className="text-sm text-gray-500 font-sans">Locate, preview, or bulk download content blueprints associated with your domains</p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                    <div className="divide-y divide-gray-100">
                      {MOCK_DOWNLOADS.map((dl) => (
                        <div key={dl.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-all">
                          <div className="flex items-center space-x-3.5">
                            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                              <Download className="h-5 w-5" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-sm font-bold text-gray-900">{dl.title}</h4>
                              <div className="flex items-center space-x-2 text-2xs text-gray-400 font-mono">
                                <span>{dl.size}</span>
                                <span>&#8226;</span>
                                <span>ZIP Archive</span>
                                <span>&#8226;</span>
                                <span>Unlocked {dl.unlockedAt}</span>
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => onToast(`Initiating system download for: ${dl.title}.zip`, 'success')}
                            className="flex items-center space-x-1 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1.5 text-xs font-semibold"
                          >
                            <DownloadCloud className="h-3.5 w-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Profile Details</h3>
                    <p className="text-sm text-gray-500">Manage owner settings and website domain verification details</p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="profile-name-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Profile Full Name</label>
                        <input 
                          id="profile-name-input"
                          type="text" 
                          value={userProfileName}
                          onChange={(e) => setUserProfileName(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Registered Email</label>
                        <div className="w-full rounded-xl bg-gray-100 px-3 py-2.5 text-sm text-gray-500 font-mono">
                          {userEmail}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="profile-website-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Verified Corporate Domain</label>
                        <input 
                          id="profile-website-input"
                          type="url" 
                          value={userWebsite}
                          onChange={(e) => setUserWebsite(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Plan Level</label>
                        <div className="w-full rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5 text-sm text-emerald-800 font-semibold flex items-center justify-between">
                          <span>Team Professional Growth</span>
                          <span className="text-2xs font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded uppercase font-mono">Active</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => onToast('Profile configurations updated successfully.', 'success')}
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-semibold shadow"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Tab: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Developer Settings</h3>
                    <p className="text-sm text-gray-500">Configure notifications, system alerts, and toggle client credentials</p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                        <div className="space-y-0.5 pr-4">
                          <h4 className="text-sm font-bold text-gray-900 flex items-center space-x-1.5">
                            <BellRing className="h-4 w-4 text-emerald-600" />
                            <span>Notify on custom drafts under review</span>
                          </h4>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            Receive alert notices directly on your designated emails when editorial writers request outlines evaluation.
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4.5 w-4.5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer" />
                      </div>

                      <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                        <div className="space-y-0.5 pr-4">
                          <h4 className="text-sm font-bold text-gray-900 flex items-center space-x-1.5">
                            <Database className="h-4 w-4 text-purple-600" />
                            <span>Mock database synchronization mode</span>
                          </h4>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            Automatically refresh user statistics and download logs using local caching states dynamically.
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4.5 w-4.5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer" />
                      </div>

                      <div className="flex items-center justify-between pb-2">
                        <div className="space-y-0.5 pr-4">
                          <h4 className="text-sm font-bold text-gray-900 flex items-center space-x-1.5">
                            <Globe className="h-4 w-4 text-indigo-600" />
                            <span>Simulated high performance CDN acceleration</span>
                          </h4>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            Cache asset delivery to speed up PDF content outlines render on mobile browsers.
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4.5 w-4.5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer" />
                      </div>
                    </div>

                    <button 
                      onClick={() => onToast('System configurations updated successfully.', 'success')}
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-semibold shadow"
                    >
                      Apply Global Settings
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
