import React, { useEffect } from 'react';
import { X, ArrowRight, CheckCircle, Calendar, User, Tag, ExternalLink } from 'lucide-react';
import { PortfolioProject } from '../types';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onRequestQuote: (project: PortfolioProject) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestQuote,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-zinc-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image */}
        <div
          className={`relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden border-b border-zinc-200 flex items-center justify-center ${
            project.id === 'deep-tuition-class'
              ? 'bg-white'
              : project.id === 'het-creation'
              ? 'bg-[#fbf2e9]'
              : project.id === 'optimum-fitness'
              ? 'bg-[#1f292b]'
              : project.id === 'alices-tech-solutions'
              ? 'bg-white'
              : 'bg-zinc-950'
          }`}
        >
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
                    : 'blur-lg opacity-35 scale-110'
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
          <img
            src={project.image}
            alt={`${project.title} Detailed Project Showcase – Rudraksha Infotek`}
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
                ? 'max-h-full max-w-full object-contain'
                : project.id === 'gatived-ev'
                ? 'object-cover object-[center_50%] scale-[1.22]'
                : project.id === 'the-urban-image'
                ? 'object-cover object-[32%_52%] scale-[1.20]'
                : project.id === 'alices-tech-solutions'
                ? 'object-cover scale-[1.06]'
                : 'object-cover'
            }`}
          />
          <div className="absolute bottom-3 left-4 z-20 bg-[#3C2B99]/90 border border-[#D4B26B]/50 backdrop-blur-md text-white px-3.5 py-1 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4B26B]" />
            <span>{project.categoryLabel}</span>
          </div>
        </div>

        {/* Close Button - elevated z-50 and positioned over hero image to guarantee direct click capture */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/90 backdrop-blur-sm text-zinc-500 hover:text-zinc-950 border border-zinc-200 shadow-sm transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 pointer-events-none" />
        </button>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium mb-1">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#3C2B99]" />
                {project.client}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D4B26B]" />
                {project.year}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              {project.title}
            </h2>
            {project.liveUrl && (
              <div className="mt-2.5">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#3C2B99]/8 text-[#3C2B99] border border-[#D4B26B]/50 text-xs font-bold hover:bg-[#3C2B99]/15 transition-colors"
                >
                  <span>Visit Live Website ({project.liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')})</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4B26B]" />
                </a>
              </div>
            )}
            <p className="text-base text-zinc-600 mt-2.5 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Story & Challenge */}
          {project.fullStory && (
            <div className="bg-[#3C2B99]/5 border border-[#D4B26B]/30 rounded-2xl p-5">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#3C2B99] mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B26B]" />
                The Creative Approach & Impact
              </h4>
              <p className="text-sm text-zinc-700 leading-relaxed">
                {project.fullStory}
              </p>
            </div>
          )}

          {/* Deliverables */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-900 mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#3C2B99]" />
              Scope of Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs font-medium text-zinc-800 hover:border-[#D4B26B] transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#3C2B99] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Measured Outcomes / Feature Highlights */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-900 mb-3">
              Key Project Highlights
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              {project.results.map((res) => (
                <div key={res.label} className="p-3 bg-[#3C2B99]/5 rounded-2xl border border-[#D4B26B]/30 flex flex-col items-center justify-center min-h-[64px]">
                  <p className="text-base sm:text-lg font-bold text-[#3C2B99] tracking-tight">{res.metric}</p>
                  <p className="text-xs text-zinc-600 mt-0.5">{res.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3C2B99] hover:text-[#2d2073] transition-colors"
                >
                  <span>Open live site: {project.liveUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4B26B]" />
                </a>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="btn-secondary-lightgrey w-full sm:w-auto px-5 py-2.5 rounded-full border text-sm font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onRequestQuote(project);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#3C2B99] hover:bg-[#3C2B99] border border-[#D4B26B]/50 hover:border-[#3C2B99] text-white text-sm font-semibold transition-all duration-250 ease-out shadow-sm hover:shadow-lg hover:shadow-[#3C2B99]/25 cursor-pointer group"
              >
                <span>Build A Similar Solution</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-white transition-transform duration-250 ease-out group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
