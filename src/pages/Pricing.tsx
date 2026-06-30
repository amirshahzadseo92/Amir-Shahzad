import React, { useState } from 'react';
import { Check, Info, Shield, HelpCircle, ArrowRight, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { ActivePage } from '../types';

interface PricingProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
}

export default function Pricing({ setCurrentPage, onToast }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const handleSelectPlan = (planName: string) => {
    onToast(`Selected: ${planName} request simulation triggered. Redirecting to workspace...`, 'success');
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const plans = [
    {
      name: 'Premium Outline License',
      tagline: 'Ideal for teams with in-house copywriting resources.',
      priceMonthly: '$49',
      priceAnnual: '$39',
      cta: 'Subscribe to Blueprint Access',
      popular: false,
      features: [
        'Unrestricted access to 100+ SEO article briefs',
        'Download complete structured schemas (JSON-LD)',
        'Full target keyword mapping lists',
        'Latent semantic entity recommendations',
        'Search volume and keyword difficulty filters',
        'Priority access to newly launched briefs',
        'Export formats (MD, JSON, DOCX)',
      ]
    },
    {
      name: 'Custom Content Writing',
      tagline: 'Premium fully structured copy written by SaaS subject experts.',
      priceMonthly: '$399',
      priceAnnual: '$349',
      periodText: 'per article',
      cta: 'Order Professional Content',
      popular: true,
      features: [
        'Everything in Premium Outline Access',
        'Professional marketing copywriter assigned to your brand',
        'Deep semantic clustering alignment',
        'Double editor proofing for absolute readability',
        'Unlimited revisions within 14 days of draft delivery',
        'High resolution royalty-free graphic suggestions',
        '100% human authenticity score report',
        'Integrated custom schema tags injected',
      ]
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase font-mono">Transparent Investment</span>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Apex OS SaaS & Agency Pricing</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Unlock high-performing marketing layouts or let our professional copywriters craft elite, search-optimized articles directly.
        </p>

        {/* Toggle Billing Period */}
        <div className="flex items-center justify-center pt-2">
          <div className="relative flex rounded-full bg-gray-100 p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                billingPeriod === 'monthly' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all flex items-center space-x-1 ${
                billingPeriod === 'annual' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1 py-0.5 leading-none">Save 20%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto lg:grid-cols-2 items-stretch pt-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`rounded-3xl border p-8 relative flex flex-col justify-between transition-shadow hover:shadow-xl ${
              plan.popular 
                ? 'border-emerald-500 bg-gradient-to-b from-emerald-50/20 via-white to-transparent shadow-md' 
                : 'border-gray-200 bg-white'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center space-x-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                <Star className="h-3.5 w-3.5 fill-white" />
                <span>RECOMMENDED PLATFORM CHOICE</span>
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{plan.tagline}</p>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">
                  {billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceAnnual}
                </span>
                <span className="text-base font-semibold text-gray-500 ml-2">
                  {plan.periodText || (billingPeriod === 'monthly' ? '/mo' : '/mo, billed annually')}
                </span>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 border-t border-gray-100 pt-6">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-3 text-sm text-gray-600 leading-normal">
                    <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA action button */}
            <div className="pt-8">
              <button
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full rounded-2xl py-3.5 text-xs font-bold tracking-wide transition-all ${
                  plan.popular 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-100' 
                    : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust guarantees badge banner */}
      <section className="mt-16 text-center max-w-3xl mx-auto p-6 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1 text-emerald-600 font-bold">
          <Shield className="h-4 w-4" />
          <span>Risk-Free Guarantee</span>
        </div>
        <p>
          We stand by our outlines. If your team finds the schema mapping lacking in structure, request a 100% full refund within 7 days.
        </p>
      </section>

    </div>
  );
}
