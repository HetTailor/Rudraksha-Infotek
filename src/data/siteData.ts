import { ServiceItem, PortfolioProject, WhyUsPillar, ProcessStep } from '../types';

export const COMPANY_INFO = {
  name: 'RUDRAKSHA INFOTEK',
  tagline: 'Design. Develop. Grow.',
  heroHeading: 'Build Your Digital Presence. Grow Your Business.',
  heroDescription:
    'We create modern websites, powerful social media strategies, and eye-catching designs that help businesses stand out in the digital world.',
  servicesSummary: 'Website Designing • Social Media Marketing • Graphic Designing',
  founder: 'Het Tailor',
  role: 'Founder & CEO',
  email: 'rudraksha.infotek@gmail.com',
  phone: '+91 97268 03078',
  location: 'India • Serving Global Clients',
  instagram: 'https://www.instagram.com/rudraksha_infotek/',
  logoUrl: '/images/logo-trimmed.png',
  logoFallback: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/Logog-scaled.png',
  faviconUrl: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/Favicon.png',
  ceoTitle: 'About the CEO',
  ceoImage: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/Screenshot_2025-06-07-18-32-36-753_com.miui_.gallery.png',
  heroRocketImage: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/home.png',
  ceoBio: [
    'I’m Het Tailor, Founder & CEO of Rudraksha Infotek. My vision is to help businesses build a strong and professional digital presence.',
    'With a passion for web development, graphic design, and digital marketing, I focus on creating creative and effective solutions. I believe in combining creativity, technology, and innovation to deliver quality work.',
    'At Rudraksha Infotek, our goal is to turn ideas into impactful digital experiences. We strive to build long-term relationships with our clients through quality, trust, and dedication.',
  ],
  aboutStory:
    'RUDRAKSHA INFOTEK is an IT and digital creative company dedicated to helping businesses build a strong and professional online presence.',
  aboutDetail:
    'From designing responsive websites to managing social media and creating engaging graphics, we provide creative and practical digital solutions tailored to your brand.',
  aboutPhilosophy:
    'We believe that every business has a unique story — our job is to present that story beautifully to the world.',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'website',
    number: '01',
    title: 'Website Designing',
    tagline: 'Modern Websites. Powerful First Impressions.',
    description:
      'We design responsive, user-friendly, and visually appealing websites that represent your brand professionally across desktop, tablet, and mobile devices.',
    offerings: [
      'Business Websites',
      'Portfolio Websites',
      'E-commerce Websites',
      'Landing Pages',
      'Responsive Web Design',
      'Website UI/UX Design',
      'Website Maintenance',
    ],
    ctaText: 'Build My Website',
    image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/web-devlopment.jpg',
    highlights: [
      { title: 'Sub-Second Speeds', desc: 'Ultra-optimized code architecture built for search engines & conversions' },
      { title: 'Responsive Layouts', desc: 'Flawless visual experience across smartphones, tablets, and 4K displays' },
      { title: 'Intuitive UI/UX', desc: 'Human-centric user journeys engineered to turn visitors into inquiries' },
    ],
  },
  {
    id: 'social',
    number: '02',
    title: 'Social Media Marketing',
    tagline: 'Turn Followers Into Customers.',
    description:
      'We help businesses grow their digital presence with creative social media content and strategic marketing. Our goal is to make your brand more visible, engaging, and memorable on social platforms.',
    offerings: [
      'Social Media Management',
      'Instagram Marketing',
      'Facebook Marketing',
      'Content Creation',
      'Promotional Posts',
      'Festival & Event Creatives',
      'Brand Awareness Campaigns',
      'Social Media Strategy',
    ],
    ctaText: 'Grow My Brand',
    image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/instagram.png',
    highlights: [
      { title: 'Curated Feeds', desc: 'High-aesthetic visual language that elevates your brand reputation' },
      { title: 'Strategic Engagement', desc: 'Data-driven posting schedules and targeted organic reach tactics' },
      { title: 'Brand Memorability', desc: 'Consistent typography, tone of voice, and storytelling assets' },
    ],
  },
  {
    id: 'graphic',
    number: '03',
    title: 'Graphic Designing',
    tagline: 'Designs That Make Your Brand Stand Out.',
    description:
      'Great design creates a great first impression. We create professional and creative visuals that communicate your brand clearly and attract attention.',
    offerings: [
      'Logo Design',
      'Social Media Posts',
      'Business Cards',
      'Posters & Banners',
      'Brochures',
      'Flyers',
      'Promotional Creatives',
      'Brand Identity Designs',
    ],
    ctaText: 'Create My Design',
    image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/graphic.jpg',
    highlights: [
      { title: 'Vector Precision', desc: 'Timeless logos and graphic marks scalable from icons to billboards' },
      { title: 'Print & Digital Ready', desc: 'CMYK & RGB calibrated files prepared for any printing press or screen' },
      { title: 'Complete Brand Kits', desc: 'Color palettes, font pairings, and unified brand guidelines' },
    ],
  },
];

