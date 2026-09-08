import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ChevronDown, Globe, Search, Cpu, BarChart3, Smartphone, BarChart, Layers } from 'lucide-react';
import { AGENCY_NAME } from '../config/siteConfig';
import type { LoadingPhase } from '../App';

interface NavigationProps {
  onOpenBooking: () => void;
  loadingPhase?: LoadingPhase;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenBooking, loadingPhase = 'complete' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  const serviceSubItems = [
    {
      name: 'Web Development',
      path: '/services/web-development',
      icon: Globe,
      desc: 'High-performance websites built for business conversion.',
    },
    {
      name: 'AI Automation',
      path: '/services/ai-automation',
      icon: Cpu,
      desc: 'AI workflows and CRM automation for leads, WhatsApp, and booking.',
    },
    {
      name: 'Digital Marketing',
      path: '/services/digital-marketing',
      icon: BarChart3,
      desc: 'Targeted multi-channel campaigns engineered for inquiries.',
    },
    {
      name: 'App Development',
      path: '/services/app-development',
      icon: Smartphone,
      desc: 'Custom mobile and web applications built for scale.',
    },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#fafaf8]/95 backdrop-blur-xl border-b border-black/[0.07] py-3 shadow-xs'
          : 'bg-transparent border-b border-transparent py-3 sm:py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-[3px] sm:gap-[4px] group relative z-50">
          {loadingPhase !== 'initial' ? (
            <motion.div 
              layoutId="brand-logo-container" 
              className="flex items-baseline justify-center"
            >
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0f131a] group-hover:text-blue-600 transition-colors origin-left">
                {AGENCY_NAME}
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-125 transition-transform ml-[2px]" />
            </motion.div>
          ) : (
            <div className="flex items-baseline justify-center opacity-0 pointer-events-none">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                {AGENCY_NAME}
              </span>
              <span className="w-2 h-2 rounded-full ml-[2px]" />
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-xs lg:text-sm font-semibold tracking-wide transition-colors relative py-1.5 ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-zinc-700 hover:text-black'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>HOME</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>

          {/* Services with Hover/Click Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterServices}
            onMouseLeave={handleMouseLeaveServices}
          >
            <div className="flex items-center gap-1">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-semibold tracking-wide transition-colors relative py-1.5 flex items-center gap-1 ${
                    isActive || location.pathname.startsWith('/services')
                      ? 'text-blue-600 font-bold'
                      : 'text-zinc-700 hover:text-black'
                  }`
                }
              >
                <span>SERVICES</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-zinc-400'
                  }`}
                />
              </NavLink>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  key="services-dropdown"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full -left-4 w-80 bg-white border border-black/[0.08] rounded-2xl shadow-xl p-3 z-50 mt-1"
                >
                  <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider px-3 pt-2 pb-1">
                    Agency Services
                  </div>
                  <div className="space-y-1">
                    {serviceSubItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </div>
                          <p className="text-[11px] text-zinc-500 line-clamp-1">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-black/[0.05] mt-2 pt-2 px-2">
                    <Link
                      to="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center justify-between p-1"
                    >
                      <span>View All Services Overview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About Us */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-xs lg:text-sm font-semibold tracking-wide transition-colors relative py-1.5 ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-zinc-700 hover:text-black'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>ABOUT US</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>

          {/* Portfolio */}
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `text-xs lg:text-sm font-semibold tracking-wide transition-colors relative py-1.5 ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-zinc-700 hover:text-black'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>PORTFOLIO</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>

          {/* Blog */}
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `text-xs lg:text-sm font-semibold tracking-wide transition-colors relative py-1.5 ${
                isActive || location.pathname.startsWith('/blog')
                  ? 'text-blue-600 font-bold'
                  : 'text-zinc-700 hover:text-black'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>BLOG</span>
                {(isActive || location.pathname.startsWith('/blog')) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>

          {/* FAQ */}
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `text-xs lg:text-sm font-semibold tracking-wide transition-colors relative py-1.5 ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-zinc-700 hover:text-black'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>FAQ</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-xs lg:text-sm font-semibold tracking-wide transition-colors relative py-1.5 ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-zinc-700 hover:text-black'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>CONTACT</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={onOpenBooking}
            id="nav-book-appointment-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs lg:text-sm font-bold text-white bg-[#0f131a] hover:bg-blue-600 rounded-full transition-all active:scale-95 cursor-pointer shadow-md shadow-black/10 hover:shadow-blue-600/25"
          >
            <span>Book an Appointment</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenBooking}
            className="min-h-11 px-4 py-2 text-xs font-bold text-white bg-[#0f131a] rounded-full"
          >
            Book
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 min-h-11 min-w-11 text-zinc-800 hover:text-black"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden max-h-[min(80vh,calc(100dvh-4.5rem))] overflow-y-auto border-b border-black/[0.08] bg-white px-6 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))] space-y-5 shadow-xl"
          >
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold transition-colors ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-zinc-800'
                }`}
              >
                HOME
              </Link>

              <div className="py-1">
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-bold block mb-2 transition-colors ${
                    location.pathname === '/services' ? 'text-blue-600' : 'text-zinc-800'
                  }`}
                >
                  SERVICES
                </Link>
                <div className="pl-3 space-y-2 border-l-2 border-zinc-200">
                  {serviceSubItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-zinc-600 hover:text-blue-600 font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold transition-colors ${
                  location.pathname === '/about' ? 'text-blue-600' : 'text-zinc-800'
                }`}
              >
                ABOUT US
              </Link>

              <Link
                to="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold transition-colors ${
                  location.pathname === '/portfolio' ? 'text-blue-600' : 'text-zinc-800'
                }`}
              >
                PORTFOLIO
              </Link>

              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold transition-colors ${
                  location.pathname.startsWith('/blog') ? 'text-blue-600' : 'text-zinc-800'
                }`}
              >
                BLOG
              </Link>

              <Link
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold transition-colors ${
                  location.pathname === '/faq' ? 'text-blue-600' : 'text-zinc-800'
                }`}
              >
                FAQ
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold transition-colors ${
                  location.pathname === '/contact' ? 'text-blue-600' : 'text-zinc-800'
                }`}
              >
                CONTACT
              </Link>
            </div>

            <div className="pt-4 border-t border-black/[0.06]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-[#0f131a] hover:bg-blue-600 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Book an Appointment</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
