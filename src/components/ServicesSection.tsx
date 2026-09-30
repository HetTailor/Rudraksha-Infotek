import React, { useState } from 'react';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/siteData';
import { ServiceCategory } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('website');

  const activeService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-zinc-700 mb-4">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950">
            Our Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
            From digital architecture to viral social campaigns and print-ready branding, explore our three pillars of digital craftsmanship.
          </p>
        </div>

        {/* Tab Navigation for high scannability + Full Card details */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 border-b border-zinc-200 pb-4">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              id={`service-tab-${service.id}`}
              onClick={() => setActiveTab(service.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === service.id
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70'
              }`}
            >
              <span className="font-mono text-xs opacity-70">{service.number}</span>
              <span>{service.title}</span>
            </button>
          ))}
        </div>

        {/* Highlighted Detailed Showcase for Selected Service */}
        <div className="rounded-3xl border border-zinc-200/90 bg-[#FAFAFA] p-6 sm:p-8 lg:p-12 mb-16 shadow-xs relative overflow-hidden">
          {/* Two-Line Animation: Top Line Indigo #3C2B99 & Bottom Line Light Grey #D9D9D9 */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none z-20">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="0"
                y1="1.25"
                x2="100%"
                y2="1.25"
                stroke="#3C2B99"
                strokeWidth="2.5"
                pathLength="100"
                strokeDasharray="30 70"
                className="animate-seamless-line"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none z-20">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="0"
                y1="1.25"
                x2="100%"
                y2="1.25"
                stroke="#D9D9D9"
                strokeWidth="2.5"
                pathLength="100"
                strokeDasharray="30 70"
                className="animate-seamless-line-reverse"
              />
            </svg>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm sm:text-base font-bold text-zinc-500 bg-white px-3 py-1 rounded-lg border border-zinc-200">
                  {activeService.number}
                </span>
                <span className="text-xs uppercase tracking-widest font-bold text-zinc-600">
                  RUDRAKSHA INFOTEK SERVICE
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                  {activeService.title}
                </h3>
                <p className="text-lg font-semibold text-zinc-700 mt-1">
                  {activeService.tagline}
                </p>
              </div>

              <p className="text-zinc-600 leading-relaxed text-base">
                {activeService.description}
              </p>

              {/* What We Offer Checklist */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-950 mb-3">
                  What We Offer:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.offerings.map((offering) => (
                    <div
                      key={offering}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-zinc-200/70 text-xs sm:text-sm font-medium text-zinc-800"
                    >
                      <div className="w-4 h-4 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{offering}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {activeService.highlights.map((h) => (
                  <div key={h.title} className="p-3 bg-white rounded-xl border border-zinc-200/70">
                    <p className="text-xs font-bold text-zinc-950">{h.title}</p>
                    <p className="text-[11px] text-zinc-600 mt-0.5 leading-snug">{h.desc}</p>
                  </div>
                ))}
              </div>

              {/* Service Specific CTA */}
              <div className="pt-2">
                <button
                  id={`cta-${activeService.id}`}
                  onClick={() => onSelectService(activeService.id)}
                  className="service-action-cta-btn inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-zinc-950 text-white font-semibold text-sm hover:bg-[#D9D9D9] hover:text-[#3C2B99] transition-colors shadow-sm"
                >
                  <span>{activeService.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image Mockup */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-zinc-950 flex items-center justify-center group">
                  {/* Ambient backdrop for smooth letterbox blending */}
                  <img
                    src={activeService.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110"
                    onError={(e) => {
                      if (activeService.id === 'website') {
                        e.currentTarget.src = '/images/web-development.jpg';
                      } else if (activeService.id === 'social') {
                        e.currentTarget.src = '/images/instagram.png';
                      } else if (activeService.id === 'graphic') {
                        e.currentTarget.src = '/images/graphic.jpg';
                      }
                    }}
                  />
                  {/* Auto-adjusted sharp photo */}
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (activeService.id === 'website') {
                        e.currentTarget.src = '/images/web-development.jpg';
                      } else if (activeService.id === 'social') {
                        e.currentTarget.src = '/images/instagram.png';
                      } else if (activeService.id === 'graphic') {
                        e.currentTarget.src = '/images/graphic.jpg';
                      }
                    }}
                    className="relative z-10 w-full h-full object-cover object-center rounded-2xl transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Comparative Overview for Rapid Scanning */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm font-bold text-zinc-500">
                    {service.number}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                    Core Pillar
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-950 group-hover:text-zinc-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-zinc-700 mt-1 mb-3">
                  {service.tagline}
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="space-y-1.5 mb-6 pt-2 border-t border-zinc-100">
                  {service.offerings.slice(0, 4).map((offering) => (
                    <div key={offering} className="flex items-center gap-2 text-xs text-zinc-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      <span>{offering}</span>
                    </div>
                  ))}
                  {service.offerings.length > 4 && (
                    <p className="text-[11px] text-zinc-600 font-medium pl-3.5">
                      + {service.offerings.length - 4} more specialized offerings
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => onSelectService(service.id)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-zinc-100 text-zinc-900 text-xs font-bold hover:bg-zinc-950 hover:text-white transition-colors"
              >
                <span>{service.ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
