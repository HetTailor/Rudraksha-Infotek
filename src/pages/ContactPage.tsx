import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  ExternalLink,
  Globe,
  Share2,
  Palette,
  Clock,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { InquiryFormData } from '../types';
import { transferInquiryToEmail, TARGET_INBOX_EMAIL } from '../utils/formSubmit';

const contactTitleWordsLine1 = ["Let's", "Build", "Something"];
const contactTitleWordsLine2 = ["Amazing", "Together"];

const letterOutlineLine1: React.CSSProperties = {
  WebkitTextStroke: '1px #09090b',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

const letterOutlineLine2: React.CSSProperties = {
  WebkitTextStroke: '1px #3C2B99',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

const CenterOutLetter: React.FC<{
  char: string;
  isExpanding: boolean;
  outlineStyle: React.CSSProperties;
  fillColorClass: string;
}> = ({ char, isExpanding, outlineStyle, fillColorClass }) => {
  return (
    <span
      className="relative inline-block select-none"
      style={{ transformOrigin: 'center center' }}
    >
      {/* Invisible layout spacer maintaining exact typographic metrics */}
      <span className="invisible select-none" aria-hidden="true">
        {char}
      </span>

      {/* 1. Outline layer: begins as a small outline at the center of this letter and expands outward */}
      <motion.span
        initial={{ scale: 0.15, opacity: 0 }}
        animate={
          isExpanding
            ? {
                scale: [0.15, 1, 1],
                opacity: [0, 1, 1],
              }
            : undefined
        }
        transition={{
          duration: 0.9,
          times: [0, 0.45, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformOrigin: 'center center',
          ...outlineStyle,
        }}
        className="absolute inset-0 block text-center pointer-events-none select-none"
        aria-hidden="true"
      >
        {char}
      </motion.span>

      {/* 2. Solid fill layer: gradually fills the inside with the original text color */}
      <motion.span
        initial={{ scale: 0.2, opacity: 0 }}
        animate={
          isExpanding
            ? {
                scale: [0.2, 0.2, 1],
                opacity: [0, 0, 1],
              }
            : undefined
        }
        transition={{
          duration: 0.9,
          times: [0, 0.4, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: 'center center' }}
        className={`absolute inset-0 block text-center pointer-events-none select-none ${fillColorClass}`}
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const projectParam = searchParams.get('project');

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    service: 'Website Designing',
    budgetRange: 'Starter / Standard',
    message: '',
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [isActivating, setIsActivating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Center-Out Letter Expansion animation state for Contact Page main title
  const titleLetterRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleLetterRef, { once: true, amount: 0.2 });
  const [isLetterExpanding, setIsLetterExpanding] = useState(false);
  const [isLetterComplete, setIsLetterComplete] = useState(false);

  useEffect(() => {
    if (isTitleInView && !isLetterExpanding && !isLetterComplete) {
      const timer = setTimeout(() => setIsLetterExpanding(true), 80);
      return () => clearTimeout(timer);
    }
  }, [isTitleInView, isLetterExpanding, isLetterComplete]);

  // Guaranteed fallback for iframe / immediate load
  useEffect(() => {
    const fallback = setTimeout(() => {
      setIsLetterExpanding(true);
    }, 250);
    return () => clearTimeout(fallback);
  }, []);

  // Complete letter expansion and lock title permanently into stable original state
  useEffect(() => {
    if (isLetterExpanding && !isLetterComplete) {
      const lockTimer = setTimeout(() => {
        setIsLetterComplete(true);
      }, 980);
      return () => clearTimeout(lockTimer);
    }
  }, [isLetterExpanding, isLetterComplete]);

  // Active field tracking for the traveling perimeter signal
  const [activeField, setActiveField] = useState<string | null>(null);

  // Scroll progress for viewport indicator
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (serviceParam) {
      if (serviceParam.toLowerCase().includes('web')) {
        setFormData((prev) => ({ ...prev, service: 'Website Designing' }));
      } else if (serviceParam.toLowerCase().includes('soc')) {
        setFormData((prev) => ({ ...prev, service: 'Social Media Marketing' }));
      } else if (serviceParam.toLowerCase().includes('graph')) {
        setFormData((prev) => ({ ...prev, service: 'Graphic Designing' }));
      }
    }

    if (projectParam) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Het, I reviewed your work on "${projectParam}" and would like to build a similar project for our brand.`,
      }));
    }
  }, [serviceParam, projectParam]);

  const validatePhone = (rawPhone: string): string | null => {
    const trimmed = rawPhone.trim();
    if (!trimmed) {
      return 'Please enter your phone / WhatsApp number.';
    }
    const cleanDigits = trimmed.replace(/\D/g, '');
    const validFormatRegex = /^(\+?[0-9\s\-().]{7,25})$/;
    if (!validFormatRegex.test(trimmed) || cleanDigits.length < 7 || cleanDigits.length > 15) {
      return 'Please enter a valid phone / WhatsApp number.';
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneBlur = () => {
    setActiveField(null);
    if (formData.phone) {
      const phoneErr = validatePhone(formData.phone);
      if (phoneErr) {
        setErrors((prev) => ({ ...prev, phone: phoneErr }));
      }
    }
  };

  // Purely visual form progress calculation (0 to 100%) - NO new text displayed
  const filledCount =
    (formData.fullName.trim().length > 1 ? 1 : 0) +
    (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) ? 1 : 0) +
    (Boolean(formData.phone.trim().replace(/\D/g, '').length >= 7) ? 1 : 0) +
    (Boolean(formData.service) ? 1 : 0) +
    (Boolean(formData.budgetRange) ? 1 : 0) +
    (formData.message.trim().length > 5 ? 1 : 0);
  const visualProgressPct = Math.round((filledCount / 6) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      fullName?: string;
      email?: string;
      phone?: string;
      message?: string;
    } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) {
      newErrors.phone = phoneErr;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your project & goals.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.phone && (!newErrors.fullName && !newErrors.email)) {
        phoneInputRef.current?.focus();
      } else if (newErrors.fullName) {
        document.getElementById('fullName')?.focus();
      } else if (newErrors.email) {
        document.getElementById('email')?.focus();
      } else if (newErrors.phone) {
        phoneInputRef.current?.focus();
      } else if (newErrors.message) {
        document.getElementById('message')?.focus();
      }
      return;
    }

    // Smooth activation feedback on click
    setIsActivating(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    setIsActivating(false);
    setIsSubmitting(true);

    // Directly transfer full form inquiry to rudraksha.infotek@gmail.com
    await transferInquiryToEmail(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hi Het (RUDRAKSHA INFOTEK),\n\nName: ${formData.fullName || 'Prospective Client'}\nService: ${formData.service}\nBudget: ${formData.budgetRange}\nMessage: ${formData.message || 'I would like to discuss a digital project.'}`
    );
    return `https://wa.me/919726803078?text=${text}`;
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Project Inquiry: [${formData.service}] - ${formData.fullName || 'New Client'}`);
    const body = encodeURIComponent(
      `Hi Het (RUDRAKSHA INFOTEK),\n\nI would like to request a consultation and quote.\n\n` +
      `Client Name: ${formData.fullName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Service Required: ${formData.service}\n` +
      `Budget Range: ${formData.budgetRange}\n\n` +
      `Project Brief / Message:\n${formData.message}\n\n` +
      `Sent to: ${TARGET_INBOX_EMAIL}`
    );
    return `mailto:${TARGET_INBOX_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative pt-20 pb-20 bg-[#FAFAFA] min-h-screen">
      {/* Scroll indicator signal rail at top of viewport */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#3C2B99] via-[#D4B26B] to-[#3C2B99] transition-all duration-150 ease-out"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {/* SVG Definitions for traveling Indigo & Gold field signals */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="contact-field-indigo-beam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3C2B99" stopOpacity="0" />
            <stop offset="35%" stopColor="#3C2B99" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#D4B26B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3C2B99" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle technical background grid & ambient light fields */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#3C2B99 1px, transparent 1px), radial-gradient(#D4B26B 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px',
          }}
        />
        <div className="absolute -top-[12%] right-[4%] w-[680px] h-[680px] rounded-full bg-[#3C2B99]/[0.035] blur-[120px] animate-lightfield-indigo pointer-events-none" />
        <div className="absolute top-[38%] -left-[8%] w-[580px] h-[580px] rounded-full bg-[#D4B26B]/[0.028] blur-[130px] animate-lightfield-gold pointer-events-none" />
      </div>

      {/* =========================================================================
          PAGE HEADER / HERO
          100% PRESERVED TEXT:
          - "Request a Quote & Consultation"
          - "Let's Build Something Amazing Together"
          - Supporting paragraph
          ========================================================================= */}
      <section className="relative z-10 py-14 md:py-20 bg-white border-b border-zinc-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4B26B]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3C2B99]/8 border border-[#D4B26B]/50 text-[#3C2B99] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4B26B]" />
              <span>Request a Quote &amp; Consultation</span>
            </div>

            {/* Heading: Unique "Center-Out Letter Expansion" Animation */}
            <div ref={titleLetterRef} className="relative py-2 -my-2">
              {isLetterComplete ? (
                <h1
                  style={{ transform: 'none' }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.18] sm:leading-[1.15] pt-1 pb-4 px-1 select-text"
                >
                  Let&apos;s Build Something <br className="hidden sm:inline" />
                  <span className="text-[#3C2B99]">
                    Amazing Together
                  </span>
                </h1>
              ) : (
                <h1
                  aria-label="Let's Build Something Amazing Together"
                  style={{ transform: 'none' }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.18] sm:leading-[1.15] pt-1 pb-4 px-1 select-text"
                >
                  <span className="inline-block">
                    {contactTitleWordsLine1.map((word, wIdx) => (
                      <React.Fragment key={`w1-${wIdx}`}>
                        <span className="inline-block whitespace-nowrap">
                          {word.split('').map((char, cIdx) => (
                            <CenterOutLetter
                              key={`c1-${cIdx}`}
                              char={char}
                              isExpanding={isLetterExpanding}
                              outlineStyle={letterOutlineLine1}
                              fillColorClass="text-zinc-950"
                            />
                          ))}
                        </span>
                        {wIdx < contactTitleWordsLine1.length - 1 ? ' ' : ''}
                      </React.Fragment>
                    ))}
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  <span className="text-[#3C2B99] inline-block">
                    {contactTitleWordsLine2.map((word, wIdx) => (
                      <React.Fragment key={`w2-${wIdx}`}>
                        <span className="inline-block whitespace-nowrap">
                          {word.split('').map((char, cIdx) => (
                            <CenterOutLetter
                              key={`c2-${cIdx}`}
                              char={char}
                              isExpanding={isLetterExpanding}
                              outlineStyle={letterOutlineLine2}
                              fillColorClass="text-[#3C2B99]"
                            />
                          ))}
                        </span>
                        {wIdx < contactTitleWordsLine2.length - 1 ? ' ' : ''}
                      </React.Fragment>
                    ))}
                  </span>
                </h1>
              )}
            </div>

            {/* Gold Accent Line: draws from center outward */}
            <div className="pt-2 pb-1 overflow-hidden flex items-center">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                style={{ transformOrigin: 'center' }}
                className="h-[2.5px] w-32 bg-gradient-to-r from-transparent via-[#D4B26B] to-transparent rounded-full"
              />
            </div>

            {/* Supporting Text: horizontal signal reveal */}
            <div className="relative pl-4 border-l-2 border-zinc-200">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
                className="absolute top-0 left-[-2px] bottom-0 w-[2px] bg-[#D4B26B] origin-top"
              />
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
                className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal"
              >
                Have a project in mind? Tell us what you need, and our digital growth team will prepare a custom strategy roadmap and proposal.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CUSTOM DIGITAL SIGNAL DIVIDER (VISUAL ONLY - NO NEW TEXT)
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative w-full h-[1.5px] bg-zinc-200/60 rounded-full overflow-hidden">
          <div className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-[#3C2B99] to-[#D4B26B] animate-contact-telemetry rounded-full pointer-events-none" />
        </div>
      </div>

      {/* =========================================================================
          MAIN FORM & CONTACT INFORMATION
          ========================================================================= */}
      <section className="relative z-10 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
            {/* Visual subtle connector line between Left and Right columns (visual only) */}
            <div className="hidden lg:block absolute left-[41.6%] top-14 w-[8.3%] h-[2px] pointer-events-none z-0" aria-hidden="true">
              <div className="w-full h-full bg-gradient-to-r from-zinc-200 via-[#D4B26B]/30 to-zinc-200" />
            </div>

            {/* Left Column: Official Profile Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-sm transition-all duration-300">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#3C2B99] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-0.5 bg-[#D4B26B]" />
                    Official Agency Contacts
                  </span>
                  <h2 className="text-2xl font-bold text-zinc-950 mt-1">
                    {COMPANY_INFO.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-zinc-600 mt-1">
                    Modern IT &amp; Creative Solutions Company
                  </p>
                </div>

                {/* Founder Card */}
                <div className="p-4 rounded-2xl bg-[#3C2B99]/5 border border-[#D4B26B]/30 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#3C2B99] text-white flex items-center justify-center font-mono font-bold text-base shrink-0 border border-[#D4B26B]/50 shadow-xs">
                    HT
                  </div>
                  <div>
                    <span className="text-[11px] text-[#3C2B99] font-bold uppercase tracking-wider block">
                      {COMPANY_INFO.role}
                    </span>
                    <h3 className="text-base font-bold text-zinc-950">
                      {COMPANY_INFO.founder}
                    </h3>
                    <p className="text-xs text-zinc-600">
                      Direct consultation on all new client briefs
                    </p>
                  </div>
                </div>

                {/* Core Services */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
                    Available Services:
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <Globe className="w-4 h-4 text-[#3C2B99]" />
                      <span>Website Designing &amp; Development</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <Share2 className="w-4 h-4 text-[#3C2B99]" />
                      <span>Social Media Marketing &amp; Growth</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
                      <Palette className="w-4 h-4 text-[#3C2B99]" />
                      <span>Graphic Designing &amp; Visual Identity</span>
                    </div>
                  </div>
                </div>

                {/* Quick Touchpoints: 100% Static on hover */}
                <div className="pt-4 border-t border-zinc-200 space-y-3">
                  {/* Email: Completely static, zero hover reaction */}
                  <a
                    id="contact-touchpoint-email"
                    href={`mailto:${COMPANY_INFO.email}`}
                    style={{ backgroundColor: 'rgba(244, 244, 245, 0.6)', borderColor: 'rgba(228, 228, 231, 0.7)' }}
                    className="flex items-center gap-3 text-xs sm:text-sm text-zinc-700 p-3 rounded-2xl border cursor-pointer select-text pointer-events-auto"
                  >
                    <div
                      style={{ backgroundColor: 'rgba(60, 43, 153, 0.1)', borderColor: 'rgba(212, 178, 107, 0.3)' }}
                      className="contact-icon-box w-9 h-9 rounded-full text-[#3C2B99] border flex items-center justify-center shrink-0"
                    >
                      <Mail className="w-4 h-4 text-[#3C2B99]" />
                    </div>
                    <div>
                      <span className="contact-label text-[10px] text-zinc-400 uppercase block font-bold tracking-wider">Email</span>
                      <span className="contact-value font-semibold text-zinc-900">{COMPANY_INFO.email}</span>
                    </div>
                  </a>

                  {/* WhatsApp / Direct: Completely static, zero hover reaction */}
                  <a
                    id="contact-touchpoint-whatsapp"
                    href="https://wa.me/919726803078"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: 'rgba(244, 244, 245, 0.6)', borderColor: 'rgba(228, 228, 231, 0.7)' }}
                    className="flex items-center gap-3 text-xs sm:text-sm text-zinc-700 p-3 rounded-2xl border cursor-pointer select-text pointer-events-auto"
                  >
                    <div
                      style={{ backgroundColor: 'rgba(60, 43, 153, 0.1)', borderColor: 'rgba(212, 178, 107, 0.3)' }}
                      className="contact-icon-box w-9 h-9 rounded-full text-[#3C2B99] border flex items-center justify-center shrink-0"
                    >
                      <Phone className="w-4 h-4 text-[#3C2B99]" />
                    </div>
                    <div>
                      <span className="contact-label text-[10px] text-zinc-400 uppercase block font-bold tracking-wider">WhatsApp / Direct</span>
                      <span className="contact-value font-semibold text-zinc-900">{COMPANY_INFO.phone}</span>
                    </div>
                  </a>
                </div>

                <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4B26B] shrink-0" />
                  <span>Expect initial response within 24 business hours</span>
                </div>
              </div>
            </div>

            {/* Right Column: Project Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="relative bg-white rounded-3xl border border-zinc-200 animate-form-entry p-6 sm:p-10 shadow-sm transition-all duration-300">
                {submitted ? (
                  <div className="text-center py-10 space-y-5 animate-in fade-in">
                    <div className="w-16 h-16 rounded-full bg-[#3C2B99] border-2 border-[#D4B26B] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8 text-[#D4B26B]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-950">
                        Inquiry Received &amp; Transferred!
                      </h2>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#3C2B99]/8 text-[#3C2B99] text-xs font-semibold border border-[#D4B26B]/50">
                        <Mail className="w-3.5 h-3.5 text-[#3C2B99]" />
                        <span>Transferred to {TARGET_INBOX_EMAIL}</span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-zinc-900">{formData.fullName}</strong>. Your project brief has been sent to founder Het Tailor at <strong className="text-[#3C2B99]">{TARGET_INBOX_EMAIL}</strong>. We will review your scope and follow up promptly.
                    </p>

                    {/* Brief Summary Box */}
                    <div className="max-w-md mx-auto p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-left text-xs space-y-2">
                      <div className="flex justify-between border-b border-zinc-200 pb-1.5 font-medium text-zinc-600">
                        <span>Service:</span>
                        <span className="font-semibold text-zinc-900">{formData.service}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-200 pb-1.5 font-medium text-zinc-600">
                        <span>Budget:</span>
                        <span className="font-semibold text-zinc-900">{formData.budgetRange}</span>
                      </div>
                      <div className="flex justify-between font-medium text-zinc-600">
                        <span>Client Email:</span>
                        <span className="font-semibold text-zinc-900">{formData.email}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#3C2B99] hover:bg-[#3C2B99] border border-[#D4B26B]/50 hover:border-[#3C2B99] text-white text-xs font-semibold transition-all duration-250 ease-out shadow-sm cursor-pointer group"
                      >
                        <span>Send Instant Copy via WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5 text-white" />
                      </a>
                      <a
                        href={getMailtoLink()}
                        className="btn-secondary-lightgrey w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border text-xs font-semibold cursor-pointer group"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Mail App</span>
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-secondary-lightgrey w-full sm:w-auto px-5 py-3 rounded-full border text-xs font-semibold cursor-pointer"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="border-b border-zinc-100 pb-4 relative">
                      <h2 className="text-2xl font-bold text-zinc-950">
                        Request a Free Proposal
                      </h2>
                      <p className="text-xs text-zinc-500 mt-1">
                        Tell us about your brand goals. We will prepare an initial roadmap and quote.
                      </p>

                      {/* Visual-only progress track (no new text) */}
                      <div className="mt-3 relative h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#3C2B99] via-[#D4B26B] to-[#3C2B99] transition-all duration-400 ease-out"
                          style={{ width: `${Math.max(visualProgressPct, 8)}%` }}
                        />
                      </div>
                    </div>

                    {/* Service Chooser */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-2">
                        Select Service Category *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {['Website Designing', 'Social Media Marketing', 'Graphic Designing'].map((svc) => (
                          <button
                            type="button"
                            key={svc}
                            onFocus={() => setActiveField('service')}
                            onBlur={() => setActiveField(null)}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, service: svc }));
                              setActiveField('service');
                            }}
                            className={`p-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer relative overflow-hidden ${
                              formData.service === svc
                                ? 'bg-[#3C2B99] text-white border-[#D4B26B] shadow-xs'
                                : 'btn-secondary-lightgrey hover:border-zinc-300'
                            }`}
                          >
                            {formData.service === svc && (
                              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#D4B26B]" />
                            )}
                            {svc}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="relative">
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                        >
                          Full Name *
                        </label>
                        <div className="relative rounded-xl overflow-hidden">
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onFocus={() => setActiveField('fullName')}
                            onBlur={() => setActiveField(null)}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all duration-200 ${
                              errors.fullName
                                ? 'border-red-500 bg-red-50/20 ring-2 ring-red-100'
                                : activeField === 'fullName'
                                ? 'border-[#3C2B99] bg-white ring-1 ring-[#3C2B99]/30'
                                : 'border-zinc-200/90 bg-[#FAFAFA] hover:border-zinc-300 hover:bg-zinc-50/70'
                            }`}
                          />
                          {/* Subtle traveling Indigo perimeter signal when field is active */}
                          {activeField === 'fullName' && !errors.fullName && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl">
                              <rect
                                x="1"
                                y="1"
                                width="calc(100% - 2px)"
                                height="calc(100% - 2px)"
                                rx="11"
                                fill="none"
                                stroke="url(#contact-field-indigo-beam)"
                                strokeWidth="1.5"
                                pathLength="100"
                                strokeDasharray="18 82"
                                className="animate-field-beam"
                              />
                            </svg>
                          )}
                        </div>
                        {errors.fullName && (
                          <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="relative">
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                        >
                          Email Address *
                        </label>
                        <div className="relative rounded-xl overflow-hidden">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onFocus={() => setActiveField('email')}
                            onBlur={() => setActiveField(null)}
                            onChange={handleChange}
                            placeholder="name@business.com"
                            className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all duration-200 ${
                              errors.email
                                ? 'border-red-500 bg-red-50/20 ring-2 ring-red-100'
                                : activeField === 'email'
                                ? 'border-[#3C2B99] bg-white ring-1 ring-[#3C2B99]/30'
                                : 'border-zinc-200/90 bg-[#FAFAFA] hover:border-zinc-300 hover:bg-zinc-50/70'
                            }`}
                          />
                          {/* Subtle traveling Indigo perimeter signal when field is active */}
                          {activeField === 'email' && !errors.email && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl">
                              <rect
                                x="1"
                                y="1"
                                width="calc(100% - 2px)"
                                height="calc(100% - 2px)"
                                rx="11"
                                fill="none"
                                stroke="url(#contact-field-indigo-beam)"
                                strokeWidth="1.5"
                                pathLength="100"
                                strokeDasharray="18 82"
                                className="animate-field-beam"
                              />
                            </svg>
                          )}
                        </div>
                        {errors.email && (
                          <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone / WhatsApp */}
                      <div className="relative">
                        <label
                          htmlFor="phone"
                          className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                        >
                          Phone / WhatsApp Number *
                        </label>
                        <div className="relative rounded-xl overflow-hidden">
                          <input
                            ref={phoneInputRef}
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onFocus={() => setActiveField('phone')}
                            onBlur={handlePhoneBlur}
                            onChange={handleChange}
                            placeholder="+91 97268 03078"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                            className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all duration-200 ${
                              errors.phone
                                ? 'border-red-500 bg-red-50/20 ring-2 ring-red-100'
                                : activeField === 'phone'
                                ? 'border-[#3C2B99] bg-white ring-1 ring-[#3C2B99]/30'
                                : 'border-zinc-200/90 bg-[#FAFAFA] hover:border-zinc-300 hover:bg-zinc-50/70'
                            }`}
                          />
                          {/* Subtle traveling Indigo perimeter signal when field is active */}
                          {activeField === 'phone' && !errors.phone && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl">
                              <rect
                                x="1"
                                y="1"
                                width="calc(100% - 2px)"
                                height="calc(100% - 2px)"
                                rx="11"
                                fill="none"
                                stroke="url(#contact-field-indigo-beam)"
                                strokeWidth="1.5"
                                pathLength="100"
                                strokeDasharray="18 82"
                                className="animate-field-beam"
                              />
                            </svg>
                          )}
                        </div>
                        {errors.phone && (
                          <p id="phone-error" className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Expected Budget Bracket */}
                      <div className="relative">
                        <label
                          htmlFor="budgetRange"
                          className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                        >
                          Expected Budget Bracket
                        </label>
                        <div className="relative rounded-xl overflow-hidden">
                          <select
                            id="budgetRange"
                            name="budgetRange"
                            value={formData.budgetRange}
                            onFocus={() => setActiveField('budgetRange')}
                            onBlur={() => setActiveField(null)}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 focus:outline-none transition-all duration-200 cursor-pointer ${
                              activeField === 'budgetRange'
                                ? 'border-[#3C2B99] bg-white ring-1 ring-[#3C2B99]/30'
                                : 'border-zinc-200/90 bg-[#FAFAFA] hover:border-zinc-300 hover:bg-zinc-50/70'
                            }`}
                          >
                            <option value="Starter / Standard">Starter / Standard Project</option>
                            <option value="Growth / Scaling">Growth / Scaling Brand</option>
                            <option value="Enterprise / Full Suite">Enterprise / Full Digital Suite</option>
                          </select>
                          {activeField === 'budgetRange' && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl">
                              <rect
                                x="1"
                                y="1"
                                width="calc(100% - 2px)"
                                height="calc(100% - 2px)"
                                rx="11"
                                fill="none"
                                stroke="url(#contact-field-indigo-beam)"
                                strokeWidth="1.5"
                                pathLength="100"
                                strokeDasharray="18 82"
                                className="animate-field-beam"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="relative">
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                      >
                        Tell Us About Your Project &amp; Goals *
                      </label>
                      <div className="relative rounded-xl overflow-hidden">
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onFocus={() => setActiveField('message')}
                          onBlur={() => setActiveField(null)}
                          onChange={handleChange}
                          placeholder="Describe what you want to achieve, timeline targets, existing websites or references..."
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all duration-200 resize-y ${
                            errors.message
                              ? 'border-red-500 bg-red-50/20 ring-2 ring-red-100'
                              : activeField === 'message'
                              ? 'border-[#3C2B99] bg-white ring-1 ring-[#3C2B99]/30'
                              : 'border-zinc-200/90 bg-[#FAFAFA] hover:border-zinc-300 hover:bg-zinc-50/70'
                          }`}
                        />
                        {activeField === 'message' && !errors.message && (
                          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl">
                            <rect
                              x="1"
                              y="1"
                              width="calc(100% - 2px)"
                              height="calc(100% - 2px)"
                              rx="11"
                              fill="none"
                              stroke="url(#contact-field-indigo-beam)"
                              strokeWidth="1.5"
                              pathLength="100"
                              strokeDasharray="18 82"
                              className="animate-field-beam"
                            />
                          </svg>
                        )}
                      </div>
                      {errors.message && (
                        <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submission Button & Links (100% preserved text) */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || isActivating}
                        id="contact-submit-btn"
                        className="btn-request-quote relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#3C2B99] border border-[#D4B26B]/50 hover:border-[#D9D9D9] text-white font-semibold text-sm cursor-pointer group"
                      >
                        {/* Controlled Light Sweep across the button */}
                        <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] -translate-x-[160%] group-hover:translate-x-[360%] transition-transform duration-700 ease-out pointer-events-none" />

                        {/* Submission charging pulse line */}
                        {isActivating && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4B26B] animate-pulse pointer-events-none" />
                        )}

                        {isSubmitting ? (
                          <span className="relative z-10">Sending Brief...</span>
                        ) : (
                          <>
                            <span className="relative z-10">Request a Quote</span>
                            <ArrowRight className="relative z-10 w-4 h-4 stroke-[2.5] transition-transform duration-250 ease-out group-hover:translate-x-1.5" />
                          </>
                        )}
                      </button>

                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#3C2B99] hover:text-[#2d2073] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>Need faster response? WhatsApp Het directly</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#D4B26B]" />
                      </a>
                    </div>

                    <div className="pt-2 border-t border-zinc-100 flex items-center gap-2 text-[11px] text-zinc-500">
                      <Mail className="w-3.5 h-3.5 text-[#3C2B99] shrink-0" />
                      <span>
                        Your project inquiry will be delivered directly to{' '}
                        <strong className="text-zinc-700 font-semibold">{TARGET_INBOX_EMAIL}</strong>
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
