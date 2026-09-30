import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

interface NavbarProps {
  onOpenPlanner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Use Cases', path: '/portfolio' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' },
  ];

  const currentActivePath = hoveredPath ?? location.pathname;

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ease-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200/90 shadow-[0_4px_24px_rgba(60,43,153,0.06)] py-2 sm:py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-zinc-100 py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link
            id="brand-logo-link"
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center group focus:outline-none py-0.5"
          >
            <img
              src={COMPANY_INFO.logoUrl}
              alt={COMPANY_INFO.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = COMPANY_INFO.logoFallback;
              }}
              className="h-12 sm:h-14 md:h-16 lg:h-16 w-auto max-w-[240px] sm:max-w-[300px] object-contain"
            />
          </Link>

          {/* Center Desktop Nav Links with Custom Traveling Indicator */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-3"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              const isIndicatorActive = currentActivePath === link.path;
              const isPageActive = location.pathname === link.path;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  className={`relative py-1.5 px-3.5 rounded-lg text-sm font-medium transition-colors duration-250 cursor-pointer ${
                    isPageActive
                      ? 'text-[#3C2B99] font-bold'
                      : 'text-zinc-600 hover:text-[#3C2B99]'
                  }`}
                >
                  {/* Fluid traveling pill background */}
                  {isIndicatorActive && (
                    <motion.span
                      layoutId="nav-traveling-indicator"
                      className="absolute inset-0 rounded-lg bg-[#3C2B99]/8 border border-[#D4B26B]/30 shadow-[0_0_12px_rgba(60,43,153,0.08)] -z-10"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}

                  {/* Fluid traveling underline in Secondary Gold */}
                  {isIndicatorActive && (
                    <motion.span
                      layoutId="nav-traveling-underline"
                      className="absolute bottom-0.5 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-[#D4B26B] to-[#3C2B99] rounded-full shadow-[0_0_8px_rgba(212,178,107,0.6)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}

                  <span className="relative z-10 inline-block overflow-hidden transition-transform duration-200 group">
                    {link.name}
                    {/* Subtle light sheen that passes across text on hover */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-[#D4B26B]/30 to-transparent pointer-events-none" />
                  </span>
                </NavLink>
              );
            })}
          </nav>

          {/* Action Button: Primary Indigo #3C2B99 pill */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              id="nav-request-quote-btn"
              to="/contact"
              className="btn-request-quote relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3C2B99] text-white text-xs sm:text-sm font-semibold border border-[#D4B26B]/40 hover:border-[#D9D9D9] transition-all duration-250 ease-out shadow-[0_4px_14px_rgba(60,43,153,0.25)] hover:shadow-md cursor-pointer group"
            >
              {/* Controlled highlight sweep across button */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[350%] transition-transform duration-700 ease-out pointer-events-none" />
              <span className="relative z-10">Request a Quote</span>
              <ArrowRight className="relative z-10 w-4 h-4 stroke-[2.5] transition-transform duration-250 ease-out group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-white border-b border-zinc-200 px-6 py-5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#3C2B99]/10 text-[#3C2B99] font-bold border-l-3 border-[#D4B26B]'
                      : 'text-zinc-700 hover:text-[#3C2B99] hover:bg-zinc-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 mt-2 border-t border-zinc-100 flex flex-col gap-3">
              <Link
                id="mobile-request-quote-btn"
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-request-quote w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#3C2B99] text-white font-semibold text-sm border border-[#D4B26B]/50 hover:border-[#D9D9D9] transition-all duration-250 ease-out shadow-[0_4px_14px_rgba(60,43,153,0.25)] hover:shadow-md"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-250 ease-out" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
