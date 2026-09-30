import React from 'react';

interface ContinuousSquareBorderProps {
  cardId: string;
  staggerIndex?: number;
  borderRadius?: number;
}

export const ContinuousSquareBorder: React.FC<ContinuousSquareBorderProps> = ({
  cardId,
  staggerIndex = 0,
  borderRadius = 23,
}) => {
  // Staggered smoothly across the 4.5s continuous loop:
  // Card 1: 0s, Card 2: -1.5s, Card 3: -3.0s
  const delay = `${(staggerIndex % 3) * -1.5}s`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: `${borderRadius + 1}px`,
      }}
    >
      <defs>
        {/* Continuous moving signal (25% beam length, 75% gap) along the complete perimeter */}
        <mask
          id={`squareBorderMask-${cardId}`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <rect
            x="1.5"
            y="1.5"
            width="calc(100% - 3px)"
            height="calc(100% - 3px)"
            rx={borderRadius}
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="25 75"
            className="animate-square-border-clockwise"
            style={{
              animationDelay: delay,
            }}
          />
        </mask>

        {/* Corner 1: Top-Right (Grey #D9D9D9 to Indigo #3C2B99 transition) */}
        <linearGradient id={`trGrad-${cardId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D9D9D9" />
          <stop offset="100%" stopColor="#3C2B99" />
        </linearGradient>

        {/* Corner 2: Bottom-Right (Indigo #3C2B99 to Grey #D9D9D9 transition) */}
        <linearGradient id={`brGrad-${cardId}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3C2B99" />
          <stop offset="100%" stopColor="#D9D9D9" />
        </linearGradient>

        {/* Corner 3: Bottom-Left (Grey #D9D9D9 to Indigo #3C2B99 transition) */}
        <linearGradient id={`blGrad-${cardId}`} x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D9D9D9" />
          <stop offset="100%" stopColor="#3C2B99" />
        </linearGradient>

        {/* Corner 4: Top-Left (Indigo #3C2B99 to Grey #D9D9D9 transition) */}
        <linearGradient id={`tlGrad-${cardId}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3C2B99" />
          <stop offset="100%" stopColor="#D9D9D9" />
        </linearGradient>
      </defs>

      {/* Direction-based colored edges revealed through the moving mask */}
      {/* Top = Grey (#D9D9D9), Right = Indigo (#3C2B99), Bottom = Grey (#D9D9D9), Left = Indigo (#3C2B99) */}
      <g mask={`url(#squareBorderMask-${cardId})`}>
        {/* TOP HORIZONTAL SIDE: Grey / Off-white */}
        <line x1="0" y1="0" x2="100%" y2="0" stroke="#D9D9D9" strokeWidth="60" />

        {/* RIGHT VERTICAL SIDE: Indigo #3C2B99 */}
        <line x1="100%" y1="0" x2="100%" y2="100%" stroke="#3C2B99" strokeWidth="60" />

        {/* BOTTOM HORIZONTAL SIDE: Grey / Off-white */}
        <line x1="100%" y1="100%" x2="0" y2="100%" stroke="#D9D9D9" strokeWidth="60" />

        {/* LEFT VERTICAL SIDE: Indigo #3C2B99 */}
        <line x1="0" y1="100%" x2="0" y2="0" stroke="#3C2B99" strokeWidth="60" />

        {/* TOP-RIGHT CORNER: Smooth transition (Grey -> Indigo) */}
        <circle cx="100%" cy="0" r="48" fill={`url(#trGrad-${cardId})`} />

        {/* BOTTOM-RIGHT CORNER: Smooth transition (Indigo -> Grey) */}
        <circle cx="100%" cy="100%" r="48" fill={`url(#brGrad-${cardId})`} />

        {/* BOTTOM-LEFT CORNER: Smooth transition (Grey -> Indigo) */}
        <circle cx="0" cy="100%" r="48" fill={`url(#blGrad-${cardId})`} />

        {/* TOP-LEFT CORNER: Smooth transition (Indigo -> Grey) */}
        <circle cx="0" cy="0" r="48" fill={`url(#tlGrad-${cardId})`} />
      </g>
    </svg>
  );
};
