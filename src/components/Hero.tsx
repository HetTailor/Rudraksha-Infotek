import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Globe, Share2, Palette, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

interface HeroProps {
  onGetStarted: () => void;
  onViewServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onViewServices }) => {
  const [activeTab, setActiveTab] = useState<'web' | 'social' | 'graphic'>('web');

  const previewCards = {
    web: {
      tag: 'Web Engineering',
      title: 'Adaptive Digital Flagship',
      metrics: '99 Performance • 100% Responsive',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/web-devlopment.jpg',
      description: 'Clean UI/UX, optimized SEO markup, and lightning-fast load times tailored to your brand.',
    },
    social: {
      tag: 'Social Strategy',
      title: 'Audience Growth & Engagement',
      metrics: '+380% Organic Reach • High Conversion',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/instagram.png',
      description: 'Consistent aesthetic grids, promotional storytelling, and festival campaigns that convert.',
    },
    graphic: {
      tag: 'Brand Identity',
      title: 'Signature Visual Assets',
      metrics: 'Vector Mastery • Print & Screen Ready',
      image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/graphic.jpg',
      description: 'Memorable logos, business stationery, and brand books crafted to leave lasting impressions.',
    },
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white">
      {/* Subtle geometric dot matrix accent in pure minimalist style */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Decorative gradient glow for depth without dark clutter */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-zinc-100/70 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 mb-6 animate-fade-in shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
              RUDRAKSHA INFOTEK • Modern IT & Creative Agency
            </span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-950 leading-[1.1] mb-6">
            Build Your Digital Presence. <br className="hidden sm:inline" />
            <span className="text-zinc-500 font-medium">Grow Your Business.</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {COMPANY_INFO.heroDescription}
          </p>

          {/* Core Services Strip */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 px-4 rounded-xl bg-zinc-50 border border-zinc-200/60 mb-10 text-xs sm:text-sm font-semibold text-zinc-800 shadow-xs">
            <span className="inline-flex items-center gap-1.5 text-zinc-900">
              <Globe className="w-4 h-4 text-zinc-600" />
              Website Designing
            </span>
            <span className="text-zinc-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-zinc-900">
              <Share2 className="w-4 h-4 text-zinc-600" />
              Social Media Marketing
            </span>
            <span className="text-zinc-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-zinc-900">
              <Palette className="w-4 h-4 text-zinc-600" />
              Graphic Designing
            </span>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
            <button
              id="hero-cta-get-started"
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-zinc-950 text-white font-semibold text-sm sm:text-base hover:bg-[#3C2B99] hover:border-[#3C2B99] transition-all duration-250 shadow-sm hover:shadow active:scale-98"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-cta-view-services"
              onClick={onViewServices}
              className="btn-secondary-lightgrey w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border font-semibold text-sm sm:text-base shadow-xs"
            >
              <span>View Our Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimalist Interactive Showcase Stage */}
        <div className="max-w-5xl mx-auto mt-4">
          <div className="rounded-2xl border border-zinc-200/90 bg-white p-2 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            {/* Top Toolbar Tabs */}
            <div className="flex flex-wrap items-center justify-between border-b border-zinc-100 pb-3 mb-4 px-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-200" />
                <span className="w-3 h-3 rounded-full bg-zinc-200" />
                <span className="w-3 h-3 rounded-full bg-zinc-200" />
                <span className="text-xs text-zinc-600 font-mono ml-2 hidden sm:inline">
                  rudraksha-solutions.preview
                </span>
              </div>

              {/* Service switcher tabs */}
              <div className="flex items-center bg-zinc-100/90 p-1 rounded-xl gap-1">
                <button
                  id="tab-preview-web"
                  onClick={() => setActiveTab('web')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'web'
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Websites
                </button>
                <button
                  id="tab-preview-social"
                  onClick={() => setActiveTab('social')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'social'
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Social Media
                </button>
                <button
                  id="tab-preview-graphic"
                  onClick={() => setActiveTab('graphic')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'graphic'
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Graphic Design
                </button>
              </div>
            </div>

            {/* Content Preview Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-2 sm:p-4">
              <div className="lg:col-span-7 overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 relative aspect-16/9 sm:aspect-16/10 group">
                <img
                  src={previewCards[activeTab].image}
                  alt={previewCards[activeTab].title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (activeTab === 'web') {
                      e.currentTarget.src = '/images/web-development.jpg';
                    } else if (activeTab === 'social') {
                      e.currentTarget.src = '/images/instagram.png';
                    } else if (activeTab === 'graphic') {
                      e.currentTarget.src = '/images/graphic.jpg';
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-semibold text-zinc-900 border border-zinc-200/60 shadow-xs">
                  {previewCards[activeTab].tag}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <div className="inline-block">
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-600">
                    Live Capability
                  </span>
                  <h2 className="text-2xl font-bold text-zinc-950 tracking-tight mt-1">
                    {previewCards[activeTab].title}
                  </h2>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {previewCards[activeTab].description}
                </p>

                <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-3 text-xs text-zinc-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span className="font-semibold">{previewCards[activeTab].metrics}</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onGetStarted}
                    className="inline-flex items-center gap-2 text-xs font-bold text-zinc-950 hover:text-zinc-700 group"
                  >
                    <span>Request this service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Key Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mt-12 pt-8 border-t border-zinc-200/60 text-center">
          <div className="p-4">
            <p className="text-3xl font-extrabold text-zinc-950 tracking-tight">100%</p>
            <p className="text-xs font-medium text-zinc-600 mt-1 uppercase tracking-wider">Custom Built</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-extrabold text-zinc-950 tracking-tight">3-in-1</p>
            <p className="text-xs font-medium text-zinc-600 mt-1 uppercase tracking-wider">Web, Social & Graphics</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-extrabold text-zinc-950 tracking-tight">Fast</p>
            <p className="text-xs font-medium text-zinc-600 mt-1 uppercase tracking-wider">Turnaround Delivery</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-extrabold text-zinc-950 tracking-tight">Direct</p>
            <p className="text-xs font-medium text-zinc-600 mt-1 uppercase tracking-wider">Founder Collaboration</p>
          </div>
        </div>
      </div>
    </section>
  );
};
