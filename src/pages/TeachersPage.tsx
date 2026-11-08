import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CMS_TEACHERS } from '../config/siteConfig';
import { LanguageCode, LearnerAudience } from '../types';
import { StagingAssetBadge } from '../components/common/BrandMotif';
import { Search, Filter, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface TeachersPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const TeachersPage: React.FC<TeachersPageProps> = ({ onOpenTrialModal }) => {
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTeachers = CMS_TEACHERS.filter((teacher) => {
    const matchLang = selectedLang === 'all' || teacher.languages.includes(selectedLang as LanguageCode);
    const matchAudience = selectedAudience === 'all' || teacher.audiences.includes(selectedAudience as LearnerAudience);
    const matchSearch =
      searchQuery.trim() === '' ||
      teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.shortBio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLang && matchAudience && matchSearch;
  });

  return (
    <div className="relative overflow-hidden text-right">
      <section className="pt-12 pb-14 bg-[#F7F9F6] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
            <Sparkles size={14} />
            <span>فريق التدريس المباشر</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
            تعرّف على المدرسين اللي ممكن يرافقوك برحلة التعلّم
          </h1>

          <p className="text-sm sm:text-base text-[#566974] max-w-2xl mx-auto leading-relaxed">
            اختيار المدرس المناسب بيساعدك ترتاح بالحصة. شوف التخصص وأسلوب التعليم، وفريقنا بيساعدك تحجز حسب التوفّر.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم المدرس أو التخصص..."
                className="w-full p-2.5 pr-9 text-xs rounded-xl border border-slate-200 text-right focus:border-[#118F86] focus:ring-1 focus:ring-[#118F86]"
              />
              <Search size={16} className="absolute top-3 right-3 text-slate-400" />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="p-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 font-medium"
              >
                <option value="all">كل اللغات</option>
                <option value="hebrew">العبرية</option>
                <option value="english">الإنجليزية</option>
                <option value="german">الألمانية</option>
              </select>

              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="p-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 font-medium"
              >
                <option value="all">كل الفئات</option>
                <option value="child">أطفال (9–14)</option>
                <option value="adult">كبار ومحادثة</option>
                <option value="work">مواقف عمل</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-16 bg-[#F7F9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filteredTeachers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
              <p className="text-sm font-bold text-[#16344B] mb-2">
                ما لقينا مدرسين بهالفلاتر حاليًا
              </p>
              <p className="text-xs text-[#566974] mb-4">
                احكيلنا شو بتحتاج وفريق الدعم بيساعدك في إيجاد المدرس الأنسب.
              </p>
              <button
                onClick={() => onOpenTrialModal('teachers-empty-help')}
                className="px-5 py-2.5 bg-[#118F86] text-white text-xs font-bold rounded-xl"
              >
                اطلب مساعدة من الفريق
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.slug}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft text-right flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#E8F5F4] text-[#118F86] font-bold flex items-center justify-center text-lg">
                          {teacher.firstName[0]}
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-[#16344B]">
                            {teacher.firstName}
                          </h3>
                          <span className="text-xs text-[#566974]">
                            {teacher.languages.map((l) => (l === 'hebrew' ? 'عبري' : l === 'english' ? 'إنجليزي' : 'ألماني')).join('، ')}
                          </span>
                        </div>
                      </div>

                      {teacher.status === 'verified' ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          بيانات معتمدة
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          ملف تجريبي (بانتظار الاعتماد)
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#566974] leading-relaxed mb-4">
                      {teacher.fullBio}
                    </p>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs mb-4">
                      <strong className="text-[#16344B]">طريقة وأسلوب الحصة: </strong>
                      <span className="text-[#566974]">{teacher.approach}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => onOpenTrialModal(`teacher-${teacher.slug}`)}
                      className="flex-1 py-2.5 bg-[#118F86] hover:bg-[#0E736C] text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      اسأل عن حصة مع {teacher.firstName}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12">
            <StagingAssetBadge
              label="دليل المدرسين العام — فصل تام عن لوحة المعلمين الخاصة"
              note="المواعيد والجدول الزمني يتم تنسيقه يدويًا مع فريق NovaTova على واتساب."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

