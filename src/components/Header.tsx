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
    { label: 'Content Hub', page: 'library' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & New Article Action */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer"
          >
            <Logo size="md" showText={true} />
          </div>

          <button
            onClick={() => {
              if (onNewArticleClick) {
                onNewArticleClick();
              } else {
                handleNavClick('library');
              }
            }}
            className="hidden md:flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow shadow-emerald-100 shrink-0 cursor-pointer"
          >
            <PenTool className="h-3.5 w-3.5" />
            <span>New Article</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative py-2 text-sm font-medium transition-colors hover:text-emerald-600 ${
                  isActive ? 'text-emerald-600' : 'text-gray-500'
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
              className={`relative py-2 text-sm font-medium transition-colors hover:text-emerald-600 ${
                currentPage === 'dashboard' ? 'text-emerald-600' : 'text-gray-500'
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
                className="flex items-center space-x-1.5 rounded-full bg-emerald-50/80 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-all border border-emerald-100"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>My Workspace</span>
              </button>
              <button
                onClick={onLoginToggle}
                className="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={onLoginToggle}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
              >
                Login
              </button>
              <button
                onClick={onSignUpOpen}
                className="flex items-center space-x-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow shadow-emerald-100"
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
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:outline-none"
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
            className="absolute top-16 left-0 right-0 z-50 md:hidden border-t border-b border-gray-100 bg-white shadow-xl"
          >
            <div className="space-y-1 px-4 py-3 pb-6">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex w-full items-center py-2.5 text-base font-medium rounded-lg px-3 ${
                    currentPage === item.page
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </button>
              )}
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2 px-3">
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="flex items-center justify-center space-x-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>My Workspace</span>
                    </button>
                    <button
                      onClick={onLoginToggle}
                      className="flex items-center justify-center space-x-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLoginToggle();
                      }}
                      className="flex items-center justify-center rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
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
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
