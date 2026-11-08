import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Heart, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { CMS_STORIES } from '../../config/siteConfig';

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const stories = CMS_STORIES;

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, stories.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const current = stories[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative max-w-4xl mx-auto text-right"
    >
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft relative overflow-hidden">
        {/* Subtle decorative speech watermark */}
        <div className="absolute top-4 left-6 text-slate-100 font-serif text-8xl select-none pointer-events-none">
          “
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6 relative z-10"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-150">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F5F4] text-[#118F86] font-bold flex items-center justify-center text-sm shadow-2xs">
                  {current.publicDisplayName[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#16344B]">
                    {current.publicDisplayName}
                  </h4>
                  <span className="text-[11px] text-[#566974]">
                    تجربة تعلم حقيقية • {current.sourceDate}
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>موافقة موثقة للنشر</span>
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#16344B] leading-snug">
              "{current.title}"
            </h3>

            {/* Story comparison pills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#F7F9F6] border border-slate-200">
                <strong className="text-slate-500 block mb-1">نقطة البداية والتحدي:</strong>
                <p className="text-[#566974]">{current.startingPoint}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <strong className="text-[#118F86] block mb-1">الأثر والتغيير الملحوظ:</strong>
                <p className="text-emerald-950 font-medium">{current.observedGrowth}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-150 mt-6">
          {/* Indicator dots */}
          <div className="flex items-center gap-2">
            {stories.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-[#118F86]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`انتقل للقصة ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-[#118F86] hover:bg-slate-50 transition-colors text-[#16344B]"
              aria-label="القصة السابقة"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-[#118F86] hover:bg-slate-50 transition-colors text-[#16344B]"
              aria-label="القصة التالية"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

