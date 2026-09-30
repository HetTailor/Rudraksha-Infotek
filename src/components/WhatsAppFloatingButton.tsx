import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  // Pre-filled message for immediate client engagement
  const defaultMessage = encodeURIComponent(
    `Hi Het! I'm reaching out via the RUDRAKSHA INFOTEK website. I would like to get a quick quote and discuss a digital project for my business.`
  );

  const phoneDigits = COMPANY_INFO.phone.replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${phoneDigits}?text=${defaultMessage}`;

  return (
    <div
      id="whatsapp-floating-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 print:hidden"
    >
      {/* Floating Tooltip Bubble */}
      {showTooltip && (
        <div className="relative group max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-300">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-lightgrey text-xs py-2.5 px-3.5 pr-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-2 font-medium transition-colors duration-250 cursor-pointer block"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4B26B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3C2B99]"></span>
            </span>
            <span>
              Chat with <strong className="font-bold">Het Tailor</strong> on WhatsApp!
            </span>
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Dismiss message preview"
            className="absolute top-2 right-2 p-1 text-[#3C2B99] hover:text-zinc-900 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Floating Action Button */}
      <a
        id="whatsapp-fab-button"
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly with RUDRAKSHA INFOTEK on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        {/* Pulsing halo */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-pulse pointer-events-none" />

        {/* Message Icon */}
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-[2.2] group-hover:rotate-12 transition-transform duration-200 relative z-10" />

        {/* Expanded hover label on desktop */}
        <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 bg-zinc-900/90 text-white text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-md">
          Quick Inquiry on WhatsApp
        </span>
      </a>
    </div>
  );
};
