import React, { useState, useMemo, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc, writeBatch } from 'firebase/firestore';
import { db, saveLargeData, loadLargeData } from './lib/firebase';

const SITE_DATA_DOC = 'global';

import { 
  CheckCircle2, 
  X, 
  LogIn, 
  CreditCard, 
  Lock, 
  Sparkles, 
  AlertCircle, 
  Info,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import local types
import { ActivePage, ArticleBrief, ContentOrder, OutlineItem, ContentItem, BlogPost, HomeConfig, AboutConfig, ServiceItem, ExperienceItem, TestimonialItem, ContactSubmission, EducationItem, CertificationItem, SkillItem, SeoImage } from './types';

// Import mock datasets
import { 
  MOCK_ORDERS, 
  MOCK_BLOG_POSTS, 
  MOCK_BRIEFS,
  MOCK_OUTLINES,
  MOCK_CONTENTS,
  DEFAULT_HOME_CONFIG, 
  DEFAULT_ABOUT_CONFIG, 
  DEFAULT_SERVICES, 
  DEFAULT_EXPERIENCE, 
  DEFAULT_TESTIMONIALS, 
  DEFAULT_CONTACT_SUBMISSIONS,
  DEFAULT_EDUCATION,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_SKILLS
} from './data/mockData';

// Import modular layouts & subpages
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

import Home from './pages/Home';
import BriefLibrary from './pages/BriefLibrary';
import BriefDetail from './pages/BriefDetail';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Resume from './pages/Resume';
import SchemaMarkup from './components/SchemaMarkup';

export default function App() {
  // Navigation & Details Routing states
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [activeLibraryTab, setActiveLibraryTab] = useState<'brief' | 'outline' | 'content' | 'seo'>('brief');
  const [activeLibraryItemId, setActiveLibraryItemId] = useState<string | null>(null);
  const [adminTab, setAdminTab] = useState<'home' | 'about' | 'services' | 'portfolio' | 'resume' | 'testimonials' | 'blog' | 'contact' | 'seo'>('portfolio');

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>('hafizamirsaifi12345@gmail.com');
  const [tempEmail, setTempEmail] = useState<string>('');
  const [tempPassword, setTempPassword] = useState<string>('');
  const [authModalType, setAuthModalType] = useState<'login' | 'signup' | null>(null);

  // Core application transactional states
  const [orders, setOrders] = useState<ContentOrder[]>(() => {
    const saved = localStorage.getItem('apex_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing orders:', e);
      }
    }
    return MOCK_ORDERS;
  });

  const [unlockedBriefIds, setUnlockedBriefIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('apex_unlocked_briefs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing unlockedBriefIds:', e);
      }
    }
    return ['brief-2', 'brief-4']; // Pre-unlocked free briefs
  });

  // Core application dynamic dataset states
  const [briefs, setBriefs] = useState<ArticleBrief[]>(() => {
    const saved = localStorage.getItem('apex_briefs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing briefs:', e);
      }
    }
    return MOCK_BRIEFS;
  });

  const [outlines, setOutlines] = useState<OutlineItem[]>(() => {
    const saved = localStorage.getItem('apex_outlines');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing outlines:', e);
      }
    }
    return MOCK_OUTLINES;
  });

  const [contents, setContents] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem('apex_contents');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing contents:', e);
      }
    }
    return MOCK_CONTENTS;
  });

  const [homeConfig, setHomeConfig] = useState<HomeConfig>(() => {
    const saved = localStorage.getItem('apex_home_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing home config:', e); }
    }
    return DEFAULT_HOME_CONFIG;
  });

  const [aboutConfig, setAboutConfig] = useState<AboutConfig>(() => {
    const saved = localStorage.getItem('apex_about_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing about config:', e); }
    }
    return DEFAULT_ABOUT_CONFIG;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('apex_services');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing services:', e); }
    }
    return DEFAULT_SERVICES;
  });

  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem('apex_experiences');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing experiences:', e); }
    }
    return DEFAULT_EXPERIENCE;
  });

  const [education, setEducation] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem('apex_education');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing education:', e); }
    }
    return DEFAULT_EDUCATION;
  });

  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    const saved = localStorage.getItem('apex_certifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing certifications:', e); }
    }
    return DEFAULT_CERTIFICATIONS;
  });

  const [coreSkills, setCoreSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem('apex_core_skills');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing core skills:', e); }
    }
    return DEFAULT_SKILLS;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('apex_testimonials');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing testimonials:', e); }
    }
    return DEFAULT_TESTIMONIALS;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('apex_blogs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing blogs:', e); }
    }
    return MOCK_BLOG_POSTS;
  });

  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>(() => {
    const saved = localStorage.getItem('apex_contact_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing contact submissions:', e); }
    }
    return DEFAULT_CONTACT_SUBMISSIONS;
  });

  const [resumeImage, setResumeImage] = useState<string>(() => {
    return localStorage.getItem('apex_resume_image') || '';
  });

  // Hoisted SEO States
  const [seoImages, setSeoImages] = useState<SeoImage[]>(() => {
    const saved = localStorage.getItem('apex_seo_images');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Fallback migration from old state if exists
    const oldOriginal = localStorage.getItem('apex_seo_original_image');
    if (oldOriginal) {
      return [{
        id: '1',
        originalImage: oldOriginal,
        optimizedImage: localStorage.getItem('apex_seo_optimized_image') || '',
        originalSize: Number(localStorage.getItem('apex_seo_original_size')) || 0,
        optimizedSize: Number(localStorage.getItem('apex_seo_optimized_size')) || 0,
        imageName: localStorage.getItem('apex_seo_image_name') || '',
        altText: localStorage.getItem('apex_seo_alt_text') || ''
      }];
    }
    return [];
  });

  // Sync state modifications to localStorage
  useEffect(() => {
    if (resumeImage) {
      localStorage.setItem('apex_resume_image', resumeImage);
    } else {
      localStorage.removeItem('apex_resume_image');
    }
  }, [resumeImage]);

  useEffect(() => {
    localStorage.setItem('apex_seo_images', JSON.stringify(seoImages));
  }, [seoImages]);
  useEffect(() => {
    localStorage.setItem('apex_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('apex_unlocked_briefs', JSON.stringify(unlockedBriefIds));
  }, [unlockedBriefIds]);

  useEffect(() => {
    localStorage.setItem('apex_briefs', JSON.stringify(briefs));
  }, [briefs]);

  useEffect(() => {
    localStorage.setItem('apex_outlines', JSON.stringify(outlines));
  }, [outlines]);

  useEffect(() => {
    localStorage.setItem('apex_contents', JSON.stringify(contents));
  }, [contents]);

  useEffect(() => {
    localStorage.setItem('apex_home_config', JSON.stringify(homeConfig));
  }, [homeConfig]);

  useEffect(() => {
    localStorage.setItem('apex_about_config', JSON.stringify(aboutConfig));
  }, [aboutConfig]);

  useEffect(() => {
    localStorage.setItem('apex_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('apex_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('apex_education', JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem('apex_certifications', JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem('apex_core_skills', JSON.stringify(coreSkills));
  }, [coreSkills]);

  useEffect(() => {
    localStorage.setItem('apex_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('apex_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('apex_contact_submissions', JSON.stringify(contactSubmissions));
  }, [contactSubmissions]);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [largeDataLoaded, setLargeDataLoaded] = useState(false);
  const isRemoteUpdate = React.useRef(false);

  // Load global data on mount from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'site_data'), (snapshot) => {
      let hasData = false;
      snapshot.docs.forEach(docSnap => {
        const data = docSnap.data();
        if (data) {
          hasData = true;
          isRemoteUpdate.current = true;
          if (docSnap.id === 'briefs' && data.briefs) setBriefs(data.briefs);
          if (docSnap.id === 'outlines' && data.outlines) setOutlines(data.outlines);
          if (docSnap.id === 'contents' && data.contents) setContents(data.contents);
          if (docSnap.id === 'blogs' && data.blogs) setBlogs(data.blogs);
          if (docSnap.id === 'config') {
            if (data.homeConfig) setHomeConfig(data.homeConfig);
            if (data.aboutConfig) setAboutConfig(data.aboutConfig);
            if (data.services) setServices(data.services);
          }
          if (docSnap.id === 'portfolio') {
            if (data.experiences) setExperiences(data.experiences);
            if (data.education) setEducation(data.education);
            if (data.certifications) setCertifications(data.certifications);
            if (data.coreSkills) setCoreSkills(data.coreSkills);
          }
          if (docSnap.id === 'other') {
            if (data.testimonials) setTestimonials(data.testimonials);
            if (data.contactSubmissions) setContactSubmissions(data.contactSubmissions);
          }
        }
      });
      if (hasData) {
        setTimeout(() => {
          isRemoteUpdate.current = false;
        }, 100);
      }
      setDataLoaded(true);
    }, (err) => {
      console.error('Error fetching global site data from Firestore:', err);
      setDataLoaded(true);
    });

    // Fetch large base64 fields from Firestore chunks
    Promise.allSettled([
      loadLargeData('resumeImage').then(data => {
        if (data !== null) setResumeImage(data);
      }),
      loadLargeData('seoImages').then(data => {
        if (data !== null) {
          try {
            const parsed = JSON.parse(data);
            setSeoImages(parsed);
          } catch (e) {
            console.error('Failed to parse seoImages chunks', e);
          }
        }
      })
    ]).finally(() => {
      setLargeDataLoaded(true);
    });

    return () => unsub();
  }, []);

  // Synchronize dynamic state to Firestore
  useEffect(() => {
    if (!dataLoaded || !largeDataLoaded || isRemoteUpdate.current) return; // Don't overwrite the server data with initial local state before loading, or if this is a remote update

    const payload = {
      briefs, outlines, contents, blogs,
      homeConfig, aboutConfig, services,
      experiences, education, certifications, coreSkills,
      testimonials, contactSubmissions, resumeImage, seoImages
    };

    const timer = setTimeout(() => {
      const batch = writeBatch(db);
      batch.set(doc(db, 'site_data', 'briefs'), JSON.parse(JSON.stringify({ briefs })), { merge: true });
      batch.set(doc(db, 'site_data', 'outlines'), JSON.parse(JSON.stringify({ outlines })), { merge: true });
      batch.set(doc(db, 'site_data', 'contents'), JSON.parse(JSON.stringify({ contents })), { merge: true });
      batch.set(doc(db, 'site_data', 'blogs'), JSON.parse(JSON.stringify({ blogs })), { merge: true });
      batch.set(doc(db, 'site_data', 'config'), JSON.parse(JSON.stringify({ homeConfig, aboutConfig, services })), { merge: true });
      batch.set(doc(db, 'site_data', 'portfolio'), JSON.parse(JSON.stringify({ experiences, education, certifications, coreSkills })), { merge: true });
      batch.set(doc(db, 'site_data', 'other'), JSON.parse(JSON.stringify({ testimonials, contactSubmissions })), { merge: true });
      
      batch.commit().catch(err => console.error('Error syncing dynamic data to Firestore:', err));

      saveLargeData('resumeImage', resumeImage || '').catch(err => console.error('Error saving resumeImage:', err));
      saveLargeData('seoImages', JSON.stringify(seoImages || [])).catch(err => console.error('Error saving seoImages:', err));
        
      // Also sync to server for sitemap generation and large image storage
      fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error('Error syncing to server for sitemap:', err));
    }, 1000); // Debounce to avoid spamming the server on rapid typing

    return () => clearTimeout(timer);
  }, [
    dataLoaded, largeDataLoaded, briefs, outlines, contents, blogs,
    homeConfig, aboutConfig, services,
    experiences, education, certifications, coreSkills,
    testimonials, contactSubmissions, resumeImage, seoImages
  ]);

  // URL Query Parameters Router on load/mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam) {
      setCurrentPage(pageParam as ActivePage);
    }
    const briefParam = params.get('brief');
    if (briefParam) {
      setSelectedBriefId(briefParam);
      setCurrentPage('detail');
    }
    const postParam = params.get('post');
    if (postParam) {
      setSelectedPostId(postParam);
      setCurrentPage('blog');
    }
  }, []);

  const handlePublishBrief = (newBrief: ArticleBrief) => {
    setBriefs(prev => [newBrief, ...prev]);
  };

  const handleEditBrief = (updatedBrief: ArticleBrief) => {
    setBriefs(prev => prev.map(b => b.id === updatedBrief.id ? updatedBrief : b));
  };

  const handleDeleteBrief = (id: string) => {
    setBriefs(prev => prev.filter(b => b.id !== id));
  };

  const handlePublishOutline = (newOutline: OutlineItem) => {
    setOutlines(prev => [newOutline, ...prev]);
  };

  const handleEditOutline = (updatedOutline: OutlineItem) => {
    setOutlines(prev => prev.map(o => o.id === updatedOutline.id ? updatedOutline : o));
  };

  const handleDeleteOutline = (id: string) => {
    setOutlines(prev => prev.filter(o => o.id !== id));
  };

  const handlePublishContent = (newContent: ContentItem) => {
    setContents(prev => [newContent, ...prev]);
  };

  const handleEditContent = (updatedContent: ContentItem) => {
    setContents(prev => prev.map(c => c.id === updatedContent.id ? updatedContent : c));
  };

  const handleDeleteContent = (id: string) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  // Outline Unlock Transaction state
  const [unlockTargetId, setUnlockTargetId] = useState<string | null>(null);

  // Toast banner alerts state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info'; visible: boolean } | null>(null);

  // Helper trigger to display custom toast
  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type, visible: true });
    // Auto clear
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, visible: false } : null);
    }, 4500);
  };

  // Auth Action: Log in simulation
  const handleLoginConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempEmail || !tempPassword) {
      triggerToast('Please provide both credentials.', 'info');
      return;
    }
    setUserEmail(tempEmail);
    setIsLoggedIn(true);
    setAuthModalType(null);
    triggerToast(`Welcome back, ${tempEmail.split('@')[0]}! Workspace synced successfully.`, 'success');
  };

  // Auth Action: Sign up simulation
  const handleSignUpConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempEmail || !tempPassword) {
      triggerToast('Please complete registration fields.', 'info');
      return;
    }
    setUserEmail(tempEmail);
    setIsLoggedIn(true);
    setAuthModalType(null);
    triggerToast('Account created! Welcome to Apex OS high performance workspaces.', 'success');
  };

  // Log out action
  const handleLogOutToggle = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      triggerToast('You have logged out of the workspace.', 'info');
    } else {
      setTempEmail(userEmail);
      setTempPassword('');
      setAuthModalType('login');
    }
  };

  // Unlock Trigger
  const handleUnlockTrigger = (id: string) => {
    setUnlockTargetId(id);
  };

  // Payment Confirmation Action for Premium outlines
  const handlePaymentConfirm = () => {
    if (!unlockTargetId) return;

    // Append to unlocked lists
    setUnlockedBriefIds(prev => [...prev, unlockTargetId]);
    
    // Create simulated outline order record automatically
    const targetBrief = briefs.find(b => b.id === unlockTargetId);
    if (targetBrief) {
      const newOrderRecord: ContentOrder = {
        id: `ord-${Math.floor(100 + Math.random() * 900)}`,
        title: `Premium Outline: ${targetBrief.title}`,
        serviceType: 'Outline Access License',
        status: 'Completed',
        amount: '$49',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };
      setOrders(prev => [newOrderRecord, ...prev]);
    }

    setUnlockTargetId(null);
    triggerToast('Payment authorized successfully! Premium outline is now fully readable.', 'success');
  };

  // Navigate directly to contact to order custom copy
  const handleOrderContentNavigate = (title: string) => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerToast(`Configuring campaign preset: "${title}"`, 'info');
  };

  // Add new order from dashboard
  const handleAddNewOrder = (newOrder: ContentOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  // AI Generated item appenders
  const handleAddBrief = (newBrief: ArticleBrief) => {
    setBriefs(prev => [newBrief, ...prev]);
    triggerToast(`Successfully generated new Brief: "${newBrief.title}"`, 'success');
  };

  const handleAddOutline = (newOutline: OutlineItem) => {
    setOutlines(prev => [newOutline, ...prev]);
    triggerToast(`Successfully generated new Outline: "${newOutline.title}"`, 'success');
  };

  const handleAddContent = (newContent: ContentItem) => {
    setContents(prev => [newContent, ...prev]);
    triggerToast(`Successfully generated new Content: "${newContent.title}"`, 'success');
  };

  const handleClearAllLibraryData = () => {
    setBriefs([]);
    setOutlines([]);
    setContents([]);
    localStorage.removeItem('apex_briefs');
    localStorage.removeItem('apex_outlines');
    localStorage.removeItem('apex_contents');
    triggerToast('All generated portfolio data has been cleared successfully!', 'success');
  };

  // Filter selected brief metadata for detail page
  const selectedBrief = useMemo(() => {
    return briefs.find(b => b.id === selectedBriefId) || briefs[0];
  }, [briefs, selectedBriefId]);

  // Compute related articles of similar category
  const relatedBriefs = useMemo(() => {
    if (!selectedBrief) return [];
    return briefs.filter(b => b.category === selectedBrief.category && b.id !== selectedBrief.id).slice(0, 2);
  }, [briefs, selectedBrief]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SchemaMarkup 
        currentPage={currentPage}
        blogPost={blogs.find(b => b.id === selectedPostId)}
        briefItem={selectedBrief}
      />
      {/* Sticky Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLoginToggle={handleLogOutToggle}
        onSignUpOpen={() => {
          setTempEmail('');
          setTempPassword('');
          setAuthModalType('signup');
        }}
        onNewArticleClick={() => {
          setActiveLibraryTab('write');
          setCurrentPage('library');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        homeConfig={homeConfig}
      />

      {/* Main Render Views Router */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedBriefId || '')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentPage === 'home' && (
              <Home
                briefs={briefs}
                outlines={outlines}
                contents={contents}
                setCurrentPage={setCurrentPage}
                setSelectedBriefId={setSelectedBriefId}
                setSearchKeyword={setSearchKeyword}
                setActiveLibraryTab={setActiveLibraryTab}
                setActiveLibraryItemId={setActiveLibraryItemId}
                onAddBrief={handleAddBrief}
                onAddOutline={handleAddOutline}
                onAddContent={handleAddContent}
                onToast={triggerToast}
                homeConfig={homeConfig}
              />
            )}

            {currentPage === 'about' && (
              <About
                setCurrentPage={setCurrentPage}
                onToast={triggerToast}
                aboutConfig={aboutConfig}
              />
            )}

            {currentPage === 'services' && (
              <Services
                setCurrentPage={setCurrentPage}
                onToast={triggerToast}
                services={services}
              />
            )}

            {currentPage === 'resume' && (
              <Resume
                setCurrentPage={setCurrentPage}
                onToast={triggerToast}
                experiences={experiences}
                education={education}
                certifications={certifications}
                coreSkills={coreSkills}
                resumeImage={resumeImage}
              />
            )}

            {currentPage === 'library' && (
              <BriefLibrary
                briefs={briefs}
                outlines={outlines}
                contents={contents}
                setCurrentPage={setCurrentPage}
                setSelectedBriefId={setSelectedBriefId}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                initialLibrary={activeLibraryTab}
                onLibraryChange={setActiveLibraryTab}
                activeLibraryItemId={activeLibraryItemId}
                setActiveLibraryItemId={setActiveLibraryItemId}
                onAddBrief={handleAddBrief}
                onAddOutline={handleAddOutline}
                onAddContent={handleAddContent}
                onDeleteBrief={handleDeleteBrief}
                onDeleteOutline={handleDeleteOutline}
                onDeleteContent={handleDeleteContent}
                onClearAll={handleClearAllLibraryData}
                onToast={triggerToast}
                onNavigateToSeo={() => {
                  setAdminTab('seo');
                  setCurrentPage('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                seoImages={seoImages}
              />
            )}

            {currentPage === 'detail' && selectedBrief && (
              <BriefDetail
                brief={selectedBrief}
                onBack={() => {
                  setCurrentPage('library');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                isUnlocked={unlockedBriefIds.includes(selectedBrief.id)}
                onUnlock={handleUnlockTrigger}
                onOrderContent={handleOrderContentNavigate}
                relatedBriefs={relatedBriefs}
                setSelectedBriefId={setSelectedBriefId}
              />
            )}

            {currentPage === 'pricing' && (
              <Pricing
                setCurrentPage={setCurrentPage}
                onToast={triggerToast}
              />
            )}

            {currentPage === 'contact' && (
              <Contact
                initialSubject={selectedBriefId ? `Custom Copywriting: ${selectedBrief.title}` : ''}
                onToast={triggerToast}
                onAddSubmission={(newSub) => {
                  setContactSubmissions(prev => [newSub, ...prev]);
                }}
              />
            )}

            {currentPage === 'dashboard' && (
              <Dashboard
                userEmail={userEmail}
                unlockedBriefIds={unlockedBriefIds.filter(id => id !== 'brief-2' && id !== 'brief-4')} // only user-unlocked ones
                allBriefsCount={briefs.filter(b => b.status === 'Premium').length}
                orders={orders}
                onAddNewOrder={handleAddNewOrder}
                onToast={triggerToast}
                onNavigateToLibrary={() => {
                  setCurrentPage('library');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                briefs={briefs}
                outlines={outlines}
                contents={contents}
                onPublishBrief={handlePublishBrief}
                onPublishOutline={handlePublishOutline}
                onPublishContent={handlePublishContent}
                onEditBrief={handleEditBrief}
                onDeleteBrief={handleDeleteBrief}
                onEditOutline={handleEditOutline}
                onDeleteOutline={handleDeleteOutline}
                onEditContent={handleEditContent}
                onDeleteContent={handleDeleteContent}
                adminTab={adminTab}
                
                homeConfig={homeConfig}
                onUpdateHomeConfig={setHomeConfig}
                aboutConfig={aboutConfig}
                onUpdateAboutConfig={setAboutConfig}
                services={services}
                onUpdateServices={setServices}
                experiences={experiences}
                onUpdateExperiences={setExperiences}
                education={education}
                onUpdateEducation={setEducation}
                certifications={certifications}
                onUpdateCertifications={setCertifications}
                coreSkills={coreSkills}
                onUpdateCoreSkills={setCoreSkills}
                resumeImage={resumeImage}
                onUpdateResumeImage={setResumeImage}
                testimonials={testimonials}
                onUpdateTestimonials={setTestimonials}
                blogs={blogs}
                onUpdateBlogs={setBlogs}
                contactSubmissions={contactSubmissions}
                onUpdateContactSubmissions={setContactSubmissions}
                seoImages={seoImages}
                onUpdateSeoImages={setSeoImages}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Styled Footer */}
      <Footer 
        setCurrentPage={setCurrentPage}
        onToast={triggerToast}
      />

      {/* MODAL: Login System */}
      <AnimatePresence>
        {authModalType === 'login' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalType(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <button 
                onClick={() => setAuthModalType(null)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center space-y-1.5">
                <div className="mx-auto rounded-xl bg-emerald-50 text-emerald-600 p-2.5 w-fit">
                  <LogIn className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Sign in to Apex OS</h3>
                <p className="text-xs text-gray-500">Access unlocked outlines and view active writing briefs</p>
              </div>

              <form onSubmit={handleLoginConfirm} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="login-email" className="text-2xs font-bold text-gray-500 uppercase tracking-wider block">Work Email</label>
                  <input 
                    id="login-email"
                    type="email" 
                    required
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="login-password" className="text-2xs font-bold text-gray-500 uppercase tracking-wider block">Password</label>
                  <input 
                    id="login-password"
                    type="password" 
                    required
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    placeholder="Enter account security key"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 shadow shadow-emerald-50 transition-colors"
                >
                  Access Workspace
                </button>
              </form>

              <div className="text-center">
                <button 
                  onClick={() => setAuthModalType('signup')}
                  className="text-2xs text-emerald-600 hover:underline font-semibold"
                >
                  New to the platform? Register workspace
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Sign Up System */}
      <AnimatePresence>
        {authModalType === 'signup' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalType(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <button 
                onClick={() => setAuthModalType(null)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center space-y-1.5">
                <div className="mx-auto rounded-xl bg-emerald-50 text-emerald-600 p-2.5 w-fit">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Create Corporate Workspace</h3>
                <p className="text-xs text-gray-500">Scale high volumes of data-backed, high-performing organic layouts</p>
              </div>

              <form onSubmit={handleSignUpConfirm} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="signup-email" className="text-2xs font-bold text-gray-500 uppercase tracking-wider block">Your Corporate Email</label>
                  <input 
                    id="signup-email"
                    type="email" 
                    required
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="signup-password" className="text-2xs font-bold text-gray-500 uppercase tracking-wider block">Set Password</label>
                  <input 
                    id="signup-password"
                    type="password" 
                    required
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 shadow shadow-emerald-50 transition-colors"
                >
                  Generate Workspace Keys
                </button>
              </form>

              <div className="text-center">
                <button 
                  onClick={() => setAuthModalType('login')}
                  className="text-2xs text-emerald-600 hover:underline font-semibold"
                >
                  Already have access? Log in
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Premium Checkout Payment Form */}
      <AnimatePresence>
        {unlockTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUnlockTargetId(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <button 
                onClick={() => setUnlockTargetId(null)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center space-y-1">
                <div className="mx-auto rounded-xl bg-amber-50 text-amber-600 p-2.5 w-fit">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Secure Checkout Gate</h3>
                <p className="text-xs text-gray-500">SaaS Outline License Authorization</p>
              </div>

              {/* Mock Credit card decoration */}
              <div className="rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-950 p-5 text-white shadow-md space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-2xs font-semibold tracking-wider font-mono">APEX OS ELITE LICENSE</span>
                  <div className="h-5 w-8 bg-white/20 rounded" />
                </div>
                <div className="space-y-1">
                  <span className="block text-2xs text-emerald-300 font-mono">AUTHORIZED INVESTMENT</span>
                  <span className="text-2xl font-bold tracking-tight font-mono">$49.00 USD</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="card-number" className="text-2xs font-bold text-gray-500 uppercase tracking-wider block">Card Details</label>
                  <input 
                    id="card-number"
                    type="text" 
                    defaultValue="4000 1234 5678 9010" 
                    placeholder="Card Number"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="card-expiry" className="text-2xs font-bold text-gray-500 uppercase tracking-wider block">Expiry</label>
                    <input 
                      id="card-expiry"
                      type="text" 
                      defaultValue="06 / 29" 
                      placeholder="MM / YY"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="card-cvc" className="text-2xs font-bold text-gray-500 uppercase tracking-wider block">CVC</label>
                    <input 
                      id="card-cvc"
                      type="password" 
                      defaultValue="777" 
                      placeholder="•••"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <button 
                  onClick={handlePaymentConfirm}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 shadow"
                >
                  <span>Authorize & Process $49.00</span>
                </button>

                <div className="flex items-center justify-center space-x-1 text-2xs text-gray-400 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Encrypted SSL 256-bit certified transaction protocol</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL BANNER TOAST */}
      <AnimatePresence>
        {toast && toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-5 right-5 z-50 flex items-center space-x-3 rounded-2xl bg-gray-900 text-white p-4 max-w-sm shadow-xl border border-gray-800"
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            ) : (
              <Info className="h-5 w-5 text-indigo-400 shrink-0" />
            )}
            <p className="text-xs leading-relaxed font-semibold pr-4">
              {toast.message}
            </p>
            <button 
              onClick={() => setToast(prev => prev ? { ...prev, visible: false } : null)}
              className="rounded-lg p-0.5 hover:bg-gray-800 text-gray-400 hover:text-white"
              aria-label="Close Toast"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
