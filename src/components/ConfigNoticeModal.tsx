import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MessageSquare, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { BOOKING_URL, WHATSAPP_NUMBER, CONTACT_EMAIL } from '../config/siteConfig';

interface ConfigNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'booking' | 'whatsapp' | 'email';
}

export const ConfigNoticeModal: React.FC<ConfigNoticeModalProps> = ({ isOpen, onClose, type }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Web Development', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  const getTitle = () => {
    if (type === 'booking') return 'Schedule an Appointment';
    if (type === 'whatsapp') return 'Connect on WhatsApp';
    return 'Contact Digivate';
  };

  const getNoticeMessage = () => {
    if (type === 'booking') {
      return (
        <div className="text-xs text-zinc-600 bg-blue-50 p-3.5 rounded-xl border border-blue-200 mb-4">
          <p className="font-mono text-blue-700 font-bold mb-1">Configuration Notice:</p>
          <p>
            <code className="text-blue-900 font-mono bg-blue-100 px-1 py-0.5 rounded">BOOKING_URL</code> in <code className="text-blue-900 font-mono bg-blue-100 px-1 py-0.5 rounded">siteConfig.ts</code> can be configured with your direct Calendly link. You can submit this form directly to notify Digivate.
          </p>
        </div>
      );
    }
    if (type === 'whatsapp') {
      return (
        <div className="text-xs text-zinc-600 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 mb-4">
          <p className="font-mono text-emerald-700 font-bold mb-1">Configuration Notice:</p>
          <p>
            <code className="text-emerald-900 font-mono bg-emerald-100 px-1 py-0.5 rounded">WHATSAPP_NUMBER</code> in <code className="text-emerald-900 font-mono bg-emerald-100 px-1 py-0.5 rounded">siteConfig.ts</code> can be configured with your WhatsApp number. You can submit this form directly to connect.
          </p>
        </div>
      );
    }
    return (
      <div className="text-xs text-zinc-600 bg-zinc-100 p-3.5 rounded-xl border border-zinc-200 mb-4">
        <p className="font-mono text-zinc-800 font-bold mb-1">Configuration Notice:</p>
        <p>
          <code className="text-zinc-900 font-mono bg-zinc-200 px-1 py-0.5 rounded">CONTACT_EMAIL</code> in <code className="text-zinc-900 font-mono bg-zinc-200 px-1 py-0.5 rounded">siteConfig.ts</code> can be configured with your agency inbox.
        </p>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="config-notice-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-white border border-black/[0.1] rounded-3xl p-6 md:p-8 shadow-2xl z-10"
            id="config-modal-container"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black p-1.5 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                {type === 'booking' ? <Calendar className="w-5 h-5" /> : type === 'whatsapp' ? <MessageSquare className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0f131a] font-display">{getTitle()}</h3>
                <p className="text-xs text-zinc-500">Connect directly with Digivate</p>
              </div>
            </div>

            {((type === 'booking' && !BOOKING_URL) || (type === 'whatsapp' && !WHATSAPP_NUMBER) || (type === 'email' && !CONTACT_EMAIL)) && (
              getNoticeMessage()
            )}

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-[#0f131a] mb-1">Inquiry Received</h4>
                <p className="text-sm text-zinc-600">
                  Thank you! A Digivate representative will follow up regarding your {formData.service} project.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/[0.1] rounded-xl text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/[0.1] rounded-xl text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Service Needed</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/[0.1] rounded-xl text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                  >
                    <option value="Web Development">01 — Web Development</option>
                    <option value="DIGITAL_MARKETING">02 — Digital Marketing</option>
                    <option value="AI Automation">03 — AI Automation</option>
                    <option value="Digital Marketing">04 — Digital Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Project Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Brief description of your business goals..."
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-black/[0.1] rounded-xl text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0f131a] text-white text-sm font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Submit Project Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

