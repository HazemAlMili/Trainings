import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo, PolicyReviewTag } from './BrandMotif';
import { SITE_CONFIG } from '../../config/siteConfig';
import { ShieldCheck, MessageCircle, Heart, Cookie } from 'lucide-react';

export const Footer: React.FC = () => {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [functionalCookies, setFunctionalCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);

  return (
    <>
      <footer className="bg-[#16344B] text-slate-300 pt-16 pb-12 border-t border-slate-700/60 text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <BrandLogo colorScheme="white" />
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
                منصة NovaTova لحصص اللغات الفردية 1:1 عبر الإنترنت، مع معلّم مباشر وخطة تناسب عمرك
                وهدفك، بدون ضغط وبأعلى درجات الخصوصية والاحترام الثقافي.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck size={16} />
                <span>حصة تجريبية مجانية لكل طالب جديد بدون أي التزام مالي</span>
              </div>
            </div>

            {/* Col 2: تعلّم */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wide">تعلّم</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/for-parents" className="hover:text-emerald-400 transition-colors">
                    تعليم العبرية للأطفال (9–14)
                  </Link>
                </li>
                <li>
                  <Link to="/languages/hebrew" className="hover:text-emerald-400 transition-colors">
                    العبرية للمحادثة والحياة
                  </Link>
                </li>
                <li>
                  <Link to="/languages/english" className="hover:text-emerald-400 transition-colors">
                    اللغة الإنجليزية
                  </Link>
                </li>
                <li>
                  <Link to="/languages/german" className="hover:text-emerald-400 transition-colors">
                    اللغة الألمانية
                  </Link>
                </li>
                <li>
                  <Link to="/languages/french" className="hover:text-emerald-400 transition-colors">
                    اللغة الفرنسية
                  </Link>
                </li>
                <li>
                  <Link to="/for-adults" className="hover:text-emerald-400 transition-colors">
                    مسار الكبار والمحادثة
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: استكشف */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wide">استكشف</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">
                    كيف بنشتغل (4 خطوات)
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-emerald-400 transition-colors">
                    باقات الأسعار والرصيد العائلي
                  </Link>
                </li>
                <li>
                  <Link to="/teachers" className="hover:text-emerald-400 transition-colors">
                    دليل المدرسين المتاحين
                  </Link>
                </li>
                <li>
                  <Link to="/stories" className="hover:text-emerald-400 transition-colors">
                    تجارب الأهالي والطلاب
                  </Link>
                  <Link to="/for-kids" className="block pt-1 hover:text-emerald-400 transition-colors">
                    تجربة الطفل التفاعلية
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: مساعدة وقانوني */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wide">NovaTova والمساعدة</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/about" className="hover:text-emerald-400 transition-colors">
                    قصتنا ورؤيتنا
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-emerald-400 transition-colors">
                    المدونة والمقالات التربوية
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-emerald-400 transition-colors">
                    الأسئلة الشائعة
                  </Link>
                </li>
                <li>
                  <Link to="/teach-with-us" className="hover:text-emerald-400 transition-colors">
                    انضم لفريق التدريس
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                    تواصل معنا
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setCookieModalOpen(true)}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-400"
                  >
                    <Cookie size={13} />
                    <span>إعدادات ملفات الارتباط (Cookies)</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Disclaimer & Legal Flags */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              <p className="leading-relaxed">
                <strong>تنويه تربوي وقانوني:</strong> النتائج بتختلف حسب مستوى الطالب وانتظامه في التعلّم.
                لا نقدّم وعوداً مطلقة بنسب نجاح أو درجات امتحانات رسمية.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Link to="/privacy" className="hover:text-white underline">
                  سياسة الخصوصية
                </Link>
                <span>•</span>
                <Link to="/terms" className="hover:text-white underline">
                  شروط الاستخدام
                </Link>
                <span>•</span>
                <Link to="/cookies" className="hover:text-white underline">
                  ملفات تعريف الارتباط
                </Link>
                <PolicyReviewTag text="المستندات القانونية وسياسة الاسترجاع تخضع لمراجعة المالك [POLICY_REVIEW]" />
              </div>
            </div>

            <div className="text-left text-[11px] shrink-0 font-mono text-slate-500">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. جميع الحقوق محفوظة.
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Preferences Modal */}
      {cookieModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-[#16344B] mb-2">إعدادات الخصوصية وملفات الارتباط</h3>
            <p className="text-xs text-[#566974] mb-4">
              نحن نستخدم ملفات تعريف الارتباط الأساسية لتمكين تجربة الموقع التجريبي وحفظ تفضيلاتك (مثل الاتجاه البصري المحدد).
            </p>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#16344B]">ملفات الارتباط الضرورية</div>
                  <div className="text-[11px] text-slate-500">لا يمكن تعطيلها لعمل الموقع</div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  مفعلة دائمًا
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#16344B]">تفضيلات التجربة والمظهر</div>
                  <div className="text-[11px] text-slate-500">تذكر الاتجاه البصري المختار</div>
                </div>
                <input
                  type="checkbox"
                  checked={functionalCookies}
                  onChange={(e) => setFunctionalCookies(e.target.checked)}
                  className="rounded text-[#118F86] focus:ring-[#118F86]"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#16344B]">ملفات القياس والتحسين</div>
                  <div className="text-[11px] text-slate-500">قياس استخدام واجهات التجربة بدون جمع بيانات شخصية</div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsCookies}
                  onChange={(e) => setAnalyticsCookies(e.target.checked)}
                  className="rounded text-[#118F86] focus:ring-[#118F86]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCookieModalOpen(false)}
                className="flex-1 py-2.5 bg-[#118F86] text-white text-xs font-bold rounded-xl hover:bg-[#0E736C]"
              >
                حفظ التفضيلات
              </button>
              <button
                onClick={() => setCookieModalOpen(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
              >
                قبول الكل
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

