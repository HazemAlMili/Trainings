import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRICING_PACKAGES } from '../config/siteConfig';
import { LessonDuration } from '../types';
import { FamilyWalletDemo } from '../components/common/FamilyWalletDemo';
import { AnimatedConversationalArc } from '../components/motion/SignatureElements';
import { FadeIn, StaggerContainer, StaggerItem, InteractiveHoverCard, PulseBeacon } from '../components/motion/MotionWrapper';
import { PolicyReviewTag } from '../components/common/BrandMotif';
import {
  CheckCircle2,
  Sparkles,
  ChevronDown,
  X,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';

interface PricingPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenTrialModal }) => {
  const [duration, setDuration] = useState<LessonDuration>(25);
  const [audience, setAudience] = useState<'child' | 'adult'>('child');
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pricingFaqs = [
    {
      q: 'هل لازم أختار باقة قبل الحصة المجانية؟',
      a: 'لا، أبدًا! جرّب الحصة المجانية أولًا، وبعدها بنساعدك تختار الباقة الأنسب حسب مستوى الطالب وتوصية المدرس.',
    },
    {
      q: 'هل بقدر أوزّع باقة واحدة بين أولادي؟',
      a: 'نعم! الرصيد العائلي المشترك متاح في جميع الباقات، حيث يستطيع ولي الأمر توزيع الحصص بين جميع أبنائه من نفس الحساب.',
    },
    {
      q: 'كيف بتتم عملية الدفع؟',
      a: 'بعد اختيار الباقة المناسبة مع فريقنا، يرسل لك المستشار رابط دفع إلكتروني آمن وسهل، وتتم إضافة الرصيد لحسابك فوراً.',
    },
    {
      q: 'هل الحصص بتخلص صلاحيتها؟',
      a: 'تفاصيل صلاحية الرصيد وفترات الاستخدام بتكون واضحة مع شروط الشراء المعتمدة. [POLICY_REVIEW: تأكيد الصياغة القانونية النهائية].',
    },
    {
      q: 'شو سياسة استرجاع المبلغ إذا ما كملنا؟',
      a: 'السياسة المعتمدة تضمن وضوح الشروط قبل الدفع. [POLICY_REVIEW: تأكيد بند الاسترجاع خلال أول 14 يومًا بدون شروط].',
    },
    {
      q: 'كيف بغيّر المدرس إذا ما ناسبنا؟',
      a: 'بكل سهولة عبر رسالة لفريق الدعم على واتساب، وبنساعدك تختار بديل مناسب حسب المواعيد المتاحة.',
    },
  ];

