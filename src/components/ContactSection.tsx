import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageSquare, ArrowUpRight } from 'lucide-react';
import { BOOKING_URL, getWhatsAppUrl } from '../config/siteConfig';

interface ContactSectionProps {
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenBooking,
  onOpenWhatsApp,
}) => {
  const handleBooking = () => {
    if (BOOKING_URL && BOOKING_URL.trim() !== '') {
      window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
    } else {
      onOpenBooking();
    }
  };

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      onOpenWhatsApp();
    }
  };

  return (
    <section id="contact" className="py-28 md:py-40 relative bg-[#fafaf8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-blue-600 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>Initiate Engagement</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#0f131a] font-display tracking-tight leading-[1.04]"
          >
            Have a digital project in mind?
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Let's talk about what you want to build, automate or grow.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={handleBooking}
              id="contact-book-appointment-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0f131a] text-white font-bold text-sm sm:text-base hover:bg-blue-600 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={handleWhatsApp}
              id="contact-whatsapp-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-zinc-50 border border-black/[0.1] text-zinc-800 font-semibold text-sm sm:text-base transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

