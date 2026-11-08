import React from 'react';
import { X, FileText, CheckCircle2, Target, HeartHandshake, AlertCircle } from 'lucide-react';

interface TeacherReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherReportModal: React.FC<TeacherReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-lifted relative text-right border border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="إغلاق التقرير"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#E8F5F4] text-[#118F86] flex items-center justify-center">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#16344B]">
              نموذج تقرير المدرس لولي الأمر بعد الحصة
            </h3>
            <p className="text-xs text-[#566974]">
              هيك بكون شكل المتابعة اللي بتوصلك بعد حصة طفلك
            </p>
          </div>
        </div>

        {/* Staging Notice */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-2.5 rounded-lg mb-5 flex items-center gap-2">
          <AlertCircle size={15} className="text-amber-600 shrink-0" />
          <span>هذا نموذج لشكل الملاحظات الحقيقية — بدون أرقام أو نسب نجاح وهمية أو علامات ترويجية مضللة.</span>
        </div>

        {/* Report Sample Card */}
        <div className="space-y-4 text-xs md:text-sm">
          {/* Metadata */}
          <div className="bg-[#F7F9F6] p-3.5 rounded-xl border border-slate-200 flex flex-wrap justify-between gap-2">
            <div>
              <span className="text-[#566974]">الطالب: </span>
              <span className="font-bold text-[#16344B]">آدم (11 سنة)</span>
            </div>
            <div>
              <span className="text-[#566974]">اللغة: </span>
              <span className="font-bold text-[#16344B]">العبرية (محادثة)</span>
            </div>
            <div>
              <span className="text-[#566974]">المدة: </span>
              <span className="font-bold text-[#16344B]">25 دقيقة فردية</span>
            </div>
          </div>

          {/* Section 1: What was practiced */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 font-bold text-[#16344B] mb-2">
              <CheckCircle2 size={16} className="text-[#118F86]" />
              <span>شو اتدرّبنا عليه بهالحصة:</span>
            </div>
            <p className="text-[#566974] leading-relaxed">
              تدرّب آدم على محادثة قصيرة لوصف يومه المدرسي. استخدمنا جملاً عن الدروس المفضلة
              والألعاب بالساحة، وتدرّبنا على صياغة السؤال بجمل بسيطة مثل: "מה השעה?" و "איזה שיעور עכשיו?".
            </p>
          </div>

          {/* Section 2: Strengths */}
          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
            <div className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <HeartHandshake size={16} className="text-[#118F86]" />
              <span>نقاط القوة والملاحظات الإيجابية:</span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              آدم كان سريع الاستيعاب للكلمات الجديدة. بعد ما كان متردد بالبداية، تشجع وصار يحكي جملة
              كاملة لحاله بدون مساعدة في آخر 10 دقائق من الحصة.
            </p>
          </div>

          {/* Section 3: Next Goal */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50">
            <div className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <Target size={16} className="text-[#E5A54F]" />
              <span>الخطوة والهدف للحصة الجايّة:</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              تثبيت مفردات التحدث مع أصدقائه في الاستراحة، وتكرار نطق حرف الحيت (ח) والعين (ע) بمواقف عملية مرحة.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-150 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            التقارير بتكتبها المدرسين لمساعدة ولي الأمر على البقاء في الصورة.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#118F86] text-white text-xs font-bold rounded-xl hover:bg-[#0E736C] transition-colors"
          >
            فهمت النموذج
          </button>
        </div>
      </div>
    </div>
  );
};

