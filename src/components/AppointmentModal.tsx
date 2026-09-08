import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckCircle2, ArrowRight, Clock, Building2, User, Mail, Phone } from 'lucide-react';
import { DISPLAY_PHONE, AGENCY_LOCATION } from '../config/siteConfig';
import { submitLead } from '../lib/submitLead';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Web Development',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    service: initialService,
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM IST)',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitLead('appointment', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3200);
    } catch {
      setError('The request did not go through. Please try again or message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="appointment-modal-overlay"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-white border border-black/[0.1] rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl z-10 max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto my-0 sm:my-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            id="appointment-modal"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black p-1.5 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0f131a] font-display">
                  Book an Appointment
                </h3>
                <p className="text-xs text-zinc-500">
                  Schedule a direct growth consultation with Digivate ({AGENCY_LOCATION})
                </p>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-3"
              >
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-[#0f131a] font-display">Appointment Requested</h4>
                <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-black">{formData.name}</span>. We have received your consultation request for <span className="font-semibold text-black">{formData.service}</span>. Our team will reach out via WhatsApp/email at <span className="font-semibold text-black">{formData.phone || formData.email}</span> to confirm your time slot.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-3 bg-zinc-50 border border-black/[0.1] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Apex Health"
                      className="w-full px-3.5 py-3 bg-zinc-50 border border-black/[0.1] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-3 bg-zinc-50 border border-black/[0.1] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-3 bg-zinc-50 border border-black/[0.1] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Service Interested In</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-3 bg-zinc-50 border border-black/[0.1] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                  >
                    <option value="Web Development">01 — Web Development (High-converting websites)</option>
                    <option value="DIGITAL_MARKETING">02 — Digital Marketing (SEO, Ads, Content)</option>
                    <option value="AI Automation">03 — AI Automation (Automated workflows & leads)</option>
                    <option value="Digital Marketing">04 — Digital Marketing (Targeted campaigns)</option>
                    <option value="All Services / Complete Growth System">All Services / Complete Growth System</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-3 bg-zinc-50 border border-black/[0.1] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Preferred Time Window</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-3 bg-zinc-50 border border-black/[0.1] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                    >
                      <option value="Morning (10:00 AM - 1:00 PM IST)">Morning (10:00 AM - 1:00 PM IST)</option>
                      <option value="Afternoon (2:00 PM - 5:00 PM IST)">Afternoon (2:00 PM - 5:00 PM IST)</option>
                      <option value="Evening (5:00 PM - 8:00 PM IST)">Evening (5:00 PM - 8:00 PM IST)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Project Goals / Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you want to achieve or automate for your business..."
                    className="w-full px-3.5 py-3 bg-zinc-50 border border-black/[0.1] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#0f131a] text-white text-sm font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <span>{loading ? 'Sending request...' : 'Request Appointment'}</span>
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
