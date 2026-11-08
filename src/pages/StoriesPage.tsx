import React, { useState } from 'react';
import { CMS_STORIES } from '../config/siteConfig';
import { StagingAssetBadge } from '../components/common/BrandMotif';
import { Sparkles, Heart, ShieldCheck } from 'lucide-react';

interface StoriesPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({ onOpenTrialModal }) => {
  const [filter, setFilter] = useState<string>('all');

  return (
    <div className="relative overflow-hidden text-right">
      <section className="pt-12 pb-14 bg-[#F7F9F6] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
            <Heart size={14} />
            <span>بصوت أصحاب التجربة</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
            قصص تعلم حقيقية… بصوت أصحابها
          </h1>

          <p className="text-sm sm:text-base text-[#566974] max-w-2xl mx-auto leading-relaxed">
            بنشارك تجارب الأهالي والطلاب فقط بموافقتهم الصريحة، وبنخفي أي معلومات خاصة حفاظاً على الخصوصية.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {CMS_STORIES.map((story) => (
              <div
                key={story.slug}
                className="bg-[#F7F9F6] p-6 sm:p-8 rounded-2xl border border-slate-200 text-right shadow-soft"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#16344B] text-sm">{story.publicDisplayName}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      موافقة خطية مؤكدة
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{story.sourceDate}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#16344B] mb-4">
                  "{story.title}"
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <strong className="text-slate-500 block mb-1">نقطة البداية والتحدي:</strong>
                    <p className="text-[#566974] leading-relaxed">{story.startingPoint}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <strong className="text-[#118F86] block mb-1">تجربة الحصص:</strong>
                    <p className="text-[#566974] leading-relaxed">{story.theExperience}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
                    <strong className="text-emerald-800 block mb-1">الأثر والتغيير الملحوظ:</strong>
                    <p className="text-emerald-900 leading-relaxed">{story.observedGrowth}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Honest Staging Notice */}
          <div className="mt-10">
            <StagingAssetBadge
              label="تجارب حقيقية موثقة"
              note="عم نجهّز قصص إضافية من طلابنا للنشر بموافقتهم. لا نقوم بتوليد تقييمات نجوم أو شهادات مصطنعة."
            />
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onOpenTrialModal('stories-cta')}
              className="bg-[#118F86] hover:bg-[#0E736C] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-accent"
            >
              ابدأ تجربتك الخاصة بحصة مجانية
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

