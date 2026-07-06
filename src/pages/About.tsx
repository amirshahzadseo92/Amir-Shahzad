import React from 'react';
import { User } from 'lucide-react';
import { ActivePage, AboutConfig } from '../types';

interface AboutProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
  aboutConfig?: AboutConfig;
}

export default function About({ setCurrentPage }: AboutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen flex items-center justify-center animate-fadeIn">
      {/* Outer container: Minimal, sleek slate frame */}
      <div className="border border-slate-200/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-xs">
        <div className="bg-white px-6 py-12 sm:px-10 sm:py-16 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase font-mono">Expert Profile</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 truncate">
              Hafiz Amir Shahzad Saifi
            </h1>
            <h2 className="text-sm sm:text-base font-extrabold text-emerald-600 tracking-wider uppercase font-mono">
              SEO & Web Development Specialist
            </h2>
          </div>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-center max-w-xl mx-auto">
            I'm Hafiz Amir Shahzad Saifi, an SEO Specialist dedicated to helping businesses grow through strategic search engine optimization. I specialize in On Page SEO, Technical SEO, Keyword Research, SEO Audits, Link Building, and Content Optimization. My approach is focused on improving search visibility, increasing organic traffic, and building long-term organic authority with ethical, data-driven frameworks. I deliver top-tier, compliant web engineering and measurable SEO results that create lasting client value.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 w-full max-w-md mx-auto">
            {/* Elegant, clean primary and secondary CTA buttons */}
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-8 py-3.5 rounded-xl transition-all tracking-wider uppercase cursor-pointer w-full sm:w-auto shadow-xs"
            >
              Hire Me
            </button>
            
            <button
              onClick={() => {
                setCurrentPage('library');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold text-xs px-8 py-3.5 rounded-xl transition-all tracking-wider uppercase cursor-pointer w-full sm:w-auto shadow-3xs"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
