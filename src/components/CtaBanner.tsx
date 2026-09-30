import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

interface CtaBannerProps {
  onLetsTalk: () => void;
  onStartProject: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onLetsTalk,
  onStartProject,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 bg-white border-t border-zinc-200/80 relative overflow-hidden"
    >
      {/* Background minimalist accents with subtle moving ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(#f4f4f5_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />

      {/* Subtle moving ambient light/shadow movement */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -15, 10, 0],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-indigo-100/40 via-[#D4B26B]/15 to-indigo-50/40 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
          <span>Let's Build Something Amazing</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 leading-tight">
          Your Brand Deserves to Be Seen.
        </h2>

        <p className="mt-6 text-base sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Whether you need a professional website, engaging social media content, or creative graphic designs, <strong className="text-zinc-950 font-semibold">{COMPANY_INFO.name}</strong> is ready to help you take your brand to the next level.
        </p>

        <p className="mt-4 text-sm sm:text-base font-semibold text-zinc-800">
          Have an idea? Let&apos;s turn it into reality.
        </p>

        {/* Dual CTAs explicitly from prompt */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="cta-banner-lets-talk"
            onClick={onLetsTalk}
            className="btn-secondary-lightgrey w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border font-semibold text-sm sm:text-base shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Let&apos;s Talk</span>
          </button>

          <button
            id="cta-banner-start-project"
            onClick={onStartProject}
            className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-zinc-950 text-white font-semibold text-sm sm:text-base hover:bg-zinc-800 transition-all shadow-sm active:scale-98 cursor-pointer group"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />

            {/* Controlled one-time highlight sweep on activation */}
            {isInView && (
              <motion.span
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.75, delay: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg]"
              />
            )}
          </button>
        </div>

        {/* Founder Signature Note */}
        <div className="mt-12 pt-8 border-t border-zinc-200/60 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <span>Direct Founder Access</span>
          <span>•</span>
          <span className="font-semibold text-zinc-800">{COMPANY_INFO.founder}</span>
          <span>•</span>
          <span>Quick Response Within 24 Hours</span>
        </div>
      </div>
    </section>
  );
};
