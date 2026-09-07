import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, CheckCircle2, MessageSquare, RefreshCw } from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { editorialEase } from '../components/EditorialMotion';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, Seo } from '../components/Seo';

interface GetStartedPageProps {
  onOpenBooking: () => void;
}

type NeedId = 'web' | 'marketing' | 'automation' | 'app' | 'unsure';

const needs: { id: NeedId; title: string; hint: string }[] = [
  { id: 'web', title: 'A website that converts', hint: 'New site or a rebuild' },
  { id: 'marketing', title: 'More of the right inquiries', hint: 'SEO, ads, and campaigns' },
  { id: 'automation', title: 'Less manual follow-up', hint: 'WhatsApp, CRM, booking' },
  { id: 'app', title: 'An app or product', hint: 'Mobile or web app' },
  { id: 'unsure', title: 'Not sure yet', hint: 'We’ll help you choose' },
];

const situations: Record<NeedId, { id: string; label: string }[]> = {
  web: [
    { id: 'none', label: 'We don’t have a proper website yet' },
    { id: 'weak', label: 'We have a site, but it doesn’t bring inquiries' },
    { id: 'rebuild', label: 'It looks dated and we need a rebuild' },
  ],
  marketing: [
    { id: 'invisible', label: 'People can’t find us on Google' },
    { id: 'wrong', label: 'We get traffic, but not the right customers' },
    { id: 'ads', label: 'We want campaigns that actually produce leads' },
  ],
  automation: [
    { id: 'slow', label: 'Inquiries sit unanswered for hours' },
    { id: 'manual', label: 'Follow-ups and booking are done by hand' },
    { id: 'tools', label: 'WhatsApp, forms, and CRM don’t talk to each other' },
  ],
  app: [
    { id: 'idea', label: 'We have an idea and need it built' },
    { id: 'mvp', label: 'We need an MVP to test with customers' },
    { id: 'improve', label: 'We have an app that needs to work better' },
  ],
  unsure: [
    { id: 'grow', label: 'We just need more customers' },
    { id: 'ops', label: 'The business feels messy online' },
    { id: 'launch', label: 'We’re launching something new' },
  ],
};

function buildPlan(need: NeedId, situationId: string) {
  const plans: Record<string, { headline: string; points: string[]; next: string }> = {
    'web-none': {
      headline: 'Start with a site built around how you actually get customers.',
      points: [
        'A fast, mobile-first website with a clear offer and one obvious next step (WhatsApp or booking).',
        'Service pages written so people understand what you do in a few seconds.',
        'Inquiry paths that don’t dump leads into a dead form.',
      ],
      next: 'On a call we’d look at your offer, who you serve, and sketch the pages that should exist first.',
    },
    'web-weak': {
      headline: 'Fix conversion before you spend more on traffic.',
      points: [
        'Rewrite the homepage around one outcome, not a list of features.',
        'Make contact frictionless: WhatsApp, callback, or a short form.',
        'Tighten speed and mobile layout so people don’t bounce.',
      ],
      next: 'Bring the current URL. We’ll walk through where visitors drop off and what to change first.',
    },
    'web-rebuild': {
      headline: 'Rebuild the site as a sales tool, not a brochure.',
      points: [
        'New structure, design, and content mapped to your real services.',
        'Keep what already ranks, if anything is working.',
        'Launch with booking and WhatsApp already connected.',
      ],
      next: 'We’ll review the existing site and agree what to keep versus rewrite.',
    },
    'marketing-invisible': {
      headline: 'Get found for the searches that already mean buying intent.',
      points: [
        'Technical and on-page SEO so Google can understand the business.',
        'Location and service pages for the queries you actually want.',
        'A site that can hold the traffic once it arrives.',
      ],
      next: 'We’ll ask which services you want to rank for, and in which cities.',
    },
    'marketing-wrong': {
      headline: 'Stop attracting the wrong audience.',
      points: [
        'Tighten targeting and messaging around who you actually want.',
        'Match landing pages to the campaign, not a generic homepage.',
        'Track inquiries, not just clicks.',
      ],
      next: 'Share how you currently get leads. We’ll separate what’s worth keeping from what’s wasting spend.',
    },
    'marketing-ads': {
      headline: 'Run campaigns that end in a conversation, not a vanity metric.',
      points: [
        'Clear offer, audience, and landing page before ads go live.',
        'Lead capture that replies quickly.',
        'Weekly review of what produced real inquiries.',
      ],
      next: 'We’ll need your offer, ticket size, and where you want customers from.',
    },
    'automation-slow': {
      headline: 'Answer people while they’re still interested.',
      points: [
        'Instant WhatsApp or email acknowledgement when someone inquires.',
        'A simple qualification path so you know who to call first.',
        'Handoff to you only when a human should step in.',
      ],
      next: 'Tell us where inquiries currently arrive (WhatsApp, form, Instagram). We’ll map one flow.',
    },
    'automation-manual': {
      headline: 'Take booking and follow-up off your plate.',
      points: [
        'Automated reminders and a calendar path for appointments.',
        'CRM or sheet logging so nothing lives only in someone’s chat.',
        'Fewer “did anyone reply to that?” moments.',
      ],
      next: 'We’ll look at your current booking process and what you still want to do yourself.',
    },
    'automation-tools': {
      headline: 'Connect the tools you already use.',
      points: [
        'One intake path into WhatsApp, CRM, and calendar.',
        'No more copying the same lead into three places.',
        'A workflow you can actually run day to day.',
      ],
      next: 'List the tools you already pay for. We build around those first.',
    },
    'app-idea': {
      headline: 'Turn the idea into a first version with a clear job.',
      points: [
        'Define the one thing the product must do well.',
        'UI and a build plan for an MVP, not a 40-feature wishlist.',
        'A path to launch and iterate.',
      ],
      next: 'We’ll ask who the user is and what “success” looks like in 90 days.',
    },
    'app-mvp': {
      headline: 'Ship an MVP you can put in front of real users.',
      points: [
        'Scope the smallest useful version.',
        'Build web or mobile around that scope.',
        'Instrument the basics so you can see if people use it.',
      ],
      next: 'Bring any notes, screens, or competitors. We’ll cut the first version down to what matters.',
    },
    'app-improve': {
      headline: 'Fix what’s blocking people from using the product.',
      points: [
        'Audit speed, UX, and the flows that currently fail.',
        'Prioritize the changes that affect usage, not cosmetics.',
        'A staged plan so you’re not rebuilding everything at once.',
      ],
      next: 'We’ll need access or a walkthrough of the current app.',
    },
    'unsure-grow': {
      headline: 'Most businesses here need a site that converts, then visibility.',
      points: [
        'Make the website the place that turns interest into a WhatsApp or booking.',
        'Then work on search and campaigns so the right people find it.',
        'Automate follow-up so leads don’t go cold.',
      ],
      next: 'A short call is enough to pick the first move. You don’t need a full brief.',
    },
    'unsure-ops': {
      headline: 'Clean up the system before you add more traffic.',
      points: [
        'One clear website, one inquiry path, one place leads are stored.',
        'Automation for the repetitive replies.',
        'Marketing only after that foundation exists.',
      ],
      next: 'We’ll map how a customer currently finds you and where it breaks.',
    },
    'unsure-launch': {
      headline: 'Launch with a site, a story, and a way to capture interest.',
      points: [
        'A launch page or site that explains the offer cleanly.',
        'Inquiry and booking ready on day one.',
        'A simple marketing plan for the first 30 days.',
      ],
      next: 'Tell us the launch date and who it’s for. We’ll sequence website vs. campaigns.',
    },
  };

  return (
    plans[`${need}-${situationId}`] ?? {
      headline: 'We’ll start with what’s blocking growth, then pick one service to do first.',
      points: [
        'Website, marketing, automation, or an app — only what you actually need now.',
        'A clear first project, not a 12-month bundle you didn’t ask for.',
        'Next step is a conversation, not a generated price.',
      ],
      next: 'Book a call or WhatsApp us with what the business does. That’s enough to start.',
    }
  );
}

