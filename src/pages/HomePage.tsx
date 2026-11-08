import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedConversationalArc, HeroFloatingElements, AudioWaveSimulator } from '../components/motion/SignatureElements';
import { FadeIn, StaggerContainer, StaggerItem, InteractiveHoverCard, PulseBeacon } from '../components/motion/MotionWrapper';
import { FamilyWalletDemo } from '../components/common/FamilyWalletDemo';
import { TestimonialsCarousel } from '../components/common/TestimonialsCarousel';
import { VideoModal } from '../components/common/VideoModal';
import { StagingAssetBadge } from '../components/common/BrandMotif';
import {
  Sparkles,
  Users,
  ChevronDown,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

interface HomePageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenTrialModal }) => {
  const [selectedAudience, setSelectedAudience] = useState<'child' | 'self' | 'unsure'>('child');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const homeFaqs = [
    {
      q: 'هل الحصة الأولى مجانية؟',
      a: 'آه، في حصة تجريبية مجانية لكل طالب جديد، وبنساعدك نحجزها على واتساب بدون أي التزام مالي مسبق.',
    },
    {
      q: 'كيف بنختار المدرس المناسب؟',
      a: 'بنسمع هدفك ومستواك ومواعيدك، ومنقترح مدرس مناسب من فريقنا حسب التوفّر.',
    },
    {
      q: 'في مجال أغيّر المدرس إذا ما ارتحت لأسلوبه؟',
      a: 'آه، بتقدر تطلب تغيير المدرس بكل بساطة، وبنساعدك تختار بديل حسب المواعيد المتاحة.',
    },
    {
      q: 'كيف بتم الحجز؟',
      a: 'بتبعثلنا رسالة، وفريق الحجز بجهّز حساب الطالب وموعد الحصة معك خطوة بخطوة.',
    },
  ];

