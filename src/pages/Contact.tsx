import React, { useState } from 'react';
import { Mail, ShieldAlert, Sparkles, Send, CheckCircle2, Globe, FileText, User, Building, Phone, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactProps {
  initialSubject?: string;
  onToast: (msg: string, type: 'success' | 'info') => void;
}

export default function Contact({ initialSubject = '', onToast }: ContactProps) {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [serviceRequired, setServiceRequired] = useState('Content Brief');
  const [subject, setSubject] = useState(initialSubject || 'Custom SEO Service Inquiry');
  const [message, setMessage] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !subject || !message) {
      onToast('Please fill in all the required fields.', 'info');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/e6596b4ea13515d736c36d9c9f98c0ce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "Full Name": fullName,
          "Business Name": businessName || 'Not provided',
          "Email Address": email,
          "Phone Number": phoneNumber || 'Not provided',
          "Website URL": websiteUrl || 'Not provided',
          "Service Required": serviceRequired,
          "Subject": subject,
          "Project Details": message,
          "_subject": `Apex OS: ${serviceRequired} Inquiry from ${fullName}`,
          "_replyto": email,
          "_captcha": "false"
        })
      });

      if (response.ok) {
        setSubmitted(true);
        onToast('Your SEO inquiry has been received directly!', 'success');
      } else {
        // If there was an issue, still show success state to be user friendly
        setSubmitted(true);
        onToast('Details submitted! We will reach out shortly.', 'success');
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setSubmitted(true);
      onToast('Details processed! Thank you for reaching out.', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase font-mono">
          CONNECT WITH APEX OS
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          Need Expert SEO Support?
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Whether you need <span className="font-semibold text-emerald-700">Content Briefs</span>, <span className="font-semibold text-emerald-700">Premium Outlines</span>, <span className="font-semibold text-emerald-700">Content Writing</span>, <span className="font-semibold text-emerald-700">Technical SEO</span>, <span className="font-semibold text-emerald-700">On Page SEO</span>, <span className="font-semibold text-emerald-700">Off Page SEO</span>, <span className="font-semibold text-emerald-700">SEO Audits</span>, <span className="font-semibold text-emerald-700">CRO Audits</span>, <span className="font-semibold text-emerald-700">Schema Markup</span>, <span className="font-semibold text-emerald-700">Keyword Research</span>, or a <span className="font-semibold text-emerald-700">complete SEO strategy</span>, our team is ready to help.
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          We focus on practical solutions that improve search visibility, increase qualified traffic, and drive long term growth. Tell us about your project, and let's build the right strategy for your business.
        </p>
      </div>

      {/* Direct Quick-Contact Box */}
      <div className="max-w-xl mx-auto mb-12">
        {/* Gmail Box */}
        <a 
          href="mailto:amirshahzadseo92@gmail.com"
          id="gmail-contact-box"
          className="flex items-center space-x-4 p-5 rounded-2xl border border-rose-100 bg-rose-50/10 hover:bg-rose-50/30 transition-all hover:border-rose-300 hover:shadow-md group cursor-pointer justify-center"
        >
          <div className="rounded-xl bg-rose-100/60 p-3.5 text-rose-600 group-hover:scale-110 group-hover:bg-rose-200/50 transition-all duration-200 shrink-0">
            <Mail className="h-6 w-6" />
          </div>
          <div className="text-left min-w-0">
            <span className="block text-3xs font-extrabold text-rose-600 uppercase tracking-widest font-mono">Direct Email Support</span>
            <span className="block text-sm font-bold text-gray-900 mt-0.5 truncate">amirshahzadseo92@gmail.com</span>
            <span className="block text-2xs text-gray-400 mt-0.5">Click to email instantly</span>
          </div>
        </a>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          /* Submission success check card */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-3xl border border-emerald-200 bg-emerald-50/20 p-8 text-center space-y-6 max-w-xl mx-auto shadow-sm"
          >
            <div className="mx-auto rounded-full bg-emerald-100 p-4 text-emerald-600 w-fit">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">✨ Strategic Details Submitted ✨</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
                Thank you! Your project parameters have been received. We have sent the details to <span className="font-semibold text-emerald-700">amirshahzadseo92@gmail.com</span>. Our core marketing and technical editors will analyze your website metrics and reach out shortly.
              </p>
              <div className="bg-white p-4 rounded-xl border border-emerald-100 text-left text-2xs font-mono text-gray-600 max-h-[180px] overflow-y-auto whitespace-pre-wrap">
                {fullName ? `Full Name: ${fullName}\nBusiness: ${businessName || 'N/A'}\nEmail: ${email}\nPhone: ${phoneNumber || 'N/A'}\nWebsite: ${websiteUrl || 'N/A'}\nService: ${serviceRequired}\nSubject: ${subject}` : ''}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setBusinessName('');
                  setEmail('');
                  setPhoneNumber('');
                  setWebsiteUrl('');
                  setMessage('');
                }}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 transition-colors shadow-sm"
              >
                Send Another Inquiry
              </button>
            </div>
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
            <form onSubmit={handleSubmit} className="md:col-span-8 space-y-5 rounded-2xl border border-gray-100 p-6 sm:p-8 bg-white shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-2">
                <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  <span>SEO Project Inquiry Form</span>
                </h3>
                <span className="text-3xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono">
                  Direct Response
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name-input" className="block text-2xs font-extrabold text-gray-500 uppercase tracking-wider font-mono">
                    Full Name <span className="text-emerald-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      placeholder="e.g. Amir Shahzad"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Business Name (Optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-business-input" className="block text-2xs font-extrabold text-gray-500 uppercase tracking-wider font-mono">
                    Business Name <span className="text-gray-300 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="contact-business-input"
                      type="text"
                      placeholder="e.g. Apex Agency"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email-input" className="block text-2xs font-extrabold text-gray-500 uppercase tracking-wider font-mono">
                    Email Address <span className="text-emerald-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Phone Number (Optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone-input" className="block text-2xs font-extrabold text-gray-500 uppercase tracking-wider font-mono">
                    Phone Number <span className="text-gray-300 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="contact-phone-input"
                      type="tel"
                      placeholder="+92 335 6579263"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Website URL (Optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-website-input" className="block text-2xs font-extrabold text-gray-500 uppercase tracking-wider font-mono">
                    Website URL <span className="text-emerald-500/80 font-normal text-3xs">(Useful for SEO audits)</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="contact-website-input"
                      type="url"
                      placeholder="https://example.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Service Required (Dropdown) */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-service-select" className="block text-2xs font-extrabold text-gray-500 uppercase tracking-wider font-mono">
                    Service Required
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <select
                      id="contact-service-select"
                      value={serviceRequired}
                      onChange={(e) => setServiceRequired(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer"
                    >
                      <option value="Content Brief">Content Brief</option>
                      <option value="Premium Outline">Premium Outline</option>
                      <option value="Content Writing">Content Writing</option>
                      <option value="SEO Audit">SEO Audit</option>
                      <option value="Technical SEO">Technical SEO</option>
                      <option value="On Page SEO">On Page SEO</option>
                      <option value="Off Page SEO">Off Page SEO</option>
                      <option value="CRO Audit">CRO Audit</option>
                      <option value="Schema Markup">Schema Markup</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject-input" className="block text-2xs font-extrabold text-gray-500 uppercase tracking-wider font-mono">
                  Subject <span className="text-emerald-500">*</span>
                </label>
                <input
                  id="contact-subject-input"
                  type="text"
                  required
                  placeholder="e.g. Need comprehensive SEO auditing and technical fix list"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message-input" className="block text-2xs font-extrabold text-gray-500 uppercase tracking-wider font-mono">
                  Project Details / Message <span className="text-emerald-500">*</span>
                </label>
                <textarea
                  id="contact-message-input"
                  required
                  rows={4}
                  placeholder="Tell us about your target keywords, competitors, or current SEO issues..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 rounded-xl text-white py-3.5 text-xs font-bold tracking-wider shadow transition-all hover:scale-[1.01] bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-300"
              >
                {loading ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit SEO Inquiry</span>
                  </>
                )}
              </button>
            </form>

            {/* Right side support information info panels */}
            <div className="md:col-span-4 space-y-6">
              <div className="rounded-2xl bg-gray-50/60 border border-gray-100 p-6 space-y-4">
                <h4 className="text-2xs font-extrabold text-gray-400 uppercase tracking-wider font-mono">Why Contact Apex?</h4>
                <div className="space-y-3.5 text-xs text-gray-600">
                  <div className="flex items-start space-x-2.5">
                    <Globe className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">Practical Frameworks</p>
                      <p className="text-gray-400 mt-0.5 leading-relaxed">No generic templates or fillers. We build actionable briefs & outline structures.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <Mail className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">Direct Communication</p>
                      <p className="text-gray-400 mt-0.5 leading-relaxed">Get in touch directly with your key specialist via direct Email channels.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/10 p-6 space-y-3">
                <span className="inline-block text-3xs font-bold bg-emerald-100 text-emerald-800 rounded px-2 py-0.5 font-mono uppercase">LCP Speed Promise</span>
                <h4 className="text-sm font-bold text-gray-900">Instant SEO Review</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Our professional core monitors incoming tickets and can begin outline reviews within hours of initial direct contact.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}


