import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { Sparkles, ArrowRight, Users, Briefcase, TrendingUp, Star } from 'lucide-react';

interface StatItem {
  id: string;
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  isFilledStar?: boolean;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'stat-1',
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Happy Clients',
  },
  {
    id: 'stat-2',
    icon: Briefcase,
    value: 120,
    suffix: '+',
    label: 'Projects Done',
  },
  {
    id: 'stat-3',
    icon: TrendingUp,
    value: 95,
    suffix: '%',
    label: 'Success Rate',
  },
  {
    id: 'stat-4',
    icon: Star,
    value: 2,
    suffix: '+',
    label: 'Years Experience',
    isFilledStar: true,
  },
];

const AnimatedCounter: React.FC<{
  target: number;
  suffix: string;
  isActive: boolean;
  duration?: number;
}> = ({ target, suffix, isActive, duration = 0.55 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeOutCubic curve for organic deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeProgress * target);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive, target, duration]);

  return (
    <span className="tabular-nums">
      {isActive ? displayValue : 0}
      {suffix}
    </span>
  );
};

export const ResultsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // Replay behavior: Only once per page load when entering viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  // Progressive activation states for the 4 stats (0 = none, 1 = stat1, 2 = stat2, etc.)
  const [activeStep, setActiveStep] = useState<number>(0);
  const [ctaSweep, setCtaSweep] = useState<boolean>(false);

  useEffect(() => {
    if (!isInView) return;

    // Timeline: 1.5 - 1.8s total sequence
    // 0.2s -> Stat 1
    // 0.5s -> Stat 2
    // 0.8s -> Stat 3
    // 1.1s -> Stat 4
    // 1.45s -> CTA sweep
    const timers = [
      setTimeout(() => setActiveStep(1), 200),
      setTimeout(() => setActiveStep(2), 500),
      setTimeout(() => setActiveStep(3), 800),
      setTimeout(() => setActiveStep(4), 1100),
      setTimeout(() => setCtaSweep(true), 1450),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        animate={
          isInView
            ? {
                borderColor: [
                  'rgba(212,178,107,0.3)',
                  'rgba(212,178,107,0.65)',
                  'rgba(212,178,107,0.3)',
                ],
              }
            : {}
        }
        transition={{ duration: 1.2, delay: 0.1, ease: 'easeInOut' }}
        className="relative overflow-hidden rounded-3xl bg-[#3C2B99] text-white px-8 py-12 lg:px-14 lg:py-16 shadow-2xl border border-[#D4B26B]/30"
      >
        {/* Ambient subtle light circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4B26B]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#2a1e6d] blur-2xl pointer-events-none" />

        {/* 1. SECTION ACTIVATION: Subtle moving light/shimmer sweep across the Indigo background */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={isInView ? { x: '250%', opacity: [0, 0.22, 0] } : {}}
          transition={{ duration: 1.3, delay: 0.1, ease: 'easeInOut' }}
          className="absolute inset-y-0 w-3/4 pointer-events-none z-0 bg-gradient-to-r from-transparent via-[#D4B26B]/30 to-transparent skew-x-[-20deg]"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left side text & CTA */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D4B26B]/50 text-[#D4B26B] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Performance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Results That Speak <br className="hidden sm:inline" />
              for Themselves
            </h2>
            <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed">
              We don't just promise results, we deliver measurable growth that accelerates your brand's bottom line.
            </p>

            {/* 6. CTA with highlight sweep after stats finish */}
            <div className="pt-2">
              <Link
                id="results-case-studies-btn"
                to="/portfolio"
                className="btn-white-on-indigo relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-bold shadow-md cursor-pointer group"
              >
                <span>View Case Studies</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-250 ease-out group-hover:translate-x-1" />

                {/* Subtle highlight sweep across CTA button */}
                {ctaSweep && (
                  <motion.span
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '200%', opacity: [0, 0.65, 0] }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
                  />
                )}
              </Link>
            </div>
          </div>

          {/* Right side 4 stat metrics with Connecting Energy Line */}
          <div className="lg:col-span-7 relative">
            {/* 4. CONNECTING ENERGY LINE: Very thin line drawing from left to right */}
            <div className="hidden sm:block absolute top-[20px] left-[6%] right-[6%] h-[2px] pointer-events-none z-0">
              {/* Subtle background guide track */}
              <div className="w-full h-full bg-[#D9D9D9]/20 rounded-full" />

              {/* Animated energy line */}
              <motion.div
                initial={{ width: '0%' }}
                animate={isInView ? { width: '100%' } : { width: '0%' }}
                transition={{ duration: 1.1, delay: 0.2, ease: 'easeInOut' }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D4B26B] via-[#D4B26B] to-[#D9D9D9] shadow-[0_0_8px_rgba(212,178,107,0.7)] rounded-full"
              />
            </div>

            {/* 2. & 5. STATISTICS & ICON ACTIVATION */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-4 relative z-10">
              {STATS_DATA.map((stat, index) => {
                const Icon = stat.icon;
                const isActivated = activeStep >= index + 1;
                const isJustActivated = activeStep === index + 1;

                return (
                  <div
                    key={stat.id}
                    className={`relative space-y-2 cursor-default transition-opacity duration-300 ${
                      isActivated ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    {/* Subtle glowing highlight around the icon/card when activating */}
                    {isJustActivated && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: [0, 0.85, 0], scale: [0.95, 1.05, 1.1] }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute -inset-2 rounded-2xl bg-[#D4B26B]/25 pointer-events-none blur-xs"
                      />
                    )}

                    {/* Icon container with subtle pulse/glow on activation */}
                    <div className="relative inline-block">
                      <motion.div
                        animate={
                          isJustActivated
                            ? {
                                scale: [1, 1.08, 1],
                                borderColor: [
                                  'rgba(212,178,107,0.5)',
                                  '#D4B26B',
                                  'rgba(212,178,107,0.5)',
                                ],
                              }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="relative z-10 w-10 h-10 rounded-full bg-[#3C2B99] sm:bg-white/10 border border-[#D4B26B]/50 flex items-center justify-center text-[#D4B26B] shadow-sm backdrop-blur-xs"
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            stat.isFilledStar ? 'fill-[#D4B26B] text-[#D4B26B]' : ''
                          }`}
                        />
                      </motion.div>

                      {/* Expanding subtle pulse glow ring */}
                      {isJustActivated && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0.8 }}
                          animate={{ scale: 1.45, opacity: 0 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-full border border-[#D4B26B] shadow-[0_0_10px_rgba(212,178,107,0.5)] pointer-events-none"
                        />
                      )}
                    </div>

                    {/* 3. NUMBER ANIMATION: Smooth count-up */}
                    <div className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        isActive={isActivated}
                        duration={0.55}
                      />
                    </div>

                    {/* Stat Label */}
                    <div className="text-xs sm:text-sm text-indigo-100/80 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
