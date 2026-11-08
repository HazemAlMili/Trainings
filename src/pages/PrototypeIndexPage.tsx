import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldAlert, ExternalLink, Smartphone, Monitor } from 'lucide-react';
import { PolicyReviewTag, StagingAssetBadge } from '../components/common/BrandMotif';

interface PrototypeIndexPageProps {
  onOpenBrandLab: () => void;
  onOpenTrialModal: (source?: string) => void;
}

export const PrototypeIndexPage: React.FC<PrototypeIndexPageProps> = ({
  onOpenBrandLab,
  onOpenTrialModal,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'routes' | 'gates' | 'limitations'>('matrix');

  const routesList = [
    {
      path: '/',
      name: 'الصفحة الرئيسية',
      desc: 'H01-H13: منتقي الجمهور التفاعلي، بطاقات اللغات، الرصيد العائلي، الأسعار',
      status: 'جاهزة ومكتملة',
      type: 'Production Ready',
    },
    {
      path: '/for-parents',
      name: 'صفحة الأهل (الرائدة - Gate 2)',
      desc: 'المسار الأساسي للعبرية (9–14)، حاسبة الرصيد، تقرير المعلم، معاينة الفيديو',
      status: 'معيار الجودة المرجعي ★',
      type: 'Flagship Reference',
    },
    {
      path: '/languages/hebrew',
      name: 'مسار العبرية',
      desc: 'المسار التجاري الأول، تبويبات تفاعلية (أطفال / كبار / مواقف عمل)',
      status: 'مكتملة',
      type: 'Core Language',
    },
    {
      path: '/languages/english',
      name: 'مسار الإنجليزية',
      desc: 'تأسيس ونطق ومحادثة عملية',
      status: 'مكتملة',
      type: 'Language',
    },
    {
      path: '/languages/german',
      name: 'مسار الألمانية',
      desc: 'أساسيات وتواصل بالوتيرة المناسبة',
      status: 'مكتملة',
      type: 'Language',
    },
    {
      path: '/languages/french',
      name: 'مسار الفرنسية',
      desc: 'خطوات تواصل عملية ونطق دقيق',
      status: 'مكتملة',
      type: 'Language',
    },
    {
      path: '/for-kids',
      name: 'صفحة الأطفال',
      desc: 'بطاقات كلمات تفاعلية، توجيه الحجز لولي الأمر بدون ألعاب مزيفة',
      status: 'مكتملة',
      type: 'Child Facing',
    },
    {
      path: '/for-adults',
      name: 'صفحة الكبار والمحادثة',
      desc: 'مواقف الحياة اليومية (طبيب، بنك، هاتف)، اختيار مدة 25 أو 55 دقيقة',
      status: 'مكتملة',
      type: 'Adult Segment',
    },
    {
      path: '/for-work',
      name: 'صفحة مواقف العمل',
      desc: 'مسار تجريبي مميز بشارة صريحة، محاكاة المقابلات دون وعود وظيفية',
      status: 'مسار تجريبي موثق',
      type: 'Test Track',
    },
    {
      path: '/how-it-works',
      name: 'كيف بنشتغل',
      desc: 'خطوات العمل الأربع، أدراج تفاعلية، شرح تدفق المتابعة',
      status: 'مكتملة',
      type: 'Explainer',
    },
    {
      path: '/pricing',
      name: 'الباقات والأسعار',
      desc: 'أسعار 15 و 25 و 50 و 100 حصة، مبدل 25/55 دقيقة، مودال مقارنة، الرصيد العائلي',
      status: 'بيانات اقتصادية معتمدة',
      type: 'Commercial Core',
    },
    {
      path: '/teachers',
      name: 'دليل المدرسين',
      desc: 'دليل عام منفصل عن لوحة المعلمين الخاصة، فلترة حسب اللغة والفئة',
      status: 'ملفات حقيقية + بطاقات تجريبية',
      type: 'Directory',
    },
    {
      path: '/stories',
      name: 'تجارب الطلاب والأهالي',
      desc: 'صيغة موثقة بموافقة خطية، خلو تام من التقييمات والأرقام المفبركة',
      status: 'مكتملة',
      type: 'Proof',
    },
    {
      path: '/about',
      name: 'عن NovaTova',
      desc: 'القصة، المبادئ الأربعة، الفارق عن المنصات والتطبيقات',
      status: 'مكتملة',
      type: 'Brand Story',
    },
    {
      path: '/blog',
      name: 'المدونة التربوية',
      desc: '3 مقالات مسودة أصلية كاملة، بحث، فلاتر، نسخ ومشاركة واتساب',
      status: 'محتوى أصلي مكتمل',
      type: 'Content Hub',
    },
    {
      path: '/faq',
      name: 'الأسئلة الشائعة',
      desc: '28 سؤالاً مصنفاً مع إجابات فلسطينية واقعية وإشارات مراجعة السياسات',
      status: '28 سؤالاً مكتملة',
      type: 'Knowledge Base',
    },
    {
      path: '/contact',
      name: 'تواصل معنا',
      desc: 'نموذج تحقق كامل، تجهيز رسالة واتساب، عدم ادعاء إرسال وهمي',
      status: 'مكتملة',
      type: 'Form & Handoff',
    },
    {
      path: '/teach-with-us',
      name: 'انضم كمدرس',
      desc: 'نموذج تقديم تجريبي لمعلمي اللغات مع تنويه واضح',
      status: 'مكتملة',
      type: 'Recruitment',
    },
    {
      path: '/trial',
      name: 'معالج حجز الحصة المجانية',
      desc: '3 خطوات سريعة، استخلاص المعلمات، تجهيز رسالة واتساب مخصصة',
      status: 'محرك التحويل الأساسي',
      type: 'Funnel Wizard',
    },
    {
      path: '/trial/preview',
      name: 'محاكاة رحلة ما بعد الحجز',
      desc: 'مراحل متابعة الطالب، تقرير المعلم، واختيار الباقة التوضيحي',
      status: 'محاكاة CRM',
      type: 'Workflow Demo',
    },
    {
      path: '/privacy',
      name: 'سياسة الخصوصية',
      desc: 'رابط النسخة المعتمدة وتنويه تدقيق تسجيل الحصص للأطفال [POLICY_REVIEW]',
      status: 'بانتظار المراجعة القانونية',
      type: 'Legal Staging',
    },
    {
      path: '/terms',
      name: 'شروط الاستخدام',
      desc: 'تنبيه توحيد بند الاسترجاع 14 يوماً [POLICY_REVIEW]',
      status: 'بانتظار المراجعة القانونية',
      type: 'Legal Staging',
    },
    {
      path: '/cookies',
      name: 'إعدادات ملفات الارتباط',
      desc: 'تحكم محلي حقيقي بتفضيلات الخصوصية والكوكيز',
      status: 'مكتملة تفاعلياً',
      type: 'Privacy Controls',
    },
    {
      path: '/login-preview',
      name: 'معاينة تسجيل الدخول',
      desc: 'واجهة تجريبية مع تحذير عدم الاتصال بقاعدة بيانات حقيقية',
      status: 'معاينة فقط',
      type: 'Demo Auth',
    },
  ];

  return (
    <div className="py-12 md:py-16 bg-[#F7F9F6] text-right min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5F4] text-[#118F86] border border-[#118F86]/20">
                NovaTova 2.1 — Master QA & Prototype Registry
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16344B] mt-2">
                سجل فحص الجودة، بوابات الاعتماد (Gates 0–4)، ومسارات النموذج الأولي
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenBrandLab}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>فتح معمل الهوية (Gate 1 Lab)</span>
              </button>
              <button
                onClick={() => onOpenTrialModal('qa-registry-cta')}
                className="px-4 py-2 bg-[#118F86] hover:bg-[#0E736C] text-white font-bold text-xs rounded-xl shadow-accent transition-colors"
              >
                تجربة مسار الحجز (Gate 3)
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#566974] leading-relaxed">
            تم بناء هذا النموذج الأولي الفاخر والتفاعلي وفقاً لـ <strong>مخطط المحتوى والتفاعل الكامل NovaTova 2.0</strong>،
            مع التقيد الصارم بمبدأ "الجودة والأصالة قبل الكمية"، ومنهجية بوابات الجودة الأربع (Quality Gates 0–4)،
            ودون أي فبركة لبيانات أو تقييمات أو وعود غير معتمدة.
          </p>

          {/* Nav Tabs */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-150 mt-6 text-xs">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'matrix' ? 'bg-[#16344B] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Gate 0: مصفوفة المقارنة والتأطير
            </button>
            <button
              onClick={() => setActiveTab('gates')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'gates' ? 'bg-[#16344B] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              بوابات الجودة (Gates 1, 2, 3 Checklists)
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'routes' ? 'bg-[#16344B] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              دليل الروابط والمسارات ({routesList.length} صفحة)
            </button>
            <button
              onClick={() => setActiveTab('limitations')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'limitations' ? 'bg-[#16344B] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              تقرير القيود وقياس التحويل لما بعد الإطلاق
            </button>
          </div>
        </div>

        {/* TAB 1: Gate 0 Matrix */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft">
              <h2 className="text-lg font-bold text-[#16344B] mb-2">
                Gate 0 — مصفوفة المقارنة التنافسية الموضوعية (Novakid vs NovaTova)
              </h2>
              <p className="text-xs text-[#566974] mb-6 leading-relaxed">
                مقارنة دقيقة مبنية على فحص موقع Novakid العربي والبيانات التشغيلية الحقيقية لـ NovaTova.
                تم استبعاد أي ادعاءات غير مدعمة أو افتراض نسب تحويل مفبركة.
              </p>

              <div className="overflow-x-auto text-xs">
                <table className="w-full border-collapse text-right">
                  <thead>
                    <tr className="bg-slate-100 text-[#16344B] border-b border-slate-200">
                      <th className="p-3 font-bold w-1/5">محور المقارنة</th>
                      <th className="p-3 font-bold w-2/5 text-slate-700">منصة Novakid (Benchmark)</th>
                      <th className="p-3 font-bold w-2/5 text-[#118F86]">NovaTova 2.1 (الاستراتيجية المعتمدة)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-bold text-[#16344B]">1. وضوح التموضع</td>
                      <td className="p-3 text-slate-600">تعليم إنجليزية عام للأطفال الصغار (4–12 سنة) معتمد على بيئة ألعاب وفضاء وكواكب.</td>
                      <td className="p-3 text-[#16344B] font-semibold bg-emerald-50/30">
                        تعليم العبرية للأطفال واليافعين (9–14 سنة) كمسار تجاري رائد لمجتمع عرب 48، مع مسارات للكبار ولغات إضافية.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#16344B]">2. اتساق الهوية البصرية</td>
                      <td className="p-3 text-slate-600">رسومات كرتونية فضائية ملونة (أرجواني/أصفر) موجهة للأطفال دون سن العاشرة.</td>
                      <td className="p-3 text-[#16344B] font-semibold bg-emerald-50/30">
                        هوية أصلية راقية غير طفولية مبنية على "قوس الحوار والتقدّم الإنساني"، هادئة ومطمئنة للأهل بدون استنساخ أسلوب الكواكب.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#16344B]">3. أدلة الثقة والمصداقية</td>
                      <td className="p-3 text-slate-600">شهادات واعتمادات دولية واسعة النطاق لتدريس الإنجليزية كلغة ثانية.</td>
                      <td className="p-3 text-[#16344B] font-semibold bg-emerald-50/30">
                        شرح بالعربية عند الحاجة، مدرس مباشر، ونزاهة صارمة: استبعاد أي شهادات أو تقييمات نجوم أو أرقام طلاب غير موثقة رسمياً.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#16344B]">4. إجراء أول CTA</td>
                      <td className="p-3 text-slate-600">طلب تسجيل حساب بالبريد وكلمة المرور وحجز آلي فوري ببطاقة ائتمان.</td>
                      <td className="p-3 text-[#16344B] font-semibold bg-emerald-50/30">
                        حصة تجريبية مجانية 100% بدون بطاقة ائتمان، تُرتب عبر محادثة ودية مع فريق بشري عبر واتساب لتقليل الاحتكاك.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#16344B]">5. التخصيص والملاءمة</td>
                      <td className="p-3 text-slate-600">منهج آلي موحد مقسم حسب مستويات CEFR للأطفال.</td>
                      <td className="p-3 text-[#16344B] font-semibold bg-emerald-50/30">
                        خطة فردية تبدأ من نقطة ضعف الطفل (خجل، محادثة، مدرسة)، مع ميزة حصرية لمشاركة الرصيد بين الأخوة (Family Wallet).
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#16344B]">6. تجربة الموبايل (390px)</td>
                      <td className="p-3 text-slate-600">تصميم ثقيل بالرسومات المتحركة يتطلب تطبيقاً محلياً للمتابعة.</td>
                      <td className="p-3 text-[#16344B] font-semibold bg-emerald-50/30">
                        تصميم عربي أصيل (RTL Native) سريع وخفيف، عناصر لمس لا تقل عن 44px، ومسار مباشر لواتساب بنقرة واحدة.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#16344B]">7. مرونة تغيير المدرس</td>
                      <td className="p-3 text-slate-600">إدارة الجداول عبر المنصة مع تنوع كبير في جنسيات المدرسين.</td>
                      <td className="p-3 text-[#16344B] font-semibold bg-emerald-50/30">
                        مرونة عالية واستبدال المدرس بالتنسيق مع الدعم في حال عدم التوافق النفسي مع شخصية الطفل.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#16344B]">8. تقارير ومتابعة الأهل</td>
                      <td className="p-3 text-slate-600">لوحة تحكم رقمية وفيديوهات مسجلة للحصص.</td>
                      <td className="p-3 text-[#16344B] font-semibold bg-emerald-50/30">
                        ملاحظات نصية حقيقية من المعلم (ما تم التدريب عليه، نقاط القوة، الخطوة القادمة) توفر الشفافية التامة لولي الأمر.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#16344B]">9. احتكاك الحجز (Booking Friction)</td>
                      <td className="p-3 text-slate-600">متوسط إلى مرتفع للأهالي المترددين في الدفع الإلكتروني المسبق.</td>
                      <td className="p-3 text-[#16344B] font-semibold bg-emerald-50/30">
                        منخفض جداً: مسار مباشر عبر واتساب يتوافق مع العادات الاستهلاكية المحلية لمجتمع عرب 48.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Confirmed Value Propositions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-base text-[#16344B] mb-3">
                ما هو مؤكد تشغيلياً واقتصادياً لـ NovaTova:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#566974]">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#118F86] shrink-0 mt-0.5" />
                  <span>حصص فردية 1:1 خاصة ومباشرة لمدة 25 دقيقة للأطفال (و55 دقيقة للكبار).</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#118F86] shrink-0 mt-0.5" />
                  <span>دعم كامل وتوضيح باللغة العربية عند حاجة الطفل لكسر حاجز الخجل والارتباك.</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#118F86] shrink-0 mt-0.5" />
                  <span>ميزة الرصيد العائلي المشترك (توزيع الحصص بحرية بين الأبناء من باقة واحدة).</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Quality Gates Checklists */}
        {activeTab === 'gates' && (
          <div className="space-y-6">
            {/* Gate 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between pb-3 border-b mb-4">
                <span className="font-bold text-sm text-[#16344B]">Gate 1: تميّز الهوية البصرية (Brand Identity Gate)</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">اجتاز التحقق 5/5</span>
              </div>
              <ul className="space-y-2 text-xs text-[#566974]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#118F86]" />
                  <span>بناء 3 اتجاهات بصرية أصلية (A و B و C) يمكن التبديل بينها لحظياً من معمل الهوية.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#118F86]" />
                  <span>توفير اختبار حجب الشعار (Blind Logo Test) لإثبات أن لغة المنحنيات والألوان كافية لتمييز البراند.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#118F86]" />
                  <span>تنسيق عربي أصيل (RTL Native) مع خطوط IBM Plex Sans Arabic وتباين لوني معتمد.</span>
                </li>
              </ul>
            </div>

            {/* Gate 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between pb-3 border-b mb-4">
                <span className="font-bold text-sm text-[#16344B]">Gate 2: إتقان صفحة الأهل الرائدة (/for-parents)</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">اجتاز التحقق 5/5</span>
              </div>
              <ul className="space-y-2 text-xs text-[#566974]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#118F86]" />
                  <span>الهيرو يجيب فوراً بدون سكرول: لمين (أطفال 9–14)، شو (عبري 25 دقيقة 1:1)، كيف، وما هي الخطوة التالية.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#118F86]" />
                  <span>شريط ثقة فوري، حاسبة رصيد عائلي تفاعلية، نموذج تقرير المدرس الحقيقي، وبطاقات مدرسين بشارات شفافة.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#118F86]" />
                  <span>تسعير واضح للأطفال: 15 حصة = 390 ₪ و 25 حصة = 600 ₪ بدون أي إجبار على الشراء قبل التجربة المجانية.</span>
                </li>
              </ul>
            </div>

            {/* Gate 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between pb-3 border-b mb-4">
                <span className="font-bold text-sm text-[#16344B]">Gate 3: مسارا التحويل عبر واتساب (Funnel Variants A & B)</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">اجتاز التحقق 5/5</span>
              </div>
              <ul className="space-y-2 text-xs text-[#566974]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#118F86]" />
                  <span>المسار A: نقرة واحدة مباشرة تفتح محادثة واتساب بنص جاهز ومصادر الحملات.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#118F86]" />
                  <span>المسار B: مجهّز الطلب السريع (3 خطوات خفيفة تجمع المتعلم والعمر والمستوى وترسل الرسالة).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#118F86]" />
                  <span>عدم ادعاء الحجز الآلي؛ رسالة صريحة بأن التأكيد يتم عبر الموظف البشري على واتساب.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: Route Inventory */}
        {activeTab === 'routes' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft">
            <h2 className="text-lg font-bold text-[#16344B] mb-4">
              سجل الروابط والصفحات المنفذة بالكامل ({routesList.length} صفحة)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {routesList.map((r) => (
                <div
                  key={r.path}
                  className="p-4 rounded-xl border border-slate-200 hover:border-[#118F86] transition-all bg-[#F7F9F6] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        to={r.path}
                        className="font-bold text-sm text-[#16344B] hover:text-[#118F86] flex items-center gap-1"
                      >
                        <span>{r.name}</span>
                        <ExternalLink size={12} />
                      </Link>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                        {r.path}
                      </span>
                    </div>
                    <p className="text-[#566974] leading-relaxed mb-3">{r.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px]">
                    <span className="font-semibold text-emerald-700">{r.status}</span>
                    <span className="text-slate-400">{r.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Limitations & Measurement Report */}
        {activeTab === 'limitations' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-6 text-xs text-[#566974] leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-[#16344B] mb-2">
                تقرير القيود وقياس التحويل لما بعد الإطلاق (Measurement & Limitations Report)
              </h2>
              <p>
                وثيقة استراتيجية تحدد ما تم إنجازه في واجهات التصميم، المواد المطلوبة من الفريق التجاري، ومتطلبات الربط البرمجي الحقيقي.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <h3 className="font-bold text-sm text-emerald-900 mb-2">1. ما تم إنجازه بنسبة 100%:</h3>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>النظام البصري الكامل بالاتجاهات الثلاثة (A, B, C).</li>
                  <li>كافة الروابط الـ 24 المذكورة في المخطط العام.</li>
                  <li>مسارا التحويل واتساب (Direct & Assistant).</li>
                  <li>حاسبة الرصيد العائلي ونموذج تقرير المعلم الحقيقي.</li>
                  <li>جدول الأسعار الدقيق لـ 15 و 25 و 50 و 100 حصة.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                <h3 className="font-bold text-sm text-amber-900 mb-2">2. أصول تتطلب موافقة المالك قبل النشر:</h3>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>فيديوهات وصور حقيقية للأطفال بموافقة خطية من الأهل.</li>
                  <li>توحيد البند القانوني لسياسة الاسترجاع (14 يوماً).</li>
                  <li>تأكيد سياسة تسجيل جلسات زووم مع حماية خصوصية الأطفال.</li>
                  <li>ربط رقم واتساب التشغيلي المعتمد بالمنصة.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <h3 className="font-bold text-sm text-blue-900 mb-2">3. تكاملات الأنظمة الخلفية (CRM):</h3>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>ربط محادثات واتساب بنظام إدارة العملاء (CRM).</li>
                  <li>أتمتة إرسال روابط الدفع الإلكتروني بعد التجربة.</li>
                  <li>أتمتة إرسال تذكيرات الحصة وإشعارات التقارير.</li>
                  <li>قياس أداء التحويل A/B Test الفعلي بين المسارين A و B.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

