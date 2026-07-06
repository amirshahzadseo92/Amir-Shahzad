import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, ArrowRight, BookOpen, Layers, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

interface BlogProps {
  onToast: (msg: string, type: 'success' | 'info') => void;
  blogs?: BlogPost[];
  selectedPostId?: string | null;
  onSelectPostId?: (id: string | null) => void;
}

export default function Blog({ onToast, blogs, selectedPostId, onSelectPostId }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
    if (selectedPostId && blogs) {
      return blogs.find(b => b.id === selectedPostId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (selectedPostId && blogs) {
      const found = blogs.find(b => b.id === selectedPostId);
      if (found) {
        setSelectedPost(found);
      }
    } else if (selectedPostId === null) {
      setSelectedPost(null);
    }
  }, [selectedPostId, blogs]);

  const handleReadFull = (post: BlogPost) => {
    setSelectedPost(post);
    if (onSelectPostId) {
      onSelectPostId(post.id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Blog Index Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase font-mono">SEO Intelligence</span>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">The Apex OS Blog</h1>
        <p className="text-sm text-gray-500">
          Advanced strategies on Generative Engine Optimization, semantic clustering frameworks, and organic lead acquisition.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {selectedPost ? (
          /* Read Active Blog Post Screen */
          <motion.article
            key="article-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedPost(null);
                if (onSelectPostId) {
                  onSelectPostId(null);
                }
              }}
              className="inline-flex items-center space-x-1.5 text-sm font-semibold text-gray-500 hover:text-emerald-600 transition-colors"
            >
              <span>&larr; Back to blog catalog</span>
            </button>

            {/* Title & Banner */}
            <div className="space-y-4">
              <span className="inline-block text-2xs font-bold bg-emerald-50 text-emerald-800 rounded px-2.5 py-1 uppercase border border-emerald-100">
                {selectedPost.category}
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl leading-tight">
                {selectedPost.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-mono">
                <span className="flex items-center space-x-1">
                  <User className="h-3.5 w-3.5 text-emerald-600" />
                  <span>By {selectedPost.author}</span>
                </span>
                <span>&#8226;</span>
                <span className="flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{selectedPost.date}</span>
                </span>
                <span>&#8226;</span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{selectedPost.readTime}</span>
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Core Paragraphs */}
            <div className="text-gray-600 space-y-6 text-sm leading-relaxed whitespace-pre-line">
              {selectedPost.content.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* Newsletter Direct In-Post Card */}
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 flex flex-col justify-between sm:flex-row sm:items-center gap-4">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Did you find this strategic breakdown helpful?</h4>
                <p className="text-xs text-gray-400 mt-0.5">Subscribe to get our weekly private agency summaries.</p>
              </div>
              <button
                onClick={() => onToast('Subscribed to SEO list!', 'success')}
                className="rounded-xl bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 hover:bg-emerald-500 transition-colors"
              >
                Get Intelligence Updates
              </button>
            </div>
          </motion.article>
        ) : (
          /* Post Listing Grid */
          <motion.div
            key="listing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {(blogs || MOCK_BLOG_POSTS).map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-gray-100 bg-white overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image block */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 text-2xs font-bold text-gray-800 shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-gray-900 leading-snug hover:text-emerald-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {post.preview}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="text-[11px] font-mono text-gray-400 font-medium">
                      {post.readTime}
                    </span>
                    <button
                      onClick={() => handleReadFull(post)}
                      className="flex items-center space-x-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
