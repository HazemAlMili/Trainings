import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from './BrandMotif';
import { Menu, X, ChevronDown, Sparkles, LogIn, ArrowRight } from 'lucide-react';
import { PulseBeacon } from '../motion/MotionWrapper';

interface HeaderProps {
  onOpenBrandLab: () => void;
  onOpenTrialModal: (source?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBrandLab, onOpenTrialModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [audienceMenuOpen, setAudienceMenuOpen] = useState(false);
  const [learnMenuOpen, setLearnMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAllDropdowns = () => {
    setLangMenuOpen(false);
    setAudienceMenuOpen(false);
    setLearnMenuOpen(false);
    setAboutMenuOpen(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' as const },
    },
    exit: {
      opacity: 0,
      y: 6,
      scale: 0.98,
      transition: { duration: 0.15 },
    },
  };

  return (
    <>
      {/* Top Subtle Announcement Bar */}
      <div className="bg-[#16344B] text-slate-100 text-xs py-2 px-4 text-center border-b border-slate-700/50 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <PulseBeacon color="#118F86" size={7} />
            <span className="font-medium">
              حصة تجريبية مجانية لكل طفل جديد (9–14 سنة) — رتبها معنا على واتساب
            </span>
          </div>

          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenBrandLab}
              className="text-[11px] font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full transition-colors"
              title="مراجعة وتغيير الاتجاهات البصرية الثلاثة"
            >
              <Sparkles size={12} />
              <span>معمل الهوية (Gate 1 Lab)</span>
            </motion.button>
            <Link
              to="/prototype-index"
              className="text-[11px] text-slate-300 hover:text-white underline decoration-slate-500"
            >
              سجل الصفحات والاعتماد (QA Registry)
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header with dynamic elevation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-200/90 py-2'
            : 'bg-white/90 backdrop-blur-xs border-b border-slate-200/70 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={closeAllDropdowns} className="shrink-0 group">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <BrandLogo />
            </motion.div>
          </Link>

          {/* Desktop Mega Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold text-[#16344B]">
            {/* Languages Mega Dropdown */}
            <div className="relative" onMouseLeave={() => setLangMenuOpen(false)}>
              <button
                type="button"
                onMouseEnter={() => setLangMenuOpen(true)}
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                  langMenuOpen ? 'text-[#118F86] bg-slate-50' : 'hover:text-[#118F86] hover:bg-slate-50'
                }`}
                aria-expanded={langMenuOpen}
              >
                <span>اللغات</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 w-80 bg-white rounded-2xl shadow-lifted border border-slate-150 p-3 grid gap-2 z-50 text-right"
                  >
                    <Link
                      to="/languages/hebrew"
                      onClick={closeAllDropdowns}
                      className="p-2.5 rounded-xl hover:bg-[#E8F5F4] transition-all block group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#16344B] group-hover:text-[#118F86] transition-colors">
                          العبرية (المسار الأساسي)
                        </span>
                        <span className="text-[10px] font-bold text-[#118F86] bg-[#E8F5F4] px-1.5 py-0.5 rounded">
                          الأكثر طلباً
                        </span>
                      </div>
                      <p className="text-[11px] text-[#566974] mt-0.5">
                        للمدرسة، المحادثة، والحياة اليومية بدون خجل.
                      </p>
                    </Link>

                    <Link
                      to="/languages/english"
                      onClick={closeAllDropdowns}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block group"
                    >
                      <span className="font-bold text-sm text-[#16344B] group-hover:text-[#118F86]">
                        الإنجليزية
                      </span>
                      <p className="text-[11px] text-[#566974] mt-0.5">
                        تعلّم عملي حسب مستواك وهدفك الأكاديمي أو الشخصي.
                      </p>
                    </Link>

                    <Link
                      to="/languages/german"
                      onClick={closeAllDropdowns}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block group"
                    >
                      <span className="font-bold text-sm text-[#16344B] group-hover:text-[#118F86]">
                        الألمانية
                      </span>
                      <p className="text-[11px] text-[#566974] mt-0.5">
                        ابدأ الأساسيات وتدرّب على النطق بالوتيرة اللي بتناسبك.
                      </p>
                    </Link>

                    <Link
                      to="/languages/french"
                      onClick={closeAllDropdowns}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block group"
                    >
                      <span className="font-bold text-sm text-[#16344B] group-hover:text-[#118F86]">
                        الفرنسية
                      </span>
                      <p className="text-[11px] text-[#566974] mt-0.5">
                        خطوات واضحة لتواصل أفضل وثقة بالنطق.
                      </p>
                    </Link>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-[#566974]">مش عارف أي لغة تختار؟</span>
                      <Link
                        to="/contact?topic=learning-plan"
                        onClick={closeAllDropdowns}
                        className="text-[#118F86] font-bold hover:underline"
                      >
                        احكي معنا ←
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Audiences Dropdown */}
            <div className="relative" onMouseLeave={() => setAudienceMenuOpen(false)}>
              <button
                type="button"
                onMouseEnter={() => setAudienceMenuOpen(true)}
                onClick={() => setAudienceMenuOpen(!audienceMenuOpen)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                  audienceMenuOpen ? 'text-[#118F86] bg-slate-50' : 'hover:text-[#118F86] hover:bg-slate-50'
                }`}
              >
                <span>لمَن التعلّم؟</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${audienceMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {audienceMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 w-72 bg-white rounded-2xl shadow-lifted border border-slate-150 p-3 grid gap-2 z-50 text-right"
                  >
                    <Link
                      to="/for-parents"
                      onClick={closeAllDropdowns}
                      className="p-2.5 rounded-xl bg-[#E8F5F4]/60 hover:bg-[#E8F5F4] transition-all block border border-[#118F86]/15"
                    >
                      <div className="font-bold text-sm text-[#118F86]">للأهل (الصفحة الرائدة) ★</div>
                      <div className="text-[11px] text-[#566974]">تعليم عبري لطفلك بعمر 9–14 بثقة وهدوء</div>
                    </Link>

                    <Link
                      to="/for-kids"
                      onClick={closeAllDropdowns}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                    >
                      <div className="font-bold text-sm text-[#16344B]">للأطفال</div>
                      <div className="text-[11px] text-[#566974]">شوف كيف بتكون الحصة ومواقف التدريب</div>
                    </Link>

                    <Link
                      to="/for-adults"
                      onClick={closeAllDropdowns}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block"
                    >
                      <div className="font-bold text-sm text-[#16344B]">للكبار والمحادثة</div>
                      <div className="text-[11px] text-[#566974]">من الفهم للمحادثة بثقة في مواقف الحياة</div>
                    </Link>

                    <Link
                      to="/for-work"
                      onClick={closeAllDropdowns}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors block opacity-85"
                    >
                      <div className="flex items-center gap-1.5 font-bold text-sm text-[#16344B]">
                        <span>للشغل</span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-normal">
                          مسار تجريبي
                        </span>
                      </div>
                      <div className="text-[11px] text-[#566974]">محاكاة مواقف العمل والمقابلات</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* How it works & Trust Dropdown */}
            <div className="relative" onMouseLeave={() => setLearnMenuOpen(false)}>
              <button
                type="button"
                onMouseEnter={() => setLearnMenuOpen(true)}
                onClick={() => setLearnMenuOpen(!learnMenuOpen)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                  learnMenuOpen ? 'text-[#118F86] bg-slate-50' : 'hover:text-[#118F86] hover:bg-slate-50'
                }`}
              >
                <span>كيف بنتعلّم؟</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${learnMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {learnMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 w-64 bg-white rounded-2xl shadow-lifted border border-slate-150 p-2.5 grid gap-1.5 z-50 text-right"
                  >
                    <Link to="/how-it-works" onClick={closeAllDropdowns} className="p-2 rounded-xl hover:bg-slate-50 block">
                      <span className="font-bold text-[#16344B] text-xs">كيف بنشتغل (4 خطوات)</span>
                    </Link>
                    <Link to="/teachers" onClick={closeAllDropdowns} className="p-2 rounded-xl hover:bg-slate-50 block">
                      <span className="font-bold text-[#16344B] text-xs">تعرّف على المدرسين</span>
                    </Link>
                    <Link to="/stories" onClick={closeAllDropdowns} className="p-2 rounded-xl hover:bg-slate-50 block">
                      <span className="font-bold text-[#16344B] text-xs">تجارب الطلاب والأهالي</span>
                    </Link>
                    <Link to="/faq" onClick={closeAllDropdowns} className="p-2 rounded-xl hover:bg-slate-50 block">
                      <span className="font-bold text-[#16344B] text-xs">الأسئلة الشائعة (28 سؤال)</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing */}
            <Link
              to="/pricing"
              onClick={closeAllDropdowns}
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/pricing'
                  ? 'text-[#118F86] bg-[#E8F5F4]'
                  : 'hover:text-[#118F86] hover:bg-slate-50'
              }`}
            >
              الباقات والأسعار
            </Link>

