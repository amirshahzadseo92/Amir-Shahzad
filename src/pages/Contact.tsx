import React, { useState } from 'react';
import { Mail, MessageSquare, ShieldAlert, Sparkles, Send, CheckCircle2, Globe, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactProps {
  initialSubject?: string;
  onToast: (msg: string, type: 'success' | 'info') => void;
}

export default function Contact({ initialSubject = '', onToast }: ContactProps) {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      onToast('Please complete all contact requirements.', 'info');
      return;
    }

    setLoading(true);
    // Simulate real server delivery delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      onToast('Inquiry delivered successfully. Our agency editors are on it!', 'success');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  const selectSubjectPreset = (preset: string) => {
    setSubject(preset);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase font-mono">Enterprise Inbound support</span>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Connect With Apex OS</h1>
        <p className="text-sm text-gray-500">
          Interested in a high-volume custom copywriting plan or looking for custom platform integrations? Send our core SEO team a request.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          /* Submission success check card */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-3xl border border-emerald-100 bg-emerald-50/10 p-8 text-center space-y-6 max-w-xl mx-auto shadow-sm"
          >
            <div className="mx-auto rounded-full bg-emerald-100 p-4 text-emerald-600 w-fit">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Message Delivered Safely!</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                Thank you for reaching out. An expert digital growth specialist has received your outline details and will contact you via email within 4 hours.
              </p>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          /* Form Content grid split with some trust cards */
          <motion.div
            key="form-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-10 md:grid-cols-12 items-start"
          >
            {/* Left side Form inputs */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-5 rounded-2xl border border-gray-100 p-6 sm:p-8 bg-white shadow-sm">
              <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                <Mail className="h-5 w-5 text-emerald-600" />
                <span>Editorial Support Form</span>
              </h3>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Your Work Email</label>
                <input
                  id="contact-email-input"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Inquiry Subject</label>
                <input
                  id="contact-subject-input"
                  type="text"
                  required
                  placeholder="e.g. Bulk custom content order request for Next.js topic"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Quick Preset click helpers */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <button
                  type="button"
                  onClick={() => selectSubjectPreset('Enterprise SaaS Partnership')}
                  className="rounded bg-gray-50 hover:bg-emerald-50 text-[10px] text-gray-500 hover:text-emerald-800 border border-gray-100 font-semibold font-mono px-2 py-1"
                >
                  + Enterprise SaaS
                </button>
                <button
                  type="button"
                  onClick={() => selectSubjectPreset('Bulk Content Pricing Request')}
                  className="rounded bg-gray-50 hover:bg-emerald-50 text-[10px] text-gray-500 hover:text-emerald-800 border border-gray-100 font-semibold font-mono px-2 py-1"
                >
                  + Bulk Articles pricing
                </button>
                <button
                  type="button"
                  onClick={() => selectSubjectPreset('Technical SEO custom integration')}
                  className="rounded bg-gray-50 hover:bg-emerald-50 text-[10px] text-gray-500 hover:text-emerald-800 border border-gray-100 font-semibold font-mono px-2 py-1"
                >
                  + Custom API Hooks
                </button>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Describe your Content Goals</label>
                <textarea
                  id="contact-message-input"
                  required
                  rows={5}
                  placeholder="Describe your domain niche, targeted keyword counts, or outline custom guidelines..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-300 text-white py-3.5 text-xs font-bold tracking-wide shadow transition-all hover:scale-[1.01]"
              >
                {loading ? (
                  <span>Delivering to Editors...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Strategic Inquiry</span>
                  </>
                )}
              </button>
            </form>

            {/* Right side support information info panels */}
            <div className="md:col-span-5 space-y-6">
              <div className="rounded-2xl bg-gray-50/60 border border-gray-100 p-6 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Global Office Hubs</h4>
                <div className="space-y-3.5 text-xs text-gray-600">
                  <div className="flex items-start space-x-2.5">
                    <Globe className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">San Francisco Headquarters</p>
                      <p className="text-gray-400 mt-0.5 font-mono">100 Pine Street, 14th Floor, CA 94111</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <MessageSquare className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">Immediate Slack Integration</p>
                      <p className="text-gray-400 mt-0.5 leading-relaxed">Enterprise tier users receive private growth channels directly linking writing rooms to CMS pipelines.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-6 space-y-3">
                <span className="inline-block text-3xs font-bold bg-emerald-100 text-emerald-800 rounded px-2 py-0.5 font-mono uppercase">LCP Speed Promise</span>
                <h4 className="text-sm font-bold text-gray-900">Instant SEO Consult</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Our agency maintains a 98% positive delivery record on complex topics like machine-learning pipelines and cloud databases.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
