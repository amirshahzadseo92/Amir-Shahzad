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

export type ActivePage = 'home' | 'library' | 'detail' | 'pricing' | 'contact' | 'dashboard' | 'about' | 'services' | 'resume';

export interface HomeConfig {
  heroTitle: string;
  heroTitleGradient: string;
  heroSubtitle: string;
  badgeText: string;
}

export interface AboutConfig {
  fullName: string;
  roleTitle: string;
  bio: string;
  philosophyTitle: string;
  philosophyText: string;
  missionText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  highlights: string[];
  iconName: string;
  color: string;
  bgGradient: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  skillsUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  details: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  category: 'all' | 'seo' | 'saas' | 'automation';
  rating: number;
  metric: string;
  quote: string;
  logoBg: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  websiteUrl: string;
  serviceRequired: string;
  subject: string;
  message: string;
  date: string;
}

