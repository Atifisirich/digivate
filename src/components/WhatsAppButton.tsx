import React from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';

export const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      id="floating-whatsapp-btn"
      className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-black/[0.12] text-[#0f131a] hover:border-emerald-500 hover:bg-emerald-50/50 shadow-xl shadow-black/10 transition-all active:scale-95 cursor-pointer"
      aria-label="Connect with Digivate on WhatsApp (+91 6309589438)"
    >
      <div className="relative">
        <MessageSquare className="w-4 h-4 text-emerald-600" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <span className="text-xs font-bold whitespace-nowrap hidden sm:inline text-zinc-900">
        WhatsApp: +91 6309589438
      </span>
      <span className="text-xs font-bold whitespace-nowrap sm:hidden text-zinc-900">
        WhatsApp
      </span>
      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
