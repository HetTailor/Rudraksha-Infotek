import React from 'react';
import { Target, Lightbulb, Smartphone, Rocket, Handshake, CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_US, COMPANY_INFO } from '../data/siteData';

export const WhyUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-6 h-6 text-zinc-950" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-zinc-950" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-zinc-950" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-zinc-950" />;
      case 'Handshake':
        return <Handshake className="w-6 h-6 text-zinc-950" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-zinc-950" />;
    }
  };

  return (
    <section id="why-us" className="py-20 md:py-28 bg-white border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-700 mb-3">
            <span>The RUDRAKSHA Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950">
            Why Choose {COMPANY_INFO.name}?
          </h2>
          <p className="mt-2 text-xl font-semibold text-zinc-700">
            Creative Thinking. Professional Execution.
          </p>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed">
            We bridge the gap between imagination and execution. Every pixel, line of code, and marketing campaign is tuned to achieve tangible business results.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((pillar, idx) => (
            <div
              key={pillar.id}
              id={`why-us-card-${pillar.id}`}
              className={`p-6 sm:p-8 rounded-2xl border border-zinc-200/90 bg-[#FAFAFA] hover:bg-white hover:border-zinc-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shadow-xs">
                    {getIcon(pillar.iconName)}
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-950 tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200/50 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-950" />
                <span>RUDRAKSHA Standard</span>
              </div>
            </div>
          ))}

          {/* 6th Highlight Box: Direct Founder Commitment */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 inline-block mb-4">
                Founder Guarantee
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Personalized Care
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Direct communication with {COMPANY_INFO.founder}. No layers of account managers, just clear, honest updates and high responsiveness.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <span>Owner Led</span>
              <span className="text-white font-semibold">{COMPANY_INFO.founder}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
