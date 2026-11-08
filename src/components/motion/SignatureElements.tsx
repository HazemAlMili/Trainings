import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MessageSquare, Sparkles, Volume2 } from 'lucide-react';
import { FloatingBadge } from './MotionWrapper';

/**
 * Animated Conversational Arc Background
 * SVGs that draw and glow gently
 */
export const AnimatedConversationalArc: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M-50 480C280 480 420 220 720 250C1020 280 1150 110 1500 80"
          stroke="#118F86"
          strokeWidth="3.5"
          strokeDasharray="8 8"
          strokeOpacity={opacity}
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0 550C340 550 510 320 840 340C1170 360 1280 180 1600 160"
          stroke="#FFC77A"
          strokeWidth="3"
          strokeOpacity={opacity * 1.5}
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, delay: 0.3, ease: 'easeInOut' }}
        />
        {/* Subtle breathing ambient glow */}
        <motion.circle
          cx="780"
          cy="280"
          r="240"
          fill="#118F86"
          animate={{ opacity: [opacity * 0.3, opacity * 0.6, opacity * 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          filter="blur(80px)"
        />
        <motion.circle
          cx="1180"
          cy="160"
          r="200"
          fill="#FFC77A"
          animate={{ opacity: [opacity * 0.25, opacity * 0.5, opacity * 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          filter="blur(70px)"
        />
      </svg>
    </div>
  );
};

/**
 * Floating Interactive Bilingual Speech Bubbles
 * Floating around hero imagery to make learning feel alive
 */
export const HeroFloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {/* Top Left: Hebrew Greeting Bubble */}
      <FloatingBadge
        duration={5}
        yOffset={10}
        xOffset={5}
        delay={0.2}
        className="absolute -top-5 -right-4 sm:-right-8 pointer-events-auto"
      >
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lifted border border-slate-200/80 flex items-center gap-2 select-none cursor-pointer group"
          title="שלום — مرحبا"
        >
          <div className="w-7 h-7 rounded-full bg-[#E8F5F4] text-[#118F86] font-bold flex items-center justify-center text-xs">
            ש
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#16344B] group-hover:text-[#118F86] transition-colors font-sans">
              שלום!
            </span>
            <span className="text-[10px] text-[#566974] block">شالوم • مرحباً</span>
          </div>
        </motion.div>
      </FloatingBadge>

      {/* Bottom Right: Student Breakthrough Pill */}
      <FloatingBadge
        duration={6}
        yOffset={8}
        xOffset={6}
        delay={0.8}
        className="absolute -bottom-4 -left-4 sm:-left-6 pointer-events-auto"
      >
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lifted border border-emerald-100 flex items-center gap-2 select-none cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-900 block">صرت أحكي جملة كاملة!</span>
            <span className="text-[10px] text-[#566974]">بدون خوف أو تردد</span>
          </div>
        </motion.div>
      </FloatingBadge>

      {/* Mid Right: Lesson Duration Pill */}
      <FloatingBadge
        duration={4.5}
        yOffset={6}
        xOffset={-4}
        delay={1.2}
        className="absolute top-1/2 -left-6 sm:-left-10 pointer-events-auto hidden sm:block"
      >
        <div className="bg-[#16344B] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 border border-slate-700">
          <Sparkles size={13} className="text-[#FFC77A]" />
          <span>25 دقيقة تركيز وتفاعل</span>
        </div>
      </FloatingBadge>
    </div>
  );
};

/**
 * Interactive Audio Wave Simulation
 * Simulates a warm, lively conversational exchange during a lesson
 */
export const AudioWaveSimulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const triggerAudioDemo = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      onClick={triggerAudioDemo}
      className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 cursor-pointer select-none hover:border-[#118F86] transition-colors"
      title="انقر لتشغيل محاكاة صوت الحوار المباشر"
    >
      <div className="flex items-center gap-2 text-xs">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
            isPlaying ? 'bg-[#118F86] text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <Volume2 size={15} className={isPlaying ? 'animate-pulse' : ''} />
        </div>
        <div>
          <span className="font-bold text-[#16344B] block text-[11px]">حوار تفاعلي مباشر</span>
          <span className="text-[10px] text-slate-400">
            {isPlaying ? 'المعلم والطفل يتبادلان الحوار...' : 'انقر لمعاينة نبض الحصة'}
          </span>
        </div>
      </div>

      {/* Audio Waveform Bars */}
      <div className="flex items-center gap-1 h-6 px-1">
        {[0.4, 0.8, 0.5, 1, 0.7, 0.3, 0.9, 0.6, 0.4].map((scale, i) => (
          <motion.span
            key={i}
            animate={{
              height: isPlaying ? [6, scale * 22, 6] : scale * 12,
            }}
            transition={{
              duration: 0.8,
              repeat: isPlaying ? Infinity : 0,
              delay: i * 0.08,
              ease: 'easeInOut',
            }}
            className="w-1 bg-[#118F86] rounded-full inline-block"
            style={{ height: scale * 12 }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Confetti Trigger
 * Fires gentle celebratory confetti for interactive achievements
 */
export const triggerDelightConfetti = () => {
  confetti({
    particleCount: 45,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#118F86', '#FFC77A', '#16344B', '#146D58'],
    disableForReducedMotion: true,
  });
};

