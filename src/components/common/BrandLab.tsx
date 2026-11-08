import React, { useState } from 'react';
import { BrandDirection } from '../../types';
import { BrandLogo, ConversationalArcBackground, StagingAssetBadge } from './BrandMotif';
import { Sparkles, EyeOff, Eye, Smartphone, Monitor, CheckCircle, ArrowLeft } from 'lucide-react';

interface BrandLabProps {
  currentDirection: BrandDirection;
  onSelectDirection: (direction: BrandDirection) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const BrandLab: React.FC<BrandLabProps> = ({
  currentDirection,
  onSelectDirection,
  isOpen,
  onClose,
}) => {
  const [blindLogoTest, setBlindLogoTest] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex flex-col p-4 md:p-6 text-slate-100">
      {/* Top Header Bar */}
      <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Gate 1 — مراجعة الهوية البصرية (Brand Identity Lab)
            </span>
            <span className="text-xs text-slate-400">NovaTova 2.1 Quality Gate</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mt-1 text-white">
            مقارنة الاتجاهات البصرية الثلاثة واختبار التميّز
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Blind Logo Test Toggle */}
          <button
            onClick={() => setBlindLogoTest(!blindLogoTest)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              blindLogoTest
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
            title="اختبار هل الهوية يمكن تمييزها حتى لو حجبنا شعار NovaTova؟"
          >
            {blindLogoTest ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>اختبار حجب الشعار (Blind Test): {blindLogoTest ? 'مفعّل' : 'معطّل'}</span>
          </button>

          {/* Viewport switch */}
          <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex text-xs">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                viewportMode === 'desktop' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor size={14} />
              <span>1440px ديسكتوب</span>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                viewportMode === 'mobile' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone size={14} />
              <span>390px موبايل</span>
            </button>
          </div>

          {/* Close / Return */}
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
          >
            إغلاق المعمل
          </button>
        </div>
      </div>

      {/* Main Content: 3 Visual Directions Grid */}
      <div className="max-w-7xl w-full mx-auto py-6 space-y-6">
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 text-xs leading-relaxed text-slate-300">
          <strong className="text-emerald-400 font-semibold">معيار القبول Gate 1:</strong> هل تظل هوية
          NovaTova مميزة ومحددة إذا أخفينا الشعار؟ (جرب تفعيل زر حجب الشعار بالأعلى). كل اتجاه يختلف
          في إيقاع التايبوغرافي، لغة الأشكال، الاستعارة البصرية، وتوزيع الألوان وليس مجرد تبديل درجات.
        </div>

        <div className={`grid gap-6 ${viewportMode === 'mobile' ? 'max-w-md mx-auto grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          {/* DIRECTION A: Recommended Default */}
          <div
            className={`rounded-2xl p-5 transition-all relative flex flex-col justify-between ${
              currentDirection === 'A'
                ? 'bg-slate-800 ring-2 ring-emerald-500 shadow-2xl'
                : 'bg-slate-850/80 border border-slate-700/80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  الاتجاه A (الموصى به افتراضيًا)
                </span>
                {currentDirection === 'A' && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <CheckCircle size={14} /> النشط بالموقع
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                الهدوء والثقة / مسار الحوار الإنساني (Calm Confidence)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                <strong>الاستعارة:</strong> مسارا كلام ناعمان يلتقيان ويتصاعدان كقوس تعلّم يبعث على الراحة والألفة.
              </p>

              {/* Tokens Preview */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 text-[11px] space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">لوحة الألوان الأساسية:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#16344B]" title="Deep Ocean #16344B" />
                    <span className="w-4 h-4 rounded-full bg-[#118F86]" title="Growth Teal #118F86" />
                    <span className="w-4 h-4 rounded-full bg-[#FFC77A]" title="Warm Apricot #FFC77A" />
                    <span className="w-4 h-4 rounded-full bg-[#F7F9F6] border border-slate-400" title="Warm White #F7F9F6" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">لغة الأشكال:</span>
                  <span className="text-slate-200">حواف دائرية فسيحة (18px/28px) وقوس حواري</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">التايبوغرافي:</span>
                  <span className="text-slate-200">IBM Plex Sans Arabic (عناوين دافئة، تباعد مريح)</span>
                </div>
              </div>

              {/* Rendered Live Mini-Hero Specimen */}
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#F7F9F6] text-[#132B36] p-4 relative mb-4">
                <ConversationalArcBackground opacity={0.15} />

                {/* Logo Area (Supports Blind Test) */}
                <div className="flex justify-between items-center mb-3">
                  {blindLogoTest ? (
                    <div className="h-7 px-3 bg-slate-300 rounded text-[10px] text-slate-700 flex items-center font-mono">
                      [شعار محجوب لاختبار البصمة]
                    </div>
                  ) : (
                    <BrandLogo />
                  )}
                  <span className="text-[10px] font-semibold text-[#118F86] bg-[#E8F5F4] px-2 py-0.5 rounded-full">
                    حصص 1:1 للأطفال
                  </span>
                </div>

                <div className="relative z-10 text-right">
                  <span className="text-[10px] font-bold text-[#118F86] block mb-1">
                    تعلّم شخصي. ثقة حقيقية.
                  </span>
                  <h4 className="text-base font-bold text-[#16344B] leading-snug">
                    ابنك بفهم عبري شوي… <br />
                    <span className="text-[#118F86]">بس بتلبّك وقت الحكي؟</span>
                  </h4>
                  <p className="text-[11px] text-[#566974] mt-1 line-clamp-2">
                    حصص خاصة 25 دقيقة مع مدرّس مباشر وصبور يراعي عمره واحتياجه خطوة بخطوة.
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button className="bg-[#118F86] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm">
                      احجز حصة مجانية
                    </button>
                    <button className="bg-white border border-[#CBD5E1] text-[#16344B] text-[11px] font-semibold px-2.5 py-1.5 rounded-xl">
                      كيف بنشتغل
                    </button>
                  </div>
                </div>

                {/* Sample Feature Card inside Direction A */}
                <div className="mt-4 bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-soft text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5F4] text-[#118F86] flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-xs font-bold text-[#16344B]">الرصيد العائلي المشترك</span>
                  </div>
                  <p className="text-[10px] text-[#566974]">
                    باقة واحدة لحساب الأهل وتوزيع الحصص بحرية بين الأخوة حسب حاجة كل طفل.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectDirection('A')}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                currentDirection === 'A'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-100'
              }`}
            >
              {currentDirection === 'A' ? 'الاتجاه المعتمد حالياً' : 'اعتماد الاتجاه A'}
            </button>
          </div>

          {/* DIRECTION B: Structured Communicative Pathway */}
          <div
            className={`rounded-2xl p-5 transition-all relative flex flex-col justify-between ${
              currentDirection === 'B'
                ? 'bg-slate-800 ring-2 ring-teal-500 shadow-2xl'
                : 'bg-slate-850/80 border border-slate-700/80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  الاتجاه B
                </span>
                {currentDirection === 'B' && (
                  <span className="flex items-center gap-1 text-xs text-teal-400 font-medium">
                    <CheckCircle size={14} /> النشط بالموقع
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                المسار التواصلي المنظّم (Editorial Clarity)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                <strong>الاستعارة:</strong> مسارات وجسور تواصلية هندسية دقيقة تركز على الإنجاز والوضوح البصري.
              </p>

              {/* Tokens Preview */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 text-[11px] space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">لوحة الألوان الأساسية:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#0B2230]" title="Midnight #0B2230" />
                    <span className="w-4 h-4 rounded-full bg-[#0C9E8E]" title="Vibrant Teal #0C9E8E" />
                    <span className="w-4 h-4 rounded-full bg-[#F4B255]" title="Amber Accent #F4B255" />
                    <span className="w-4 h-4 rounded-full bg-[#F4F6F4] border border-slate-400" title="Clean Gray #F4F6F4" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">لغة الأشكال:</span>
                  <span className="text-slate-200">إطارات محددة 8px-12px مع خطوط تقسيم واضحة</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">التايبوغرافي:</span>
                  <span className="text-slate-200">هندسي حديث، تباين عالي بين العناوين والأرقام</span>
                </div>
              </div>

              {/* Live Specimen B */}
              <div className="rounded-xl overflow-hidden border-2 border-[#0C9E8E]/40 bg-[#F4F6F4] text-[#0F1E28] p-4 relative mb-4">
                {/* Logo Area */}
                <div className="flex justify-between items-center mb-3">
                  {blindLogoTest ? (
                    <div className="h-7 px-3 bg-slate-300 rounded text-[10px] text-slate-700 flex items-center font-mono">
                      [شعار محجوب]
                    </div>
                  ) : (
                    <div className="font-mono text-sm font-bold text-[#0B2230]">
                      NOVA<span className="text-[#0C9E8E]">TOVA</span>.EDU
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-[#0C9E8E] border border-[#0C9E8E] px-2 py-0.5 rounded">
                    مسار تدريب مباشر 1:1
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono tracking-wider text-[#0C9E8E] block mb-0.5">
                    STEP 01 → TANGIBLE PRACTICE
                  </span>
                  <h4 className="text-base font-extrabold text-[#0B2230]">
                    مهارات التحدث بالعبرية <br />
                    بخطوات مرئية ومدروسة.
                  </h4>
                  <p className="text-[11px] text-[#4F6370] mt-1">
                    تقييم مستوى فوري وحصص مكثفة تركز على كسر حاجز النطق بدون مقدمات نظرية.
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button className="bg-[#0C9E8E] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">
                      ابدأ الحصة المجانية
                    </button>
                    <button className="border border-slate-300 bg-white text-slate-800 text-[11px] px-2.5 py-1.5 rounded-lg">
                      جدول المستويات
                    </button>
                  </div>
                </div>

                {/* Feature Card B */}
                <div className="mt-4 bg-white p-3 rounded-lg border-l-4 border-l-[#0C9E8E] border border-slate-200 text-right">
                  <div className="text-xs font-bold text-[#0B2230] mb-0.5">تقارير تقدّم نقطية</div>
                  <p className="text-[10px] text-[#4F6370]">
                    توثيق مباشر لما تم إنجازه بالحصة بدون علامات تقديرية وهمية.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectDirection('B')}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                currentDirection === 'B'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-100'
              }`}
            >
              {currentDirection === 'B' ? 'الاتجاه المعتمد حالياً' : 'اعتماد الاتجاه B'}
            </button>
          </div>

          {/* DIRECTION C: Warm Atelier */}
          <div
            className={`rounded-2xl p-5 transition-all relative flex flex-col justify-between ${
              currentDirection === 'C'
                ? 'bg-slate-800 ring-2 ring-amber-500 shadow-2xl'
                : 'bg-slate-850/80 border border-slate-700/80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  الاتجاه C
                </span>
                {currentDirection === 'C' && (
                  <span className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                    <CheckCircle size={14} /> النشط بالموقع
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                الورشة الإنسانية الدافئة (Warm Atelier)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                <strong>الاستعارة:</strong> أقواس ومساحات تعلّم عضوية تشبه الورشة الحرفية؛ صبر، رعاية، وإتقان فردي.
              </p>

              {/* Tokens Preview */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 text-[11px] space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">لوحة الألوان الأساسية:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#1F3746]" title="Forest Slate #1F3746" />
                    <span className="w-4 h-4 rounded-full bg-[#2E8B7B]" title="Sage Teal #2E8B7B" />
                    <span className="w-4 h-4 rounded-full bg-[#EAA844]" title="Warm Ochre #EAA844" />
                    <span className="w-4 h-4 rounded-full bg-[#FAF8F4] border border-slate-400" title="Cream #FAF8F4" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">لغة الأشكال:</span>
                  <span className="text-slate-200">أقواس ناعمة، لمسات ترابية دافئة، تفاصيل كلاسيكية متقنة</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">التايبوغرافي:</span>
                  <span className="text-slate-200">عناوين ذات مسحة أدبية وثقة هادئة بدون تشتيت رقمي</span>
                </div>
              </div>

              {/* Live Specimen C */}
              <div className="rounded-2xl overflow-hidden border border-[#EAA844]/40 bg-[#FAF8F4] text-[#1B2932] p-4 relative mb-4">
                <div className="flex justify-between items-center mb-3">
                  {blindLogoTest ? (
                    <div className="h-7 px-3 bg-stone-300 rounded text-[10px] text-stone-700 flex items-center font-mono">
                      [شعار محجوب]
                    </div>
                  ) : (
                    <div className="font-serif text-sm font-bold text-[#1F3746]">
                      NovaTova · <span className="text-[#2E8B7B] font-sans text-xs">ورشة اللغات</span>
                    </div>
                  )}
                  <span className="text-[10px] font-medium bg-[#E9F4F1] text-[#2E8B7B] px-2 py-0.5 rounded-full">
                    تعليم بروح العائلة
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] italic text-[#EAA844] font-semibold block mb-0.5">
                    تعلّم على مهلك… واحكي بثقة
                  </span>
                  <h4 className="text-base font-bold text-[#1F3746]">
                    مساحة مريحة لطفلك <br />
                    ليتدرّب مع معلّم يفهم قلبه.
                  </h4>
                  <p className="text-[11px] text-[#5C6E76] mt-1">
                    أجواء بيتية هادئة تمحو التوتر، وتمنح الطفل فرصة النطق الصحيح دون استعجال.
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button className="bg-[#2E8B7B] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm">
                      جرّب جلسة تعارف مجانية
                    </button>
                    <button className="bg-white border border-[#E5E0D5] text-[#1F3746] text-[11px] px-2.5 py-1.5 rounded-xl">
                      عن طريقتنا
                    </button>
                  </div>
                </div>

                {/* Feature Card C */}
                <div className="mt-4 bg-white p-3 rounded-xl border border-[#EAE4D7] text-right">
                  <div className="text-xs font-bold text-[#1F3746] mb-0.5">معلم صبور يُصغي</div>
                  <p className="text-[10px] text-[#5C6E76]">
                    علاقة إنسانية حقيقية تبني حب اللغة قبل القواعد والواجبات.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectDirection('C')}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                currentDirection === 'C'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-100'
              }`}
            >
              {currentDirection === 'C' ? 'الاتجاه المعتمد حالياً' : 'اعتماد الاتجاه C'}
            </button>
          </div>
        </div>

        {/* Gate 1 Acceptance Checklist */}
        <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-400" />
            قائمة التحقق من قبول Gate 1 (Acceptance Checklist)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>استقلالية البصمة:</strong> تمييز هوية NovaTova وقوس التعلّم الحواري فورياً حتى مع حجب الشعار.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>أصالة بصرية كاملة:</strong> خلو تام من شخصيات الكواكب أو الفضاء أو أسلوب رسوم Novakid الكرتونية.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>احترام النضج:</strong> مظهر راقٍ ومطمئن للأهل بدون طفولية مبتذلة أو قوالب SaaS جافة.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>نزاهة المحتوى:</strong> شارات واضحة لكل مادة قيد الاعتماد، دون فبركة صور مدرسين أو تقييمات نجوم وهمية.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

