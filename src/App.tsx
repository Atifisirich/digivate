import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { isSeoCrawler } from './lib/isSeoCrawler';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AppointmentModal } from './components/AppointmentModal';
import { ChatbotModal } from './components/ChatbotModal';
import { FloatingActionArea } from './components/FloatingActionArea';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WebDevelopmentPage } from './pages/WebDevelopmentPage';
import { AppDevelopmentPage } from './pages/AppDevelopmentPage';
import { AiAutomationPage } from './pages/AiAutomationPage';
import { DigitalMarketingPage } from './pages/DigitalMarketingPage';
import { AboutPage } from './pages/AboutPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { FaqPage } from './pages/FaqPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoadingScreen } from './components/LoadingScreen';
import { PageAtmosphere } from './components/PageAtmosphere';
import { AnimatePresence, LayoutGroup } from 'motion/react';

export type LoadingPhase = 'initial' | 'pulse' | 'transitioning' | 'complete';

export function AppShell() {
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>(() =>
    isSeoCrawler() ? 'complete' : 'initial',
  );
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <>
      <LayoutGroup>
        <ScrollToTop />
        <AnimatePresence>
          {loadingPhase !== 'complete' && (
            <LoadingScreen 
              phase={loadingPhase} 
              onPhaseChange={setLoadingPhase} 
            />
          )}
        </AnimatePresence>
        <div className="min-h-screen bg-transparent text-[#0f131a] relative selection:bg-blue-600/15 selection:text-blue-700 font-sans flex flex-col justify-between">
          <PageAtmosphere />
          {/* Sticky Header Navigation */}
          <Navigation onOpenBooking={handleOpenBooking} loadingPhase={loadingPhase} />
          {/* Multi-Page Routes */}
          <main className="flex-grow relative z-[1] pb-20 sm:pb-0">
            <Routes>
              <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} loadingPhase={loadingPhase} />} />
              <Route path="/services" element={<ServicesPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/services/web-development" element={<WebDevelopmentPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/services/app-development" element={<AppDevelopmentPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/services/ai-automation" element={<AiAutomationPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/services/digital-marketing" element={<DigitalMarketingPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/portfolio" element={<PortfolioPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/contact" element={<ContactPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/get-started" element={<GetStartedPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/faq" element={<FaqPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage onOpenBooking={handleOpenBooking} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          {/* Global Agency Footer */}
          <Footer onOpenBooking={handleOpenBooking} />
          {/* Floating Actions: WhatsApp & Ask Digivate AI Chatbot */}
          <FloatingActionArea
            onOpenChat={() => setIsChatOpen(true)}
            isChatOpen={isChatOpen}
          />
          {/* Ask Digivate AI Chat Assistant Modal */}
          <ChatbotModal
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            onOpenBooking={() => {
              setIsChatOpen(false);
              setIsBookingOpen(true);
            }}
          />
          {/* Direct Appointment Booking Modal */}
          <AppointmentModal
            isOpen={isBookingOpen}
            onClose={handleCloseBooking}
          />
        </div>
      </LayoutGroup>
    </>
  );
}

/**
 * Browser entry. The prerender build renders <AppShell /> inside a StaticRouter
 * instead, so every route ships real HTML instead of an empty #root.
 */
export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
