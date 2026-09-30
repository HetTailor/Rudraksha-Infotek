import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, Phone, Mail, User, Globe, Share2, Palette, MessageSquare, ExternalLink, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { InquiryFormData } from '../types';
import { transferInquiryToEmail, TARGET_INBOX_EMAIL } from '../utils/formSubmit';

interface ContactSectionProps {
  preselectedService?: string;
  preselectedProject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  preselectedProject,
}) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      if (preselectedService === 'website') setFormData((prev) => ({ ...prev, service: 'Website Designing' }));
      else if (preselectedService === 'social') setFormData((prev) => ({ ...prev, service: 'Social Media Marketing' }));
      else if (preselectedService === 'graphic') setFormData((prev) => ({ ...prev, service: 'Graphic Designing' }));
    }
    if (preselectedProject) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Het, I saw your portfolio project "${preselectedProject}" and would love to build something similar for my business.`,
      }));
    }
  }, [preselectedService, preselectedProject]);

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
    if (formData.phone) {
      const phoneErr = validatePhone(formData.phone);
      if (phoneErr) {
        setErrors((prev) => ({ ...prev, phone: phoneErr }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      fullName?: string;
      email?: string;
      phone?: string;
      message?: string;
    } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
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
      newErrors.message = 'Please provide details about your project.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.phone && !newErrors.fullName && !newErrors.email) {
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

    setIsSubmitting(true);
    // Directly transfer full form inquiry to rudraksha.infotek@gmail.com
    await transferInquiryToEmail(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hi Het (RUDRAKSHA INFOTEK),\n\nMy Name: ${formData.fullName || 'Client'}\nService Required: ${formData.service}\nBudget: ${formData.budgetRange}\nMessage: ${formData.message || 'I would like to inquire about digital services.'}`
    );
    return `https://wa.me/919726803078?text=${text}`;
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Project Inquiry: [${formData.service}] - ${formData.fullName || 'New Client'}`);
    const body = encodeURIComponent(
      `Hi Het (RUDRAKSHA INFOTEK),\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nService: ${formData.service}\nBudget: ${formData.budgetRange}\n\nProject Overview:\n${formData.message}\n\nSent to: ${TARGET_INBOX_EMAIL}`
    );
    return `mailto:${TARGET_INBOX_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAFAFA] border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 mb-3 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-zinc-950" />
            <span>Direct Inquiry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950">
            Let&apos;s Work Together
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Have a project in mind? Tell us what you need, and let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
          {/* Left Column: Official Company & Founder Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                  Agency Profile
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-950 mt-1">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-sm font-semibold text-zinc-700 mt-1">
                  IT & Digital Creative Solutions
                </p>
              </div>

              {/* Founder Spotlight */}
              <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-zinc-200/80 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold text-base shrink-0">
                  HT
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                    Owner & Lead Strategist
                  </p>
                  <h4 className="text-base font-bold text-zinc-950">
                    {COMPANY_INFO.founder}
                  </h4>
                  <p className="text-xs text-zinc-600">
                    Direct oversight on all client executions
                  </p>
                </div>
              </div>

              {/* Services List from prompt */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
                  Core Service Offerings:
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 p-2 rounded-lg bg-zinc-50 border border-zinc-100">
                    <Globe className="w-4 h-4 text-zinc-600" />
                    <span>Website Designing</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 p-2 rounded-lg bg-zinc-50 border border-zinc-100">
                    <Share2 className="w-4 h-4 text-zinc-600" />
                    <span>Social Media Marketing</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800 p-2 rounded-lg bg-zinc-50 border border-zinc-100">
                    <Palette className="w-4 h-4 text-zinc-600" />
                    <span>Graphic Designing</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact Links */}
              <div className="pt-4 border-t border-zinc-100 space-y-3 text-xs sm:text-sm">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-3 text-zinc-700 hover:text-zinc-950 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-500 block">Email Us</span>
                    <span className="font-semibold">{COMPANY_INFO.email}</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919726803078"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-700 hover:text-zinc-950 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-500 block">WhatsApp / Call</span>
                    <span className="font-semibold">{COMPANY_INFO.phone}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-zinc-950 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-950">
                      Inquiry Received & Transferred!
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
                      <Mail className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Transferred to {TARGET_INBOX_EMAIL}</span>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-zinc-900">{formData.fullName}</strong>. Your project brief has been sent to founder Het Tailor at <strong className="text-zinc-950">{TARGET_INBOX_EMAIL}</strong>. We will review your requirements and respond within 24 hours.
                  </p>

                  {/* Summary Box */}
                  <div className="max-w-md mx-auto p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-left text-xs space-y-1.5">
                    <div className="flex justify-between border-b border-zinc-200 pb-1 text-zinc-600">
                      <span>Service:</span>
                      <span className="font-semibold text-zinc-900">{formData.service}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-200 pb-1 text-zinc-600">
                      <span>Budget:</span>
                      <span className="font-semibold text-zinc-900">{formData.budgetRange}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Email:</span>
                      <span className="font-semibold text-zinc-900">{formData.email}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
                    >
                      <span>Send Direct via WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={getMailtoLink()}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 text-xs font-semibold hover:bg-zinc-100 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Open in Mail App</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 rounded-xl text-zinc-500 text-xs font-medium hover:text-zinc-800 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-zinc-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-zinc-950">
                      Start Your Project
                    </h3>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      Fill in your specifications below for an accurate quote and timeline.
                    </p>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-2">
                      Select Required Service *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {['Website Designing', 'Social Media Marketing', 'Graphic Designing'].map((svc) => (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => setFormData((prev) => ({ ...prev, service: svc }))}
                          className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                            formData.service === svc
                              ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                              : 'bg-[#FAFAFA] text-zinc-700 border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all ${
                          errors.fullName
                            ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-500 focus:border-red-500 ring-2 ring-red-100'
                            : 'border-zinc-200 bg-[#FAFAFA] focus:ring-2 focus:ring-zinc-900 focus:bg-white'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all ${
                          errors.email
                            ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-500 focus:border-red-500 ring-2 ring-red-100'
                            : 'border-zinc-200 bg-[#FAFAFA] focus:ring-2 focus:ring-zinc-900 focus:bg-white'
                        }`}
                      />
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
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                      >
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handlePhoneBlur}
                        placeholder="+91 97268 03078"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error-cs' : undefined}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all ${
                          errors.phone
                            ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-500 focus:border-red-500 ring-2 ring-red-100'
                            : 'border-zinc-200 bg-[#FAFAFA] focus:ring-2 focus:ring-zinc-900 focus:bg-white'
                        }`}
                      />
                      {errors.phone && (
                        <p id="phone-error-cs" className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="budgetRange"
                        className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                      >
                        Budget Bracket
                      </label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-[#FAFAFA] text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                      >
                        <option value="Starter / Standard">Starter / Standard Project</option>
                        <option value="Growth / Business">Growth / Business Scaling</option>
                        <option value="Custom Enterprise">Custom Full-Suite Enterprise</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5"
                    >
                      Project Details & Requirements *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your brand, goals, target deadline, and specific requirements..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all resize-y ${
                        errors.message
                          ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-500 focus:border-red-500 ring-2 ring-red-100'
                          : 'border-zinc-200 bg-[#FAFAFA] focus:ring-2 focus:ring-zinc-900 focus:bg-white'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="contact-submit-btn"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-zinc-950 text-white font-semibold text-sm hover:bg-zinc-800 transition-colors shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Contact Us</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                      >
                        <span>Chat on WhatsApp</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex items-center gap-2 text-[11px] text-zinc-500">
                    <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Your inquiry will be transferred directly to <strong className="text-zinc-800 font-semibold">{TARGET_INBOX_EMAIL}</strong></span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
