import React from 'react';

export const ProcessDiscoverIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-full bg-[#3C2B99]/10 border border-[#D4B26B]/40 flex items-center justify-center p-2 shadow-2xs">
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="14" cy="14" r="8" fill="#f4f1fa" stroke="#3C2B99" strokeWidth="2" />
      <path d="M 20 20 L 26 26" stroke="#D4B26B" strokeWidth="3" strokeLinecap="round" />
      <rect x="11" y="14" width="2" height="4" rx="0.5" fill="#3C2B99" />
      <rect x="14" y="11" width="2" height="7" rx="0.5" fill="#3C2B99" />
      <rect x="17" y="9" width="2" height="9" rx="0.5" fill="#D4B26B" />
    </svg>
  </div>
);

export const ProcessStrategizeIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-full bg-[#3C2B99]/10 border border-[#D4B26B]/40 flex items-center justify-center p-2 shadow-2xs">
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <rect x="6" y="6" width="20" height="15" rx="2" fill="#FFFFFF" stroke="#3C2B99" strokeWidth="2" />
      <line x1="9" y1="10" x2="16" y2="10" stroke="#3C2B99" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="13" x2="14" y2="13" stroke="#D4B26B" strokeWidth="1.5" strokeLinecap="round" />
      {/* Target icon inside */}
      <circle cx="20" cy="12" r="3" fill="#fef9ee" stroke="#D4B26B" strokeWidth="1.5" />
      {/* Tripod Stand */}
      <line x1="16" y1="21" x2="16" y2="24" stroke="#3C2B99" strokeWidth="2" />
      <line x1="16" y1="24" x2="11" y2="28" stroke="#3C2B99" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="24" x2="21" y2="28" stroke="#3C2B99" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

export const ProcessExecuteIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-full bg-[#3C2B99]/10 border border-[#D4B26B]/40 flex items-center justify-center p-2 shadow-2xs">
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      {/* Mini Rocket */}
      <path
        d="M 24 8 C 26 10, 21 18, 17 20 C 15 18, 21 11, 24 8 Z"
        fill="#FFFFFF"
        stroke="#3C2B99"
        strokeWidth="1.5"
      />
      <path d="M 24 8 C 25.5 9.5, 24 10.5, 23 10 C 22.5 9, 23.5 8, 24 8 Z" fill="#D4B26B" />
      <path d="M 14 20 L 12 23 L 15 22 Z" fill="#3C2B99" />
      <circle cx="20.5" cy="13.5" r="1.5" fill="#18181b" stroke="#D4B26B" strokeWidth="0.8" />
      {/* Fire in Gold */}
      <path d="M 16 21 Q 14 24, 13 26 Q 16 25, 17 22 Z" fill="#D4B26B" />
    </svg>
  </div>
);

export const ProcessOptimizeIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-full bg-[#3C2B99]/10 border border-[#D4B26B]/40 flex items-center justify-center p-2 shadow-2xs">
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <rect x="5" y="6" width="22" height="18" rx="2" fill="#FFFFFF" stroke="#3C2B99" strokeWidth="2" />
      {/* Bars */}
      <rect x="8" y="16" width="3" height="5" rx="0.5" fill="#3C2B99" opacity="0.4" />
      <rect x="13" y="13" width="3" height="8" rx="0.5" fill="#3C2B99" opacity="0.8" />
      <rect x="18" y="10" width="3" height="11" rx="0.5" fill="#3C2B99" />
      {/* Ascending Trend Line in Gold */}
      <path d="M 8 15 L 14 11 L 21 8" stroke="#D4B26B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="8" r="1.5" fill="#D4B26B" />
    </svg>
  </div>
);

