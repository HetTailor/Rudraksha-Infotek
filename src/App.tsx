import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SeoHead } from './components/SeoHead';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0.65 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="flex-1 flex flex-col"
    >
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Catch-all fallback route to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </motion.div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoHead />
      <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col font-sans selection:bg-zinc-950 selection:text-white">
        {/* Global Multi-Page Navigation */}
        <Navbar />

        {/* Dynamic Route View with Page Transitions */}
        <main className="flex-1 flex flex-col">
          <AnimatedRoutes />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Persistent Floating WhatsApp Action Button */}
        <WhatsAppFloatingButton />
      </div>
    </BrowserRouter>
  );
}
