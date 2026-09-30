import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  Code2,
  RefreshCw,
  Rocket,
  Search,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/siteData';
import {
  ProcessInitBadge,
  ProcessInitCenterSignal,
  ProcessInitHeading,
  ProcessInitUnderline,
  ProcessInitDescription,
  ProcessInitCtaButton,
} from '../components/CtaAnimationSystem';

export const ProcessPage: React.FC = () => {
  const ctaRef = useRef<HTMLElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.25 });

  // Process journey sequence: 01 -> 02 -> 03 -> 04 -> 05
  const processStepsRef = useRef<HTMLElement>(null);
  const isProcessInView = useInView(processStepsRef, { once: true, amount: 0.1 });
  const [activeStepJourney, setActiveStepJourney] = React.useState<number>(0);
  const [illuminatedStep, setIlluminatedStep] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!isProcessInView) return;
    const timers = [
      // 01 activates first
      setTimeout(() => {
        setActiveStepJourney(1);
        setIlluminatedStep(1);
      }, 250),
      setTimeout(() => setIlluminatedStep(null), 750),

      // Signal travels to 02
      setTimeout(() => {
        setActiveStepJourney(2);
        setIlluminatedStep(2);
      }, 1250),
      setTimeout(() => setIlluminatedStep(null), 1750),

      // Signal travels to 03
      setTimeout(() => {
        setActiveStepJourney(3);
        setIlluminatedStep(3);
      }, 2250),
      setTimeout(() => setIlluminatedStep(null), 2750),

      // Signal travels to 04
      setTimeout(() => {
        setActiveStepJourney(4);
        setIlluminatedStep(4);
      }, 3250),
      setTimeout(() => setIlluminatedStep(null), 3750),

      // Signal travels to 05
      setTimeout(() => {
        setActiveStepJourney(5);
        setIlluminatedStep(5);
      }, 4250),
      setTimeout(() => setIlluminatedStep(null), 4750),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isProcessInView]);

  const stepIcons = [
    <Search className="w-5 h-5 text-[#3C2B99]" key="0" />,
    <FileCheck className="w-5 h-5 text-[#3C2B99]" key="1" />,
    <Code2 className="w-5 h-5 text-[#3C2B99]" key="2" />,
    <RefreshCw className="w-5 h-5 text-[#3C2B99]" key="3" />,
    <Rocket className="w-5 h-5 text-[#3C2B99]" key="4" />,
  ];

  return (
    <div className="pt-20 pb-20 bg-[#FAFAFA]">
      {/* Page Header */}
      <section className="py-14 md:py-20 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3C2B99]/8 border border-[#D4B26B]/50 text-[#3C2B99] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4B26B]" />
              <span>Proven Methodology</span>
            </div>
            {/* Heading with Process Initialization: clearly visible, premium Indigo signal passing through both lines */}
            <div className="relative py-2 -my-2 overflow-hidden" style={{ transform: 'none' }}>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.18] sm:leading-[1.15] pt-1 pb-4 px-1 relative z-10 select-text"
                style={{ transform: 'none' }}
              >
                {/* Line 1: A Transparent Process for */}
                <span className="relative inline-block" style={{ transform: 'none' }}>
                  <motion.span
                    initial={{ backgroundPosition: '100% 0' }}
                    animate={{ backgroundPosition: '0% 0' }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                    style={{
                      backgroundImage:
                        'linear-gradient(90deg, #09090b 0%, #09090b 35%, #6352EA 48%, #A594FD 52%, #3C2B99 56%, #09090b 65%, #09090b 100%)',
                      backgroundSize: '280% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      transform: 'none',
                    }}
                  >
                    A Transparent Process for
                  </motion.span>

                  {/* Luminous traveling ambient signal bar across Line 1 */}
                  <motion.span
                    initial={{ left: '-30%', opacity: 0 }}
                    animate={{ left: '115%', opacity: [0, 0.85, 0.85, 0] }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -inset-y-1 w-32 bg-gradient-to-r from-transparent via-[#6352EA]/20 via-[#D4B26B]/25 to-transparent pointer-events-none z-20 blur-[6px]"
                    aria-hidden="true"
                    style={{ transform: 'none' }}
                  />
                </span>{' '}
                <br />

                {/* Line 2: Exceptional Results */}
                <span className="relative inline-block" style={{ transform: 'none' }}>
                  <motion.span
                    initial={{ backgroundPosition: '100% 0' }}
                    animate={{ backgroundPosition: '0% 0' }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                    style={{
                      backgroundImage:
                        'linear-gradient(90deg, #3C2B99 0%, #3C2B99 35%, #6352EA 46%, #C4B5FD 52%, #D4B26B 56%, #3C2B99 65%, #3C2B99 100%)',
                      backgroundSize: '280% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      transform: 'none',
                    }}
                  >
                    Exceptional Results
                  </motion.span>

                  {/* Luminous traveling ambient signal bar across Line 2 */}
                  <motion.span
                    initial={{ left: '-30%', opacity: 0 }}
                    animate={{ left: '115%', opacity: [0, 0.85, 0.85, 0] }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -inset-y-1 w-32 bg-gradient-to-r from-transparent via-[#6352EA]/25 via-[#D4B26B]/30 to-transparent pointer-events-none z-20 blur-[6px]"
                    aria-hidden="true"
                    style={{ transform: 'none' }}
                  />
                </span>
              </motion.h1>

              {/* Subtle accent line initializing outward from center */}
              <div className="relative h-[2px] w-40 bg-zinc-100 rounded-full overflow-hidden mt-1 mb-2">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'center' }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#3C2B99] to-transparent rounded-full"
                />
              </div>
            </div>
            <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal">
              At RUDRAKSHA INFOTEK, we eliminate ambiguity with an organized delivery roadmap. You always know exactly what is happening, why, and when.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sequential Phase Deep Dive */}
      <section ref={processStepsRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {PROCESS_STEPS.map((step, idx) => {
            const stepNum = idx + 1;
            const isIlluminated = illuminatedStep === stepNum;
            const hasActivated = activeStepJourney >= stepNum;

            return (
              <React.Fragment key={step.number}>
                <div
                  id={`step-${step.number}`}
                  className={`relative p-8 sm:p-10 rounded-3xl border bg-white transition-all duration-350 cursor-default overflow-hidden ${
                    hasActivated
                      ? 'border-[#3C2B99] shadow-lg shadow-[#3C2B99]/8 ring-1 ring-[#D4B26B]/40'
                      : 'border-zinc-200 shadow-2xs hover:border-[#D4B26B]'
                  }`}
                >
                  {/* Brief illumination aura upon step activation */}
                  {isIlluminated && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.55, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-3xl ring-2 ring-[#3C2B99] shadow-[0_0_24px_rgba(60,43,153,0.35)] pointer-events-none z-20"
                    />
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                    <div className="lg:col-span-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-lg font-black w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-2xs ${
                            hasActivated
                              ? 'bg-[#3C2B99] text-white border-[#D4B26B]'
                              : 'bg-[#3C2B99]/8 text-[#3C2B99] border-[#D4B26B]/50'
                          }`}
                        >
                          {step.number}
                        </span>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4B26B] block">
                            Phase {step.number} of 05
                          </span>
                          <h2 className="text-2xl font-bold text-zinc-950">
                            {step.title}
                          </h2>
                        </div>
                      </div>
                      <p className="text-zinc-600 text-sm sm:text-base leading-relaxed pt-2">
                        {step.description}
                      </p>
                    </div>

                    <div className="lg:col-span-8 bg-[#FAFAFA] rounded-2xl p-6 border border-zinc-200/80">
                      <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-900 mb-4 flex items-center gap-2">
                        {stepIcons[idx]}
                        <span>Deliverables & Milestones in this Phase</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {step.details.map((detail) => (
                          <div
                            key={detail}
                            className="bg-white p-3.5 rounded-xl border border-zinc-200/70 text-xs font-medium text-zinc-800 flex items-start gap-2.5 shadow-2xs hover:border-[#D4B26B] hover:bg-[#3C2B99]/5 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#3C2B99] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-xs text-zinc-500">
                        <span>Direct Founder Signoff by Het Tailor</span>
                        <span className="font-semibold text-[#3C2B99] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4B26B]" />
                          100% Quality Checked
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thin Indigo/Gold connection line with traveling signal to next step */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="flex justify-center -my-4 relative z-20 pointer-events-none" aria-hidden="true">
                    <div className="w-[2px] h-8 bg-zinc-200/80 rounded-full relative overflow-hidden">
                      <motion.div
                        animate={
                          activeStepJourney === stepNum
                            ? { y: ['-100%', '100%'], opacity: [0, 1, 0] }
                            : { y: '-100%', opacity: 0 }
                        }
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                        className="w-full h-full bg-gradient-to-b from-[#3C2B99] via-[#D4B26B] to-[#3C2B99]"
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Process Commitment Callout */}
      <section
        ref={ctaRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16"
      >
        <div className="bg-[#3C2B99] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl border border-[#D4B26B]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4B26B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* 2 & 3. SECTION ENTER: Center Gold signal expanding horizontally to both sides */}
          <ProcessInitCenterSignal isActive={isCtaInView} />

          <div className="relative z-10">
            {/* 1. BADGE: Structured Execution activates first */}
            <div className="mb-2">
              <ProcessInitBadge text="Structured Execution" isActive={isCtaInView} />
            </div>

            {/* 4. HEADING: Assembles from the center outward */}
            <ProcessInitHeading
              text="Ready to Begin Phase 01 (Discovery)?"
              isActive={isCtaInView}
              className="text-2xl sm:text-4xl font-extrabold text-white"
            />

            {/* 5. GOLD UNDERLINE: Draws outward from the center */}
            <ProcessInitUnderline isActive={isCtaInView} className="my-4" />

            {/* 6. DESCRIPTION: Activates after the heading */}
            <ProcessInitDescription isActive={isCtaInView} className="max-w-xl mx-auto">
              <p className="text-indigo-100 text-sm sm:text-base">
                Tell us about your business goals and growth targets. Het Tailor will personally review your requirements and prepare a tailored strategy proposal.
              </p>
            </ProcessInitDescription>

            {/* 7 & 8. CTA BUTTON: Activates with subtle circular/edge signal + arrow moves slightly forward once */}
            <div className="mt-8 flex justify-center">
              <ProcessInitCtaButton
                id="process-discovery-cta-btn"
                to="/contact"
                text="Schedule Discovery Consultation"
                isActive={isCtaInView}
                className="btn-white-on-indigo"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
