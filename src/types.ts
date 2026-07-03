export interface ArticleBrief {
  id: string;
  title: string;
  category: string;
  previewText: string;
  fullBrief: string;
  keywords: string[];
  targetAudience: string;
  searchVolume: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Free' | 'Premium';
  unlocked?: boolean;
  date: string;
  titleColor?: string;
  fontStyle?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  preview: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  content: string[];
}

export interface ContentOrder {
  id: string;
  title: string;
  serviceType: string;
  status: 'In Queue' | 'In Progress' | 'Under Review' | 'Completed';
  amount: string;
  date: string;
}

export interface DownloadedOutline {
  id: string;
  title: string;
  unlockedAt: string;
  size: string;
}

export interface OutlineItem {
  id: string;
  title: string;
  category: string;
  wordCount: string;
  headings: number;
  entities: number;
  score: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sections: string[];
  titleColor?: string;
  fontStyle?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  gradeLevel: string;
  density: string;
  summary: string;
  keywords: string[];
  content: string;
  titleColor?: string;
  fontStyle?: string;
}

export type ActivePage = 'home' | 'library' | 'detail' | 'pricing' | 'blog' | 'contact' | 'dashboard';
