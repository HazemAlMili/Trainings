import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConversationalArcBackground } from '../components/common/BrandMotif';
import { Sparkles, Phone, Building2, Stethoscope, Briefcase, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface AdultsPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const AdultsPage: React.FC<AdultsPageProps> = ({ onOpenTrialModal }) => {
  const [preferredDuration, setPreferredDuration] = useState<25 | 55>(55);

  const situations = [
    {
      icon: <Phone size={22} className="text-[#118F86]" />,
      title: 'مكالمة هاتفية رسمية',
      desc: 'حجز موعد، استفسار عن معاملة، أو التحدث مع خدمة العملاء دون ارتباك.',
    },
    {
      icon: <Stethoscope size={22} className="text-[#118F86]" />,
      title: 'عند الطبيب أو الصندوق',
      desc: 'وصف الأعراض وفهم تعليمات العلاج بدقة وراحة.',
    },
    {
      icon: <Building2 size={22} className="text-[#118F86]" />,
      title: 'في البنك والدوائر الحكومية',
      desc: 'إنجاز المعاملات المالية وفهم الشروط دون الاستعانة بمترجم.',
    },
    {
      icon: <Briefcase size={22} className="text-[#118F86]" />,
      title: 'حوارات بيئة العمل',
      desc: 'الدردشة اليومية مع الزملاء والمشاركة في النقاشات المهنية.',
    },
  ];

  return (
    <div className="relative overflow-hidden text-right">
      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-[#F7F9F6] border-b border-slate-200">
        <ConversationalArcBackground opacity={0.12} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
            <Sparkles size={14} />
            <span>محادثة عبرية للكبار</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
            بتفهم عبري… بس بتتلبّك وقت الحكي؟
          </h1>

          <p className="text-base sm:text-lg text-[#566974] max-w-2xl mx-auto leading-relaxed">
            بدل ما تحفظ كلمات وتوقف، تدرّب على <strong>حوارات واقعية</strong> مع مدرّس مباشر بيسمعك
            وبصححلك خطوة بخطوة — بدون إحراج، ومن بيتك.
          </p>

          {/* Duration Selector */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-sm mx-auto text-xs">
            <span className="text-[#566974] block mb-2 font-bold">اختار المدة اللي بتفضّلها:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPreferredDuration(25)}
                className={`py-2 px-3 rounded-xl font-bold transition-all ${
                  preferredDuration === 25
                    ? 'bg-[#118F86] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                25 دقيقة (سريعة ومركزة)
              </button>
              <button
                type="button"
                onClick={() => setPreferredDuration(55)}
                className={`py-2 px-3 rounded-xl font-bold transition-all ${
                  preferredDuration === 55
                    ? 'bg-[#118F86] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                55 دقيقة (محادثة متعمقة)
              </button>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">فريقنا بيساعدك تختار المدة الأنسب</span>
          </div>

          <div>
            <button
              onClick={() => onOpenTrialModal(`adults-hero-${preferredDuration}min`)}
              className="bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-bold px-8 py-4 rounded-xl shadow-accent inline-flex items-center gap-2 tap-target-min transition-all"
            >
              <Sparkles size={18} />
              <span>احجز حصة تجريبية مجانية إلك ({preferredDuration} دقيقة)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Realistic Situations */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16344B]">
              مواقف حقيقية منتدرّب عليها بالحصة
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              مش نصوص نظرية، بل حوارات حية بتحتاجها كل يوم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {situations.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F7F9F6] p-6 rounded-2xl border border-slate-200 text-right shadow-soft"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-2xs">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base text-[#16344B] mb-2">{item.title}</h3>
                <p className="text-xs text-[#566974] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee */}
      <section className="py-12 bg-[#F7F9F6] text-right">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#566974]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#118F86]" />
            <span>حصص 1:1 خاصة مع مدرس مباشر، مع شرح بالعربي عند الحاجة ومرونة في تبديل المدرس.</span>
          </div>
          <Link to="/pricing" className="text-[#118F86] font-bold hover:underline shrink-0">
            شوف أسعار باقات الكبار ←
          </Link>
        </div>
      </section>
    </div>
  );
};

