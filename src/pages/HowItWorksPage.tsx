import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AnimatedConversationalArc } from '../components/motion/SignatureElements';
import { FadeIn, StaggerContainer, StaggerItem, InteractiveHoverCard, PulseBeacon } from '../components/motion/MotionWrapper';

interface HowItWorksPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onOpenTrialModal }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: 'احكيلنا هدفك ومستواك',
      short: 'طفل أو كبير، العمر واللغة والهدف الأساسي.',
      details:
        'بتبعثلنا رسالة سريعة بتوضح فيها مين حابب يتعلم (طفل أو كبير)، عمره، اللغة المطلوبة، وأكبر تحدي بواجهه حالياً (خجل، قواعد، محادثة).',
    },
    {
      num: 2,
      title: 'منحجز حصة تجريبية مجانية',
      short: 'فريقنا بساعدك تختار الوقت والمدرس المناسب.',
      details:
        'مستشار NovaTova براجع المواعيد المتاحة ويقترح عليك موعد مناسب ومدرس صبور يناسب شخصية الطالب، وببعتلك رابط الدخول بدون تعقيد.',
    },
    {
      num: 3,
      title: 'جرّبوا الحصة وتعرّفوا على المدرس',
      short: 'حصة فردية مباشرة 1:1، والمدرس بوثّق ملاحظاته.',
      details:
        'الطفل بدخل الحصة (25 دقيقة)، بتفاعل مع المدرس، وبنهاية الحصة بكتب المدرس تقريراً يوضح شو اتدرّبوا عليه ونقاط القوة والخطوة القادمة.',
    },
    {
      num: 4,
      title: 'اختاروا الخطة المناسبة براحتكم',
      short: 'بعد التجربة، الفريق بشرحلك الخيارات وإنت بتقرّر.',
      details:
        'بناءً على رأي الطالب وتوصية المعلم، منقترح الباقة الأنسب (15 أو 25 حصة أو باقة العائلة)، بدون أي إلحاح أو إلزام مالي مسبق.',
    },
  ];

  return (
    <div className="relative overflow-hidden text-right">
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-[#F7F9F6] border-b border-slate-200">
        <AnimatedConversationalArc opacity={0.12} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
              <PulseBeacon color="#118F86" size={7} />
              <span>رحلة تعليمية واضحة ومريحة</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
              من أول رسالة لأول حصة… كل شي واضح
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-[#566974] max-w-2xl mx-auto leading-relaxed">
              مش لازم تعمل حساب وتختار المدرس لحالك أو تحتار بالخطوات. فريقنا البشري على واتساب
              بساعدك خطوة بخطوة.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Interactive 4 Steps Accordion with Animated Connector Line */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          {/* Animated Connecting Timeline Beam */}
          <div className="space-y-4">
            {steps.map((st) => (
              <motion.div
                key={st.num}
                layout
                className={`rounded-3xl border transition-all text-right overflow-hidden ${
                  activeStep === st.num
                    ? 'border-[#118F86] bg-[#F7F9F6] shadow-lifted ring-4 ring-[#118F86]/10'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveStep(st.num)}
                  className="w-full p-5 sm:p-7 flex items-center justify-between gap-4 text-right"
                  aria-expanded={activeStep === st.num}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{
                        scale: activeStep === st.num ? [1, 1.08, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-12 h-12 rounded-2xl font-black text-base flex items-center justify-center shrink-0 ${
                        activeStep === st.num
                          ? 'bg-[#118F86] text-white shadow-accent'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {st.num}
                    </motion.div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-[#16344B]">
                        {st.title}
                      </h3>
                      <p className="text-xs text-[#566974] mt-0.5">{st.short}</p>
                    </div>
                  </div>

                  <ChevronDown
                    size={20}
                    className={`text-[#118F86] transition-transform duration-200 ${
                      activeStep === st.num ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeStep === st.num && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-0 text-xs sm:text-sm text-[#566974] leading-relaxed border-t border-slate-200/60 pt-4">
                        <p>{st.details}</p>
                        <div className="mt-5 pt-3 flex items-center justify-between border-t border-slate-200">
                          <span className="text-xs text-slate-400 font-medium">
                            الخطوة القادمة: {st.num < 4 ? steps[st.num].title : 'بداية التعلم المستمر'}
                          </span>
                          {st.num < 4 ? (
                            <button
                              type="button"
                              onClick={() => setActiveStep(st.num + 1)}
                              className="text-xs font-bold text-[#118F86] hover:underline flex items-center gap-1"
                            >
                              <span>الخطوة التالية</span>
                              <ArrowRight size={13} className="rotate-180" />
                            </button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              type="button"
                              onClick={() => onOpenTrialModal('how-it-works-final-step')}
                              className="px-5 py-2.5 bg-[#118F86] text-white font-bold rounded-xl text-xs shadow-accent"
                            >
                              احجز الحصة المجانية الآن
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenTrialModal('how-it-works-cta')}
              className="bg-[#118F86] hover:bg-[#0E736C] text-white font-bold px-8 py-4 rounded-2xl shadow-accent text-sm"
            >
              احجز حصتك التجريبية المجانية
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};
