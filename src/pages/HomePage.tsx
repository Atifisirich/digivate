import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { getWhatsAppUrl, DISPLAY_PHONE } from '../config/siteConfig';
import type { LoadingPhase } from '../App';
import { HeroAiVisual } from '../components/HeroAiVisual';
import { MovingServiceLine } from '../components/MovingServiceLine';
import { HomeServiceCards } from '../components/HomeServiceCards';
import { IndustriesWeServe } from '../components/IndustriesWeServe';
import { MissionVisionStory } from '../components/MissionVisionStory';
import { editorialEase } from '../components/EditorialMotion';
import { PAGE_SEO } from '../config/seo';
import { PageFaq, Seo } from '../components/Seo';

interface HomePageProps {
  onOpenBooking: () => void;
  loadingPhase?: LoadingPhase;
}

const HERO_LINES = [
  { text: 'Build.', accent: false },
  { text: 'Automate.', accent: true },
  { text: 'Grow.', accent: false },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking, loadingPhase = 'complete' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      <Seo page={PAGE_SEO.home} />
      <section className="hero relative z-0 min-h-0 pt-[5.5rem] pb-16 sm:min-h-[100svh] sm:pt-24 sm:pb-24 overflow-x-hidden flex flex-col justify-center">
        {loadingPhase !== 'initial' && (
          <motion.div
            layoutId="hero-blue-glow"
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}

        <div className="hero-content relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
              <div className="relative z-20 lg:col-span-6 min-w-0 space-y-6 sm:space-y-8">
                <h1 className="font-display font-bold tracking-[-0.06em] leading-[0.92] sm:leading-[0.84] text-[#0f131a]">
                  <span className="block mb-6 sm:mb-8 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-blue-600">
                    Digital agency in Hyderabad
                  </span>
                  {HERO_LINES.map((line, i) => (
                    <span key={line.text} className="editorial-word block max-w-full">
                      <motion.span
                        className={`editorial-word__inner block text-[clamp(2.35rem,12.5vw,5.6rem)] lg:text-[clamp(3.3rem,5.2vw,5.8rem)] ${
                          line.accent ? 'text-blue-600' : ''
                        }`}
                        initial={shouldReduceMotion ? { y: '0%' } : { y: '115%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.9, delay: 0.08 + i * 0.12, ease: editorialEase }}
                      >
                        {line.text}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, clipPath: 'inset(0 14% 0 0)' }}
                  animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.9, delay: 0.5, ease: editorialEase }}
                  className="text-base sm:text-xl text-zinc-600 max-w-xl font-normal leading-relaxed"
                >
                  Digivate builds website development, app development, AI workflows, CRM automation, and digital marketing as one system — so businesses in Hyderabad and beyond can get found, convert inquiries, and grow.
                </motion.p>

                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.66, ease: editorialEase }}
                  className="relative z-20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
                >
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="shrink-0 py-4 px-6 sm:px-8 rounded-full bg-[#0f131a] text-white hover:bg-blue-600 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-black/10 hover:shadow-blue-600/25 active:scale-98"
                  >
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Book an Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 py-4 px-6 sm:px-8 rounded-full bg-white text-zinc-800 hover:text-black hover:bg-zinc-100 border border-black/[0.12] font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                  </a>
                </motion.div>
              </div>

              <div className="relative z-10 lg:col-span-6 min-w-0 flex items-center justify-center lg:justify-end w-full">
                <HeroAiVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MovingServiceLine />
      <HomeServiceCards />
      <IndustriesWeServe />
      <MissionVisionStory />
      {PAGE_SEO.home.faqs ? (
        <PageFaq items={PAGE_SEO.home.faqs} moreHref="/faq" moreLabel="See all FAQs" />
      ) : null}

      <section className="py-16 sm:py-24 bg-[#0f131a] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span>Next Steps</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight">
              Ready to grow your business?
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto font-normal leading-relaxed">
              Book a growth consultation or connect directly on WhatsApp to discuss your website, marketing, automation, or app development requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              type="button"
              data-cursor="expand"
              onClick={onOpenBooking}
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-white text-[#0f131a] hover:bg-blue-500 hover:text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-xl active:scale-98"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppUrl()}
              data-cursor="expand"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-xl active:scale-98"
            >
              <MessageSquare className="w-4 h-4" />
                    <span className="sm:hidden">Chat on WhatsApp</span>
              <span className="hidden sm:inline">Chat on WhatsApp ({DISPLAY_PHONE})</span>
            </a>

            <Link
              to="/get-started"
              data-cursor="expand"
              className="w-full sm:w-auto py-4 px-8 rounded-full border border-white/20 text-white hover:bg-white/10 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
            >
              <span>Get a 60-second plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
