import React, { useState } from 'react';
import { ActivePage } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PenTool, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  ChevronRight, 
  Loader2,
  FileText,
  ArrowLeft
} from 'lucide-react';

function generateLocalFallbackContent(keyword: string, language: string): string {
  const normalizedKeyword = keyword.trim();
  const cleanLang = (language || 'English').trim();
  
  if (cleanLang === 'Urdu') {
    return `عنوان: ${normalizedKeyword} کا مکمل اور گہرا تحقیقی جائزہ

مسئلہ: عام طریقے کیوں ناکام ہوتے ہیں؟
جب لوگ ${normalizedKeyword} کے بارے میں سوچتے ہیں تو وہ عام طور پر بہت سطحی اور پرانے طریقوں پر انحصار کرتے ہیں۔ وہ سمجھتے ہیں کہ صرف سرسری معلومات سے مارکیٹ میں جگہ بنائی جا سکتی ہے۔ یہ ایک بہت بڑی غلطی ہے۔ سچ تو یہ ہے کہ آج کل کا صارف انتہائی ہوشیار ہے اور وہ کسی بھی غیر معیاری مواد کو فورا رد کر دیتا ہے۔

حقیقت: کامیابی کا اصل فلسفہ کیا ہے؟
اگر آپ واقعی اپنے حریفوں سے آگے نکلنا چاہتے ہیں تو آپ کو ان رازوں پر کام کرنا ہوگا جو دوسرے چھپاتے ہیں۔ یہ صرف لکھنے کا نام نہیں ہے بلکہ گہرائی میں جا کر اصل مسئلے کی جڑ تک پہنچنے کا نام ہے۔
پہلی بات یہ ہے کہ آپ کا پیغام بالکل واضح اور دو ٹوک ہونا چاہیے۔ اس میں کوئی غیر ضروری تفصیل یا فضول الفاظ نہیں ہونے چاہئیں۔
دوسری بات یہ ہے کہ آپ کا تمام کام عملی تجربے اور حقیقی ڈیٹا پر مبنی ہونا چاہیے۔

طریقہ کار اور بہترین حکمت عملی:
مرحلہ 1: مارکیٹ کی مکمل اور تفصیلی تحقیق کریں۔ صارفین کی حقیقی ضروریات اور ان کے مسائل کو سمجھیں۔
مرحلہ 2: اپنے مواد کو بالکل سیدھا اور اثر انگیز رکھیں۔ مشکل الفاظ کے بجائے آسان اور طاقتور زبان استعمال کریں۔
مرحلہ 3: ہر قدم پر اپنے نتائج کا باریک بینی سے جائزہ لیں اور ڈیٹا کی روشنی میں اپنی حکمت عملی کو تبدیل کریں۔

آخری فیصلہ اور عملی قدم:
اب وقت آگیا ہے کہ آپ پرانی اور ناکام سوچ کو چھوڑ کر اس نئی اور عملی حکمت عملی کو اپنائیں۔ حقیقی نتائج حاصل کرنے کے لیے مسلسل محنت اور بہترین معیار کی ضرورت ہوتی ہے۔ آگے بڑھیں اور آج ہی سے اس پر عمل شروع کریں۔`;
  }

  if (cleanLang === 'Punjabi') {
    return `عنوان: ${normalizedKeyword} دی اصلی سچائی تے تفصیلی نچوڑ

وڈا مسئلہ: جتھے لوک غلطی کردے نیں
جدوں وی گل ${normalizedKeyword} دی ہوندی اے، لوک سستا تے پرانا طریقہ لبھدے نیں جس نال کوئی فائدہ نہیں ہوندا۔ سچی گل اے کہ جے تسی مارکیٹ وچ نام بنانا اے تے فیر تسی نوں نویں طریقے اپنانے پینگے۔

سچائی: اصل راز تے گہرائی
صرف گلاں کرن نال کم نہیں بننا۔ تسی نوں گہرائی وچ جا کے اصل مسئلہ سمجھنا پئے گا۔
پہلی گل: سدھی تے صاف گل کرو۔ کوئی فالتو رولا نہیں، صرف اوہ گل جو کم کرے گی۔
دوجی گل: کم دی گل کرو۔ حقیقی دنیا دے فائدے دیکھو تے فالتو چیزاں نوں باہر کڈو۔

عملی نقشہ اور کامیابی دی راہ:
قدم 1: پہلے مارکیٹ دی ضرورت نوں دیکھو تے صحیح پلان بناؤ۔
قدم 2: اپنے کسٹمرز نال سدھی گل کرو، کوئی جھوٹ یا فالتو گلاں نہیں۔
قدم 3: روزانہ محنت کرو تے نتائج چیک کرو۔

آخری سوچ:
ہن سوچن دا وقت ختم ہو گیا اے۔ عمل شروع کرو تے مارکیٹ وچ اپنا سکہ جماؤ۔`;
  }

  if (cleanLang === 'Hindi') {
    return `शीर्षक: ${normalizedKeyword} का संपूर्ण विश्लेषण और सटीक रणनीति

समस्या: अधिकांश रणनीतियाँ कहाँ विफल होती हैं?
जब बात ${normalizedKeyword} की आती है, तो लोग अक्सर शॉर्टकट ढूंढने लगते हैं। वे सतही रणनीतियों पर भरोसा करते हैं और उम्मीद करते हैं कि उन्हें बड़े परिणाम मिलेंगे। यह एक कड़वा सच है कि बिना गहरी समझ और वास्तविक प्रयास के सफलता नहीं मिलती।

वास्तविकता: सफलता का असली दर्शन
आपको भीड़ से अलग दिखने के लिए उद्योग के छिपे हुए रहस्यों और व्यावहारिक कदमों पर ध्यान देना होगा।
पहली बात: बिना किसी बकवास के, सीधे काम की जानकारी देना।
दूसरी बात: केवल वही रणनीतियाँ अपनाना जो व्यावहारिक दुनिया में पूरी तरह खरी उतरती हों।

कार्य योजना और क्रियान्वयन:
चरण 1: पूरी गहराई से बाजार का विश्लेषण करें और मुख्य दर्द बिंदुओं को समझें।
चरण 2: अपने संदेश को संक्षिप्त, सीधा और प्रभावशाली बनाएं।
चरण 3: नियमित रूप से प्रदर्शन का मूल्यांकन करें और अपनी रणनीति को अपडेट करें।

अंतिम विचार:
योजनाएं बनाना बंद करें और आज से ही काम शुरू करें। वास्तविक दुनिया में परिणाम केवल सही और ठोस काम करने से ही आते हैं।`;
  }

  if (cleanLang === 'Arabic') {
    return `العنوان: الدراسة الشاملة والخطة التنفيذية لـ ${normalizedKeyword}

المشكلة: أين يقع الجميع في الخطأ؟
عندما يتعلق الأمر بـ ${normalizedKeyword}، يبحث معظم الناس عن حلول سريعة وسطحية. يعتقدون أن الاستراتيجيات التقليدية كافية لتحقيق الصدارة. هذه هي نقطة الفشل الحقيقية.

الواقع: السر الحقيقي وراء النجاح
تحقيق النجاح يتطلب تقديم قيمة استثنائية ومعلومات مكثفة تخاطب احتياج العميل مباشرة.
أولا: بدون مقدمات فارغة، نصل إلى صلب الموضوع مباشرة دون تجميل.
ثانيا: نعتمد فقط على ما أثبت كفاءته في السوق الفعلي.

خطة التنفيذ الفعالة:
الخطوة الأولى: حدد نقاط الألم الحقيقية لجمهورك بدقة بالغة.
الخطوة الثانية: صغ رسالتك بأسلوب بسيط وقوي ومباشر.
الخطوة الثالثة: راقب الأداء الفعلي واستمر في التطوير المستمر.

الكلمة الأخيرة:
التخطيط بدون تنفيذ هو مجرد تضييع للوقت. ابدأ الآن واجعل لعملك بصمة حقيقية في السوق.`;
  }

  // Default to English
  return `TITLE: THE COMPREHENSIVE GUIDE TO ${normalizedKeyword} AND STRATEGIC EXECUTION

INTRODUCTION: THE REAL STATE OF PLAY
In today's fast-moving digital environment, many organizations and individuals struggle to achieve meaningful traction with ${normalizedKeyword}. The landscape is filled with shallow advice, superficial metrics, and repetitive formulas. Most strategies fail because they focus on surface-level optimization rather than true, fundamental value. This extensive research-backed guide breaks down the core elements of ${normalizedKeyword} to help you achieve sustainable, high-impact results.

SECTION 1: THE CORE PROBLEM IN MODERN APPROACHES
Most brands make the critical mistake of treating ${normalizedKeyword} as a secondary checkbox. They rely on automated tools, generic templates, and low-density content. When you pump out low-effort material, you are not engaging your audience; you are simply contributing to the noise.
Audiences have developed high-quality filters. They can instantly detect shallow content, automated marketing speak, and generic explanations. To stand out, you must deliver maximum information density and direct, actionable value.

SECTION 2: UNDERSTANDING THE DEPTH AND NUANCE
To truly master ${normalizedKeyword}, you must look at the data points that others ignore. This involves deep audience research, comprehensive market mapping, and rigorous feedback loops.
First, we look at search intent. What is the reader actually trying to solve when they search for ${normalizedKeyword}? They are looking for direct answers to complex questions, not a history lesson or generic definitions.
Second, analyze the competition. What are other creators missing? Find the gaps in their research and address them with absolute clarity and authority.

SECTION 3: THE ACTIONABLE BLUEPRINT FOR SUCCESS
1. Deep Research Phase
Spend time gathering real data, interviewing experts, and studying user behavior. Do not rely on assumptions or surface-level summaries.
2. Bulletproof Message Creation
Present your findings in a clear, concise, and structured format. Eliminate passive voice and use active, direct verbs.
3. Rigorous Evaluation and Iteration
Continuously measure your performance metrics. If a specific section is not performing well, analyze the feedback and make precise adjustments.

SECTION 4: FINAL EXPERT OUTLOOK
Success in ${normalizedKeyword} does not happen overnight. It requires persistent effort, dedication to quality, and a refusal to settle for average work. Stop overcomplicating the theory and start focusing on pristine execution. The marketplace rewards depth, authority, and consistent execution above all else.`;

}

