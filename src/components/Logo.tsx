import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, theme = 'light' }) => {
  const [logoText, setLogoText] = useState<'APEX' | 'OS'>('APEX');

  useEffect(() => {
    const timer = setInterval(() => {
      setLogoText((prev) => (prev === 'APEX' ? 'OS' : 'APEX'));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Dimensions based on size prop
  const containerSize = size === 'sm' ? 'h-9 w-9' : size === 'lg' ? 'h-14 w-14' : 'h-9 w-9 md:h-[38px] md:w-[38px]';
  const outerRingSize = size === 'sm' ? 'h-[44px] w-[44px]' : size === 'lg' ? 'h-[72px] w-[72px]' : 'h-[44px] w-[44px] md:h-[48px] md:w-[48px]';
  const middleRingSize = size === 'sm' ? 'h-[38px] w-[38px]' : size === 'lg' ? 'h-[62px] w-[62px]' : 'h-[38px] w-[38px] md:h-[42px] md:w-[42px]';
  const innerSvgSize = size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-7 w-7' : 'h-5 w-5 md:h-[22px] md:w-[22px]';
  
  // Custom styled templates for APEX and OS inside the emblem
  const apexStyle = size === 'sm' 
    ? 'text-[10px] font-extrabold tracking-tighter italic font-serif' 
    : size === 'lg' 
      ? 'text-[17px] font-extrabold tracking-tighter italic font-serif' 
      : 'text-[10px] md:text-[11.5px] font-extrabold tracking-tighter italic font-serif';

  const osStyle = size === 'sm' 
    ? 'text-[14px] font-extrabold tracking-tighter italic font-serif' 
    : size === 'lg' 
      ? 'text-[24px] font-extrabold tracking-tighter italic font-serif' 
      : 'text-[14px] md:text-[16px] font-extrabold tracking-tighter italic font-serif';

  const outerTextSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-base md:text-[18px]';
  const outerOsTextSize = size === 'sm' ? 'text-xl font-black' : size === 'lg' ? 'text-3xl font-black' : 'text-lg md:text-[22px] font-black';
  const outerSubTextSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[10px]' : 'text-[7.5px] md:text-[8.5px]';

  return (
    <div className="flex items-center gap-2 md:gap-3 group select-none py-0.5 md:py-0.5 relative md:translate-y-[1.5px]">
      {/* Dynamic Automated Outer Ring + Emblem Wrapper */}
      <div className={`relative flex items-center justify-center shrink-0 ${size === 'sm' ? 'h-[44px] w-[44px]' : size === 'lg' ? 'h-[72px] w-[72px]' : 'h-[44px] w-[44px] md:h-[48px] md:w-[48px]'}`}>
        
        {/* AUTOMATION RING 1: Outermost dynamic orbit with dashed line (Slow clockwise rotation) */}
        <div className={`absolute inset-0 m-auto pointer-events-none flex items-center justify-center ${outerRingSize}`}>
          <div 
            className={`w-full h-full rounded-full border border-dashed ${theme === 'dark' ? 'border-white/80' : 'border-slate-950/30'} animate-[spin_20s_linear_infinite]`}
          />
        </div>

        {/* AUTOMATION RING 2: Middle orbit with dotted style (Faster counter-clockwise rotation) */}
        <div className={`absolute inset-0 m-auto pointer-events-none flex items-center justify-center ${middleRingSize}`}>
          <div 
            className={`w-full h-full rounded-full border border-dotted ${theme === 'dark' ? 'border-white/70' : 'border-slate-950/25'} animate-[spin_10s_linear_infinite_reverse]`}
          />
        </div>

        {/* AUTOMATION NODES: High-tech pulsing satellite points with dynamic, automatic color-cycling */}
        <span className="absolute -top-1 -right-1 flex h-2 w-2 z-10">
          <motion.span 
            animate={{
              backgroundColor: [
                "rgba(52, 211, 153, 0.8)", // emerald-400
                "rgba(45, 212, 191, 0.8)", // teal-400
                "rgba(56, 189, 248, 0.8)", // sky-400
                "rgba(251, 191, 36, 0.8)", // amber-400
                "rgba(139, 92, 246, 0.8)", // violet-400
                "rgba(52, 211, 153, 0.8)"  // emerald-400
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="animate-ping absolute inline-flex h-full w-full rounded-full"
          />
          <motion.span 
            animate={{
              backgroundColor: [
                "#10b981", // emerald-500
                "#0d9488", // teal-600
                "#0284c7", // sky-600
                "#d97706", // amber-600
                "#7c3aed", // violet-600
                "#10b981"  // emerald-500
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative inline-flex rounded-full h-2 w-2 border border-slate-950"
          />
        </span>
        
        <span className="absolute -bottom-1 -left-1 flex h-1.5 w-1.5 z-10">
          <motion.span 
            animate={{
              backgroundColor: [
                "rgba(20, 184, 166, 0.6)",  // teal-500
                "rgba(6, 182, 212, 0.6)",   // cyan-500
                "rgba(245, 158, 11, 0.6)",  // amber-500
                "rgba(139, 92, 246, 0.6)",  // violet-500
                "rgba(16, 185, 129, 0.6)",  // emerald-500
                "rgba(20, 184, 166, 0.6)"   // teal-500
              ]
            }}
            transition={{
              duration: 5,
              delay: 1.2, // offset to make them transition asynchronously
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="animate-pulse absolute inline-flex h-full w-full rounded-full"
          />
          <motion.span 
            animate={{
              backgroundColor: [
                "#14b8a6", // teal-500
                "#06b6d4", // cyan-500
                "#f59e0b", // amber-500
                "#8b5cf6", // violet-500
                "#10b981", // emerald-500
                "#14b8a6"  // teal-500
              ]
            }}
            transition={{
              duration: 5,
              delay: 1.2, // offset
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative inline-flex rounded-full h-1.5 w-1.5 border border-slate-950"
          />
        </span>

        {/* Central Geometric Emblem Container */}
        <div className={`relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white shadow-lg shadow-emerald-500/10 border border-emerald-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-500/20 group-hover:border-emerald-500/40 ${containerSize}`}>
          
          {/* Dynamic "Ander ka Text" (Apex / OS) with beautiful Framer Motion text swap */}
          <div className="relative z-10 text-center flex items-center justify-center w-full h-full">
            <AnimatePresence mode="wait">
              {logoText === 'APEX' ? (
                <motion.span
                  key="apex"
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className={`bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent uppercase font-black ${apexStyle}`}
                >
                  APEX
                </motion.span>
              ) : (
                <motion.span
                  key="os"
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className={`bg-gradient-to-r from-teal-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent font-extrabold ${osStyle}`}
                >
                  OS
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Brand Text Column */}
      {showText && (
        <div className="flex flex-col justify-center pl-1 whitespace-nowrap">
          <div className="flex items-baseline gap-1">
            <span className={`font-sans font-black tracking-[0.06em] italic uppercase leading-none ${outerTextSize} ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Apex
            </span>
            <span className={`font-display bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent uppercase leading-none tracking-[0.06em] ${outerOsTextSize}`}>
              OS
            </span>
          </div>
          <span className={`font-display font-semibold tracking-[0.2em] uppercase mt-0.5 md:mt-1.5 leading-none select-none ${outerSubTextSize} ${theme === 'dark' ? 'text-slate-400' : 'text-black'}`}>
            Traffic Engine
          </span>
        </div>
      )}
    </div>
  );
};
