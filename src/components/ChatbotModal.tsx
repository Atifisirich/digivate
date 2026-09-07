import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Calendar, MessageSquare, ArrowUpRight, Bot, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import { getWhatsAppUrl } from '../config/siteConfig';
import { answerFromKnowledge } from '../lib/knowledgeBase';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: "Hi! I'm the Digivate assistant. What would you like help with?",
      timestamp: Date.now(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    if (/\b(book an appointment|book a call|book appointment)\b/i.test(messageText)) {
      onOpenBooking();
      onClose();
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: messageText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    const controller = new AbortController();
    const abortTimer = window.setTimeout(() => controller.abort(), 9000);

    try {
      // Call server-side /api/chat endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "Digivate helps businesses grow through web development, digital marketing, AI automation, and app development. Would you like to schedule an appointment or chat on WhatsApp?";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: botReply,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.warn('Chat API fetch error, applying knowledge-base fallback:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: answerFromKnowledge(messageText),
          timestamp: Date.now(),
        },
      ]);
    } finally {
      window.clearTimeout(abortTimer);
      setLoading(false);
    }
  };

  const suggestedOptions = [
    { label: 'I need a website', action: () => handleSendMessage('I need a website') },
    { label: 'I want more Google visibility', action: () => handleSendMessage('I want more Google visibility') },
    { label: 'I want to automate my business', action: () => handleSendMessage('I want to automate my business') },
    { label: 'I want help with digital marketing', action: () => handleSendMessage('I want help with digital marketing') },
    { label: "I'd like to book an appointment", action: () => { onOpenBooking(); onClose(); } },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="chatbot-modal-overlay"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 pointer-events-none"
        >
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs sm:hidden pointer-events-auto"
          />

          {/* Chat Window Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full sm:w-[420px] h-[580px] max-h-[85vh] bg-white border border-black/[0.12] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col pointer-events-auto z-10 overflow-hidden"
            id="ask-digivate-chat-panel"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-zinc-50 border-b border-black/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0f131a] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f131a] font-display flex items-center gap-1.5">
                    <span>Digivate Assistant</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500">Digital Growth Consultation</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-black rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Close Ask Digivate Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#fafaf8]">
              {messages.map((msg) => {
                const isModel = msg.role === 'model';

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${isModel ? 'justify-start' : 'justify-end'}`}
                  >
                    {isModel && (
                      <div className="w-6 h-6 rounded-md bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 text-xs shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isModel
                          ? 'bg-white text-zinc-800 border border-black/[0.08] shadow-xs rounded-tl-xs'
                          : 'bg-[#0f131a] text-white rounded-tr-xs font-medium shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-6 h-6 rounded-md bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 text-xs shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-white border border-black/[0.08] text-xs text-zinc-500 flex items-center gap-1.5 shadow-xs">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                    <span>Digivate is assisting...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Options Carousel */}
            <div className="px-3 py-2.5 bg-zinc-50 border-t border-black/[0.06] overflow-x-auto scrollbar-none flex items-center gap-1.5">
              {suggestedOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={opt.action}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-zinc-100 border border-black/[0.08] text-[11px] font-medium text-zinc-700 hover:text-black whitespace-nowrap transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Direct Touchpoints */}
            <div className="px-3 py-2 bg-zinc-50 border-t border-black/[0.06] flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onOpenBooking();
                  onClose();
                }}
                className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-zinc-100 border border-black/[0.08] text-zinc-900 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Book Appointment</span>
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-black/[0.06] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about websites, marketing, automation, apps..."
                className="flex-1 px-3.5 py-2 bg-zinc-50 border border-black/[0.08] rounded-xl text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 rounded-xl bg-[#0f131a] text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
