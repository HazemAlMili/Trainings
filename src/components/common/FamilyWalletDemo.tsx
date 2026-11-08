import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { triggerDelightConfetti } from '../motion/SignatureElements';

export const FamilyWalletDemo: React.FC = () => {
  const [totalCredits, setTotalCredits] = useState<number>(25);
  const [child1Credits, setChild1Credits] = useState<number>(15);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const child2Credits = totalCredits - child1Credits;
  const child1Percent = Math.round((child1Credits / totalCredits) * 100);
  const child2Percent = 100 - child1Percent;

  const handleChild1Change = (val: number) => {
    const clamped = Math.max(0, Math.min(totalCredits, val));
    setChild1Credits(clamped);
  };

  const handleTotalChange = (val: number) => {
    setTotalCredits(val);
    setChild1Credits(Math.round(val * 0.6));
  };

  const handlePreset = (preset: 'even' | 'older') => {
    if (preset === 'even') {
      setChild1Credits(Math.floor(totalCredits / 2));
    } else {
      setChild1Credits(Math.round(totalCredits * 0.7));
    }
    triggerDelightConfetti();
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-soft max-w-3xl mx-auto text-right relative overflow-hidden">
      {/* Interactive Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#118F86]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-150">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5F4] text-[#118F86]">
            <Sparkles size={14} className="text-[#FFC77A]" />
            <span>ميزة حصرية للعائلات</span>
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-[#16344B] mt-1.5">
            محاكي الرصيد العائلي المشترك (Family Wallet)
          </h3>
        </div>
        <div className="text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1.5">
          <AlertCircle size={14} className="text-amber-600 shrink-0" />
          <span>مثال تفاعلي توضيحي، مش حساب حقيقي</span>
        </div>
      </div>

      <p className="text-sm text-[#566974] mb-6 leading-relaxed">
        عندك ولدين أو أكثر؟ مش لازم تشتري اشتراك منفصل لكل طفل. بتشتري باقة واحدة من حساب ولي الأمر،
        وبتقدر توزّع الحصص بينهم وتعدّلها بأي وقت حسب احتياج كل واحد وسرعة تقدّمه.
      </p>

      {/* Package Selector */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-[#16344B] mb-2.5">
          1. اختار حجم الباقة المشتركة:
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { count: 15, label: '15 حصة', price: '390 ₪' },
            { count: 25, label: '25 حصة', price: '600 ₪ (الموصى بها)' },
            { count: 50, label: '50 حصة', price: '1,000 ₪' },
          ].map((pack) => (
            <motion.button
              key={pack.count}
              type="button"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTotalChange(pack.count)}
              className={`p-3 text-xs font-bold rounded-2xl border transition-all text-center flex flex-col items-center justify-center ${
                totalCredits === pack.count
                  ? 'border-[#118F86] bg-[#E8F5F4] text-[#118F86] ring-2 ring-[#118F86]/20 shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="font-extrabold text-sm">{pack.label}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">{pack.price}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Interactive Slider & Split Presets */}
      <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 mb-6 relative">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#16344B] mb-3">
          <span>2. اسحب لتوزيع الحصص بين الأولاد:</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-normal">توزيعات سريعة:</span>
            <button
              type="button"
              onClick={() => handlePreset('even')}
              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] hover:border-[#118F86] transition-colors"
            >
              مناصفة 50/50
            </button>
            <button
              type="button"
              onClick={() => handlePreset('older')}
              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] hover:border-[#118F86] transition-colors"
            >
              أولوية 70/30
            </button>
          </div>
        </div>

        {/* Dynamic Dual Progress Visualizer */}
        <div className="h-4 bg-slate-200 rounded-full overflow-hidden flex mb-3 p-0.5 border border-slate-300/60 shadow-inner">
          <motion.div
            className="h-full bg-[#118F86] rounded-full"
            initial={false}
            animate={{ width: `${child1Percent}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          />
          <motion.div
            className="h-full bg-[#E5A54F] rounded-full"
            initial={false}
            animate={{ width: `${child2Percent}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          />
        </div>

        <input
          type="range"
          min="0"
          max={totalCredits}
          value={child1Credits}
          onChange={(e) => handleChild1Change(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#118F86]"
          aria-label="توزيع الحصص بين الطفلين"
        />

        {/* Children Allocation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Child 1 */}
          <motion.div
            layout
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F5F4] text-[#118F86] font-bold flex items-center justify-center text-sm shadow-2xs">
                كرم
              </div>
              <div>
                <div className="font-bold text-sm text-[#16344B]">كرم (12 سنة)</div>
                <div className="text-[11px] text-[#566974]">محادثة وتقوية للمدرسة</div>
              </div>
            </div>
            <div className="text-left">
              <motion.div
                key={child1Credits}
                initial={{ scale: 1.2, color: '#118F86' }}
                animate={{ scale: 1, color: '#118F86' }}
                className="text-2xl font-black font-mono"
              >
                {child1Credits}
              </motion.div>
              <div className="text-[10px] text-slate-400 font-semibold">{child1Percent}% من الرصيد</div>
            </div>
          </motion.div>

          {/* Child 2 */}
          <motion.div
            layout
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FFF6E9] text-[#E5A54F] font-bold flex items-center justify-center text-sm shadow-2xs">
                يارا
              </div>
              <div>
                <div className="font-bold text-sm text-[#16344B]">يارا (9 سنوات)</div>
                <div className="text-[11px] text-[#566974]">تأسيس ونطق بأسلوب هادئ</div>
              </div>
            </div>
            <div className="text-left">
              <motion.div
                key={child2Credits}
                initial={{ scale: 1.2, color: '#E5A54F' }}
                animate={{ scale: 1, color: '#E5A54F' }}
                className="text-2xl font-black font-mono"
              >
                {child2Credits}
              </motion.div>
              <div className="text-[10px] text-slate-400 font-semibold">{child2Percent}% من الرصيد</div>
            </div>
          </motion.div>
        </div>

        {/* Celebration Toast */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} className="text-[#118F86]" />
              <span>تم ضبط التوزيع بنجاح! الرصيد جاهز للاستخدام بين الأبناء.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust & Policy Assurance */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#566974] bg-[#F7F9F6] p-3.5 rounded-xl border border-[#D8E2E5]">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#118F86]" />
          <span>كل طفل إله ملف وملاحظات مستقلة من المدرس لمتابعة تقدّمه الفردي.</span>
        </div>
        <span className="text-[11px] text-slate-500">
          بتقدر تعدّل التوزيع بأي وقت عبر رسالة بسيطة لفريق الدعم.
        </span>
      </div>
    </div>
  );
};
