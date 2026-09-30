import React from 'react';

// 1. 3D Magnifying Glass with Growth Chart (SEO Optimization) - Indigo #3C2B99 + Gold #D4B26B
export const SeoIcon3D: React.FC = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <svg className="w-14 h-14 drop-shadow-md" viewBox="0 0 64 64" fill="none">
      {/* Magnifier Glass Rim */}
      <circle cx="28" cy="28" r="18" fill="#FFFFFF" stroke="#3C2B99" strokeWidth="3.5" />
      <circle cx="28" cy="28" r="14" fill="#f4f1fa" />

      {/* Rising Bar Chart inside lens */}
      <rect x="18" y="31" width="4" height="7" rx="1.5" fill="#3C2B99" opacity="0.4" />
      <rect x="24" y="26" width="4" height="12" rx="1.5" fill="#3C2B99" opacity="0.8" />
      <rect x="30" y="20" width="4" height="18" rx="1.5" fill="#D4B26B" />

      {/* Magnifier Handle */}
      <path
        d="M 40 40 L 52 52"
        stroke="#3C2B99"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="53" cy="53" r="2.5" fill="#D4B26B" />
    </svg>
  </div>
);

// 2. 3D Browser Window with Dartboard/Target (PPC Advertising)
export const PpcIcon3D: React.FC = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <svg className="w-14 h-14 drop-shadow-md" viewBox="0 0 64 64" fill="none">
      {/* Browser Card */}
      <rect x="10" y="14" width="36" height="26" rx="4" fill="#3C2B99" />
      <rect x="10" y="14" width="36" height="8" rx="4" fill="#2d2073" />
      <circle cx="15" cy="18" r="1.5" fill="#D4B26B" />
      <circle cx="20" cy="18" r="1.5" fill="#ffffff" opacity="0.7" />
      <circle cx="25" cy="18" r="1.5" fill="#ffffff" opacity="0.7" />
      <rect x="14" y="26" width="14" height="3" rx="1" fill="#FFFFFF" opacity="0.8" />
      <rect x="14" y="32" width="10" height="3" rx="1" fill="#D4B26B" opacity="0.9" />

      {/* Target Bullseye overlapping */}
      <g transform="translate(10, 8)">
        <circle cx="34" cy="30" r="14" fill="#FFFFFF" stroke="#3C2B99" strokeWidth="2" />
        <circle cx="34" cy="30" r="10" fill="#fef9ee" />
        <circle cx="34" cy="30" r="6" fill="#D4B26B" />
        <circle cx="34" cy="30" r="2" fill="#FFFFFF" />

        {/* Dart / Arrow */}
        <path d="M 44 20 L 36 28" stroke="#3C2B99" strokeWidth="3" strokeLinecap="round" />
        <path d="M 43 19 L 46 22" stroke="#D4B26B" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

// 3. 3D Social Media Like & Heart Speech Bubbles (Social Media Marketing)
export const SocialIcon3D: React.FC = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <svg className="w-14 h-14 drop-shadow-md" viewBox="0 0 64 64" fill="none">
      {/* Back Chat Bubble (Indigo with Thumbs Up) */}
      <g transform="translate(4, 6)">
        <rect x="6" y="8" width="28" height="24" rx="8" fill="#3C2B99" />
        <polygon points="12,32 8,38 18,32" fill="#3C2B99" />
        {/* Thumbs Up Icon */}
        <path
          d="M 18 24 L 23 24 C 24 24 25 23 25 22 L 25 20 C 25 19 24 18 23 18 L 21 18 L 22 15 C 22 14 21 13 20 14 L 18 17 Z"
          fill="#FFFFFF"
        />
        <rect x="15" y="18" width="2" height="6" rx="1" fill="#D4B26B" />
      </g>

      {/* Front Chat Bubble (Gold with Heart) */}
      <g transform="translate(14, 14)">
        <rect x="12" y="10" width="26" height="22" rx="8" fill="#D4B26B" />
        <polygon points="30,32 34,38 24,32" fill="#D4B26B" />
        {/* Heart Icon */}
        <path
          d="M 25 18 C 24 16.5 22 16.5 21 18 C 20 19.5 21 21 25 24 C 29 21 30 19.5 29 18 C 28 16.5 26 16.5 25 18 Z"
          fill="#3C2B99"
        />
      </g>
    </svg>
  </div>
);

// 4. 3D Mail Envelope with Gold Accent (Email Marketing & Graphic Design)
export const EmailIcon3D: React.FC = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <svg className="w-14 h-14 drop-shadow-md" viewBox="0 0 64 64" fill="none">
      {/* Gold Envelope Body */}
      <rect x="10" y="20" width="44" height="30" rx="6" fill="#D4B26B" />
      {/* Envelope Flap folds */}
      <path d="M 10 24 L 32 38 L 54 24" stroke="#b5944d" strokeWidth="2.5" fill="none" />
      <path d="M 10 50 L 26 35" stroke="#b5944d" strokeWidth="2" />
      <path d="M 54 50 L 38 35" stroke="#b5944d" strokeWidth="2" />

      {/* Letter protruding from top */}
      <rect x="16" y="10" width="32" height="22" rx="4" fill="#FFFFFF" stroke="#3C2B99" strokeWidth="1.5" />

      {/* Indigo @ Sign on Letter */}
      <text
        x="32"
        y="25"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#3C2B99"
        fontFamily="sans-serif"
      >
        @
      </text>
    </svg>
  </div>
);

