import React from 'react';
import { 
  Layers, 
  Cpu, 
  Globe, 
  Link, 
  Search, 
  MapPin, 
  Sparkles, 
  BarChart3, 
  Target,
  ClipboardCheck,
  ArrowRight,
  Code,
  ShoppingCart,
  Layout
} from 'lucide-react';
import { ActivePage } from '../types';

interface ServicesProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
  services?: any;
}

export default function Services({ setCurrentPage, onToast }: ServicesProps) {
  const seoServices = [
    {
      title: "On Page SEO",
      desc: "Optimize titles, meta descriptions, headings, internal links, and on page content.",
      icon: Layers,
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
      hoverClass: "hover:border-emerald-300 hover:shadow-emerald-50/50"
    },
    {
      title: "Technical SEO",
      desc: "Fix crawl issues, improve site speed, indexing, Core Web Vitals, XML sitemaps, and robots.txt.",
      icon: Cpu,
      colorClass: "text-blue-600 bg-blue-50 border-blue-100",
      hoverClass: "hover:border-blue-300 hover:shadow-blue-50/50"
    },
    {
      title: "Off Page SEO",
      desc: "Build authority through ethical off page SEO strategies.",
      icon: Globe,
      colorClass: "text-indigo-600 bg-indigo-50 border-indigo-100",
      hoverClass: "hover:border-indigo-300 hover:shadow-indigo-50/50"
    },
    {
      title: "Link Building",
      desc: "High quality guest posting, niche edits, outreach, and authority backlinks.",
      icon: Link,
      colorClass: "text-violet-600 bg-violet-50 border-violet-100",
      hoverClass: "hover:border-violet-300 hover:shadow-violet-50/50"
    },
    {
      title: "SEO Audit",
      desc: "Complete website analysis with actionable recommendations.",
      icon: ClipboardCheck,
      colorClass: "text-rose-600 bg-rose-50 border-rose-100",
      hoverClass: "hover:border-rose-300 hover:shadow-rose-50/50"
    },
    {
      title: "Keyword Research",
      desc: "Find high value keywords that attract targeted traffic.",
      icon: Search,
      colorClass: "text-amber-600 bg-amber-50 border-amber-100",
      hoverClass: "hover:border-amber-300 hover:shadow-amber-50/50"
    },
    {
      title: "Local SEO",
      desc: "Optimize Google Business Profile and improve local search rankings.",
      icon: MapPin,
      colorClass: "text-teal-600 bg-teal-50 border-teal-100",
      hoverClass: "hover:border-teal-300 hover:shadow-teal-50/50"
    },
    {
      title: "Content Optimization",
      desc: "Optimize existing content to improve rankings and user experience.",
      icon: Sparkles,
      colorClass: "text-cyan-600 bg-cyan-50 border-cyan-100",
      hoverClass: "hover:border-cyan-300 hover:shadow-cyan-50/50"
    },
    {
      title: "Competitor Analysis",
      desc: "Analyze competitors and identify SEO opportunities.",
      icon: BarChart3,
      colorClass: "text-orange-600 bg-orange-50 border-orange-100",
      hoverClass: "hover:border-orange-300 hover:shadow-orange-50/50"
    },
    {
      title: "SEO Strategy",
      desc: "Create a customized SEO growth plan based on business goals.",
      icon: Target,
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
      hoverClass: "hover:border-emerald-300 hover:shadow-emerald-50/50"
    },
    {
      title: "Custom Website Development",
      desc: "Build fast, responsive, and SEO friendly custom websites tailored to your business needs using modern coding standards.",
      icon: Code,
      colorClass: "text-sky-600 bg-sky-50 border-sky-100",
      hoverClass: "hover:border-sky-300 hover:shadow-sky-50/50"
    },
    {
      title: "Ecommerce SEO",
      desc: "Optimize Shopify, WooCommerce, Magento, and other ecommerce stores to improve search rankings, increase organic traffic, and drive more sales.",
      icon: ShoppingCart,
      colorClass: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100",
      hoverClass: "hover:border-fuchsia-300 hover:shadow-fuchsia-50/50"
    },
    {
      title: "WordPress Development",
      desc: "Create responsive, secure, and user friendly WordPress websites with custom designs, speed optimization, and SEO ready structure.",
      icon: Layout,
      colorClass: "text-violet-600 bg-violet-50 border-violet-100",
      hoverClass: "hover:border-violet-300 hover:shadow-violet-50/50"
    }
  ];

  const handleHireClick = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onToast('Let\'s build your custom SEO growth plan!', 'success');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen animate-fadeIn">
      
      {/* Premium Title Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 shadow-3xs mb-2">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-2xs font-extrabold tracking-widest uppercase font-mono text-emerald-700">
            Professional Offerings
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
          SEO Expertise & Services
        </h1>
        <p className="text-base text-gray-500 leading-relaxed max-w-xl mx-auto font-normal">
          High-performance, data-driven optimization strategies built to dominate rankings and maximize search visibility.
        </p>
      </div>

      {/* Services Grid with Custom Animated Borders & VIP Aesthetics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {seoServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              className={`group p-6 rounded-2xl border border-slate-150 bg-white shadow-3xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between ${service.hoverClass}`}
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl border ${service.colorClass} transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {service.desc}
                </p>
              </div>

              {/* Hire Button inside each card to convert leads */}
              <div className="pt-6 mt-4 border-t border-slate-50 flex justify-between items-center">
                <button
                  onClick={handleHireClick}
                  className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center space-x-1.5 transition-colors cursor-pointer group/btn"
                >
                  <span>Inquire service</span>
                  <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Elegant CTA Callout */}
      <div className="max-w-2xl mx-auto text-center pt-4">
        <div className="animated-gradient-border-thin rounded-2xl p-[2px] shadow-lg hover:scale-[1.01] transition-all duration-300">
          <div className="bg-white px-8 py-10 rounded-2xl space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">
              Ready to Skyrocket Your Organic Traffic?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto font-normal">
              Get custom SEO strategies tailored explicitly for your specific target market and business goals.
            </p>
            <div>
              <button
                onClick={handleHireClick}
                className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm px-8 py-4 rounded-xl transition-all tracking-wider uppercase shadow-md cursor-pointer inline-flex items-center space-x-2"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
