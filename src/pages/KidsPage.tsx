import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, ShieldCheck, Heart } from 'lucide-react';
import { VideoModal } from '../components/common/VideoModal';
import { triggerDelightConfetti } from '../components/motion/SignatureElements';
import { FadeIn, InteractiveHoverCard } from '../components/motion/MotionWrapper';

interface KidsPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const KidsPage: React.FC<KidsPageProps> = ({ onOpenTrialModal }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(0);

  const words = [
    { hebrew: 'שלום', arabic: 'مرحبا / سلام', pronunciation: 'شالوم', emoji: '👋' },
    { hebrew: 'תודה', arabic: 'شكرًا', pronunciation: 'تودا', emoji: '🙏' },
    { hebrew: 'בבקשה', arabic: 'لو سمحت / تفضل', pronunciation: 'بيفاكاشا', emoji: '✨' },
    { hebrew: 'בוקר טוב', arabic: 'صباح الخير', pronunciation: 'بوكير توف', emoji: '☀️' },
  ];

  const handleCardClick = (idx: number) => {
    setActiveCard(idx);
    triggerDelightConfetti();
  };

  return (
    <div className="relative overflow-hidden text-right">
      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-[#FFF6E9] via-[#F7F9F6] to-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC77A]/30 text-amber-900 text-xs font-bold border border-[#FFC77A]/50">
              <Sparkles size={14} className="text-amber-600 animate-spin-slow" />
              <span>تعلّم ممتع وبدون خوف</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
              يلا نحكي عبري ونكتشف كلمات جديدة!
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-[#566974] max-w-xl mx-auto leading-relaxed">
              بالحصة منقرأ، منحكي، ومنجرّب مع مدرّس بساعدنا خطوة بخطوة، بنضحك ونتدرّب على مهلنا وبدون أي علامات أو امتحانات.
            </p>
          </FadeIn>

          {/* Interactive Card Word Game with Confetti on Click */}
          <FadeIn direction="up" delay={0.3}>
            <div className="max-w-md mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-lifted">
              <span className="text-xs font-bold text-[#118F86] block mb-3">
                اضغط على أي بطاقة لتسمع/تشوف الكلمة واحتفل بالنطق الصحيح:
              </span>
              <div className="grid grid-cols-2 gap-3">
                {words.map((item, idx) => (
                  <motion.button
                    key={idx}
                    type="button"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(idx)}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      activeCard === idx
                        ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86] ring-4 ring-[#118F86]/20 shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="text-xl font-black font-sans">{item.hebrew}</div>
                    <div className="text-xs text-[#566974] font-medium mt-1">{item.arabic}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">({item.pronunciation})</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Parent Insert */}
          <FadeIn direction="up" delay={0.4}>
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 max-w-md mx-auto text-xs text-[#16344B] flex items-center justify-between">
              <span className="text-[#566974]">للأهل: الحجز يتم عن طريق ولي الأمر</span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenTrialModal('kids-parent-insert')}
                className="px-5 py-2.5 bg-[#118F86] text-white font-bold rounded-xl hover:bg-[#0E736C] shadow-accent"
              >
                احجز حصة مجانية لطفلك
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  );
};
