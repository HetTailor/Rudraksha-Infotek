import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      id="main-footer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white border-t-2 border-[#D4B26B]/30 text-zinc-600 pt-16 pb-12 relative"
    >
      {/* Top Gold Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#D4B26B] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-zinc-100">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center group focus:outline-none py-0.5">
              <img
                src={COMPANY_INFO.logoUrl}
                alt={COMPANY_INFO.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = COMPANY_INFO.logoFallback;
                }}
                className="h-14 sm:h-16 md:h-18 w-auto max-w-[260px] sm:max-w-[320px] object-contain"
              />
            </Link>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Your trusted digital marketing partner driving growth, engagement, and measurable success for ambitious brands worldwide.
            </p>

            {/* Social Icons with #3C2B99 and #D4B26B hover */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, label: 'Facebook', href: '#social-fb' },
                { icon: Linkedin, label: 'LinkedIn', href: '#social-li' },
                { icon: Twitter, label: 'Twitter', href: '#social-tw' },
                {
                  icon: Instagram,
                  label: 'Instagram',
                  href: 'https://www.instagram.com/rudraksha_infotek/',
                  isExternal: true,
                },
              ].map(({ icon: Icon, label, href, isExternal }) => (
                <motion.a
                  key={label}
                  href={href}
                  id={label === 'Instagram' ? 'footer-social-instagram' : undefined}
                  aria-label={label}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onClick={!isExternal ? (e) => e.preventDefault() : undefined}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-[#3C2B99]/10 text-zinc-600 hover:text-[#3C2B99] border border-transparent hover:border-[#D4B26B]/70 flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-[#D4B26B]/20 cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4B26B]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Quick Links
              </h4>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4B26B]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Services
              </h4>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  PPC Advertising
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  Graphic & Brand Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#3C2B99] hover:border-b hover:border-[#D4B26B] transition-colors inline-block hover:translate-x-1 duration-200">
                  Website Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Let's Connect */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4B26B]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Let's Connect
              </h4>
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="group flex items-center gap-2 text-zinc-600 hover:text-[#3C2B99] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D4B26B] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  className="group flex items-center gap-2 text-zinc-600 hover:text-[#3C2B99] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4B26B] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-zinc-600">
                <MapPin className="w-4 h-4 text-[#D4B26B] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} <span className="text-[#3C2B99] font-semibold">{COMPANY_INFO.name}</span>. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-[#3C2B99] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-[#3C2B99] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