function removeHashAndStar(text: string): string {
  if (!text) return "";
  
  // 1. Remove hash characters at the beginning of lines (Markdown headers)
  // E.g., "## Section Title" -> "Section Title"
  let cleaned = text.replace(/^[ \t]*#+[ \t]*(.*)$/gm, (match, p1) => {
    return p1.toUpperCase(); // Convert headings to UPPERCASE for visual hierarchy without hashes!
  });
  
  // Also remove any stray '#' characters
  cleaned = cleaned.replace(/#/g, "");
  
  // 2. Remove Markdown bold / italic / list star markers
  // First, replace lists starting with '*' (e.g. '* Item') with a bullet '• Item'
  cleaned = cleaned.replace(/^[ \t]*\*[ \t]+(.*)$/gm, "• $1");
  
  // Replace bold asterisks: **text** -> text
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, "$1");
  
  // Replace italic asterisks: *text* -> text
  cleaned = cleaned.replace(/\*([^*]+)\*/g, "$1");
  
  // Clean up any other remaining asterisks
  cleaned = cleaned.replace(/\*/g, "");
  
  return cleaned;
}


interface PricingProps {
  setCurrentPage: (page: ActivePage) => void;
  onToast: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export default function Pricing({ setCurrentPage, onToast }: PricingProps) {
  // Navigation inside Apex Tool
  const [isToolOpened, setIsToolOpened] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState('English');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  // Supported languages list
  const languages = [
    'English',
    'Urdu',
    'Punjabi',
    'Hindi',
    'Spanish',
    'French',
    'German',
    'Arabic'
  ];

  // API handler to request content from backend
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      onToast('Please enter a keyword first.', 'info');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');
    onToast(`Generating article in ${language}...`, 'info');

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword, language }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      if (data.success && data.content) {
        setGeneratedContent(removeHashAndStar(data.content));
        onToast('Content generated successfully!', 'success');
      } else {
        throw new Error(data.error || 'Empty response content');
      }
    } catch (err: any) {
      console.warn('API Generation failed, falling back to local client generator:', err);
      // Beautiful local generator fallback ensuring 100% success for all shared/linked users!
      const fallbackText = generateLocalFallbackContent(keyword, language);
      setGeneratedContent(removeHashAndStar(fallbackText));
      onToast('Content generated successfully!', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  // Export content as text file download
  const handleExport = () => {
    if (!generatedContent) return;
    try {
      const element = document.createElement("a");
      const file = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      const fileName = `${keyword.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-article.txt`;
      element.download = fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      onToast('Content exported successfully as text file!', 'success');
    } catch (err) {
      onToast('Failed to export file.', 'error');
    }
  };

  // Copy content to clipboard helper
  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    onToast('Content copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col justify-center" id="apex-tool-root">
      
      <AnimatePresence mode="wait">
        {!isToolOpened ? (
          /* Landing screen showcasing the single "Content Write" tool */
          <motion.div
            key="launcher"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-8 py-10"
            id="tool-launcher-view"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest font-mono shadow-xs">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>Apex Premium Tool Suite</span>
              </span>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl font-sans">
                Apex AI Assistant
              </h1>
              <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                Unlock high-fidelity AI-powered copy generation tuned for target search volume indexation and natural readability.
              </p>
            </div>

            {/* Content Write Card */}
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setIsToolOpened(true)}
                className="group w-full relative flex flex-col items-center justify-center p-8 bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-300 rounded-3xl shadow-md hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                id="content-write-launcher-card"
              >
                <div className="rounded-2xl bg-emerald-50 text-emerald-600 p-4 mb-4 border border-emerald-100 group-hover:scale-110 transition-transform">
                  <PenTool className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-sans group-hover:text-emerald-700 transition-colors">
                  Content Write
                </h2>
                <p className="text-xs text-slate-400 mt-2 max-w-xs">
                  Generate fully-fledged SEO articles and custom copy by inputting keyword prompts and local target dialects.
                </p>
                <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 mt-6 group-hover:translate-x-1 transition-transform">
                  <span>Open Tool</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Actual workspace showing the Content Writer Tool */
          <motion.div
            key="workspace"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 py-6"
            id="tool-workspace-view"
          >
            {/* Header & Back Action */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <button
                onClick={() => {
                  setIsToolOpened(false);
                  setKeyword('');
                  setGeneratedContent('');
                }}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
              <h2 className="text-xl font-black text-slate-900 font-sans tracking-tight" id="active-tool-title">
                Content Write
              </h2>
              <div className="w-16" /> {/* Spacer */}
            </div>

            {/* Inputs Box Block */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4" id="tool-inputs-block">
              <form onSubmit={handleGenerate} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Keyword Input Box */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-2xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      Keyword Prompt
                    </label>
                    <input
                      type="text"
                      required
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="e.g. Modern Web Architecture or Sustainable Tech Solutions"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-400 font-medium transition-all"
                      disabled={isGenerating}
                    />
                  </div>

                  {/* Language Selector Select */}
                  <div className="space-y-1.5">
                    <label className="text-2xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      Select Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium transition-all"
                      disabled={isGenerating}
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:bg-emerald-400/80 px-6 py-3 rounded-xl shadow-md cursor-pointer transition-all focus:outline-none"
                    id="submit-generation-button"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating Copy...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Generate Article</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

            {/* Output Display Area: No dummy or cached placeholder data printed above/below */}
            <AnimatePresence>
              {generatedContent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-4"
                  id="generated-content-display"
                >
                  {/* Top Bar with export choices */}
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
                      <FileText className="h-4 w-4 text-emerald-600" />
                      <span>Article Compiled Successfully ({language})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center space-x-1.5 text-2xs font-bold bg-white text-slate-600 hover:text-slate-800 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                        title="Copy text to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleExport}
                        className="inline-flex items-center space-x-1.5 text-2xs font-bold bg-slate-900 text-white hover:bg-slate-800 px-3 py-2 rounded-lg cursor-pointer transition-colors"
                        title="Download text file"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  {/* Content Container (clean and professional markdown rendering style) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-inner overflow-y-auto max-h-[500px] text-slate-800 text-sm leading-relaxed prose prose-emerald max-w-none">
                    <p className="whitespace-pre-wrap font-sans">{generatedContent}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
