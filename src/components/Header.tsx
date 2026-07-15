import React, { useState } from 'react';
import { Menu, X, ShieldAlert, Sparkles, User, LogIn, ChevronRight, LayoutDashboard, LogOut, PenTool, Home, Briefcase, FolderOpen, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage, HomeConfig } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: ActivePage;
  setCurrentPage: (page: ActivePage) => void;
  isLoggedIn: boolean;
  onLoginToggle: () => void;
  onSignUpOpen: () => void;
  onNewArticleClick?: () => void;
  homeConfig?: HomeConfig;
}

export default function Header({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  onLoginToggle,
  onSignUpOpen,
  onNewArticleClick,
  homeConfig,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: ActivePage; icon: any }[] = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'About Me', page: 'about', icon: User },
    { label: 'Services', page: 'services', icon: Briefcase },
    { label: 'Portfolio', page: 'library', icon: FolderOpen },
    { label: 'Contact', page: 'contact', icon: Phone },
  ];

  const handleNavClick = (page: ActivePage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-black/95 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-4 lg:px-4">
        {/* Logo & Navigation Action */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center h-full"
          >
            <Logo size="md" showText={true} theme="dark" logoImage={homeConfig?.logoImage} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`group relative flex items-center gap-2 py-2 text-sm font-medium transition-all active:scale-95 hover:text-emerald-400 ${
                  isActive ? 'text-emerald-400' : 'text-zinc-400'
                }`}
              >
                <Icon className={`h-4 w-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 group-active:scale-110 group-active:-rotate-12 ${isActive ? 'text-emerald-500' : ''}`} />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side CTA buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center space-x-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-4.5 py-2 text-sm font-semibold transition-all shadow-sm shadow-emerald-950/20"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin Panel</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 z-50 md:hidden border-t border-b border-zinc-900 bg-black shadow-xl"
          >
            <div className="space-y-1 px-4 py-3 pb-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`group flex w-full items-center gap-3 py-3 text-base font-medium rounded-lg px-3 transition-all active:scale-95 ${
                      currentPage === item.page
                        ? 'bg-emerald-950/40 text-emerald-400'
                        : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-5 w-5 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 group-active:scale-110 group-active:-rotate-12 ${currentPage === item.page ? 'text-emerald-500' : 'text-zinc-400 group-hover:text-emerald-400'}`} />
                    {item.label}
                  </button>
                );
              })}
              {isLoggedIn && (
                <div className="pt-4 border-t border-zinc-900 flex flex-col space-y-2 px-3">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="group flex w-full items-center gap-3 py-3 text-base font-medium rounded-lg px-3 transition-all active:scale-95 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600/20"
                  >
                    <LayoutDashboard className="h-5 w-5 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 group-active:scale-110 group-active:-rotate-12 text-emerald-500" />
                    <span>Admin Panel</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
