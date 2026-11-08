import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Copy, Check, ArrowRight, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { LearnerAudience, LanguageCode, LessonDuration } from '../../types';

interface WhatsAppFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAudience?: LearnerAudience;
  initialLanguage?: LanguageCode;
  initialDuration?: LessonDuration;
  sourceContext?: string;
  defaultVariant?: 'A' | 'B';
}

export const WhatsAppFunnelModal: React.FC<WhatsAppFunnelModalProps> = ({
  isOpen,
  onClose,
  initialAudience = 'child',
  initialLanguage = 'hebrew',
  initialDuration = 25,
  sourceContext = 'for-parents-hero',
  defaultVariant = 'B',
}) => {
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>(defaultVariant);
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [handoffInitiated, setHandoffInitiated] = useState<boolean>(false);

  // Form State for Variant B
  const [audience, setAudience] = useState<LearnerAudience>(initialAudience);
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage);
  const [childAge, setChildAge] = useState<number>(11);
  const [level, setLevel] = useState<string>('بفهم بس بتلبّك بالحكي');
  const [focusArea, setFocusArea] = useState<string>('محادثة وثقة');
  const [duration] = useState<LessonDuration>(initialDuration);
  const [parentName, setParentName] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(true);

  if (!isOpen) return null;

  const audienceLabel =
    audience === 'child' ? `طفل (${childAge} سنة)` : audience === 'adult' ? 'شخص بالغ' : 'مواقف عمل';

  const languageLabel =
    language === 'hebrew'
      ? 'العبرية'
      : language === 'english'
      ? 'الإنجليزية'
      : language === 'german'
      ? 'الألمانية'
      : 'الفرنسية';

  const preparedMessage =
    activeVariant === 'A'
      ? `مرحباً NovaTova، حابب أستفسر وأحجز حصة تجريبية مجانية لـ ${languageLabel}.\nالمصدر: ${sourceContext}`
      : `أهلًا NovaTova، بدي أحجز حصة تجريبية مجانية.\n` +
        `• لمين: ${audienceLabel}\n` +
        `• اللغة: ${languageLabel}\n` +
        `• المستوى الحالي: ${level}\n` +
        `• الهدف الأساسي: ${focusArea}\n` +
        `• المدة المقترحة: ${duration} دقيقة\n` +
        (parentName ? `• الاسم: ${parentName}\n` : '') +
        `• كود المصدر: ${sourceContext}`;

  const cleanWhatsAppNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(preparedMessage);
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodedMessage}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(preparedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleHandoff = () => {
    setHandoffInitiated(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-lifted relative text-right border border-slate-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="إغلاق نافذة الحجز"
        >
          <X size={20} />
        </button>

        {/* Gate 3 Test Variant Switcher Pill */}
        <div className="mb-4 pb-3 border-b border-slate-150 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500">Gate 3 — اختبار مسار التحويل:</span>
          <div className="inline-flex rounded-xl bg-slate-100 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setActiveVariant('A');
                setStep(1);
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeVariant === 'A'
                  ? 'bg-[#118F86] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              المسار A: نقرة واتساب
            </button>
            <button
              type="button"
              onClick={() => setActiveVariant('B')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeVariant === 'B'
                  ? 'bg-[#118F86] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              المسار B: مجهّز الطلب
            </button>
          </div>
        </div>

        {/* VARIANT A: Low-Friction 1-Click WhatsApp */}
        {activeVariant === 'A' && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-2xs">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#16344B]">
                  تواصل فوري لحجز الحصة المجانية
                </h3>
                <p className="text-xs text-[#566974]">
                  بدون تعبئة نماذج — محادثة مباشرة مع مستشار NovaTova
                </p>
              </div>
            </div>

            <div className="bg-[#F7F9F6] p-4 rounded-2xl border border-slate-200 text-xs mb-5 space-y-2">
              <p className="font-bold text-[#16344B]">نص الرسالة المجهز للإرسال:</p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-line leading-relaxed">
                {preparedMessage}
              </div>
              <p className="text-[11px] text-[#566974]">
                فريقنا على واتساب برد عليك ليساعدك باختيار الموعد والمدرس المناسب.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleHandoff}
                className="w-full py-3.5 bg-[#118F86] hover:bg-[#0E736C] text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-accent transition-colors"
              >
                <Send size={16} />
                <span>فتح واتساب وإرسال الرسالة</span>
              </motion.button>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'تم نسخ الرسالة بنجاح' : 'نسخ الرسالة يدوياً'}</span>
              </button>
            </div>
          </div>
        )}

        {/* VARIANT B: Lightweight Qualification Assistant */}
        {activeVariant === 'B' && !handoffInitiated && (
          <div>
            {/* Step Progress Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#16344B]">
                  تخصيص الحصة المجانية المناسبة
                </h3>
                <p className="text-xs text-[#566974]">
                  خطوة {step} من 3 — معلومات بسيطة لنقترح المدرس الأفضل
                </p>
              </div>
              <span className="text-xs font-bold text-[#118F86] bg-[#E8F5F4] px-2.5 py-1 rounded-full">
                {step === 1 ? '1. من يتعلم؟' : step === 2 ? '2. المستوى والهدف' : '3. مراجعة الرسالة'}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 1: Context */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-[#16344B] mb-1.5">الحصة لمين؟</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'child', label: 'طفلي (9-14)' },
                        { id: 'adult', label: 'إلي (محادثة)' },
                        { id: 'work', label: 'للشغل (تجريبي)' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAudience(item.id as LearnerAudience)}
                          className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                            audience === item.id
                              ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {audience === 'child' && (
                    <div>
                      <label className="block font-bold text-[#16344B] mb-1">
                        عمر الطفل: <span className="text-[#118F86]">{childAge} سنة</span>
                      </label>
                      <input
                        type="range"
                        min="6"
                        max="17"
                        value={childAge}
                        onChange={(e) => setChildAge(Number(e.target.value))}
                        className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#118F86]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>6 سنوات</span>
                        <span className="font-bold text-[#118F86]">الفئة المثالية (9 - 14)</span>
                        <span>17 سنة</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-[#16344B] mb-1.5">أي لغة؟</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'hebrew', label: 'العبرية (المسار الأساسي)' },
                        { id: 'english', label: 'الإنجليزية' },
                        { id: 'german', label: 'الألمانية' },
                        { id: 'french', label: 'الفرنسية' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setLanguage(item.id as LanguageCode)}
                          className={`p-2 rounded-xl border text-center font-bold text-xs transition-all ${
                            language === item.id
                              ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3 bg-[#118F86] hover:bg-[#0E736C] text-white font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-colors shadow-accent"
                    >
                      <span>متابعة لتحديد المستوى</span>
                      <ArrowRight size={15} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Level & Needs */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-[#16344B] mb-1.5">كيف بتوصف المستوى الحالي؟</label>
                    <div className="space-y-1.5">
                      {[
                        'بفهم بس بتلبّك بالحكي وبخاف أغلط',
                        'مبتدئ من الصفر ولا بعرف كلمة',
                        'بعرف مفردات وأساسيات وبدي طلاقة',
                        'بحاجة تقوية لمادة المدرسة والامتحانات',
                      ].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setLevel(lvl)}
                          className={`w-full p-2.5 rounded-xl border text-right font-medium transition-all ${
                            level === lvl
                              ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86] font-bold'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#16344B] mb-1.5">التركيز الأساسي:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['محادثة وثقة', 'فهم واستماع', 'قراءة ونطق', 'دعم مادة المدرسة'].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setFocusArea(area)}
                          className={`p-2 rounded-xl border text-center font-bold text-xs transition-all ${
                            focusArea === area
                              ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                    >
                      رجوع
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(3)}
                      className="w-2/3 py-2.5 bg-[#118F86] hover:bg-[#0E736C] text-white font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-colors shadow-accent"
                    >
                      <span>مراجعة الرسالة وتأكيد الطلب</span>
                      <ArrowRight size={15} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Review */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-[#16344B] mb-1">الاسم أو اللقب (اختياري):</label>
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="مثال: أم أحمد"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#118F86] text-xs text-right"
                    />
                  </div>

                  <div className="bg-[#F7F9F6] p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="font-bold text-[#16344B] mb-1">الرسالة المجهزة لفريق الحجز:</div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-line leading-relaxed">
                      {preparedMessage}
                    </div>
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded text-[#118F86]"
                    />
                    <span>
                      أوافق على قيام فريق NovaTova بالتواصل معي لتنسيق الحصة التجريبية وفق سياسة الخصوصية.
                    </span>
                  </label>

                  <div className="flex flex-col gap-2 pt-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleHandoff}
                      disabled={!consent}
                      className="w-full py-3.5 bg-[#118F86] hover:bg-[#0E736C] disabled:bg-slate-300 text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-accent transition-colors"
                    >
                      <Send size={16} />
                      <span>إرسال الطلب عبر واتساب</span>
                    </motion.button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setStep(2)}
                        className="w-1/3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                      >
                        تعديل البيانات
                      </button>
                      <button
                        onClick={handleCopy}
                        className="w-2/3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
                      >
                        {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copied ? 'تم النسخ!' : 'نسخ الرسالة فقط'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Post-Handoff Confirmation */}
        {handoffInitiated && (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#118F86] flex items-center justify-center mx-auto shadow-2xs">
              <Sparkles size={28} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#16344B]">تم تجهيز طلب الحصة بنجاح</h3>
              <p className="text-xs text-[#566974] mt-1 max-w-sm mx-auto leading-relaxed">
                <strong>تنويه للمصداقية:</strong> الحجز لا يتم آلياً؛ فريقنا البشري على واتساب سيراجع طلبك
                ويقترح موعداً مناسباً ومدرّساً يلائم مستوى الطالب قبل تأكيد الموعد النهائي.
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setHandoffInitiated(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#118F86] text-white text-xs font-bold rounded-xl hover:bg-[#0E736C]"
              >
                العودة للموقع
              </motion.button>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-150 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-1">
            <ShieldCheck size={13} className="text-[#118F86]" />
            <span>بياناتك تُستخدم فقط لترتيب الحصة ولا تُشارك مع أي طرف.</span>
          </div>
          <span className="font-mono text-slate-400">{sourceContext}</span>
        </div>
      </motion.div>
    </div>
  );
};
