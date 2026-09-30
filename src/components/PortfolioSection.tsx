import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, ExternalLink, Filter } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/siteData';
import { PortfolioProject, ServiceCategory } from '../types';

interface PortfolioSectionProps {
  onOpenProjectDetail: (project: PortfolioProject) => void;
  onRequestProject: (project: PortfolioProject) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onOpenProjectDetail,
  onRequestProject,
}) => {
  const [filter, setFilter] = useState<'all' | ServiceCategory>('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const filteredProjects =
    filter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[#FAFAFA] border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              <span>Selected Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950">
              Our Portfolio
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 max-w-xl">
              A curated look into our recent digital marketing, website development, and brand identity projects.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-white border border-zinc-200 rounded-xl shadow-2xs">
            <button
              id="filter-portfolio-all"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              All ({PORTFOLIO_PROJECTS.length})
            </button>
            <button
              id="filter-portfolio-web"
              onClick={() => setFilter('website')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                filter === 'website'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              Websites
            </button>
            <button
              id="filter-portfolio-social"
              onClick={() => setFilter('social')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                filter === 'social'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              Social Media
            </button>
            <button
              id="filter-portfolio-graphic"
              onClick={() => setFilter('graphic')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                filter === 'graphic'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              Graphic & Brand
            </button>
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredProjectId === project.id;
              const isAnyHovered = hoveredProjectId !== null;

              return (
                <motion.div
                  key={project.id}
                  layout
                  id={`portfolio-card-${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className={`relative group bg-white rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-350 ease-out border ${
                    isHovered
                      ? 'border-[#3C2B99] ring-2 ring-[#D4B26B]/50 shadow-[0_16px_40px_rgba(60,43,153,0.18)] z-20'
                      : 'border-zinc-200 opacity-100 shadow-2xs z-10'
                  }`}
                >
                  {/* Sophisticated border light movement when frame is focused */}
                  <svg className={`absolute inset-0 w-full h-full rounded-3xl pointer-events-none z-30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <rect
                      x="1.5"
                      y="1.5"
                      width="calc(100% - 3px)"
                      height="calc(100% - 3px)"
                      rx="23"
                      fill="none"
                      stroke={`url(#sectionFrameGlow-${project.id})`}
                      strokeWidth="2.5"
                      pathLength="100"
                      strokeDasharray="25 75"
                      className="animate-seamless-border"
                    />
                    <defs>
                      <linearGradient id={`sectionFrameGlow-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4B26B" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#D4B26B" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3C2B99" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div>
                    {/* Image Stage */}
                  <div
                    className={`relative aspect-16/10 overflow-hidden flex items-center justify-center cursor-pointer ${
                      project.id === 'deep-tuition-class'
                        ? 'bg-white'
                        : project.id === 'het-creation'
                        ? 'bg-[#fbf2e9]'
                        : project.id === 'optimum-fitness'
                        ? 'bg-[#1f292b]'
                        : project.id === 'alices-tech-solutions'
                        ? 'bg-white'
                        : 'bg-stone-950'
                    }`}
                    onClick={() => onOpenProjectDetail(project)}
                  >
                    {/* Ambient backdrop blur only for other cards, strictly never for the 3 target cards */}
                    {project.id !== 'optimum-fitness' &&
                      project.id !== 'het-creation' &&
                      project.id !== 'deep-tuition-class' && (
                        <img
                          src={project.image}
                          alt=""
                          aria-hidden="true"
                          className={`absolute inset-0 w-full h-full object-cover ${
                            project.id === 'alices-tech-solutions'
                              ? 'blur-2xl opacity-20 scale-110'
                              : 'blur-xl opacity-50 scale-110'
                          }`}
                          onError={(e) => {
                            if (project.id === 'gatived-ev') {
                              e.currentTarget.src = '/images/ev-1.png';
                            } else if (project.id === 'the-urban-image') {
                              e.currentTarget.src = '/images/urban.png';
                            } else if (project.id === 'alices-tech-solutions') {
                              e.currentTarget.src = '/images/a.jpg';
                            }
                          }}
                        />
                      )}
                    {/* Complete original image displayed with zero cropping, distortion, zoom, scale, or color tint */}
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (project.id === 'het-creation') {
                          e.currentTarget.src = '/images/het-creation.jpg';
                        } else if (project.id === 'gatived-ev') {
                          e.currentTarget.src = '/images/ev-1.png';
                        } else if (project.id === 'the-urban-image') {
                          e.currentTarget.src = '/images/urban.png';
                        } else if (project.id === 'deep-tuition-class') {
                          e.currentTarget.src = '/images/deep.jpeg';
                        } else if (project.id === 'optimum-fitness') {
                          e.currentTarget.src = '/images/optimum-.jpeg';
                        } else if (project.id === 'alices-tech-solutions') {
                          e.currentTarget.src = '/images/a.jpg';
                        }
                      }}
                      className={`relative z-10 w-full h-full ${
                        project.id === 'optimum-fitness' ||
                        project.id === 'het-creation' ||
                        project.id === 'deep-tuition-class'
                          ? 'object-contain'
                          : project.id === 'gatived-ev'
                          ? 'object-cover object-[center_50%] scale-[1.22] transition-transform duration-500 ease-out'
                          : project.id === 'the-urban-image'
                          ? 'object-cover object-[32%_52%] scale-[1.20] transition-transform duration-500 ease-out'
                          : project.id === 'alices-tech-solutions'
                          ? 'object-cover scale-[1.08] transition-transform duration-500 ease-out'
                          : 'object-cover'
                      }`}
                    />
                    <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-indigo-700 border border-indigo-100 shadow-xs">
                      {project.categoryLabel}
                    </div>
                    <div className="absolute top-3 right-3 z-20 bg-zinc-900/80 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono">
                      {project.year}
                    </div>
                    <div className="absolute inset-0 z-20 bg-transparent pointer-events-none flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-250 group-hover:scale-105 bg-white text-zinc-950 text-xs font-bold px-4 py-2 rounded-full shadow-md inline-flex items-center gap-1.5 pointer-events-auto">
                        <span>Inspect Case Study</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <p className={`text-[11px] font-bold text-[#3C2B99] uppercase tracking-wider transition-all duration-200 ${isHovered ? 'translate-x-0.5' : ''}`}>
                      {project.client}
                    </p>
                    <h3
                      onClick={() => onOpenProjectDetail(project)}
                      className={`text-xl font-bold mt-1 cursor-pointer transition-all duration-200 ${isHovered ? 'text-[#3C2B99] translate-x-1' : 'text-zinc-950'}`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Deliverables Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.deliverables.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] font-medium bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Key Metrics Strip */}
                    <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-zinc-100 text-center">
                      {project.results.map((res) => (
                        <div
                          key={res.label}
                          className="bg-indigo-50/50 rounded-xl py-2 px-1.5 border border-indigo-100/90 flex flex-col items-center justify-center min-h-[56px]"
                        >
                          <p className="text-[11px] sm:text-xs md:text-sm font-bold text-indigo-900 tracking-tight leading-tight line-clamp-1">
                            {res.metric}
                          </p>
                          <p className="text-[10px] text-zinc-500 truncate font-medium mt-0.5">
                            {res.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="px-6 pb-6 pt-2 border-t border-zinc-100 flex items-center gap-2">
                  <button
                    onClick={() => onOpenProjectDetail(project)}
                    className="flex-1 py-2.5 px-3 rounded-full border border-zinc-200 text-zinc-700 text-xs font-semibold hover:bg-zinc-50 transition-colors text-center"
                  >
                    View Details
                  </button>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group py-2.5 px-4 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all duration-200 inline-flex items-center gap-1 shrink-0 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{project.actionLabel || 'Visit Website'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : project.actionLabel === 'View Project' ? (
                    <button
                      onClick={() => onOpenProjectDetail(project)}
                      className="group py-2.5 px-4 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all duration-200 inline-flex items-center gap-1 shrink-0 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onRequestProject(project)}
                      className="group py-2.5 px-4 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all duration-200 inline-flex items-center gap-1 shrink-0 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Build Similar</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
