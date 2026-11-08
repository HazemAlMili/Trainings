import React, { useState } from 'react';
import { PolicyReviewTag } from '../components/common/BrandMotif';
import { ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const [cookiePrefs, setCookiePrefs] = useState({
    functional: true,
    analytics: false,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  const titles = {
    privacy: 'سياسة الخصوصية وحماية بيانات الأطفال',
    terms: 'شروط الاستخدام والخدمة',
    cookies: 'سياسة ملفات تعريف الارتباط (Cookies)',
  };

  return (
    <div className="py-16 bg-[#F7F9F6] text-right">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-soft space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-[#16344B]">{titles[type]}</h1>
            <PolicyReviewTag text="قيد المراجعة القانونية [POLICY_REVIEW]" />
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">تنويه إداري وقانوني لمرحلة الـ Prototype:</p>
              <p>
                الوثائق الرسمية تخضع حالياً لمراجعة المالك القانوني لتوحيد بنود استرجاع المبالغ
                (14 يوماً بدون أسئلة) وضوابط تسجيل الحصص للأطفال بموافقة صريحة.
              </p>
              <div className="pt-1">
                <a
                  href={`https://novatova.com/${type === 'privacy' ? 'privacy-policy' : type === 'terms' ? 'terms-of-service' : 'cookie-policy'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#118F86] font-bold underline inline-flex items-center gap-1"
                >
                  <span>اطّلع على النسخة المنشورة حالياً على الموقع المباشر</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {type === 'cookies' && (
            <div className="space-y-4 pt-4 border-t border-slate-150">
              <h3 className="font-bold text-sm text-[#16344B]">إدارة تفضيلات الكوكيز في النموذج التجريبي:</h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#16344B] block">ملفات الارتباط الأساسية</span>
                    <span className="text-slate-500 text-[11px]">تشغيل وظائف الموقع</span>
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">مفعلة</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#16344B] block">ملفات حفظ التفضيلات والاتجاه البصري</span>
                    <span className="text-slate-500 text-[11px]">تذكر اختيارك بين الاتجاهات A و B و C</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookiePrefs.functional}
                    onChange={(e) => setCookiePrefs({ ...cookiePrefs, functional: e.target.checked })}
                    className="rounded text-[#118F86]"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#16344B] block">ملفات قياس تجربة الاستخدام</span>
                    <span className="text-slate-500 text-[11px]">قياس تفاعل المستخدم بدون جمع بيانات شخصية</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookiePrefs.analytics}
                    onChange={(e) => setCookiePrefs({ ...cookiePrefs, analytics: e.target.checked })}
                    className="rounded text-[#118F86]"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }}
                className="px-5 py-2.5 bg-[#118F86] text-white font-bold text-xs rounded-xl"
              >
                {saved ? 'تم حفظ التفضيلات' : 'حفظ التفضيلات'}
              </button>
            </div>
          )}

          {type !== 'cookies' && (
            <div className="text-xs text-[#566974] leading-relaxed space-y-3">
              <p>
                تلتزم NovaTova بحماية خصوصية المتعلمين، وبشكل أخص الأطفال تحت سن 18 عاماً. لا نشارك أي بيانات اتصال أو معلومات عائلية مع أطراف تسويقية ثالثة.
              </p>
              <p>
                جميع الحصص التجريبية ترتب عبر التواصل الإنساني المباشر مع أولياء الأمور عبر تطبيق واتساب المعتمد.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

