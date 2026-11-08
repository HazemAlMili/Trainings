import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/siteConfig';
import { LearnerAudience, LanguageCode, LessonDuration } from '../types';
import { ConversationalArcBackground, PolicyReviewTag } from '../components/common/BrandMotif';
import { Sparkles, Send, Copy, Check, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TrialPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  // URL Query Parameters prefill
  const paramAudience = (searchParams.get('audience') as LearnerAudience) || 'child';
  const paramLanguage = (searchParams.get('language') as LanguageCode) || 'hebrew';
  const paramDuration = (Number(searchParams.get('duration')) as LessonDuration) || 25;
  const paramSource = searchParams.get('source') || 'trial-page';

  const [step, setStep] = useState<number>(1);
  const [audience, setAudience] = useState<LearnerAudience>(paramAudience);
  const [language, setLanguage] = useState<LanguageCode>(paramLanguage);
  const [childAge, setChildAge] = useState<number>(11);
  const [adultGoal, setAdultGoal] = useState<string>('محادثة وثقة');
  const [level, setLevel] = useState<string>('بفهم بس بتلبّك بالحكي');
  const [focusAreas, setFocusAreas] = useState<string[]>(['محادثة', 'ثقة بالنطق']);
  const [duration, setDuration] = useState<LessonDuration>(paramDuration);
  const [contactName, setContactName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [handoffInitiated, setHandoffInitiated] = useState<boolean>(false);

  const toggleFocusArea = (item: string) => {
    if (focusAreas.includes(item)) {
      setFocusAreas(focusAreas.filter((a) => a !== item));
    } else {
      if (focusAreas.length < 2) {
        setFocusAreas([...focusAreas, item]);
      }
    }
  };

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

  // Palestinian Arabic formatted message from Blueprint Section Q
  const preparedMessage =
    `أهلًا NovaTova، بدي أحجز حصة مجانية.\n` +
    `• لمين: ${audienceLabel}\n` +
    `• اللغة: ${languageLabel}\n` +
    (audience === 'child' ? `• العمر: ${childAge} سنة\n` : '') +
    `• المستوى: ${level}\n` +
    `• الهدف: ${focusAreas.join(' و ')}\n` +
    `• المدة المفضلة: ${duration} دقيقة\n` +
    (contactName ? `• الاسم: ${contactName}\n` : '') +
    (phone ? `• رقم التواصل: ${phone}\n` : '') +
    (notes ? `• ملاحظات: ${notes}\n` : '') +
    `• المصدر: ${paramSource}`;

  const cleanWhatsAppNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(preparedMessage);
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodedMessage}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(preparedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHandoff = () => {
    setHandoffInitiated(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative overflow-hidden text-right py-12 md:py-16 bg-[#F7F9F6] min-h-[85vh]">
      <ConversationalArcBackground opacity={0.12} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
            <Sparkles size={14} />
            <span>حصة تجريبية مجانية 100%</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16344B]">
            خلّينا نحجز حصة مجانية مناسبة إلك
          </h1>

          <p className="text-xs sm:text-sm text-[#566974]">
            احكيلنا معلومات بسيطة، ومنجهّز رسالة لفريق NovaTova على واتساب يساعدك بالموعد والمدرس.
          </p>

          {/* Stepper Indicator */}
          <div className="pt-3 flex items-center justify-center gap-2 text-xs font-bold">
            <span
              className={`px-3 py-1 rounded-full ${
                step === 1 ? 'bg-[#118F86] text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              1. السياق والمتعلم
            </span>
            <span className="text-slate-300">←</span>
            <span
              className={`px-3 py-1 rounded-full ${
                step === 2 ? 'bg-[#118F86] text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              2. المستوى والهدف
            </span>
            <span className="text-slate-300">←</span>
            <span
              className={`px-3 py-1 rounded-full ${
                step === 3 ? 'bg-[#118F86] text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              3. مراجعة الرسالة
            </span>
          </div>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lifted">
          {!handoffInitiated ? (
            <div>
              {/* STEP 1: Context */}
              {step === 1 && (
                <div className="space-y-5 text-xs">
                  <div>
                    <label className="block font-bold text-sm text-[#16344B] mb-2">الحصة لمين؟</label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'child', label: 'طفلي (9–14 سنة)' },
                        { id: 'adult', label: 'إلي (محادثة)' },
                        { id: 'work', label: 'للشغل (تجريبي)' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAudience(item.id as LearnerAudience)}
                          className={`p-3 rounded-xl border text-center font-bold transition-all ${
                            audience === item.id
                              ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86] ring-2 ring-[#118F86]/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-sm text-[#16344B] mb-2">أي لغة؟</label>
                    <div className="grid grid-cols-2 gap-2.5">
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
                          className={`p-3 rounded-xl border text-center font-bold transition-all ${
                            language === item.id
                              ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86] ring-2 ring-[#118F86]/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {audience === 'child' && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-[#16344B]">عمر الطفل:</label>
                        <span className="font-bold text-sm text-[#118F86] font-mono">
                          {childAge} سنة
                        </span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="17"
                        value={childAge}
                        onChange={(e) => setChildAge(Number(e.target.value))}
                        className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#118F86]"
                      />
                      {(childAge < 9 || childAge > 14) && (
                        <p className="text-[11px] text-amber-700 mt-2 bg-amber-50 p-2 rounded">
                          ملاحظة: المسار الأساسي مصمم لـ 9–14 سنة. إذا طفلك خارج هذه الفئة، رح يستشير الفريق المعلمين لإيجاد الأسلوب الأنسب له.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3 bg-[#118F86] hover:bg-[#0E736C] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-accent transition-colors"
                    >
                      <span>التالي: تحديد المستوى والهدف</span>
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Level & Need */}
              {step === 2 && (
                <div className="space-y-5 text-xs">
                  <div>
                    <label className="block font-bold text-sm text-[#16344B] mb-2">
                      كيف بتوصف المستوى الحالي؟
                    </label>
                    <div className="space-y-2">
                      {[
                        'مبتدئ من الصفر ولا بعرف شي',
                        'بعرف كلمات وأساسيات بسيطة',
                        'بفهم بس بتلبّك بالحكي وبخاف أغلط',
                        'بحاجة تقوية لمادة المدرسة والامتحانات',
                      ].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setLevel(lvl)}
                          className={`w-full p-3 rounded-xl border text-right font-medium transition-all ${
                            level === lvl
                              ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86] font-bold ring-2 ring-[#118F86]/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-sm text-[#16344B] mb-1">
                      شو أهم إشي بدّك تشتغل عليه؟ (اختر 1 أو 2)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['محادثة', 'ثقة بالنطق', 'فهم واستماع', 'قراءة وكتابة', 'مادة المدرسة'].map(
                        (area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleFocusArea(area)}
                            className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                              focusAreas.includes(area)
                                ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86]'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {area}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-sm text-[#16344B] mb-1.5">
                      المدة المفضلة للحصة:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDuration(25)}
                        className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                          duration === 25
                            ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86]'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        25 دقيقة (موصى بها للأطفال)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDuration(55)}
                        className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                          duration === 55
                            ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86]'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        55 دقيقة (للكبار أو المكثف)
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      مدة الحصة المجانية بتتأكد مع فريق الحجز حسب المواعيد.
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                    >
                      رجوع
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="w-2/3 py-3 bg-[#118F86] hover:bg-[#0E736C] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-accent"
                    >
                      <span>التالي: مراجعة وإرسال</span>
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Message Review & Handoff */}
              {step === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#16344B] mb-1">
                        الاسم أو اللقب (اختياري):
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="مثال: أم كريم"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#16344B] mb-1">
                        رقم واتساب للتواصل (اختياري إذا ستفتح واتساب مباشرة):
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="050-0000000"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#16344B] mb-1">
                      ملاحظات إضافية للفريق (اختياري):
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="أوقات مفضلة بالحصة، أو صعوبات معينة..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs"
                    />
                  </div>

                  {/* Summary Preview Box */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-[#16344B] block mb-1">
                      الرسالة المجهزة للإرسال على واتساب:
                    </span>
                    <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-line leading-relaxed">
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
                      بوافق إن فريق NovaTova يتواصل معي لتنسيق الحصة التجريبية وفق سياسة الخصوصية.
                    </span>
                  </label>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={handleHandoff}
                      disabled={!consent}
                      className="w-full py-3.5 bg-[#118F86] hover:bg-[#0E736C] disabled:bg-slate-300 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-accent transition-colors"
                    >
                      <Send size={16} />
                      <span>افتح واتساب وابعث الرسالة</span>
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setStep(2)}
                        className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={handleCopy}
                        className="w-2/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
                      >
                        {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copied ? 'تم النسخ بنجاح!' : 'نسخ الرسالة يدوياً'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#118F86] flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>

              <h3 className="text-xl font-bold text-[#16344B]">تم تجهيز طلب الحصة بنجاح</h3>
              <p className="text-xs text-[#566974] max-w-sm mx-auto leading-relaxed">
                <strong>تنويه للمصداقية:</strong> الحجز بيتأكد لما يرد فريقنا البشري على واتساب ويتم الاتفاق على الموعد المناسب.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <Link
                  to="/"
                  className="px-6 py-2.5 bg-[#118F86] text-white text-xs font-bold rounded-xl hover:bg-[#0E736C]"
                >
                  العودة للرئيسية
                </Link>
                <Link
                  to="/trial/preview"
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
                >
                  معاينة مسار ما بعد الحجز
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/trial/preview"
            className="text-xs font-bold text-slate-500 hover:text-[#118F86] underline"
          >
            شوف مراحل ما بعد الحجز التوضيحية (Trial Journey Preview) ←
          </Link>
        </div>
      </div>
    </div>
  );
};

