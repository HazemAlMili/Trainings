import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_LIST } from '../config/siteConfig';
import { PolicyReviewTag } from '../components/common/BrandMotif';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import { FadeIn, PulseBeacon } from '../components/motion/MotionWrapper';

interface FaqPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenTrialModal }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['f-1', 'f-2']);

  const categories = [
    { id: 'all', label: 'الكل (28 سؤال)' },
    { id: 'getting-started', label: 'البداية والتجربة' },
    { id: 'lessons', label: 'الحصص والمواعيد' },
    { id: 'teachers', label: 'المدرسين' },
    { id: 'pricing', label: 'الباقات والدفع' },
    { id: 'parents', label: 'للأهل والأطفال' },
    { id: 'privacy', label: 'الخصوصية والأمان' },
  ];

  const filteredFaqs = FAQ_LIST.filter((item) => {
    const matchCat = selectedCat === 'all' || item.category === selectedCat;
    const matchSearch =
      search.trim() === '' ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative overflow-hidden text-right">
      <section className="pt-12 pb-14 bg-[#F7F9F6] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <FadeIn direction="down">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
              <PulseBeacon color="#118F86" size={7} />
              <span>مركز الإجابات المعتمدة</span>
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
              إجابات واضحة قبل أول حصة
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-sm sm:text-base text-[#566974] max-w-xl mx-auto leading-relaxed">
              جمعنا كل الأسئلة اللي بتخطر ببالك عن طريقة الحجز، الحصص، الأسعار، والمدرسين.
            </p>
          </FadeIn>

          {/* Search Box */}
          <FadeIn direction="up" delay={0.3}>
            <div className="pt-4 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="اكتب سؤالك أو كلمة للبحث..."
                  className="w-full p-3 pr-10 text-xs rounded-2xl border border-slate-200 text-right focus:border-[#118F86] focus:ring-1 focus:ring-[#118F86] shadow-xs"
                />
                <Search size={16} className="absolute top-3.5 right-3.5 text-slate-400" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories Tabs */}
      <section className="py-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  selectedCat === cat.id
                    ? 'bg-[#118F86] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordions List with Silky Smooth Expansion */}
      <section className="py-16 bg-[#F7F9F6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border p-6 text-xs text-[#566974]">
              ما لقينا سؤال بهالكلمة. بتقدر تسألنا على واتساب مباشرة.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-right font-bold text-sm text-[#16344B] flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-2">
                      <span>{faq.question}</span>
                      {faq.isPolicyReview && <PolicyReviewTag text="بند مراجعة" />}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#118F86] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#566974] leading-relaxed border-t border-slate-100">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}

          {/* Bottom Help */}
          <div className="mt-12 bg-white p-7 rounded-3xl border border-slate-200 text-center space-y-3 shadow-soft">
            <h4 className="font-extrabold text-base text-[#16344B]">
              لسه عندك سؤال ما لقيته هون؟
            </h4>
            <p className="text-xs text-[#566974]">
              فريقنا برد عليك بسرعة على واتساب وبساعدك بكل التفاصيل.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenTrialModal('faq-bottom-question')}
              className="px-6 py-3 bg-[#118F86] text-white font-bold text-xs rounded-xl hover:bg-[#0E736C] shadow-accent"
            >
              احكي معنا على واتساب
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};
