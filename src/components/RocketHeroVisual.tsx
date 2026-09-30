import React, { useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { COMPANY_INFO } from '../data/siteData';

export const RocketHeroVisual: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for mouse-follow tilt & offset
  const springConfig = { damping: 25, stiffness: 160, mass: 0.6 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const translateX = useSpring(0, springConfig);
  const translateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Subtle, professional 3D tilt & offset (max 10 deg tilt, 14px displacement)
    rotateY.set(x * 12);
    rotateX.set(-y * 12);
    translateX.set(x * 14);
    translateY.set(y * 14);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    translateX.set(0);
    translateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto aspect-[1099/976] flex items-center justify-center select-none cursor-default perspective-1000"
    >
      {/* Soft ambient glows matching the website brand palette: Indigo #3C2B99 and Gold #D4B26B */}
      <motion.div
        animate={{
          scale: isHovered ? [1.05, 1.12, 1.05] : [1, 1.06, 1],
          opacity: isHovered ? [0.65, 0.8, 0.65] : [0.5, 0.65, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 sm:w-84 h-72 sm:h-84 rounded-full bg-[#3C2B99]/15 blur-3xl -top-4 -right-4 pointer-events-none transition-all duration-500"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute w-64 sm:w-72 h-64 sm:h-72 rounded-full bg-[#D4B26B]/20 blur-2xl bottom-2 left-2 pointer-events-none"
      />

      {/* Main Hero Graphic Frame with floating loop combined with interactive 3D mouse-tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          // Gentle ambient float when idle
          y: isHovered ? 0 : [-6, 6, -6],
        }}
        transition={{ duration: 5, repeat: isHovered ? 0 : Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center p-1 sm:p-2"
      >
        <img
          src={COMPANY_INFO.heroRocketImage || 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/home.png'}
          alt="Rudraksha Infotek Digital Growth - SEO, Web Development, Creative Marketing"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = '/images/rocket-hero.jpg';
          }}
          className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_24px_40px_rgba(60,43,153,0.22)] transition-transform duration-300"
        />
      </motion.div>
    </motion.div>
  );
};