  return (
    <div className="relative overflow-hidden text-right">
      {/* H02: Hero Above the Fold with Staggered Motion */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-[#F7F9F6] border-b border-slate-200/80">
        <AnimatedConversationalArc opacity={0.14} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <FadeIn direction="down">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold border border-[#118F86]/20">
                  <PulseBeacon color="#118F86" size={7} />
                  <span>تعلّم شخصي. ثقة حقيقية.</span>
                </div>
              </FadeIn>

              {/* H1 */}
              <FadeIn direction="up" delay={0.1} duration={0.55}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#16344B] leading-[1.25] tracking-tight">
                  لغة جديدة بتفتحلك فرص جديدة. <br />
                  <span className="text-[#118F86]">تعلّم على مهلك… واحكي بثقة.</span>
                </h1>
              </FadeIn>

              {/* Description */}
              <FadeIn direction="up" delay={0.2} duration={0.5}>
                <p className="text-base sm:text-lg text-[#566974] leading-relaxed max-w-2xl">
                  مع NovaTova بتتعلّم <strong>العبرية</strong>، <strong>الإنجليزية</strong>، <strong>الألمانية</strong> أو <strong>الفرنسية</strong> بحصص خاصة أونلاين <strong>1:1</strong>،
                  مع مدرس مباشر وخطة حسب عمرك ومستواك وهدفك.
                </p>
              </FadeIn>

              {/* Interactive Segmented Question */}
              <FadeIn direction="up" delay={0.25} duration={0.45}>
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-md">
                  <span className="text-xs font-bold text-[#16344B] block mb-2">مين حابب يتعلّم؟</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'child', label: 'طفلي (9–14)' },
                      { id: 'self', label: 'أنا' },
                      { id: 'unsure', label: 'مش متأكد' },
                    ].map((tab) => (
                      <motion.button
                        key={tab.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedAudience(tab.id as any)}
                        className={`py-2 px-1 text-xs font-bold rounded-xl transition-all ${
                          selectedAudience === tab.id
                            ? 'bg-[#118F86] text-white shadow-xs'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {tab.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* CTAs */}
              <FadeIn direction="up" delay={0.3} duration={0.45}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenTrialModal(`home-hero-${selectedAudience}`)}
                    className="bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-accent flex items-center justify-center gap-2 tap-target-min transition-all relative overflow-hidden group"
                  >
                    <Sparkles size={18} className="text-[#FFC77A] group-hover:rotate-12 transition-transform" />
                    <span>
                      {selectedAudience === 'child'
                        ? 'احجز حصة مجانية لطفلك'
                        : selectedAudience === 'self'
                        ? 'احجز حصة مجانية إلك'
                        : 'احجز حصة مجانية واستشرنا'}
                    </span>
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#audiences"
                    className="bg-white hover:bg-slate-50 text-[#16344B] border border-slate-300 text-sm font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all tap-target-min shadow-xs"
                  >
                    <span>اكتشف المسارات</span>
                    <ChevronDown size={16} />
                  </motion.a>
                </div>
              </FadeIn>

              {/* Trust Chips */}
              <FadeIn direction="up" delay={0.4} duration={0.4}>
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#566974] pt-2">
                  <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-medium">حصص 1:1 خاصة</span>
                  <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-medium">مواعيد مرنة</span>
                  <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-medium">متابعة بعد الحصة</span>
                  <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-medium">شرح بالعربي عند الحاجة</span>
                </div>
              </FadeIn>
            </div>

            {/* Right: Alive Lesson Illustration */}
            <div className="lg:col-span-5 relative">
              <FadeIn direction="left" delay={0.2} duration={0.6}>
                <div className="relative">
                  <HeroFloatingElements />

                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-lifted relative z-10">
                    <div className="aspect-4/3 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex flex-col justify-between p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PulseBeacon color="#118F86" size={8} />
                          <span className="text-xs font-bold text-[#16344B]">حصة تفاعلية حية</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#118F86] bg-[#E8F5F4] px-2.5 py-1 rounded-full">
                          تدريب 1:1 مخصص
                        </span>
                      </div>

                      <div className="text-center py-2 space-y-2">
                        <span className="text-xs text-slate-400 font-medium">موقف المحادثة:</span>
                        <h4 className="text-lg font-bold text-[#16344B]">
                          "שלום! נעים להכיר אותך"
                        </h4>
                        <p className="text-xs text-[#566974]">
                          تدريب هادئ يشجع الطالب على التحدث دون خوف.
                        </p>
                      </div>

                      <AudioWaveSimulator />
                    </div>

                    <div className="mt-3">
                      <StagingAssetBadge
                        label="بيئة الدرس التفاعلي 1:1"
                        note="تُستبدل بمواد فيديو حقيقية معتمدة بموافقة كتابية من أولياء الأمور."
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* H03: Audience Selector */}
      <section id="audiences" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#118F86] block mb-1">مسارات مخصصة</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              كل طالب إله طريقته. خلّينا نلاقي طريقك.
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              اختار لمين الحصص، ومنفرجيك المسار الأنسب
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Child Card */}
            <StaggerItem>
              <InteractiveHoverCard className="bg-[#F7F9F6] p-7 rounded-3xl border-2 border-[#118F86] shadow-soft text-right flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-bold text-[#118F86] bg-[#E8F5F4] px-2.5 py-1 rounded-md inline-block mb-3">
                    المسار الأساسي الرائد ★
                  </span>
                  <h3 className="text-xl font-bold text-[#16344B] mb-2">لطفلي (9–14 سنة)</h3>
                  <p className="text-xs text-[#566974] leading-relaxed mb-6">
                    حصة قصيرة 25 دقيقة، مدرّس صبور يراعي عمره وخجله، وشرح بالعربي لطمأنته ومتابعة واضحة تطمّن الأهل.
                  </p>
                </div>
                <Link
                  to="/for-parents"
                  className="w-full py-3 bg-[#118F86] text-white text-xs font-bold rounded-2xl text-center block hover:bg-[#0E736C] transition-colors shadow-accent"
                >
                  اكتشف تعليم الأطفال (صفحة الأهل) ←
                </Link>
              </InteractiveHoverCard>
            </StaggerItem>

            {/* Adult Card */}
            <StaggerItem>
              <InteractiveHoverCard className="bg-white p-7 rounded-3xl border border-slate-200 shadow-soft text-right flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md inline-block mb-3">
                    تعلّم شخصي
                  </span>
                  <h3 className="text-xl font-bold text-[#16344B] mb-2">إلي (كبار ومحادثة)</h3>
                  <p className="text-xs text-[#566974] leading-relaxed mb-6">
                    فاهم اللغة بس بتلبّك وقت الحكي؟ تدرّب على محادثات واقعية ومواقف يومية حسب مستواك وهدفك بدون إحراج.
                  </p>
                </div>
                <Link
                  to="/for-adults"
                  className="w-full py-3 bg-slate-100 text-[#16344B] hover:bg-slate-200 text-xs font-bold rounded-2xl text-center block transition-colors"
                >
                  تعلّم للكبار ←
                </Link>
              </InteractiveHoverCard>
            </StaggerItem>

            {/* Work Card */}
            <StaggerItem>
              <InteractiveHoverCard className="bg-white p-7 rounded-3xl border border-slate-200 shadow-soft text-right flex flex-col justify-between h-full opacity-95">
                <div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md inline-block mb-3">
                    مسار تجريبي
                  </span>
                  <h3 className="text-xl font-bold text-[#16344B] mb-2">للشغل والمقابلات</h3>
                  <p className="text-xs text-[#566974] leading-relaxed mb-6">
                    تدرّب على مواقف الشغل، المقابلات الرسمية، والمكالمات بالعبرية حسب توفر المدرسين المتخصصين.
                  </p>
                </div>
                <Link
                  to="/for-work"
                  className="w-full py-3 bg-slate-100 text-[#16344B] hover:bg-slate-200 text-xs font-bold rounded-2xl text-center block transition-colors"
                >
                  اكتشف المسار المهني ←
                </Link>
              </InteractiveHoverCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* H04: Language Cards */}
      <section id="languages" className="py-16 md:py-24 bg-[#F7F9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              أي لغة بدك تتعلّم؟
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              كل اللغات بتعتمد على حصص فردية 1:1 مخصصة لمستواك
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'hebrew',
                title: 'العبرية',
                badge: 'المسار الأساسي',
                desc: 'مدرسة، شغل، ومواقف يومية بثقة كاملة وبدون خجل.',
                path: '/languages/hebrew',
                isPrimary: true,
              },
              {
                id: 'english',
                title: 'الإنجليزية',
                desc: 'من الأساسيات للمحادثة بثقة وتقوية النطق.',
                path: '/languages/english',
              },
              {
                id: 'german',
                title: 'الألمانية',
                desc: 'تعلّم من مستواك وبالوتيرة اللي بتناسبك بهدوء.',
                path: '/languages/german',
              },
              {
                id: 'french',
                title: 'الفرنسية',
                desc: 'تعلّم عملي وخطوات واضحة لتواصل ونطق أفضل.',
                path: '/languages/french',
              },
            ].map((lang) => (
              <StaggerItem key={lang.id}>
                <Link to={lang.path} className="block h-full group">
                  <InteractiveHoverCard
                    className={`p-6 rounded-3xl shadow-soft transition-all text-right h-full flex flex-col justify-between ${
                      lang.isPrimary
                        ? 'bg-white border-2 border-[#118F86] ring-4 ring-[#118F86]/10'
                        : 'bg-white border border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-[#16344B] group-hover:text-[#118F86] transition-colors">
                          {lang.title}
                        </span>
                        {lang.badge && (
                          <span className="text-[10px] font-bold text-[#118F86] bg-[#E8F5F4] px-2 py-0.5 rounded">
                            {lang.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#566974] mb-4 leading-relaxed">{lang.desc}</p>
                    </div>

                    <span className="text-xs font-bold text-[#118F86] flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                      <span>استكشف المسار</span>
                      <ArrowRight size={13} className="rotate-180" />
                    </span>
                  </InteractiveHoverCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* H08: Family Wallet Spotlight */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              عندك أكثر من طفل؟ الرصيد بإيدك.
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              بتقدر تشتري باقة من حساب ولي الأمر وتوزّع الحصص بين أولادك، حسب احتياج كل واحد.
            </p>
          </FadeIn>

          <FamilyWalletDemo />
        </div>
      </section>

      {/* H11: Interactive Testimonials Carousel */}
      <section className="py-16 md:py-24 bg-[#F7F9F6] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#118F86] block mb-1">
              تجارب بتخلّينا نكمل
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              اسمع من أهالي وطلاب شاركونا رحلتهم
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              قصص وتجارب حقيقية موثقة بموافقة أصحابها الكاملة
            </p>
          </FadeIn>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* H12: FAQ Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-right">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              عندك أسئلة؟ إجابات سريعة
            </h2>
          </FadeIn>

          <div className="space-y-3">
            {homeFaqs.map((faq, idx) => (
              <div key={idx} className="bg-[#F7F9F6] rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-right font-bold text-sm text-[#16344B] flex items-center justify-between gap-3 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#118F86] transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}
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
                      <div className="p-4 sm:p-5 pt-0 text-xs text-[#566974] leading-relaxed border-t border-slate-200/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/faq" className="text-xs font-bold text-[#118F86] hover:underline">
              شوف كل الأسئلة الشائعة (28 سؤال) ←
            </Link>
          </div>
        </div>
      </section>

      {/* H13: Final CTA */}
      <section className="py-16 md:py-24 bg-[#16344B] text-white relative">
        <AnimatedConversationalArc opacity={0.16} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <FadeIn>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              جاهز تبدأ؟ جرّب حصة مجانية أولًا.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mt-2">
              احكيلنا مين بدّه يتعلّم وشو هدفه، ومنكمّل معك خطوة بخطوة عبر محادثة ودية مع فريقنا.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenTrialModal('home-footer-cta')}
                className="w-full sm:w-auto bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-accent flex items-center justify-center gap-2 tap-target-min transition-all"
              >
                <Sparkles size={18} />
                <span>احجز حصة مجانية الآن</span>
              </motion.button>

              <a
                href="https://wa.me/972500000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20NovaTova%D8%8C%20%D8%B9%D9%86%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%AD%D8%B5%D8%B5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all tap-target-min"
              >
                <MessageCircle size={16} />
                <span>اسألنا على واتساب</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  );
};
