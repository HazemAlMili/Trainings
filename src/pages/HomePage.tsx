import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedConversationalArc, HeroFloatingElements, AudioWaveSimulator } from '../components/motion/SignatureElements';
import { FadeIn, StaggerContainer, StaggerItem, InteractiveHoverCard, PulseBeacon, FloatingBadge } from '../components/motion/MotionWrapper';
import { FamilyWalletDemo } from '../components/common/FamilyWalletDemo';
import { TestimonialsCarousel } from '../components/common/TestimonialsCarousel';
import { VideoModal } from '../components/common/VideoModal';
import { StagingAssetBadge, SectionWaveDivider, PolicyReviewTag } from '../components/common/BrandMotif';
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Play,
  ShieldCheck,
  Users,
  Clock,
  Award,
  Star,
  RefreshCw,
  HeartHandshake,
  HelpCircle,
  Volume2,
  Calendar,
  Layers,
} from 'lucide-react';

interface HomePageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenTrialModal }) => {
  // Flagship Age Selection for 9-14 Kids
  const [selectedAge, setSelectedAge] = useState<'9-10' | '11-12' | '13-14'>('11-12');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedTeacherIndex, setSelectedTeacherIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSimulatedAudioPlaying, setIsSimulatedAudioPlaying] = useState(false);

  // Age-targeted developmental hooks for Arab 48 parents
  const ageContent = {
    '9-10': {
      title: 'كسر الخجل وبناء حب التحدث',
      desc: 'تدريب هادئ ومرح يراعي خجل الطفل، يعتمد على ألعاب المحادثة والقصص، مع شرح بالعربي لطمأنته من أول دقيقة.',
      badge: 'التركيز: الأمان النفسي والتعود على النطق',
    },
    '11-12': {
      title: 'تقوية المفردات والطلاقة للمدرسة',
      desc: 'تمكين الطالب من تكوين جمل كاملة والمشاركة في الصف بثقة، وتجاوز التردد في المواقف اليومية والمدرسية.',
      badge: 'التركيز: المحادثة المدرسية والمواقف الحية',
    },
    '13-14': {
      title: 'محادثة واقعية واستعداد للإعدادية',
      desc: 'حوارات واقعية ونطق متقن يجهّزه للتعامل مع المجتمع، الشارع، والمواقف الرسمية دون خوف أو تلعثم.',
      badge: 'التركيز: الطلاقة العملية والشخصية المستقلة',
    },
  };

  // Editorial Featured Teachers Showcase
  const editorialTeachers = [
    {
      name: 'المعلمة نور',
      role: 'متخصصة محادثة أطفال (9–14 سنة)',
      quote: 'أهم إشي عندي بالحصة إنو الطفل ما يحس بإحراج لو غلط. لما يشعر بالأمان التام، ببلش يحكي بطلاقة وعفوية تامة.',
      tags: ['صبورة ومرحة', 'كسر حاجز الخجل', 'دعم كامل بالعربية'],
      experience: '7 سنوات تدريس أونلاين',
      accent: 'لهجة فلسطينية قريبة للأهالي',
      previewAudio: 'שלום! נעים מאוד להכיר אותך, מוכן שנתחיל?',
    },
    {
      name: 'المعلم رامي',
      role: 'مدرّب طلاقة ومواقف يومية',
      quote: 'اللغة ممارسة حية مش حفظ قواعد جاف. بخلي الطالب ينسى إنه بحصة ويحس إنه عم بدردش مع صديق كبير بيساعده.',
      tags: ['طاقة إيجابية عالية', 'مواقف من الحياة الواقعية', 'تقوية النطق السليم'],
      experience: '5 سنوات تدريب لغوي',
      accent: 'عبرية يومية محكية متقنة',
      previewAudio: 'איזה כיף שבאת! היום נדבר על הדברים שאתה הכי אוהב.',
    },
    {
      name: 'المعلمة مايا',
      role: 'متخصصة تأسيس وبناء ثقة',
      quote: 'كل طفل عنده مفتاحه الخاص. مع التكرار الإيجابي والتشجيع المستمر، بصير الحكي بالعبري عادة طبيعية وممتعة.',
      tags: ['أسلوب تفاعلي بالقصص', 'تدرج مريح بدون ضغط', 'متابعة حثيثة مع الأهل'],
      experience: '6 سنوات في التعليم التفاعلي',
      accent: 'نطق هادئ وواضح جداً',
      previewAudio: 'כל הכבוד! דיברת מצוין היום, אני גאה בך!',
    },
  ];

  const homeFaqs = [
    {
      q: 'هل الحصة الأولى لطفلي مجانية 100%؟',
      a: 'نعم، مجانية تماماً وبدون أي بطاقة ائتمان أو التزام مالي مسبق. بنرتب الموعد المناسب معكم على واتساب لتشوفوا كيف طفلكم بتفاعل مع المعلم.',
    },
    {
      q: 'كيف بيتم اختيار المعلم المناسب لطفلي؟',
      a: 'بنسألكم بالبداية عن عمر الطفل، مستواه الحالي، وشخصيته (إذا كان خجولاً أو حركياً)، ومنرشح معلم صبور ومناسب جداً لطبيعته.',
    },
    {
      q: 'إذا طفلي ما ارتاح لأسلوب المعلم، هل بقدر أغيّره؟',
      a: 'نعم بكل بساطة وبدون أي إحراج! بتبعتولنا رسالة على واتساب وبنبدل المعلم مباشرة مع الحفاظ على كل رصيدكم وتقدمكم.',
    },
    {
      q: 'عندي أكثر من طفل، كيف بشتغل رصيد العائلة المشترك؟',
      a: 'بتقدروا تشتروا باقة واحدة وتوزعوا حصصها بين إخوته بكل حرية من حساب ولي الأمر، بدون الحاجة لشراء باقات منفصلة مكلفة.',
    },
    {
      q: 'ليه مدة الحصة 25 دقيقة؟',
      a: 'لأنها المدة المثالية علمياً للأطفال في هذا العمر (9–14) للحفاظ على أعلى درجات التركيز والتفاعل 1:1 بدون أي ملل أو إجهاد ذهني.',
    },
  ];

  return (
    <div className="relative overflow-hidden text-right bg-[#FBFBF9] font-sans selection:bg-[#118F86]/20">
      
      {/* =========================================================================
          SCENE 1: THE PRESENTER HERO (Continuous Storyboard Scene 1)
          Human-first hook anchored by NovaTova's authentic Arab 48 presenter
      ========================================================================= */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-28 bg-[#FBFBF9] overflow-visible">
        <AnimatedConversationalArc opacity={0.16} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Storytelling Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust & Flagship Audience Badge */}
              <FadeIn direction="down">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold border border-[#118F86]/25 shadow-xs">
                  <PulseBeacon color="#118F86" size={8} />
                  <span>المسار الرائد: تعليم العبرية للأطفال من 9 إلى 14 سنة</span>
                </div>
              </FadeIn>

              {/* H1 Value Hook in Palestinian/Arab 48 Spoken Arabic */}
              <FadeIn direction="up" delay={0.08} duration={0.55}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#16344B] leading-[1.22] tracking-tight">
                  خلّي ابنك يحكي عبري بثقة… <br />
                  <span className="text-[#118F86] relative inline-block">
                    من أول حصة وبدون خوف.
                  </span>
                </h1>
              </FadeIn>

              {/* Reassuring Context Paragraph */}
              <FadeIn direction="up" delay={0.16} duration={0.5}>
                <p className="text-base sm:text-lg text-[#566974] leading-relaxed max-w-2xl">
                  مع NovaTova منساعد طفلك يكسر حاجز الخجل بحصص خاصة <strong>1:1</strong> مدتها <strong>25 دقيقة</strong> أونلاين،
                  مع <strong>معلمين صبورين بيفهموا لهجته</strong> وبيشرحوا بالعربي لما يلزم — حتى يحكي بطلاقة بالمدرسة والشارع والمستقبل.
                </p>
              </FadeIn>

              {/* Interactive Age-Targeting Selector */}
              <FadeIn direction="up" delay={0.22} duration={0.45}>
                <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-soft max-w-xl">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-[#16344B]">كم عمر طفلك؟ (اختاري لتشوفي أسلوب الحصة):</span>
                    <span className="text-[11px] font-bold text-[#118F86] bg-[#E8F5F4] px-2 py-0.5 rounded">
                      {ageContent[selectedAge].badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: '9-10', label: '9–10 سنوات' },
                      { id: '11-12', label: '11–12 سنة' },
                      { id: '13-14', label: '13–14 سنة' },
                    ].map((tab) => (
                      <motion.button
                        key={tab.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedAge(tab.id as any)}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all ${
                          selectedAge === tab.id
                            ? 'bg-[#118F86] text-white shadow-xs'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                        }`}
                      >
                        {tab.label}
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedAge}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-slate-100 text-xs text-[#566974] leading-relaxed flex items-start gap-2"
                    >
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0 mt-0.5" />
                      <span>{ageContent[selectedAge].desc}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </FadeIn>

              {/* Conversion Buttons (WhatsApp-Direct Booking) */}
              <FadeIn direction="up" delay={0.28} duration={0.45}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenTrialModal(`home-hero-age-${selectedAge}`)}
                    className="bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-accent flex items-center justify-center gap-2.5 tap-target-min transition-all relative overflow-hidden group"
                  >
                    <Sparkles size={18} className="text-[#FFC77A] group-hover:rotate-12 transition-transform" />
                    <span>احجزوا حصة تجريبية مجانية لطفلكم</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setVideoModalOpen(true)}
                    className="bg-white hover:bg-slate-50 text-[#16344B] border border-slate-300 text-sm font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all tap-target-min shadow-xs"
                  >
                    <Play size={16} className="text-[#118F86] fill-[#118F86]" />
                    <span>شوفوا كيف بتكون الحصة (فيديو)</span>
                  </motion.button>
                </div>
              </FadeIn>

              {/* Reassuring Truth Chips */}
              <FadeIn direction="up" delay={0.34} duration={0.4}>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#566974] pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck size={16} className="text-[#118F86]" />
                    <span>الحصة الأولى مجانية 100% بدون أي التزام</span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>ترتيب سريع على واتساب بمحادثة ودية</span>
                  <span className="hidden sm:inline">•</span>
                  <span>حرية تبديل المعلم بأي وقت</span>
                </div>
              </FadeIn>
            </div>

            {/* Presenter Visual Anchor Card (Physically Overlaps into Scene 2) */}
            <div className="lg:col-span-5 relative lg:-mb-14 z-20">
              <FadeIn direction="left" delay={0.15} duration={0.6}>
                <div className="relative">
                  <HeroFloatingElements />

                  {/* Editorial Presenter Frame */}
                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-lifted relative z-10 transition-transform">
                    
                    {/* Top Presenter Status Bar */}
                    <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-[#16344B]">مقدمة NovaTova للأهالي</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#118F86] bg-[#E8F5F4] px-2.5 py-1 rounded-full">
                        رسالة فيديو 15 ثانية
                      </span>
                    </div>

                    {/* Simulated Presenter Video Frame */}
                    <div className="aspect-4/3 rounded-2xl bg-gradient-to-br from-slate-100 via-[#EBF4F3] to-slate-200 border border-slate-200/80 overflow-hidden relative flex flex-col justify-between p-5 group cursor-pointer shadow-inner"
                      onClick={() => setVideoModalOpen(true)}
                    >
                      {/* Background Visual Watermark & Presenter Indicator */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                        <Users size={120} className="text-[#118F86]/20" />
                      </div>

                      {/* Top floating prompt */}
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-[#16344B]/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-lg">
                          رسالة للأمهات والآباء
                        </span>
                        <div className="w-10 h-10 rounded-full bg-[#118F86] text-white flex items-center justify-center shadow-accent group-hover:scale-110 transition-transform">
                          <Play size={18} className="fill-white translate-x-[-1px]" />
                        </div>
                      </div>

                      {/* Middle Message simulation */}
                      <div className="relative z-10 text-center py-2 space-y-1.5 bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-white/60">
                        <span className="text-[11px] text-[#118F86] font-bold block">
                          "مرحبا يا أهالي! بدكم ابنكم يحكي عبري بطلاقة وبدون خوف؟"
                        </span>
                        <p className="text-xs text-[#16344B] font-semibold">
                          شوفي كيف الحصص الفردية 25 دقيقة بتغير ثقة طفلك خطوة بخطوة.
                        </p>
                      </div>

                      {/* Bottom Audio simulation */}
                      <div className="relative z-10">
                        <AudioWaveSimulator />
                      </div>
                    </div>

                    {/* Transparent Staging Label */}
                    <div className="mt-3.5">
                      <StagingAssetBadge
                        label="فيديو ورسالة وجه NovaTova للأهالي"
                        note="يُستبدل بالفيديو والبورتريه الرسمي المعتمد للمذيعة بدقة 4K."
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          TRANSITION 1 -> 2: Downward Organic Wave Sweep
      ========================================================================= */}
      <SectionWaveDivider fillColor="#F0F8F7" accentStroke="#118F86" heightClass="h-12 sm:h-16 md:h-24" />

      {/* =========================================================================
          SCENE 2: THE REAL LESSON EXPERIENCE (Continuous Storyboard Scene 2)
          Cinematic interactive split-screen 1:1 webcam simulation
      ========================================================================= */}
      <section className="relative py-16 md:py-24 bg-[#F0F8F7] text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          <FadeIn className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-[#118F86] block mb-2 tracking-wide">
              تفاعل حقيقي ومباشر 1:1
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#16344B] leading-tight">
              شوفوا كيف بتصير الحصة أونلاين: <br />
              <span className="text-[#118F86]">25 دقيقة تفاعل وضحك ومحادثة حية</span>
            </h2>
            <p className="text-sm sm:text-base text-[#566974] mt-3 leading-relaxed">
              مش تلقين جاف ولا قواعد معقدة. المعلم بحاور طفلك بلطف، وبخليه يتشجع يحكي بدون ما يخاف يغلط.
            </p>
          </FadeIn>

          {/* Cinematic Split-Screen Lesson Stage */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-lifted">
            
            {/* Stage Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm font-bold text-[#16344B]">حصة محادثة عبرية مباشرة 1:1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  المدة: 25 دقيقة
                </span>
                <span className="text-xs font-bold text-[#118F86] bg-[#E8F5F4] px-3 py-1 rounded-full">
                  المستوى: مبتدئ متقدم (عمر 11 سنة)
                </span>
              </div>
            </div>

            {/* Split-Screen Webcam Simulator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Teacher Side (Right in RTL) */}
              <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 text-white p-5 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-md border border-slate-700">
                <div className="flex items-center justify-between relative z-10">
                  <span className="bg-emerald-500/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    المعلمة نور (مباشر)
                  </span>
                  <span className="text-xs text-slate-300 font-mono">24:18 / 25:00</span>
                </div>

                {/* Simulated Teacher Dialogue Bubble */}
                <div className="my-auto py-4 relative z-10 space-y-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
                    <span className="text-xs text-[#FFC77A] font-bold block mb-1">المعلمة نور:</span>
                    <p className="text-base sm:text-lg font-bold text-white font-sans tracking-wide">
                      "שלום אדם! מה שלומך היום? מוכן לשחק?"
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      (مرحباً آدم! كيف حالك اليوم؟ جاهز نلعب؟)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-2 relative z-10">
                  <span>شرح بالعربية عند الحاجة</span>
                  <Volume2 size={15} className="text-[#118F86]" />
                </div>
              </div>

              {/* Student Side (Left in RTL) */}
              <div className="rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 text-white p-5 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-md border border-slate-700">
                <div className="flex items-center justify-between relative z-10">
                  <span className="bg-[#118F86]/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    آدم (11 سنة) • حيفا
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">تفاعل صوتي نشط</span>
                </div>

                {/* Simulated Student Dialogue Bubble */}
                <div className="my-auto py-4 relative z-10 space-y-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
                    <span className="text-xs text-emerald-300 font-bold block mb-1">آدم:</span>
                    <p className="text-base sm:text-lg font-bold text-white font-sans tracking-wide">
                      "שלום מורה! אני מצוין, היום שיחקנו כדורגל בבית הספר!"
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      (مرحباً معلمتي! أنا ممتاز، اليوم لعبنا كرة قدم بالمدرسة!)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-2 relative z-10">
                  <span>بيئة آمنة بدون علامات أو خوف</span>
                  <span className="text-emerald-400 font-bold">طلاقة + ثقة</span>
                </div>
              </div>

            </div>

            {/* Pedagogy Pillars Beneath Video */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 text-right">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5F4] text-[#118F86] flex items-center justify-center shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#16344B]">حصة خاصة 1:1</h4>
                  <p className="text-[11px] text-[#566974] mt-0.5 leading-relaxed">
                    كامل وقت الحصة مخصص لطفلك، بدون تشتيت أو مقارنة مع طلاب آخرين.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5F4] text-[#118F86] flex items-center justify-center shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#16344B]">شرح وتوضيح بالعربي</h4>
                  <p className="text-[11px] text-[#566974] mt-0.5 leading-relaxed">
                    إذا استصعب فكرة، المعلم بشرحله إياها بلهجته لطمأنته وتثبيت المعنى.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5F4] text-[#118F86] flex items-center justify-center shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#16344B]">تقرير متابعة بعد الحصة</h4>
                  <p className="text-[11px] text-[#566974] mt-0.5 leading-relaxed">
                    رسالة واتساب واضحة للأهل بتبين شو اتعلم الطفل ونقاط قوته.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 text-center pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenTrialModal('home-lesson-simulation')}
                className="bg-[#118F86] hover:bg-[#0E736C] text-white text-sm sm:text-base font-bold px-8 py-3.5 rounded-2xl shadow-accent inline-flex items-center gap-2 transition-all"
              >
                <Sparkles size={16} className="text-[#FFC77A]" />
                <span>جرّبوا الحصة مجانًا لطفلكم الآن</span>
              </motion.button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 2 -> 3: Gentle Wave into Editorial White
      ========================================================================= */}
      <SectionWaveDivider fillColor="#FFFFFF" accentStroke="#FFC77A" heightClass="h-10 sm:h-14 md:h-20" />

      {/* =========================================================================
          SCENE 3: EDITORIAL TEACHERS SHOWCASE (Continuous Storyboard Scene 3)
          Magazine-style teacher portraits with personality quotes & switch guarantee
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-white text-right relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-[#118F86] block mb-2 tracking-wide">
              معلمين بيعرفوا كيف يطمنوا طفلك
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#16344B] leading-tight">
              مش بس معلمين لغة… <br />
              <span className="text-[#118F86]">مرشدين صبورين بيزرعوا الثقة في قلبه</span>
            </h2>
            <p className="text-sm sm:text-base text-[#566974] mt-3 leading-relaxed">
              منختار معلمين عندهم طاقة إيجابية وأسلوب هادئ، وبنضمنلك حرية تبديل المعلم بأي وقت وبكل سهولة.
            </p>
          </FadeIn>

          {/* Teacher Selector Tabs */}
          <div className="flex justify-center mb-8">
            <div className="p-1.5 bg-[#F7F9F6] rounded-2xl border border-slate-200 inline-flex gap-2">
              {editorialTeachers.map((teacher, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedTeacherIndex(idx)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedTeacherIndex === idx
                      ? 'bg-[#118F86] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#16344B]'
                  }`}
                >
                  {teacher.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Teacher Editorial Spread */}
          <div className="max-w-5xl mx-auto bg-[#F7F9F6] rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTeacherIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Teacher Portrait & Audio Teaser (Right) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="aspect-4/5 rounded-2xl bg-gradient-to-br from-[#E8F5F4] to-slate-200 border border-slate-200/80 overflow-hidden relative flex flex-col justify-between p-6 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="bg-white/90 backdrop-blur-md text-[#118F86] text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                        معلم معتمد ومفحوص
                      </span>
                      <Star size={16} className="text-[#FFC77A] fill-[#FFC77A]" />
                    </div>

                    <div className="text-center py-6">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white mx-auto shadow-md border-4 border-[#118F86]/20 flex items-center justify-center text-3xl font-bold text-[#118F86]">
                        {editorialTeachers[selectedTeacherIndex].name.slice(0, 1)}
                      </div>
                      <h3 className="text-xl font-bold text-[#16344B] mt-3">
                        {editorialTeachers[selectedTeacherIndex].name}
                      </h3>
                      <p className="text-xs text-[#566974] mt-0.5">
                        {editorialTeachers[selectedTeacherIndex].role}
                      </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3 border border-slate-200/60 text-center">
                      <span className="text-[11px] text-slate-500 font-medium block mb-1">
                        عينة من نبرة الحديث بالحصة:
                      </span>
                      <p className="text-xs font-bold text-[#16344B] font-sans">
                        "{editorialTeachers[selectedTeacherIndex].previewAudio}"
                      </p>
                    </div>
                  </div>

                  <StagingAssetBadge
                    label={`بورتريه ${editorialTeachers[selectedTeacherIndex].name}`}
                    note="تُعرض الصورة الشخصية الفوتوغرافية الحقيقية المعتمدة في النسخة المنشورة."
                  />
                </div>

                {/* Teacher Editorial Details & Philosophy (Left) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Philosophy Quote */}
                  <div className="relative pl-4 border-r-4 border-[#118F86] pr-4 py-1">
                    <span className="text-xs font-bold text-[#118F86] block mb-1">فلسفة التدريس:</span>
                    <blockquote className="text-lg sm:text-xl font-bold text-[#16344B] leading-relaxed">
                      "{editorialTeachers[selectedTeacherIndex].quote}"
                    </blockquote>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 block mb-0.5">الخبرة:</span>
                      <span className="font-bold text-[#16344B]">{editorialTeachers[selectedTeacherIndex].experience}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 block mb-0.5">الأسلوب واللهجة:</span>
                      <span className="font-bold text-[#16344B]">{editorialTeachers[selectedTeacherIndex].accent}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <span className="text-xs font-bold text-[#16344B] block mb-2">مميزات أسلوب هذا المعلم:</span>
                    <div className="flex flex-wrap gap-2">
                      {editorialTeachers[selectedTeacherIndex].tags.map((tag, tIdx) => (
                        <span key={tIdx} className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-[#566974] font-medium">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Book with this teacher CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenTrialModal(`home-teacher-${editorialTeachers[selectedTeacherIndex].name}`)}
                      className="bg-[#118F86] hover:bg-[#0E736C] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-accent inline-flex items-center justify-center gap-2 transition-all"
                    >
                      <Sparkles size={15} className="text-[#FFC77A]" />
                      <span>احجزوا حصة تجريبية مع {editorialTeachers[selectedTeacherIndex].name}</span>
                    </motion.button>

                    <Link
                      to="/teachers"
                      className="text-xs font-bold text-[#118F86] hover:underline text-center py-2 sm:py-0"
                    >
                      تعرّفوا على باقي المعلمين (12 معلم) ←
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Teacher Switch Guarantee Banner */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#566974]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8F5F4] text-[#118F86] flex items-center justify-center shrink-0">
                  <RefreshCw size={16} />
                </div>
                <span>
                  <strong>ضمان الراحة التامة:</strong> إذا طفلك ما ارتاح لأسلوب المعلم لأي سبب، بتبعتولنا رسالة على واتساب وبنبدله فوراً وبدون أي إحراج.
                </span>
              </div>
              <span className="font-bold text-[#118F86] shrink-0">مرونة كاملة 100%</span>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 3 -> 4: Fluid Organic Wave
      ========================================================================= */}
      <SectionWaveDivider fillColor="#FBFBF9" accentStroke="#118F86" heightClass="h-10 sm:h-14 md:h-20" />

      {/* =========================================================================
          SCENE 4: VISUAL HOW LEARNING WORKS (Continuous Storyboard Scene 4)
          Connected 4-step progress arc from WhatsApp message to fluent confidence
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#FBFBF9] text-right relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#118F86] block mb-2 tracking-wide">
              رحلة واضحة وسهلة
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#16344B] leading-tight">
              4 خطوات بسيطة… <br />
              <span className="text-[#118F86]">من أول رسالة واتساب لحد أول جملة كاملة</span>
            </h2>
            <p className="text-sm sm:text-base text-[#566974] mt-3 leading-relaxed">
              بدون معاملات معقدة ولا بطاقات ائتمان مسبقة. كل إشي بتم عبر محادثة ودية ومتابعة مستمرة.
            </p>
          </FadeIn>

          {/* 4 Connected Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {[
              {
                step: '01',
                title: 'محادثة سريعة على واتساب',
                desc: 'بنسألكم عن عمر طفلكم، مستواه الحالي، ومواعيدكم المناسبة بكل ود وسرعة.',
                highlight: 'بدون أي نموذج تسجيل معقد',
                icon: MessageCircle,
              },
              {
                step: '02',
                title: 'حصة تجريبية مجانية 1:1',
                desc: 'طفلكم بقابل المعلم أونلاين 25 دقيقة، وببلش يحكي ويتدرب من أول دقيقة بدون خوف.',
                highlight: 'مجانية 100% وبدون التزام',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'تقرير مفصل وتوصية للأهل',
                desc: 'بنبعث للأهل رسالة واتساب واضحة بمستوى الطفل، نقاط قوته، والخطة المقترحة.',
                highlight: 'شفافية كاملة للأهالي',
                icon: Award,
              },
              {
                step: '04',
                title: 'بتكملوا بالباقة اللي بتناسبكم',
                desc: 'حرية اختيار الباقة مع إمكانية مشاركة نفس الرصيد بين جميع الإخوة في البيت.',
                highlight: 'رصيد عائلي مرن وتبديل معلمين',
                icon: HeartHandshake,
              },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} duration={0.45}>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft h-full flex flex-col justify-between relative group hover:border-[#118F86] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#E8F5F4] text-[#118F86] flex items-center justify-center font-bold text-sm">
                        <item.icon size={20} />
                      </div>
                      <span className="text-2xl font-black text-slate-200 group-hover:text-[#118F86]/30 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#16344B] mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#566974] leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-[#118F86] bg-[#E8F5F4] px-2.5 py-1 rounded-md inline-block text-center">
                    {item.highlight}
                  </span>
                </div>
              </FadeIn>
            ))}

          </div>

          {/* Action beneath steps */}
          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenTrialModal('home-roadmap-cta')}
              className="bg-[#118F86] hover:bg-[#0E736C] text-white text-sm font-bold px-8 py-3.5 rounded-2xl shadow-accent inline-flex items-center gap-2 transition-all"
            >
              <span>ابدأوا الخطوة الأولى مجاناً الآن</span>
              <ArrowRight size={15} className="rotate-180" />
            </motion.button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 4 -> 5: Soft Wave into Testimonials Canvas
      ========================================================================= */}
      <SectionWaveDivider fillColor="#F7F9F6" accentStroke="#FFC77A" heightClass="h-10 sm:h-14 md:h-20" />

      {/* =========================================================================
          SCENE 5: REAL PARENTS STORIES (Continuous Storyboard Scene 5)
          Authentic Arab 48 Parent Voice with child details & tangible outcomes
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#F7F9F6] text-right relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-[#118F86] block mb-2 tracking-wide">
              تجارب أهالي حقيقية
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#16344B] leading-tight">
              اسمعوا من أهالي شاركونا نفس التجربة: <br />
              <span className="text-[#118F86]">كيف تغيّرت ثقة أولادهم بعد كم أسبوع؟</span>
            </h2>
            <p className="text-sm sm:text-base text-[#566974] mt-3 leading-relaxed">
              شهادات وتجارب موثقة من أهالي في حيفا، الناصرة، القدس، والمثلث بموافقة أصحابها الكاملة.
            </p>
          </FadeIn>

          {/* Interactive Carousel */}
          <TestimonialsCarousel />

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              جميع القصص والتجارب المعروضة حقيقية 100% وموثقة بموافقة أصحابها الكاملة بدون أي تزييف أو ادعاءات غير مؤكدة.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 5 -> 6: Organic Wave into Family Wallet
      ========================================================================= */}
      <SectionWaveDivider fillColor="#FFFFFF" accentStroke="#118F86" heightClass="h-10 sm:h-14 md:h-20" />

      {/* =========================================================================
          SCENE 6: FAMILY WALLET IN FAMILY CONTEXT (Continuous Storyboard Scene 6)
          Shared credit dynamic for multiple siblings with interactive allocation slider
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-white text-right relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#118F86] block mb-2 tracking-wide">
              ميزة حصرية ومرنة للعائلات
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#16344B] leading-tight">
              عندك أكثر من طفل؟ <br />
              <span className="text-[#118F86]">رصيد واحد بكفي الجميع وبكل حرية</span>
            </h2>
            <p className="text-sm sm:text-base text-[#566974] mt-3 leading-relaxed">
              ما في داعي تشتري باقة مستقلة لكل ولد. اشتري باقة واحدة من حساب ولي الأمر، ووزّع الحصص بين أولادك حسب حاجة كل واحد، مع تقرير متابعة منفصل لكل طفل.
            </p>
          </FadeIn>

          {/* Live Interactive Family Wallet Demo */}
          <FamilyWalletDemo />

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 6 -> 7: Soft Wave into Transparent Plans
      ========================================================================= */}
      <SectionWaveDivider fillColor="#F8FAFB" accentStroke="#FFC77A" heightClass="h-10 sm:h-14 md:h-20" />

      {/* =========================================================================
          SCENE 7: STREAMLINED TRANSPARENT PLANS (Continuous Storyboard Scene 7)
          15, 25, 50, 100 lesson tiers with transparent per-lesson economics
      ========================================================================= */}
      <section id="pricing" className="py-16 md:py-24 bg-[#F8FAFB] text-right relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-[#118F86] block mb-2 tracking-wide">
              خطط وأسعار واضحة
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#16344B] leading-tight">
              استثمار بسيط في ثقة طفلك ومستقبله: <br />
              <span className="text-[#118F86]">حصص 25 دقيقة الفردية بدون التزامات خفية</span>
            </h2>
            <p className="text-sm sm:text-base text-[#566974] mt-3 leading-relaxed">
              رصيد عائلي مشترك • حرية تبديل المعلم • ترتيب الحصص بمرونة عبر واتساب
            </p>
          </FadeIn>

          {/* 3 Core Flagship Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            
            {/* 15 Lessons Starter */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-soft h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-block mb-3">
                    الأنسب كبداية وتجربة
                  </span>
                  <h3 className="text-xl font-bold text-[#16344B] mb-1">باقة البداية</h3>
                  <div className="my-4 pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-[#16344B]">390</span>
                      <span className="text-sm font-bold text-slate-500">₪</span>
                    </div>
                    <span className="text-xs text-[#118F86] font-bold block mt-1">
                      15 حصة فردية (26 ₪ للحصة)
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#566974] mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>15 حصة خاصة 1:1 مع مدرس مباشر</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>إمكانية مشاركة الرصيد بين الأبناء</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>حرية اختيار وتغيير المدرس</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>تقارير متابعة دورية للأهل</span>
                    </li>
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenTrialModal('home-pricing-15')}
                  className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-[#16344B] text-xs font-bold rounded-2xl transition-colors text-center"
                >
                  احجزوا الباقة عبر واتساب
                </motion.button>
              </div>
            </FadeIn>

            {/* 25 Lessons Progress (Featured Best-Seller) */}
            <FadeIn delay={0.18}>
              <div className="bg-white rounded-3xl p-7 border-2 border-[#118F86] ring-4 ring-[#118F86]/10 shadow-lifted h-full flex flex-col justify-between relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#118F86] text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md">
                  الخيار الأكثر توازناً للتقدّم ★
                </div>

                <div>
                  <span className="text-xs font-bold text-[#118F86] bg-[#E8F5F4] px-3 py-1 rounded-full inline-block mb-3 mt-1">
                    توفير واستمرارية
                  </span>
                  <h3 className="text-xl font-bold text-[#16344B] mb-1">باقة التقدّم</h3>
                  <div className="my-4 pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-[#118F86]">600</span>
                      <span className="text-sm font-bold text-slate-500">₪</span>
                    </div>
                    <span className="text-xs text-[#118F86] font-bold block mt-1">
                      25 حصة فردية (24 ₪ للحصة فقط)
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#566974] mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span><strong>25 حصة فردية 1:1</strong> مخصصة بالكامل</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span><strong>مشاركة الرصيد</strong> بين الإخوة بحرية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>أولوية في تثبيت المواعيد الأسبوعية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>متابعة مستمرة بعد كل درس</span>
                    </li>
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenTrialModal('home-pricing-25')}
                  className="w-full py-3.5 bg-[#118F86] hover:bg-[#0E736C] text-white text-xs font-bold rounded-2xl shadow-accent transition-all text-center"
                >
                  احجزوا باقة التقدّم الآن
                </motion.button>
              </div>
            </FadeIn>

            {/* 50 Lessons Continuity */}
            <FadeIn delay={0.25}>
              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-soft h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block mb-3">
                    لبناء طلاقة مستدامة
                  </span>
                  <h3 className="text-xl font-bold text-[#16344B] mb-1">باقة الاستمرار</h3>
                  <div className="my-4 pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-[#16344B]">1,000</span>
                      <span className="text-sm font-bold text-slate-500">₪</span>
                    </div>
                    <span className="text-xs text-[#118F86] font-bold block mt-1">
                      50 حصة فردية (20 ₪ للحصة — توفير 30%)
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#566974] mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>50 حصة فردية لبناء عادة لغوية قوية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>سعر مميّز للحصة (20 ₪ فقط)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>توزيع مرن بين جميع أبناء العائلة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#118F86] shrink-0" />
                      <span>خطة متابعة تدريجية للمستوى المتقدم</span>
                    </li>
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenTrialModal('home-pricing-50')}
                  className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-[#16344B] text-xs font-bold rounded-2xl transition-colors text-center"
                >
                  احجزوا باقة الاستمرار عبر واتساب
                </motion.button>
              </div>
            </FadeIn>

          </div>

          {/* Legal policy review banner */}
          <div className="mt-10 text-center max-w-xl mx-auto">
            <PolicyReviewTag text="بند استرداد الأموال خلال 14 يوماً خاضع للمراجعة القانونية قبل الإطلاق [POLICY_REVIEW]" />
          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 7 -> 8: Dramatic Deep Ocean Wave Sweep
      ========================================================================= */}
      <SectionWaveDivider fillColor="#16344B" accentStroke="#FFC77A" heightClass="h-12 sm:h-18 md:h-28" />

      {/* =========================================================================
          SCENE 8: EMOTIONAL PRESENTER CLOSING CTA & FAQ DRAWER (Scene 8)
          Deep ocean #16344B closing bookend with presenter anchor & instant WhatsApp trial
      ========================================================================= */}
      <section className="pt-12 pb-20 md:pt-16 md:pb-28 bg-[#16344B] text-white relative text-right">
        <AnimatedConversationalArc opacity={0.18} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
            
            {/* Closing Presenter Anchor (Right in RTL) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FadeIn direction="right">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 relative overflow-hidden text-right space-y-4 shadow-lifted">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#118F86] text-white flex items-center justify-center font-bold text-lg border-2 border-white/30 shrink-0">
                      ن
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">رسالة ختامية من فريق NovaTova</h4>
                      <p className="text-xs text-slate-300">لأولياء الأمور الحريصين على مستقبل أولادهم</p>
                    </div>
                  </div>

                  <blockquote className="text-sm text-slate-200 leading-relaxed italic border-r-2 border-[#FFC77A] pr-3">
                    "كل رحلة طلاقة بتبدأ بكلمة وحدة. ابنكم عنده القدرة الكاملة، وبس محتاج بيئة صبورة تطمنه وتخليه يحكي بدون خوف. جرّبوا حصة وحدة وشوفوا كيف رح تتغير نظرته للغة."
                  </blockquote>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
                    <span>حصة تجريبية مجانية 100%</span>
                    <span className="text-[#FFC77A] font-bold">بدون أي التزام</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Closing Action Content (Left in RTL) */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FFC77A] text-xs font-bold border border-white/15">
                  <Sparkles size={14} />
                  <span>أول خطوة أسهل مما بتتخيلوا</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mt-3">
                  جاهزين نبلّش؟ <br />
                  <span className="text-[#FFC77A]">احجزوا حصة تجريبية مجانية لطفلكم الآن</span>
                </h2>

                <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                  احكولنا مين بدّه يتعلّم وشو هدفه، وفريقنا بجهّز موعد الحصة معكم خطوة بخطوة عبر محادثة ودية وسريعة على واتساب.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenTrialModal('home-closing-cta')}
                    className="bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-accent flex items-center justify-center gap-2.5 transition-all tap-target-min"
                  >
                    <Sparkles size={18} className="text-[#FFC77A]" />
                    <span>احجزوا حصة تجريبية مجانية الآن</span>
                  </motion.button>

                  <a
                    href="https://wa.me/972500000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20NovaTova%D8%8C%20%D8%B9%D9%86%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%AD%D8%B5%D8%B5%20%D8%A7%D9%84%D8%AA%D8%AC%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all tap-target-min"
                  >
                    <MessageCircle size={16} />
                    <span>تواصلوا معنا مباشرة على واتساب</span>
                  </a>
                </div>
              </FadeIn>
            </div>

          </div>

          {/* Expandable Quick FAQ Drawer */}
          <div className="pt-12 border-t border-white/10 max-w-3xl mx-auto">
            <h3 className="text-lg font-bold text-white text-center mb-6">
              إجابات سريعة قبل الحجز
            </h3>

            <div className="space-y-3">
              {homeFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-right font-bold text-sm text-white flex items-center justify-between gap-3 hover:bg-white/10 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#FFC77A] transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/faq" className="text-xs font-bold text-[#FFC77A] hover:underline">
                عرض جميع الأسئلة الشائعة (28 سؤال) ←
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Video Modal for Full Lesson & Presenter Viewing */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />

    </div>
  );
};
