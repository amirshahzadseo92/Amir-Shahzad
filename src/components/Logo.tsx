import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  theme?: 'light' | 'dark';
  logoImage?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, theme = 'light', logoImage }) => {
  const [activeLetterIdx, setActiveLetterIdx] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLetterIdx((prev) => (prev + 1) % 3);
    }, 1600); // Transitions to the next letter every 1.6 seconds
    return () => clearInterval(timer);
  }, []);

  // Dimensions based on size prop
  const containerSize = size === 'sm' ? 'h-9 w-9' : size === 'lg' ? 'h-14 w-14' : 'h-9 w-9 md:h-[42px] md:w-[42px]';
  const outerRingSize = size === 'sm' ? 'h-[44px] w-[44px]' : size === 'lg' ? 'h-[72px] w-[72px]' : 'h-[44px] w-[44px] md:h-[52px] md:w-[52px]';
  const middleRingSize = size === 'sm' ? 'h-[38px] w-[38px]' : size === 'lg' ? 'h-[62px] w-[62px]' : 'h-[38px] w-[38px] md:h-[46px] md:w-[46px]';
  const innerSvgSize = size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-7 w-7' : 'h-5 w-5 md:h-[22px] md:w-[22px]';
  
  // Custom styled templates for single H, A, S letters inside the emblem (larger and prominent)
  const hasLetterStyle = size === 'sm' 
    ? 'text-[18px] font-black font-sans select-none' 
    : size === 'lg' 
      ? 'text-[30px] font-black font-sans select-none' 
      : 'text-[19px] md:text-[21.5px] font-black font-sans select-none';

  const outerTextSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-base md:text-[18px]';
  const outerOsTextSize = size === 'sm' ? 'text-xl font-black' : size === 'lg' ? 'text-3xl font-black' : 'text-lg md:text-[22px] font-black';
  const outerSubTextSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[10px]' : 'text-[7.5px] md:text-[8.5px]';

  return (
    <div className="flex items-center gap-2 md:gap-3 group select-none py-0.5 md:py-0.5 relative md:translate-y-[1.5px]">
      {/* Dynamic Automated Outer Ring + Emblem Wrapper */}
      <div className={`relative flex items-center justify-center shrink-0 ${size === 'sm' ? 'h-[44px] w-[44px]' : size === 'lg' ? 'h-[72px] w-[72px]' : 'h-[44px] w-[44px] md:h-[52px] md:w-[52px]'}`}>
        
        {/* AUTOMATION RING 1: Outermost dynamic orbit with dashed line (Slow clockwise rotation) */}
        <div className={`absolute inset-0 m-auto pointer-events-none flex items-center justify-center ${outerRingSize}`}>
          <div 
            className={`w-full h-full rounded-full border border-dashed ${theme === 'dark' ? 'border-white' : 'border-slate-950/30'} animate-[spin_20s_linear_infinite]`}
          />
        </div>

        {/* AUTOMATION RING 2: Middle orbit with dotted style (Faster counter-clockwise rotation) */}
        <div className={`absolute inset-0 m-auto pointer-events-none flex items-center justify-center ${middleRingSize}`}>
          <div 
            className={`w-full h-full rounded-full border border-dotted ${theme === 'dark' ? 'border-white' : 'border-slate-950/25'} animate-[spin_10s_linear_infinite_reverse]`}
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
                "rgba(34, 197, 94, 0.8)", // green-400
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
                "#16a34a", // green-600
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
                "rgba(34, 197, 94, 0.6)",  // green-500
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
                "#22c55e", // green-500
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
          
          {/* Animated active letter in the exact center (darmeyan) with a beautiful sequential sliding carousel transition */}
          <div className="relative z-10 text-center flex items-center justify-center w-full h-full overflow-hidden rounded-full">
            {logoImage ? (
              <img 
                src={logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover select-none rounded-full" 
                style={{
                  imageRendering: 'auto',
                  WebkitFontSmoothing: 'antialiased',
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            ) : (
            <AnimatePresence mode="wait">
              <motion.span
                key={activeLetterIdx}
                initial={{ opacity: 0, x: 12, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1
                }}
                exit={{ opacity: 0, x: -12, scale: 0.8 }}
                transition={{ 
                  x: { duration: 0.35, ease: "easeOut" },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.3, ease: "easeOut" }
                }}
                className={`bg-gradient-to-br from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent uppercase font-black ${hasLetterStyle}`}
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }}
              >
                {['H', 'A', 'S'][activeLetterIdx]}
              </motion.span>
            </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Brand Text Column */}
      {showText && (
        <div className="flex flex-col justify-center pl-1 whitespace-nowrap">
          <div className="flex items-baseline gap-1">
            <span className={`font-sans font-black tracking-[0.06em] italic uppercase leading-none ${outerTextSize} ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Hafiz Amir
            </span>
            <span className={`font-display bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent uppercase leading-none tracking-[0.06em] ${outerOsTextSize}`}>
              Shahzad
            </span>
          </div>
          <span className={`font-mono font-bold tracking-[0.12em] uppercase mt-0.5 md:mt-1.5 leading-none select-none ${outerSubTextSize} bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent`}>
            SEO & Development Specialist
          </span>
        </div>
      )}
    </div>
  );
};
