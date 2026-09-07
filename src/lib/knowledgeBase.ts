/**
 * Ask Digivate knowledge base.
 * Edit this file to change what the assistant knows. Deploy to update production.
 * Nothing here is “trained” into Gemini — relevant sections are sent with each chat.
 */

import { SITE_FAQS } from '../config/faqs';

export type KnowledgeDoc = {
  id: string;
  title: string;
  keywords: string[];
  content: string;
  /** Short answer used when Gemini is not available. */
  reply: string;
};

export const KNOWLEDGE_BASE: KnowledgeDoc[] = [
  {
    id: 'agency',
    title: 'Who Digivate is',
    keywords: [
      'digivate',
      'agency',
      'who',
      'about',
      'hyderabad',
      'location',
      'based',
      'company',
      'what do you do',
      'tagline',
    ],
    content: `Digivate is a digital growth agency in Hyderabad, India (digivate.in). Tagline: Build. Automate. Grow. We plan and build websites, apps, AI workflows, CRM connections, and digital marketing as one system — not disconnected one-off projects. Founder: Atif Khan. Co-founder: Hajira Bi. Clients can start with one service; we still design it so booking, CRM, and follow-up can be added later.`,
    reply:
      'Digivate is a digital growth agency in Hyderabad, founded by Atif Khan with Hajira Bi as co-founder. We build websites, apps, AI workflows and CRM automation, and digital marketing. What are you trying to build or grow?',
  },
  {
    id: 'contact',
    title: 'Contact and booking',
    keywords: [
      'contact',
      'whatsapp',
      'phone',
      'email',
      'call',
      'book',
      'appointment',
      'consult',
      'number',
      'reach',
      'talk',
      'hyderabad',
    ],
    content: `Contact: WhatsApp and phone +91 6309589438. Email info@digivate.in. Website https://digivate.in. Book an appointment on the site, or start Get a 60-second plan at /get-started. No public street address is listed — location is Hyderabad, India.`,
    reply:
      'You can reach Digivate on WhatsApp at +91 6309589438, email info@digivate.in, or book an appointment on digivate.in.',
  },
  {
    id: 'web',
    title: 'Website development',
    keywords: [
      'web',
      'website',
      'site',
      'landing',
      'redesign',
      'rebuild',
      'ecommerce',
      'e-commerce',
      'shop',
      'wordpress',
      'page',
      'convert',
      'mobile-first',
      'seo-friendly',
    ],
    content: `Website development (https://digivate.in/services/web-development): custom, fast, mobile-first sites built to convert visitors into inquiries. Includes strategy, design, development, technical SEO foundations, WhatsApp and appointment paths. Rebuilds of slow or outdated sites are available. Capabilities: design, development, landing pages, redesign, e-commerce, optimization and maintenance. Every site ships with semantic HTML, unique titles/descriptions, and crawlable structure.`,
    reply:
      'Digivate builds fast, mobile-first websites with technical SEO, WhatsApp, and booking paths so visitors can actually inquire. New sites and rebuilds. Want a web consultation?',
  },
  {
    id: 'apps',
    title: 'App development',
    keywords: [
      'app',
      'apps',
      'mobile',
      'android',
      'ios',
      'iphone',
      'product',
      'mvp',
      'api',
      'backend',
      'ui',
      'ux',
      'application',
    ],
    content: `App development (https://digivate.in/services/app-development): native and cross-platform mobile apps and web applications. Includes product strategy, UI/UX, backend APIs, CRM/payments/internal-tool integrations, MVP path, launch and maintenance. We can start with an MVP and expand after real users.`,
    reply:
      'We build mobile and web apps — strategy, UI/UX, APIs, and CRM connections, including MVPs. Want to book a call about the product?',
  },
  {
    id: 'automation',
    title: 'AI workflows and CRM automation',
    keywords: [
      'ai',
      'automation',
      'workflow',
      'workflows',
      'crm',
      'whatsapp',
      'chatbot',
      'lead',
      'leads',
      'booking',
      'calendar',
      'follow-up',
      'follow up',
      'pipeline',
      'spreadsheet',
    ],
    content: `AI workflows and CRM automation (https://digivate.in/services/ai-automation): connect website, WhatsApp, forms, calendar, and CRM so inquiries are answered, logged, and followed up without copy-paste. Typical flows: lead capture, instant replies, qualification, appointment booking, reminders, CRM logging. You do not need a CRM first — we can use yours or recommend a simple setup. Capabilities include WhatsApp automation, AI chatbots, booking automation, email automation, and business-process automation.`,
    reply:
      'We connect forms, WhatsApp, calendars, and CRMs so leads get answered and logged automatically. No CRM yet is fine. Want to talk through your current pipeline?',
  },
  {
    id: 'marketing',
    title: 'Digital marketing and SEO',
    keywords: [
      'marketing',
      'seo',
      'google',
      'ads',
      'paid',
      'search',
      'campaign',
      'social',
      'content',
      'traffic',
      'rank',
      'ranking',
      'visibility',
      'leads',
      'inquiries',
    ],
    content: `Digital marketing (https://digivate.in/services/digital-marketing): SEO, paid search, social campaigns, landing pages, and conversion work aimed at qualified inquiries — not vanity traffic. Ads can bring demand quickly; SEO builds lasting visibility. We often run both, tied to a site that converts. Local and growing businesses are a fit. Reporting focuses on cost-per-lead and inquiries, not empty clicks.`,
    reply:
      'Digital marketing at Digivate is SEO, paid search, and campaigns aimed at real inquiries, tied to a site that converts. Shall we book a marketing consult?',
  },
  {
    id: 'process',
    title: 'How Digivate works',
    keywords: ['process', 'approach', 'steps', 'discover', 'connect', 'how you work', 'how does it work'],
    content: `Process: Discover (understand the business, audience, goals) → Build (design and develop the digital foundation) → Connect (channels and systems that work together) → Grow (track results and scale what works). You can start with one service. We still plan so CRM, booking, and follow-up can be added without rebuilding everything later.`,
    reply:
      'We discover, build, connect, then grow. You can start with one service; we still leave room for CRM, booking, and marketing later. A short call is enough to pick the first move.',
  },
  {
    id: 'industries',
    title: 'Industries we serve',
    keywords: [
      'industry',
      'industries',
      'real estate',
      'school',
      'ecommerce',
      'restaurant',
      'cafe',
      'startup',
      'salon',
      'hospital',
      'clinic',
      'consultant',
      'gym',
      'local',
    ],
    content: `Industries Digivate works with: real estate (listings, tours, inquiries), schools (enrollment sites), e-commerce (stores that sell), restaurants and cafes (menus, reservations), startups (launch-ready presence), salons (booking-first), hospitals and clinics (appointment-ready pages), consultants (authority sites), gyms (memberships and schedules), and other local businesses that need to get found and get the call.`,
    reply:
      'We work with real estate, schools, shops, restaurants, startups, salons, clinics, consultants, gyms, and other local businesses. Which industry are you in?',
  },
  {
    id: 'portfolio',
    title: 'Selected work',
    keywords: [
      'portfolio',
      'work',
      'projects',
      'clients',
      'examples',
      'atira',
      'aurelia',
      'luxe',
      'case',
      'showcase',
      'your work',
      'past work',
    ],
    content: `Selected live sites (web development): ATIRA (cafe — premium brand site with ordering), LUXE ESTATES (real estate property showcase), AURELIA (restaurant — reservations, menu, editorial layout). Do not invent other clients, testimonials, awards, or results. Other sample titles on the site are placeholders, not case studies.`,
    reply:
      'Public examples include ATIRA (cafe), LUXE ESTATES (real estate), and AURELIA (restaurant). For your project, book a call or WhatsApp +91 6309589438.',
  },
  {
    id: 'pricing',
    title: 'Pricing and timelines',
    keywords: ['price', 'pricing', 'cost', 'quote', 'rate', 'budget', 'fee', 'timeline', 'how long', 'package'],
    content: `Digivate does not publish prices, packages, or standard timelines on the website. Scope depends on the business, pages/features, and integrations. Direct people to WhatsApp +91 6309589438, email info@digivate.in, or an appointment for a project-specific evaluation. Never invent a number.`,
    reply:
      "I don't have published prices or timelines. WhatsApp +91 6309589438 or book an appointment and the team will scope it for your project.",
  },
  {
    id: 'team',
    title: 'Founders',
    keywords: ['founder', 'founded', 'atif', 'khan', 'hajira', 'team', 'who runs', 'who owns', 'who started'],
    content: `Digivate was founded by Atif Khan (Founder: vision, strategy, client relationships, delivery standards). Co-founder Hajira Bi shapes strategy, creativity, operations, and day-to-day execution. Based in Hyderabad. Do not invent other team members or headcount.`,
    reply:
      'Digivate was founded by Atif Khan, with Hajira Bi as co-founder. The agency is based in Hyderabad. Want to talk to the team on WhatsApp or book a call?',
  },
  {
    id: 'faq',
    title: 'Common questions',
    keywords: ['faq', 'question', 'offer', 'services', 'include', 'what do you offer', 'how do i start', 'rebuild'],
    content: SITE_FAQS.map((item) => `${item.question}\n${item.answer}`).join('\n\n'),
    reply:
      'We offer website development, app development, AI workflows and CRM automation, and digital marketing. Which of those is closest to what you need?',
  },
];