export const GetStartedPage: React.FC<GetStartedPageProps> = ({ onOpenBooking }) => {
  const [need, setNeed] = useState<NeedId | null>(null);
  const [situation, setSituation] = useState<string | null>(null);

  const plan = useMemo(() => {
    if (!need || !situation) return null;
    return buildPlan(need, situation);
  }, [need, situation]);

  const reset = () => {
    setNeed(null);
    setSituation(null);
  };

  return (
    <div className="pt-24 pb-24">
      <Seo page={PAGE_SEO.start} />
      <section className="pt-12 md:pt-20 pb-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {PAGE_SEO.start.breadcrumbs ? <PageBreadcrumb items={PAGE_SEO.start.breadcrumbs} /> : null}
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
          60-second plan
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-[#0f131a] tracking-tight leading-[1.05]">
          Tell us the problem.
          <br />
          We’ll show the first move.
        </h1>
        <p className="text-lg text-zinc-600 leading-relaxed">
          This is not a price quote and it does not guess how many leads you’ll get. It tells you what Digivate would actually work on, based on what you pick.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-500">
              1. What do you need help with?
            </h2>
            {need && (
              <button type="button" onClick={reset} className="text-xs font-bold text-zinc-500 hover:text-[#0f131a] inline-flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Start over
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {needs.map((item) => {
              const active = need === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setNeed(item.id);
                    setSituation(null);
                  }}
                  className={`text-left p-5 rounded-2xl border transition-all ${
                    active
                      ? 'bg-[#0f131a] text-white border-[#0f131a]'
                      : 'bg-white/70 border-black/[0.08] hover:border-blue-600/40'
                  }`}
                >
                  <div className="font-display font-bold text-lg">{item.title}</div>
                  <div className={`text-sm mt-1 ${active ? 'text-zinc-300' : 'text-zinc-500'}`}>{item.hint}</div>
                </button>
              );
            })}
          </div>
        </div>

        {need && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: editorialEase }}
            className="space-y-4"
          >
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-500">
              2. What’s true right now?
            </h2>
            <div className="space-y-2">
              {situations[need].map((item) => {
                const active = situation === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSituation(item.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border text-sm sm:text-base transition-all ${
                      active
                        ? 'bg-blue-50 border-blue-600 text-[#0f131a] font-semibold'
                        : 'bg-white/70 border-black/[0.08] hover:border-blue-600/40 text-zinc-700'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: editorialEase }}
            className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                What we’d do first
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0f131a] leading-tight">
                {plan.headline}
              </h2>
            </div>
            <ul className="space-y-3">
              {plan.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm sm:text-base text-zinc-700 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-zinc-600 leading-relaxed border-t border-black/[0.06] pt-5">
              {plan.next} There is no generated fee or lead count here — pricing depends on scope, and we only quote after a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0f131a] text-white font-bold text-sm hover:bg-blue-600"
              >
                <Calendar className="w-4 h-4" />
                Book a conversation
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-black/[0.1] font-bold text-sm text-[#0f131a] hover:border-blue-600"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                Send this on WhatsApp
              </a>
            </div>
            <Link to="/services" className="inline-flex items-center gap-1 text-sm font-bold text-zinc-500 hover:text-blue-600">
              Read the services in more detail
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </section>
    </div>
  );
};
