import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  Sparkles,
  Quote,
  Award,
  ShieldCheck,
  ArrowRight,
  HeartHandshake,
  Compass,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

const LightSweepChar: React.FC<{
  char: string;
  globalIdx: number;
  sweepActive: boolean;
  isIndigoLine: boolean;
}> = ({ char, globalIdx, sweepActive, isIndigoLine }) => {
  return (
    <span className="relative inline-block" style={{ transform: 'none' }}>
      {/* Base letter glyph: always in exact original appearance, zero movement */}
      <span className="inline-block" style={{ transform: 'none' }}>
        {char}
      </span>

      {/* Subtle Indigo highlight passing through the letter glyph */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={
          sweepActive
            ? {
                opacity: [0, 0.9, 0],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 0.28,
          delay: 0.04 + globalIdx * 0.022,
          ease: 'easeInOut',
        }}
        className={`absolute inset-0 pointer-events-none select-none inline-block ${
          isIndigoLine ? 'text-[#8572ea]' : 'text-[#3C2B99]'
        }`}
        style={{
          transform: 'none',
          textShadow: isIndigoLine
            ? '0 0 10px rgba(99, 82, 234, 0.75), 0 0 2px rgba(255, 255, 255, 0.85)'
            : '0 0 8px rgba(60, 43, 153, 0.65), 0 0 1.5px rgba(212, 178, 107, 0.5)',
        }}
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AboutPage: React.FC = () => {
  const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);
  const [headingLocked, setHeadingLocked] = React.useState(false);
  const [paragraphStarted, setParagraphStarted] = React.useState(false);
  const [paragraphLocked, setParagraphLocked] = React.useState(false);

  // Typography Light Sweep animation state for main heading
  const headingSweepRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingSweepRef, { once: true, amount: 0.2 });
  const [sweepActive, setSweepActive] = React.useState(false);

  const headingWordsLine1 = ["We", "Turn", "Ideas", "Into"];
  const headingWordsLine2 = ["Digital", "Experiences"];

  React.useEffect(() => {
    if (isHeadingInView && !sweepActive && !headingLocked) {
      const timer = setTimeout(() => setSweepActive(true), 80);
      return () => clearTimeout(timer);
    }
  }, [isHeadingInView, sweepActive, headingLocked]);

  // Guaranteed fallback for iframe / immediate render
  React.useEffect(() => {
    const fallback = setTimeout(() => {
      setSweepActive(true);
    }, 240);
    return () => clearTimeout(fallback);
  }, []);

  // Complete sweep and lock heading permanently into stable text
  React.useEffect(() => {
    if (sweepActive && !headingLocked) {
      const timer = setTimeout(() => {
        setHeadingLocked(true);
      }, 1050);
      return () => clearTimeout(timer);
    }
  }, [sweepActive, headingLocked]);

  // Synchronize paragraph reveal to start as the highlight travels across
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setParagraphStarted(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-20 pb-20 bg-[#FAFAFA]">
      {/* SVG Definition for traveling border signal */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <linearGradient id="valueBorderSignal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4B26B" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D4B26B" stopOpacity="1" />
            <stop offset="100%" stopColor="#3C2B99" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
      {/* Page Header */}
      <section className="py-14 md:py-20 border-b border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            {/* 1. About Label: subtle, clean, minimal entrance */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3C2B99]/8 border border-[#D4B26B]/50 text-[#3C2B99] text-xs font-bold uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4B26B]" />
                <span>About RUDRAKSHA INFOTEK</span>
              </motion.div>
            </div>

            {/* 2. Main Heading: Unique "Typography Light Sweep" Animation */}
            <div ref={headingSweepRef} className="relative pt-1 pb-3" style={{ transform: 'none' }}>
              <h1
                aria-label="We Turn Ideas Into Digital Experiences"
                className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.2] sm:leading-[1.18] pt-1 pb-2 px-0.5 select-text"
                style={{ transform: 'none' }}
              >
                {/* Line 1: We Turn Ideas Into */}
                <span className="inline-block" style={{ transform: 'none' }}>
                  {headingWordsLine1.map((word, wIdx) => {
                    const wordOffset = headingWordsLine1.slice(0, wIdx).join('').length;
                    return (
                      <span
                        key={`w1-${wIdx}`}
                        className="inline-block mr-[0.28em] last:mr-0 whitespace-nowrap"
                        style={{ transform: 'none' }}
                      >
                        {word.split('').map((char, cIdx) => (
                          <LightSweepChar
                            key={`c1-${cIdx}`}
                            char={char}
                            globalIdx={wordOffset + cIdx}
                            sweepActive={sweepActive}
                            isIndigoLine={false}
                          />
                        ))}
                      </span>
                    );
                  })}
                </span>

                <br className="hidden sm:inline" />{' '}

                {/* Line 2: Digital Experiences */}
                <span className="text-[#3C2B99] inline-block" style={{ transform: 'none' }}>
                  {headingWordsLine2.map((word, wIdx) => {
                    const prevCharsCount =
                      headingWordsLine1.join('').length +
                      headingWordsLine2.slice(0, wIdx).join('').length;
                    return (
                      <span
                        key={`w2-${wIdx}`}
                        className="inline-block mr-[0.28em] last:mr-0 whitespace-nowrap"
                        style={{ transform: 'none' }}
                      >
                        {word.split('').map((char, cIdx) => (
                          <LightSweepChar
                            key={`c2-${cIdx}`}
                            char={char}
                            globalIdx={prevCharsCount + cIdx}
                            sweepActive={sweepActive}
                            isIndigoLine={true}
                          />
                        ))}
                      </span>
                    );
                  })}
                </span>
              </h1>
            </div>

            {/* Step 2: Paragraph Reveal (Starts at ~65% of heading animation timeline, revealing smoothly over 1.75s with subtle upward reveal) */}
            <div className="relative pl-4 border-l-2 border-zinc-200/60 pt-0.5 pb-1 mt-1">
              {/* Traveling Indigo connector signal along the border */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: paragraphStarted ? 1 : 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-[-2px] bottom-0 w-[2px] bg-gradient-to-b from-[#3C2B99] via-[#3C2B99] to-[#D4B26B] origin-top"
                aria-hidden="true"
              />

              {/* Paragraph: Smooth opacity + subtle upward reveal */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={paragraphStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={() => {
                  if (paragraphStarted) {
                    setParagraphLocked(true);
                  }
                }}
                className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal"
                style={paragraphLocked ? { transform: 'none', opacity: 1 } : undefined}
              >
                {COMPANY_INFO.aboutStory}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Story & Founder Feature */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Founder Profile Box */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ y: [10, 0] }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="overflow-hidden rounded-3xl border border-zinc-200 hover:border-[#D4B26B] bg-white p-3 shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={COMPANY_INFO.ceoImage}
                  alt={`${COMPANY_INFO.founder} - ${COMPANY_INFO.role}, ${COMPANY_INFO.name}`}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = '/images/ceo.png';
                  }}
                  className="w-full h-80 sm:h-96 md:h-[420px] object-cover object-[center_10%] rounded-2xl transition-transform duration-500"
                />
              </div>

              <div className="bg-white border border-zinc-200 hover:border-[#D4B26B] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3C2B99]/8 text-[#3C2B99] text-[11px] font-bold uppercase tracking-wider border border-[#D4B26B]/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B26B]" />
                  <span>{COMPANY_INFO.ceoTitle}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#3C2B99] border border-[#D4B26B]/60 text-white flex items-center justify-center font-mono font-bold text-xl shadow-xs shrink-0">
                    HT
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-950">
                      {COMPANY_INFO.founder}
                    </h2>
                    <p className="text-xs font-bold text-[#3C2B99] uppercase tracking-wider">
                      {COMPANY_INFO.role}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      RUDRAKSHA INFOTEK
                    </p>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4 space-y-3 font-normal">
                  {COMPANY_INFO.ceoBio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Global Reach:</span>
                  <span className="font-semibold text-[#3C2B99]">{COMPANY_INFO.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Narrative & Philosophy */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ y: [10, 0] }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-4">
                  Tailored Digital Solutions for Modern Brands
                </h2>
                <div className="w-14 h-1 bg-[#D4B26B] rounded-full mb-5" />
                <div className="space-y-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
                  <p>
                    {COMPANY_INFO.aboutDetail}
                  </p>
                  <p>
                    In a crowded digital landscape, generic templates and robotic marketing are simply ignored. We cut through the noise by synthesizing clean software architecture, compelling visual branding, and measurable social media strategy.
                  </p>
                </div>
              </div>

              {/* Philosophy Card (Rich Indigo accent with Gold details) */}
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="bg-[#3C2B99] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl border border-[#D4B26B]/30"
              >
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#D4B26B]/15 rounded-full blur-2xl" />
                <Quote className="w-10 h-10 text-[#D4B26B] mb-3 opacity-80" />
                <p className="text-lg sm:text-xl text-indigo-50 italic font-medium leading-relaxed mb-6">
                  &ldquo;{COMPANY_INFO.aboutPhilosophy}&rdquo;
                </p>
                <div className="pt-4 border-t border-[#D4B26B]/30 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    — {COMPANY_INFO.founder}, {COMPANY_INFO.role}
                  </span>
                  <span className="text-xs text-[#D4B26B] font-semibold">Core Agency Philosophy</span>
                </div>
              </motion.div>

              {/* Agency Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
                  className="p-5 rounded-2xl border border-zinc-200 bg-white hover:border-[#D4B26B] hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#3C2B99]/10 border border-[#D4B26B]/40 text-[#3C2B99] flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#D4B26B]" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-950">Direct Oversight</h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    No middlemen or junior outsources. Every milestone is curated and approved directly by Het Tailor.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
                  className="p-5 rounded-2xl border border-zinc-200 bg-white hover:border-[#D4B26B] hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#3C2B99]/10 border border-[#D4B26B]/40 text-[#3C2B99] flex items-center justify-center">
                      <Award className="w-4 h-4 text-[#D4B26B]" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-950">High-Impact Precision</h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Polished aesthetic that puts your company&apos;s value propositions and products front-and-center.
                  </p>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5">
                <Link
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#3C2B99] hover:bg-[#D4B26B] text-white text-sm font-semibold border border-[#D4B26B]/50 hover:border-[#D4B26B] transition-colors duration-250 ease-out shadow-sm hover:shadow-lg hover:shadow-[#D4B26B]/25 cursor-pointer group"
                >
                  <span>Explore Our Core Services</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5] text-white transition-transform duration-250 ease-out group-hover:translate-x-1" />
                </Link>
                <Link
                  id="about-speak-het-tailor-btn"
                  to="/contact"
                  className="btn-white-on-indigo w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border text-sm font-semibold cursor-pointer group"
                >
                  <span>Speak With Het Tailor</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-white border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ y: [8, 0] }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-3xl mb-14 space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C2B99]/8 border border-[#D4B26B]/50 text-[#3C2B99] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B26B]" />
              <span>Guiding Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              How We Work & What We Value
            </h2>
            <div className="w-16 h-1 bg-[#D4B26B] rounded-full" />
            <p className="text-zinc-600 text-base sm:text-lg">
              Every project undertaken at RUDRAKSHA INFOTEK is governed by these uncompromising standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ y: [10, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.04, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredValue(0)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`p-7 rounded-2xl bg-[#FAFAFA] border transition-all duration-300 cursor-default relative ${
                hoveredValue === 0
                  ? 'border-[#3C2B99] ring-2 ring-[#D4B26B]/50 shadow-xl shadow-[#3C2B99]/12'
                  : 'border-zinc-200 hover:border-[#D4B26B] hover:shadow-lg'
              }`}
            >
              {/* Traveling Indigo/Gold border signal when active */}
              <svg className={`absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-20 transition-opacity duration-300 ${hoveredValue === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="15"
                  fill="none"
                  stroke="url(#valueBorderSignal)"
                  strokeWidth="2.5"
                  pathLength="100"
                  strokeDasharray="25 75"
                  className="animate-seamless-border"
                />
              </svg>
              <motion.div
                animate={hoveredValue === 0 ? { y: -3, scale: 1.05 } : { y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-12 h-12 rounded-xl bg-[#3C2B99]/10 border border-[#D4B26B]/40 text-[#3C2B99] flex items-center justify-center mb-5"
              >
                <Compass className="w-6 h-6 text-[#3C2B99]" />
              </motion.div>
              <h3 className={`text-lg font-bold transition-colors ${hoveredValue === 0 ? 'text-[#3C2B99]' : 'text-zinc-950'}`}>Purposeful Simplicity</h3>
              <p className="text-sm text-zinc-600 mt-2.5 leading-relaxed">
                We strip away visual clutter and cognitive friction. The best digital design feels effortless and lets your value shine.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ y: [10, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredValue(1)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`p-7 rounded-2xl bg-[#FAFAFA] border transition-all duration-300 cursor-default relative ${
                hoveredValue === 1
                  ? 'border-[#3C2B99] ring-2 ring-[#D4B26B]/50 shadow-xl shadow-[#3C2B99]/12'
                  : 'border-zinc-200 hover:border-[#D4B26B] hover:shadow-lg'
              }`}
            >
              <svg className={`absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-20 transition-opacity duration-300 ${hoveredValue === 1 ? 'opacity-100' : 'opacity-0'}`}>
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="15"
                  fill="none"
                  stroke="url(#valueBorderSignal)"
                  strokeWidth="2.5"
                  pathLength="100"
                  strokeDasharray="25 75"
                  className="animate-seamless-border"
                />
              </svg>
              <motion.div
                animate={hoveredValue === 1 ? { y: -3, scale: 1.05 } : { y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-12 h-12 rounded-xl bg-[#3C2B99]/10 border border-[#D4B26B]/40 text-[#3C2B99] flex items-center justify-center mb-5"
              >
                <Cpu className="w-6 h-6 text-[#3C2B99]" />
              </motion.div>
              <h3 className={`text-lg font-bold transition-colors ${hoveredValue === 1 ? 'text-[#3C2B99]' : 'text-zinc-950'}`}>Technical Rigor</h3>
              <p className="text-sm text-zinc-600 mt-2.5 leading-relaxed">
                Whether it's semantic markup, sub-second load times, or print vector specs, our deliverables are engineered to production standard.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ y: [10, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredValue(2)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`p-7 rounded-2xl bg-[#FAFAFA] border transition-all duration-300 cursor-default relative ${
                hoveredValue === 2
                  ? 'border-[#3C2B99] ring-2 ring-[#D4B26B]/50 shadow-xl shadow-[#3C2B99]/12'
                  : 'border-zinc-200 hover:border-[#D4B26B] hover:shadow-lg'
              }`}
            >
              <svg className={`absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-20 transition-opacity duration-300 ${hoveredValue === 2 ? 'opacity-100' : 'opacity-0'}`}>
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="15"
                  fill="none"
                  stroke="url(#valueBorderSignal)"
                  strokeWidth="2.5"
                  pathLength="100"
                  strokeDasharray="25 75"
                  className="animate-seamless-border"
                />
              </svg>
              <motion.div
                animate={hoveredValue === 2 ? { y: -3, scale: 1.05 } : { y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-12 h-12 rounded-xl bg-[#3C2B99]/10 border border-[#D4B26B]/40 text-[#3C2B99] flex items-center justify-center mb-5"
              >
                <HeartHandshake className="w-6 h-6 text-[#3C2B99]" />
              </motion.div>
              <h3 className={`text-lg font-bold transition-colors ${hoveredValue === 2 ? 'text-[#3C2B99]' : 'text-zinc-950'}`}>Honest Partnership</h3>
              <p className="text-sm text-zinc-600 mt-2.5 leading-relaxed">
                We tell you what will genuinely help your business grow, rather than upselling unnecessary fluff. Your ROI is our scorecard.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
