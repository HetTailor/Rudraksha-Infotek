import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/siteData';
import { ContinuousSquareBorder } from '../components/ContinuousSquareBorder';
import {
  CtaScanningWipe,
  InitializedBadge,
  AssembledHeading,
  DrawnGoldLine,
  SignalDescription,
  CursorAwareCard,
  CardStaggerItem,
} from '../components/CtaAnimationSystem';

export const ServicesPage: React.FC = () => {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] = useState<'website' | 'social' | 'graphic'>('website');

  const ctaRef = useRef<HTMLElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  // Word Pulse Expansion animation state for main title
  const titleExpansionRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleExpansionRef, { once: true, amount: 0.2 });
  const [isExpanding, setIsExpanding] = useState(false);
  const [isExpansionComplete, setIsExpansionComplete] = useState(false);

  useEffect(() => {
    if (isTitleInView && !isExpanding && !isExpansionComplete) {
      const timer = setTimeout(() => setIsExpanding(true), 60);
      return () => clearTimeout(timer);
    }
  }, [isTitleInView, isExpanding, isExpansionComplete]);

  // Guaranteed fallback for iframe / direct page load
  useEffect(() => {
    const fallback = setTimeout(() => {
      setIsExpanding(true);
    }, 200);
    return () => clearTimeout(fallback);
  }, []);

  // Lock title permanently into clean static state once all words expand
  useEffect(() => {
    if (isExpanding && !isExpansionComplete) {
      const lockTimer = setTimeout(() => {
        setIsExpansionComplete(true);
      }, 1050);
      return () => clearTimeout(lockTimer);
    }
  }, [isExpanding, isExpansionComplete]);

  // Connected interactive animation for service cards: 01 -> 02 -> 03 sequence
  const servicesListRef = useRef<HTMLDivElement>(null);
  const isServicesInView = useInView(servicesListRef, { once: true, amount: 0.1 });
  const [sequencedStep, setSequencedStep] = useState<number | null>(null);

  useEffect(() => {
    if (!isServicesInView) return;
    const timers = [
      setTimeout(() => setSequencedStep(0), 300),
      setTimeout(() => setSequencedStep(1), 1100),
      setTimeout(() => setSequencedStep(2), 1900),
      setTimeout(() => setSequencedStep(null), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isServicesInView]);

  useEffect(() => {
    if (hash === '#social') setActiveSection('social');
    else if (hash === '#graphic') setActiveSection('graphic');
    else if (hash === '#web' || hash === '#website') setActiveSection('website');
  }, [hash]);

  return (
    <div className="pt-20 pb-20 bg-[#FAFAFA]">
      {/* Page Header */}
      <section className="py-14 md:py-20 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3C2B99]/8 border border-[#D4B26B]/50 text-[#3C2B99] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4B26B]" />
              <span>Full Service Catalog</span>
            </div>
            {/* Heading: Unique "Word Pulse Expansion" Animation */}
            <div ref={titleExpansionRef} className="relative py-2 -my-2 inline-block">
              {isExpansionComplete ? (
                <h1
                  style={{ transform: 'none' }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.18] sm:leading-[1.15] pt-1 pb-4 px-1 select-text"
                >
                  Powerful Solutions to <br className="hidden sm:inline" />
                  <span className="text-[#3C2B99]">
                    Grow Your Business
                  </span>
                </h1>
              ) : (
                <h1
                  style={{ transform: 'none' }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.18] sm:leading-[1.15] pt-1 pb-4 px-1 select-text"
                >
                  <span className="inline-block">
                    <motion.span
                      initial={{ scaleX: 0.8, opacity: 0.5 }}
                      animate={isExpanding ? { scaleX: 1, opacity: 1 } : undefined}
                      transition={{ duration: 0.75, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
                      className="inline-block whitespace-nowrap"
                    >
                      Powerful
                    </motion.span>{' '}
                    <motion.span
                      initial={{ scaleX: 0.8, opacity: 0.5 }}
                      animate={isExpanding ? { scaleX: 1, opacity: 1 } : undefined}
                      transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
                      className="inline-block whitespace-nowrap"
                    >
                      Solutions
                    </motion.span>{' '}
                    <motion.span
                      initial={{ scaleX: 0.8, opacity: 0.5 }}
                      animate={isExpanding ? { scaleX: 1, opacity: 1 } : undefined}
                      transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
                      className="inline-block whitespace-nowrap"
                    >
                      to
                    </motion.span>
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  <span className="text-[#3C2B99] inline-block">
                    <motion.span
                      initial={{ scaleX: 0.8, opacity: 0.5 }}
                      animate={isExpanding ? { scaleX: 1, opacity: 1 } : undefined}
                      transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
                      className="inline-block whitespace-nowrap"
                    >
                      Grow
                    </motion.span>{' '}
                    <motion.span
                      initial={{ scaleX: 0.8, opacity: 0.5 }}
                      animate={isExpanding ? { scaleX: 1, opacity: 1 } : undefined}
                      transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
                      className="inline-block whitespace-nowrap"
                    >
                      Your
                    </motion.span>{' '}
                    <motion.span
                      initial={{ scaleX: 0.8, opacity: 0.5 }}
                      animate={isExpanding ? { scaleX: 1, opacity: 1 } : undefined}
                      transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
                      className="inline-block whitespace-nowrap"
                    >
                      Business
                    </motion.span>
                  </span>
                </h1>
              )}
            </div>
            {/* Two-Line Accent: Top line Indigo #3C2B99, Bottom line Light Grey #D9D9D9 */}
            <div className="space-y-1.5 py-1 w-32">
              <div className="h-1 bg-[#3C2B99] rounded-full overflow-hidden relative">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <line
                    x1="0"
                    y1="2"
                    x2="100%"
                    y2="2"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeOpacity="0.45"
                    pathLength="100"
                    strokeDasharray="30 70"
                    className="animate-seamless-line"
                  />
                </svg>
              </div>
              <div className="h-1 bg-[#D9D9D9] rounded-full overflow-hidden relative">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <line
                    x1="0"
                    y1="2"
                    x2="100%"
                    y2="2"
                    stroke="#3C2B99"
                    strokeWidth="4"
                    strokeOpacity="0.55"
                    pathLength="100"
                    strokeDasharray="30 70"
                    className="animate-seamless-line-reverse"
                  />
                </svg>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal">
              From strategy to execution, we provide end-to-end digital services across website engineering, social media marketing, and graphic designing.
            </p>
          </div>

          {/* Quick Tab Anchor Bar */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {SERVICES_DATA.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeSection === s.id
                    ? 'bg-[#3C2B99] text-white shadow-sm border border-[#D4B26B]/50'
                    : 'btn-secondary-lightgrey'
                }`}
              >
                <span className={`font-mono text-xs ${activeSection === s.id ? 'text-[#D4B26B]' : ''}`}>{s.number}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <div ref={servicesListRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 1;
          const isSelected = activeSection === service.id;
          const isSequencedActive = sequencedStep === index;

          return (
            <React.Fragment key={service.id}>
              <motion.section
                id={service.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ y: [10, 0] }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`scroll-mt-32 p-6 sm:p-10 lg:p-12 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                  isSelected || isSequencedActive
                    ? 'border-[#D4B26B] bg-white shadow-xl shadow-[#3C2B99]/8'
                    : 'border-zinc-200 bg-white hover:border-[#D4B26B] hover:shadow-lg'
                }`}
              >
                {/* Subtle border/outline illumination when the signal reaches this service item */}
                {isSequencedActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-3xl ring-2 ring-[#3C2B99] shadow-[0_0_24px_rgba(60,43,153,0.35)] pointer-events-none z-30"
                  />
                )}

                {/* Continuous Square Border Path: Top (Grey) -> Right (Indigo) -> Bottom (Grey) -> Left (Indigo) */}
                <ContinuousSquareBorder cardId={service.id} staggerIndex={index} borderRadius={23} />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Text Content */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold bg-[#3C2B99]/10 text-[#3C2B99] px-3 py-1 rounded-full border border-[#D4B26B]/50">
                      {service.number}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-widest text-[#D4B26B]">
                      {service.id === 'website'
                        ? 'Digital Engineering'
                        : service.id === 'social'
                        ? 'Audience & Growth'
                        : 'Visual Identity'}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-lg font-semibold text-[#3C2B99] mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-base text-zinc-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* What we offer */}
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
                      What we offer:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.offerings.map((offering) => (
                        <div
                          key={offering}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs sm:text-sm font-medium text-zinc-800 hover:border-[#D4B26B] hover:bg-[#3C2B99]/5 transition-colors"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#3C2B99] text-[#D4B26B] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{offering}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {service.highlights.map((h) => (
                      <div key={h.title} className="p-3.5 bg-[#3C2B99]/5 rounded-xl border border-[#D4B26B]/30">
                        <p className="text-xs font-bold text-zinc-950">{h.title}</p>
                        <p className="text-[11px] text-zinc-600 mt-0.5 leading-snug">{h.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Service Specific CTA */}
                  <div className="pt-3">
                    <Link
                      id={`page-cta-${service.id}`}
                      to={`/contact?service=${service.id}`}
                      className="service-action-cta-btn relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#3C2B99] hover:bg-[#D9D9D9] hover:border-[#D9D9D9] text-white hover:text-[#3C2B99] text-sm font-semibold border border-[#D4B26B]/50 transition-all duration-250 ease-out shadow-sm hover:shadow-lg hover:shadow-[#3C2B99]/25 cursor-pointer group"
                    >
                      <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[350%] transition-transform duration-700 ease-out pointer-events-none" />
                      <span className="relative z-10 transition-colors duration-250">{service.ctaText}</span>
                      <ArrowRight className="relative z-10 w-4 h-4 stroke-[2.5] text-white group-hover:text-[#3C2B99] transition-all duration-250 ease-out group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Imagery Showcase */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                  <motion.div
                    whileHover={{ transition: { duration: 0.3 } }}
                    className="overflow-hidden rounded-3xl border border-zinc-200/90 hover:border-[#D4B26B] bg-white p-2.5 sm:p-3 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-zinc-950 flex items-center justify-center group">
                      {/* Ambient backdrop for smooth letterbox blending */}
                      <img
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110"
                        onError={(e) => {
                          if (service.id === 'website') {
                            e.currentTarget.src = '/images/web-development.jpg';
                          } else if (service.id === 'social') {
                            e.currentTarget.src = '/images/instagram.png';
                          } else if (service.id === 'graphic') {
                            e.currentTarget.src = '/images/graphic.jpg';
                          }
                        }}
                      />
                      {/* Auto-adjusted sharp photo */}
                      <img
                        src={service.image}
                        alt={`${service.title} Services – ${service.tagline} | Rudraksha Infotek`}
                        referrerPolicy="no-referrer"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        onError={(e) => {
                          if (service.id === 'website') {
                            e.currentTarget.src = '/images/web-development.jpg';
                          } else if (service.id === 'social') {
                            e.currentTarget.src = '/images/instagram.png';
                          } else if (service.id === 'graphic') {
                            e.currentTarget.src = '/images/graphic.jpg';
                          }
                        }}
                        className="relative z-10 w-full h-full object-cover object-center rounded-2xl transition-transform duration-500 ease-out"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Thin Indigo signal line traveling between service items (01 -> 02 -> 03) */}
            {index < SERVICES_DATA.length - 1 && (
              <div className="flex justify-center -my-8 relative z-20 pointer-events-none" aria-hidden="true">
                <div className="w-[2px] h-12 bg-zinc-200/80 rounded-full relative overflow-hidden">
                  <motion.div
                    animate={
                      sequencedStep === index
                        ? { y: ['-100%', '100%'], opacity: [0, 1, 0] }
                        : { y: '-100%', opacity: 0 }
                    }
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="w-full h-full bg-gradient-to-b from-transparent via-[#3C2B99] to-[#D4B26B]"
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
      </div>

      {/* Cross-Service Packages Banner */}
      <section
        ref={ctaRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16"
      >
        <div className="bg-[#3C2B99] text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl border border-[#D4B26B]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4B26B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* 1. SECTION ENTER: Cinematic Wipe Reveal with Gold scanning line */}
          <CtaScanningWipe isActive={isCtaInView} />

          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3 relative z-10">
            {/* 2. BADGE: System Initialization */}
            <div>
              <InitializedBadge text="Bundled Solutions" isActive={isCtaInView} />
            </div>

            {/* 3. HEADING: Custom Masked Word Assemble */}
            <AssembledHeading
              text="Need an All-In-One Growth Package?"
              isActive={isCtaInView}
              className="text-2xl sm:text-3xl font-extrabold text-white"
            />

            {/* 4. GOLD UNDERLINE: Draw Outward from Center */}
            <DrawnGoldLine isActive={isCtaInView} className="my-4" />

            {/* 5. DESCRIPTION: Signal Reveal */}
            <SignalDescription isActive={isCtaInView} className="max-w-2xl mx-auto">
              <p className="text-indigo-100 text-sm sm:text-base">
                Most businesses achieve maximum momentum when combining a sub-second website, consistent social campaigns, and high-converting graphic brand kits.
              </p>
            </SignalDescription>
          </div>

          {/* 7 & 8. CARDS: Sequential activation with cursor interaction */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <CursorAwareCard
              isFeatured={false}
              activationDelay={0.82}
              isActiveSection={isCtaInView}
              className="p-6 rounded-2xl bg-[#D9D9D9] text-zinc-950 border border-[#D9D9D9] flex flex-col justify-between shadow-md cursor-default"
            >
              <div>
                <CardStaggerItem isActive={isCtaInView} delay={0.92}>
                  <h3 className="font-bold text-zinc-950 text-lg mb-1">Web + Brand Kit</h3>
                  <p className="text-xs text-zinc-700 mb-4 leading-relaxed">
                    Launch with a new vector logo mark, complete color kit, and a responsive flagship website.
                  </p>
                </CardStaggerItem>
              </div>
              <CardStaggerItem isActive={isCtaInView} delay={1.02}>
                <Link
                  to="/contact?service=website"
                  className="cta-action-btn group inline-flex items-center gap-1.5 text-xs font-bold text-[#3C2B99] px-3 py-1.5 rounded-full border border-transparent hover:bg-[#3C2B99] hover:border-[#3C2B99] hover:text-white transition-all duration-250 cursor-pointer"
                >
                  <span>Inquire About Web & Brand</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3C2B99] group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </CardStaggerItem>
            </CursorAwareCard>

            <CursorAwareCard
              isFeatured={false}
              activationDelay={0.96}
              isActiveSection={isCtaInView}
              className="p-6 rounded-2xl bg-[#D9D9D9] text-zinc-950 border border-[#D9D9D9] flex flex-col justify-between shadow-md cursor-default"
            >
              <div>
                <CardStaggerItem isActive={isCtaInView} delay={1.06}>
                  <h3 className="font-bold text-zinc-950 text-lg mb-1">Social + Creatives</h3>
                  <p className="text-xs text-zinc-700 mb-4 leading-relaxed">
                    Ongoing monthly social management, aesthetic feeds, and promotional event banners.
                  </p>
                </CardStaggerItem>
              </div>
              <CardStaggerItem isActive={isCtaInView} delay={1.16}>
                <Link
                  to="/contact?service=social"
                  className="cta-action-btn group inline-flex items-center gap-1.5 text-xs font-bold text-[#3C2B99] px-3 py-1.5 rounded-full border border-transparent hover:bg-[#3C2B99] hover:border-[#3C2B99] hover:text-white transition-all duration-250 cursor-pointer"
                >
                  <span>Inquire About Social & Creatives</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3C2B99] group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </CardStaggerItem>
            </CursorAwareCard>

            <CursorAwareCard
              isFeatured={true}
              activationDelay={1.10}
              isActiveSection={isCtaInView}
              className="p-6 rounded-2xl bg-[#D4B26B] text-zinc-950 border border-[#D4B26B] flex flex-col justify-between shadow-md cursor-default"
            >
              <div>
                <CardStaggerItem isActive={isCtaInView} delay={1.20}>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-[#FFFFFF] text-[#3C2B99] border border-[#9A8A80] inline-block mb-2">
                    All-in-One
                  </span>
                  <h3 className="font-bold text-zinc-950 text-lg mb-1">Full Growth Suite</h3>
                  <p className="text-xs text-zinc-900 mb-4 leading-relaxed font-medium">
                    Complete digital footprint: website engineering, social media execution, and graphic designs.
                  </p>
                </CardStaggerItem>
              </div>
              <CardStaggerItem isActive={isCtaInView} delay={1.30}>
                <Link
                  to="/contact"
                  className="cta-action-btn group inline-flex items-center gap-1.5 text-xs font-bold text-[#3C2B99] px-3 py-1.5 rounded-full border border-transparent hover:bg-[#3C2B99] hover:border-[#3C2B99] hover:text-white transition-all duration-250 cursor-pointer"
                >
                  <span>Get Full Suite Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3C2B99] group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </CardStaggerItem>
            </CursorAwareCard>
          </div>
        </div>
      </section>
    </div>
  );
};
