import React from 'react';
import { 
  Layers, 
  PenTool, 
  FileText,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { ActivePage, ArticleBrief, OutlineItem, ContentItem } from '../types';

interface HomeProps {
  setCurrentPage: (page: ActivePage) => void;
  briefs?: ArticleBrief[];
  outlines?: OutlineItem[];
  contents?: ContentItem[];
  setSelectedBriefId?: (id: string | null) => void;
  setSearchKeyword?: (keyword: string) => void;
  setActiveLibraryTab?: (tab: 'brief' | 'outline' | 'content') => void;
  setActiveLibraryItemId?: (id: string | null) => void;
  onToast?: (msg: string, type: 'success' | 'info') => void;
  homeConfig?: any;
  onAddBrief?: (b: ArticleBrief) => void;
  onAddOutline?: (o: OutlineItem) => void;
  onAddContent?: (c: ContentItem) => void;
}

export default function Home({ 
  setCurrentPage, 
  briefs = [], 
  outlines = [], 
  contents = [],
  setActiveLibraryTab,
  setActiveLibraryItemId,
  onToast
}: HomeProps) {

  const handleTabClick = (tab: 'brief' | 'outline' | 'content') => {
    if (setActiveLibraryTab) {
      setActiveLibraryTab(tab);
    }
    setCurrentPage('library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-[calc(100vh-140px)] w-full">
    </div>
  );
}
