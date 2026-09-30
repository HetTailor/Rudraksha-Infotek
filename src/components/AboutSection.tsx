import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Quote, Award, Layers, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

interface AboutSectionProps {
  onTalkToFounder: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onTalkToFounder }) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAFAFA] border-t border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Studio / Founder Image */}
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <img
                  src={COMPANY_INFO.ceoImage}
                  alt={`${COMPANY_INFO.founder} - ${COMPANY_INFO.role}, ${COMPANY_INFO.name}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/images/ceo.png';
                  }}
                  className="w-full h-80 sm:h-96 object-cover object-[center_10%] rounded-xl transition-transform duration-500"
                />
              </div>

              {/* Founder Spotlight Card */}
              <div className="mt-4 sm:-mt-10 sm:ml-6 relative z-10 bg-white border border-zinc-200 rounded-xl p-5 shadow-lg max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-base tracking-wider shrink-0">
                    HT
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-950 text-base leading-tight">
                      {COMPANY_INFO.founder}
                    </h4>
                    <p className="text-xs font-semibold text-zinc-600">
                      {COMPANY_INFO.role}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-100 text-xs text-zinc-600 flex items-center justify-between">
                  <span>Leadership & Strategy</span>
                  <span className="text-zinc-900 font-semibold">RUDRAKSHA INFOTEK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              <span>About RUDRAKSHA INFOTEK</span>
            </div>

            <div className="relative py-1">
              <motion.h2
                initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.15 }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 leading-[1.18] pt-1 pb-3 px-1"
              >
                We Turn Ideas Into Digital Experiences
              </motion.h2>
              {/* Very subtle moving light/signal through the existing heading area */}
              <div className="relative h-[2px] w-36 bg-zinc-100 rounded-full overflow-hidden mt-1 mb-2">
                <motion.div
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '100%' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#D4B26B] to-[#3C2B99]"
                />
              </div>
            </div>

            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 text-base sm:text-lg text-zinc-600 leading-relaxed"
            >
              <p className="font-medium text-zinc-900">
                <strong className="font-bold text-zinc-950">{COMPANY_INFO.name}</strong> is an IT and digital creative company dedicated to helping businesses build a strong and professional online presence.
              </p>
              <p>
                From designing responsive websites to managing social media and creating engaging graphics, we provide creative and practical digital solutions tailored to your brand.
              </p>
            </motion.div>

            {/* Philosophy Highlight Box */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-xs relative">
              <Quote className="w-8 h-8 text-zinc-200 absolute top-5 right-5 pointer-events-none" />
              <p className="text-base text-zinc-800 italic leading-relaxed pr-8">
                &ldquo;{COMPANY_INFO.aboutPhilosophy}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-100">
                <span className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
                  — {COMPANY_INFO.founder}, {COMPANY_INFO.role}
                </span>
                <span className="text-xs text-zinc-600 font-medium">Digital Craftsmanship</span>
              </div>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-zinc-200/70">
                <div className="p-2 rounded-lg bg-zinc-100 text-zinc-900">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950">Integrated Creative Suite</h4>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Unified synergy between code, social branding, and visual assets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-zinc-200/70">
                <div className="p-2 rounded-lg bg-zinc-100 text-zinc-900">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950">Tailored Execution</h4>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    No cookie-cutter templates. Everything engineered for your niche.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="about-talk-to-founder"
                onClick={onTalkToFounder}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <span>Connect With {COMPANY_INFO.founder}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