export const WHY_CHOOSE_US: WhyUsPillar[] = [
  {
    id: 'client-focused',
    title: 'Client-Focused',
    desc: 'We understand your requirements before creating a solution.',
    iconName: 'Target',
    badge: '01',
  },
  {
    id: 'creative-approach',
    title: 'Creative Approach',
    desc: 'We combine creativity with technology to deliver impactful digital experiences.',
    iconName: 'Lightbulb',
    badge: '02',
  },
  {
    id: 'modern-responsive',
    title: 'Modern & Responsive',
    desc: "Our websites and designs are created with today's digital platforms in mind.",
    iconName: 'Smartphone',
    badge: '03',
  },
  {
    id: 'business-growth',
    title: 'Business Growth Focused',
    desc: "We don't just create — we focus on helping your brand grow.",
    iconName: 'Rocket',
    badge: '04',
  },
  {
    id: 'reliable-support',
    title: 'Reliable Support',
    desc: 'We believe in building long-term relationships with our clients.',
    iconName: 'Handshake',
    badge: '05',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    description: 'We learn about your business, goals, audience, and requirements.',
    details: ['Discovery consultation', 'Target audience analysis', 'Competitor research & positioning'],
  },
  {
    number: '02',
    title: 'Plan',
    description: 'We create a clear strategy and direction for your project.',
    details: ['Architecture & wireframing', 'Visual moodboards', 'Timeline and milestone roadmap'],
  },
  {
    number: '03',
    title: 'Create',
    description: 'Our design and development process brings your ideas to life.',
    details: ['Precision UI prototyping', 'Responsive code engineering', 'High-aesthetic creative production'],
  },
  {
    number: '04',
    title: 'Review',
    description: 'We refine the work based on your feedback.',
    details: ['Collaborative review rounds', 'Usability & cross-browser QA', 'Content and asset fine-tuning'],
  },
  {
    number: '05',
    title: 'Launch & Grow',
    description: 'We deliver the final project and help you take your digital presence forward.',
    details: ['Seamless deployment', 'Brand assets handover', 'Ongoing growth support & maintenance'],
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'gatived-ev',
    title: 'Gatived EV – Electric Mobility Website',
    client: 'Gatived EV',
    category: 'website',
    categoryLabel: 'Website Designing',
    description:
      'A modern and responsive electric vehicle website designed to showcase electric bikes, their features, specifications, test ride options, services, and brand information. The website focuses on a clean, premium, user-friendly experience.',
    image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/ev-1.png',
    liveUrl: 'https://gativedev.com/',
    deliverables: [
      'Web Design',
      'Responsive UI/UX',
      'EV Website',
      'Product Showcase',
      'Modern Website',
    ],
    results: [
      { metric: 'Responsive', label: 'Cross-Device UI' },
      { metric: 'Modern UI', label: 'Clean Experience' },
      { metric: 'EV Showcase', label: 'Product & Specs' },
    ],
    year: '2026',
    fullStory:
      'Rudraksha Infotek designed and engineered the official website for Gatived EV (https://gativedev.com/). The digital flagship showcases electric bike models, battery and range specifications, instant test ride scheduling, maintenance services, and brand vision within a responsive, premium user interface.',
  },
  {
    id: 'the-urban-image',
    title: 'The Urban Image – Wedding Photography Website',
    client: 'The Urban Image',
    category: 'website',
    categoryLabel: 'Website Designing',
    description:
      'A modern and elegant wedding photography website designed to showcase timeless wedding moments, candid photography, cinematic films, and authentic storytelling. The website uses a premium visual style with large wedding photographs and a clean, emotional user experience.',
    image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/urban.png',
    liveUrl: 'https://www.theurbanimage.in/',
    deliverables: [
      'Web Design',
      'Responsive UI/UX',
      'Photography Website',
      'Portfolio Website',
      'Modern UI',
    ],
    results: [
      { metric: 'Premium', label: 'Visual Design' },
      { metric: 'Responsive', label: 'Website' },
      { metric: 'Photography', label: 'Showcase' },
    ],
    year: '2026',
    fullStory:
      'Rudraksha Infotek designed and built the portfolio platform for The Urban Image (https://www.theurbanimage.in/). The website offers a refined, emotional browsing experience featuring large-format Indian wedding photography, candid couple moments, cinematic video showreels, and effortless inquiry flows.',
  },
  {
    id: 'alices-tech-solutions',
    title: 'Alice’s Tech Solutions – Career & Recruitment Website',
    client: 'ALICE’S TECH SOLUTIONS',
    category: 'website',
    categoryLabel: 'Website Designing',
    description:
      'A modern and responsive career and recruitment website designed to connect job seekers with opportunities while providing career guidance, IT training, resume enhancement, interview preparation, and job assistance.',
    image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/a.jpg',
    liveUrl: 'https://alicestechsolutions.com/',
    deliverables: [
      'Web Design',
      'Responsive UI/UX',
      'Career Platform',
      'Recruitment Website',
      'IT Training',
    ],
    results: [
      { metric: 'Career Support', label: 'Guidance & Mentorship' },
      { metric: 'Job Opportunities', label: 'Tech Openings' },
      { metric: 'IT Training', label: 'Industry Skills' },
    ],
    year: '2026',
    fullStory:
      'Rudraksha Infotek designed and developed the career and recruitment web platform for Alice’s Tech Solutions (https://alicestechsolutions.com/). Built with a clean white and teal aesthetic, the website connects talent to employment through interactive job exploration, hands-on IT training course modules, automated resume enhancement, and dedicated interview coaching workflows.',
  },
  {
    id: 'optimum-fitness',
    title: 'Optimum Fitness – Social Media Campaign Design',
    client: 'Optimum Fitness',
    category: 'social',
    categoryLabel: 'Social Media',
    description:
      'Creative social media campaign designed for Optimum Fitness to promote their Zumba class through engaging promotional content, strong visual communication, event information, and fitness-focused branding.',
    image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/optimum-.jpeg',
    actionLabel: 'View Project',
    deliverables: [
      'Social Media Design',
      'Campaign Creative',
      'Promotional Post',
      'Fitness Branding',
      'Social Media Marketing',
    ],
    results: [
      { metric: 'Campaign Creatives', label: 'Social Posts' },
      { metric: 'Promotional Graphics', label: 'Event Creatives' },
      { metric: 'Fitness Branding', label: 'Visual Identity' },
    ],
    year: '2026',
    fullStory:
      'Rudraksha Infotek conceptualized and crafted the high-energy social media campaign creatives for Optimum Fitness to promote their free Zumba workshop. The design features bold, impactful typography, clear event scheduling and timing details, direct Anand studio contact coordinates, and an authentic, energetic fitness aesthetic tailored for maximum engagement across Instagram and Facebook feeds.',
  },
  {
    id: 'het-creation',
    title: 'Het Creation – Fashion Social Media Campaign',
    client: 'Het Creation',
    category: 'social',
    categoryLabel: 'Social Media',
    description:
      'A premium fashion promotional social media creative designed for Het Creation, featuring a festive fashion sale campaign with elegant product presentation, promotional messaging, discount highlights, and a strong fashion-focused visual identity.',
    image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/het-creation.jpg',
    actionLabel: 'View Project',
    deliverables: [
      'Social Media Design',
      'Campaign Creative',
      'Fashion Branding',
      'Promotional Graphics',
      'Social Media Marketing',
    ],
    results: [
      { metric: 'Campaign Creative', label: 'Festive Sale' },
      { metric: 'Fashion Promotion', label: '25% Off Banner' },
      { metric: 'Brand Visuals', label: 'Ethnic Styling' },
    ],
    year: '2026',
    fullStory:
      'Rudraksha Infotek conceptualized and crafted the festive fashion promotional social media creative for Het Creation (Vadodara). Built around a regal champagne, ochre-gold, and espresso brown aesthetic, the creative highlights an authentic Indian ethnic suit collection with dual fabric embroidery zoom insets, high-contrast 25% flat discount architecture, 1 to 25 August promotional dates, and direct boutique retail store coordinates.',
  },
  {
    id: 'deep-tuition-class',
    title: 'Deep Tuition Class – Brand Identity & Graphic Design',
    client: 'Deep Tuition Class',
    category: 'graphic',
    categoryLabel: 'Graphic & Brand',
    description:
      'A clean and professional education brand identity created for Deep Tuition Class, including logo-based visual branding, social media creatives, promotional graphics and a consistent educational design style.',
    image: 'https://het.assistwebstudio.in/wp-content/uploads/2026/09/deep.jpeg',
    deliverables: [
      'Brand Identity',
      'Graphic Design',
      'Social Media Design',
      'Education Branding',
      'Visual Design',
    ],
    results: [
      { metric: 'Brand Identity', label: 'Visual System' },
      { metric: 'Social Media Graphics', label: 'Campaign Creatives' },
      { metric: 'Educational Branding', label: 'Stationery & Collaterals' },
    ],
    year: '2026',
    actionLabel: 'View Project',
    fullStory:
      'Rudraksha Infotek created a comprehensive educational brand identity and graphic design system for Deep Tuition Class. Centered around an emblem uniting the open book of knowledge, the spark of insight, and the guided path of the pencil, the deliverables include vector logo guidelines, admissions marketing creatives, student workbooks, faculty business cards, and social media templates.',
  },
];
