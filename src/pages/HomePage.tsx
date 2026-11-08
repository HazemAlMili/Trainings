import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedConversationalArc, AudioWaveSimulator } from '../components/motion/SignatureElements';
import { FadeIn, InteractiveHoverCard } from '../components/motion/MotionWrapper';
import { FamilyWalletDemo } from '../components/common/FamilyWalletDemo';
import { TestimonialsCarousel } from '../components/common/TestimonialsCarousel';
import { VideoModal } from '../components/common/VideoModal';
import { SectionWaveDivider } from '../components/common/BrandMotif';
import {
  Sparkles,
  CheckCircle2,
  Play,
  ShieldCheck,
  RefreshCw,
  MessageCircle,
  Volume2,
  ArrowRight,
  Star,
  Users,
} from 'lucide-react';

interface HomePageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenTrialModal }) => {
  // Flagship interactive age selector: 9, 10, 11, 12, 13, 14
  const [selectedAge, setSelectedAge] = useState<number>(11);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedTeacherIndex, setSelectedTeacherIndex] = useState(0);

  const ageMilestones: Record<number, string> = {
    9: 'كسر حاجز الخجل والتعوّد على أصوات العبرية بألعاب محادثة لطيفة.',
    10: 'بناء الثقة وتكوين أولى الجمل الكاملة في مواقف يومية ممتعة.',
    11: 'تقوية المفردات والطلاقة للمدرسة والمواقف اليومية دون تردد.',
    12: 'المشاركة الصفية بثقة والتعبير عن الأفكار بوضوح وسلاسة.',
    13: 'محادثة حرة وواقعية تكسر الخوف وتجهّز للمرحلة الإعدادية.',
    14: 'طلاقة متقدمة واستقلالية تامة في الحديث مع الناطقين باللغة.',
  };

  // 3 Verified editorial teachers
  const editorialTeachers = [
    {
      name: 'المعلمة نور',
      role: 'متخصصة محادثة أطفال (9–14)',
      quote: 'أهم إشي عندي إنو الطفل ما يحس بإحراج لو غلط. بالأمان ببلش يحكي بطلاقة.',
      tag: 'صبورة ومرحة • شرح بالعربي',
      audioPreview: 'שלום! נעים מאוד להכיר אותך, מוכן שנתחיל?',
    },
    {
      name: 'المعلم رامي',
      role: 'مدرّب طلاقة ومواقف يومية',
      quote: 'اللغة ممارسة حية. بخلي الطالب يدردش كأنه مع صديق كبير بيساعده.',
      tag: 'طاقة إيجابية • مواقف واقعية',
      audioPreview: 'איזה כיف שבאת! היום נדבר על מה שאתה אוהב.',
    },
    {
      name: 'المعلمة مايا',
      role: 'متخصصة تأسيس وبناء ثقة',
      quote: 'مع التكرار الإيجابي والتشجيع المستمر، بصير الحكي بالعبري عادة ممتعة.',
      tag: 'قصص تفاعلية • تدرج مريح',
      audioPreview: 'כל הכבוד! דיברת מצוין היום, אני גאה בך!',
    },
  ];

  return (
    <div className="relative overflow-hidden text-right bg-[#FAF9F5] font-sans selection:bg-[#118F86]/20">
      
      {/* =========================================================================
          SCENE 1: OUR PRESENTER (RADICAL CONSUMER-EDTECH HERO)
          Simplicity, human emotional impact, and direct age selection hierarchy
      ========================================================================= */}
      <section className="relative pt-8 pb-14 md:pt-14 md:pb-24 bg-[#FAF9F5] overflow-visible">
        <AnimatedConversationalArc opacity={0.15} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* DESKTOP HERO (lg:grid) */}
          <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
            
            {/* Right: Minimal copy & large age selection hierarchy (7 cols) */}
            <div className="col-span-7 space-y-6">
              
              {/* Eyebrow */}
              <FadeIn direction="down" duration={0.35}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-black tracking-wide border border-[#118F86]/20 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#118F86] animate-pulse" />
                  <span>عبري للأطفال</span>
                </span>
              </FadeIn>

              {/* Exact Mandated Headline */}
              <FadeIn direction="up" delay={0.05} duration={0.45}>
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-[#16344B] leading-[1.18] tracking-tight">
                  خلّي ابنك يحكي عبري بثقة.
                </h1>
              </FadeIn>

              {/* Exact Mandated Supporting text */}
              <FadeIn direction="up" delay={0.1} duration={0.45}>
                <p className="text-lg sm:text-xl text-[#566974] leading-relaxed max-w-xl">
                  حصص مباشرة 1:1، مع مدرس بيفهم احتياجات طفلك.
                </p>
              </FadeIn>

              {/* Exact Mandated Age Selector */}
              <FadeIn direction="up" delay={0.15} duration={0.45}>
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3 max-w-md">
                    <span className="text-sm font-black text-[#16344B]">قديش عمر طفلك؟</span>
                    <span className="text-xs font-bold text-[#118F86] bg-[#E8F5F4] px-2.5 py-0.5 rounded-full">
                      عمر {selectedAge} سنوات
                    </span>
                  </div>

                  {/* Large Touch/Click Age Buttons: 9, 10, 11, 12, 13, 14 */}
                  <div className="flex items-center gap-2.5 sm:gap-3 max-w-md">
                    {[9, 10, 11, 12, 13, 14].map((age) => {
                      const isSelected = selectedAge === age;
                      return (
                        <motion.button
                          key={age}
                          type="button"
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => setSelectedAge(age)}
                          aria-pressed={isSelected}
                          aria-label={`اختيار عمر ${age} سنوات`}
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-base sm:text-lg font-black transition-all flex items-center justify-center select-none cursor-pointer ${
                            isSelected
                              ? 'bg-[#118F86] text-white shadow-accent ring-4 ring-[#118F86]/20 scale-105'
                              : 'bg-white text-[#16344B] border-2 border-slate-200/90 hover:border-[#118F86]/50 shadow-xs'
                          }`}
                        >
                          {age}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Micro milestone for chosen age */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selectedAge}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-[#566974] mt-3 font-medium flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} className="text-[#118F86] shrink-0" />
                      <span>{ageMilestones[selectedAge]}</span>
                    </motion.p>
                  </AnimatePresence>
                </div>
              </FadeIn>

              {/* Exact Mandated Primary CTA */}
              <FadeIn direction="up" delay={0.2} duration={0.45}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenTrialModal(`hero-age-${selectedAge}`)}
                    className="bg-[#118F86] hover:bg-[#0E736C] text-white text-lg font-black px-10 py-4 rounded-2xl shadow-accent flex items-center justify-center gap-3 tap-target-min transition-all relative overflow-hidden group"
                  >
                    <Sparkles size={20} className="text-[#FFC77A] group-hover:rotate-12 transition-transform" />
                    <span>احجز حصة مجانية</span>
                  </motion.button>
                </div>

                <div className="pt-3 text-xs text-[#566974] flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={15} className="text-[#118F86]" />
                    <span>حصة أولى مجانية 100%</span>
                  </span>
                  <span>•</span>
                  <span>بدون بطاقة ائتمان</span>
                  <span>•</span>
                  <span>الترتيب على واتساب</span>
                </div>
              </FadeIn>

            </div>

            {/* Left: Large Real Advertising Presenter Anchor (5 cols, ~45% width) */}
            <div className="col-span-5 relative" data-asset-slot="presenter-hero-cutout">
              <FadeIn direction="left" delay={0.1} duration={0.6}>
                <div className="relative mx-auto max-w-md">
                  
                  {/* Warm Radiant Studio Stage Background */}
                  <div className="w-full aspect-4/5 rounded-3xl bg-gradient-to-tr from-[#E6F3F1] via-[#F4EBD9] to-[#FAF9F5] border border-slate-200/80 shadow-lifted relative overflow-hidden flex flex-col justify-end p-6 group cursor-pointer"
                    onClick={() => setVideoModalOpen(true)}
                  >
                    {/* Artistic Presenter Cutout Representation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Cutout Silhouette / Portrait Graphic */}
                        <svg className="w-full h-full object-contain" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="200" cy="220" r="160" fill="#118F86" fillOpacity="0.08" />
                          <circle cx="200" cy="170" r="70" fill="#16344B" fillOpacity="0.85" />
                          <path d="M90 480C90 350 140 290 200 290C260 290 310 350 310 480" fill="#118F86" fillOpacity="0.9" />
                          {/* Presenter Smile / Warm Face Accent */}
                          <circle cx="200" cy="165" r="50" fill="#FFC77A" fillOpacity="0.9" />
                          <path d="M175 160Q200 190 225 160" stroke="#16344B" strokeWidth="4" strokeLinecap="round" />
                          <circle cx="185" cy="145" r="5" fill="#16344B" />
                          <circle cx="215" cy="145" r="5" fill="#16344B" />
                        </svg>
                      </div>
                    </div>

                    {/* Authentic Presenter Speech Motif */}
                    <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lifted border border-slate-200/80 mb-3 text-right">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-[#118F86]">مقدمة NovaTova للأهالي</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-xs font-black text-[#16344B] leading-snug">
                        "مرحبا يا أهالي! جاهزين نكسر حاجز الخوف ويبلش ابنكم يحكي؟"
                      </p>
                    </div>

                    {/* Floating Video Play Button Overlay */}
                    <div className="relative z-10 flex items-center justify-between bg-[#16344B]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-md">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <Play size={14} className="fill-[#FFC77A] text-[#FFC77A]" />
                        <span>شاهدوا رسالة ترحيبية (15 ثانية)</span>
                      </div>
                      <span className="text-[10px] text-slate-300">فيديو مباشر</span>
                    </div>
                  </div>

                  {/* Confidence Pill */}
                  <div className="absolute -top-3 -right-3 bg-white text-[#16344B] text-xs font-black px-3.5 py-1.5 rounded-full shadow-md border border-slate-200 flex items-center gap-1.5">
                    <Star size={14} className="fill-[#FFC77A] text-[#FFC77A]" />
                    <span>ثقة حقيقية من أول حصة</span>
                  </div>

                </div>
              </FadeIn>
            </div>

          </div>

          {/* MOBILE HERO (Separately Composed for Maximum Human Impact) */}
          <div className="lg:hidden space-y-6 text-right">
            
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-black border border-[#118F86]/20">
                <span className="w-2 h-2 rounded-full bg-[#118F86] animate-pulse" />
                <span>عبري للأطفال</span>
              </span>
              <span className="text-xs text-[#566974] font-bold">حصص 1:1 خاصة</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#16344B] leading-tight">
              خلّي ابنك يحكي عبري بثقة.
            </h1>

            <p className="text-sm text-[#566974] leading-relaxed">
              حصص مباشرة 1:1، مع مدرس بيفهم احتياجات طفلك.
            </p>

            {/* Mobile Large Presenter Visual Anchor */}
            <div
              className="w-full aspect-5/4 rounded-3xl bg-gradient-to-tr from-[#E6F3F1] via-[#F4EBD9] to-[#FAF9F5] border border-slate-200 shadow-soft relative overflow-hidden flex flex-col justify-end p-4 cursor-pointer"
              onClick={() => setVideoModalOpen(true)}
              data-asset-slot="presenter-hero-mobile"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-70">
                <Users size={120} className="text-[#118F86]/30" />
              </div>
              <div className="relative z-10 bg-white/95 rounded-xl p-3 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#118F86] font-bold block">مقدمة NovaTova</span>
                  <p className="text-xs font-black text-[#16344B]">"جاهزين نكسر حاجز الخوف؟"</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#118F86] text-white flex items-center justify-center shadow-xs">
                  <Play size={15} className="fill-white" />
                </div>
              </div>
            </div>

            {/* Mobile Age Selector */}
            <div>
              <span className="text-xs font-black text-[#16344B] block mb-2">قديش عمر طفلك؟</span>
              <div className="grid grid-cols-6 gap-2">
                {[9, 10, 11, 12, 13, 14].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setSelectedAge(age)}
                    className={`py-2.5 rounded-xl text-sm font-black transition-all ${
                      selectedAge === age
                        ? 'bg-[#118F86] text-white shadow-xs'
                        : 'bg-white text-[#16344B] border border-slate-200'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenTrialModal(`mobile-hero-age-${selectedAge}`)}
              className="w-full py-4 bg-[#118F86] text-white text-base font-black rounded-2xl shadow-accent flex items-center justify-center gap-2 tap-target-min"
            >
              <Sparkles size={18} className="text-[#FFC77A]" />
              <span>احجز حصة مجانية</span>
            </motion.button>

          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 1 -> 2: Organic Wave into Lesson Video
      ========================================================================= */}
      <SectionWaveDivider fillColor="#F0F8F7" accentStroke="#118F86" heightClass="h-10 sm:h-16 md:h-20" />

      {/* =========================================================================
          SCENE 2: SEE A REAL LESSON (هيك بتكون الحصة)
          One headline + one 12-word support sentence + large interactive video
      ========================================================================= */}
      <section className="py-14 md:py-24 bg-[#F0F8F7] text-right relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#16344B] tracking-tight">
              هيك بتكون الحصة.
            </h2>
            <p className="text-base text-[#566974] mt-2 font-medium">
              محادثة مباشرة وتفاعل مرح بدون أي ضغط أو إحراج.
            </p>
          </FadeIn>

          {/* Large Approved Lesson Video Player Frame */}
          <div
            className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-lifted relative overflow-hidden"
            data-asset-slot="real-lesson-video"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-xs">
              <span className="font-bold text-[#16344B] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                حصة محادثة حية 1:1 (25 دقيقة)
              </span>
              <span className="text-[#118F86] bg-[#E8F5F4] px-3 py-1 rounded-full font-bold">
                عمر 11 سنة • مبتدئ
              </span>
            </div>

            {/* Split Screen 1:1 Interaction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Teacher Side */}
              <div className="rounded-2xl bg-slate-900 text-white p-5 min-h-[220px] flex flex-col justify-between border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-emerald-500/90 px-2 py-0.5 rounded font-bold">المعلمة نور</span>
                  <span className="text-slate-400 font-mono">24:10</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 my-auto">
                  <p className="text-base sm:text-lg font-bold text-white font-sans">
                    "שלום אדם! מה שלומך היום?"
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">(مرحباً آدم! كيف حالك اليوم؟)</p>
                </div>
                <span className="text-[11px] text-slate-400">شرح بالعربي لما يلزم</span>
              </div>

              {/* Student Side */}
              <div className="rounded-2xl bg-slate-800 text-white p-5 min-h-[220px] flex flex-col justify-between border border-slate-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-[#118F86] px-2 py-0.5 rounded font-bold">آدم (11 سنة) • حيفا</span>
                  <span className="text-emerald-400 font-bold">تفاعل مباشر</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 my-auto">
                  <p className="text-base sm:text-lg font-bold text-white font-sans">
                    "שלום מורה! היום שיחקנו כדורגל!"
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">(مرحباً معلمتي! اليوم لعبنا كرة قدم!)</p>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold">بدون خوف من الخطأ</span>
              </div>

            </div>

            {/* Video Play Trigger & CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="text-xs sm:text-sm font-bold text-[#118F86] hover:underline flex items-center gap-2"
              >
                <Play size={16} className="fill-[#118F86]" />
                <span>شاهدوا تسجيلاً كاملاً لحصة حقيقية (فيديو)</span>
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenTrialModal('scene-lesson-video')}
                className="w-full sm:w-auto bg-[#118F86] hover:bg-[#0E736C] text-white text-xs sm:text-sm font-black px-6 py-3 rounded-xl shadow-accent transition-all"
              >
                احجزوا نفس التجربة لطفلكم
              </motion.button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 2 -> 3: Gentle Wave into Teachers
      ========================================================================= */}
      <SectionWaveDivider fillColor="#FFFFFF" accentStroke="#FFC77A" heightClass="h-10 sm:h-14 md:h-18" />

      {/* =========================================================================
          SCENE 3: THE TEACHERS BEHIND THE EXPERIENCE (تعرّفوا على مدرّسينا)
          One headline + one 9-word support sentence + authentic editorial spread
      ========================================================================= */}
      <section className="py-14 md:py-24 bg-white text-right relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#16344B] tracking-tight">
              تعرّفوا على مدرّسينا.
            </h2>
            <p className="text-base text-[#566974] mt-2 font-medium">
              معلمون صبورون يفهمون لهجة طفلك ويشجعونه على التحدث.
            </p>
          </FadeIn>

          {/* 3 Teacher Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-asset-slot="teacher-portraits">
            {editorialTeachers.map((teacher, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F5] rounded-3xl p-6 border border-slate-200/90 shadow-soft flex flex-col justify-between h-full"
              >
                <div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#E8F5F4] to-slate-200 flex items-center justify-center text-3xl font-black text-[#118F86] mb-4 shadow-inner">
                    {teacher.name.slice(0, 1)}
                  </div>

                  <h3 className="text-lg font-black text-[#16344B]">{teacher.name}</h3>
                  <span className="text-xs text-[#118F86] font-bold block mb-2">{teacher.role}</span>

                  <blockquote className="text-xs text-[#566974] leading-relaxed mb-4 italic">
                    "{teacher.quote}"
                  </blockquote>

                  <span className="inline-block text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 mb-4">
                    {teacher.tag}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenTrialModal(`scene-teacher-${teacher.name}`)}
                  className="w-full py-2.5 bg-[#118F86] hover:bg-[#0E736C] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  احجزوا تجربة مع {teacher.name}
                </motion.button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-[#566974] flex items-center justify-center gap-2">
            <RefreshCw size={14} className="text-[#118F86]" />
            <span>بتقدروا تبدلوا المعلم بأي وقت بكل سهولة وبدون أي إحراج.</span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 3 -> 4: Wave into Student Progress
      ========================================================================= */}
      <SectionWaveDivider fillColor="#FBFBF9" accentStroke="#118F86" heightClass="h-10 sm:h-14 md:h-18" />

      {/* =========================================================================
          SCENE 4: WATCH REAL PROGRESS (كل حصة، خطوة لقدّام)
          One headline + one 8-word support sentence + 3 clear milestones
      ========================================================================= */}
      <section className="py-14 md:py-24 bg-[#FBFBF9] text-right relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#16344B] tracking-tight">
              كل حصة، خطوة لقدّام.
            </h2>
            <p className="text-base text-[#566974] mt-2 font-medium">
              من كلمات متفرقة إلى جملة كاملة ومحادثة واثقة.
            </p>
          </FadeIn>

          {/* 3 Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-black text-[#118F86] bg-[#E8F5F4] px-3 py-1 rounded-full inline-block mb-3">
                الحصة الأولى
              </span>
              <h3 className="text-base font-black text-[#16344B] mb-2">كسر حاجز الخوف</h3>
              <p className="text-xs text-[#566974] leading-relaxed">
                الطفل يتعرف على المعلم، ويشعر بالأمان التام، وينطق أولى الكلمات بحرية وبدون قلق.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border-2 border-[#118F86] shadow-soft ring-4 ring-[#118F86]/10">
              <span className="text-xs font-black text-white bg-[#118F86] px-3 py-1 rounded-full inline-block mb-3">
                بعد 5 حصص
              </span>
              <h3 className="text-base font-black text-[#16344B] mb-2">تكوين جمل كاملة</h3>
              <p className="text-xs text-[#566974] leading-relaxed">
                الانتقال من الإجابة بكلمة واحدة إلى تركيب جمل حية عن هواياته ويومه المدرسي.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-black text-[#118F86] bg-[#E8F5F4] px-3 py-1 rounded-full inline-block mb-3">
                بعد 15 حصة
              </span>
              <h3 className="text-base font-black text-[#16344B] mb-2">طلاقة ومشاركة بالصف</h3>
              <p className="text-xs text-[#566974] leading-relaxed">
                رفع اليد في المدرسة بثقة، ومحادثة واقعية دون تلعثم أو خوف من الخطأ.
              </p>
            </div>

          </div>

          {/* Real teacher feedback quote */}
          <div className="mt-8 max-w-xl mx-auto p-4 bg-white rounded-2xl border border-slate-200 text-center text-xs text-[#16344B]">
            <span className="text-slate-400 block mb-1">من تقرير المعلم بعد الحصة:</span>
            <strong>"آدم تشجع وصار يحكي جملة كاملة بدون تردد وبفخر كبير."</strong>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 4 -> 5: Soft Wave into Testimonials
      ========================================================================= */}
      <SectionWaveDivider fillColor="#F7F9F6" accentStroke="#FFC77A" heightClass="h-10 sm:h-14 md:h-18" />

      {/* =========================================================================
          SCENE 5: REAL FAMILIES, REAL EXPERIENCES (اسمعوا من الأهالي)
          One headline + one 10-word support sentence + authentic testimonial gallery
      ========================================================================= */}
      <section className="py-14 md:py-24 bg-[#F7F9F6] text-right relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#16344B] tracking-tight">
              اسمعوا من الأهالي.
            </h2>
            <p className="text-base text-[#566974] mt-2 font-medium">
              تجارب موثقة من أمهات وآباء لاحظوا الفرق في ثقة أولادهم.
            </p>
          </FadeIn>

          {/* Genuine Testimonial Carousel */}
          <TestimonialsCarousel />

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 5 -> 6: Wave into Family Learning
      ========================================================================= */}
      <SectionWaveDivider fillColor="#FFFFFF" accentStroke="#118F86" heightClass="h-10 sm:h-14 md:h-18" />

      {/* =========================================================================
          SCENE 6: FAMILY LEARNING (باقة وحدة لكل أولادك)
          One headline + one 8-word support sentence + interactive Family Wallet
      ========================================================================= */}
      <section className="py-14 md:py-24 bg-white text-right relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#16344B] tracking-tight">
              باقة وحدة لكل أولادك.
            </h2>
            <p className="text-base text-[#566974] mt-2 font-medium">
              رصيد حصص مشترك توزعه بين الأبناء بكل حرية.
            </p>
          </FadeIn>

          {/* Interactive Family Wallet Demonstration */}
          <FamilyWalletDemo />

          <div className="mt-8 text-center">
            <Link to="/pricing" className="text-xs font-bold text-[#118F86] hover:underline">
              عرض تفاصيل جميع الباقات وحصص الـ 55 دقيقة ←
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TRANSITION 6 -> 7: Dramatic Deep Ocean Wave Sweep
      ========================================================================= */}
      <SectionWaveDivider fillColor="#16344B" accentStroke="#FFC77A" heightClass="h-12 sm:h-18 md:h-24" />

      {/* =========================================================================
          SCENE 7: FINAL HUMAN CTA (جاهزين نبلّش؟)
          One headline + one 8-word support sentence + Presenter bookend
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#16344B] text-white text-right relative">
        <AnimatedConversationalArc opacity={0.18} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Presenter Visual Closing Anchor (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1" data-asset-slot="presenter-closing">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 text-right space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#118F86] text-white flex items-center justify-center font-bold text-lg border-2 border-white/30">
                    ن
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">وجه NovaTova للأهالي</h4>
                    <p className="text-xs text-slate-300">معكم خطوة بخطوة</p>
                  </div>
                </div>

                <blockquote className="text-xs text-slate-200 leading-relaxed italic border-r-2 border-[#FFC77A] pr-3">
                  "خطوة صغيرة منك اليوم بتعطي ابنك ثقة بتضل معه طول العمر. خلّينا نبلّش سوا بحصة تجريبية مجانية."
                </blockquote>
              </div>
            </div>

            {/* Closing Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                جاهزين نبلّش؟
              </h2>

              <p className="text-base text-slate-300 font-medium">
                احجزوا حصة تجريبية مجانية 100% بدون أي التزام.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenTrialModal('final-human-cta')}
                  className="bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-black px-8 py-4 rounded-2xl shadow-accent flex items-center justify-center gap-2.5 tap-target-min transition-all"
                >
                  <Sparkles size={18} className="text-[#FFC77A]" />
                  <span>احجزوا حصة مجانية</span>
                </motion.button>

                <a
                  href="https://wa.me/972500000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20NovaTova%D8%8C%20%D8%AD%D8%A7%D8%A8%D8%A8%20%D8%A3%D8%AD%D8%AC%D8%B2%20%D8%AD%D8%B5%D8%A9%20%D8%AA%D8%AC%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9%20%D9%85%D8%AC%D8%A7%D9%86%D9%8A%D8%A9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all tap-target-min"
                >
                  <MessageCircle size={16} />
                  <span>تحدثوا معنا على واتساب</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Video Modal for Real Lesson Video */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />

    </div>
  );
};
