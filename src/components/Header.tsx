import React, { useState } from 'react';
import { Menu, X, ShieldAlert, Sparkles, User, LogIn, ChevronRight, LayoutDashboard, LogOut, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: ActivePage;
  setCurrentPage: (page: ActivePage) => void;
  isLoggedIn: boolean;
  onLoginToggle: () => void;
  onSignUpOpen: () => void;
  onNewArticleClick?: () => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  onLoginToggle,
  onSignUpOpen,
  onNewArticleClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Portfolio', page: 'library' },
    { label: 'Apex Tool', page: 'pricing' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
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
            <Logo size="md" showText={true} theme="dark" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative py-2 text-sm font-medium transition-colors hover:text-emerald-400 ${
                  isActive ? 'text-emerald-400' : 'text-zinc-400'
                }`}
              >
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
          {isLoggedIn && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`relative py-2 text-sm font-medium transition-colors hover:text-emerald-400 ${
                currentPage === 'dashboard' ? 'text-emerald-400' : 'text-zinc-400'
              }`}
            >
              Dashboard
              {currentPage === 'dashboard' && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          )}
        </nav>

        {/* Right side CTA buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center space-x-1.5 rounded-full bg-emerald-950/40 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-900/40 transition-all border border-emerald-900"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>My Workspace</span>
              </button>
              <button
                onClick={onLoginToggle}
                className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={onLoginToggle}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-2"
              >
                Login
              </button>
              <button
                onClick={onSignUpOpen}
                className="flex items-center space-x-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow shadow-emerald-950/30"
              >
                <span>Sign Up</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
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
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex w-full items-center py-2.5 text-base font-medium rounded-lg px-3 ${
                    currentPage === item.page
                      ? 'bg-emerald-950/40 text-emerald-400'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {isLoggedIn && (
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex w-full items-center py-2.5 text-base font-medium rounded-lg px-3 ${
                    currentPage === 'dashboard'
                      ? 'bg-emerald-950/40 text-emerald-400'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
              )}
              <div className="pt-4 border-t border-zinc-900 flex flex-col space-y-2 px-3">
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="flex items-center justify-center space-x-2 rounded-xl bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-400 border border-emerald-900"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>My Workspace</span>
                    </button>
                    <button
                      onClick={onLoginToggle}
                      className="flex items-center justify-center space-x-2 rounded-xl border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-900"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLoginToggle();
                      }}
                      className="flex items-center justify-center rounded-xl border border-zinc-800 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-900"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onSignUpOpen();
                      }}
                      className="flex items-center justify-center rounded-xl bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
