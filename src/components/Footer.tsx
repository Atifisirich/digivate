import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import { AGENCY_NAME, AGENCY_TAGLINE, AGENCY_LOCATION, DISPLAY_PHONE, CONTACT_EMAIL, getWhatsAppUrl, SERVICES } from '../config/siteConfig';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="border-t border-black/[0.08] bg-white text-zinc-800 text-xs pt-16 sm:pt-20 pb-12 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-black/[0.08]">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="font-display text-2xl font-bold text-[#0f131a] tracking-tight group-hover:text-blue-600 transition-colors">
                {AGENCY_NAME}
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            </Link>
            <p className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
              {AGENCY_TAGLINE}
            </p>
            <p className="text-zinc-800 text-sm max-w-sm leading-relaxed font-normal">
              We help businesses grow through website development, app development, AI workflows, CRM automation, and digital marketing.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0f131a] hover:bg-blue-600 rounded-full transition-all cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book an Appointment</span>
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0f131a] bg-zinc-100 hover:bg-zinc-200 rounded-full transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-mono text-xs text-[#0f131a] uppercase tracking-wider block font-bold">
              Navigation
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-zinc-800 hover:text-blue-600 transition-colors text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-zinc-800 hover:text-blue-600 transition-colors text-sm font-medium">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-800 hover:text-blue-600 transition-colors text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-zinc-800 hover:text-blue-600 transition-colors text-sm font-medium">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-zinc-800 hover:text-blue-600 transition-colors text-sm font-medium">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-zinc-800 hover:text-blue-600 transition-colors text-sm font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-800 hover:text-blue-600 transition-colors text-sm font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="text-zinc-800 hover:text-blue-600 transition-colors text-sm font-medium">
                  Get a plan
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs text-[#0f131a] uppercase tracking-wider block font-bold">
              Core Services
            </span>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={s.path} className="text-zinc-800 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group">
                    <span>{s.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs text-[#0f131a] uppercase tracking-wider block font-bold">
              Contact & Location
            </span>
            <div className="space-y-3 text-sm text-zinc-800">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{AGENCY_LOCATION}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 font-medium text-zinc-800">
                  {DISPLAY_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono text-xs text-zinc-800 font-medium hover:text-blue-600">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <div className="font-medium">
            © {new Date().getFullYear()} {AGENCY_NAME}. Digital Growth Agency.
          </div>
          <div className="flex items-center gap-3 font-medium">
            <Link to="/services/web-development" className="hover:text-blue-600">Web Development</Link>
            <span>·</span>
            <Link to="/services/app-development" className="hover:text-blue-600">App Development</Link>
            <span>·</span>
            <Link to="/services/ai-automation" className="hover:text-blue-600">AI Workflows</Link>
            <span>·</span>
            <Link to="/services/digital-marketing" className="hover:text-blue-600">Digital Marketing</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
