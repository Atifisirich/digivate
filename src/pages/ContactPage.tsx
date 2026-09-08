import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import {
  AGENCY_NAME,
  AGENCY_LOCATION,
  DISPLAY_PHONE,
  CONTACT_EMAIL,
  getWhatsAppUrl,
} from '../config/siteConfig';
import { submitLead } from '../lib/submitLead';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, Seo } from '../components/Seo';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    phone: '',
    serviceNeeded: '01 — Web Development (High-converting websites)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitLead('contact', formData);
      setSubmitted(true);
    } catch {
      setError('The message did not go through. Please try again or reach us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <Seo page={PAGE_SEO.contact} />
      {/* Page Header */}
      <section className="py-16 sm:py-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            {PAGE_SEO.contact.breadcrumbs ? <PageBreadcrumb items={PAGE_SEO.contact.breadcrumbs} /> : null}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
              <span>Direct Inquiries</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f131a] font-display tracking-tight leading-tight">
              Contact Digivate
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
              Have a question, want to explore a new digital project, or need assistance? Reach out directly via our contact form or connect immediately on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Area: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
                  Direct Communication
                </span>
                <h2 className="text-3xl font-bold text-[#0f131a] font-display">
                  Get in Touch
                </h2>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  We respond promptly to all business inquiries during regular operational hours.
                </p>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div className="p-6 rounded-3xl bg-white border border-black/[0.08] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono text-zinc-400 font-bold uppercase">Agency Location</h3>
                    <p className="text-base font-bold text-[#0f131a]">{AGENCY_LOCATION}</p>
                    <p className="text-xs text-zinc-500">Serving clients locally in Hyderabad and globally.</p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="p-6 rounded-3xl bg-white border border-black/[0.08] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono text-zinc-400 font-bold uppercase">Phone & WhatsApp</h3>
                    <p className="text-base font-bold text-[#0f131a]">{DISPLAY_PHONE}</p>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold hover:underline pt-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat directly on WhatsApp →</span>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="p-6 rounded-3xl bg-white border border-black/[0.08] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono text-zinc-400 font-bold uppercase">Email Address</h3>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-mono text-[#0f131a] font-bold hover:text-blue-600">
                      {CONTACT_EMAIL}
                    </a>
                    <p className="text-xs text-zinc-500">Official business correspondence channel.</p>
                  </div>
                </div>


              </div>
            </div>

            {/* Right Area: Send Us a Message Form */}
            <div className="lg:col-span-7">
              <div className="p-5 sm:p-12 rounded-3xl bg-white border border-black/[0.08] shadow-lg shadow-black/5 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f131a] font-display">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-zinc-600">
                    Fill in your details below and our team will get back to you promptly.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-emerald-950 font-display">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                        Thank you for reaching out to Digivate. A member of our team will review your inquiry and get in touch with you shortly.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-emerald-700 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Follow up on WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            businessName: '',
                            phone: '',
                            serviceNeeded: '01 — Web Development (High-converting websites)',
                            message: '',
                          });
                        }}
                        className="text-xs text-zinc-600 underline font-mono"
                      >
                        Send another message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-zinc-700 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-4 py-3 bg-[#fafaf8] border border-black/[0.08] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-zinc-700 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.name@example.com"
                          className="w-full px-4 py-3 bg-[#fafaf8] border border-black/[0.08] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Business Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-zinc-700 block">
                          Business Name
                        </label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="Company or Practice Name"
                          className="w-full px-4 py-3 bg-[#fafaf8] border border-black/[0.08] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                        />
                      </div>

                      {/* Phone / WhatsApp */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-zinc-700 block">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 bg-[#fafaf8] border border-black/[0.08] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Service Needed Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-zinc-700 block">
                        Service Needed *
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full px-4 py-3 bg-[#fafaf8] border border-black/[0.08] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors cursor-pointer"
                      >
                        <option value="01 — Web Development (High-converting websites)">01 — Web Development (High-converting websites)</option>
                        <option value="02 — App Development (Custom mobile & web apps)">02 — App Development (Custom mobile & web apps)</option>
                        <option value="03 — Digital Marketing (SEO, Ads, Content & Growth)">03 — Digital Marketing (SEO, Ads, Content & Growth)</option>
                        <option value="04 — AI Automation (Automated workflows & business systems)">04 — AI Automation (Automated workflows & business systems)</option>
                        <option value="All Services / Complete Growth System">All Services / Complete Growth System</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-zinc-700 block">
                        Message / Project Details *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your business goals, current challenges, or project requirements..."
                        className="w-full px-4 py-3 bg-[#fafaf8] border border-black/[0.08] rounded-xl text-base sm:text-sm text-zinc-900 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                      />
                    </div>

                    {error ? <p className="text-sm text-red-600">{error}</p> : null}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-[#0f131a] text-white hover:bg-blue-600 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-99 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to Digivate</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
