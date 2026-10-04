import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Sparkles, ExternalLink, ArrowUpRight, ArrowRight, TrendingUp } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/siteData';
import { PortfolioProject, ServiceCategory } from '../types';
import { ProjectModal } from '../components/ProjectModal';
import {
  FocusLockLightSweep,
  FocusLockBadge,
  FocusLockHeading,
  FocusLockUnderline,
  FocusLockDescription,
  FocusLockCtaButton,
} from '../components/CtaAnimationSystem';

export const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | ServiceCategory>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Bottom-to-Top Gradient Reveal animation state for main title
  const titleGradientRevealRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleGradientRevealRef, { once: true, amount: 0.2 });
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [isRevealComplete, setIsRevealComplete] = useState(false);

  useEffect(() => {
    if (isTitleInView && !isRevealing && !isRevealComplete) {
      const timer = setTimeout(() => setIsRevealing(true), 60);
      return () => clearTimeout(timer);
    }
  }, [isTitleInView, isRevealing, isRevealComplete]);

  // Guaranteed fallback for iframe / immediate load
  useEffect(() => {
    const fallback = setTimeout(() => {
      setIsRevealing(true);
    }, 200);
    return () => clearTimeout(fallback);
  }, []);

  // Smooth 60fps/120fps requestAnimationFrame gradient sweep upward inside the text
  useEffect(() => {
    if (!isRevealing || isRevealComplete) return;

    const startTime = performance.now();
    const duration = 900; // ms (0.9s - within the 0.8–1 second target)

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, Math.max(0, elapsed / duration));
      // Smooth easeInOut curve for natural upward gradient progression
      const p = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setRevealProgress(p);

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setIsRevealComplete(true);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isRevealing, isRevealComplete]);

  // Focus-frame sequential activation when gallery enters viewport
  const galleryRef = useRef<HTMLElement>(null);
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.15 });
  const [activeFrameIndex, setActiveFrameIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isGalleryInView) return;
    const timers = [
      setTimeout(() => setActiveFrameIndex(0), 300),
      setTimeout(() => setActiveFrameIndex(1), 850),
      setTimeout(() => setActiveFrameIndex(2), 1400),
      setTimeout(() => setActiveFrameIndex(null), 2300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isGalleryInView]);

  // CTA Section Activation
  const ctaRef = useRef<HTMLElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.25 });

  // Gradient stops:
  // At start (revealProgress = 0): only lower portion (bottom 10%) is solid, fading to transparent at 32%.
  // As revealProgress -> 1: solid edge sweeps up from 10% to 100%, and fade edge sweeps up to 100%.
  const solidStop = (10 + revealProgress * 90).toFixed(1);
  const fadeStop = Math.min(100, 10 + revealProgress * 90 + (1 - revealProgress) * 22).toFixed(1);
  const maskGradient = `linear-gradient(to top, black 0%, black ${solidStop}%, transparent ${fadeStop}%, transparent 100%)`;

  const filteredProjects =
    filter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="pt-20 pb-20 bg-[#FAFAFA]">
      {/* Page Header */}
      <section className="py-14 md:py-20 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="max-w-2xl space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3C2B99]/8 border border-[#D4B26B]/50 text-[#3C2B99] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D4B26B]" />
                <span>Client Case Studies & Use Cases</span>
              </div>
              {/* Heading: Unique "Bottom-to-Top Gradient Reveal" Animation */}
              <div ref={titleGradientRevealRef} className="relative py-2 -my-2 inline-block">
                {isRevealComplete ? (
                  <h1
                    style={{ transform: 'none' }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.18] sm:leading-[1.15] pt-1 pb-4 px-1 relative z-10 select-text"
                  >
                    Use Cases &amp; <br className="hidden sm:inline" />
                    <span className="text-[#3C2B99]">
                      Proven Results
                    </span>
                  </h1>
                ) : (
                  <h1
                    style={{ transform: 'none' }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.18] sm:leading-[1.15] pt-1 pb-4 px-1 relative z-10 select-text"
                  >
                    <span
                      className="inline-block"
                      style={{
                        WebkitMaskImage: isRevealing
                          ? maskGradient
                          : 'linear-gradient(to top, black 0%, black 10%, transparent 32%, transparent 100%)',
                        maskImage: isRevealing
                          ? maskGradient
                          : 'linear-gradient(to top, black 0%, black 10%, transparent 32%, transparent 100%)',
                      }}
                    >
                      Use Cases &amp;
                    </span>{' '}
                    <br className="hidden sm:inline" />
                    <span
                      className="text-[#3C2B99] inline-block"
                      style={{
                        WebkitMaskImage: isRevealing
                          ? maskGradient
                          : 'linear-gradient(to top, black 0%, black 10%, transparent 32%, transparent 100%)',
                        maskImage: isRevealing
                          ? maskGradient
                          : 'linear-gradient(to top, black 0%, black 10%, transparent 32%, transparent 100%)',
                      }}
                    >
                      Proven Results
                    </span>
                  </h1>
                )}
              </div>
              <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal">
                Explore our recent digital marketing, website development, and brand identity projects delivering measurable commercial impact.
              </p>
            </motion.div>

            {/* Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.05, ease: 'easeOut' }}
              className="flex items-center flex-wrap gap-2 p-1.5 bg-zinc-100 border border-zinc-200 rounded-full"
            >
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#3C2B99] text-white shadow-sm border border-[#D4B26B]/50'
                    : 'btn-secondary-lightgrey'
                }`}
              >
                All ({PORTFOLIO_PROJECTS.length})
              </button>
              <button
                onClick={() => setFilter('website')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  filter === 'website'
                    ? 'bg-[#3C2B99] text-white shadow-sm border border-[#D4B26B]/50'
                    : 'btn-secondary-lightgrey'
                }`}
              >
                Websites
              </button>
              <button
                onClick={() => setFilter('social')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  filter === 'social'
                    ? 'bg-[#3C2B99] text-white shadow-sm border border-[#D4B26B]/50'
                    : 'btn-secondary-lightgrey'
                }`}
              >
                Social Media
              </button>
              <button
                onClick={() => setFilter('graphic')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  filter === 'graphic'
                    ? 'bg-[#3C2B99] text-white shadow-sm border border-[#D4B26B]/50'
                    : 'btn-secondary-lightgrey'
                }`}
              >
                Graphic & Brand
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={galleryRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Featured Client Case Studies & Deliverables</h2>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isHovered = hoveredProjectId === project.id;
                const isFrameFocused = isHovered || activeFrameIndex === index;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    id={`portfolio-card-${project.id}`}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onMouseEnter={() => setHoveredProjectId(project.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    className={`relative group bg-white rounded-3xl overflow-hidden flex flex-col justify-between cursor-default transition-all duration-350 ease-out border ${
                      isFrameFocused
                        ? 'border-[#3C2B99] ring-2 ring-[#D4B26B]/50 shadow-[0_16px_40px_rgba(60,43,153,0.18)] z-20'
                        : 'border-zinc-200 opacity-100 shadow-2xs z-10'
                    }`}
                  >
                    {/* Sophisticated border light movement when frame is focused */}
                    <svg className={`absolute inset-0 w-full h-full rounded-3xl pointer-events-none z-30 transition-opacity duration-300 ${isFrameFocused ? 'opacity-100' : 'opacity-0'}`}>
                      <rect
                        x="1.5"
                        y="1.5"
                        width="calc(100% - 3px)"
                        height="calc(100% - 3px)"
                        rx="23"
                        fill="none"
                        stroke={`url(#portfolioFrameGlow-${project.id})`}
                        strokeWidth="2.5"
                        pathLength="100"
                        strokeDasharray="25 75"
                        className="animate-seamless-border"
                      />
                      <defs>
                        <linearGradient id={`portfolioFrameGlow-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#D4B26B" stopOpacity="0.4" />
                          <stop offset="50%" stopColor="#D4B26B" stopOpacity="1" />
                          <stop offset="100%" stopColor="#3C2B99" stopOpacity="0.9" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div>
                      {/* Image Stage */}
                    <div
                      className={`relative aspect-16/10 overflow-hidden flex items-center justify-center cursor-pointer ${
                        project.id === 'deep-tuition-class'
                          ? 'bg-white'
                          : project.id === 'het-creation'
                          ? 'bg-[#fbf2e9]'
                          : project.id === 'optimum-fitness'
                          ? 'bg-[#1f292b]'
                          : project.id === 'alices-tech-solutions'
                          ? 'bg-white'
                          : 'bg-stone-950'
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Ambient backdrop blur only for other cards, strictly never for the 3 target cards */}
                      {project.id !== 'optimum-fitness' &&
                        project.id !== 'het-creation' &&
                        project.id !== 'deep-tuition-class' && (
                          <img
                            src={project.image}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            className={`absolute inset-0 w-full h-full object-cover ${
                              project.id === 'alices-tech-solutions'
                                ? 'blur-2xl opacity-20 scale-110'
                                : 'blur-xl opacity-50 scale-110'
                            }`}
                            onError={(e) => {
                              if (project.id === 'gatived-ev') {
                                e.currentTarget.src = '/images/ev-1.png';
                              } else if (project.id === 'the-urban-image') {
                                e.currentTarget.src = '/images/urban.png';
                              } else if (project.id === 'alices-tech-solutions') {
                                e.currentTarget.src = '/images/a.jpg';
                              }
                            }}
                          />
                        )}
                      {/* Complete original image displayed with zero cropping, distortion, zoom, scale, or color tint */}
                      <img
                        src={project.image}
                        alt={`${project.title} – ${project.categoryLabel} Project by Rudraksha Infotek`}
                        referrerPolicy="no-referrer"
                        loading={index < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        onError={(e) => {
                          if (project.id === 'het-creation') {
                            e.currentTarget.src = '/images/het-creation.jpg';
                          } else if (project.id === 'gatived-ev') {
                            e.currentTarget.src = '/images/ev-1.png';
                          } else if (project.id === 'the-urban-image') {
                            e.currentTarget.src = '/images/urban.png';
                          } else if (project.id === 'deep-tuition-class') {
                            e.currentTarget.src = '/images/deep.jpeg';
                          } else if (project.id === 'optimum-fitness') {
                            e.currentTarget.src = '/images/optimum-.jpeg';
                          } else if (project.id === 'alices-tech-solutions') {
                            e.currentTarget.src = '/images/a.jpg';
                          }
                        }}
                        className={`relative z-10 w-full h-full ${
                          project.id === 'optimum-fitness' ||
                          project.id === 'het-creation' ||
                          project.id === 'deep-tuition-class'
                            ? 'object-contain'
                            : project.id === 'gatived-ev'
                            ? 'object-cover object-[center_50%] scale-[1.22] transition-transform duration-500 ease-out'
                            : project.id === 'the-urban-image'
                            ? 'object-cover object-[32%_52%] scale-[1.20] transition-transform duration-500 ease-out'
                            : project.id === 'alices-tech-solutions'
                            ? 'object-cover scale-[1.08] transition-transform duration-500 ease-out'
                            : 'object-cover'
                        }`}
                      />
                      <div className="absolute top-3 left-3 z-20 bg-[#D9D9D9] backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-[#3C2B99] border border-[#D9D9D9] shadow-xs">
                        {project.categoryLabel}
                      </div>
                      <div className="absolute top-3 right-3 z-20 bg-[#3C2B99]/90 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-[#D4B26B]/40">
                        {project.year}
                      </div>
                      <div className="absolute inset-0 z-20 bg-transparent pointer-events-none flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-250 group-hover:scale-105 bg-[#D9D9D9] text-[#3C2B99] text-xs font-bold px-4 py-2 rounded-full shadow-md inline-flex items-center gap-1.5 border border-[#D4B26B] pointer-events-auto">
                          <span>Inspect Case Study</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#3C2B99]" />
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7">
                      <p className={`text-[11px] font-bold text-[#3C2B99] uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 ${isHovered ? 'translate-x-0.5' : ''}`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-[#D4B26B] transition-transform duration-200 ${isHovered ? 'scale-125' : ''}`} />
                        <span>{project.client}</span>
                      </p>
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className={`text-xl font-bold mt-1 cursor-pointer transition-all duration-200 ${isHovered ? 'text-[#3C2B99] translate-x-1' : 'text-zinc-950'}`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Deliverables Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.deliverables.map((d) => (
                          <span
                            key={d}
                            className="text-[11px] font-medium bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md"
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Measured Metrics */}
                      <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-zinc-100 text-center">
                        {project.results.map((res) => (
                          <div
                            key={res.label}
                            className="bg-[#3C2B99]/5 rounded-xl py-2 px-1.5 border border-[#D4B26B]/30 flex flex-col items-center justify-center min-h-[56px]"
                          >
                            <p className="text-[11px] sm:text-xs md:text-sm font-bold text-[#3C2B99] tracking-tight leading-tight line-clamp-1">
                              {res.metric}
                            </p>
                            <p className="text-[10px] text-zinc-500 truncate font-medium mt-0.5">
                              {res.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="px-6 pb-6 pt-2 border-t border-zinc-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn-secondary-lightgrey flex-1 py-2.5 px-3 rounded-full border text-xs font-semibold text-center cursor-pointer"
                    >
                      View Details
                    </button>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group py-2.5 px-4 rounded-full bg-[#3C2B99] hover:bg-[#D4B26B] text-white text-xs font-semibold border border-[#D4B26B]/50 hover:border-[#D4B26B] transition-colors duration-250 ease-out inline-flex items-center gap-1 shrink-0 shadow-xs cursor-pointer"
                      >
                        <span>{project.actionLabel || 'Visit Website'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : project.actionLabel === 'View Project' ? (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="group py-2.5 px-4 rounded-full bg-[#3C2B99] hover:bg-[#D4B26B] text-white text-xs font-semibold border border-[#D4B26B]/50 hover:border-[#D4B26B] transition-colors duration-250 ease-out inline-flex items-center gap-1 shrink-0 shadow-xs cursor-pointer"
                      >
                        <span>View Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate(`/contact?service=${project.category}&project=${encodeURIComponent(project.title)}`)
                        }
                        className="group py-2.5 px-4 rounded-full bg-[#3C2B99] hover:bg-[#D4B26B] text-white text-xs font-semibold border border-[#D4B26B]/50 hover:border-[#D4B26B] transition-colors duration-250 ease-out inline-flex items-center gap-1 shrink-0 shadow-xs cursor-pointer"
                      >
                        <span>Build Similar</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Portfolio CTA in Brand Indigo with Gold accents */}
      <section
        ref={ctaRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16"
      >
        <div className="bg-[#3C2B99] text-white rounded-3xl p-8 sm:p-14 text-center shadow-2xl border border-[#D4B26B]/30 relative overflow-hidden">
          {/* Ambient subtle blur glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4B26B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* 1. SECTION ENTER: Focus Lock Light Sweep & Target Reticles */}
          <FocusLockLightSweep isActive={isCtaInView} />

          <div className="relative z-10">
            {/* 2. BADGE: Appears first with Focus Lock calibration */}
            <div className="mb-4">
              <FocusLockBadge text="Let's Build Together" isActive={isCtaInView} />
            </div>

            {/* 3. HEADING: Digital Focus Lock onto text (optical pull) */}
            <FocusLockHeading
              text="Have a Specific Vision in Mind?"
              isActive={isCtaInView}
              className="text-2xl sm:text-4xl font-extrabold text-white"
            />

            {/* 4. GOLD UNDERLINE: Draws from Left to Right */}
            <FocusLockUnderline isActive={isCtaInView} className="my-4" />

            {/* 5. DESCRIPTION: Signal Reveal */}
            <FocusLockDescription isActive={isCtaInView} className="mt-2 max-w-xl mx-auto">
              <p className="text-indigo-100 text-sm sm:text-base">
                Let&apos;s build a digital flagship, social campaign, or brand design engineered around your exact commercial objectives.
              </p>
            </FocusLockDescription>

            {/* 6 & 7. CTA BUTTON: Activates last with thin edge light + forward arrow nudge */}
            <div className="mt-8 flex justify-center">
              <FocusLockCtaButton
                id="portfolio-cta-discuss-btn"
                to="/contact"
                text="Discuss Your Project With Het Tailor"
                isActive={isCtaInView}
                className="btn-white-on-indigo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestQuote={(p) => {
          setSelectedProject(null);
          navigate(`/contact?service=${p.category}&project=${encodeURIComponent(p.title)}`);
        }}
      />
    </div>
  );
};
