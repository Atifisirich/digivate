export type FaqItem = { question: string; answer: string };

export const SITE_FAQS: FaqItem[] = [
  {
    question: 'What kind of digital agency is Digivate?',
    answer:
      'Digivate is a digital growth agency in Hyderabad. We plan and build websites, apps, AI workflows, CRM connections, and digital marketing as one system — not disconnected one-off projects.',
  },
  {
    question: 'Do you work with clients outside Hyderabad?',
    answer:
      'Yes. Digivate is based in Hyderabad and works with businesses across India, including Bangalore, Mumbai, Delhi NCR, Pune, and Chennai. Projects run remotely over calls, WhatsApp, and shared documents, so your location does not change how we work together.',
  },
  {
    question: 'Do you offer website development?',
    answer:
      'Yes. We design and develop high-performance websites built to convert visitors into inquiries, with mobile-first layouts, technical SEO foundations, and WhatsApp or booking paths. New sites and rebuilds are both in scope.',
  },
  {
    question: 'Do you build mobile and web apps?',
    answer:
      'Yes. We build native and cross-platform mobile apps and web applications, including product strategy, UI/UX, backend APIs, CRM integrations, and launch support. An MVP first is fine.',
  },
  {
    question: 'Can you automate AI workflows and CRMs?',
    answer:
      'Yes. We connect websites, WhatsApp, forms, calendars, and CRMs so leads get answered, logged, and followed up without manual copy-paste. You do not need a CRM already — we can use yours or recommend a simple setup.',
  },
  {
    question: 'Do you handle digital marketing and SEO?',
    answer:
      'Yes. We run SEO, paid search, content, and campaigns aimed at qualified inquiries — not vanity traffic — and we tie them back to a website that can convert.',
  },
  {
    question: 'Where is Digivate based?',
    answer:
      'Hyderabad, India. We work with local businesses and with growing companies that need a website, app, automation, or marketing system they can actually use.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'We do not publish packages. Price depends on pages, features, and integrations. WhatsApp +91 6309589438, email info@digivate.in, or book an appointment for a scoped estimate. We will not quote a number in chat without seeing the work.',
  },
  {
    question: 'How long does a website take?',
    answer:
      'It depends on scope and how quickly content and feedback come back. A focused marketing site is faster than a custom app. On a call we agree what ships first, then expand.',
  },
  {
    question: 'Can I start with only one service?',
    answer:
      'Yes. Many clients start with a website or a campaign. We still design it so CRM, booking, and follow-up can be added later without rebuilding everything.',
  },
  {
    question: 'Do you rebuild existing websites?',
    answer:
      'Yes. We rebuild slow or outdated sites into conversion-focused websites while keeping what already works for search, where it makes sense.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book an appointment on digivate.in, message WhatsApp +91 6309589438, email info@digivate.in, or use Get a 60-second plan to see the first move we would work on.',
  },
  {
    question: 'Who founded Digivate?',
    answer:
      'Atif Khan is founder. Hajira Bi is co-founder. The agency is based in Hyderabad.',
  },
];

export const HOME_FAQS = SITE_FAQS.slice(0, 6);