            {/* About */}
            <div className="relative" onMouseLeave={() => setAboutMenuOpen(false)}>
              <button
                type="button"
                onMouseEnter={() => setAboutMenuOpen(true)}
                onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                  aboutMenuOpen ? 'text-[#118F86] bg-slate-50' : 'hover:text-[#118F86] hover:bg-slate-50'
                }`}
              >
                <span>عن NovaTova</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${aboutMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {aboutMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 w-56 bg-white rounded-2xl shadow-lifted border border-slate-150 p-2.5 grid gap-1 z-50 text-right"
                  >
                    <Link to="/about" onClick={closeAllDropdowns} className="p-2 rounded-xl hover:bg-slate-50 block">
                      <span className="font-bold text-[#16344B] text-xs">قصتنا ورؤيتنا</span>
                    </Link>
                    <Link to="/blog" onClick={closeAllDropdowns} className="p-2 rounded-xl hover:bg-slate-50 block">
                      <span className="font-bold text-[#16344B] text-xs">المدونة والنصائح</span>
                    </Link>
                    <Link to="/contact" onClick={closeAllDropdowns} className="p-2 rounded-xl hover:bg-slate-50 block">
                      <span className="font-bold text-[#16344B] text-xs">تواصل معنا</span>
                    </Link>
                    <Link to="/teach-with-us" onClick={closeAllDropdowns} className="p-2 rounded-xl hover:bg-slate-50 block">
                      <span className="font-bold text-[#16344B] text-xs">انضم كمدرس/ة</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login-preview"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#566974] hover:text-[#16344B] transition-colors"
              title="دخول حساب الطالب أو ولي الأمر"
            >
              <LogIn size={15} />
              <span>تسجيل الدخول</span>
            </Link>

            {/* Primary Interactive CTA with subtle spring */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenTrialModal('header-cta')}
              className="bg-[#118F86] hover:bg-[#0E736C] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-accent transition-all flex items-center gap-2 tap-target-min relative overflow-hidden group"
            >
              <Sparkles size={16} className="text-[#FFC77A] group-hover:rotate-12 transition-transform" />
              <span>احجز حصة مجانية</span>
            </motion.button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#16344B] hover:bg-slate-100 rounded-xl tap-target-min"
              aria-label="القائمة الرئيسية"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Slide-Out Drawer (Animated with Framer Motion) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto text-right flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-150">
                  <BrandLogo />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-700 rounded-lg tap-target-min"
                    aria-label="إغلاق القائمة"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 text-sm font-bold text-[#16344B]">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-2">اللغات</div>
                    <div className="grid gap-2 pr-2">
                      <Link
                        to="/languages/hebrew"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[#118F86] block"
                      >
                        العبرية (المسار الأساسي)
                      </Link>
                      <Link to="/languages/english" onClick={() => setMobileMenuOpen(false)} className="block">
                        الإنجليزية
                      </Link>
                      <Link to="/languages/german" onClick={() => setMobileMenuOpen(false)} className="block">
                        الألمانية
                      </Link>
                      <Link to="/languages/french" onClick={() => setMobileMenuOpen(false)} className="block">
                        الفرنسية
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-400 mb-2">لمَن التعلّم؟</div>
                    <div className="grid gap-2 pr-2">
                      <Link
                        to="/for-parents"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[#118F86] block font-bold"
                      >
                        للأهل (عبري 9–14 سنة) ★
                      </Link>
                      <Link to="/for-kids" onClick={() => setMobileMenuOpen(false)} className="block">
                        للأطفال
                      </Link>
                      <Link to="/for-adults" onClick={() => setMobileMenuOpen(false)} className="block">
                        للكبار والمحادثة
                      </Link>
                      <Link to="/for-work" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600">
                        للشغل (تجريبي)
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-400 mb-2">استكشف والأسعار</div>
                    <div className="grid gap-2 pr-2">
                      <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-[#118F86]">
                        الباقات والأسعار (15 / 25 / 50 / 100 حصة)
                      </Link>
                      <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="block">
                        كيف بنشتغل
                      </Link>
                      <Link to="/teachers" onClick={() => setMobileMenuOpen(false)} className="block">
                        المدرسين المتاحين
                      </Link>
                      <Link to="/stories" onClick={() => setMobileMenuOpen(false)} className="block">
                        تجارب الطلاب والأهالي
                      </Link>
                      <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="block">
                        الأسئلة الشائعة (FAQ)
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-150 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrialModal('mobile-drawer-cta');
                  }}
                  className="w-full py-3 bg-[#118F86] text-white text-xs font-bold rounded-xl shadow-accent flex items-center justify-center gap-2 tap-target-min"
                >
                  <Sparkles size={16} />
                  <span>احجز حصة مجانية لطفلك</span>
                </button>

                <Link
                  to="/login-preview"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-slate-100 text-[#16344B] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <LogIn size={15} />
                  <span>دخول حساب الطالب</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
