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

export type ActivePage = 'home' | 'library' | 'detail' | 'pricing' | 'blog' | 'contact' | 'dashboard';
