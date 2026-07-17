import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';
import { ActivePage, ServiceItem } from '../types';

interface ServicesProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
  services?: ServiceItem[];
}

export default function Services({ setCurrentPage, onToast, services = [] }: ServicesProps) {
  const activeServices = services || [];

  const handleHireClick = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onToast('Let\'s build your custom SEO growth plan!', 'success');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 bg-slate-50/20 min-h-screen overflow-hidden">
      
      {/* Premium Title Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center space-y-4 max-w-3xl mx-auto mb-16"
        id="services-header"
      >
        <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 shadow-3xs mb-2">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
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
      </motion.div>

      {/* Services Grid with Custom Animated Borders & VIP Aesthetics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16" id="services-grid">
        {activeServices.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400 text-sm font-medium font-sans">
            No services published yet.
          </div>
        ) : (
          activeServices.map((service, index) => {
            const IconComponent = (LucideIcons as any)[service.iconName] || LucideIcons.HelpCircle;
            
            // Map simple color names to Tailwind color utility classes
            const getColorClass = (color: string) => {
              switch (color) {
                case 'emerald': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
                case 'blue': return 'text-blue-600 bg-blue-50 border-blue-100';
                case 'indigo': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
                case 'violet': return 'text-violet-600 bg-violet-50 border-violet-100';
                case 'rose': return 'text-rose-600 bg-rose-50 border-rose-100';
                case 'amber': return 'text-amber-600 bg-amber-50 border-amber-100';
                case 'teal': return 'text-teal-600 bg-teal-50 border-teal-100';
                case 'cyan': return 'text-cyan-600 bg-cyan-50 border-cyan-100';
                case 'orange': return 'text-orange-600 bg-orange-50 border-orange-100';
                case 'sky': return 'text-sky-600 bg-sky-50 border-sky-100';
                case 'fuchsia': return 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100';
                default: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
              }
            };

            const colorClass = getColorClass(service.color);

            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.6), ease: "easeOut" }}
                whileHover={{ 
                  y: -6,
                  scale: 1.025,
                }}
                whileTap={{ scale: 0.98 }}
                className="animated-gradient-border-thin rounded-2xl overflow-hidden p-[2.5px] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                id={`service-card-wrapper-${index}`}
              >
                <div className="bg-white p-6 rounded-[14px] flex flex-col justify-between h-full flex-1 space-y-4">
                  <div className="space-y-4">
                    {/* Icon wrapper */}
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className={`p-3 rounded-xl border ${colorClass} transition-transform duration-300`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </motion.div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {service.shortDesc}
                    </p>

                    {service.highlights && service.highlights.length > 0 && (
                      <ul className="text-xs sm:text-sm text-slate-500 space-y-1 pt-2">
                        {service.highlights.map((highlight: string, idx: number) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Hire Button inside each card to convert leads */}
                  <div className="pt-6 mt-4 border-t border-slate-100 flex justify-between items-center">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={handleHireClick}
                      className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center space-x-1.5 transition-colors cursor-pointer group/btn"
                    >
                      <span>Inquire service</span>
                      <LucideIcons.ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
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
