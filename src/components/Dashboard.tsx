import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Sparkles, 
  Edit, 
  Trash2, 
  Layers, 
  FileText, 
  PenTool, 
  FolderOpen,
  X,
  Palette,
  Check,
  Home,
  User,
  GraduationCap,
  MessageSquare,
  BookOpen,
  Inbox,
  Plus,
  Eye,
  Briefcase,
  TrendingUp,
  Download,
  Image,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ArticleBrief, OutlineItem, ContentItem, ContentOrder, HomeConfig, AboutConfig, ServiceItem, ExperienceItem, TestimonialItem, BlogPost, ContactSubmission, EducationItem, CertificationItem, SkillItem, SeoImage } from '../types';

interface DashboardProps {
  userEmail: string;
  unlockedBriefIds: string[];
  allBriefsCount: number;
  orders: ContentOrder[];
  onAddNewOrder: (newOrder: ContentOrder) => void;
  onToast: (msg: string, type: 'success' | 'info' | 'error') => void;
  onNavigateToLibrary: () => void;
  briefs: ArticleBrief[];
  outlines: OutlineItem[];
  contents: ContentItem[];
  onPublishBrief: (b: ArticleBrief) => void;
  onPublishOutline: (o: OutlineItem) => void;
  onPublishContent: (c: ContentItem) => void;
  onEditBrief: (b: ArticleBrief) => void;
  onDeleteBrief: (id: string) => void;
  onEditOutline: (o: OutlineItem) => void;
  onDeleteOutline: (id: string) => void;
  onEditContent: (c: ContentItem) => void;
  onDeleteContent: (id: string) => void;

  homeConfig: HomeConfig;
  onUpdateHomeConfig: (cfg: HomeConfig) => void;
  aboutConfig: AboutConfig;
  onUpdateAboutConfig: (cfg: AboutConfig) => void;
  services: ServiceItem[];
  onUpdateServices: (items: ServiceItem[]) => void;
  experiences: ExperienceItem[];
  onUpdateExperiences: (items: ExperienceItem[]) => void;
  education: EducationItem[];
  onUpdateEducation: (items: EducationItem[]) => void;
  certifications: CertificationItem[];
  onUpdateCertifications: (items: CertificationItem[]) => void;
  coreSkills: SkillItem[];
  onUpdateCoreSkills: (items: SkillItem[]) => void;
  resumeImage?: string;
  onUpdateResumeImage?: (img: string) => void;
  testimonials: TestimonialItem[];
  onUpdateTestimonials: (items: TestimonialItem[]) => void;
  blogs: BlogPost[];
  onUpdateBlogs: (items: BlogPost[]) => void;
  contactSubmissions: ContactSubmission[];
  onUpdateContactSubmissions: (items: ContactSubmission[]) => void;
  adminTab?: 'home' | 'about' | 'services' | 'portfolio' | 'resume' | 'testimonials' | 'blog' | 'contact' | 'seo';
  seoImages?: SeoImage[];
  onUpdateSeoImages?: (items: SeoImage[]) => void;
}

const PRESET_COLORS = [
  { id: 'slate', value: 'text-slate-800', bgClass: 'bg-slate-800', hex: '#1e293b', label: 'Slate Charcoal', ringClass: 'focus:ring-slate-800/30' },
  { id: 'emerald', value: 'text-emerald-600', bgClass: 'bg-emerald-500', hex: '#10b981', label: 'Emerald Green', ringClass: 'focus:ring-emerald-500/30' },
  { id: 'blue', value: 'text-blue-600', bgClass: 'bg-blue-500', hex: '#3b82f6', label: 'Royal Blue', ringClass: 'focus:ring-blue-500/30' },
  { id: 'indigo', value: 'text-indigo-600', bgClass: 'bg-indigo-500', hex: '#6366f1', label: 'Indigo Purple', ringClass: 'focus:ring-indigo-500/30' },
  { id: 'amber', value: 'text-amber-600', bgClass: 'bg-amber-500', hex: '#f59e0b', label: 'Sunset Amber', ringClass: 'focus:ring-amber-500/30' },
  { id: 'rose', value: 'text-rose-600', bgClass: 'bg-rose-500', hex: '#f43f5e', label: 'Rose Pink', ringClass: 'focus:ring-rose-500/30' },
  { id: 'cyan', value: 'text-cyan-600', bgClass: 'bg-cyan-500', hex: '#06b6d4', label: 'Cyber Cyan', ringClass: 'focus:ring-cyan-500/30' },
  { id: 'violet', value: 'text-violet-600', bgClass: 'bg-violet-500', hex: '#8b5cf6', label: 'Violet Lavender', ringClass: 'focus:ring-violet-500/30' }
];

const PRESET_FONTS = [
  { id: 'font-sans', label: 'Modern Sans', value: 'font-sans font-bold', desc: 'Default Clean Interface' },
  { id: 'font-serif', label: 'Elegant Serif', value: 'font-serif font-bold italic', desc: 'Editorial & Traditional' },
  { id: 'font-mono', label: 'Tech Mono', value: 'font-mono font-bold tracking-tight', desc: 'Technical & Developers' },
  { id: 'font-display', label: 'Impact Display', value: 'font-sans font-black uppercase tracking-tight', desc: 'SaaS Headline Accent' },
  { id: 'font-serif-classic', label: 'Classic Serif', value: 'font-serif font-extrabold', desc: 'Vintage & Classical Headers' },
  { id: 'font-sans-light', label: 'Minimalist Light', value: 'font-sans font-light tracking-wide', desc: 'Elegant & Sophisticated' },
  { id: 'font-sans-ultra', label: 'Bold Geometric', value: 'font-sans font-extrabold tracking-tight', desc: 'Dynamic Marketing Accent' }
];

const TEXT_TEMPLATES = [
  {
    id: 'saas-landing',
    name: 'SaaS Launch Framework',
    desc: 'USP, challenge statements, features & CTAs',
    category: 'SaaS',
    title: 'Apex Workspace Software Launch Brief',
    data: `### 1. Headline (USP)
Unlock ultimate productivity with our automated workspace optimization toolkit.

### 2. Pain Point / Challenge
Modern product managers lose 15+ hours weekly on manual data synchronization and report formatting.

### 3. Core Solution & Benefits
- Real-time API connectors with auto-mapping
- Single-pane-of-glass dashboards
- Instant export formats for stakeholders

### 4. Primary Call To Action (CTA)
Start Your Free 14-Day Trial Today. No credit card required.`,
  },
  {
    id: 'seo-optimized',
    name: 'SEO Pillar Strategy',
    desc: 'High search-intent structure & core headers',
    category: 'SEO',
    title: 'SEO Topical Authority Optimization Brief',
    data: `### Focus Keyphrase:
"Sustainable green cloud storage architectures"

### Target Audience:
Enterprise CTOs, infrastructure leads, and sustainable tech coordinators.

### Instructions:
Focus on energy-grid efficiency metrics, renewable hosting datacenters, carbon-offset calculations, and data lifecycle management policies. Incorporate 5 high-fidelity LSI keywords.`,
  },
  {
    id: 'product-versus',
    name: 'Competitive Versus Layout',
    desc: 'Brand vs competitors, pricing & pros/cons',
    category: 'Copywriting',
    title: 'Competitive Strategy Brief: Apex vs Competitors',
    data: `### Objective:
Highlight key developer-experience differentiators when choosing Apex over legacy enterprise monoliths.

### Value Props:
- Sub-second hot start cold boots
- Fully open-source local emulation environment
- Predictable pay-as-you-grow tiered pricing model`,
  },
  {
    id: 'email-funnel',
    name: 'Converting Email Copy',
    desc: 'Compelling hooks, personal pain & conversion',
    category: 'Marketing',
    title: 'Lead Magnet Funnel Conversion Email Brief',
    data: `### Goal:
Deliver high-value organic traffic checklists to new newsletter subscribers and pitch the Apex Pro upgrade.

### Tone:
Approachable, highly authoritative, urgent but reassuring.`,
  },
  {
    id: 'tech-whitepaper',
    name: 'Technical Deep-Dive',
    desc: 'Executive technical details, charts & roadmaps',
    category: 'Technical',
    title: 'Distributed State Synchronization Whitepaper Brief',
    data: `### Context:
Technical whitepaper detailing consensus scaling in edge-nodes without central state managers.

### Audience:
Staff Distributed Systems Engineers. Ensure rigorous vocabulary.`,
  },
  {
    id: 'social-hooks',
    name: 'Viral Social Hooks',
    desc: 'High CTR social media post templates',
    category: 'Social',
    title: 'Social Media Organic Hook Strategy Brief',
    data: `### Platforms:
LinkedIn & Twitter/X.

### Objective:
Generate high click-through-rates for the launch of the new Apex AI Assistant Copy Generator.`,
  },
  {
    id: 'how-to-guide',
    name: 'Ultimate Step-By-Step Guide',
    desc: 'Hierarchical tutorial layouts with tips & FAQs',
    category: 'Tutorials',
    title: 'Step-by-Step Practical Optimization Tutorial Brief',
    data: `### Goal:
Write a comprehensive step-by-step tutorial explaining how to build modern serverless websites.

### Layout:
- Setup step
- Build step
- Performance audit
- Common troubleshooting FAQ block`
  }
];

