import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

/* =========================================================================
   1. SECTION ENTER — "CINEMATIC WIPE REVEAL"
   A thin Gold #D4B26B scanning line travels left-to-right over a darkened
   overlay, revealing the vibrant Indigo section underneath.
   ========================================================================= */
export const CtaScanningWipe: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <>
      {/* Subtle darkened cover layer that wipes away */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 0 0)' }}
        animate={isActive ? { clipPath: 'inset(0 0 0 100%)' } : { clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#1e1452]/75 pointer-events-none z-20"
      />

      {/* Thin Gold #D4B26B Scanning Line */}
      <motion.div
        initial={{ left: '-5%', opacity: 0 }}
        animate={
          isActive
            ? {
                left: ['0%', '102%'],
                opacity: [0, 1, 1, 0],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 1.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-transparent via-[#D4B26B] to-transparent shadow-[0_0_18px_#D4B26B] pointer-events-none z-30"
      />
    </>
  );
};

/* =========================================================================
   2. BADGE / LABEL INITIALIZATION
   Gold dot appears, expands/contracts, border draws, text reveals with
   subtle Gold glow.
   ========================================================================= */
export const InitializedBadge: React.FC<{
  text: string;
  isActive: boolean;
}> = ({ text, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        isActive
          ? {
              opacity: 1,
              boxShadow: [
                '0 0 0px rgba(212,178,107,0)',
                '0 0 18px rgba(212,178,107,0.55)',
                '0 0 0px rgba(212,178,107,0)',
              ],
            }
          : { opacity: 0 }
      }
      transition={{ duration: 0.65, delay: 0.18, ease: 'easeOut' }}
      className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4B26B]/50 text-[#D4B26B] text-xs font-bold uppercase tracking-wider relative overflow-hidden"
    >
      {/* Gold dot: appears first, expands and contracts */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [0, 1.5, 1], opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.22, ease: 'easeOut' }}
        className="w-1.5 h-1.5 rounded-full bg-[#D4B26B] shrink-0"
      />

      {/* Border unrolls around text */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.45, delay: 0.28, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full border border-[#D4B26B] origin-left pointer-events-none"
      />

      {/* Text reveals immediately after border completes */}
      <motion.span
        initial={{ opacity: 0, x: -4 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.42, ease: 'easeOut' }}
        className="relative z-10"
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

/* =========================================================================
   3. HEADING — CUSTOM MASKED WORD-BY-WORD ASSEMBLE
   Reveals from left-to-right behind vertical masks with 35ms word stagger.
   ========================================================================= */
export const AssembledHeading: React.FC<{
  text: string;
  isActive: boolean;
  className?: string;
}> = ({ text, isActive, className = '' }) => {
  const words = text.split(' ');
  const [effectiveActive, setEffectiveActive] = useState(false);

  useEffect(() => {
    if (isActive) setEffectiveActive(true);
  }, [isActive]);

  useEffect(() => {
    const fallback = setTimeout(() => setEffectiveActive(true), 1200);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <h2 className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.26em] align-top">
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={
              effectiveActive
                ? { y: '0%', opacity: 1 }
                : { y: '110%', opacity: 0 }
            }
            transition={{
              duration: 0.5,
              delay: 0.32 + i * 0.038,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};

/* =========================================================================
   4. GOLD UNDERLINE — DRAW ANIMATION
   Draws smoothly from center outward, brightening then settling into #D4B26B.
   ========================================================================= */
export const DrawnGoldLine: React.FC<{
  isActive: boolean;
  className?: string;
}> = ({ isActive, className = '' }) => {
  return (
    <div className={`overflow-hidden h-1 flex items-center justify-center ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isActive
            ? {
                scaleX: 1,
                opacity: 1,
                boxShadow: [
                  '0 0 0px #D4B26B',
                  '0 0 14px #D4B26B',
                  '0 0 0px #D4B26B',
                ],
              }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.55, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-1 bg-[#D4B26B] rounded-full origin-center"
      />
    </div>
  );
};

/* =========================================================================
   5. DESCRIPTION — SIGNAL REVEAL
   Text sharpens from soft blur while a subtle horizontal highlight sweeps.
   ========================================================================= */
export const SignalDescription: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}> = ({ children, isActive, className = '' }) => {
  const [effectiveActive, setEffectiveActive] = useState(false);

  useEffect(() => {
    if (isActive) setEffectiveActive(true);
  }, [isActive]);

  useEffect(() => {
    const fallback = setTimeout(() => setEffectiveActive(true), 1200);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ filter: 'blur(3px)', opacity: 0.35 }}
        animate={
          effectiveActive
            ? { filter: 'blur(0px)', opacity: 1 }
            : { filter: 'blur(3px)', opacity: 0.35 }
        }
        transition={{ duration: 0.65, delay: 0.72, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {/* Gentle horizontal signal highlight */}
      {effectiveActive && (
        <motion.div
          initial={{ left: '-100%', opacity: 0 }}
          animate={{ left: '200%', opacity: [0, 0.7, 0] }}
          transition={{ duration: 0.75, delay: 0.72, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4B26B]/30 to-transparent skew-x-[-20deg] pointer-events-none"
        />
      )}
    </div>
  );
};

/* =========================================================================
   6. CTA BUTTON — INTERACTIVE ACTIVATION & HOVER
   Activation edge highlight + forward arrow nudge.
   Hover: 2-3px lift, gold light sweep, arrow moves 4px right.
   ========================================================================= */
export const InteractiveCtaButton: React.FC<{
  to: string;
  text: string;
  isActive: boolean;
  id?: string;
  className?: string;
}> = ({ to, text, isActive, id, className = '' }) => {
  const [arrowNudge, setArrowNudge] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      setArrowNudge(true);
      setTimeout(() => setArrowNudge(false), 320);
    }, 1150);
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="relative inline-block">
      <Link
        id={id}
        to={to}
        className={`relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 rounded-full border text-sm font-bold shadow-lg hover:shadow-2xl transition-all duration-250 ease-out hover:-translate-y-0.5 cursor-pointer group ${className}`}
      >
        <span>{text}</span>
        <motion.span
          animate={arrowNudge ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="inline-flex transition-transform duration-250 ease-out group-hover:translate-x-1"
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </motion.span>

        {/* Section activation highlight sweep */}
        {isActive && (
          <motion.span
            initial={{ left: '-100%', opacity: 0 }}
            animate={{ left: '200%', opacity: [0, 0.75, 0] }}
            transition={{ duration: 0.75, delay: 1.05, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#D4B26B]/50 to-transparent skew-x-[-20deg]"
          />
        )}

        {/* Hover gold light sweep */}
        <span
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-650 ease-out skew-x-[-20deg]"
        />
      </Link>
    </div>
  );
};

/* =========================================================================
   7 & 8. CURSOR-AWARE CARD WITH SEQUENTIAL SYSTEM ACTIVATION
   Sequential border/light activation, cursor radial spotlight, subtle tilt,
   top-edge traveling light, and content stagger.
   ========================================================================= */
export const CursorAwareCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  isFeatured?: boolean;
  activationDelay?: number;
  isActiveSection?: boolean;
}> = ({
  children,
  className = '',
  isFeatured = false,
  activationDelay = 0,
  isActiveSection = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate subtle tilt (0.5 - 0.8 degrees max) & 2-3px offset
    const xPct = x / rect.width - 0.5; // -0.5 to 0.5
    const yPct = y / rect.height - 0.5;
    setTilt({
      x: -yPct * 1.5, // max ~0.75 deg
      y: xPct * 1.5,  // max ~0.75 deg
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 8 }}
      animate={
        isActiveSection
          ? {
              opacity: 1,
              y: 0,
              boxShadow: isFeatured
                ? [
                    '0 4px 6px rgba(0,0,0,0.1)',
                    '0 14px 34px rgba(212,178,107,0.45)',
                    '0 4px 14px rgba(0,0,0,0.1)',
                  ]
                : [
                    '0 4px 6px rgba(0,0,0,0.1)',
                    '0 8px 24px rgba(212,178,107,0.25)',
                    '0 4px 6px rgba(0,0,0,0.1)',
                  ],
            }
          : { opacity: 0, y: 8 }
      }
      transition={{ duration: 0.45, delay: activationDelay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2.5px)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* 7. Tiny light line travels across the top edge on activation */}
      {isActiveSection && (
        <motion.div
          initial={{ left: '-30%', width: '0%', opacity: 0 }}
          animate={{
            left: ['-10%', '110%'],
            width: ['0%', '40%', '0%'],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 0.75, delay: activationDelay + 0.12, ease: 'easeInOut' }}
          className="absolute top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4B26B] to-transparent pointer-events-none z-30"
        />
      )}

      {/* Traveling edge signal across card body on activation */}
      {isActiveSection && (
        <motion.div
          initial={{ left: '-100%', opacity: 0 }}
          animate={{ left: '200%', opacity: [0, 0.75, 0] }}
          transition={{ duration: 0.65, delay: activationDelay + 0.1, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#D4B26B]/30 to-transparent skew-x-[-20deg] z-20"
        />
      )}

      {/* 8. Developer-style cursor-aware radial highlight (low-opacity gold or white) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isFeatured
            ? `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 70%)`
            : `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,178,107,0.22), transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {children}
      </div>
    </motion.div>
  );
};

/* Staggered card content helper */
export const CardStaggerItem: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  delay: number;
  className?: string;
}> = ({ children, isActive, delay, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* =========================================================================
   SECTION 1 — "FOCUS LOCK" ANIMATION SYSTEM
   Used for: "Have a Specific Vision in Mind?" on PortfolioPage
   Personality: Cinematic digital optical focus locking onto a specific idea.
   Sequence:
   1. Section activates with subtle light sweep + corner focus reticles
   2. "LET'S BUILD TOGETHER" badge appears first
   3. Heading revealed as digital focus locks onto text (optical lens pull)
   4. Gold underline draws from left to right with leading point
   5. Description reveals through subtle horizontal signal
   6. CTA button activates last with thin light travelling around its edge
   7. Arrow makes one small forward movement
   ========================================================================= */

export const FocusLockLightSweep: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <>
      {/* 1. Subtle light sweep across section */}
      <motion.div
        initial={{ left: '-60%', opacity: 0 }}
        animate={
          isActive
            ? {
                left: ['-60%', '160%'],
                opacity: [0, 0.45, 0.45, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#D4B26B]/25 to-transparent skew-x-[-22deg] pointer-events-none z-20"
      />

      {/* Focus lock corner reticles */}
      <div className="absolute inset-4 sm:inset-6 pointer-events-none z-10">
        <motion.span
          initial={{ opacity: 0, x: -6, y: -6 }}
          animate={isActive ? { opacity: [0, 0.8, 0.4], x: 0, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4B26B]/60"
        />
        <motion.span
          initial={{ opacity: 0, x: 6, y: -6 }}
          animate={isActive ? { opacity: [0, 0.8, 0.4], x: 0, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4B26B]/60"
        />
        <motion.span
          initial={{ opacity: 0, x: -6, y: 6 }}
          animate={isActive ? { opacity: [0, 0.8, 0.4], x: 0, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4B26B]/60"
        />
        <motion.span
          initial={{ opacity: 0, x: 6, y: 6 }}
          animate={isActive ? { opacity: [0, 0.8, 0.4], x: 0, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4B26B]/60"
        />
      </div>
    </>
  );
};

export const FocusLockBadge: React.FC<{ text: string; isActive: boolean }> = ({ text, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      animate={
        isActive
          ? {
              opacity: 1,
              filter: 'blur(0px)',
              boxShadow: [
                '0 0 0px rgba(212,178,107,0)',
                '0 0 16px rgba(212,178,107,0.7)',
                '0 0 0px rgba(212,178,107,0)',
              ],
            }
          : { opacity: 0, filter: 'blur(4px)' }
      }
      transition={{ duration: 0.4, delay: 0.12, ease: 'easeOut' }}
      className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4B26B]/50 text-[#D4B26B] text-xs font-bold uppercase tracking-wider relative overflow-hidden"
    >
      <motion.span
        initial={{ rotate: -90, opacity: 0 }}
        animate={isActive ? { rotate: 0, opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
        className="relative flex items-center justify-center w-2 h-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4B26B]" />
        <span className="absolute inset-[-2px] rounded-full border border-[#D4B26B]/80" />
      </motion.span>

      <span className="relative z-10 tracking-wider">
        {text}
      </span>
    </motion.div>
  );
};

export const FocusLockHeading: React.FC<{
  text: string;
  isActive: boolean;
  className?: string;
}> = ({ text, isActive, className = '' }) => {
  const words = text.split(' ');
  const [effectiveActive, setEffectiveActive] = useState(false);

  useEffect(() => {
    if (isActive) setEffectiveActive(true);
  }, [isActive]);

  useEffect(() => {
    const fallback = setTimeout(() => setEffectiveActive(true), 1200);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <h2 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{
            filter: 'blur(10px)',
            opacity: 0.1,
            letterSpacing: '0.04em',
          }}
          animate={
            effectiveActive
              ? {
                  filter: 'blur(0px)',
                  opacity: 1,
                  letterSpacing: '0em',
                }
              : {
                  filter: 'blur(10px)',
                  opacity: 0.1,
                  letterSpacing: '0.04em',
                }
          }
          transition={{
            duration: 0.45,
            delay: 0.3 + i * 0.055,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.26em]"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
};

export const FocusLockUnderline: React.FC<{
  isActive: boolean;
  className?: string;
}> = ({ isActive, className = '' }) => {
  return (
    <div className={`h-1 flex items-center justify-center ${className}`}>
      <div className="relative w-16 h-1">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            isActive
              ? {
                  scaleX: 1,
                  opacity: 1,
                  boxShadow: [
                    '0 0 0px #D4B26B',
                    '0 0 12px #D4B26B',
                    '0 0 0px #D4B26B',
                  ],
                }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 0.52, delay: 0.64, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="w-full h-full bg-[#D4B26B] rounded-full"
        />

        {isActive && (
          <motion.div
            initial={{ left: '0%', opacity: 0 }}
            animate={{
              left: ['0%', '100%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 0.52, delay: 0.64, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#D4B26B] pointer-events-none"
          />
        )}
      </div>
    </div>
  );
};

export const FocusLockDescription: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}> = ({ children, isActive, className = '' }) => {
  const [effectiveActive, setEffectiveActive] = useState(false);

  useEffect(() => {
    if (isActive) setEffectiveActive(true);
  }, [isActive]);

  useEffect(() => {
    const fallback = setTimeout(() => setEffectiveActive(true), 1200);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ filter: 'blur(4px)', opacity: 0.2 }}
        animate={
          effectiveActive
            ? { filter: 'blur(0px)', opacity: 1 }
            : { filter: 'blur(4px)', opacity: 0.2 }
        }
        transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {effectiveActive && (
        <motion.div
          initial={{ left: '-10%', width: '0%', opacity: 0 }}
          animate={{
            left: ['-5%', '105%'],
            width: ['0%', '30%', '0%'],
            opacity: [0, 0.7, 0],
          }}
          transition={{ duration: 0.75, delay: 0.8, ease: 'easeInOut' }}
          className="absolute inset-y-0 bg-gradient-to-r from-transparent via-[#D4B26B]/35 to-transparent pointer-events-none"
        />
      )}
    </div>
  );
};

export const FocusLockCtaButton: React.FC<{
  to: string;
  text: string;
  isActive: boolean;
  id?: string;
  className?: string;
}> = ({ to, text, isActive, id, className = '' }) => {
  const [arrowNudge, setArrowNudge] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      setArrowNudge(true);
      setTimeout(() => setArrowNudge(false), 300);
    }, 1650);
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="relative inline-block">
      <Link
        id={id}
        to={to}
        className={`relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 rounded-full border text-sm font-bold shadow-lg hover:shadow-2xl transition-all duration-250 ease-out hover:-translate-y-0.5 cursor-pointer group ${className}`}
      >
        <span className="relative z-10">{text}</span>
        <motion.span
          animate={arrowNudge ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative z-10 inline-flex transition-transform duration-250 ease-out group-hover:translate-x-1"
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </motion.span>

        {/* 6. Thin light traveling around button edge on activation */}
        {isActive && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-visible"
            style={{ width: '100%', height: '100%' }}
          >
            <motion.rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="999"
              fill="none"
              stroke="#D4B26B"
              strokeWidth="2"
              pathLength={100}
              strokeDasharray="22 78"
              initial={{ strokeDashoffset: 100, opacity: 0 }}
              animate={{
                strokeDashoffset: [100, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.75,
                delay: 1.02,
                ease: 'easeInOut',
              }}
              style={{
                filter: 'drop-shadow(0 0 4px #D4B26B)',
              }}
            />
          </svg>
        )}

        {/* Hover highlight sweep */}
        <span
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-650 ease-out skew-x-[-20deg]"
        />
      </Link>
    </div>
  );
};

/* =========================================================================
   SECTION 2 — "PROCESS INITIALIZATION" ANIMATION SYSTEM
   Used for: "Ready to Begin Phase 01 (Discovery)?" on ProcessPage
   Personality: Structured system execution boot sequence.
   Sequence:
   1. "STRUCTURED EXECUTION" badge activates first
   2. Subtle Gold signal starts from center of section
   3. Signal expands horizontally toward both sides
   4. Heading assembles from the center outward
   5. Gold underline draws outward from the center
   6. Description activates after the heading
   7. CTA button activates with subtle circular/edge signal
   8. Arrow moves slightly forward once
   ========================================================================= */

export const ProcessInitBadge: React.FC<{ text: string; isActive: boolean }> = ({ text, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        isActive
          ? {
              opacity: 1,
              borderColor: [
                'rgba(212,178,107,0.2)',
                'rgba(212,178,107,1)',
                'rgba(212,178,107,0.5)',
              ],
              boxShadow: [
                '0 0 0px rgba(212,178,107,0)',
                '0 0 16px rgba(212,178,107,0.6)',
                '0 0 0px rgba(212,178,107,0)',
              ],
            }
          : { opacity: 0 }
      }
      transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
      className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4B26B]/50 text-[#D4B26B] text-xs font-bold uppercase tracking-wider relative overflow-hidden"
    >
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: [0, 1.4, 1], opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
        className="w-1.5 h-1.5 rounded-full bg-[#D4B26B] shrink-0"
      />

      <span className="relative z-10 tracking-wider">
        {text}
      </span>
    </motion.div>
  );
};

export const ProcessInitCenterSignal: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center">
      {/* Central initiating node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isActive
            ? {
                scale: [0, 2, 0],
                opacity: [0, 1, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.45, delay: 0.28, ease: 'easeOut' }}
        className="absolute w-2 h-2 rounded-full bg-[#D4B26B] shadow-[0_0_16px_#D4B26B]"
      />

      {/* Signal expanding horizontally toward LEFT */}
      <motion.div
        initial={{ right: '50%', width: '0%', opacity: 0 }}
        animate={
          isActive
            ? {
                right: ['50%', '50%'],
                width: ['0%', '55%'],
                opacity: [0, 0.75, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-l from-[#D4B26B] via-[#D4B26B]/60 to-transparent shadow-[0_0_12px_#D4B26B]"
      />

      {/* Signal expanding horizontally toward RIGHT */}
      <motion.div
        initial={{ left: '50%', width: '0%', opacity: 0 }}
        animate={
          isActive
            ? {
                left: ['50%', '50%'],
                width: ['0%', '55%'],
                opacity: [0, 0.75, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#D4B26B] via-[#D4B26B]/60 to-transparent shadow-[0_0_12px_#D4B26B]"
      />

      {/* Ambient soft glow expanding from center */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isActive
            ? {
                scaleX: [0, 1.2, 0],
                opacity: [0, 0.3, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.75, delay: 0.32, ease: 'easeOut' }}
        className="absolute inset-y-0 w-full bg-radial from-[#D4B26B]/20 via-transparent to-transparent"
      />
    </div>
  );
};

export const ProcessInitHeading: React.FC<{
  text: string;
  isActive: boolean;
  className?: string;
}> = ({ text, isActive, className = '' }) => {
  const words = text.split(' ');
  const centerIdx = (words.length - 1) / 2;
  const [effectiveActive, setEffectiveActive] = useState(false);

  useEffect(() => {
    if (isActive) setEffectiveActive(true);
  }, [isActive]);

  useEffect(() => {
    const fallback = setTimeout(() => setEffectiveActive(true), 1200);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <h2 className={className}>
      {words.map((word, i) => {
        const distanceFromCenter = Math.abs(i - centerIdx);
        return (
          <span key={i} className="inline-block mr-[0.26em]">
            <motion.span
              initial={{
                opacity: 0,
                clipPath: 'inset(0 50% 0 50%)',
              }}
              animate={
                effectiveActive
                  ? {
                      opacity: 1,
                      clipPath: 'inset(0 0% 0 0%)',
                    }
                  : {
                      opacity: 0,
                      clipPath: 'inset(0 50% 0 50%)',
                    }
              }
              transition={{
                duration: 0.4,
                delay: 0.44 + distanceFromCenter * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </h2>
  );
};

export const ProcessInitUnderline: React.FC<{
  isActive: boolean;
  className?: string;
}> = ({ isActive, className = '' }) => {
  return (
    <div className={`overflow-hidden h-1 flex items-center justify-center ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isActive
            ? {
                scaleX: 1,
                opacity: 1,
                boxShadow: [
                  '0 0 0px #D4B26B',
                  '0 0 14px #D4B26B',
                  '0 0 0px #D4B26B',
                ],
              }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.5, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'center' }}
        className="w-16 h-1 bg-[#D4B26B] rounded-full"
      />
    </div>
  );
};

export const ProcessInitDescription: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}> = ({ children, isActive, className = '' }) => {
  const [effectiveActive, setEffectiveActive] = useState(false);

  useEffect(() => {
    if (isActive) setEffectiveActive(true);
  }, [isActive]);

  useEffect(() => {
    const fallback = setTimeout(() => setEffectiveActive(true), 1200);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, clipPath: 'inset(0 30% 0 30%)' }}
        animate={
          effectiveActive
            ? { opacity: 1, clipPath: 'inset(0 0% 0 0%)' }
            : { opacity: 0, clipPath: 'inset(0 30% 0 30%)' }
        }
        transition={{ duration: 0.55, delay: 0.88, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const ProcessInitCtaButton: React.FC<{
  to: string;
  text: string;
  isActive: boolean;
  id?: string;
  className?: string;
}> = ({ to, text, isActive, id, className = '' }) => {
  const [arrowNudge, setArrowNudge] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      setArrowNudge(true);
      setTimeout(() => setArrowNudge(false), 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="relative inline-block">
      <Link
        id={id}
        to={to}
        className={`relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 rounded-full border text-sm font-bold shadow-lg hover:shadow-2xl transition-all duration-250 ease-out hover:-translate-y-0.5 cursor-pointer group ${className}`}
      >
        <span className="relative z-10">{text}</span>
        <motion.span
          animate={arrowNudge ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative z-10 inline-flex transition-transform duration-250 ease-out group-hover:translate-x-1"
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </motion.span>

        {/* 7. Subtle circular signal expanding from center to edges */}
        {isActive && (
          <motion.span
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{
              scale: [0.1, 1.4],
              opacity: [0, 0.85, 0],
            }}
            transition={{ duration: 0.7, delay: 1.08, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-[#D4B26B] bg-[#D4B26B]/15 pointer-events-none"
          />
        )}

        {/* Edge activation flash around boundary */}
        {isActive && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              boxShadow: [
                '0 0 0px #D4B26B',
                '0 0 20px #D4B26B',
                '0 0 0px #D4B26B',
              ],
            }}
            transition={{ duration: 0.6, delay: 1.15, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full border-2 border-[#D4B26B] pointer-events-none"
          />
        )}

        {/* Standard hover highlight sweep */}
        <span
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-650 ease-out skew-x-[-20deg]"
        />
      </Link>
    </div>
  );
};