  return (
    <div className="relative overflow-hidden text-right">
      {/* Hero */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-[#F7F9F6] border-b border-slate-200/80">
        <AnimatedConversationalArc opacity={0.12} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold mb-4">
              <PulseBeacon color="#118F86" size={7} />
              <span>أسعار واضحة بدون رسوم خفية</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B] mb-4">
              باقات واضحة تناسب هدفك وميزانيتك
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-sm sm:text-base text-[#566974] max-w-2xl mx-auto mb-8 leading-relaxed">
              قبل ما تختار أي باقة، <strong>جرّب حصة مجانية</strong>. وبعدها منساعدك تحدد العدد والمدة الأنسب
              بناءً على ملاحظات المعلم الفعلية.
            </p>
          </FadeIn>

          {/* Controls: Audience & Duration with Smooth Tabs */}
          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              {/* Audience Filter */}
              <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-xs flex w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setAudience('child');
                    setDuration(25);
                  }}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    audience === 'child'
                      ? 'bg-[#118F86] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  للأطفال (افتراضي 25 دقيقة)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAudience('adult');
                    setDuration(55);
                  }}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    audience === 'adult'
                      ? 'bg-[#118F86] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  للكبار (محادثة 55 دقيقة)
                </button>
              </div>

              {/* Duration Switcher */}
              <div className="bg-slate-200/80 p-1 rounded-2xl flex w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setDuration(25)}
                  className={`flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    duration === 25
                      ? 'bg-white text-[#16344B] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock size={13} />
                  <span>25 دقيقة / للحصة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDuration(55)}
                  className={`flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    duration === 55
                      ? 'bg-white text-[#16344B] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock size={13} />
                  <span>55 دقيقة / للحصة</span>
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {PRICING_PACKAGES.map((pkg) => {
              const totalPrice = duration === 25 ? pkg.price25 : pkg.price55;
              const unitPrice = duration === 25 ? pkg.unitPrice25 : pkg.unitPrice55;

              return (
                <InteractiveHoverCard
                  key={pkg.id}
                  className={`rounded-3xl p-7 text-right flex flex-col justify-between transition-all relative ${
                    pkg.isPopular
                      ? 'bg-white border-2 border-[#118F86] shadow-lifted ring-4 ring-[#118F86]/10'
                      : 'bg-[#F7F9F6] border border-slate-200 shadow-soft'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 right-6 bg-[#118F86] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {pkg.editorialBadge}
                    </div>
                  )}

                  <div>
                    {!pkg.isPopular && pkg.editorialBadge && (
                      <span className="text-[11px] font-bold text-slate-500 block mb-1">
                        {pkg.editorialBadge}
                      </span>
                    )}

                    <h3 className="text-xl font-bold text-[#16344B] mb-1">{pkg.name}</h3>
                    <div className="text-xs text-[#566974] mb-4">
                      {pkg.sessions} حصة فردية × {duration} دقيقة
                    </div>

                    {/* Price Block with Smooth Value Fade */}
                    <div className="mb-6 pb-6 border-b border-slate-200">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={totalPrice}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-baseline gap-1 font-mono">
                            <span className="text-3xl sm:text-4xl font-black text-[#16344B]">
                              {totalPrice} ₪
                            </span>
                            <span className="text-xs text-slate-500 font-sans">إجمالي الباقة</span>
                          </div>
                          <div className="text-xs text-[#118F86] font-semibold mt-1">
                            {unitPrice} ₪ فقط للحصة الواحدة
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 text-xs text-[#566974] mb-6">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-[#118F86] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        onOpenTrialModal(
                          `pricing-${pkg.id}-${pkg.sessions}-sessions-${duration}min`
                        )
                      }
                      className={`w-full py-3.5 text-xs font-bold rounded-2xl transition-colors ${
                        pkg.isPopular
                          ? 'bg-[#118F86] hover:bg-[#0E736C] text-white shadow-accent'
                          : 'bg-white hover:bg-slate-50 text-[#16344B] border border-slate-300'
                      }`}
                    >
                      اسأل عن باقة {pkg.sessions} حصة
                    </motion.button>
                    <div className="text-[10px] text-slate-400 text-center">
                      الدفع يتم بعد الحصة المجانية
                    </div>
                  </div>
                </InteractiveHoverCard>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setComparisonModalOpen(true)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#16344B] font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Layers size={15} />
              <span>جدول مقارنة الباقات بالتفصيل</span>
            </button>

            <button
              onClick={() => onOpenTrialModal('pricing-unsure-free-trial')}
              className="text-[#118F86] font-bold hover:underline flex items-center gap-1"
            >
              <span>مش متأكد أي باقة بتناسبك؟ احجز الحصة المجانية واستشرنا</span>
              <ArrowRight size={14} className="rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Family Wallet Simulator */}
      <section className="py-16 md:py-24 bg-[#F7F9F6] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
              كيف بنوزّع الرصيد العائلي؟
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              بتقدر تشتري باقة واحدة وتوزّعها بين أطفالك بدون اشتراكات منفصلة
            </p>
          </FadeIn>

          <FamilyWalletDemo />
        </div>
      </section>

      {/* Risk Reduction & Policy Flags */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-xs text-right space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-sm text-[#16344B]">ضمانات الشفافية والراحة:</span>
              <PolicyReviewTag text="بند المراجعة القانونية [POLICY_REVIEW]" />
            </div>
            <p className="text-[#566974] leading-relaxed">
              <strong>حصة تجريبية مجانية 100%:</strong> لا يطلب منك أي دفع قبل تجربة الحصة والاطمئنان لأسلوب المدرس.
            </p>
            <p className="text-[#566974] leading-relaxed">
              <strong>مرونة تغيير المدرس:</strong> في حال عدم التوافق، نساعدك بالانتقال لمدرس بديل وفق المواعيد المتوفرة.
            </p>
            <p className="text-[#566974] leading-relaxed">
              <strong>سياسة استرجاع المبالغ:</strong> التفاصيل والشروط النهائية تكون واضحة وموثقة في صفحة الشراء قبل إتمام الدفع.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs with Smooth Animation */}
      <section className="py-16 md:py-24 bg-[#F7F9F6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-right">
          <FadeIn className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#16344B]">
              أسئلة شائعة عن الباقات والدفع
            </h2>
          </FadeIn>

          <div className="space-y-3">
            {pricingFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-right font-bold text-sm text-[#16344B] flex items-center justify-between gap-3 hover:bg-slate-50"
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
                      <div className="p-4 sm:p-5 pt-0 text-xs text-[#566974] leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Modal */}
      <AnimatePresence>
        {comparisonModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setComparisonModalOpen(false)}
                className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-bold text-[#16344B] mb-2">مقارنة شاملة لباقات NovaTova</h3>
              <p className="text-xs text-[#566974] mb-6">
                جميع الباقات تشمل حصصاً فردية 1:1 خاصة مع مدرس مباشر وخطة مخصصة
              </p>

              <div className="overflow-x-auto text-xs">
                <table className="w-full border-collapse text-right">
                  <thead>
                    <tr className="bg-slate-100 text-[#16344B] border-b border-slate-200">
                      <th className="p-3 font-bold">الباقة</th>
                      <th className="p-3 font-bold">الحصص</th>
                      <th className="p-3 font-bold">إجمالي (25 دقيقة)</th>
                      <th className="p-3 font-bold">للحصة (25 دقيقة)</th>
                      <th className="p-3 font-bold">إجمالي (55 دقيقة)</th>
                      <th className="p-3 font-bold">للحصة (55 دقيقة)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PRICING_PACKAGES.map((p) => (
                      <tr key={p.id} className={p.isPopular ? 'bg-emerald-50/40 font-bold' : ''}>
                        <td className="p-3 text-[#16344B]">{p.name}</td>
                        <td className="p-3 font-mono">{p.sessions}</td>
                        <td className="p-3 font-mono text-[#118F86]">{p.price25} ₪</td>
                        <td className="p-3 font-mono">{p.unitPrice25} ₪</td>
                        <td className="p-3 font-mono text-slate-700">{p.price55} ₪</td>
                        <td className="p-3 font-mono">{p.unitPrice55} ₪</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-between items-center text-xs">
                <span className="text-slate-500">مشاركة الرصيد بين الأخوة متاحة بجميع الباقات</span>
                <button
                  onClick={() => setComparisonModalOpen(false)}
                  className="px-5 py-2.5 bg-[#118F86] text-white font-bold rounded-xl"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