export default function Dashboard({
  userEmail,
  unlockedBriefIds,
  allBriefsCount,
  orders,
  onAddNewOrder,
  onToast,
  onNavigateToLibrary,
  briefs,
  outlines,
  contents,
  onPublishBrief,
  onPublishOutline,
  onPublishContent,
  onEditBrief,
  onDeleteBrief,
  onEditOutline,
  onDeleteOutline,
  onEditContent,
  onDeleteContent,

  homeConfig,
  onUpdateHomeConfig,
  aboutConfig,
  onUpdateAboutConfig,
  services,
  onUpdateServices,
  experiences,
  onUpdateExperiences,
  education,
  onUpdateEducation,
  certifications,
  onUpdateCertifications,
  coreSkills,
  onUpdateCoreSkills,
  resumeImage,
  onUpdateResumeImage,
  testimonials,
  onUpdateTestimonials,
  blogs,
  onUpdateBlogs,
  contactSubmissions,
  onUpdateContactSubmissions,
  adminTab: propAdminTab,
  seoImages = [],
  onUpdateSeoImages,
}: DashboardProps) {
  // Password Lock state
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Tab State - Expanded for all sections
  const [adminTab, setAdminTab] = useState<'home' | 'about' | 'services' | 'portfolio' | 'resume' | 'testimonials' | 'blog' | 'contact' | 'seo'>('portfolio');

  useEffect(() => {
    if (propAdminTab) {
      setAdminTab(propAdminTab);
    }
  }, [propAdminTab]);
  const [activeTab, setActiveTab] = useState<'briefs'>('briefs');
  const [adminView, setAdminView] = useState<'clean' | 'brief' | 'outline' | 'content'>('clean');

  // --- SEO & Performance Image Optimizer States ---
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [uploadingImageName, setUploadingImageName] = useState<string>('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoBeforeFile, setSeoBeforeFile] = useState<File | null>(null);
  const [seoAfterFile, setSeoAfterFile] = useState<File | null>(null);
  
  const seoImagesRef = React.useRef(seoImages);
  useEffect(() => { seoImagesRef.current = seoImages; }, [seoImages]);

  const compressImageToTargetKB = (file: File | string, targetKB: number): Promise<{dataUrl: string, size: number}> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        const targetBytes = targetKB * 1024;
        let quality = 0.9;
        let scale = 1.0;
        let dataUrl = '';
        let size = Number.MAX_SAFE_INTEGER;
        
        if (img.width > 2000) {
           scale = 2000 / img.width;
        }

        const attempt = () => {
          const canvas = document.createElement('canvas');
          const width = Math.max(10, Math.floor(img.width * scale));
          const height = Math.max(10, Math.floor(img.height * scale));
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
             return resolve({dataUrl: img.src, size: 0});
          }
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          dataUrl = canvas.toDataURL('image/webp', quality);
          const head = 'data:image/webp;base64,';
          size = Math.round((dataUrl.length - head.length) * 3 / 4);
          
          if (size <= targetBytes || (quality <= 0.1 && scale <= 0.1)) {
            resolve({dataUrl, size});
          } else {
            if (quality > 0.4) {
              quality -= 0.15;
            } else {
              scale -= 0.15;
              quality = 0.7;
            }
            setTimeout(attempt, 0);
          }
        };
        attempt();
      };
      img.onerror = () => reject(new Error('Failed to load image'));

      if (typeof file === 'string') {
        img.src = file;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => { img.src = e.target?.result as string; };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      }
    });
  };

  const handleSeoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoBeforeFile || !seoAfterFile || !seoTitle.trim()) {
      onToast('Please provide a title and both before and after images.', 'error');
      return;
    }

    setIsOptimizing(true);
    setUploadingImageName('Saving SEO item...');

    try {
      const beforeCompressed = await compressImageToTargetKB(seoBeforeFile, 45);
      const afterCompressed = await compressImageToTargetKB(seoAfterFile, 45);

      const newSeoImg: SeoImage = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        title: seoTitle,
        beforeImage: beforeCompressed.dataUrl,
        afterImage: afterCompressed.dataUrl,
        // Fallback backward compatibility strings
        originalImage: beforeCompressed.dataUrl,
        optimizedImage: afterCompressed.dataUrl,
        originalSize: beforeCompressed.size,
        optimizedSize: afterCompressed.size,
        imageName: seoTitle,
        altText: seoTitle
      };

      if (onUpdateSeoImages) {
         onUpdateSeoImages([...seoImagesRef.current, newSeoImg]);
      }
      onToast(`SEO Transformation added! Before: ${(beforeCompressed.size / 1024).toFixed(1)}KB, After: ${(afterCompressed.size / 1024).toFixed(1)}KB (Fully Optimized)`, 'success');
      
      // reset form
      setSeoTitle('');
      setSeoBeforeFile(null);
      setSeoAfterFile(null);
    } catch (err) {
      console.error('Optimization error:', err);
      onToast('Failed to save SEO item.', 'error');
    } finally {
      setIsOptimizing(false);
      setUploadingImageName('');
    }
  };

  const removeSeoImage = (id: string) => {
     if (onUpdateSeoImages) {
        onUpdateSeoImages(seoImagesRef.current.filter(img => img.id !== id));
        onToast('Image removed from SEO gallery.', 'info');
     }
  };

  const downloadOptimizedImage = (img: SeoImage) => {
    const link = document.createElement('a');
    link.href = img.optimizedImage;
    const baseName = img.imageName.substring(0, img.imageName.lastIndexOf('.')) || img.imageName;
    link.download = `${baseName}_optimized.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('Optimized WebP downloaded successfully!', 'success');
  };

  // Brief Outline Content Form State
  const [briefTitle, setBriefTitle] = useState('');
  const [briefData, setBriefData] = useState('');
  const [editingBriefId, setEditingBriefId] = useState<string | null>(null);
  const [selectedBriefColor, setSelectedBriefColor] = useState('text-slate-800');
  const [selectedBriefFont, setSelectedBriefFont] = useState('font-sans font-bold');

  // --- Dynamic Sections Edit States ---

  // Home Config State
  const [homeLogo, setHomeLogo] = useState(homeConfig?.logoImage || '');
  const [homeBadge, setHomeBadge] = useState(homeConfig?.badgeText || '');
  const [homeHeadline, setHomeHeadline] = useState(homeConfig?.heroTitle || '');
  const [homeGradientWord, setHomeGradientWord] = useState(homeConfig?.heroTitleGradient || '');
  const [homeSubtitle, setHomeSubtitle] = useState(homeConfig?.heroSubtitle || '');

  useEffect(() => {
    if (homeConfig) {
      setHomeLogo(homeConfig.logoImage || '');
      setHomeBadge(homeConfig.badgeText);
      setHomeHeadline(homeConfig.heroTitle);
      setHomeGradientWord(homeConfig.heroTitleGradient);
      setHomeSubtitle(homeConfig.heroSubtitle);
    }
  }, [homeConfig]);

  // About Config State
  const [aboutName, setAboutName] = useState(aboutConfig?.fullName || '');
  const [aboutRole, setAboutRole] = useState(aboutConfig?.roleTitle || '');
  const [aboutBio, setAboutBio] = useState(aboutConfig?.bio || '');
  const [aboutPhilTitle, setAboutPhilTitle] = useState(aboutConfig?.philosophyTitle || '');
  const [aboutPhilText, setAboutPhilText] = useState(aboutConfig?.philosophyText || '');
  const [aboutMissionText, setAboutMissionText] = useState(aboutConfig?.missionText || '');

  useEffect(() => {
    if (aboutConfig) {
      setAboutName(aboutConfig.fullName);
      setAboutRole(aboutConfig.roleTitle);
      setAboutBio(aboutConfig.bio);
      setAboutPhilTitle(aboutConfig.philosophyTitle);
      setAboutPhilText(aboutConfig.philosophyText);
      setAboutMissionText(aboutConfig.missionText);
    }
  }, [aboutConfig]);

  // Service editing state
  const [editingServiceId, setEditingServiceId] = useState<string | number | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceShortDesc, setServiceShortDesc] = useState('');
  const [serviceIconName, setServiceIconName] = useState('Layers');
  const [serviceColor, setServiceColor] = useState('emerald');
  const [serviceHighlights, setServiceHighlights] = useState('');
  const [isAddingService, setIsAddingService] = useState(false);

  // Experience editing state
  const [editingExpId, setEditingExpId] = useState<string | number | null>(null);
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expLocation, setExpLocation] = useState('');
  const [expAchievements, setExpAchievements] = useState('');
  const [expSkills, setExpSkills] = useState('');
  const [isAddingExp, setIsAddingExp] = useState(false);

  // Resume Sub-Tab state
  const [resumeSubTab, setResumeSubTab] = useState<'experience' | 'education' | 'certifications' | 'skills'>('experience');

  // Education editing state
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [eduDegree, setEduDegree] = useState('');
  const [eduSchool, setEduSchool] = useState('');
  const [eduPeriod, setEduPeriod] = useState('');
  const [eduDetails, setEduDetails] = useState('');

  // Certifications editing state
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');

  // Skills editing state
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState(90);

  // Testimonial editing state
  const [editingTestId, setEditingTestId] = useState<string | number | null>(null);
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testCompany, setTestCompany] = useState('');
  const [testCategory, setTestCategory] = useState('seo');
  const [testRating, setTestRating] = useState(5);
  const [testMetric, setTestMetric] = useState('');
  const [testQuote, setTestQuote] = useState('');
  const [isAddingTest, setIsAddingTest] = useState(false);

  // Blog editing state
  const [editingBlogId, setEditingBlogId] = useState<string | number | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogPreview, setBlogPreview] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogReadTime, setBlogReadTime] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [isAddingBlog, setIsAddingBlog] = useState(false);

  // Check localStorage for unlock state on mount
  useEffect(() => {
    const savedUnlock = localStorage.getItem('apex_admin_unlocked');
    if (savedUnlock === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  // Reusable styling and layout generators
  const renderColorPicker = (
    currentColor: string, 
    setColor: (val: string) => void
  ) => {
    return (
      <div className="space-y-1.5 pt-1">
        <label className="font-bold text-slate-500 flex items-center space-x-1">
          <Palette className="h-3 w-3 text-slate-400" />
          <span>Accent Color (Choose 1 of 7)</span>
        </label>
        <div className="flex items-center gap-2 flex-wrap bg-white border border-slate-200/60 rounded-xl p-2">
          {PRESET_COLORS.map(c => {
            const isSelected = currentColor === c.value;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.value)}
                className={`h-7 w-7 rounded-full ${c.bgClass} flex items-center justify-center transition-all cursor-pointer relative group`}
                title={c.label}
              >
                {isSelected && (
                  <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                )}
                {/* Custom modern tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-zinc-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-sm">
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTemplateSelector = (
    setTitle: (val: string) => void,
    setData: (val: string) => void
  ) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-500 flex items-center space-x-1">
            <Sparkles className="h-3 w-3 text-emerald-500" />
            <span>Preset Layout Templates (Choose 1 of 7)</span>
          </label>
          <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-mono uppercase">
            Click to Auto-Fill
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[145px] overflow-y-auto pr-1">
          {TEXT_TEMPLATES.map(t => {
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTitle(t.title);
                  setData(t.data);
                  onToast(`Loaded ${t.name} template!`, 'success');
                }}
                className="text-left p-2.5 bg-white border border-slate-200/80 rounded-xl hover:border-emerald-500 hover:shadow-2xs transition-all duration-200 group relative cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {t.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono bg-slate-50 px-1 py-0.2 rounded">
                    {t.category}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 leading-normal">
                  {t.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Password submission logic
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Hafiz@9263') {
      setIsUnlocked(true);
      setErrorMsg('');
      localStorage.setItem('apex_admin_unlocked', 'true');
      onToast('Admin Panel unlocked successfully!', 'success');
    } else {
      setErrorMsg('Incorrect password. Please try again.');
    }
  };

  const handleLockPanel = () => {
    setIsUnlocked(false);
    localStorage.removeItem('apex_admin_unlocked');
    setPassword('');
    onToast('Admin Panel locked.', 'info');
  };

  // ---------------- DYNAMIC SECTIONS ACTIONS ----------------
  const handleSaveHome = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHomeConfig({
      logoImage: homeLogo,
      badgeText: homeBadge,
      heroTitle: homeHeadline,
      heroTitleGradient: homeGradientWord,
      heroSubtitle: homeSubtitle
    });
    onToast('Home Page configuration saved!', 'success');
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAboutConfig({
      fullName: aboutName,
      roleTitle: aboutRole,
      bio: aboutBio,
      philosophyTitle: aboutPhilTitle,
      philosophyText: aboutPhilText,
      missionText: aboutMissionText
    });
    onToast('About Me configuration saved!', 'success');
  };

  const handleEditService = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setServiceTitle(srv.title);
    setServiceShortDesc(srv.shortDesc);
    setServiceIconName(srv.iconName || 'Layers');
    setServiceColor(srv.color || 'emerald');
    setServiceHighlights(srv.highlights.join('\n'));
    setIsAddingService(true);
  };

  const handleDeleteService = (id: string | number) => {
    onUpdateServices(services.filter(s => s.id !== id));
    onToast('Service deleted successfully!', 'success');
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle || !serviceShortDesc) {
      onToast('Title and short description are required', 'info');
      return;
    }

    const item: ServiceItem = {
      id: editingServiceId || 'srv-' + Date.now(),
      title: serviceTitle,
      shortDesc: serviceShortDesc,
      iconName: serviceIconName,
      color: serviceColor,
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      highlights: serviceHighlights.split('\n').map(l => l.trim()).filter(Boolean)
    };

    if (editingServiceId) {
      onUpdateServices(services.map(s => s.id === editingServiceId ? item : s));
      onToast('Service updated successfully!', 'success');
    } else {
      onUpdateServices([...services, item]);
      onToast('New Service added successfully!', 'success');
    }

    setIsAddingService(false);
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceShortDesc('');
    setServiceIconName('Layers');
    setServiceColor('emerald');
    setServiceHighlights('');
  };

  const handleEditExp = (exp: ExperienceItem) => {
    setEditingExpId(exp.id || '');
    setExpRole(exp.role);
    setExpCompany(exp.company);
    setExpPeriod(exp.period);
    setExpLocation(exp.location);
    setExpAchievements(exp.achievements.join('\n'));
    setExpSkills(exp.skillsUsed.join(', '));
    setIsAddingExp(true);
  };

  const handleDeleteExp = (id: string | number) => {
    onUpdateExperiences(experiences.filter(e => e.id !== id));
    onToast('Experience item deleted successfully!', 'success');
  };

  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole || !expCompany) {
      onToast('Role and company are required', 'info');
      return;
    }

    const item: ExperienceItem = {
      id: editingExpId || 'exp-' + Date.now(),
      role: expRole,
      company: expCompany,
      period: expPeriod,
      location: expLocation,
      achievements: expAchievements.split('\n').map(l => l.trim()).filter(Boolean),
      skillsUsed: expSkills.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingExpId) {
      onUpdateExperiences(experiences.map(e => e.id === editingExpId ? item : e));
      onToast('Experience updated successfully!', 'success');
    } else {
      onUpdateExperiences([...experiences, item]);
      onToast('New Experience added successfully!', 'success');
    }

    setIsAddingExp(false);
    setEditingExpId(null);
    setExpRole('');
    setExpCompany('');
    setExpPeriod('');
    setExpLocation('');
    setExpAchievements('');
    setExpSkills('');
  };

  // --- Education Handlers ---
  const handleEditEdu = (edu: EducationItem) => {
    setEditingEduId(edu.id);
    setEduDegree(edu.degree);
    setEduSchool(edu.school);
    setEduPeriod(edu.period);
    setEduDetails(edu.details || '');
    setIsAddingEdu(true);
  };

  const handleDeleteEdu = (id: string) => {
    onUpdateEducation(education.filter(edu => edu.id !== id));
    onToast('Education entry deleted successfully!', 'success');
  };

  const handleSaveEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduDegree || !eduSchool) {
      onToast('Degree and School are required', 'info');
      return;
    }
    const item: EducationItem = {
      id: editingEduId || 'edu-' + Date.now(),
      degree: eduDegree,
      school: eduSchool,
      period: eduPeriod,
      details: eduDetails
    };

    if (editingEduId) {
      onUpdateEducation(education.map(edu => edu.id === editingEduId ? item : edu));
      onToast('Education entry updated successfully!', 'success');
    } else {
      onUpdateEducation([...education, item]);
      onToast('New Education entry added successfully!', 'success');
    }

    setIsAddingEdu(false);
    setEditingEduId(null);
    setEduDegree('');
    setEduSchool('');
    setEduPeriod('');
    setEduDetails('');
  };

  // --- Certification Handlers ---
  const handleEditCert = (cert: CertificationItem) => {
    setEditingCertId(cert.id);
    setCertTitle(cert.title);
    setCertIssuer(cert.issuer);
    setCertDate(cert.date);
    setIsAddingCert(true);
  };

  const handleDeleteCert = (id: string) => {
    onUpdateCertifications(certifications.filter(c => c.id !== id));
    onToast('Certification deleted successfully!', 'success');
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle || !certIssuer) {
      onToast('Title and Issuer are required', 'info');
      return;
    }
    const item: CertificationItem = {
      id: editingCertId || 'cert-' + Date.now(),
      title: certTitle,
      issuer: certIssuer,
      date: certDate
    };

    if (editingCertId) {
      onUpdateCertifications(certifications.map(c => c.id === editingCertId ? item : c));
      onToast('Certification updated successfully!', 'success');
    } else {
      onUpdateCertifications([...certifications, item]);
      onToast('New Certification added successfully!', 'success');
    }

    setIsAddingCert(false);
    setEditingCertId(null);
    setCertTitle('');
    setCertIssuer('');
    setCertDate('');
  };

  // --- Skills Handlers ---
  const handleEditSkill = (skill: SkillItem) => {
    setEditingSkillId(skill.id);
    setSkillName(skill.name);
    setSkillLevel(skill.level);
    setIsAddingSkill(true);
  };

  const handleDeleteSkill = (id: string) => {
    onUpdateCoreSkills(coreSkills.filter(s => s.id !== id));
    onToast('Skill deleted successfully!', 'success');
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName) {
      onToast('Skill Name is required', 'info');
      return;
    }
    const item: SkillItem = {
      id: editingSkillId || 'skill-' + Date.now(),
      name: skillName,
      level: Number(skillLevel)
    };

    if (editingSkillId) {
      onUpdateCoreSkills(coreSkills.map(s => s.id === editingSkillId ? item : s));
      onToast('Skill updated successfully!', 'success');
    } else {
      onUpdateCoreSkills([...coreSkills, item]);
      onToast('New Skill added successfully!', 'success');
    }

    setIsAddingSkill(false);
    setEditingSkillId(null);
    setSkillName('');
    setSkillLevel(90);
  };

  const handleEditTest = (test: TestimonialItem) => {
    setEditingTestId(test.id);
    setTestName(test.name);
    setTestRole(test.role);
    setTestCompany(test.company);
    setTestCategory(test.category);
    setTestRating(test.rating);
    setTestMetric(test.metric || '');
    setTestQuote(test.quote);
    setIsAddingTest(true);
  };

  const handleDeleteTest = (id: string | number) => {
    onUpdateTestimonials(testimonials.filter(t => t.id !== id));
    onToast('Testimonial deleted successfully!', 'success');
  };

  const handleSaveTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !testQuote) {
      onToast('Name and testimonial quote are required', 'info');
      return;
    }

    const item: TestimonialItem = {
      id: editingTestId || 'test-' + Date.now(),
      name: testName,
      role: testRole,
      company: testCompany,
      category: testCategory as any,
      rating: testRating,
      metric: testMetric || 'Verified Client',
      quote: testQuote,
      logoBg: 'bg-emerald-50 text-emerald-700'
    };

    if (editingTestId) {
      onUpdateTestimonials(testimonials.map(t => t.id === editingTestId ? item : t));
      onToast('Testimonial updated successfully!', 'success');
    } else {
      onUpdateTestimonials([item, ...testimonials]);
      onToast('New Testimonial added successfully!', 'success');
    }

    setIsAddingTest(false);
    setEditingTestId(null);
    setTestName('');
    setTestRole('');
    setTestCompany('');
    setTestCategory('seo');
    setTestRating(5);
    setTestMetric('');
    setTestQuote('');
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogTitle(post.title);
    setBlogPreview(post.preview);
    setBlogContent(post.content);
    setBlogImage(post.image);
    setBlogCategory(post.category);
    setBlogReadTime(post.readTime);
    setBlogAuthor(post.author || 'Hafiz Amir Saifi');
    setIsAddingBlog(true);
  };

  const handleDeleteBlog = (id: string | number) => {
    onUpdateBlogs(blogs.filter(b => b.id !== id));
    onToast('Blog post deleted successfully!', 'success');
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogPreview || !blogContent) {
      onToast('Title, preview, and full content are required', 'info');
      return;
    }

    const item: BlogPost = {
      id: editingBlogId || 'post-' + Date.now(),
      title: blogTitle,
      preview: blogPreview,
      content: blogContent,
      image: blogImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      category: blogCategory || 'SEO Strategy',
      readTime: blogReadTime || '5 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: blogAuthor || 'Hafiz Amir Saifi'
    };

    if (editingBlogId) {
      onUpdateBlogs(blogs.map(b => b.id === editingBlogId ? item : b));
      onToast('Blog post updated successfully!', 'success');
    } else {
      onUpdateBlogs([item, ...blogs]);
      onToast('New Blog post published successfully!', 'success');
    }

    setIsAddingBlog(false);
    setEditingBlogId(null);
    setBlogTitle('');
    setBlogPreview('');
    setBlogContent('');
    setBlogImage('');
    setBlogCategory('');
    setBlogReadTime('');
    setBlogAuthor('');
  };

  const handleDeleteSub = (id: string | number) => {
    onUpdateContactSubmissions(contactSubmissions.filter(s => s.id !== id));
    onToast('Submission deleted successfully!', 'success');
  };

  // ---------------- BRIEF ACTIONS ----------------
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefTitle.trim() || !briefData.trim()) {
      onToast('Please enter both Title and Data.', 'info');
      return;
    }

    if (adminView === 'brief') {
      const preview = briefData.length > 120 ? briefData.substring(0, 120) + '...' : briefData;
      let cleanBrief: ArticleBrief;

      if (editingBriefId) {
        const original = briefs.find(b => b.id === editingBriefId) || {};
        cleanBrief = {
          category: 'AI & Automation',
          keywords: ['seo', 'optimized'],
          targetAudience: 'General Audience',
          searchVolume: '1,500/mo',
          difficulty: 'Easy',
          status: 'Premium',
          date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          ...original,
          id: editingBriefId,
          title: briefTitle,
          previewText: preview,
          fullBrief: briefData,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        } as ArticleBrief;
      } else {
        cleanBrief = {
          id: `brief-${Date.now()}`,
          title: briefTitle,
          category: 'SaaS Technology',
          previewText: preview,
          fullBrief: briefData,
          keywords: ['seo', 'optimized'],
          targetAudience: 'General Audience',
          searchVolume: '1,500/mo',
          difficulty: 'Easy',
          status: 'Premium',
          date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        };
      }

      if (editingBriefId) {
        onEditBrief(cleanBrief);
        onToast('Brief updated successfully!', 'success');
        setEditingBriefId(null);
      } else {
        onPublishBrief(cleanBrief);
        onToast('New Brief published!', 'success');
      }
    } else if (adminView === 'outline') {
      const sectionsList = briefData.split('\n').map(s => s.trim()).filter(Boolean);
      let cleanOutline: OutlineItem;

      if (editingBriefId) {
        const original = outlines.find(o => o.id === editingBriefId) || {};
        cleanOutline = {
          category: 'Technology',
          wordCount: '1,500 words',
          entities: 10,
          score: 90,
          difficulty: 'Easy',
          ...original,
          id: editingBriefId,
          title: briefTitle,
          headings: sectionsList.length,
          sections: sectionsList,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        } as OutlineItem;
      } else {
        cleanOutline = {
          id: `outline-${Date.now()}`,
          title: briefTitle,
          category: 'Technology',
          wordCount: '1,500 words',
          headings: sectionsList.length,
          entities: 10,
          score: 90,
          difficulty: 'Easy',
          sections: sectionsList,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        };
      }

      if (editingBriefId) {
        onEditOutline(cleanOutline);
        onToast('Outline updated successfully!', 'success');
        setEditingBriefId(null);
      } else {
        onPublishOutline(cleanOutline);
        onToast('New Outline published!', 'success');
      }
    } else if (adminView === 'content') {
      let cleanContent: ContentItem;

      if (editingBriefId) {
        const original = contents.find(c => c.id === editingBriefId) || {};
        cleanContent = {
          category: 'General Copy',
          readTime: '5 min read',
          gradeLevel: '10th Grade',
          density: '2.5%',
          keywords: ['article', 'content'],
          ...original,
          id: editingBriefId,
          title: briefTitle,
          summary: briefData.length > 150 ? briefData.substring(0, 150) + '...' : briefData,
          content: briefData,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        } as ContentItem;
      } else {
        cleanContent = {
          id: `content-${Date.now()}`,
          title: briefTitle,
          category: 'General Copy',
          readTime: '5 min read',
          gradeLevel: '10th Grade',
          density: '2.5%',
          summary: briefData.length > 150 ? briefData.substring(0, 150) + '...' : briefData,
          keywords: ['article', 'content'],
          content: briefData,
          titleColor: selectedBriefColor,
          fontStyle: selectedBriefFont,
        };
      }

      if (editingBriefId) {
        onEditContent(cleanContent);
        onToast('Content updated successfully!', 'success');
        setEditingBriefId(null);
      } else {
        onPublishContent(cleanContent);
        onToast('New Content published!', 'success');
      }
    }

    setBriefTitle('');
    setBriefData('');
    setSelectedBriefColor('text-slate-800');
    setSelectedBriefFont('font-sans font-bold');
    // Keep the current adminView (brief / outline / content) so they can instantly see their saved post in the list below the form!
    // They can click the "Back" button if they want to return to the admin panel home.
    // Do NOT set setAdminView('clean');
  };

  const handleTriggerEditBrief = (b: ArticleBrief) => {
    setEditingBriefId(b.id);
    setBriefTitle(b.title || '');
    setBriefData(b.fullBrief || b.previewText || '');
    setSelectedBriefColor(b.titleColor || 'text-slate-800');
    setSelectedBriefFont(b.fontStyle || 'font-sans font-bold');
    setAdminView('brief');

    // Scroll smoothly to top of form
    setTimeout(() => {
      const container = document.getElementById('form-admin-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleTriggerEditOutline = (o: OutlineItem) => {
    setEditingBriefId(o.id);
    setBriefTitle(o.title || '');
    setBriefData((o.sections || []).join('\n'));
    setSelectedBriefColor(o.titleColor || 'text-slate-800');
    setSelectedBriefFont(o.fontStyle || 'font-sans font-bold');
    setAdminView('outline');

    // Scroll smoothly to top of form
    setTimeout(() => {
      const container = document.getElementById('form-admin-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleTriggerEditContent = (c: ContentItem) => {
    setEditingBriefId(c.id);
    setBriefTitle(c.title || '');
    setBriefData(c.content || c.summary || '');
    setSelectedBriefColor(c.titleColor || 'text-slate-800');
    setSelectedBriefFont(c.fontStyle || 'font-sans font-bold');
    setAdminView('content');

    // Scroll smoothly to top of form
    setTimeout(() => {
      const container = document.getElementById('form-admin-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleCancelBriefEdit = () => {
    setEditingBriefId(null);
    setBriefTitle('');
    setBriefData('');
    setSelectedBriefColor('text-slate-800');
    setSelectedBriefFont('font-sans font-bold');
  };


  // 1. Password Gate screen
  if (!isUnlocked) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-zinc-950 text-white rounded-3xl m-4 sm:m-8 border border-zinc-800 shadow-2xl relative overflow-hidden" id="admin-security-gate">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        <div className="w-full max-w-md p-8 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto rounded-full bg-emerald-950 text-emerald-400 p-3.5 w-fit border border-emerald-900">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">Admin Security Gate</h2>
            <p className="text-xs text-zinc-400 font-sans">Enter secure password key to access admin parameters</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-2xs font-bold text-zinc-400 uppercase tracking-wider block">Admin Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono placeholder-zinc-700"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 text-center font-medium bg-red-950/20 border border-red-900/30 rounded-lg py-2 font-sans">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs py-3.5 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer font-sans"
            >
              Unlock Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Full Simplified Admin Dashboard
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 min-h-[600px]" id="dashboard-admin-main">
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-xs relative overflow-hidden transition-all duration-300">
        
        {/* Top Control Header - Minimal Back / Lock */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100/80 mb-8 gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-4 flex-wrap gap-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-mono tracking-wider uppercase text-[10px] font-bold text-slate-300">Admin Session Active</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded font-mono">SECURE</span>
            </div>
            
            {/* Clickable SEO & Performance Results button */}
            <button 
              type="button"
              onClick={() => {
                setAdminTab('seo');
                setAdminView('clean');
              }}
              className={`inline-flex items-center space-x-1.5 text-[10px] font-extrabold px-3 py-1.5 rounded-xl font-mono uppercase tracking-wide cursor-pointer select-none transition-all duration-300 border ${
                adminTab === 'seo'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-500/20'
                  : 'bg-slate-900 text-white hover:bg-slate-800 border-transparent shadow-3xs'
              }`}
              id="admin-seo-performance-badge"
            >
              <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span>SEO & Performance Results</span>
              <TrendingUp className="h-3 w-3 text-emerald-400" />
            </button>
          </div>
          <button 
            type="button"
            onClick={handleLockPanel}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl px-3 py-1.5 font-bold text-slate-600 transition-all cursor-pointer font-sans self-end sm:self-auto"
            id="btn-lock-admin"
          >
            Lock Panel
          </button>
        </div>

        {/* Sidebar & Active Workspace Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: Tabs List */}
          <div className="lg:col-span-3 space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2.5 mb-3 font-mono">Control Panel</span>
            
            {/* Desktop Navigation list */}
            <div className="hidden lg:flex flex-col space-y-1 text-left">
              {[
                { id: 'portfolio', label: 'Portfolio Library', icon: FolderOpen, desc: 'Briefs, Outlines, Content' },
                { id: 'seo', label: 'SEO & Performance', icon: Sparkles, desc: 'Optimized Image Compressor' },
                { id: 'home', label: 'Home Page', icon: Home, desc: 'Hero headers & badges' },
                { id: 'about', label: 'About Me', icon: User, desc: 'Bio & work philosophy' },
                { id: 'services', label: 'Services', icon: Layers, desc: 'Your offerings catalog' },
                { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, desc: 'Client reviews & metrics' },
                { id: 'blog', label: 'Blog Posts', icon: BookOpen, desc: 'Manage strategic articles' },
                { id: 'contact', label: 'Inquiries', icon: Inbox, desc: 'Client form submissions' },
              ].map((tab) => {
                const isSelected = adminTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setAdminTab(tab.id as any);
                      setAdminView('clean');
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-all group cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-600 text-white font-semibold shadow-xs' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent className={`h-4 w-4 shrink-0 transition-colors ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs leading-none font-medium">{tab.label}</div>
                      <div className={`text-[9px] leading-tight mt-1 truncate ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {tab.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Navigation list */}
            <div className="flex lg:hidden overflow-x-auto gap-2 pb-1 scrollbar-none snap-x">
              {[
                { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
                { id: 'seo', label: 'SEO & Performance', icon: Sparkles },
                { id: 'home', label: 'Home', icon: Home },
                { id: 'about', label: 'About', icon: User },
                { id: 'services', label: 'Services', icon: Layers },
                { id: 'testimonials', label: 'Reviews', icon: MessageSquare },
                { id: 'blog', label: 'Blog', icon: BookOpen },
                { id: 'contact', label: 'Inquiries', icon: Inbox },
              ].map((tab) => {
                const isSelected = adminTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setAdminTab(tab.id as any);
                      setAdminView('clean');
                    }}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs whitespace-nowrap snap-align-start transition-all cursor-pointer shrink-0 ${
                      isSelected 
                        ? 'bg-emerald-600 text-white font-semibold shadow-xs' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Active Workspace panel */}
          <div className="lg:col-span-9 bg-white border border-slate-100/50 rounded-2xl p-6 shadow-2xs">
            {adminTab === 'portfolio' ? (
              /* ================= PORTFOLIO MANAGEMENT TAB ================= */
              <div>
                {adminView === 'clean' ? (
          /* Clean View: Only Brief, Outline, and Content are shown separately, rest is clean */
          <div className="flex flex-col items-center justify-center py-28 space-y-8" id="view-admin-clean">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12" id="admin-options-row">
              <button
                onClick={() => {
                  setEditingBriefId(null);
                  setBriefTitle('');
                  setBriefData('');
                  setAdminView('brief');
                }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-sans border-b-2 border-transparent hover:border-emerald-500 pb-2 active:scale-98 flex items-center gap-3"
                id="btn-brief-trigger"
              >
                <span>Brief</span>
                <span className="text-sm font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                  {briefs.length}
                </span>
              </button>
              
              <span className="hidden sm:inline text-slate-200 text-2xl font-light">|</span>
              
              <button
                onClick={() => {
                  setEditingBriefId(null);
                  setBriefTitle('');
                  setBriefData('');
                  setAdminView('outline');
                }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-sans border-b-2 border-transparent hover:border-emerald-500 pb-2 active:scale-98 flex items-center gap-3"
                id="btn-outline-trigger"
              >
                <span>Outline</span>
                <span className="text-sm font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                  {outlines.length}
                </span>
              </button>
              
              <span className="hidden sm:inline text-slate-200 text-2xl font-light">|</span>
              
              <button
                onClick={() => {
                  setEditingBriefId(null);
                  setBriefTitle('');
                  setBriefData('');
                  setAdminView('content');
                }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-sans border-b-2 border-transparent hover:border-emerald-500 pb-2 active:scale-98 flex items-center gap-3"
                id="btn-content-trigger"
              >
                <span>Content</span>
                <span className="text-sm font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                  {contents.length}
                </span>
              </button>

              <span className="hidden sm:inline text-slate-200 text-2xl font-light">|</span>

              <button
                type="button"
                onClick={() => {
                  setAdminTab('seo');
                  setAdminView('clean');
                }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-sans border-b-2 border-transparent hover:border-emerald-500 pb-2 active:scale-98 flex items-center gap-3"
                id="btn-seo-trigger-portfolio"
              >
                <span>SEO & Performance Results</span>
                <span className="text-sm font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse text-emerald-500" />
                </span>
              </button>
            </div>
            
            <p className="text-xs text-slate-400 font-sans tracking-wide">
              Click any option to publish that item separately
            </p>
          </div>
        ) : (
          /* Form View: Topic / Title box and below it Article / Content box */
          <div className="space-y-8" id="form-admin-container">
            <form onSubmit={handleSubmitForm} className="space-y-8 animate-fadeIn" id="form-admin-generic">
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight font-sans mb-1 capitalize">
                  {editingBriefId ? 'Edit' : 'Publish'} {adminView}
                </h2>
                <p className="text-xs text-slate-400">Publish or update {adminView} copy inside the portfolio library</p>
              </div>

              {editingBriefId && (
                <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs text-amber-800 animate-fadeIn" id="edit-mode-indicator-banner">
                  <div className="flex items-center space-x-2">
                    <span className="p-1 bg-amber-100 rounded-lg text-amber-600">✏️</span>
                    <span>
                      You are editing <strong>"{briefTitle || 'Untitled'}"</strong>.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBriefId(null);
                      setBriefTitle('');
                      setBriefData('');
                      setSelectedBriefColor('text-slate-800');
                      setSelectedBriefFont('font-sans font-bold');
                      setAdminView('clean');
                      onToast('Edit cancelled successfully.', 'info');
                    }}
                    className="text-amber-700 hover:text-amber-900 font-extrabold underline cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Topic / Title
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder={`Enter ${adminView} topic title...`}
                  value={briefTitle} 
                  onChange={e => setBriefTitle(e.target.value)} 
                  className="w-full border-2 border-slate-100 rounded-2xl p-4 text-sm bg-white focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans" 
                  id="input-brief-title"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {adminView === 'outline' ? 'Outline Headings' : 'Article / Content'}
                </label>
                <textarea 
                  rows={12} 
                  required 
                  placeholder={
                    adminView === 'brief'
                      ? "Write full instructions or details of the brief here..."
                      : adminView === 'outline'
                      ? "Enter outline sections/headings (one per line)..."
                      : "Write or paste your full-length article content copy here..."
                  }
                  value={briefData} 
                  onChange={e => setBriefData(e.target.value)} 
                  className="w-full border-2 border-slate-100 rounded-2xl p-4 text-sm bg-white focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans leading-relaxed" 
                  id="textarea-brief-article"
                />
              </div>

              {/* Title & Topic Styling Studio Box */}
              <div className="p-5 bg-slate-50/70 border-2 border-slate-100 rounded-2xl space-y-4" id="topic-style-customize-box">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-sans">
                    Title & Topic Styling Studio
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Color Selector */}
                  <div className="space-y-2">
                    <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Title Color
                    </span>
                    <div className="flex items-center gap-2 flex-wrap bg-white border border-slate-200/50 rounded-xl p-2.5 shadow-2xs">
                      {PRESET_COLORS.map(c => {
                        const isSelected = selectedBriefColor === c.value;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedBriefColor(c.value)}
                            className={`h-7 w-7 rounded-full ${c.bgClass} flex items-center justify-center transition-all cursor-pointer relative group`}
                            title={c.label}
                          >
                            {isSelected && (
                              <Check className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Font Style Selector */}
                  <div className="space-y-2">
                    <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Font Family & Style
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 bg-white border border-slate-200/50 rounded-xl p-1.5 shadow-2xs">
                      {PRESET_FONTS.map(f => {
                        const isSelected = selectedBriefFont === f.value;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setSelectedBriefFont(f.value)}
                            className={`px-3 py-2 rounded-lg text-left transition-all text-xs cursor-pointer ${
                              isSelected 
                                ? 'bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold' 
                                : 'bg-slate-50/50 hover:bg-slate-50 text-slate-600 border border-transparent'
                            }`}
                          >
                            <div className="font-sans leading-none">{f.label}</div>
                            <span className="text-[9px] font-normal text-slate-400 mt-0.5 block leading-none">{f.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Realtime Live Interactive Preview Box */}
                <div className="pt-2">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    Live Library Preview
                  </span>
                  <div className="p-4 bg-white border border-slate-150 rounded-xl flex items-center justify-between shadow-2xs">
                    <span className={`text-base font-bold ${selectedBriefColor} ${selectedBriefFont} truncate max-w-[280px] sm:max-w-[450px]`}>
                      {briefTitle.trim() || 'Untitled Topic Title'}
                    </span>
                    <span className="text-2xs font-bold text-emerald-600 uppercase tracking-widest font-mono shrink-0 ml-4">
                      Show
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-xs cursor-pointer font-sans text-center text-xs transition-colors"
                  id="btn-publish-submit"
                >
                  {editingBriefId ? 'Save Changes' : `Publish ${adminView === 'brief' ? 'Brief' : adminView === 'outline' ? 'Outline' : 'Content'}`}
                </button>
                
                <button 
                  type="button" 
                  onClick={() => {
                    setBriefTitle('');
                    setBriefData('');
                    setEditingBriefId(null);
                    setAdminView('clean');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-xl cursor-pointer font-sans text-xs transition-colors"
                  id="btn-back-to-clean"
                >
                  Back
                </button>
              </div>
            </form>

            {/* Individual List for Active Tab only */}
            {adminView === 'brief' && (
              <div className="space-y-4 pt-10 border-t border-slate-100 text-left" id="active-briefs-list">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <span>Published Briefs ({briefs.length})</span>
                </div>
                {briefs.length === 0 ? (
                  <p className="text-xs text-slate-300 italic pl-2 font-sans">No briefs published yet</p>
                ) : (
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {briefs.map(b => (
                      <div key={b.id} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-100 transition-all text-xs font-sans">
                        <div className="flex-1 min-w-0 pr-4">
                          <span className="font-bold text-slate-700 block truncate">
                            {b.title}
                          </span>
                          <span className="text-[11px] text-slate-400 line-clamp-1 block mt-0.5">
                            {b.fullBrief}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleTriggerEditBrief(b)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteBrief(b.id);
                              onToast('Brief deleted successfully', 'success');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {adminView === 'outline' && (
              <div className="space-y-4 pt-10 border-t border-slate-100 text-left" id="active-outlines-list">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <span>Published Outlines ({outlines.length})</span>
                </div>
                {outlines.length === 0 ? (
                  <p className="text-xs text-slate-300 italic pl-2 font-sans">No outlines published yet</p>
                ) : (
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {outlines.map(o => (
                      <div key={o.id} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-100 transition-all text-xs font-sans">
                        <div className="flex-1 min-w-0 pr-4">
                          <span className="font-bold text-slate-700 block truncate">
                            {o.title}
                          </span>
                          <span className="text-[11px] text-slate-400 line-clamp-1 block mt-0.5">
                            {o.sections.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleTriggerEditOutline(o)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteOutline(o.id);
                              onToast('Outline deleted successfully', 'success');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {adminView === 'content' && (
              <div className="space-y-4 pt-10 border-t border-slate-100 text-left" id="active-contents-list">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <span>Published Contents ({contents.length})</span>
                </div>
                {contents.length === 0 ? (
                  <p className="text-xs text-slate-300 italic pl-2 font-sans">No content published yet</p>
                ) : (
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {contents.map(c => (
                      <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-100 transition-all text-xs font-sans">
                        <div className="flex-1 min-w-0 pr-4">
                          <span className="font-bold text-slate-700 block truncate">
                            {c.title}
                          </span>
                          <span className="text-[11px] text-slate-400 line-clamp-1 block mt-0.5">
                            {c.content}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleTriggerEditContent(c)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteContent(c.id);
                              onToast('Content deleted successfully', 'success');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    ) : (
          /* ================= OTHER TABS WORKSPACES ================= */
          <div className="space-y-6">
            {adminTab === 'home' && (
              <form onSubmit={handleSaveHome} className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Configure Home Page</h3>
                  <p className="text-xs text-slate-500">Update hero headings, subtitles, and badges</p>
                </div>
                <div className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Logo Image URL</label>
                    <input type="text" value={homeLogo} onChange={(e) => setHomeLogo(e.target.value)} placeholder="https://example.com/logo.png (leave empty for default H A S)" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Hero Badge Text</label>
                    <input type="text" value={homeBadge} onChange={(e) => setHomeBadge(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Hero Headline (Plain Text)</label>
                    <input type="text" value={homeHeadline} onChange={(e) => setHomeHeadline(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Headline Gradient Word</label>
                    <input type="text" value={homeGradientWord} onChange={(e) => setHomeGradientWord(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Hero Subtitle</label>
                    <textarea rows={3} value={homeSubtitle} onChange={(e) => setHomeSubtitle(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500 leading-relaxed" />
                  </div>
                </div>
                <button type="submit" className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 cursor-pointer">Save Home Configuration</button>
              </form>
            )}

            {adminTab === 'about' && (
              <form onSubmit={handleSaveAbout} className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Configure About Me</h3>
                  <p className="text-xs text-slate-500">Update biography, philosophy, and mission</p>
                </div>
                <div className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 block">Full Name</label>
                      <input type="text" value={aboutName} onChange={(e) => setAboutName(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 block">Role Title</label>
                      <input type="text" value={aboutRole} onChange={(e) => setAboutRole(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Bio Details</label>
                    <textarea rows={4} value={aboutBio} onChange={(e) => setAboutBio(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500 leading-relaxed" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Philosophy Title</label>
                    <input type="text" value={aboutPhilTitle} onChange={(e) => setAboutPhilTitle(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Philosophy Text</label>
                    <textarea rows={3} value={aboutPhilText} onChange={(e) => setAboutPhilText(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500 leading-relaxed" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Mission Statement</label>
                    <textarea rows={3} value={aboutMissionText} onChange={(e) => setAboutMissionText(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-emerald-500 leading-relaxed" />
                  </div>
                </div>
                <button type="submit" className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 cursor-pointer">Save About Configuration</button>
              </form>
            )}

            {adminTab === 'services' && (
              <div className="animate-fadeIn text-left">
                {isAddingService ? (
                  <form onSubmit={handleSaveService} className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-800">{editingServiceId ? 'Edit Service' : 'Add Service'}</h4>
                    <input type="text" required placeholder="Service Title" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                    <textarea required placeholder="Description" value={serviceShortDesc} onChange={(e) => setServiceShortDesc(e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                    <div className="grid grid-cols-2 gap-4">
                      <select value={serviceIconName} onChange={(e) => setServiceIconName(e.target.value)} className="border rounded-xl p-3 text-sm bg-white">
                        <option value="Layers">Layers</option>
                        <option value="FileText">FileText</option>
                        <option value="PenTool">PenTool</option>
                        <option value="Sparkles">Sparkles</option>
                        <option value="Cpu">Cpu</option>
                      </select>
                      <select value={serviceColor} onChange={(e) => setServiceColor(e.target.value)} className="border rounded-xl p-3 text-sm bg-white">
                        <option value="emerald">Emerald</option>
                        <option value="blue">Blue</option>
                        <option value="indigo">Indigo</option>
                        <option value="amber">Amber</option>
                      </select>
                    </div>
                    <textarea placeholder="Bullet Highlights (One per line)" value={serviceHighlights} onChange={(e) => setServiceHighlights(e.target.value)} className="w-full border rounded-xl p-3 text-sm font-mono" />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 bg-emerald-600 text-white text-xs font-bold py-3 rounded-xl">{editingServiceId ? 'Update' : 'Add'}</button>
                      <button type="button" onClick={() => { setIsAddingService(false); setEditingServiceId(null); }} className="px-4 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-900">Services Catalog</h3>
                      <button onClick={() => { setIsAddingService(true); setEditingServiceId(null); setServiceTitle(''); setServiceShortDesc(''); setServiceIconName('Layers'); setServiceColor('emerald'); setServiceHighlights(''); }} className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add Service</button>
                    </div>
                    <div className="space-y-2">
                      {services.map(s => (
                        <div key={s.id} className="flex justify-between items-start p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                          <div>
                            <h4 className="font-bold text-xs text-slate-800">{s.title}</h4>
                            <p className="text-[11px] text-slate-500 truncate max-w-[400px]">{s.shortDesc}</p>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => handleEditService(s)} className="p-1 text-slate-400 hover:text-emerald-600"><Edit className="h-3.5 w-3.5" /></button>
                            <button onClick={() => handleDeleteService(s.id)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {adminTab === 'resume' && (
              <div className="animate-fadeIn text-left space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-black text-slate-900">Direct Resume Image Sync</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload your official curriculum vitae image. It will instantly replace the public interactive resume timeline with your customized visual sheet.
                  </p>
                </div>

                {resumeImage ? (
                  <div className="space-y-6">
                    {/* Visual Card containing preview & actions */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                      <div className="w-full md:w-1/3 bg-white border border-slate-100 rounded-xl overflow-hidden shadow-md group relative">
                        <img 
                          src={resumeImage || undefined} 
                          alt="Resume Thumbnail Preview" 
                          className="w-full h-auto max-h-[220px] object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="text-white h-6 w-6" />
                        </div>
                      </div>

                      <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider font-mono shadow-3xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live on Public Profile
                          </span>
                          <h4 className="font-bold text-sm text-slate-800 mt-2">Active Resume CV Graphic</h4>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                            A high-resolution image is actively hosted. Visitors will see this exact image when clicking the "Resume" tab.
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 justify-center md:justify-start">
                          <label className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5">
                            <Plus className="h-4 w-4" />
                            Replace Image
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file && onUpdateResumeImage) {
                                  try {
                                    const optimized = await compressImageToTargetKB(file, 50);
                                    onUpdateResumeImage(optimized.dataUrl);
                                    onToast('Resume image optimized & updated successfully!', 'success');
                                  } catch (err) {
                                    console.error('Resume image opt error:', err);
                                    onToast('Failed to optimize image.', 'error');
                                  }
                                }
                              }}
                            />
                          </label>

                          <button 
                            onClick={() => {
                              if (onUpdateResumeImage) {
                                onUpdateResumeImage('');
                                onToast('Custom resume image removed. Restored default timeline.', 'info');
                              }
                            }}
                            className="bg-white border border-slate-200 hover:bg-slate-50 text-red-600 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Resume Image
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Large visual drop/upload zone */}
                    <label className="border-2 border-dashed border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/5 transition-all rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer group min-h-[300px]">
                      <div className="h-14 w-14 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center mb-4 border border-emerald-100">
                        <Plus className="h-7 w-7 text-emerald-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-sm">Upload Resume Graphic</h4>
                      <p className="text-xs text-slate-400 max-w-sm mt-1 mb-6 leading-relaxed">
                        Drag and drop your resume file here, or click to browse. Supports PNG, JPG, JPEG. Max file size: 5MB recommended.
                      </p>
                      
                      <span className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md group-hover:-translate-y-0.5">
                        Browse Image File
                      </span>
                      
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file && onUpdateResumeImage) {
                            try {
                              const optimized = await compressImageToTargetKB(file, 50);
                              onUpdateResumeImage(optimized.dataUrl);
                              onToast('Resume image optimized & uploaded successfully!', 'success');
                            } catch (err) {
                              console.error('Resume image opt error:', err);
                              onToast('Failed to optimize image.', 'error');
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {adminTab === 'testimonials' && (
              <div className="animate-fadeIn text-left">
                {isAddingTest ? (
                  <form onSubmit={handleSaveTest} className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-800">{editingTestId ? 'Edit Testimonial' : 'Add Testimonial'}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" required placeholder="Name" value={testName} onChange={(e) => setTestName(e.target.value)} className="border rounded-xl p-3 text-sm" />
                      <input type="text" placeholder="Role/Title" value={testRole} onChange={(e) => setTestRole(e.target.value)} className="border rounded-xl p-3 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Company" value={testCompany} onChange={(e) => setTestCompany(e.target.value)} className="border rounded-xl p-3 text-sm" />
                      <input type="text" placeholder="Metric Highlight" value={testMetric} onChange={(e) => setTestMetric(e.target.value)} className="border rounded-xl p-3 text-sm" />
                    </div>
                    <textarea required placeholder="Quote" value={testQuote} onChange={(e) => setTestQuote(e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 bg-emerald-600 text-white text-xs font-bold py-3 rounded-xl">Save</button>
                      <button type="button" onClick={() => { setIsAddingTest(false); setEditingTestId(null); }} className="px-4 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-900">Client Testimonials</h3>
                      <button onClick={() => { setIsAddingTest(true); setEditingTestId(null); setTestName(''); setTestRole(''); setTestCompany(''); setTestCategory('seo'); setTestRating(5); setTestMetric(''); setTestQuote(''); }} className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add Testimonial</button>
                    </div>
                    <div className="space-y-2">
                      {testimonials.map(t => (
                        <div key={t.id} className="flex justify-between items-start p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                          <div>
                            <h4 className="font-bold text-xs text-slate-800">{t.name}</h4>
                            <p className="text-[11px] text-slate-500">{t.role} | {t.company} ({t.metric})</p>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => handleEditTest(t)} className="p-1 text-slate-400 hover:text-emerald-600"><Edit className="h-3.5 w-3.5" /></button>
                            <button onClick={() => handleDeleteTest(t.id)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {adminTab === 'blog' && (
              <div className="animate-fadeIn text-left">
                {isAddingBlog ? (
                  <form onSubmit={handleSaveBlog} className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-800">{editingBlogId ? 'Edit Post' : 'Add Post'}</h4>
                    <input type="text" required placeholder="Title" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                    <input type="text" required placeholder="Preview Snippet" value={blogPreview} onChange={(e) => setBlogPreview(e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Category" value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} className="border rounded-xl p-3 text-sm" />
                      <input type="text" placeholder="Read Time (e.g. 6 min read)" value={blogReadTime} onChange={(e) => setBlogReadTime(e.target.value)} className="border rounded-xl p-3 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Image URL" value={blogImage} onChange={(e) => setBlogImage(e.target.value)} className="border rounded-xl p-3 text-sm font-mono text-xs" />
                      <input type="text" placeholder="Author" value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} className="border rounded-xl p-3 text-sm" />
                    </div>
                    <textarea required placeholder="Full Article Body (Double return for paragraph breaks)" value={typeof blogContent === 'string' ? blogContent : (Array.isArray(blogContent) ? blogContent.join('\n\n') : '')} onChange={(e) => setBlogContent(e.target.value)} className="w-full border rounded-xl p-4 text-sm font-sans" rows={8} />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 bg-emerald-600 text-white text-xs font-bold py-3 rounded-xl">Publish</button>
                      <button type="button" onClick={() => { setIsAddingBlog(false); setEditingBlogId(null); }} className="px-4 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-900">Blog Publications</h3>
                      <button onClick={() => { setIsAddingBlog(true); setEditingBlogId(null); setBlogTitle(''); setBlogPreview(''); setBlogContent(''); setBlogImage(''); setBlogCategory(''); setBlogReadTime(''); setBlogAuthor(''); }} className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add Post</button>
                    </div>
                    <div className="space-y-2">
                      {blogs.map(post => (
                        <div key={post.id} className="flex justify-between items-start p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                          <div>
                            <h4 className="font-bold text-xs text-slate-800">{post.title}</h4>
                            <p className="text-[11px] text-slate-400 font-sans">Published {post.date} by {post.author}</p>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => handleEditBlog(post)} className="p-1 text-slate-400 hover:text-emerald-600"><Edit className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteBlog(post.id)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {adminTab === 'contact' && (
              <div className="space-y-4 text-left">
                <h3 className="font-bold text-slate-900">Client Inquiries ({contactSubmissions.length})</h3>
                <div className="space-y-3">
                  {contactSubmissions.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No inquiries received yet.</p>
                  ) : (
                    contactSubmissions.map(sub => (
                      <div key={sub.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                        <div className="flex justify-between items-start border-b border-slate-200/60 pb-2 mb-2">
                          <div>
                            <h4 className="font-bold text-xs text-slate-800">{sub.fullName}</h4>
                            <p className="text-[10px] text-slate-400">{sub.businessName} | {sub.email}</p>
                          </div>
                          <button onClick={() => handleDeleteSub(sub.id)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                        </div>
                        <p className="text-xs font-semibold text-slate-700">Subject: {sub.subject}</p>
                        <p className="text-xs text-slate-600 mt-1.5 whitespace-pre-wrap bg-white p-3.5 rounded-lg border border-slate-100">{sub.message}</p>
                        <p className="text-[10px] text-slate-400 mt-2 font-mono">Date: {sub.date}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {adminTab === 'seo' && (
              <div className="animate-fadeIn text-left space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-emerald-500 animate-pulse" />
                      SEO & Performance Results
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Upload Before and After screenshots to showcase your SEO or performance improvements in your portfolio.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* SEO Form */}
                  <form onSubmit={handleSeoSubmit} className="space-y-4 p-6 bg-slate-50 border border-slate-200 rounded-3xl">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project/Transformation Title</label>
                      <input 
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="e.g. Website Speed Optimization"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Before Image</label>
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSeoBeforeFile(e.target.files?.[0] || null)}
                          className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">After Image</label>
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSeoAfterFile(e.target.files?.[0] || null)}
                          className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                          required
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={isOptimizing}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition-colors"
                    >
                      {isOptimizing ? uploadingImageName : 'Publish Before/After Result'}
                    </button>
                  </form>

                  {seoImages.length > 0 && (
                    <div className="space-y-6">
                      <h4 className="font-extrabold text-slate-800 text-sm border-b border-slate-100 pb-2">SEO Results Portfolio</h4>
                      <div className="grid grid-cols-1 gap-6">
                        {seoImages.map(img => (
                          <div key={img.id} className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50 flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                               <h5 className="font-bold text-slate-800 text-sm truncate" title={img.title || img.imageName}>{img.title || img.imageName || 'Untitled'}</h5>
                               <button
                                  onClick={() => removeSeoImage(img.id)}
                                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[10px] py-1.5 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span>Remove</span>
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                               <div>
                                  <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider flex justify-between">
                                    <span>Before</span>
                                    <span className="font-mono text-slate-500">{( (img.originalSize || 0) / 1024).toFixed(1)} KB</span>
                                  </div>
                                  <div className="h-24 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300/40 relative">
                                    <img 
                                      src={img.beforeImage || img.originalImage} 
                                      alt="Before" 
                                      className="h-full w-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                               </div>
                               <div>
                                  <div className="text-[10px] font-bold text-emerald-600 mb-1 uppercase tracking-wider flex justify-between">
                                    <span>After</span>
                                    <span className="font-mono text-emerald-500">{( (img.optimizedSize || 0) / 1024).toFixed(1)} KB</span>
                                  </div>
                                  <div className="h-24 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300/40 relative">
                                    <img 
                                      src={img.afterImage || img.optimizedImage} 
                                      alt="After" 
                                      className="h-full w-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
}
