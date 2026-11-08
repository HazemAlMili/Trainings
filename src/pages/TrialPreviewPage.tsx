import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Clock, FileText, CreditCard, ShieldCheck } from 'lucide-react';

export const TrialPreviewPage: React.FC = () => {
  const pipelineSteps = [
    {
      num: 1,
      title: 'إرسال طلب الحصة عبر واتساب',
      desc: 'الطلب يتضمن لغة التعلّم، عمر الطفل، والمستوى الحالي.',
      status: 'completed',
    },
    {
      num: 2,
      title: 'مراجعة الفريق البشري والتنسيق',
      desc: 'مستشار NovaTova يتواصل معك لاقتراح موعد ومدرس صبور مناسب.',
      status: 'active',
    },
    {
      num: 3,
      title: 'تأكيد الحصة ورابط الدخول',
      desc: 'تستلم رابط الدخول المباشر قبل الحصة بدون برامج معقدة.',
      status: 'upcoming',
    },
    {
      num: 4,
      title: 'حضور الحصة (25 دقيقة فردية)',
      desc: 'تفاعل مباشر 1:1 مع المعلم وتدريب على المحادثة.',
      status: 'upcoming',
    },
    {
      num: 5,
      title: 'تقرير المدرس وتوصية الباقة',
      desc: 'يصلك تقرير المدرس وملاحظاته، مع اقتراح الباقة الأنسب.',
      status: 'upcoming',
    },
    {
      num: 6,
      title: 'رابط الدفع الآمن (إذا رغبتم بالاستمرار)',
      desc: 'شحن رصيد الحساب فقط في حال رغبتم بإكمال المشوار.',
      status: 'upcoming',
    },
  ];

  return (
    <div className="relative overflow-hidden text-right py-12 md:py-16 bg-[#F7F9F6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
            <Clock size={14} />
            <span>محاكاة مسار ما بعد الحجز</span>
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#16344B]">
            شو بصير بعد ما تتواصل معنا على واتساب؟
          </h1>

          <p className="text-xs sm:text-sm text-[#566974] max-w-lg mx-auto leading-relaxed">
            هذا استعراض توضيحي للمراحل التي يمر بها طلب الحصة التجريبية حتى إتمام التقرير واختيار الباقة.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="divide-y divide-slate-100">
            {pipelineSteps.map((st) => (
              <div key={st.num} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                <div
                  className={`w-9 h-9 rounded-xl font-bold flex items-center justify-center shrink-0 text-xs ${
                    st.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : st.status === 'active'
                      ? 'bg-[#118F86] text-white ring-4 ring-[#118F86]/15'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {st.num}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#16344B]">{st.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        st.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : st.status === 'active'
                          ? 'bg-teal-50 text-[#118F86]'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {st.status === 'completed'
                        ? 'مكتمل'
                        : st.status === 'active'
                        ? 'قيد المعالجة'
                        : 'خطوة قادمة'}
                    </span>
                  </div>
                  <p className="text-xs text-[#566974] mt-1">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
            <strong>تنويه:</strong> هذه الصفحة توضح تدفق العمليات (Workflow Simulation) ولا تمثل نظام CRM حقيقي متصل بالخادم في نسخة الـ Prototype.
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link to="/for-parents" className="text-xs font-bold text-[#118F86] hover:underline">
              ← العودة لصفحة الأهل
            </Link>
            <Link
              to="/trial"
              className="px-5 py-2.5 bg-[#118F86] text-white font-bold text-xs rounded-xl"
            >
              حجز حصة مجانية الآن
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

