import React, { useState } from 'react';
import { Mail, ArrowRight, Github, Twitter, Linkedin, Globe, CheckCircle2, Facebook } from 'lucide-react';
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

            <div className="flex items-center space-x-3">
              <a 
                href="https://wa.me/923356579263" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2.5 border border-slate-200 bg-white hover:bg-slate-50 hover:-translate-y-1 hover:shadow-md rounded-lg transition-all duration-300 w-fit shadow-sm group"
                aria-label="WhatsApp Contact"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366] group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
              <a 
                href="mailto:amirshahzadseo92@gmail.com" 
                className="inline-flex items-center justify-center p-2.5 border border-slate-200 bg-white hover:bg-slate-50 hover:-translate-y-1 hover:shadow-md rounded-lg transition-all duration-300 w-fit shadow-sm group"
                aria-label="Send Email"
              >
                <Mail className="h-5 w-5 text-[#EA4335] group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
              </a>
              <a 
                href="https://www.linkedin.com/in/amirshahzad-seo" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2.5 border border-slate-200 bg-white hover:bg-slate-50 hover:-translate-y-1 hover:shadow-md rounded-lg transition-all duration-300 w-fit shadow-sm group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5 text-[#0A66C2] group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
              </a>
              <a 
                href="https://www.facebook.com/share/1E7sK1KLXW/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2.5 border border-slate-200 bg-white hover:bg-slate-50 hover:-translate-y-1 hover:shadow-md rounded-lg transition-all duration-300 w-fit shadow-sm group"
                aria-label="Facebook Profile"
              >
                <Facebook className="h-5 w-5 text-[#1877F2] group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
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
                    <button onClick={() => navigateTo('about')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left font-semibold">
                      About Me
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('services')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left font-semibold">
                      Growth Services
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('library')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left">
                      Portfolio
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('resume')} className="text-sm text-gray-500 hover:text-emerald-600 transition-colors text-left font-semibold">
                      My Resume
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
          <p className="mt-8 text-sm text-gray-400 md:mt-0 flex items-center gap-1.5 justify-start md:justify-end">
            <button 
              onClick={() => navigateTo('pricing')}
              className="hover:text-emerald-500 focus:outline-none transition-all duration-200 transform hover:scale-110 cursor-pointer font-bold inline-flex items-center justify-center"
              title="Open Apex Tool"
            >
              &copy;
            </button>
            <span>{new Date().getFullYear()} Hafiz Amir Shahzad. Built with premium SaaS integrity.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
