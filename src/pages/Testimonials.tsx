import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ThumbsUp, 
  ShieldCheck, 
  Clock, 
  Plus, 
  CheckCircle2,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage, TestimonialItem } from '../types';

interface TestimonialsProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
  testimonials?: TestimonialItem[];
  setTestimonials?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function Testimonials({ setCurrentPage, onToast, testimonials: propTestimonials, setTestimonials: propSetTestimonials }: TestimonialsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'seo' | 'saas' | 'automation'>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New Testimonial Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState<'seo' | 'saas' | 'automation'>('seo');
  const [metricLabel, setMetricLabel] = useState('');

  const metrics = [
    { label: 'Avg organic growth', value: '+145%', detail: 'Within first 90 days', icon: TrendingUp },
    { label: 'Technical accuracy', value: '100%', detail: 'Zero rich-snippet errors', icon: ShieldCheck },
    { label: 'Time savings', value: '45h/mo', detail: 'Per content production manager', icon: Clock }
  ];

  const initialTestimonials = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'VP of Growth',
      company: 'ScribeSaaS Platforms',
      category: 'saas',
      rating: 5,
      metric: '+180% Organic Leads',
      quote: 'Hafiz Amir Saifi transformed how our editing team approaches topic outlines. The semantic silos he designed eliminated our keyword cannibalization problems within weeks. True expertise.',
      logoBg: 'bg-emerald-50 text-emerald-700'
    },
    {
      id: 2,
      name: 'David Kael',
      role: 'Director of Content',
      company: 'TechFlow Systems',
      category: 'automation',
      rating: 5,
      metric: '-50 Hours Manual Work / Mo',
      quote: 'The outline automation pipeline Hafiz engineered for our dashboard is phenomenal. It takes our primary seed entities and generates clean, structurally correct content outlines ready for our writing team in seconds.',
      logoBg: 'bg-blue-50 text-blue-700'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Founder',
      company: 'LearnSphere Education',
      category: 'seo',
      rating: 5,
      metric: 'Sub-24h Index Coverage',
      quote: 'Our site struggled to get indexed after our migration. Hafiz audited our schema structures, resolved crawler budget bottlenecks, and got our vital hub pages ranking in record time. Exceeded expectations.',
      logoBg: 'bg-indigo-50 text-indigo-700'
    },
    {
      id: 4,
      name: 'Marcus Brody',
      role: 'Head of SEO Strategy',
      company: 'FinTech Capital',
      category: 'seo',
      rating: 5,
      metric: 'Top 3 rankings for 42 core phrases',
      quote: 'His grasp of Topical Authority is exceptional. Instead of telling us to write more blogs, Hafiz configured beautiful interlinking pathways that mapped directly to consumer search intent. Our visibility has never been better.',
      logoBg: 'bg-amber-50 text-amber-700'
    },
    {
      id: 5,
      name: 'Amiya Gupta',
      role: 'Product Manager',
      company: 'Veloce Logistics Corp',
      category: 'automation',
      rating: 5,
      metric: '100% Schema accuracy rate',
      quote: 'We hired Hafiz to inject pristine JSON-LD markup on our service pages. Not only is our structured data now error-free, but we have unlocked rich FAQ listings that boosted search CTR on day one.',
      logoBg: 'bg-purple-50 text-purple-700'
    }
  ];

  const [localTestimonials, setLocalTestimonials] = useState<any[]>(initialTestimonials);
  const testimonials = propTestimonials || localTestimonials;
  const setTestimonials = propSetTestimonials || setLocalTestimonials;

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !company || !text) {
      onToast('Please fill in all required fields.', 'info');
      return;
    }

    const newTestimonial = {
      id: testimonials.length + 1,
      name,
      role,
      company,
      category: selectedCategory,
      rating,
      metric: metricLabel || 'Verified Performance',
      quote: text,
      logoBg: 'bg-emerald-50 text-emerald-700'
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setIsSubmitModalOpen(false);
    
    // Reset form fields
    setName('');
    setRole('');
    setCompany('');
    setText('');
    setRating(5);
    setMetricLabel('');

    onToast('Thank you! Your testimonial has been published successfully.', 'success');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-10 mb-12 gap-6">
        <div className="text-left space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 shadow-3xs">
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-2xs font-extrabold tracking-widest uppercase font-mono text-emerald-700">
              Verified Proof & Reviews
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            Client Testimonials
          </h1>
          <p className="text-sm text-gray-500">
            Read transparent success stories from organizations leveraging my Topical Authority blueprints and custom dashboards.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center space-x-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs px-5 py-3.5 transition-all shadow-md cursor-pointer group"
          >
            <Plus className="h-4 w-4" />
            <span>Submit Your Review</span>
          </button>
        </div>
      </div>

      {/* Trust Metrics Board */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div 
              key={idx} 
              className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30 text-left space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                  {metric.label}
                </span>
                <div className="p-2 rounded-xl bg-white border border-slate-100 text-emerald-600">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-black text-gray-900 font-sans tracking-tight block">
                  {metric.value}
                </span>
                <span className="text-3xs text-gray-400 font-semibold block mt-1">
                  {metric.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Menu */}
      <div className="flex border-b border-slate-100 gap-2 mb-10 overflow-x-auto pb-1 scrollbar-none text-left">
        {[
          { key: 'all', label: 'All Success Stories' },
          { key: 'seo', label: 'Technical SEO & Crawl' },
          { key: 'saas', label: 'SaaS Traffic & Growth' },
          { key: 'automation', label: 'Custom Dashboards' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveCategory(tab.key as any);
              onToast(`Filtered reviews by ${tab.label}`, 'info');
            }}
            className={`py-2.5 px-4 text-2xs font-extrabold uppercase tracking-wider font-mono rounded-xl border transition-all shrink-0 cursor-pointer ${
              activeCategory === tab.key 
                ? 'bg-emerald-600 border-emerald-600 text-white shadow shadow-emerald-100' 
                : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-left">
        {filteredTestimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="p-6 rounded-3xl border border-slate-100 bg-white shadow-3xs hover:shadow-2xs transition-all flex flex-col justify-between relative group"
          >
            {/* Quote Icon watermark background */}
            <Quote className="absolute right-6 top-6 h-12 w-12 text-slate-100/60 -z-10 group-hover:scale-110 transition-transform" />
            
            <div className="space-y-4">
              {/* Star ratings */}
              <div className="flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Verified Metric Badge */}
              <div className="inline-flex items-center space-x-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 text-[10px] font-extrabold text-emerald-800 font-mono">
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{testimonial.metric}</span>
              </div>

              {/* Testimonial text */}
              <p className="text-xs text-gray-600 leading-relaxed font-sans italic">
                "{testimonial.quote}"
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center space-x-3 pt-6 border-t border-slate-50 mt-6">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-xs ${testimonial.logoBg}`}>
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-950">{testimonial.name}</h4>
                <p className="text-3xs text-gray-400 font-semibold mt-0.5">
                  {testimonial.role}, <span className="text-gray-600">{testimonial.company}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/15 p-8 sm:p-10 text-center space-y-6 max-w-3xl mx-auto shadow-3xs relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[200px] w-[200px] rounded-full bg-emerald-50/40 blur-2xl -z-10" />
        <div className="mx-auto rounded-xl bg-emerald-50 text-emerald-600 p-3.5 w-fit border border-emerald-100">
          <Sparkles className="h-6 w-6 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-gray-950 tracking-tight">
            Ready to Build Your Own Success Story?
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            Join the list of high-ranking content teams. Connect with me directly to configure your site parameters and initialize organic ranking improvements.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <button
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onToast('Requesting custom audit consultation', 'info');
            }}
            className="flex items-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs px-6 py-3.5 transition-all shadow-md cursor-pointer group"
          >
            <span>Initiate Free SEO Strategy Session</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Interactive Modal (Testimonial submission) */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-8 max-w-lg w-full text-left space-y-5"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                <h3 className="text-lg font-extrabold text-gray-950 tracking-tight">
                  Share Your Experience
                </h3>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xs font-bold font-mono p-1"
                >
                  [ESC] CLOSE
                </button>
              </div>

              <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-3xs font-extrabold text-gray-400 uppercase tracking-wider font-mono">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full text-xs rounded-xl border border-slate-100 bg-slate-50/50 p-3 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-3xs font-extrabold text-gray-400 uppercase tracking-wider font-mono">
                      Professional Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. VP of Growth"
                      className="w-full text-xs rounded-xl border border-slate-100 bg-slate-50/50 p-3 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-3xs font-extrabold text-gray-400 uppercase tracking-wider font-mono">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. TechFlow Systems"
                      className="w-full text-xs rounded-xl border border-slate-100 bg-slate-50/50 p-3 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-3xs font-extrabold text-gray-400 uppercase tracking-wider font-mono">
                      Metric Highlighted (Optional)
                    </label>
                    <input
                      type="text"
                      value={metricLabel}
                      onChange={(e) => setMetricLabel(e.target.value)}
                      placeholder="e.g. +180% Organic Leads"
                      className="w-full text-xs rounded-xl border border-slate-100 bg-slate-50/50 p-3 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-3xs font-extrabold text-gray-400 uppercase tracking-wider font-mono">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="w-full text-xs rounded-xl border border-slate-100 bg-slate-50/50 p-3 outline-none focus:border-emerald-500 font-sans"
                    >
                      <option value="seo">Technical SEO</option>
                      <option value="saas">SaaS Traffic & Growth</option>
                      <option value="automation">Custom Automation Tools</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-3xs font-extrabold text-gray-400 uppercase tracking-wider font-mono">
                      Rating
                    </label>
                    <div className="flex items-center space-x-1.5 h-[42px]">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setRating(val)}
                          className="text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star className={`h-5.5 w-5.5 ${rating >= val ? 'fill-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-3xs font-extrabold text-gray-400 uppercase tracking-wider font-mono">
                    Testimonial Comment *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us about the project deliverables, communication, and traffic achievements..."
                    className="w-full text-xs rounded-xl border border-slate-100 bg-slate-50/50 p-3 outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="py-3 px-5 text-2xs font-extrabold font-mono uppercase tracking-wider text-gray-400 hover:text-gray-600 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-2xs uppercase tracking-wider cursor-pointer"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
