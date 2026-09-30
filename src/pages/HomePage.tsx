import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Mail,
  Send,
  Quote,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { RocketHeroVisual } from '../components/RocketHeroVisual';
import { BrandLogos } from '../components/BrandLogos';
import { ResultsSection } from '../components/ResultsSection';
import {
  SeoIcon3D,
  PpcIcon3D,
  SocialIcon3D,
  EmailIcon3D,
} from '../components/ServiceCardIcons';
import {
  ProcessDiscoverIcon,
  ProcessStrategizeIcon,
  ProcessExecuteIcon,
  ProcessOptimizeIcon,
} from '../components/ProcessCardIcons';
import { transferNewsletterToEmail } from '../utils/formSubmit';

export const HomePage: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [hoveredSplitCard, setHoveredSplitCard] = useState<'testimonial' | 'cta' | null>(null);

  // Services connected sequence on enter
  const servicesRef = useRef<HTMLElement>(null);
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (!isServicesInView) return;
    const timers = [
      setTimeout(() => setActiveService(0), 250),
      setTimeout(() => setActiveService(1), 950),
      setTimeout(() => setActiveService(2), 1650),
      setTimeout(() => setActiveService(3), 2350),
      setTimeout(() => setActiveService(null), 3100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isServicesInView]);

  // Process section progress journey
  const processRef = useRef<HTMLElement>(null);
  const isProcessInView = useInView(processRef, { once: true, amount: 0.25 });
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [justActivatedStep, setJustActivatedStep] = useState<number | null>(null);

  useEffect(() => {
    if (!isProcessInView) return;
    const timers = [
      // Step 1: 01 Discover activates first
      setTimeout(() => {
        setActiveProcessStep(1);
        setJustActivatedStep(1);
      }, 200),
      setTimeout(() => setJustActivatedStep(null), 600),

      // Step 2: 02 Strategize activates when signal arrives at ~1330ms
      setTimeout(() => {
        setActiveProcessStep(2);
        setJustActivatedStep(2);
      }, 1330),
      setTimeout(() => setJustActivatedStep(null), 1730),

      // Step 3: 03 Execute activates when signal arrives at ~2520ms
      setTimeout(() => {
        setActiveProcessStep(3);
        setJustActivatedStep(3);
      }, 2520),
      setTimeout(() => setJustActivatedStep(null), 2920),

      // Step 4: 04 Optimize activates when signal arrives at ~3500ms
      setTimeout(() => {
        setActiveProcessStep(4);
        setJustActivatedStep(4);
      }, 3500),
      setTimeout(() => setJustActivatedStep(null), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isProcessInView]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      await transferNewsletterToEmail(newsletterEmail.trim());
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] text-zinc-900 pt-20">
      {/* 1. HERO SECTION (CUSTOM CINEMATIC ENTRANCE) */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Subtle moving ambient background motion layers with brand-aligned Indigo/Gold ambient pulse */}
        <motion.div
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -18, 12, 0],
            scale: [1, 1.06, 0.96, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#3C2B99]/15 via-indigo-100/30 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
        />
        <motion.div
          animate={{
            x: [0, -18, 15, 0],
            y: [0, 16, -12, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-gradient-to-tr from-[#D4B26B]/20 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none -ml-20"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Pill Badge: swift clip-path curtain reveal */}
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3C2B99]/8 border border-[#D4B26B]/50 text-[#3C2B99] text-xs font-bold uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4B26B]" />
                <span>Digital Growth Partner</span>
              </motion.div>

              {/* Main Headline: custom masked/clip-path motion */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ clipPath: 'inset(100% 0 0 0)', y: 24, opacity: 0 }}
                  animate={{ clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.12]"
                >
                  We Drive Digital <br />
                  Growth for <br />
                  <span className="text-[#3C2B99]">
                    Ambitious Brands
                  </span>
                </motion.h1>
              </div>

              {/* Subheading: subtle horizontal expansion reveal */}
              <motion.p
                initial={{ clipPath: 'inset(0 50% 0 50%)', opacity: 0 }}
                animate={{ clipPath: 'inset(0 0% 0 0%)', opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                {COMPANY_INFO.name} is your all-in-one digital marketing and creative partner. We help businesses grow online with data-driven strategies and standout craftsmanship that deliver real results.
              </motion.p>

              {/* Dual Action Buttons: enter from slightly different directions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <motion.div
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.32, ease: 'easeOut' }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    id="hero-book-consultation-btn"
                    to="/contact"
                    className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#3C2B99] hover:bg-[#D4B26B] text-white font-semibold text-sm border border-[#D4B26B]/50 transition-colors duration-250 ease-out shadow-[0_4px_16px_rgba(60,43,153,0.25)] hover:shadow-[0_8px_25px_rgba(212,178,107,0.4)] cursor-pointer group"
                  >
                    {/* Controlled highlight sweep */}
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[350%] transition-transform duration-700 ease-out pointer-events-none" />
                    <span className="relative z-10">Book a Free Consultation</span>
                    <ArrowRight className="relative z-10 w-4 h-4 stroke-[2.5] text-white transition-transform duration-250 ease-out group-hover:translate-x-1.5" />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: 16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.38, ease: 'easeOut' }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    id="hero-explore-services-btn"
                    to="/services"
                    className="btn-secondary-lightgrey relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border text-sm font-semibold transition-colors duration-250 ease-out shadow-2xs cursor-pointer group"
                  >
                    {/* Controlled highlight sweep */}
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#3C2B99]/15 to-transparent skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[350%] transition-transform duration-700 ease-out pointer-events-none" />
                    <span className="relative z-10">Explore Services</span>
                    <ArrowRight className="relative z-10 w-4 h-4 stroke-[2.5] transition-transform duration-250 ease-out group-hover:translate-x-1.5" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Hero Graphic with 3D Rocket & Floating Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-6 flex items-center justify-center"
            >
              <RocketHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY LEADING BRANDS STRIP */}
      <BrandLogos />

      {/* 3. SERVICES SECTION */}
      <section ref={servicesRef} className="py-20 lg:py-28 bg-white relative">
        {/* SVG Definition for traveling border signal */}
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <linearGradient id="serviceBorderSignal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4B26B" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#D4B26B" stopOpacity="1" />
              <stop offset="100%" stopColor="#3C2B99" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ y: [8, 0] }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C2B99]/8 border border-[#D4B26B]/50 text-[#3C2B99] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B26B]" />
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Powerful Solutions to Grow Your Business
            </h2>
            <div className="w-16 h-1 bg-[#D4B26B] rounded-full mx-auto" />
            <p className="text-zinc-600 text-base sm:text-lg">
              From strategy to execution, we provide end-to-end digital marketing services to help your brand stand out.
            </p>
          </motion.div>

          {/* 4 Cards Grid with Service Discovery Interaction */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            onMouseLeave={() => setActiveService(null)}
          >
            {/* Card 1: SEO Optimization */}
            <motion.div
              id="service-card-seo"
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ y: [8, 0] }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.04, ease: 'easeOut' }}
              onMouseEnter={() => setActiveService(0)}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-350 ease-out cursor-default relative bg-[#fcfbfe] border ${
                activeService === 0
                  ? 'border-[#3C2B99] ring-2 ring-[#D4B26B]/50 shadow-[0_16px_36px_rgba(60,43,153,0.18)] opacity-100 z-10'
                  : activeService !== null
                  ? 'border-zinc-200/50 opacity-45 filter saturate-[0.6] blur-[0.2px] shadow-none z-0'
                  : 'border-zinc-200 opacity-100 shadow-2xs hover:border-[#D4B26B] hover:shadow-xl hover:shadow-[#3C2B99]/10 z-0'
              }`}
            >
              {/* Traveling Indigo/Gold border signal when active */}
              <svg className={`absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-20 transition-opacity duration-300 ${activeService === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="15"
                  fill="none"
                  stroke="url(#serviceBorderSignal)"
                  strokeWidth="2.5"
                  pathLength="100"
                  strokeDasharray="25 75"
                  className="animate-seamless-border"
                />
              </svg>

              <div>
                <motion.div
                  animate={activeService === 0 ? { y: -5, scale: 1.08, rotate: [0, -3, 3, 0] } : { y: 0, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mb-5 inline-block"
                >
                  <SeoIcon3D />
                </motion.div>
                <h3 className={`text-xl font-bold transition-colors mb-2.5 ${activeService === 0 ? 'text-[#3C2B99]' : 'text-zinc-900'}`}>
                  SEO Optimization
                </h3>
                <p className={`text-sm leading-relaxed mb-6 transition-colors duration-250 ${activeService === 0 ? 'text-zinc-800 font-medium' : 'text-zinc-600'}`}>
                  Improve your search rankings and drive qualified organic traffic with sub-second website performance and on-page optimization.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3C2B99] hover:text-[#D4B26B] transition-colors group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-250 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Card 2: PPC Advertising */}
            <motion.div
              id="service-card-ppc"
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ y: [8, 0] }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
              onMouseEnter={() => setActiveService(1)}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-350 ease-out cursor-default relative bg-[#fcfbfe] border ${
                activeService === 1
                  ? 'border-[#3C2B99] ring-2 ring-[#D4B26B]/50 shadow-[0_16px_36px_rgba(60,43,153,0.18)] opacity-100 z-10'
                  : activeService !== null
                  ? 'border-zinc-200/50 opacity-45 filter saturate-[0.6] blur-[0.2px] shadow-none z-0'
                  : 'border-zinc-200 opacity-100 shadow-2xs hover:border-[#D4B26B] hover:shadow-xl hover:shadow-[#3C2B99]/10 z-0'
              }`}
            >
              {/* Traveling Indigo/Gold border signal when active */}
              <svg className={`absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-20 transition-opacity duration-300 ${activeService === 1 ? 'opacity-100' : 'opacity-0'}`}>
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="15"
                  fill="none"
                  stroke="url(#serviceBorderSignal)"
                  strokeWidth="2.5"
                  pathLength="100"
                  strokeDasharray="25 75"
                  className="animate-seamless-border"
                />
              </svg>

              <div>
                <motion.div
                  animate={activeService === 1 ? { y: -5, scale: 1.08, rotate: [0, -3, 3, 0] } : { y: 0, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mb-5 inline-block"
                >
                  <PpcIcon3D />
                </motion.div>
                <h3 className={`text-xl font-bold transition-colors mb-2.5 ${activeService === 1 ? 'text-[#3C2B99]' : 'text-zinc-900'}`}>
                  PPC Advertising
                </h3>
                <p className={`text-sm leading-relaxed mb-6 transition-colors duration-250 ${activeService === 1 ? 'text-zinc-800 font-medium' : 'text-zinc-600'}`}>
                  Get instant visibility and maximize ROI with targeted paid ad campaigns across Google Search, Meta Ads, and YouTube.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3C2B99] hover:text-[#D4B26B] transition-colors group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-250 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Card 3: Social Media Marketing */}
            <motion.div
              id="service-card-social"
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ y: [8, 0] }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.12, ease: 'easeOut' }}
              onMouseEnter={() => setActiveService(2)}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-350 ease-out cursor-default relative bg-[#fcfbfe] border ${
                activeService === 2
                  ? 'border-[#3C2B99] ring-2 ring-[#D4B26B]/50 shadow-[0_16px_36px_rgba(60,43,153,0.18)] opacity-100 z-10'
                  : activeService !== null
                  ? 'border-zinc-200/50 opacity-45 filter saturate-[0.6] blur-[0.2px] shadow-none z-0'
                  : 'border-zinc-200 opacity-100 shadow-2xs hover:border-[#D4B26B] hover:shadow-xl hover:shadow-[#3C2B99]/10 z-0'
              }`}
            >
              {/* Traveling Indigo/Gold border signal when active */}
              <svg className={`absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-20 transition-opacity duration-300 ${activeService === 2 ? 'opacity-100' : 'opacity-0'}`}>
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="15"
                  fill="none"
                  stroke="url(#serviceBorderSignal)"
                  strokeWidth="2.5"
                  pathLength="100"
                  strokeDasharray="25 75"
                  className="animate-seamless-border"
                />
              </svg>

              <div>
                <motion.div
                  animate={activeService === 2 ? { y: -5, scale: 1.08, rotate: [0, -3, 3, 0] } : { y: 0, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mb-5 inline-block"
                >
                  <SocialIcon3D />
                </motion.div>
                <h3 className={`text-xl font-bold transition-colors mb-2.5 ${activeService === 2 ? 'text-[#3C2B99]' : 'text-zinc-900'}`}>
                  Social Media Marketing
                </h3>
                <p className={`text-sm leading-relaxed mb-6 transition-colors duration-250 ${activeService === 2 ? 'text-zinc-800 font-medium' : 'text-zinc-600'}`}>
                  Engage your audience and build a loyal community through curated feeds, viral reels, promotional posts, and active follower management.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3C2B99] hover:text-[#D4B26B] transition-colors group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-250 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Card 4: Email Marketing & Graphic Branding */}
            <motion.div
              id="service-card-graphic"
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ y: [8, 0] }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.16, ease: 'easeOut' }}
              onMouseEnter={() => setActiveService(3)}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-350 ease-out cursor-default relative bg-[#fcfbfe] border ${
                activeService === 3
                  ? 'border-[#3C2B99] ring-2 ring-[#D4B26B]/50 shadow-[0_16px_36px_rgba(60,43,153,0.18)] opacity-100 z-10'
                  : activeService !== null
                  ? 'border-zinc-200/50 opacity-45 filter saturate-[0.6] blur-[0.2px] shadow-none z-0'
                  : 'border-zinc-200 opacity-100 shadow-2xs hover:border-[#D4B26B] hover:shadow-xl hover:shadow-[#3C2B99]/10 z-0'
              }`}
            >
              {/* Traveling Indigo/Gold border signal when active */}
              <svg className={`absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-20 transition-opacity duration-300 ${activeService === 3 ? 'opacity-100' : 'opacity-0'}`}>
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="15"
                  fill="none"
                  stroke="url(#serviceBorderSignal)"
                  strokeWidth="2.5"
                  pathLength="100"
                  strokeDasharray="25 75"
                  className="animate-seamless-border"
                />
              </svg>

              <div>
                <motion.div
                  animate={activeService === 3 ? { y: -5, scale: 1.08, rotate: [0, -3, 3, 0] } : { y: 0, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mb-5 inline-block"
                >
                  <EmailIcon3D />
                </motion.div>
                <h3 className={`text-xl font-bold transition-colors mb-2.5 ${activeService === 3 ? 'text-[#3C2B99]' : 'text-zinc-900'}`}>
                  Email & Graphic Design
                </h3>
                <p className={`text-sm leading-relaxed mb-6 transition-colors duration-250 ${activeService === 3 ? 'text-zinc-800 font-medium' : 'text-zinc-600'}`}>
                  Nurture leads and turn subscribers into customers with timeless logo identities, print stationery, and high-converting email sequences.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3C2B99] hover:text-[#D4B26B] transition-colors group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-250 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. RESULTS THAT SPEAK FOR THEMSELVES (PERFORMANCE DASHBOARD REVEAL) */}
      <ResultsSection />

      {/* 5. OUR PROCESS SECTION (PROGRESS JOURNEY ANIMATION) */}
      <section ref={processRef} className="py-20 lg:py-28 bg-[#FAFAFA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ y: [8, 0] }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C2B99]/8 border border-[#D4B26B]/50 text-[#3C2B99] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B26B]" />
              <span>Our Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              A Simple 4-Step Process
            </h2>
            <div className="w-16 h-1 bg-[#D4B26B] rounded-full mx-auto" />
            <p className="text-zinc-600 text-base sm:text-lg">
              We follow a proven process to deliver exceptional results.
            </p>
          </motion.div>

          {/* 4 Process Steps with Connected Progress Journey */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Progress Journey Connecting Track */}
            <div className="hidden md:block absolute top-[36px] left-[10%] right-[10%] h-[2px] pointer-events-none z-0">
              {/* Subtle background guide line in Light Grey */}
              <div className="w-full h-full bg-[#D9D9D9]/60 rounded-full" />

              {/* Animated Drawing Path in Indigo / Gold */}
              <motion.div
                initial={{ width: '0%' }}
                animate={
                  isProcessInView
                    ? {
                        width: ['0%', '0%', '33.33%', '33.33%', '66.67%', '66.67%', '100%'],
                      }
                    : { width: '0%' }
                }
                transition={{
                  duration: 3.5,
                  times: [0, 0.14, 0.38, 0.48, 0.72, 0.82, 1.0],
                  ease: 'easeInOut',
                }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3C2B99] via-[#D4B26B] to-[#3C2B99] shadow-[0_0_8px_rgba(212,178,107,0.6)] rounded-full"
              />

              {/* Moving Gold #D4B26B Animated Signal */}
              <motion.div
                initial={{ left: '0%', opacity: 0 }}
                animate={
                  isProcessInView
                    ? {
                        left: ['0%', '0%', '33.33%', '33.33%', '66.67%', '66.67%', '100%'],
                        opacity: [0, 1, 1, 1, 1, 1, 1],
                        scale: [0.8, 1, 1.25, 1, 1.25, 1, 1.25],
                      }
                    : { left: '0%', opacity: 0 }
                }
                transition={{
                  duration: 3.5,
                  times: [0, 0.14, 0.38, 0.48, 0.72, 0.82, 1.0],
                  ease: 'easeInOut',
                }}
                className="absolute -top-[5px] -ml-[6px] w-3 h-3 rounded-full bg-[#D4B26B] border border-white shadow-[0_0_12px_#D4B26B,0_0_4px_#ffffff] z-10"
              >
                {/* Subtle gold glow aura */}
                <span className="absolute -inset-1 rounded-full bg-[#D4B26B]/40 blur-[2px] animate-pulse" />
              </motion.div>
            </div>

            {/* Step 1 */}
            <div
              className={`relative bg-white rounded-2xl p-6 transition-all duration-350 cursor-default border z-10 ${
                activeProcessStep >= 1
                  ? 'border-[#3C2B99] shadow-lg shadow-[#3C2B99]/10 ring-1 ring-[#D4B26B]/40'
                  : 'border-zinc-200 shadow-2xs'
              }`}
            >
              {/* Subtle animated border highlight upon activation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  justActivatedStep === 1
                    ? { opacity: [0, 1, 0] }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 rounded-2xl ring-2 ring-[#D4B26B] shadow-[0_0_16px_rgba(212,178,107,0.55)] pointer-events-none z-20"
              />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <motion.div
                  animate={
                    justActivatedStep === 1
                      ? { scale: [1, 1.14, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <ProcessDiscoverIcon />
                </motion.div>
                <motion.span
                  animate={
                    justActivatedStep === 1
                      ? { scale: [1, 1.18, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`text-xs font-black px-2.5 py-1 rounded-full font-mono transition-colors duration-300 ${
                    activeProcessStep >= 1
                      ? 'bg-[#3C2B99] text-white shadow-xs'
                      : 'text-[#3C2B99] bg-[#3C2B99]/10 border border-[#D4B26B]/40'
                  }`}
                >
                  01
                </motion.span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Discover</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                We analyze your business, goals, audience, and market to identify growth opportunities.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className={`relative bg-white rounded-2xl p-6 transition-all duration-350 cursor-default border z-10 ${
                activeProcessStep >= 2
                  ? 'border-[#3C2B99] shadow-lg shadow-[#3C2B99]/10 ring-1 ring-[#D4B26B]/40'
                  : 'border-zinc-200 shadow-2xs'
              }`}
            >
              {/* Subtle animated border highlight upon activation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  justActivatedStep === 2
                    ? { opacity: [0, 1, 0] }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 rounded-2xl ring-2 ring-[#D4B26B] shadow-[0_0_16px_rgba(212,178,107,0.55)] pointer-events-none z-20"
              />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <motion.div
                  animate={
                    justActivatedStep === 2
                      ? { scale: [1, 1.14, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <ProcessStrategizeIcon />
                </motion.div>
                <motion.span
                  animate={
                    justActivatedStep === 2
                      ? { scale: [1, 1.18, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`text-xs font-black px-2.5 py-1 rounded-full font-mono transition-colors duration-300 ${
                    activeProcessStep >= 2
                      ? 'bg-[#3C2B99] text-white shadow-xs'
                      : 'text-[#3C2B99] bg-[#3C2B99]/10 border border-[#D4B26B]/40'
                  }`}
                >
                  02
                </motion.span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Strategize</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                We create a customized roadmap, wireframes, and creative strategy tailored for your goals.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className={`relative bg-white rounded-2xl p-6 transition-all duration-350 cursor-default border z-10 ${
                activeProcessStep >= 3
                  ? 'border-[#3C2B99] shadow-lg shadow-[#3C2B99]/10 ring-1 ring-[#D4B26B]/40'
                  : 'border-zinc-200 shadow-2xs'
              }`}
            >
              {/* Subtle animated border highlight upon activation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  justActivatedStep === 3
                    ? { opacity: [0, 1, 0] }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 rounded-2xl ring-2 ring-[#D4B26B] shadow-[0_0_16px_rgba(212,178,107,0.55)] pointer-events-none z-20"
              />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <motion.div
                  animate={
                    justActivatedStep === 3
                      ? { scale: [1, 1.14, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <ProcessExecuteIcon />
                </motion.div>
                <motion.span
                  animate={
                    justActivatedStep === 3
                      ? { scale: [1, 1.18, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`text-xs font-black px-2.5 py-1 rounded-full font-mono transition-colors duration-300 ${
                    activeProcessStep >= 3
                      ? 'bg-[#3C2B99] text-white shadow-xs'
                      : 'text-[#3C2B99] bg-[#3C2B99]/10 border border-[#D4B26B]/40'
                  }`}
                >
                  03
                </motion.span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Execute</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                We design, code, and deploy high-converting campaigns and websites with surgical precision.
              </p>
            </div>

            {/* Step 4 */}
            <div
              className={`relative bg-white rounded-2xl p-6 transition-all duration-350 cursor-default border z-10 ${
                activeProcessStep >= 4
                  ? 'border-[#3C2B99] shadow-lg shadow-[#3C2B99]/10 ring-1 ring-[#D4B26B]/40'
                  : 'border-zinc-200 shadow-2xs'
              }`}
            >
              {/* Subtle animated border highlight upon activation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  justActivatedStep === 4
                    ? { opacity: [0, 1, 0] }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 rounded-2xl ring-2 ring-[#D4B26B] shadow-[0_0_16px_rgba(212,178,107,0.55)] pointer-events-none z-20"
              />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <motion.div
                  animate={
                    justActivatedStep === 4
                      ? { scale: [1, 1.14, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <ProcessOptimizeIcon />
                </motion.div>
                <motion.span
                  animate={
                    justActivatedStep === 4
                      ? { scale: [1, 1.18, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`text-xs font-black px-2.5 py-1 rounded-full font-mono transition-colors duration-300 ${
                    activeProcessStep >= 4
                      ? 'bg-[#3C2B99] text-white shadow-xs'
                      : 'text-[#3C2B99] bg-[#3C2B99]/10 border border-[#D4B26B]/40'
                  }`}
                >
                  04
                </motion.span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Optimize</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                We monitor, analyze, and optimize performance metrics continuously for sustained long-term growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL + CTA SPLIT BANNER (FOCUS SHIFT SYSTEM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-[#D4B26B]/30"
          onMouseLeave={() => setHoveredSplitCard(null)}
        >
          {/* Left Testimonial Card (Indigo with Gold Accent) */}
          <div
            onMouseEnter={() => setHoveredSplitCard('testimonial')}
            className={`lg:col-span-5 bg-[#3C2B99] text-white p-8 sm:p-12 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#D4B26B]/30 transition-all duration-350 ${
              hoveredSplitCard === 'testimonial'
                ? 'ring-2 ring-[#D4B26B]/70 shadow-2xl z-10 opacity-100'
                : hoveredSplitCard === 'cta'
                ? 'opacity-80'
                : 'opacity-100'
            }`}
          >
            <div className="space-y-6">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-[#D4B26B]/50 flex items-center justify-center text-[#D4B26B]">
                <Quote className="w-5 h-5" />
              </div>
              <blockquote className="text-lg sm:text-xl font-medium leading-relaxed text-indigo-50">
                "At {COMPANY_INFO.name}, we are dedicated to transforming your digital presence and delivering over 200% more qualified leads through creative design, modern technology, and strategic marketing."
              </blockquote>
            </div>

            <div className="pt-8 flex items-center gap-3.5 border-t border-[#D4B26B]/30 mt-8">
              <img
                src={COMPANY_INFO.ceoImage}
                alt={COMPANY_INFO.founder}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = '/images/ceo.png';
                }}
                className="w-12 h-12 rounded-full object-cover object-[center_10%] border-2 border-[#D4B26B] shadow-sm pointer-events-none"
              />
              <div>
                <div className="font-bold text-white text-base">{COMPANY_INFO.founder}</div>
                <div className="text-xs text-[#D4B26B] font-medium">{COMPANY_INFO.role}, {COMPANY_INFO.name}</div>
              </div>
            </div>
          </div>

          {/* Right CTA Card (Deep rich midnight with gold accent) */}
          <div
            onMouseEnter={() => setHoveredSplitCard('cta')}
            className={`lg:col-span-7 bg-[#231955] text-white p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden transition-all duration-350 ${
              hoveredSplitCard === 'cta'
                ? 'ring-2 ring-[#D4B26B]/70 shadow-2xl z-10 opacity-100'
                : hoveredSplitCard === 'testimonial'
                ? 'opacity-80'
                : 'opacity-100'
            }`}
          >
            {/* Hand-drawn curved arrow doodle SVG */}
            <svg
              className="absolute right-12 bottom-6 w-24 h-24 text-[#D4B26B]/30 hidden sm:block pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M 20 80 Q 50 85, 70 50 Q 80 30, 85 20" strokeDasharray="3 3" />
              <path d="M 75 22 L 85 20 L 87 30" />
            </svg>

            <div className="max-w-md space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D4B26B]/50 text-[#D4B26B] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let's Collaborate</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to Grow Your Business?
              </h2>
              <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed">
                Let's build something amazing together. Speak with {COMPANY_INFO.founder} and our digital growth team today.
              </p>
              <div className="pt-4">
                <Link
                  id="split-cta-proposal-btn"
                  to="/contact"
                  className="btn-white-on-indigo inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#D4B26B] text-[#3C2B99] font-bold text-sm border border-white hover:border-[#D4B26B] transition-colors duration-250 ease-out shadow-lg hover:shadow-2xl hover:shadow-[#D4B26B]/30 cursor-pointer group"
                >
                  <span>Get Your Free Proposal</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#3C2B99] transition-transform duration-250 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STAY AHEAD WITH DIGITAL INSIGHTS NEWSLETTER BANNER */}
      <motion.section
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ y: [12, 0] }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20"
      >
        <div className="bg-white rounded-2xl border border-zinc-200 hover:border-[#D4B26B]/60 p-8 sm:p-10 shadow-2xs hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Icon & Text */}
            <div className="flex items-start gap-4 max-w-xl">
              <div className="w-12 h-12 rounded-xl bg-[#3C2B99]/10 border border-[#D4B26B]/40 text-[#3C2B99] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-zinc-900">
                  Stay Ahead with Digital Insights
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Subscribe to our newsletter and get the latest tips, growth trends, and design strategies delivered directly to your inbox.
                </p>
              </div>
            </div>

            {/* Right: Email Input & Subscribe Button */}
            <div className="w-full lg:w-auto">
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 text-[#3C2B99] bg-[#3C2B99]/10 px-5 py-3 rounded-full text-sm font-semibold border border-[#D4B26B]">
                  <CheckCircle2 className="w-5 h-5 text-[#D4B26B]" />
                  <span>Thank you for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-md"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full sm:w-72 px-4 py-3 rounded-full border border-zinc-300 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3C2B99] focus:border-[#3C2B99] transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#3C2B99] hover:bg-[#D4B26B] text-white font-semibold text-sm border border-[#D4B26B]/50 hover:border-[#D4B26B] flex items-center justify-center gap-2 transition-colors duration-250 ease-out shadow-sm hover:shadow-lg hover:shadow-[#D4B26B]/30 shrink-0 cursor-pointer group"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5] text-white transition-transform duration-250 ease-out group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
