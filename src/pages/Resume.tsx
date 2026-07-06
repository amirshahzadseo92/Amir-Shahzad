import React from 'react';
import { 
  FileText, 
  Download, 
  Share2,
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react';
import { ActivePage, ExperienceItem, EducationItem, CertificationItem, SkillItem } from '../types';

interface ResumeProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info') => void;
  experiences?: ExperienceItem[];
  education?: EducationItem[];
  certifications?: CertificationItem[];
  coreSkills?: SkillItem[];
  resumeImage?: string;
}

export default function Resume({ 
  setCurrentPage, 
  onToast, 
  resumeImage
}: ResumeProps) {

  const handleDownloadPDF = () => {
    if (resumeImage) {
      onToast('Downloading custom resume...', 'info');
      const link = document.createElement('a');
      link.href = resumeImage;
      link.download = 'Hafiz_Amir_Saifi_Resume.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onToast('Resume downloaded successfully!', 'success');
    } else {
      onToast('No custom resume image uploaded yet.', 'info');
    }
  };

  const handleShareResume = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onToast('Resume link copied to clipboard!', 'success');
    } else {
      onToast('Sharing not supported on this browser', 'info');
    }
  };

  if (resumeImage) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 bg-white min-h-screen flex items-center justify-center animate-fadeIn">
        <div className="animated-gradient-border rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
          <img 
            src={resumeImage} 
            alt="Hafiz Amir Saifi Resume" 
            className="w-full h-auto object-contain rounded-xl max-h-[1600px] bg-white block"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-10 mb-12 gap-6">
        <div className="text-left space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 shadow-3xs">
            <FileText className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-2xs font-extrabold tracking-widest uppercase font-mono text-emerald-700">
              Official Curriculum Vitae
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            Professional Resume
          </h1>
          <p className="text-sm text-gray-500">
            Hafiz Amir Saifi — Specialized Senior Architect delivering pristine SEO and automation code.
          </p>
        </div>

        {/* Dynamic CTAs */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleShareResume}
            className="flex items-center space-x-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs px-5 py-3.5 transition-all cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            <span>Copy Profile Link</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30 text-center max-w-2xl mx-auto animate-fadeIn">
        <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 text-slate-400">
          <ImageIcon className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-800">No Resume Graphic Uploaded</h3>
        <p className="text-sm text-slate-500 max-w-md mt-2 mb-8 leading-relaxed">
          The official curriculum vitae image has not been uploaded yet. You can upload it instantly from your secure Admin Panel.
        </p>
        <button 
          onClick={() => {
            setCurrentPage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer group"
        >
          <span>Get in Touch</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}
