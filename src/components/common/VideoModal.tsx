import React from 'react';
import { X, Play, ShieldAlert, Sparkles } from 'lucide-react';
import { StagingAssetBadge } from './BrandMotif';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoTitle = 'مقتطف توضيحي من أجواء الحصة الفردية 25 دقيقة',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl max-w-2xl w-full p-4 md:p-6 shadow-2xl relative text-right text-slate-100 border border-slate-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          aria-label="إغلاق المعاينة"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            معاينة موثوقة
          </span>
          <h3 className="text-base md:text-lg font-bold text-white">{videoTitle}</h3>
        </div>

        {/* Video Player Frame / Staging Safe Preview */}
        <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#118F86]/20 border border-[#118F86]/40 text-[#118F86] flex items-center justify-center mb-4">
            <Play size={28} className="translate-x-[-2px]" />
          </div>

          <h4 className="text-base font-bold text-white mb-2">
            محاكاة بيئة الحصة التفاعلية 1:1
          </h4>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-4">
            المعلم يشارك شاشة الحوار مع الطفل، بطاقات تفاعلية لمواقف الحياة اليومية،
            ودعم فوري باللغة العربية عند حاجة الطفل للشرح دون أي توتر.
          </p>

          <StagingAssetBadge
            label="مقطع درس تجريبي — قيد تجهيز المواد المصورة بموافقة الأهالي الخطية"
            note="حرصاً على خصوصية الأطفال، لا يتم رفع أي فيديو للطفل دون إذن قانوني صريح."
          />
        </div>

        {/* Video Captions & Accessibility Note */}
        <div className="mt-4 p-3 bg-slate-800/70 rounded-xl border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2.5">
          <Sparkles size={16} className="text-teal-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>ملاحظات التجربة:</strong> الحصة المباشرة تتضمن دعماً صوتياً ومرئياً، وتدريباً هادئاً،
            وإمكانية إيقاف الشاشة والتركيز على النطق فقط إذا كان الطفل يشعر بالخجل في أول لقاء.
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700"
          >
            إغلاق المشاهدة
          </button>
        </div>
      </div>
    </div>
  );
};

