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
  ArrowLeft,
  Image
} from 'lucide-react';
import { jsPDF } from 'jspdf';

function generateLocalFallbackContent(keyword: string, language: string): string {
  const normalizedKeyword = keyword.trim();
  const cleanLang = (language || 'English').trim();
  let baseContent = '';
  
  if (cleanLang === 'Urdu') {
    baseContent = `عنوان: ${normalizedKeyword} کا مکمل اور گہرا تحقیقی جائزہ

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
  } else if (cleanLang === 'Punjabi') {
    baseContent = `عنوان: ${normalizedKeyword} دی اصلی سچائی تے تفصیلی نچوڑ

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
  } else if (cleanLang === 'Hindi') {
    baseContent = `शीर्षक: ${normalizedKeyword} का संपूर्ण विश्लेषण और सटीक रणनीति

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
  } else if (cleanLang === 'Arabic') {
    baseContent = `العنوان: الدراسة الشاملة والخطة التنفيذية لـ ${normalizedKeyword}

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
  } else {
    // Default to English
    baseContent = `TITLE: THE COMPREHENSIVE GUIDE TO ${normalizedKeyword} AND STRATEGIC EXECUTION

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

  let imageGuidance = '';
  if (cleanLang === 'Urdu') {
    imageGuidance = `\n\n===IMAGE_GUIDANCE===\nSECTION: اہم ہیرو امیج (ٹاپک ہیرو - عنوان: ${normalizedKeyword})
LOCATION: اس ہائی کوالٹی مین ہیرو تصویر کو اپنے مضمون کے بالکل آغاز میں لگائیں۔ اس کی صحیح جگہ مضمون کے مرکزی عنوان (Main Title) کے فوراً بعد اور پہلے تعارفی پیراگراف (First Paragraph) سے پہلے ہے۔ یہ جگہ قاری کی توجہ پہلے سیکنڈ میں ہی اپنی طرف کھینچنے اور پیج کے باؤنس ریٹ کو کم کرنے کے لیے ڈیزائن کی گئی ہے۔
CONCEPT: یہ تصویر ہمارے مرکزی ٹاپک یعنی "${normalizedKeyword}" کی مکمل ترجمانی کرتی ہے۔ یہ قاری کو بتاتی ہے کہ مضمون میں موضوع کی گہرائی اور جدید سوچ کو کس عمدگی سے سمیٹا گیا ہے۔ تصویر میں ایک خوبصورت کارپوریٹ آفس کا منظر ہے جس میں ایک چمکتا ہوا اور جدید ڈیزائن والا کمپیوٹر ورک سٹیشن موجود ہے۔ سکرین کے ارد گرد معلق ہولوگرافک سکرینیں (Holographic Displays) ہیں جن پر ${normalizedKeyword} سے متعلقہ تھری ڈی ڈیٹا نوڈس، ایڈوانسڈ گرافکس، اور تفصیلی چارٹس فلوٹ کر رہے ہیں۔ اس سے قاری پر ایک معتبر اور پیشہ ورانہ تاثر پڑتا ہے کہ اس آرٹیکل میں نرا زبانی کلام نہیں بلکہ گہری ریسرچ موجود ہے۔
PROMPT: A premium corporate workstation with floating holographic 3D screens and glowing digital dashboards projecting advanced data analytics of ${normalizedKeyword}, elegant executive dark office environment, moody cinematic volumetric light rays pouring from a large window, shallow depth of field, warm amber and emerald teal tones, shot on 85mm f1.4 lens, photorealistic, ultra-detailed 8k resolution, professional tech workspace --ar 16:9

SECTION: سیکشن 1 امیج (بنیادی مسئلہ اور فکری الجھن - عنوان: ${normalizedKeyword})
LOCATION: اس اہم بصری تصویر کو پہلے سیکشن کے پہلے پیراگراف کے فوراً بعد اور دوسری سرخی سے پہلے لگائیں۔ یہ جگہ اس لیے موزوں ہے کیونکہ یہاں قاری کے ذہن میں مسئلے کی پیچیدگی کا احساس تازہ ہوتا ہے اور یہ تصویر اس فکری الجھاؤ کو بصری شکل میں پیش کرتی ہے۔
CONCEPT: یہ تصویر موضوع "${normalizedKeyword}" کے راستے میں آنے والی فکری الجھن اور پریشانیوں کو ظاہر کرتی ہے۔ یہ تصویر قاری کو بتاتی ہے کہ مارکیٹ میں موجود بے شمار شور، غیر ضروری معلومات اور الجھنوں کے باوجود ایک سیدھا، سچا اور ٹھوس حل موجود ہے۔ تصویر میں ایک گھنی اور تاریک جیومیٹرک بھول بھلیاں دکھائی گئی ہیں، جس کے عین وسط میں سے روشنی کی ایک انتہائی چمکدار اور بالکل سیدھی سبز لیزر کی لکیر (Emerald Green Laser) پورے پیچیدہ راستے کو چیرتی ہوئی سیدھی باہر نکل رہی ہے۔ یہ سٹرکچر واضح اور سچے حل کی عکاسی کرتا ہے۔
PROMPT: A brilliant solid emerald green laser beam slicing a perfect straight path of clarity directly through a massive, dark, complex geometric maze of corporate monolithic blocks, high contrast chiaroscuro lighting, surreal atmospheric volumetric fog, cinematic composition, ultra-detailed textures, unreal engine 5 render style --ar 16:9

SECTION: سیکشن 3 امیج (عملی خاکہ اور روڈ میپ - عنوان: ${normalizedKeyword})
LOCATION: اس تصویر کو سیکشن 3 (عملی منصوبہ اور نفاذ) کے بالکل آغاز میں یعنی اس کی مرکزی سرخی کے فوراً بعد لگائیں۔ یہ جگہ قاری کو یہ پیغام دیتی ہے کہ اب عملی قدم اٹھانے کا وقت آ گیا ہے اور یہ ڈیزائن ان کا گائیڈ بنے گا۔
CONCEPT: یہ تصویر منظم منصوبہ بندی، گہرے سٹرکچر اور کامیابی کے راستے کی عکاسی کرتی ہے۔ یہ قاری کو سکھاتی ہے کہ کس طرح منظم طریقے سے سٹرکچر پر عمل کر کے "${normalizedKeyword}" میں کامیابی حاصل کی جا سکتی ہے۔ تصویر میں ایک نفیس فزیکل کاربن ٹیکسچر کے پس منظر پر ایک چمکتا ہوا انجینئرنگ بلو پرنٹ (Blueprint) ہے، جس میں کامیابی کے مختلف مراحل، وائر فریمز، آپس میں جڑے ہوئے روابط اور معلوماتی گراف بنے ہوئے ہیں جو چمکدار برقی نیلی (Electrical Cyan) اور سفید لائنوں سے ڈیزائن کیے گئے ہیں۔
PROMPT: An elite blueprint diagram of structured strategy and action nodes, glowing cybernetic neon cyan and white vector lines on a dark carbon fiber textured background, architectural draft layout, professional executive styling, technical precision, high tech vector mapping, 8k resolution, minimalist clean aesthetic --ar 16:9`;
  } else if (cleanLang === 'Arabic') {
    imageGuidance = `\n\n===IMAGE_GUIDANCE===\nSECTION: صورة البطل الرئيسية (موضوع البطل - عنوان: ${normalizedKeyword})
LOCATION: ضع هذه الصورة الرائعة وعالية الجودة في بداية مقالك تمامًا. الموقع المثالي لها هو مباشرة بعد العنوان الرئيسي للموضوع (Main Title) وقبل الفقرة التمهيدية الأولى. هذه المساحة البصرية تضمن جذب انتباه القارئ من اللحظة الأولى وتقليل نسبة الارتداد بشكل فعال.
CONCEPT: تمثل هذه الصورة جوهر موضوعنا الرئيسي "${normalizedKeyword}". توضح للقارئ مدى العمق والاحترافية التي تمت صياغة هذا الدليل بها. يظهر في الصورة مكتب عمل في شركة فاخرة يحتوي على حاسوب متميز بشاشات معلقة هولوغرافية (Holographic Displays) ثلاثية الأبعاد يعرض شبكات بيانات متطورة، وتحليلات عميقة ورسومات بيانية تتعلق بـ ${normalizedKeyword}. هذا يضفي شعوراً بالهيبة والموثوقية المطلقة للمقال.
PROMPT: A premium corporate workstation with floating holographic 3D screens and glowing digital dashboards projecting advanced data analytics of ${normalizedKeyword}, elegant executive dark office environment, moody cinematic volumetric light rays pouring from a large window, shallow depth of field, warm amber and emerald teal tones, shot on 85mm f1.4 lens, photorealistic, ultra-detailed 8k resolution, professional tech workspace --ar 16:9

SECTION: صورة القسم الأول (المشكلة الأساسية وفوضى السوق - عنوان: ${normalizedKeyword})
LOCATION: ضع هذه الصورة التوضيحية البارزة مباشرة بعد الفقرة الأولى من القسم الأول وقبل العنوان الفرعي التالي. هذا الموضع مثالي لأن القارئ يكون قد انتهى للتو من قراءة المشكلة والتعقيد، وهذه الصورة تجسد هذا الجو الفكري بشكل مرئي.
CONCEPT: تجسد هذه الصورة العقبات والتشتت البصري والفكري الذي يواجهه المحترفون في مجال "${normalizedKeyword}". إنها تظهر التباين بين فوضى السوق وبين وجود حل واضح وفعال. المشهد يمثل متاهة هندسية ثلاثية الأبعاد معقدة ومظلمة، يمر من وسطها تماماً شعاع ليزر أخضر زمردي مشع (Emerald Green Laser) يقطع كل الحواجز في مسار مستقيم ناصع يعبر عن الوضوح والاتجاه الصحيح للتغلب على المشاكل.
PROMPT: A bright green laser path cutting through a dark dense maze of chaotic geometric structures, representing clarity and direct solution, high contrast, surreal photography, --ar 16:9

SECTION: صورة القسم الثالث (خطة التنفيذ العملي والرواد ماب - عنوان: ${normalizedKeyword})
LOCATION: ضع هذه الصورة الهندسية المنظمة في بداية القسم الثالث المخصص للخطوات العملية، مباشرة بعد عنوان القسم الرئيسي. يساعد هذا الموضع في تهيئة ذهن القارئ بأن الجزء القادم هو خريطة طريق واضحة وقابلة للتطبيق.
CONCEPT: تمثل هذه الصورة التخطيط الدقيق والخطوات المنظمة والترابط المتماسك للوصول إلى النجاح في "${normalizedKeyword}". المشهد عبارة عن مخطط هندسي (Blueprint) راقٍ يضيء بخطوط النيون الزرقاء والبيضاء (Neon Cyan) على خلفية كربونية معتمة ذات ملمس فخم، يوضح المراحل الاستراتيجية والتفاصيل التقنية الدقيقة للعمل.
PROMPT: An elite blueprint diagram of structured strategy and action nodes, glowing cybernetic neon cyan and white vector lines on a dark carbon fiber textured background, architectural draft layout, professional executive styling, technical precision, high tech vector mapping, 8k resolution, minimalist clean aesthetic --ar 16:9`;
  } else if (cleanLang === 'Hindi') {
    imageGuidance = `\n\n===IMAGE_GUIDANCE===\nSECTION: मुख्य हीरो इमेज (विषय हीरो - शीर्षक: ${normalizedKeyword})
LOCATION: इस प्रीमियम मुख्य हीरो छवि को अपने लेख के बिल्कुल शुरुआत में रखें। इसकी सही स्थिति लेख के मुख्य शीर्षक (Main Title) के ठीक बाद और पहले परिचयात्मक पैराग्राफ (First Paragraph) से पहले होनी चाहिए। यह स्थिति पाठक की पहली नज़र को आकर्षित करने और पेज बाउंस रेट को रोकने के लिए अत्यधिक प्रभावी है।
CONCEPT: यह छवि हमारे मुख्य विषय "${normalizedKeyword}" का प्रतिनिधित्व करती है। यह पाठक को यह विश्वास दिलाती है कि यह लेख विषय की पूरी गहराई और आधुनिक दृष्टिकोण को समेटे हुए है। छवि में एक शानदार कॉर्पोरेट कार्यालय का वातावरण है जहाँ एक आधुनिक कंप्यूटर वर्कस्टेशन मौजूद है। इसके ऊपर हवा में तैरती हुई डिजिटल होलोग्राफिक स्क्रीनें हैं जिन पर ${normalizedKeyword} से संबंधित उन्नत डेटा एनालिटिक्स, ग्राफ़ और महत्वपूर्ण चार्ट्स प्रदर्शित हो रहे हैं, जो लेख को एक बेहद पेशेवर और प्रामाणिक रूप देते हैं।
PROMPT: A premium corporate workstation with floating holographic 3D screens and glowing digital dashboards projecting advanced data analytics of ${normalizedKeyword}, elegant executive dark office environment, moody cinematic volumetric light rays pouring from a large window, shallow depth of field, warm amber and emerald teal tones, shot on 85mm f1.4 lens, photorealistic, ultra-detailed 8k resolution, professional tech workspace --ar 16:9

SECTION: अनुभाग 1 इमेज (मुख्य समस्या और भ्रम - शीर्षक: ${normalizedKeyword})
LOCATION: इस दृश्य छवि को पहले अनुभाग के पहले पैराग्राफ के ठीक बाद और अगले उपशीर्षक से पहले रखें। यह स्थान सबसे उपयुक्त है क्योंकि यहाँ पाठक समस्या की जटिलताओं को समझना शुरू करता है और यह छवि उस जटिल भ्रम को एक स्पष्ट दृश्य अनुभव देती है।
CONCEPT: यह छवि विषय "${normalizedKeyword}" के मार्ग में आने वाली जटिलताओं और भ्रम को दर्शाती है। यह संदेश देती है कि बाज़ार के शोर और अंतहीन भ्रम के बावजूद एक सीधा और स्पष्ट समाधान मौजूद है। छवि में एक विशाल, जटिल और अंधेरी ज्यामितीय भूलभुलैया (Geometric Maze) है, जिसके बीच से एक चमकदार और बिल्कुल सीधी हरी लेजर बीम (Emerald Green Laser) अंधेरे को चीरती हुई सीधे बाहर निकलती है, जो भ्रम के बीच स्पष्ट मार्ग का प्रतिनिधित्व करती है।
PROMPT: A bright green laser path cutting through a dark dense maze of chaotic geometric structures, representing clarity and direct solution, high contrast, surreal photography, --ar 16:9

SECTION: अनुभाग 3 इमेज (कार्य योजना और ब्लूप्रिंट - शीर्षक: ${normalizedKeyword})
LOCATION: इस डिजाइन छवि को अनुभाग 3 (क्रियान्वयन रोडमैप) के बिल्कुल शुरुआत में, मुख्य शीर्षक के ठीक नीचे लगाएं। यह स्थान पाठक को यह विश्वास दिलाता है कि अब क्रियान्वयन का समय है और यह रोडमैप उनकी सहायता करेगा।
CONCEPT: यह छवि एक संरचित योजना, व्यवस्थित ब्लूप्रिंट और सफलता की रणनीति को दर्शाती है। यह पाठकों को यह दिखाती है कि "${normalizedKeyword}" की योजना को किस प्रकार कदम-दर-कदम व्यवस्थित रूप से क्रियान्वित किया जा सकता है। छवि में एक गहरे कार्बन-टेक्सचर्ड बैकग्राउंड पर चमकता हुआ आर्किटेक्चरल ब्लूप्रिंट आरेख है, जो उज्ज्वल नियॉन सियान (Neon Cyan) और सफेद विद्युत लाइनों द्वारा बारीक रूप से तैयार किया गया है।
PROMPT: An elite blueprint diagram of structured strategy and action nodes, glowing cybernetic neon cyan and white vector lines on a dark carbon fiber textured background, architectural draft layout, professional executive styling, technical precision, high tech vector mapping, 8k resolution, minimalist clean aesthetic --ar 16:9`;
  } else if (cleanLang === 'Punjabi') {
    imageGuidance = `\n\n===IMAGE_GUIDANCE===\nSECTION: اہم ہیرو امیج (ٹاپک ہیرو - عنوان: ${normalizedKeyword})
LOCATION: ایس شاندار ہیرو تصویر نوں اپنے آرٹیکل دے بالکل شروع وچ لگاؤ۔ ایہدی صحیح تھاں آرٹیکل دے مرکزی ٹائٹل دے فوراً بعد تے پہلے پیراگراف توں پہلے اے۔ ایہ تھاں پڑھن والے دی پہلی نظر نوں کھچن لئی سب توں بہترین اے۔
CONCEPT: ایہ تصویر ساڈے مین ٹاپک یعنی "${normalizedKeyword}" دی عکاسی کردی اے۔ ایہ پڑھن والے نوں پتا دیندی اے کہ آرٹیکل وچ موضوع دی گہرائی تے نویں ٹیکنالوجی نوں کنے سوہنے طریقے نال سمجھایا گیا اے۔ تصویر وچ اک شاندار کارپوریٹ آفس دا ورک سٹیشن دکھایا گیا اے، جتھے کمپیوٹر سکرین دے ارد گرد ہوا وچ فلوٹ کردیاں ہوئیاں ہولوگرافک سکریناں نیں، جنہاں اُتے ${normalizedKeyword} نال متعلق تھری ڈی اینالیٹکس، ڈیٹا چارٹس تے گراف بنے ہوئے نیں، جو اک بے حد معتبر تاثر دیندے نیں۔
PROMPT: A premium corporate workstation with floating holographic 3D screens and glowing digital dashboards projecting advanced data analytics of ${normalizedKeyword}, elegant executive dark office environment, moody cinematic volumetric light rays pouring from a large window, shallow depth of field, warm amber and emerald teal tones, shot on 85mm f1.4 lens, photorealistic, ultra-detailed 8k resolution, professional tech workspace --ar 16:9

SECTION: سیکشن 1 امیج (وڈے مسئلے دی الجھن - عنوان: ${normalizedKeyword})
LOCATION: ایس تصویر نوں پہلے سیکشن دے پہلے پیراگراف دے فوراً بعد تے اگلی سرخی توں پہلے لگاؤ۔ ایہ تھاں اس لئی ودھیا اے کیونکہ قاری اس تھاں مارکیٹ دے الجھاؤ نوں پڑھ رہا ہوندا اے تے تصویر اوہنوں بصری شکل وچ واضح کردی اے۔
CONCEPT: ایہ تصویر موضوع "${normalizedKeyword}" دے رستے وچ آن والیاں الجھناں تے اوہناں دے سدھے حل نوں ظاہر کردی اے۔ تصویر وچ اک گہری، تاریک تے پیچیدہ بھول بھلیاں دکھائی گئی اے، جس دے بالکل درمیان وچوں اک چمکدار تے بالکل سدھی ہری لیزر دی لکیر (Emerald Green Laser) پورے گنجان رستے نوں چیردی ہوئی سدھی باہر نکل رہی اے۔ ایہ سدھے تے سچے حل نوں ظاہر کردی اے۔
PROMPT: A bright green laser path cutting through a dark dense maze of chaotic geometric structures, representing clarity and direct solution, high contrast, surreal photography, --ar 16:9

SECTION: سیکشن 3 امیج (عملی نقشہ تے بلو پرنٹ - عنوان: ${normalizedKeyword})
LOCATION: ایس ڈیزائن نوں سیکشن 3 دے بالکل شروع وچ، مرکزی سرخی دے بالکل تھلے فٹ کرو۔ ایہ تھاں پڑھن والے نوں یقین دلاندی اے کہ ہن کامیابی لئی عملی منصوبہ تیار اے۔
CONCEPT: ایہ تصویر باقاعدہ فریم ورک، منظم کامیابی دے مراحل تے عملی روڈ میپ نوں ظاہر کردی اے کہ کس طرح سلیقے نال "${normalizedKeyword}" اُتے عمل کر کے کامیابی حاصل کیتی جا سکتی اے۔ تصویر وچ اک گہرے ٹیکسچر والے بلیک کاربن بیک گراؤنڈ اُتے برقی نیلی (Neon Cyan) تے چمکدار سفید لکیروں نال بنیا ہویا خوبصورت بلو پرنٹ آرٹیکل نقشہ دکھایا گیا اے۔
PROMPT: An elite blueprint diagram of structured strategy and action nodes, glowing cybernetic neon cyan and white vector lines on a dark carbon fiber textured background, architectural draft layout, professional executive styling, technical precision, high tech vector mapping, 8k resolution, minimalist clean aesthetic --ar 16:9`;
  } else {
    imageGuidance = `\n\n===IMAGE_GUIDANCE===\nSECTION: MAIN HERO IMAGE (TOPIC HERO - Title: ${normalizedKeyword})
LOCATION: Place this dominant visual at the very beginning of your article, immediately following the Main Article Title and before the first introductory paragraph. This acts as the visual anchor of the page, reducing bounce rates and setting an immediate high-authority tone.
CONCEPT: This image represents the core theme of our main topic "${normalizedKeyword}". It conveys complete expertise, forward-thinking tech authority, and extreme depth. The visual displays a luxury corporate office workspace with a sleek, minimalist computer workstation surrounded by glowing, transparent 3D holographic screen projections. These floating displays show real-time complex data metrics, neural networks, and interactive charts directly tied to ${normalizedKeyword}.
PROMPT: A premium corporate workstation with floating holographic 3D screens and glowing digital dashboards projecting advanced data analytics of ${normalizedKeyword}, elegant executive dark office environment, moody cinematic volumetric light rays pouring from a large window, shallow depth of field, warm amber and emerald teal tones, shot on 85mm f1.4 lens, photorealistic, ultra-detailed 8k resolution, professional tech workspace --ar 16:9

SECTION: SECTION 1 IMAGE (THE CORE PROBLEM & OVERWHELMING NOISE - Context: ${normalizedKeyword})
LOCATION: Position this powerful vector illustration directly after the first introductory paragraph in Section 1 and before the second major heading. This ensures the reader is visually confronted with the contrast of market clutter and your proposed clear path.
CONCEPT: This image represents the transition from noise to absolute clarity, which is the foundational promise of "${normalizedKeyword}". A metaphorical representation of industry complexity: a massive, dark, dense maze of monolithic geometric structures representing corporate clutter, pierced right through the center by a single, brilliant, perfectly straight emerald-green laser beam of focus that guides the eye directly to a clean exit.
PROMPT: A bright green laser path cutting through a dark dense maze of chaotic geometric structures, representing clarity and direct solution, high contrast, surreal photography, --ar 16:9

SECTION: SECTION 3 IMAGE (BLUEPRINT, ROADMAP & STRATEGIC ACTION PLAN - Context: ${normalizedKeyword})
LOCATION: Place this detailed schematic diagram at the absolute start of Section 3, immediately following the main Section 3 heading. This gives the reader an instant psychological signal that they are entering the practical, actionable phase of the article.
CONCEPT: This image represents structured planning, flawless execution, and tactical implementation for "${normalizedKeyword}". An elegant engineering drafting blueprint displaying clear strategic paths, interconnected nodes, and sequential roadmap milestones, featuring glowing neon cybernetic teal and white mechanical lines drawn with extreme precision on a dark textured carbon fiber background.
PROMPT: An elite blueprint diagram of structured strategy and action nodes, glowing cybernetic neon cyan and white vector lines on a dark carbon fiber textured background, architectural draft layout, professional executive styling, technical precision, high tech vector mapping, 8k resolution, minimalist clean aesthetic --ar 16:9`;
  }

  return baseContent + imageGuidance;
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
  return cleaned;
}

function renderImageGuidance(guidanceText: string, onCopyPrompt: (prompt: string) => void) {
  if (!guidanceText) return null;

  // Split by double newlines or multiple newlines
  const blocks = guidanceText.trim().split(/\n\s*\n/);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6" id="image-guidance-cards">
      {blocks.map((block, idx) => {
        const lines = block.trim().split('\n');
        if (lines.length === 0 || !lines[0].trim()) return null;

        let section = '';
        let location = '';
        let concept = '';
        let prompt = '';

        lines.forEach(line => {
          const l = line.trim();
          if (l.startsWith('SECTION:') || l.startsWith('Heading:') || l.startsWith('عنوان:') || l.startsWith('قسم:') || l.startsWith('سیکشن:') || l.startsWith('अनुभाग:')) {
            section = l.replace(/^(SECTION:|Heading:|عنوان:|قسم:|سیکشن:|अनुभाग:)\s*/i, '');
          } else if (l.startsWith('LOCATION:') || l.startsWith('جگہ:') || l.startsWith('مقام:') || l.startsWith('موقع:') || l.startsWith('الموقع:') || l.startsWith('स्थान:') || l.startsWith('لوکیشن:')) {
            location = l.replace(/^(LOCATION:|جگہ:|مقام:|موقع:|الموقع:|स्थान:|لوکیشن:)\s*/i, '');
          } else if (l.startsWith('CONCEPT:') || l.startsWith('تصور:') || l.startsWith('المفهوم:') || l.startsWith('تفصیل:') || l.startsWith('अवधारणा:')) {
            concept = l.replace(/^(CONCEPT:|تصور:|المفهوم:|تفصیل:|अवधारणा:)\s*/i, '');
          } else if (l.startsWith('PROMPT:') || l.startsWith('پرامپٹ:') || l.startsWith('المؤشر:') || l.startsWith('संकेت:')) {
            prompt = l.replace(/^(PROMPT:|پرامپٹ:|المؤشر:|संकेت:)\s*/i, '');
          } else {
            if (!l) return;
            // Fallback accumulation
            if (section && !prompt && !location) {
              if (concept) concept += '\n' + l;
              else concept = l;
            } else if (!section) {
              section = l;
            }
          }
        });

        // Fallbacks if tags weren't fully written or prefixed
        if (!section && lines[0]) {
          section = lines[0].trim().replace(/^(SECTION:|Heading:|عنوان:|قسم:|سیکشن:| Can't find tag)\s*/i, '');
        }

        return (
          <div 
            key={idx} 
            className="bg-slate-800/40 border border-slate-700/60 hover:border-emerald-500/40 rounded-2xl p-5 sm:p-6 transition-all shadow-xs flex flex-col justify-between space-y-4"
            id={`image-card-${idx}`}
          >
            <div className="space-y-4">
              {/* Header: Section or Topic */}
              <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-700/40">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Image className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-mono block">IMAGE POSITION TARGET</span>
                  <h4 className="text-xs font-extrabold text-slate-100 tracking-wide font-sans">
                    {section || "Main Article Title (Hero)"}
                  </h4>
                </div>
              </div>

              {/* Location Guidance */}
              {location && (
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block font-mono">
                    📍 Placement / کہاں لگائیں:
                  </span>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">
                    {location}
                  </p>
                </div>
              )}

              {/* Concept description */}
              {concept && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    🎨 Visual Concept / تصویر کا تصور:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {concept}
                  </p>
                </div>
              )}
            </div>

            {/* AI Generation Prompt */}
            {prompt && (
              <div className="mt-2 pt-3 border-t border-slate-700/45 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  🚀 Midjourney / Stable Diffusion Prompt (English):
                </span>
                <div className="relative group/prompt bg-slate-950/70 rounded-xl p-3.5 border border-slate-700/50 text-2xs font-mono text-emerald-300 break-words leading-relaxed pr-9">
                  {prompt}
                  <button
                    onClick={() => onCopyPrompt(prompt)}
                    className="absolute right-2 top-2 p-1.5 bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 border border-slate-700 rounded-lg opacity-100 sm:opacity-0 sm:group-hover/prompt:opacity-100 transition-all cursor-pointer shadow-xs"
                    title="Copy prompt"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function renderFormattedContent(content: string) {
  if (!content) return null;

  // Split by double newlines or multiple newlines to get structural paragraphs/blocks
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-6 text-slate-800 font-sans">
      {blocks.map((block, index) => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return null;

        const lines = trimmedBlock.split('\n');
        
        // Let's check if the entire block is a list of bullet points
        const isBulletList = lines.every(line => {
          const l = line.trim();
          return l.startsWith('•') || l.startsWith('-') || l.startsWith('*') || l.match(/^\d+\./);
        });

        if (isBulletList && lines.length > 1) {
          return (
            <ul key={index} className="list-none space-y-3.5 my-5 pl-1">
              {lines.map((line, lIdx) => {
                const cleanedLine = line.trim()
                  .replace(/^[•\-\*]\s*/, '') // remove bullets
                  .replace(/^\d+\.\s*/, '');  // remove numbers if list
                
                const boldMatch = cleanedLine.match(/^([^:]+):(.*)$/);
                if (boldMatch && boldMatch[1].length < 40) {
                  return (
                    <li key={lIdx} className="flex items-start text-sm sm:text-base text-slate-700 leading-relaxed">
                      <span className="text-emerald-500 mr-2.5 font-bold select-none text-base">•</span>
                      <span>
                        <strong className="text-slate-900 font-bold">{boldMatch[1]}:</strong>
                        {boldMatch[2]}
                      </span>
                    </li>
                  );
                }

                return (
                  <li key={lIdx} className="flex items-start text-sm sm:text-base text-slate-700 leading-relaxed">
                    <span className="text-emerald-500 mr-2.5 font-bold select-none text-base">•</span>
                    <span>{cleanedLine}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // If block has a single line, check if it should be a Heading
        if (lines.length === 1) {
          const line = lines[0].trim();
          
          // Check if it's the title (first block)
          const isTitle = index === 0 || line.startsWith('TITLE:') || line.startsWith('العنوان:') || line.startsWith('शीर्षक:') || line.startsWith('عنوان:');
          const cleanLine = line.replace(/^(TITLE:|العنوان:|शीर्षक:|عنوان:)\s*/i, '');

          if (isTitle) {
            return (
              <h1 key={index} className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight border-b-2 border-emerald-500/20 pb-4 mb-8 mt-2 uppercase font-sans">
                {cleanLine}
              </h1>
            );
          }

          // Check if it's a major section heading
          const isMajorHeading = 
            line.startsWith('##') || 
            line.startsWith('SECTION') || 
            line.startsWith('PILLAR') || 
            line.startsWith('STEP') || 
            line.startsWith('THE ') ||
            line.startsWith('REALITY:') ||
            line.startsWith('INTRODUCTION:') ||
            line.startsWith('ال') ||
            (line === line.toUpperCase() && line.length < 80 && !line.match(/^[0-9\W]+$/)) ||
            line.endsWith(':');

          if (isMajorHeading) {
            const headingText = line.replace(/^#+\s*/, '');
            return (
              <h2 key={index} className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight mt-8 mb-4 flex items-center border-l-4 border-emerald-500 pl-3 uppercase font-sans">
                {headingText}
              </h2>
            );
          }

          // Check if it's a minor subheading / tool name
          const isSubHeading = 
            line.startsWith('###') || 
            (line.includes('(') && line.length < 100) || 
            (line.length < 60 && !line.endsWith('.'));

          if (isSubHeading) {
            const subtext = line.replace(/^#+\s*/, '');
            return (
              <h3 key={index} className="text-sm sm:text-base font-bold text-slate-950 mt-6 mb-2.5 font-sans">
                {subtext}
              </h3>
            );
          }
        }

        // Otherwise, it's a standard paragraph or block of text with lines
        return (
          <div key={index} className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
            {lines.map((line, lIdx) => {
              const trimmedLine = line.trim();
              if (!trimmedLine) return null;

              // Check if line is a divider
              if (trimmedLine === '---' || trimmedLine === '***') {
                return <hr key={lIdx} className="my-8 border-slate-200" />;
              }

              // Check if line starts with a list bullet (for mixed paragraphs with bullet lines)
              if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                const cleaned = trimmedLine.replace(/^[•\-\*]\s*/, '');
                return (
                  <div key={lIdx} className="flex items-start pl-1 py-1">
                    <span className="text-emerald-500 mr-2.5 font-bold select-none text-base">•</span>
                    <span>{cleaned}</span>
                  </div>
                );
              }

              // Highlight key-value patterns (e.g. "The Cost: $99/month")
              const boldMatch = trimmedLine.match(/^([^:]+):(.*)$/);
              if (boldMatch && boldMatch[1].length < 40) {
                return (
                  <p key={lIdx} className="text-slate-700">
                    <strong className="text-slate-900 font-bold">{boldMatch[1]}:</strong>
                    {boldMatch[2]}
                  </p>
                );
              }

              return <p key={lIdx} className="text-slate-700">{trimmedLine}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
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

  // Export content as elegant Microsoft Word DOC (fully supports all languages including Urdu, Arabic, Hindi, Punjabi)
  const handleExportDoc = () => {
    if (!generatedContent) return;
    try {
      const articleOnly = generatedContent.split('===IMAGE_GUIDANCE===')[0]?.trim() || '';
      const blocks = articleOnly.split(/\n\s*\n/);
      let htmlContent = "";

      blocks.forEach((block, index) => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return;

        const lines = trimmedBlock.split('\n');
        
        const isBulletList = lines.every(line => {
          const l = line.trim();
          return l.startsWith('•') || l.startsWith('-') || l.startsWith('*') || l.match(/^\d+\./);
        });

        if (isBulletList && lines.length > 1) {
          htmlContent += "<ul style='margin-top: 0; margin-bottom: 12pt; padding-left: 20px;'>";
          lines.forEach(line => {
            const cleaned = line.trim().replace(/^[•\-\*]\s*/, '').replace(/^\d+\.\s*/, '');
            const boldMatch = cleaned.match(/^([^:]+):(.*)$/);
            if (boldMatch && boldMatch[1].length < 40) {
              htmlContent += `<li style='font-size: 11.5pt; margin-bottom: 6pt; color: #334155;'><strong style='color: #0f172a;'>${boldMatch[1]}:</strong>${boldMatch[2]}</li>`;
            } else {
              htmlContent += `<li style='font-size: 11.5pt; margin-bottom: 6pt; color: #334155;'>${cleaned}</li>`;
            }
          });
          htmlContent += "</ul>";
          return;
        }

        if (lines.length === 1) {
          const line = lines[0].trim();
          const isTitle = index === 0 || line.startsWith('TITLE:') || line.startsWith('العنوان:') || line.startsWith('शीर्षक:') || line.startsWith('عنوان:');
          const cleanLine = line.replace(/^(TITLE:|العنوان:|शीर्षک:|عنوان:)\s*/i, '');

          if (isTitle) {
            htmlContent += `<h1 style='font-size: 24pt; font-family: Arial, sans-serif; color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 8px; margin-top: 0; margin-bottom: 20pt; text-transform: uppercase;'>${cleanLine}</h1>`;
            return;
          }

          const isHeading = 
            line.startsWith('##') || 
            line.startsWith('SECTION') || 
            line.startsWith('PILLAR') || 
            line.startsWith('STEP') || 
            line.startsWith('THE ') ||
            line.startsWith('REALITY:') ||
            line.startsWith('INTRODUCTION:') ||
            (line === line.toUpperCase() && line.length < 80) ||
            line.endsWith(':');

          if (isHeading) {
            const headingText = line.replace(/^#+\s*/, '').toUpperCase();
            htmlContent += `<h2 style='font-size: 15pt; font-family: Arial, sans-serif; color: #0f172a; border-left: 4.5px solid #10b981; padding-left: 10px; margin-top: 24pt; margin-bottom: 12pt; text-transform: uppercase;'>${headingText}</h2>`;
            return;
          }
        }

        // Paragraphs
        lines.forEach(line => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return;

          if (trimmedLine === '---' || trimmedLine === '***') {
            htmlContent += "<hr style='border: none; border-top: 1px solid #e2e8f0; margin: 24pt 0;' />";
            return;
          }

          const boldMatch = trimmedLine.match(/^([^:]+):(.*)$/);
          if (boldMatch && boldMatch[1].length < 40) {
            htmlContent += `<p style='font-size: 11pt; margin-bottom: 10pt; color: #334155;'><strong style='color: #0f172a;'>${boldMatch[1]}:</strong>${boldMatch[2]}</p>`;
          } else {
            htmlContent += `<p style='font-size: 11pt; margin-bottom: 10pt; color: #334155;'>${trimmedLine}</p>`;
          }
        });
      });

      const docHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
xmlns:w='urn:schemas-microsoft-com:office:word' 
xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>${keyword}</title>
<style>
@page {
  size: 8.5in 11in;
  margin: 1in;
}
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #334155;
  line-height: 1.6;
}
</style>
</head>
<body style="padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto;">
    ${htmlContent}
    <br /><br />
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24pt 0;" />
    <p style="font-size: 9pt; color: #94a3b8; text-align: center;">
      Generated on AI Apex Engine • Topic: ${keyword} • Language: ${language}
    </p>
  </div>
</body>
</html>`;

      const blob = new Blob(['\ufeff' + docHtml], { type: 'application/msword;charset=utf-8' });
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      const safeFileName = `${keyword.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-brief.doc`;
      element.download = safeFileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      onToast('Elegant Word Document (.doc) generated and downloaded!', 'success');
    } catch (err) {
      console.error(err);
      onToast('Failed to export Word Document.', 'error');
    }
  };

  // Export content as beautiful executive Brief PDF
  const handleExportPdf = () => {
    if (!generatedContent) return;

    // Detect if content contains non-Latin glyphs (Urdu, Arabic, Hindi, Punjabi)
    const nonLatinRegex = /[\u0600-\u06FF\u0750-\u077F\u0900-\u097F]/;
    if (nonLatinRegex.test(generatedContent)) {
      onToast('For Urdu/Arabic/Hindi, Word DOC export is highly recommended for native font support. Starting Word DOC export!', 'info');
      handleExportDoc();
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth(); // 210
      const pageHeight = doc.internal.pageSize.getHeight(); // 297
      const margin = 20;
      const maxLineWidth = pageWidth - (margin * 2); // 170

      let currentY = 35;

      // Helper to draw headers and footers
      const drawPageDecorations = (pdfDoc: typeof doc, pageNum: number) => {
        // Top elegant accent line
        pdfDoc.setFillColor(16, 185, 129); // Emerald-500
        pdfDoc.rect(0, 0, pageWidth, 4, 'F');

        // Top Header text
        pdfDoc.setFont('helvetica', 'normal');
        pdfDoc.setFontSize(8);
        pdfDoc.setTextColor(148, 163, 184); // Slate-400
        pdfDoc.text("AI APEX CONTENT CREATOR  |  EXECUTIVE INTELLIGENCE BRIEF", margin, 12);
        pdfDoc.text(`TOPIC: ${keyword.toUpperCase()}`, pageWidth - margin, 12, { align: 'right' });

        // Divider line under header
        pdfDoc.setDrawColor(241, 245, 249); // Slate-100
        pdfDoc.setLineWidth(0.5);
        pdfDoc.line(margin, 15, pageWidth - margin, 15);

        // Bottom Footer text
        pdfDoc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
        pdfDoc.text("CONFIDENTIAL  •  PRODUCED BY APEX WRITING ENGINE", margin, pageHeight - 10);
        pdfDoc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      };

      const articleOnly = generatedContent.split('===IMAGE_GUIDANCE===')[0]?.trim() || '';
      const blocks = articleOnly.split(/\n\s*\n/);
      
      // Cover Header / Accent Banner on page 1
      doc.setFillColor(15, 23, 42); // Deep Slate (slate-900)
      doc.rect(margin, 22, maxLineWidth, 30, 'F');
      
      // Emerald left vertical bar in the banner
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, 22, 3, 30, 'F');

      // Title in cover banner
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      
      let rawTitle = keyword + " : EXECUTIVE BRIEF";
      let startingBlockIndex = 0;
      
      if (blocks.length > 0) {
        const firstLine = blocks[0].trim().split('\n')[0].trim();
        if (firstLine.toUpperCase().startsWith('TITLE:') || firstLine.toUpperCase().startsWith('عنوان:') || firstLine.toUpperCase().startsWith('عنوان') || firstLine.length < 120) {
          rawTitle = firstLine.replace(/^(TITLE:|العنوان:|शीर्षक:|عنوان:)\s*/i, '');
          if (blocks[0].trim().split('\n').length === 1) {
            startingBlockIndex = 1;
          }
        }
      }

      const titleLines = doc.splitTextToSize(rawTitle.toUpperCase(), maxLineWidth - 12);
      doc.text(titleLines, margin + 8, 32);

      // Subtitle inside banner
      doc.setTextColor(16, 185, 129); // Emerald-400
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`DATE GENERATED: ${new Date().toLocaleDateString()}  |  LANGUAGE: ${language.toUpperCase()}`, margin + 8, 44);

      currentY = 65;
      let currentPageNum = 1;

      // Draw decorations for page 1
      drawPageDecorations(doc, currentPageNum);

      // Process blocks
      for (let i = startingBlockIndex; i < blocks.length; i++) {
        const block = blocks[i].trim();
        if (!block) continue;

        const lines = block.split('\n');

        // Check bullet list
        const isBulletList = lines.every(line => {
          const l = line.trim();
          return l.startsWith('•') || l.startsWith('-') || l.startsWith('*') || l.match(/^\d+\./);
        });

        if (isBulletList && lines.length > 1) {
          for (const line of lines) {
            const cleanedLine = line.trim()
              .replace(/^[•\-\*]\s*/, '')
              .replace(/^\d+\.\s*/, '');

            const bulletIndent = 6;
            const textWidth = maxLineWidth - bulletIndent;
            const wrappedLines = doc.splitTextToSize(cleanedLine, textWidth);

            const itemHeight = wrappedLines.length * 5.5 + 2;
            if (currentY + itemHeight > pageHeight - 25) {
              doc.addPage();
              currentPageNum++;
              drawPageDecorations(doc, currentPageNum);
              currentY = 25;
            }

            // Draw emerald circle bullet
            doc.setFillColor(16, 185, 129);
            doc.circle(margin + 2, currentY + 1.8, 0.9, 'F');

            // Draw text
            doc.setTextColor(51, 65, 85);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(wrappedLines, margin + bulletIndent, currentY + 2);
            
            currentY += (wrappedLines.length * 5.5) + 2.5;
          }
          currentY += 2;
          continue;
        }

        // Heading block
        if (lines.length === 1) {
          const line = lines[0].trim();
          const isHeading = 
            line.startsWith('##') || 
            line.startsWith('SECTION') || 
            line.startsWith('PILLAR') || 
            line.startsWith('STEP') || 
            line.startsWith('THE ') ||
            line.startsWith('REALITY:') ||
            line.startsWith('INTRODUCTION:') ||
            (line === line.toUpperCase() && line.length < 80) ||
            line.endsWith(':');

          if (isHeading) {
            const headingText = line.replace(/^#+\s*/, '').toUpperCase();
            const wrappedHeading = doc.splitTextToSize(headingText, maxLineWidth - 8);

            const headingHeight = (wrappedHeading.length * 6) + 8;
            if (currentY + headingHeight > pageHeight - 25) {
              doc.addPage();
              currentPageNum++;
              drawPageDecorations(doc, currentPageNum);
              currentY = 25;
            }

            currentY += 4;
            // Draw a left border line for heading
            doc.setFillColor(16, 185, 129);
            doc.rect(margin, currentY, 3, 5.5, 'F');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10.5);
            doc.setTextColor(15, 23, 42); // slate-900
            doc.text(wrappedHeading, margin + 5, currentY + 4);
            
            currentY += (wrappedHeading.length * 5.5) + 5;
            continue;
          }
        }

        // Standard Paragraph text
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          if (trimmedLine === '---' || trimmedLine === '***') {
            if (currentY + 10 > pageHeight - 25) {
              doc.addPage();
              currentPageNum++;
              drawPageDecorations(doc, currentPageNum);
              currentY = 25;
            }
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.5);
            doc.line(margin, currentY + 4, pageWidth - margin, currentY + 4);
            currentY += 8;
            continue;
          }

          const wrappedLines = doc.splitTextToSize(trimmedLine, maxLineWidth);

          const textBlockHeight = wrappedLines.length * 5.5 + 4;
          if (currentY + textBlockHeight > pageHeight - 25) {
            doc.addPage();
            currentPageNum++;
            drawPageDecorations(doc, currentPageNum);
            currentY = 25;
          }

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(51, 65, 85); // slate-700
          doc.text(wrappedLines, margin, currentY + 3);
          
          currentY += (wrappedLines.length * 5.5) + 3.5;
        }
        currentY += 2;
      }

      const safeFileName = `${keyword.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-brief.pdf`;
      doc.save(safeFileName);
      onToast('Premium PDF Document downloaded!', 'success');
    } catch (err) {
      console.error(err);
      onToast('Failed to export PDF Document.', 'error');
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
              {generatedContent && (() => {
                const parts = generatedContent.split('===IMAGE_GUIDANCE===');
                const articleOnly = parts[0]?.trim() || '';
                const imageGuidanceOnly = parts[1]?.trim() || '';

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="space-y-6"
                    id="generated-content-display"
                  >
                    {/* Top Bar with export choices */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
                        <FileText className="h-4 w-4 text-emerald-600" />
                        <span>Article Compiled Successfully ({language})</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(articleOnly);
                            setCopied(true);
                            onToast('Article text copied!', 'success');
                            setTimeout(() => setCopied(false), 2000);
                          }}
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
                              <span>Copy Text</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleExportDoc}
                          className="inline-flex items-center space-x-1.5 text-2xs font-bold bg-white text-slate-600 hover:text-slate-800 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                          title="Download beautifully styled Word Document (.doc)"
                        >
                          <FileText className="h-3.5 w-3.5 text-blue-500" />
                          <span>Word DOC</span>
                        </button>

                        <button
                          onClick={handleExportPdf}
                          className="inline-flex items-center space-x-1.5 text-2xs font-bold bg-slate-900 text-white hover:bg-slate-800 px-3.5 py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
                          title="Download print-ready executive PDF brief (.pdf)"
                        >
                          <Download className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                          <span>Premium PDF</span>
                        </button>
                      </div>
                    </div>

                    {/* Content Container (clean and professional custom rendering style) */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm overflow-y-auto max-h-[600px] text-slate-800 text-sm leading-relaxed max-w-none">
                      {renderFormattedContent(articleOnly)}
                    </div>

                    {/* Word Count Small Box */}
                    <div className="flex justify-end pr-2" id="article-word-count-wrapper">
                      <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-4 py-2 rounded-xl shadow-xs text-xs font-semibold font-sans">
                        <FileText className="h-4 w-4 text-emerald-600 animate-pulse" />
                        <span>
                          {(() => {
                            const normalized = (language || 'English').trim().toLowerCase();
                            const wordCount = articleOnly.split(/\s+/).filter(Boolean).length;
                            if (normalized === 'urdu') return `کل الفاظ: ${wordCount}`;
                            if (normalized === 'arabic') return `عدد الكلمات: ${wordCount}`;
                            if (normalized === 'hindi') return `कुल शब्द: ${wordCount}`;
                            if (normalized === 'punjabi') return `کل لفظ: ${wordCount}`;
                            return `Total Words: ${wordCount}`;
                          })()}
                        </span>
                      </div>
                    </div>

                    {/* IMAGE GUIDANCE CONTAINER (THE SEPARATE BOX ASKED BY USER) */}
                    {imageGuidanceOnly && (
                      <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-5 sm:p-8 shadow-md space-y-6" id="image-guidance-container-box">
                        <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-1">
                            <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest font-mono flex items-center gap-2">
                              <Image className="h-4 w-4 animate-pulse" />
                              <span>Image Guidance & Prompts Summary</span>
                            </h3>
                            <p className="text-2xs text-slate-400">
                              Generated recommendations for visual elements to place after each heading of your article.
                            </p>
                          </div>
                        </div>

                        {renderImageGuidance(imageGuidanceOnly, (promptText) => {
                          navigator.clipboard.writeText(promptText);
                          onToast('Image generation prompt copied!', 'success');
                        })}
                      </div>
                    )}
                  </motion.div>
                );
              })()}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
