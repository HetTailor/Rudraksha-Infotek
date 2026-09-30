import React, { useState } from 'react';

interface BrandLogoItem {
  id: string;
  name: string;
  url: string;
  fallbackUrl: string;
}

const BRAND_LOGOS: BrandLogoItem[] = [
  {
    id: 'brand-1',
    name: 'GEV - Gatived Electric Vehicles',
    url: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/ChatGPT-Image-Sep-18-2026-11_46_45-AM.png',
    fallbackUrl: '/images/logos/logo1.png',
  },
  {
    id: 'brand-2',
    name: "Alice's Tech Solutions",
    url: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/ChatGPT-Image-Sep-18-2026-11_44_53-AM.png',
    fallbackUrl: '/images/logos/logo2.png',
  },
  {
    id: 'deep-class',
    name: 'Deep Tuition Class',
    url: 'https://het.assistwebstudio.in/wp-content/uploads/2026/07/deep-class.png',
    fallbackUrl: '/images/logos/deep-class.png',
  },
  {
    id: 'optimum-fitness',
    name: 'Optimum Fitness',
    url: '/images/logos/optimum-fitness-dark.png',
    fallbackUrl: 'https://optimumfitness.co.in/wp-content/uploads/2023/02/Optimum-Fitness-Logo-White-copy-Website.png',
  },
  {
    id: 'gative-dev',
    name: 'Gatived Groups',
    url: '/images/logos/gativedev-dark.png',
    fallbackUrl: 'https://gativedev.com/wp-content/uploads/2026/08/Untitled-design-1-scaled.png',
  },
];

const LogoCard: React.FC<{ brand: BrandLogoItem }> = ({ brand }) => {
  const [currentSrc, setCurrentSrc] = useState(brand.url);

  const handleError = () => {
    if (currentSrc !== brand.fallbackUrl) {
      setCurrentSrc(brand.fallbackUrl);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs shrink-0 select-none hover:border-[#D4B26B] hover:shadow-[0_4px_16px_rgba(60,43,153,0.12)] transition-all duration-250 cursor-pointer"
    >
      <img
        src={currentSrc}
        alt={brand.name}
        onError={handleError}
        loading="lazy"
        draggable={false}
        className="h-8 sm:h-9 md:h-10 w-auto max-w-[120px] sm:max-w-[145px] object-contain pointer-events-none transition-transform duration-200"
      />
    </div>
  );
};

// Two identical tracks with 2 repeats of the 5 brands each (10 logos per track)
// Guarantees continuous coverage on any screen resolution without gaps or jumps
const MARQUEE_SET = [...BRAND_LOGOS, ...BRAND_LOGOS];

export const BrandLogos: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-y border-zinc-100 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 overflow-hidden">
        {/* Label: Fixed in place */}
        <div className="text-zinc-600 text-xs sm:text-sm font-semibold whitespace-nowrap text-center md:text-left leading-tight shrink-0 z-10 bg-white">
          Trusted by
          <br className="hidden md:inline" />
          {' '}leading brands
        </div>

        {/* Logos Marquee Container: Completely independent GPU-composited continuous horizontal scroll */}
        <div className="relative flex-1 overflow-hidden w-full py-1 brand-marquee-mask">
          <div className="flex w-max animate-brand-marquee">
            {/* Track 1 */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0 pr-3 sm:pr-4 lg:pr-5">
              {MARQUEE_SET.map((brand, index) => (
                <LogoCard key={`track1-${brand.id}-${index}`} brand={brand} />
              ))}
            </div>
            {/* Track 2 (Identical duplicate for seamless infinite loop) */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0 pr-3 sm:pr-4 lg:pr-5" aria-hidden="true">
              {MARQUEE_SET.map((brand, index) => (
                <LogoCard key={`track2-${brand.id}-${index}`} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
