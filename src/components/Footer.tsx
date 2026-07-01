import React, { useState } from 'react';
import { Mail, ArrowRight, Github, Twitter, Linkedin, Globe, CheckCircle2 } from 'lucide-react';
import { ActivePage } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
}

export default function Footer({ setCurrentPage, onToast }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    onToast('Welcome! You have successfully subscribed to Apex OS intelligence reports.', 'success');
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const navigateTo = (page: ActivePage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-100 bg-gray-50/50 text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="cursor-pointer" onClick={() => navigateTo('home')}>
              <Logo size="sm" showText={true} />
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Solutions</h3>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <button onClick={() => navigateTo('library')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left">
                      Portfolio
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('pricing')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left">
                      Premium Outlines
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('contact')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left">
                      Custom Content Writing
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('pricing')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left">
                      SaaS Enterprise Apex Tool
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Resources</h3>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <button onClick={() => navigateTo('blog')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left">
                      SaaS SEO Blog
                    </button>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                      Topic Cluster Guide
                    </a>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('contact')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left">
                      Contact Support
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Column */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Stay Ahead</h3>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Receive curated top-performing high-volume keywords and content strategy guidelines directly to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="mt-4 flex max-w-md items-center relative">
                <label htmlFor="footer-email-input" className="sr-only">Email address</label>
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="footer-email-input"
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-12 text-sm text-gray-900 shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-sm"
                    aria-label="Subscribe"
                  >
                    {subscribed ? <CheckCircle2 className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="mt-12 border-t border-gray-100 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Sitemap</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Cookie Policy</a>
          </div>
          <p className="mt-8 text-sm text-gray-400 md:mt-0">
            &copy; {new Date().getFullYear()} Apex OS. Built with premium SaaS integrity.
          </p>
        </div>
      </div>
    </footer>
  );
}
