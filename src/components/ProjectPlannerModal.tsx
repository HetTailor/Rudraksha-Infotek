import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Calculator, Sparkles } from 'lucide-react';
import { ServiceCategory } from '../types';
import { COMPANY_INFO } from '../data/siteData';

interface ProjectPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToContact: (service: string, customMessage: string) => void;
}

export const ProjectPlannerModal: React.FC<ProjectPlannerModalProps> = ({
  isOpen,
  onClose,
  onProceedToContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('website');
  const [timeline, setTimeline] = useState<'express' | 'standard' | 'flexible'>('standard');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Responsive Design',
    'SEO Optimization',
  ]);

  if (!isOpen) return null;

  const featureOptions: Record<ServiceCategory, { name: string; desc: string }[]> = {
    website: [
      { name: 'Responsive Design', desc: 'Mobile, tablet, desktop pixel-perfect adaptivity' },
      { name: 'SEO Optimization', desc: 'Metadata, schema structures & speed tuning' },
      { name: 'Content Management', desc: 'Easily update text, projects, and products' },
      { name: 'Lead Forms & WhatsApp', desc: 'Instant inquiry routing to phone and inbox' },
      { name: 'E-commerce Checkout', desc: 'Secure payment gateway & catalogue' },
    ],
    social: [
      { name: 'Monthly Content Grid', desc: '12-20 bespoke aesthetic posts & reels' },
      { name: 'Instagram & Facebook Ads', desc: 'Targeted audience reach and retargeting' },
      { name: 'Festival & Event Creatives', desc: 'Seasonal promotional banners' },
      { name: 'Copywriting & Hashtags', desc: 'High-converting captions and engagement tags' },
      { name: 'Monthly Analytics Report', desc: 'KPI breakdown and growth trajectory' },
    ],
    graphic: [
      { name: 'Primary & Secondary Logo', desc: 'Vector scalable logo suite' },
      { name: 'Brand Style Guide', desc: 'Typography pairing, color codes & rules' },
      { name: 'Stationery & Business Cards', desc: 'Print-ready luxury layout specs' },
      { name: 'Brochures & Flyers', desc: 'Promotional marketing handouts' },
      { name: 'Social Media Templates', desc: 'Editable Canva/PSD templates' },
    ],
  };

  const toggleFeature = (name: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const handleFinish = () => {
    const serviceName =
      selectedCategory === 'website'
        ? 'Website Designing'
        : selectedCategory === 'social'
        ? 'Social Media Marketing'
        : 'Graphic Designing';

    const msg = `Configured Project: ${serviceName} (${timeline.toUpperCase()} timeline).\nSelected Features: ${selectedFeatures.join(', ')}.`;
    onProceedToContact(selectedCategory, msg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl border border-zinc-200 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 mb-2">
          <Calculator className="w-4 h-4 text-zinc-900" />
          <span>Interactive Project Configurator</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
          Plan Your Digital Project
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Select your desired service, features, and timeline for a customized proposal from {COMPANY_INFO.founder}.
        </p>

        {/* 1. Category Switcher */}
        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 block mb-2">
            1. Select Primary Service
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'website', label: 'Website Design' },
              { id: 'social', label: 'Social Marketing' },
              { id: 'graphic', label: 'Graphic Design' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as ServiceCategory);
                  setSelectedFeatures([]);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Feature Selector */}
        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 block mb-2">
            2. Choose Capabilities / Requirements
          </label>
          <div className="space-y-2">
            {featureOptions[selectedCategory].map((feature) => {
              const isSelected = selectedFeatures.includes(feature.name);
              return (
                <div
                  key={feature.name}
                  onClick={() => toggleFeature(feature.name)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-zinc-50 border-zinc-900 text-zinc-950'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <p className="text-xs sm:text-sm font-bold">{feature.name}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{feature.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-zinc-950 border-zinc-950 text-white'
                        : 'border-zinc-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Timeline Choice */}
        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 block mb-2">
            3. Target Timeline
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'express', label: 'Express (1-2 Weeks)' },
              { id: 'standard', label: 'Standard (2-4 Weeks)' },
              { id: 'flexible', label: 'Flexible / Phased' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeline(t.id as any)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                  timeline === t.id
                    ? 'bg-zinc-950 text-white border-zinc-950'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="mt-8 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-600">
            Selected: <strong className="text-zinc-900">{selectedFeatures.length} features</strong>
          </div>
          <button
            onClick={handleFinish}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 text-white text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <span>Proceed to Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
