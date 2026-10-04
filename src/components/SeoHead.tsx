import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetadata {
  title: string;
  description: string;
  canonicalPath: string;
}

const BASE_URL = 'https://rudrakshainfotek.in';

const ROUTE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: 'Rudraksha Infotek | IT & Digital Creative Agency in Vadodara',
    description:
      'Rudraksha Infotek is a premier IT & digital creative agency in Vadodara, specializing in modern web development, digital marketing, graphic design, and brand growth.',
    canonicalPath: '/',
  },
  '/about': {
    title: 'About Us | Rudraksha Infotek – Our Story, Leadership & Vision',
    description:
      'Learn about Rudraksha Infotek, founded by Het Tailor in Vadodara. Discover our client-focused approach to web engineering, digital marketing, and brand identity.',
    canonicalPath: '/about',
  },
  '/services': {
    title: 'Services | Web Development, Marketing & Design – Rudraksha Infotek',
    description:
      'Explore digital solutions from Rudraksha Infotek: custom website design, responsive web development, social media marketing, and professional graphic design in Vadodara.',
    canonicalPath: '/services',
  },
  '/portfolio': {
    title: 'Portfolio & Case Studies | Proven Results – Rudraksha Infotek',
    description:
      'View client case studies by Rudraksha Infotek, including custom websites, e-commerce platforms, recruitment portals, and high-impact social media campaigns.',
    canonicalPath: '/portfolio',
  },
  '/process': {
    title: 'Our Process | Transparent Digital Delivery – Rudraksha Infotek',
    description:
      'Discover our structured 5-step delivery roadmap: Understand, Plan, Create, Review, and Launch. Transparent communication with measurable digital outcomes.',
    canonicalPath: '/process',
  },
  '/contact': {
    title: 'Contact Us | Request a Consultation & Quote – Rudraksha Infotek',
    description:
      'Get in touch with Rudraksha Infotek in Vadodara, Gujarat. Request a project consultation and custom quote for web development, digital marketing, and graphic design.',
    canonicalPath: '/contact',
  },
};

export const SeoHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_METADATA[pathname] || ROUTE_METADATA['/'];
    const canonicalUrl = `${BASE_URL}${meta.canonicalPath === '/' ? '/' : meta.canonicalPath}`;

    // 1. Update Document Title
    document.title = meta.title;

    // 2. Helper to update or create meta tag
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard Meta Description
    setMetaTag('name', 'description', meta.description);

    // 4. Update Canonical Link Tag
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // 5. Update Open Graph Tags
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', canonicalUrl);

    // 6. Update Twitter Tags
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:url', canonicalUrl);
  }, [pathname]);

  return null;
};
