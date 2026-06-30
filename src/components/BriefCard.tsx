import React from 'react';
import { Eye, ArrowRight, Lock, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ArticleBrief } from '../types';

interface BriefCardProps {
  key?: any;
  brief: ArticleBrief;
  onRead: (id: string) => void;
}

export default function BriefCard({ brief, onRead }: BriefCardProps) {
  // Get difficulty color classes
  const getDifficultyColor = (diff: ArticleBrief['difficulty']) => {
    switch (diff) {
      case 'Easy':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Hard':
        return 'bg-rose-50 text-rose-700 border-rose-100';
    }
  };

  // Assign distinct aesthetic category accents
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'AI & Automation':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'SEO & Growth':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Web Development':
        return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'Content Marketing':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 8px 10px -6px rgba(16, 185, 129, 0.05)' }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 shadow-sm"
    >
      {/* Decorative top gradient on hover */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card Header Info */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(brief.category)}`}>
            {brief.category}
          </span>

          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(brief.difficulty)}`}>
              {brief.difficulty}
            </span>
            
            {brief.status === 'Premium' ? (
              <span className="inline-flex items-center space-x-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 px-2.5 py-0.5 text-xs font-semibold shadow-sm">
                <Lock className="h-3 w-3" />
                <span>Premium</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 px-2.5 py-0.5 text-xs font-semibold shadow-sm">
                <span>Free</span>
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors duration-200 line-clamp-2">
          {brief.title}
        </h3>

        {/* Snippet Preview */}
        <p className="mt-2 text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {brief.previewText}
        </p>

        {/* Keywords */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {brief.keywords.slice(0, 3).map((keyword, index) => (
            <span key={index} className="inline-block text-xs text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded-md">
              #{keyword.replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info & Read Trigger */}
      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-gray-500">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-semibold font-mono text-gray-600">{brief.searchVolume}</span>
        </div>

        <button
          onClick={() => onRead(brief.id)}
          className="flex items-center space-x-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 group-hover:translate-x-1 transition-transform"
        >
          <span>Read Brief</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
