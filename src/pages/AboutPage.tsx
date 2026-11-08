import React from 'react';
import { Link } from 'react-router-dom';
import { ConversationalArcBackground } from '../components/common/BrandMotif';
import { Sparkles, Users, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenTrialModal }) => {
  const principles = [
    {
      num: '01',
      title: 'الطالب أولًا',
      desc: 'منسمع احتياج الطالب وظروفه قبل ما نرشّح أي خطة أو باقة، بدون فرض قوالب جاهزة.',
    },
    {
      num: '02',
      title: 'الثقة من التجربة',
      desc: 'الحصة المجانية بتعطيك فرصة تتعرف علينا وعلى أسلوب المدرس قبل أي التزام مالي.',
    },
    {
      num: '03',
      title: 'الإنسان قبل التقنية',
      desc: 'التقنية بتنظّم الرحلة والمواعيد، بس المعلم الحقيقي بصبره واهتمامه هو اللي بصنع الفرق.',
    },
    {
      num: '04',
      title: 'وضوح ومرونة',
      desc: 'باقات وأسعار معروفة، تواصل مباشر، إمكانية تبديل المدرس، ورصيد عائلي مرن.',
    },
  ];

  return (
    <div className="relative overflow-hidden text-right">
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-[#F7F9F6] border-b border-slate-200">
        <ConversationalArcBackground opacity={0.12} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
            <Sparkles size={14} />
            <span>رسالتنا وقصتنا</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
            التعلّم الصح بيبدأ لما نحسّ إن في حدا فاهمنا
          </h1>

          <p className="text-base sm:text-lg text-[#566974] max-w-2xl mx-auto leading-relaxed">
            NovaTova منصة لحصص لغات فردية 1:1 أونلاين. بنؤمن إن كل طالب بيستحق تعليم يناسب مستواه
            وهدفه، ومعلم يسمعه ويساعده يتقدم خطوة بخطوة بدون خوف أو مقارنة.
          </p>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16344B]">
              المبادئ التي تقود عملنا كل يوم
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
            {principles.map((p) => (
              <div
                key={p.num}
                className="bg-[#F7F9F6] p-6 rounded-2xl border border-slate-200 shadow-soft"
              >
                <div className="text-2xl font-black text-[#118F86] font-mono mb-3">{p.num}</div>
                <h3 className="font-bold text-base text-[#16344B] mb-2">{p.title}</h3>
                <p className="text-xs text-[#566974] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onOpenTrialModal('about-page-cta')}
              className="bg-[#118F86] hover:bg-[#0E736C] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-accent"
            >
              احجز حصتك التجريبية المجانية
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

