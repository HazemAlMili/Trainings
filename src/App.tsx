import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BrandDirection } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BrandLab } from './components/common/BrandLab';
import { WhatsAppFunnelModal } from './components/common/WhatsAppFunnelModal';

import { HomePage } from './pages/HomePage';
import { ParentsPage } from './pages/ParentsPage';
import { LanguagesPage } from './pages/LanguagesPage';
import { KidsPage } from './pages/KidsPage';
import { AdultsPage } from './pages/AdultsPage';
import { WorkPage } from './pages/WorkPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';
import { TeachersPage } from './pages/TeachersPage';
import { StoriesPage } from './pages/StoriesPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { TeachWithUsPage } from './pages/TeachWithUsPage';
import { TrialPage } from './pages/TrialPage';
import { TrialPreviewPage } from './pages/TrialPreviewPage';
import { LegalPage } from './pages/LegalPage';
import { LoginPreviewPage } from './pages/LoginPreviewPage';
import { PrototypeIndexPage } from './pages/PrototypeIndexPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  // Brand Direction: Direction A (Calm Confidence) is default
  const [brandDirection, setBrandDirection] = useState<BrandDirection>('A');
  const [isBrandLabOpen, setIsBrandLabOpen] = useState<boolean>(false);

  // Global WhatsApp Trial Modal state
  const [trialModalOpen, setTrialModalOpen] = useState<boolean>(false);
  const [trialSourceContext, setTrialSourceContext] = useState<string>('global-header');

  const handleOpenTrialModal = (source: string = 'global-click') => {
    setTrialSourceContext(source);
    setTrialModalOpen(true);
  };

  // Sync data attribute with document body for CSS token overrides
  useEffect(() => {
    document.documentElement.setAttribute('data-brand-direction', brandDirection);
  }, [brandDirection]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F7F9F6] text-[#132B36] selection:bg-[#118F86] selection:text-white">
        {/* Header */}
        <Header
          onOpenBrandLab={() => setIsBrandLabOpen(true)}
          onOpenTrialModal={handleOpenTrialModal}
        />

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/for-parents" element={<ParentsPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/languages/:lang" element={<LanguagesPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/for-kids" element={<KidsPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/for-adults" element={<AdultsPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/for-work" element={<WorkPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/how-it-works" element={<HowItWorksPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/pricing" element={<PricingPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/teachers" element={<TeachersPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/stories" element={<StoriesPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/about" element={<AboutPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/blog" element={<BlogPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/faq" element={<FaqPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/teach-with-us" element={<TeachWithUsPage />} />
            <Route path="/trial" element={<TrialPage />} />
            <Route path="/trial/preview" element={<TrialPreviewPage />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/cookies" element={<LegalPage type="cookies" />} />
            <Route path="/login-preview" element={<LoginPreviewPage />} />
            <Route
              path="/prototype-index"
              element={
                <PrototypeIndexPage
                  onOpenBrandLab={() => setIsBrandLabOpen(true)}
                  onOpenTrialModal={handleOpenTrialModal}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Brand Identity Review Lab (Gate 1) */}
        <BrandLab
          isOpen={isBrandLabOpen}
          onClose={() => setIsBrandLabOpen(false)}
          currentDirection={brandDirection}
          onSelectDirection={(dir) => {
            setBrandDirection(dir);
            setIsBrandLabOpen(false);
          }}
        />

        {/* WhatsApp Trial Funnel Modal (Gate 3) */}
        <WhatsAppFunnelModal
          isOpen={trialModalOpen}
          onClose={() => setTrialModalOpen(false)}
          sourceContext={trialSourceContext}
          defaultVariant="B"
        />
      </div>
    </BrowserRouter>
  );
};

