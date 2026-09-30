export type ServiceCategory = 'website' | 'social' | 'graphic';

export interface ServiceItem {
  id: ServiceCategory;
  number: string;
  title: string;
  tagline: string;
  description: string;
  offerings: string[];
  ctaText: string;
  image: string;
  highlights: { title: string; desc: string }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: ServiceCategory;
  categoryLabel: string;
  description: string;
  image: string;
  deliverables: string[];
  results: { metric: string; label: string }[];
  accentColor?: string;
  fullStory?: string;
  year: string;
  liveUrl?: string;
  actionLabel?: string;
}

export interface WhyUsPillar {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  badge: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  budgetRange: string;
  message: string;
}
