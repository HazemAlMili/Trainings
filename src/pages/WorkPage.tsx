import React from 'react';
import { Sparkles, Briefcase, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface WorkPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onOpenTrialModal }) => {
  return (
    <div className="relative overflow-hidden text-right">
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-[#F7F9F6] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Eyebrow strictly labeled test only */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <AlertCircle size={14} className="text-amber-700" />
            <span>مسار تجريبي — بحسب توفّر المدرسين المتخصصين</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
            تدرّب على الحكي بالعبرية قبل مواقف الشغل
          </h1>

          <p className="text-base sm:text-lg text-[#566974] max-w-2xl mx-auto leading-relaxed">
            مقابلة عمل، مكالمة رسمية، أو تعامل مع زبائن وزملاء؟ منجرّب معك المواقف اللي بتحتاجها،
            بجلسات محاكاة 1:1 مخصصة لمجالك.
          </p>

          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs max-w-xl mx-auto flex items-start gap-2.5 text-right">
            <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>تنويه للمصداقية:</strong> التدريب يركز على اللغة والمحادثة فقط، ولا يضمن الحصول على وظيفة أو نتائج امتحانات مهنية.
            </span>
          </div>

          <div>
            <button
              onClick={() => onOpenTrialModal('work-track-cta')}
              className="bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-bold px-8 py-4 rounded-xl shadow-accent inline-flex items-center gap-2 tap-target-min transition-all"
            >
              <Sparkles size={18} />
              <span>اسأل عن إمكانية تجربة المسار المهني</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Work Scenarios */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            <div className="p-6 rounded-2xl bg-[#F7F9F6] border border-slate-200">
              <h3 className="font-bold text-base text-[#16344B] mb-2">1. عرّف عن حالك وخبرتك</h3>
              <p className="text-xs text-[#566974] leading-relaxed">
                صياغة مختصرة وسلسة لمسارك المهني ونقاط قوتك بالعبرية دون تلعثم.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9F6] border border-slate-200">
              <h3 className="font-bold text-base text-[#16344B] mb-2">2. تدرّب على أسئلة المقابلة</h3>
              <p className="text-xs text-[#566974] leading-relaxed">
                محاكاة مباشرة لأسئلة المقابلات الشائعة والتدريب على الإجابة بثقة وهدوء.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9F6] border border-slate-200">
              <h3 className="font-bold text-base text-[#16344B] mb-2">3. احكي مع زبون أو زميل</h3>
              <p className="text-xs text-[#566974] leading-relaxed">
                تمارين على الرد على استفسارات العملاء والمكالمات والتواصل المكتوب البسيط.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

