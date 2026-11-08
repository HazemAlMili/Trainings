import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Send, Copy, Check } from 'lucide-react';
import { StagingAssetBadge } from '../components/common/BrandMotif';

export const TeachWithUsPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    languages: 'hebrew',
    audience: 'children',
    experience: '2-4',
    bio: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden text-right">
      <section className="pt-12 pb-14 bg-[#F7F9F6] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
            <Sparkles size={14} />
            <span>فرص التدريس</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
            بتحبّ التعليم؟ تعرّف على فرص التدريس مع NovaTova
          </h1>

          <p className="text-sm sm:text-base text-[#566974] max-w-xl mx-auto leading-relaxed">
            إذا عندك خبرة بالتعليم والصبر مع الطلاب، ابعتلنا معلوماتك ومنراجع التخصصات المتاحة مع فريقنا.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F7F9F6] p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-bold text-lg text-[#16344B] mb-2">طلب انضمام لمعلم جديد</h3>

                <div>
                  <label className="block font-bold text-[#16344B] mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs"
                    placeholder="اسمك الكامل..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#16344B] mb-1">رقم الهاتف للتواصل *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs"
                      placeholder="050-0000000"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#16344B] mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs"
                      placeholder="teacher@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#16344B] mb-1">اللغة التي تدرّسها *</label>
                    <select
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs font-medium"
                    >
                      <option value="hebrew">العبرية</option>
                      <option value="english">الإنجليزية</option>
                      <option value="german">الألمانية</option>
                      <option value="french">الفرنسية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#16344B] mb-1">الفئة العمرية المفضلة *</label>
                    <select
                      value={formData.audience}
                      onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs font-medium"
                    >
                      <option value="children">الأطفال (9–14)</option>
                      <option value="adults">الكبار والمحادثة</option>
                      <option value="both">كلاهما</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#16344B] mb-1">سنوات الخبرة في التعليم *</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs font-medium"
                  >
                    <option value="0-1">أقل من سنتين</option>
                    <option value="2-4">2 إلى 4 سنوات</option>
                    <option value="5+">5 سنوات فأكثر</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#16344B] mb-1">نبذة عن أسلوبك في التعليم *</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs"
                    placeholder="كيف بتتعامل مع الطلاب الخجولين؟ وشو طريقتك بالدرس؟"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#118F86] hover:bg-[#0E736C] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-accent"
                >
                  <Send size={15} />
                  <span>إرسال اهتمامي بالتدريس</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#118F86] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-bold text-lg text-[#16344B]">تم استلام نموذج الاهتمام</h3>
                <p className="text-xs text-[#566974] max-w-sm mx-auto leading-relaxed">
                  هاي معاينة توضيحية لنموذج التوظيف؛ الطلب ما انبعت لنظام توظيف فعلي. يمكنك التواصل مع فريق الإدارة عبر البريد الرسمي.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                >
                  العودة للنموذج
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

