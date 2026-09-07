import { ServiceInfo, ProjectItem, ShowcaseWorkItem } from '../types';

/**
 * DIGIVATE Central Site Configuration
 */
export const AGENCY_NAME: string = "Digivate";
export const AGENCY_TAGLINE: string = "Digital Growth Agency";
export const AGENCY_LOCATION: string = "Hyderabad, India";

// Official WhatsApp number & Contact
export const WHATSAPP_NUMBER: string = "916309589438";
export const DISPLAY_PHONE: string = "+91 6309589438";

// Calendar/booking link placeholder (or empty to trigger internal appointment workflow)
export const BOOKING_URL: string = "";

// Primary contact email placeholder
export const CONTACT_EMAIL: string = "info@digivate.in";
export const SITE_ORIGIN: string = "https://digivate.in";

export const WHATSAPP_DEFAULT_MESSAGE = "Hi Digivate! I’m interested in your digital services. I’d like to know more about how you can help my business.";

/**
 * Returns the direct WhatsApp URL
 */
export function getWhatsAppUrl(): string {
  return `https://wa.me/916309589438?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
}

/**
 * The 4 Core Digivate Services strictly defined
 */
export const SERVICES: (ServiceInfo & { slug: string; path: string })[] = [
  {
    id: 'web-dev',
    slug: 'web-development',
    path: '/services/web-development',
    number: '01',
    title: 'Web Development',
    tagline: 'High-performance websites designed to convert visitors into clients.',
    description: 'We design and engineer modern, fast, and conversion-focused websites that position your business with authority.',
    outcomes: [
      'Engineered for lightning speed, responsiveness, and clean visual hierarchy',
      'Frictionless user experience structured to convert incoming traffic',
      'Modular, scalable architecture tailored to your specific business model'
    ],
    capabilities: [
      'Design',
      'Development',
      'Landing Pages',
      'Redesign',
      'E-Commerce',
      'Optimization & Maintenance'
    ]
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    path: '/services/digital-marketing',
    number: '02',
    title: 'Digital Marketing',
    tagline: 'Targeted marketing campaigns that generate qualified business inquiries.',
    description: 'Reach the right audience with strategic, data-driven digital campaigns focused on measurable business growth.',
    outcomes: [
      'Precision audience targeting and compelling value propositions',
      'Continuous campaign tracking, A/B testing, and ROI optimization',
      'Consistent multi-channel customer acquisition pipelines'
    ],
    capabilities: [
      'SEO',
      'Social Media',
      'Content Marketing',
      'Paid Advertising',
      'Email Marketing',
      'Lead Generation',
      'Analytics & Growth'
    ]
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    path: '/services/ai-automation',
    number: '03',
    title: 'AI Automation',
    tagline: 'Intelligent workflows that eliminate repetitive tasks and capture leads instantly.',
    description: 'Automate manual processes, qualify leads automatically, and connect your business tools into a seamless operating workflow.',
    outcomes: [
      'Instant automated inquiry response and lead qualification',
      'Automated CRM logging, pipeline tracking, and scheduling reminders',
      'Elimination of administrative overhead so you focus on closing clients'
    ],
    capabilities: [
      'Workflow Automation',
      'Lead Automation',
      'WhatsApp Automation',
      'AI Chatbots',
      'Booking Automation',
      'CRM Automation',
      'Email Automation',
      'Business Process Automation',
      'AI Integrations',
      'AI Business Systems'
    ]
  },
  {
    id: 'app-dev',
    slug: 'app-development',
    path: '/services/app-development',
    number: '04',
    title: 'App Development',
    tagline: 'Powerful mobile and web applications built for scale and performance.',
    description: 'We build intuitive, high-performance applications that deliver exceptional user experiences across all devices.',
    outcomes: [
      'Scalable, secure, and modern application architecture',
      'Intuitive user interfaces optimized for engagement',
      'Seamless integration with backend systems and third-party APIs'
    ],
    capabilities: [
      'App Strategy & UI/UX',
      'Mobile App Development',
      'Web App Development',
      'Backend & API Development',
      'AI-Powered Apps',
      'App Integrations',
      'Launch & Maintenance'
    ]
  }
];

/**
 * 10 Sample / Demo Projects ready to be replaced with real client work
 */
export const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'project-01',
    title: 'Project 01',
    category: 'Web Development',
    serviceId: 'web-dev',
    description: 'Sample Website — Clean responsive digital presence engineered for business credibility and conversion.',
    tags: ['Web Development', 'High-Converting UI', 'Responsive Design']
  },
  {
    id: 'project-02',
    title: 'Project 02',
    category: 'SEO & Search Visibility',
    serviceId: 'digital-marketing',
    description: 'Sample Project — Technical SEO framework and search authority architecture for local and national discovery.',
    tags: ['SEO', 'Search Rankings', 'Keyword Strategy']
  },
  {
    id: 'project-03',
    title: 'Project 03',
    category: 'AI Workflow Automation',
    serviceId: 'ai-automation',
    description: 'Sample Project — Automated inbound lead intake, qualification routing, and instant notification sequence.',
    tags: ['AI Automation', 'Lead Pipeline', 'CRM Integration']
  },
  {
    id: 'project-04',
    title: 'Project 04',
    category: 'Digital Marketing Campaign',
    serviceId: 'digital-marketing',
    description: 'Sample Project — Targeted multi-channel customer acquisition campaign engineered for high-intent inquiries.',
    tags: ['Digital Marketing', 'Paid Acquisition', 'Funnel Optimization']
  },
  {
    id: 'project-05',
    title: 'Project 05',
    category: 'Web Development',
    serviceId: 'web-dev',
    description: 'Sample Website — Modern multi-page corporate website with structured service catalog and inquiry flows.',
    tags: ['Web Development', 'UI/UX', 'Performance']
  },
  {
    id: 'project-06',
    title: 'Project 06',
    category: 'AI Automation & CRM',
    serviceId: 'ai-automation',
    description: 'Sample Project — Automated appointment scheduling, reminder dispatch, and client onboarding workflow.',
    tags: ['AI Automation', 'Scheduling Workflows', 'Ops Efficiency']
  },
  {
    id: 'project-07',
    title: 'Project 07',
    category: 'SEO & Organic Growth',
    serviceId: 'digital-marketing',
    description: 'Sample Project — High-intent search ranking architecture and content indexation strategy.',
    tags: ['SEO', 'Technical SEO', 'Organic Traffic']
  },
  {
    id: 'project-08',
    title: 'Project 08',
    category: 'Digital Marketing',
    serviceId: 'digital-marketing',
    description: 'Sample Project — Conversion-focused paid search and social campaign driving qualified consult requests.',
    tags: ['Digital Marketing', 'Lead Generation', 'Analytics']
  },
  {
    id: 'project-09',
    title: 'Project 09',
    category: 'Web Development',
    serviceId: 'web-dev',
    description: 'Sample Website — Ultra-fast landing page system with integrated WhatsApp and calendar appointment hooks.',
    tags: ['Web Development', 'Landing Pages', 'Speed Optimization']
  },
  {
    id: 'project-10',
    title: 'Project 10',
    category: 'AI Automation & Systems',
    serviceId: 'ai-automation',
    description: 'Sample Project — End-to-end client inquiry capture, AI qualification, and automated CRM record generation.',
    tags: ['AI Automation', 'Data Sync', 'Business Workflows']
  }
];

export const PORTFOLIO_PLACEHOLDERS = SAMPLE_PROJECTS;

/**
 * Live Digivate sites shown in the showcase gallery.
 * Do not treat SAMPLE_PROJECTS as client work.
 */
export const SHOWCASE_WORK: ShowcaseWorkItem[] = [
  {
    id: '01',
    title: 'ATIRA',
    category: 'Cafe',
    serviceId: 'web-dev',
    description: 'A premium digital experience for a modern cafe, balancing aesthetics with seamless ordering.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2347&auto=format&fit=crop',
    link: 'https://atira-nine.vercel.app/',
    tags: ['Web Development', 'Ordering', 'Brand Site'],
  },
  {
    id: '02',
    title: 'LUXE ESTATES',
    category: 'Real Estate',
    serviceId: 'web-dev',
    description: 'High-end property showcase designed to elevate the buying experience with immersive visuals.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2350&auto=format&fit=crop',
    link: 'https://real-estate-website-one-wheat.vercel.app/',
    tags: ['Web Development', 'Property Showcase', 'Immersive UI'],
  },
  {
    id: '03',
    title: 'AURELIA',
    category: 'Restaurant',
    serviceId: 'web-dev',
    description: 'Cinematic, editorial theme for a fine-dining concept — reservations, menu, and press in one calm layout.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2340&auto=format&fit=crop',
    link: 'https://restaurants-website-delta.vercel.app/',
    tags: ['Web Development', 'Reservations', 'Editorial'],
  },
];

