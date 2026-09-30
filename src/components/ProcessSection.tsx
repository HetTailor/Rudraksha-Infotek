import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/siteData';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="process" className="py-20 md:py-28 bg-[#FAFAFA] border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 mb-3 shadow-2xs">
            <span>Workflow & Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950">
            Our Process
          </h2>
          <p className="mt-2 text-xl font-semibold text-zinc-700">
            From Idea to Digital Reality
          </p>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed">
            A structured, transparent 5-step methodology that ensures seamless communication, zero surprises, and exceptional deliverables.
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-8">
          {PROCESS_STEPS.map((step, idx) => (
            <button
              key={step.number}
              id={`process-step-btn-${idx}`}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 sm:p-4 rounded-xl text-left border transition-all ${
                activeStepIndex === idx
                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                  : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <span
                className={`font-mono text-xs font-bold block mb-1 ${
                  activeStepIndex === idx ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                {step.number}
              </span>
              <span className="text-xs sm:text-sm font-bold block">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-mono font-bold text-zinc-800">
                <span>Phase {PROCESS_STEPS[activeStepIndex].number} of 05</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                {PROCESS_STEPS[activeStepIndex].title}
              </h3>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                {PROCESS_STEPS[activeStepIndex].description}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
                  Key Milestones & Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PROCESS_STEPS[activeStepIndex].details.map((detail) => (
                    <div
                      key={detail}
                      className="p-3 rounded-xl bg-[#FAFAFA] border border-zinc-200/70 text-xs font-medium text-zinc-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#FAFAFA] rounded-2xl border border-zinc-200/80 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-900 text-white font-mono font-bold text-xl flex items-center justify-center mb-3">
                {PROCESS_STEPS[activeStepIndex].number}
              </div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Milestone Focus
              </p>
              <p className="text-sm font-bold text-zinc-900 mt-1">
                {PROCESS_STEPS[activeStepIndex].title} Phase
              </p>
              <button
                onClick={() =>
                  setActiveStepIndex((prev) => (prev + 1) % PROCESS_STEPS.length)
                }
                className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-zinc-900 hover:text-zinc-600"
              >
                <span>Next Milestone</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Timeline Summary */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="p-4 bg-white rounded-xl border border-zinc-200/70 text-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-zinc-500">{step.number}</span>
                <span className="w-2 h-2 rounded-full bg-zinc-300" />
              </div>
              <p className="font-bold text-zinc-950">{step.title}</p>
              <p className="text-zinc-600 text-[11px] mt-1 line-clamp-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
