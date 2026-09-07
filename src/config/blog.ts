export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readMinutes: number;
  sections: { heading?: string; body: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'website-that-converts-inquiries',
    title: 'What a website that actually converts looks like',
    description:
      'A converting website is not more pages. It is a clear offer, mobile speed, and one obvious next step — WhatsApp, call, or booking.',
    date: '2026-09-07',
    category: 'Website development',
    readMinutes: 5,
    sections: [
      {
        body: 'Most business sites explain everything and ask for nothing. Visitors leave because they cannot tell what you sell, whether you serve them, or how to start. Digivate builds websites as sales tools: one outcome on the homepage, proof nearby, and a path that works on a phone.',
      },
      {
        heading: 'One offer, not a brochure',
        body: 'If the first screen lists eight services in equal weight, nobody knows what to do. Pick the inquiry you want this week — a consult, a quote, a reservation — and write the page around that. Secondary services can live one click away.',
      },
      {
        heading: 'Mobile is the real site',
        body: 'A large share of local inquiries start on a phone. Slow load, tiny tap targets, and forms that hide behind a “contact us” page kill the lead. We design mobile-first, keep pages light, and put WhatsApp or booking where a thumb can reach it.',
      },
      {
        heading: 'Search needs a crawlable page',
        body: 'Conversion and SEO are not opposites. Semantic structure, unique titles, and fast HTML help people find you; a clear call-to-action helps them inquire when they arrive. That is what we mean by website development built to convert.',
      },
    ],
  },
  {
    slug: 'ai-workflows-crm-without-spreadsheets',
    title: 'AI workflows and CRM: stop losing leads in chat',
    description:
      'If inquiries sit in WhatsApp and a spreadsheet, you are paying for demand you never follow up. Automation should log, reply, and book — not replace your team.',
    date: '2026-09-07',
    category: 'AI & CRM',
    readMinutes: 5,
    sections: [
      {
        body: 'The gap is rarely “we need more traffic.” It is the two-hour delay before someone answers. By then the buyer messaged someone else. Digivate connects the website, WhatsApp, forms, calendar, and CRM so the first response is immediate and the record is not trapped in one person’s phone.',
      },
      {
        heading: 'You do not need a fancy CRM first',
        body: 'If you already have a CRM, we plug into it. If leads live in chat, we can start with a simple pipeline and grow it. The job is one intake path, not a stack of tools that do not talk.',
      },
      {
        heading: 'What we actually automate',
        body: 'Typical flows: acknowledge the inquiry, ask two qualifying questions, offer a booking slot, log the lead, remind both sides before the meeting. A person still closes. The system stops the copy-paste and the “did anyone reply?” loop.',
      },
    ],
  },
  {
    slug: 'seo-and-ads-that-create-inquiries',
    title: 'SEO and ads only work if the page can close',
    description:
      'Paid search can bring demand this week. SEO builds lasting visibility. Both waste money if the landing page cannot turn a visit into a WhatsApp or a booking.',
    date: '2026-09-06',
    category: 'Digital marketing',
    readMinutes: 4,
    sections: [
      {
        body: 'Traffic is not the goal. A qualified inquiry is. Digivate’s digital marketing is SEO, paid search, and campaigns measured on conversations — cost per lead, not vanity clicks. We often run both, because ads fill the gap while search pages earn their place.',
      },
      {
        heading: 'Match the page to the search',
        body: 'Sending every ad to the homepage is how budgets disappear. The landing page should repeat the promise in the ad, show who you serve, and make contact frictionless. That is conversion work, not extra creative for its own sake.',
      },
      {
        heading: 'Local businesses in Hyderabad',
        body: 'If people search for a service plus a city, your site has to say that clearly and load fast. We work with local and growing businesses that need to get found, look credible, and make it easy to call, book, or message.',
      },
    ],
  },
  {
    slug: 'website-vs-app-what-to-build-first',
    title: 'Website or app first? How Digivate decides',
    description:
      'Most businesses need a converting website before a custom app. An MVP app makes sense when the product is the business, not the brochure.',
    date: '2026-09-05',
    category: 'App development',
    readMinutes: 4,
    sections: [
      {
        body: 'A website is how strangers understand you and inquire. An app is for repeat use: bookings, orders, internal ops, a product you will iterate. Digivate builds both. We start with the surface that creates the next customer, then the product that keeps them.',
      },
      {
        heading: 'When an MVP is the right first app',
        body: 'If you have a product idea, we do not build forty features. We define the one job the app must do, design that flow, and ship a version you can put in front of real users. CRM, payments, and notifications sit on a backend that can grow.',
      },
      {
        heading: 'They should share a system',
        body: 'The public site, the app, and the CRM should not be three islands. Leads, bookings, and accounts should land in one pipeline. That is why we plan services as a system even when you only buy one of them today.',
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
