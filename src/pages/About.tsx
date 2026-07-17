import React from 'react';
import { User, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ActivePage, AboutConfig } from '../types';

interface AboutProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
  aboutConfig?: AboutConfig;
}

export default function About({ setCurrentPage, onToast, aboutConfig }: AboutProps) {
  const fullName = aboutConfig?.fullName || "Hafiz Amir Shahzad Saifi";
  const roleTitle = aboutConfig?.roleTitle || "SEO & Web Development Specialist";
  const bio = aboutConfig?.bio || "I'm Hafiz Amir Shahzad Saifi, an SEO Specialist dedicated to helping businesses grow through strategic search engine optimization. I specialize in On Page SEO, Technical SEO, Keyword Research, SEO Audits, Link Building, and Content Optimization. My approach is focused on improving search visibility, increasing organic traffic, and building long-term organic authority with ethical, data-driven frameworks. I deliver top-tier, compliant web engineering and measurable SEO results that create lasting client value.";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-slate-50/30 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Card Container with beautiful flowing gradient border */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="animated-gradient-border rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl p-[5px]"
        id="about-card-container"
      >
        {/* Inner Card Content with solid background and generous padding */}
        <div className="bg-white px-6 py-12 sm:px-10 sm:py-16 text-center space-y-8 rounded-[27px] relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
            id="about-header-section"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-emerald-600 uppercase font-mono px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-3xs">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
              Expert Profile
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {fullName}
            </h1>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-500 tracking-wide uppercase font-mono">
              {roleTitle}
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-center max-w-xl mx-auto whitespace-pre-line"
            id="about-bio-text"
          >
            {bio}
          </motion.p>

          {aboutConfig?.philosophyText && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-left bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2"
            >
              <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                {aboutConfig.philosophyTitle || "Our Philosophy"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {aboutConfig.philosophyText}
              </p>
            </motion.div>
          )}

          {aboutConfig?.missionText && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-left bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2"
            >
              <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                Our Mission
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {aboutConfig.missionText}
              </p>
            </motion.div>
          )}

          {/* CTAs with beautiful hover, tap, and glowing animated-gradient-border-thin borders */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-5 pt-4 w-full max-w-md mx-auto"
            id="about-buttons-section"
          >
            {/* 1. Hire Me Button wrapped in animated-gradient-border-thin */}
            <motion.div
              className="animated-gradient-border-thin rounded-2xl p-[3px] w-full sm:w-auto overflow-hidden shadow-md flex-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <button
                id="hire-me-btn"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-xs px-8 py-4 rounded-[13px] tracking-wider uppercase cursor-pointer w-full transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Hire Me</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
            
            {/* 2. View Portfolio Button wrapped in animated-gradient-border-thin */}
            <motion.div
              className="animated-gradient-border-thin rounded-2xl p-[3px] w-full sm:w-auto overflow-hidden shadow-md flex-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <button
                id="view-portfolio-btn"
                onClick={() => {
                  setCurrentPage('library');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs px-8 py-4 rounded-[13px] tracking-wider uppercase cursor-pointer w-full transition-colors flex items-center justify-center gap-2"
              >
                <span>View Portfolio</span>
                <ExternalLink className="h-4 w-4 text-emerald-500" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
