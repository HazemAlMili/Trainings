import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedConversationalArc, HeroFloatingElements, AudioWaveSimulator } from '../components/motion/SignatureElements';
import { FadeIn, StaggerContainer, StaggerItem, InteractiveHoverCard, PulseBeacon } from '../components/motion/MotionWrapper';
import { StagingAssetBadge } from '../components/common/BrandMotif';
import { FamilyWalletDemo } from '../components/common/FamilyWalletDemo';
import { TeacherReportModal } from '../components/common/TeacherReportModal';
import { VideoModal } from '../components/common/VideoModal';
import { CMS_TEACHERS } from '../config/siteConfig';
import {
  Sparkles,
  ShieldCheck,
  Clock,
  MessageSquare,
  Users,
  Play,
  FileText,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface ParentsPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const ParentsPage: React.FC<ParentsPageProps> = ({ onOpenTrialModal }) => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const parentFaqs = [
    {
      q: 'هل ابني لازم يكون بعرف عبري قبل ما يبدأ؟',
      a: 'لا، أبدًا! المدرس ببدأ مع الطفل من مستواه الحالي بالتدريج. حتى لو ما بعرف غير كلمات بسيطة أو بعرفش يحكي، الحصة مخصصة لكسر الخوف بدون أي إحراج.',
    },
    {
      q: 'كم عمر الأطفال المناسب لهالحصص؟',
      a: 'المسار الأساسي مصمم ومدروس خصيصًا للأطفال واليافعين من عمر 9 إلى 14 سنة، وهي المرحلة الأهم لبناء ثقة التحدث قبل الثانوية.',
    },
    {
      q: 'قدّيش مدة الحصة وليه اخترتوا 25 دقيقة؟',
      a: 'مدة الحصة 25 دقيقة لأنها المدة المثالية عالمياً للحفاظ على أعلى درجات تركيز الطفل ونشاطه التفاعلي 1:1 بدون ملل أو إرهاق ذهني.',
    },
    {
      q: 'إذا عندي ولدين، هل لكل طفل حصة تجريبية مجانية؟',
      a: 'نعم! كل طفل جديد في العائلة إله حصته التجريبية المجانية المستقلة 1:1 ليتعرف على أسلوب المدرس.',
    },
    {
      q: 'هل ممكن نبدّل المدرس إذا ما ناسب أسلوبه طفلي؟',
      a: 'نعم بكل مرونة وسهولة. فريق الدعم على واتساب بساعدك تجرّب مدرّس ثاني حسب المواعيد المتوفرة.',
    },
    {
      q: 'كيف بتابع تقدّم طفلي وشو بصير بالحصة؟',
      a: 'بعد كل حصة بكتب المدرس تقريراً وملاحظات توضح ما تم التدريب عليه، نقاط القوة، والهدف للحصة القادمة.',
    },
  ];

  const childTeachers = CMS_TEACHERS.filter((t) => t.audiences.includes('child'));

  return (
    <div className="relative overflow-hidden text-right">
      {/* SECTION 1: Flagship Hero (With Signature Staggered Animation & Floating Badges) */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-[#F7F9F6] border-b border-slate-200/80">
        <AnimatedConversationalArc opacity={0.14} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Right: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <FadeIn direction="down" duration={0.4}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold border border-[#118F86]/20">
                  <PulseBeacon color="#118F86" size={7} />
                  <span>تعليم العبرية للأطفال من عمر 9 إلى 14 سنة</span>
                </div>
              </FadeIn>

              {/* H1 Main Value Headline */}
              <FadeIn direction="up" delay={0.1} duration={0.55}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#16344B] leading-[1.25] tracking-tight">
                  ابنك بفهم عبري شوي… <br />
                  <span className="text-[#118F86] relative inline-block">
                    بس بتلبّك وقت الحكي؟
                  </span>
                </h1>
              </FadeIn>

              {/* Description */}
              <FadeIn direction="up" delay={0.2} duration={0.5}>
                <p className="text-base sm:text-lg text-[#566974] leading-relaxed max-w-2xl">
                  مع NovaTova منساعده يتدرّب على العبرية بحصص فردية خاصة <strong>25 دقيقة</strong> عبر الإنترنت،
                  مع <strong>مدرّس مباشر وصبور</strong>، وشرح بالعربي عند الحاجة — ليتعلّم على مهله ويحكي بثقة وبدون ضغط.
                </p>
              </FadeIn>

              {/* Primary Action & Secondary Preview */}
              <FadeIn direction="up" delay={0.3} duration={0.45}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenTrialModal('parents-hero-primary')}
                    className="bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-accent flex items-center justify-center gap-2.5 transition-all tap-target-min relative overflow-hidden group"
                  >
                    <Sparkles size={18} className="text-[#FFC77A] group-hover:rotate-12 transition-transform" />
                    <span>احجز حصة مجانية لطفلك</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setVideoModalOpen(true)}
                    className="bg-white hover:bg-slate-50 text-[#16344B] border border-slate-300 text-sm font-bold px-5 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all tap-target-min shadow-xs"
                  >
                    <Play size={16} className="text-[#118F86] fill-[#118F86]" />
                    <span>شوف كيف بتكون الحصة (فيديو)</span>
                  </motion.button>
                </div>
              </FadeIn>

              {/* Truthful Trial Handoff Guarantee */}
              <FadeIn direction="up" delay={0.4} duration={0.4}>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#566974] pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck size={16} className="text-[#118F86]" />
                    <span>الحصة الأولى مجانية 100% بدون بطاقة ائتمان</span>
                  </span>
                  <span>•</span>
                  <span>ترتيب الموعد بتم بسهولة على واتساب مع فريقنا</span>
                </div>
              </FadeIn>
            </div>

            {/* Left: Alive Lesson Experience Mockup with Floating Elements */}
            <div className="lg:col-span-5 relative">
              <FadeIn direction="left" delay={0.2} duration={0.6}>
                <div className="relative">
                  <HeroFloatingElements />

                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-lifted relative z-10">
                    <div className="aspect-4/3 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/80 overflow-hidden relative flex flex-col justify-between p-5">
                      {/* Top Header of Lesson Frame */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PulseBeacon color="#118F86" size={8} />
                          <span className="text-xs font-bold text-[#16344B]">حصة مباشرة 1:1</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#118F86] bg-[#E8F5F4] px-2.5 py-1 rounded-full">
                          25 دقيقة تفاعل
                        </span>
                      </div>

                      {/* Lesson Simulation Content */}
                      <div className="text-center py-2 space-y-2">
                        <span className="text-xs text-slate-400 font-medium">سياق المحادثة المباشرة:</span>
                        <h4 className="text-lg font-bold text-[#16344B]">
                          "איך היה היום בבית הספר?"
                        </h4>
                        <p className="text-xs text-[#566974]">
                          المعلم يسأل بلطف، والطفل يركّب الجملة بدون قلق.
                        </p>
                      </div>

                      {/* Interactive Audio Wave Simulation */}
                      <AudioWaveSimulator />
                    </div>

                    {/* Staging Notice */}
                    <div className="mt-3">
                      <StagingAssetBadge
                        label="بيئة الدرس الفردي — مادة تفاعلية مخصصة"
                        note="تُستبدل بمواد فيديو حقيقية معتمدة بموافقة كتابية من أولياء الأمور قبل النشر."
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Near-Hero Trust Strip (Animated Stagger) */}
      <section className="bg-white py-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
            <StaggerItem>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#E8F5F4] text-[#118F86] flex items-center justify-center shrink-0 shadow-2xs">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#16344B]">مدرّس مباشر إله لحاله</h4>
                  <p className="text-xs text-[#566974] mt-0.5">حصة خاصة 1:1 مش صف جماعي</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF6E9] text-[#E5A54F] flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#16344B]">25 دقيقة تركيز ممتع</h4>
                  <p className="text-xs text-[#566974] mt-0.5">مدة مدروسة لتجنب ملل الطفل</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#E8F5F4] text-[#118F86] flex items-center justify-center shrink-0 shadow-2xs">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#16344B]">شرح وتوضيح بالعربي</h4>
                  <p className="text-xs text-[#566974] mt-0.5">المدرس يفهم الطفل ويشرح له بهدوء</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#F0FDF4] text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#16344B]">مرونة تبديل المدرس</h4>
                  <p className="text-xs text-[#566974] mt-0.5">حسب المواعيد وتوافق شخصية الطفل</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 3: Parent Pain Points (عارفين شو بقلق الأهل) */}
      <section className="py-16 md:py-24 bg-[#F7F9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#118F86] uppercase tracking-wider block mb-1">
              واقع حقيقي بنسمعه يومياً
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              عارفين شو بقلق الأهل في موضوع العبري
            </h2>
            <p className="text-sm text-[#566974] mt-2 leading-relaxed">
              كثير أطفال بالداخل عندهم مخزون كلمات، لكن المشكلة مش بالحفظ… المشكلة بفرصة الممارسة الآمنة.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <InteractiveHoverCard className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-right h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 font-bold flex items-center justify-center text-base mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-base text-[#16344B] mb-2">بفهم… بس ما بحكي</h3>
                  <p className="text-xs text-[#566974] leading-relaxed">
                    الطفل بفهم لما المعلم يحكي، بس أول ما يطلب منه يجاوب بتلبّك وبتراجع خوفاً من الخطأ أو الضحك.
                  </p>
                </div>
              </InteractiveHoverCard>
            </StaggerItem>

            <StaggerItem>
              <InteractiveHoverCard className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-right h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center text-base mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-base text-[#16344B] mb-2">المدرسة لحالها مش كفاية</h3>
                  <p className="text-xs text-[#566974] leading-relaxed">
                    بالصف بكون فيه 30 طالب، ووقت الحصة ما بكفي ليتدرّب كل طفل على جمل كاملة ومحادثة حية.
                  </p>
                </div>
              </InteractiveHoverCard>
            </StaggerItem>

            <StaggerItem>
              <InteractiveHoverCard className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-right h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 font-bold flex items-center justify-center text-base mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-base text-[#16344B] mb-2">بدنا مدرّس صبور يفهمه</h3>
                  <p className="text-xs text-[#566974] leading-relaxed">
                    مش مجرد معلّم يلقي الدرس، بل شخص يعطي الطفل وقته ويشجعه حتى لو نطق الكلمة غلط 3 مرات.
                  </p>
                </div>
              </InteractiveHoverCard>
            </StaggerItem>

            <StaggerItem>
              <InteractiveHoverCard className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-right h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-base mb-4">
                    4
                  </div>
                  <h3 className="font-bold text-base text-[#16344B] mb-2">بدي أشوف تقدّمه بوضوح</h3>
                  <p className="text-xs text-[#566974] leading-relaxed">
                    بدل ما يضيع وقت بالدروس بدون ما نعرف شو اتعلم، بنقدّم تقرير واضح بعد الحصة يبيّن شو اتدرّب عليه.
                  </p>
                </div>
              </InteractiveHoverCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 4: The Mechanism (هيك منساعد الطفل يتقدّم) */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              هيك منساعد طفلك يتقدّم في 4 خطوات واضحة
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              كل الحجز بتم بمساعدة فريقنا على واتساب وبدون تعقيدات تقنية
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6 text-right">
            {[
              { num: '01', title: 'منعرف المستوى والهدف', desc: 'بتحكيلنا شو عمر طفلك، وشو أكبر صعوبة بواجهها (المحادثة، القراءة، أو مادة المدرسة).' },
              { num: '02', title: 'منحجز حصة تجريبية مجانية', desc: 'فريقنا بساعدك بموعد مناسب حسب جدولكم، وببعتلك رابط الدخول المباشر.' },
              { num: '03', title: 'الطفل بتدرّب على الحكي', desc: '25 دقيقة كاملة مع المدرس، حوارات ومواقف تفاعلية بدون مقاطعة أو توتر.' },
              { num: '04', title: 'بنتابع معكم وبتقرروا', desc: 'بتستلموا تقرير المدرس، وإنتوا بتقرروا إذا حابين تكملوا بباقة مناسبة أو لأ.' },
            ].map((st, i) => (
              <StaggerItem key={i}>
                <InteractiveHoverCard className="p-6 rounded-3xl bg-[#F7F9F6] border border-slate-200 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-2xl font-black text-[#118F86] font-mono block mb-2">{st.num}</span>
                    <h3 className="font-bold text-base text-[#16344B] mb-2">{st.title}</h3>
                    <p className="text-xs text-[#566974] leading-relaxed">{st.desc}</p>
                  </div>
                </InteractiveHoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenTrialModal('parents-mechanism-cta')}
              className="bg-[#118F86] hover:bg-[#0E736C] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-2xl shadow-accent inline-flex items-center gap-2 tap-target-min"
            >
              <Sparkles size={16} />
              <span>ابدأ بحجز الحصة المجانية الآن</span>
            </motion.button>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 5: Teachers Showcase */}
      <section id="lesson-preview" className="py-16 md:py-24 bg-[#F7F9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#118F86] block mb-1">شفافية كاملة</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
                مين رح يعلّم طفلك؟ تعرّف على أسلوب المدرسين
              </h2>
            </div>
            <Link
              to="/teachers"
              className="text-xs font-bold text-[#118F86] hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              <span>دليل المدرسين المعتمدين بالمنصة</span>
              <ArrowRight size={14} className="rotate-180" />
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {childTeachers.map((teacher) => (
              <InteractiveHoverCard
                key={teacher.slug}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft text-right flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#E8F5F4] text-[#118F86] font-bold flex items-center justify-center text-lg shadow-2xs">
                        {teacher.firstName[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#16344B]">
                          المعلّمة {teacher.firstName}
                        </h3>
                        <span className="text-xs text-[#566974]">
                          متخصصة بتعليم الأطفال واليافعين (9–14)
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                      <PulseBeacon color="#146D58" size={6} />
                      <span>متاحة للحصص</span>
                    </span>
                  </div>

                  <p className="text-xs text-[#566974] leading-relaxed mb-4">
                    {teacher.fullBio}
                  </p>

                  <div className="bg-[#F7F9F6] p-3 rounded-2xl border border-slate-200 text-xs text-[#16344B] mb-4">
                    <strong>الأسلوب التعليمي: </strong>
                    <span className="text-[#566974]">{teacher.approach}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenTrialModal(`parents-teacher-${teacher.slug}`)}
                    className="flex-1 py-2.5 bg-[#118F86] text-white text-xs font-bold rounded-xl hover:bg-[#0E736C] transition-colors"
                  >
                    اسأل عن حصة تجريبية مع {teacher.firstName}
                  </motion.button>
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="px-3.5 py-2.5 bg-slate-100 text-[#16344B] text-xs font-semibold rounded-xl hover:bg-slate-200"
                    title="مشاهدة أسلوب الحصة"
                  >
                    معاينة الأسلوب
                  </button>
                </div>
              </InteractiveHoverCard>
            ))}
          </div>

          <StagingAssetBadge
            label="معلومات المدرسين مبنية على ملفات معتمدة"
            note="لا نستخدم صوراً مستعارة من الإنترنت أو تقييمات نجوم وهمية تضلل أولياء الأمور."
          />
        </div>
      </section>

      {/* SECTION 6: Teacher Report Sample Snapshot */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="bg-gradient-to-br from-[#F7F9F6] to-[#EAF1F2] rounded-3xl p-6 sm:p-10 border border-slate-200 text-right">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <span className="text-xs font-bold text-[#118F86] bg-white px-2.5 py-1 rounded-full border border-slate-200">
                    متابعة واضحة تطمّن الأهل
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
                    مش بس حصة… كمان تقرير واضح بعد كل درس
                  </h2>
                  <p className="text-xs sm:text-sm text-[#566974] leading-relaxed">
                    بعد ما يخلّص طفلك الحصة، المعلم بكتب ملاحظات حقيقية تشمل شو اتدرّبوا عليه،
                    نقاط القوة، وتوصية المتابعة، لتكون دايماً بالصورة وتشوف أثر الحصص على ثقته.
                  </p>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setReportModalOpen(true)}
                      className="bg-[#16344B] hover:bg-[#132B36] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl inline-flex items-center gap-2 transition-colors"
                    >
                      <FileText size={16} />
                      <span>شوف نموذج تقرير المدرس الحقيقي</span>
                    </motion.button>
                  </div>
                </div>

                {/* Animated Report Card Mock */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="w-full md:w-72 bg-white rounded-3xl p-5 border border-slate-200 shadow-md text-xs space-y-3 shrink-0"
                >
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-bold text-[#16344B]">تقرير حصة العبرية</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      تمت الحصة
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="text-slate-500">الطالب: آدم (11 سنة)</div>
                    <div className="font-medium text-[#16344B]">التدريب: جمل المحادثة اليومية</div>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-900 text-[10px] leading-relaxed">
                    "آدم تشجع وصار يحكي جملة كاملة بدون تردد بآخر 10 دقائق..."
                  </div>
                  <div className="text-[10px] text-slate-400 text-center font-medium">
                    اضغط الزر للمعاينة الكاملة
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 7: Family Wallet Simulator */}
      <section id="family-wallet" className="py-16 md:py-24 bg-[#F7F9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              عندك أكثر من طفل؟ باقة واحدة بتكفي العيلة
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              وزّع الحصص بين أولادك من نفس الحساب وبدون اشتراكات منفصلة
            </p>
          </FadeIn>

          <FamilyWalletDemo />
        </div>
      </section>

      {/* SECTION 8: Pricing Guidance */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#118F86] block mb-1">
              وضوح وشفافية بالأسعار
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              منبدأ بحصة مجانية، وبعدها منرشحلك الخطة الأنسب
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              ما في أي داعي لاختيار باقة أو دفع أي شيكل قبل ما تجرّبوا الحصة وتشوفوا أسلوب المدرس.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
            {/* 15 Sessions Pack */}
            <InteractiveHoverCard className="bg-[#F7F9F6] rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft text-right flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 block mb-1">باقة البداية والتجربة</span>
                <h3 className="text-xl font-bold text-[#16344B]">15 حصة × 25 دقيقة</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#16344B] font-mono">390 ₪</span>
                  <span className="text-xs text-[#566974] mr-2">(26 ₪ للحصة الواحدة)</span>
                </div>

                <ul className="space-y-2.5 text-xs text-[#566974] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#118F86] shrink-0" />
                    <span>حصص خاصة 1:1 مخصصة لطفلك بالكامل</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#118F86] shrink-0" />
                    <span>مشاركة الرصيد بين الأخوة لحساب العائلة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#118F86] shrink-0" />
                    <span>تقارير متابعة دورية من المعلم</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenTrialModal('parents-pack-15')}
                className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-300 text-[#16344B] text-xs font-bold rounded-2xl transition-colors"
              >
                اسأل عن باقة 15 حصة بعد التجربة
              </button>
            </InteractiveHoverCard>

            {/* 25 Sessions Core Pack */}
            <InteractiveHoverCard className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#118F86] shadow-lifted text-right relative flex flex-col justify-between ring-4 ring-[#118F86]/10">
              <div className="absolute -top-3.5 right-6 bg-[#118F86] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                الخيار الأكثر توازناً للتقدّم
              </div>

              <div>
                <span className="text-xs font-bold text-[#118F86] block mb-1">باقة التقدّم المستمر</span>
                <h3 className="text-xl font-bold text-[#16344B]">25 حصة × 25 دقيقة</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#118F86] font-mono">600 ₪</span>
                  <span className="text-xs text-[#566974] mr-2">(24 ₪ للحصة الواحدة — توفير أكبر)</span>
                </div>

                <ul className="space-y-2.5 text-xs text-[#566974] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#118F86] shrink-0" />
                    <span>25 حصة فردية 1:1 لبناء طلاقة مستدامة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#118F86] shrink-0" />
                    <span>حرية كاملة في توزيع الرصيد العائلي</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#118F86] shrink-0" />
                    <span>مرونة في اختيار المواعيد وتبديل المدرس</span>
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenTrialModal('parents-pack-25')}
                className="w-full py-3.5 bg-[#118F86] hover:bg-[#0E736C] text-white text-xs font-bold rounded-2xl shadow-accent transition-colors"
              >
                احجز الحصة المجانية أولاً
              </motion.button>
            </InteractiveHoverCard>
          </div>

          <div className="text-center">
            <Link
              to="/pricing"
              className="text-xs font-bold text-[#118F86] hover:underline inline-flex items-center gap-1"
            >
              <span>اطّلع على جدول الباقات الكامل وحصص الـ 55 دقيقة</span>
              <ArrowRight size={14} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQs with Smooth Animated Transitions */}
      <section className="py-16 md:py-24 bg-[#F7F9F6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-right">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              أسئلة بتهم الأهل قبل أول حصة
            </h2>
            <p className="text-xs sm:text-sm text-[#566974] mt-2">
              كل الإجابات واضحة وبدون وعود تجارية مبالغ فيها
            </p>
          </FadeIn>

          <div className="space-y-3">
            {parentFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-right font-bold text-sm text-[#16344B] flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                  aria-expanded={openFaqIndex === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#118F86] shrink-0 transition-transform duration-200 ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 pt-0 text-xs text-[#566974] leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-8 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
            <span>عندك سؤال إضافي مش موجود هون؟</span>
            <Link to="/faq" className="font-bold text-[#118F86] hover:underline">
              تصفح كل الأسئلة (28 سؤال) ←
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10: Final Flagship CTA */}
      <section className="py-16 md:py-24 bg-[#16344B] text-white relative">
        <AnimatedConversationalArc opacity={0.16} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-2">
              <Sparkles size={14} />
              <span>ابدأ بخطوة صغيرة اليوم</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              خلّينا نبدأ من مستوى طفلك… ونبنيله ثقة حقيقية بالعبري
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mt-2">
              حصة تجريبية مجانية 25 دقيقة، بدون أي بطاقة دفع أو التزام. فريقنا على واتساب برتّب الموعد
              معك بكل سهولة.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenTrialModal('parents-final-cta')}
                className="w-full sm:w-auto bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-accent flex items-center justify-center gap-2 tap-target-min transition-all"
              >
                <Sparkles size={18} />
                <span>احجز حصة مجانية لطفلك الآن</span>
              </motion.button>

              <a
                href="https://wa.me/972500000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20NovaTova%D8%8C%20%D8%AD%D8%A7%D8%A8%D8%A8%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%AD%D8%B5%D8%B5%20%D8%A7%D9%84%D8%B9%D8%A8%D8%B1%D9%8A%20%D9%84%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all tap-target-min"
              >
                <MessageSquare size={16} />
                <span>اسألنا على واتساب مباشرة</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Modals */}
      <TeacherReportModal isOpen={reportModalOpen} onClose={() => setReportModalOpen(false)} />
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  );
};
