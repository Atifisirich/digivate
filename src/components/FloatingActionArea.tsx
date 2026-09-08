import React from 'react';
import { Sparkles } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';

interface FloatingActionAreaProps {
  onOpenChat: () => void;
  isChatOpen: boolean;
}

export const FloatingActionArea: React.FC<FloatingActionAreaProps> = ({
  onOpenChat,
  isChatOpen,
}) => {
  return (
    <div
      id="floating-actions"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 sm:gap-3 pointer-events-auto"
    >
      {/* Hidden on small screens so it does not cover the hero WhatsApp CTA. */}
      <div className="hidden sm:block">
        <WhatsAppButton />
      </div>

      {/* Ask Digivate AI Chatbot Button */}
      {!isChatOpen && (
        <button
          type="button"
          onClick={onOpenChat}
          id="floating-ask-digivate-btn"
          className="group flex items-center gap-2 min-h-11 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#0f131a] text-white hover:bg-blue-600 shadow-xl shadow-black/15 transition-all active:scale-95 cursor-pointer"
          aria-label="Open Ask Digivate AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          </div>
          <span className="text-xs font-bold whitespace-nowrap">
            Ask Digivate
          </span>
        </button>
      )}
    </div>
  );
};