const STOP = new Set(['the', 'a', 'an', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'my', 'we', 'i', 'you', 'is', 'do', 'can', 'your', 'me', 'our', 'with', 'more', 'want', 'need', 'help']);

function tokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+.\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP.has(word));
}

export function retrieveKnowledge(query: string, limit = 4): KnowledgeDoc[] {
  const q = query.toLowerCase();
  const words = tokens(query);
  if (!words.length) {
    return KNOWLEDGE_BASE.filter((doc) => doc.id === 'agency' || doc.id === 'contact').slice(0, limit);
  }

  const ranked = KNOWLEDGE_BASE.map((doc) => {
    let score = 0;
    for (const keyword of doc.keywords) {
      if (keyword.includes(' ') && q.includes(keyword)) score += 10;
      else if (q.includes(keyword) && keyword.length >= 4) score += 6;
      else if (words.some((word) => word === keyword || (word.length >= 4 && keyword.length >= 4 && (keyword.includes(word) || word.includes(keyword))))) {
        score += 3;
      }
    }
    if (doc.id === 'agency') score += 0.1;
    return { doc, score };
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked = ranked.slice(0, limit).map((row) => row.doc);
  if (!picked.some((doc) => doc.id === 'contact') && /book|whatsapp|email|phone|contact|call/.test(q)) {
    const contact = KNOWLEDGE_BASE.find((doc) => doc.id === 'contact');
    if (contact) picked.push(contact);
  }
  return picked.length ? picked : [KNOWLEDGE_BASE[0]];
}

export function formatKnowledgeForPrompt(docs: KnowledgeDoc[]) {
  return docs.map((doc) => `### ${doc.title}\n${doc.content}`).join('\n\n');
}

export function answerFromKnowledge(query: string): string {
  const [top] = retrieveKnowledge(query, 1);
  return top?.reply ?? KNOWLEDGE_BASE[0].reply;
}

export const ASSISTANT_RULES = `You are Ask Digivate, the site assistant for Digivate (digivate.in).
Answer the user's actual question using the knowledge base. Do not repeat the same generic pitch on every turn.
If they ask about a service, explain that service. If they ask contact, give the number and email. If they ask price, say it is scoped on a call — never invent a number.
If the answer is not in the knowledge base, say you do not have that yet and offer WhatsApp +91 6309589438, info@digivate.in, or booking on the website.
Do not invent clients, testimonials, awards, or team size beyond what is written.
Keep replies to 2–4 sentences. Only invite a booking when it fits the question, not after every answer.`
