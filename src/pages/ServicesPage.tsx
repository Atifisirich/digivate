import React, { useRef, useState, useEffect, Component, ErrorInfo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue, useReducedMotion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Share2, Activity, Users, BarChart } from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { WordReveal, MagneticRow, editorialEase } from '../components/EditorialMotion';
import { NetworkSystem3D } from '../components/visualizations/NetworkSystem3D';
import { MovingServiceLine } from '../components/MovingServiceLine';
import { ShowcaseField } from '../components/ShowcaseField';
import { ZoomSection } from '../components/ZoomStage';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, PageFaq, Seo } from '../components/Seo';

interface ServicesPageProps {
  onOpenBooking: () => void;
}

// ----------------------------------------------------------------------
// ERROR BOUNDARY & FALLBACKS
// ----------------------------------------------------------------------
class VisualErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  state = { hasError: false };
  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Visual Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full aspect-[4/3] lg:aspect-square max-w-lg bg-zinc-50 rounded-xl shadow-inner border border-black/[0.04] flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3 text-zinc-400">
            <Activity className="w-8 h-8 opacity-50" />
            <span className="text-xs font-mono tracking-widest uppercase text-center">Visual active</span>
          </div>
        </div>
      );
    }
    // @ts-ignore
    return this.props.children;
  }
}

// ----------------------------------------------------------------------
// HOOKS & ANIMATION UTILS
// ----------------------------------------------------------------------
function useMouseParallax(intensity: number = 10) {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * intensity;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return { handleMouseMove, handleMouseLeave, springX, springY };
}

const useFadeVariants = () => {
  const shouldReduceMotion = useReducedMotion();
  return {
    section: {
      hidden: {},
      visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08, delayChildren: shouldReduceMotion ? 0 : 0.06 } }
    },
    header: {
      hidden: { opacity: 0, clipPath: shouldReduceMotion ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' },
      visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.7, ease: editorialEase } }
    },
    title: {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28, clipPath: shouldReduceMotion ? 'inset(0 0 0 0)' : 'inset(18% 0 0 0)' },
      visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)', transition: { duration: 0.75, ease: editorialEase } }
    },
    list: {
      hidden: {},
      visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.045, delayChildren: shouldReduceMotion ? 0 : 0.08 } }
    },
    graphic: {
      hidden: { opacity: 0, filter: shouldReduceMotion ? 'blur(0px)' : 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: editorialEase } }
    }
  };
};

// ----------------------------------------------------------------------
// SHARED UI COMPONENTS
// ----------------------------------------------------------------------
const SubserviceItem: React.FC<{ item: string, colorClass: string, index: number, onHover: (idx: number | null) => void }> = ({ item, colorClass, index, onHover }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -14 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: editorialEase } }
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <MagneticRow strength={6} className="relative flex items-center gap-4 text-base sm:text-lg text-zinc-500 py-3 sm:py-4 px-2 -mx-2 rounded-lg border-b border-black/[0.03] last:border-0 cursor-default group hover:bg-black/[0.02] transition-colors duration-300">
        <span className="flex items-center opacity-30 group-hover:opacity-100 transition-all duration-300">
          <span className={`w-1 h-px transition-all duration-300 group-hover:w-8 ${colorClass.replace('text-', 'bg-')}`} />
        </span>
        <span className="group-hover:text-black transition-colors duration-300">{item}</span>
      </MagneticRow>
    </motion.li>
  );
};

const ProcessSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeWords, setActiveWords] = useState<boolean[]>([false, false, false, false, false]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || shouldReduceMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
      }
    }, { threshold: 0.5 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, shouldReduceMotion]);

  useEffect(() => {
    if (hasAnimated && lineRef.current && containerRef.current && !shouldReduceMotion) {
      const duration = 1200;
      const start = performance.now();
      const containerWidth = containerRef.current.offsetWidth;

      const step = (time: number) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        
        if (lineRef.current) {
          lineRef.current.style.width = `${progress * 100}%`;
        }

        const currentLineWidth = progress * containerWidth;
        
        setActiveWords(prev => {
          const next = [...prev];
          let changed = false;
          wordRefs.current.forEach((word, index) => {
            if (word && !next[index]) {
              const wordCenter = word.offsetLeft + (word.offsetWidth * 0.2); 
              if (currentLineWidth >= wordCenter) {
                next[index] = true;
                changed = true;
              }
            }
          });
          return changed ? next : prev;
        });

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [hasAnimated, shouldReduceMotion]);

  const words = [
    { text: "DISCOVER", activeColor: "text-[#0f131a]" },
    { text: "STRATEGIZE", activeColor: "text-[#0f131a]" },
    { text: "BUILD", activeColor: "text-[#0f131a]" },
    { text: "LAUNCH", activeColor: "text-[#0f131a]" },
    { text: "GROW", activeColor: "text-blue-600" }
  ];

  return (
    <div ref={containerRef} className="relative inline-flex flex-wrap justify-center items-center gap-4 sm:gap-8 font-display font-bold text-xl sm:text-3xl">
      {words.map((w, i) => {
        const isActive = shouldReduceMotion || activeWords[i];
        return (
          <React.Fragment key={w.text}>
            <span
              ref={(el) => { wordRefs.current[i] = el; }}
              className={`transition-colors duration-300 ${isActive ? w.activeColor : 'text-[#d4d4d8]'}`}
            >
              {w.text}
            </span>
            {i < words.length - 1 && (
              <span className="text-zinc-300">→</span>
            )}
          </React.Fragment>
        );
      })}
      
      {!shouldReduceMotion && (
        <div 
          className="absolute -bottom-4 left-0 h-[2px] bg-gradient-to-r from-zinc-200 via-zinc-400 to-blue-600"
          style={{ width: '0%' }}
          ref={lineRef}
        />
      )}
    </div>
  );
};

const WebVisual = ({ progress, hovered }: { progress: any, hovered: number | null }) => {
  const { handleMouseMove, handleMouseLeave, springX, springY } = useMouseParallax(12);
  const exitOp = useTransform(progress, [0.8, 0.95], [1, 0]);
  const shouldReduceMotion = useReducedMotion();

  const nodeSpringX = useTransform(springX, v => v * 1.5);
  const nodeSpringY = useTransform(springY, v => v * 1.5);
  const strokePathLength = useTransform(progress, [0, 0.5], [0, 1]);

  return (
    <motion.div 
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ opacity: exitOp }}
      className="relative w-full aspect-[4/3] lg:aspect-square max-w-lg overflow-visible flex items-center justify-center group"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-[80px] pointer-events-none" />
      <motion.div 
        style={{ x: springX, y: springY }} 
        className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-[1.03] z-10"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Abstract Editorial Stroke */}
          <motion.path 
            d="M 10,50 Q 25,20 50,50 T 90,50" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="0.5" 
            style={{ pathLength: strokePathLength }}
            className="opacity-40"
          />
          <motion.path 
            d="M 20,80 Q 45,90 60,60 T 80,20" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="0.25" 
            strokeDasharray="1 2"
            style={{ pathLength: strokePathLength }}
            className="opacity-30"
          />

          {/* Core Structure */}
          <rect 
            x="30" y="30" width="40" height="40" rx="1" 
            fill="#ffffff" stroke="#e4e4e7" strokeWidth="0.5" 
            className="shadow-xl"
          />
          <rect x="35" y="35" width="20" height="4" rx="0.5" fill="#f4f4f5" />
          <rect x="35" y="42" width="30" height="2" rx="0.5" fill="#f4f4f5" />
          <rect x="35" y="46" width="25" height="2" rx="0.5" fill="#f4f4f5" />
          <rect x="35" y="52" width="10" height="10" rx="0.5" fill="#f4f4f5" />
          <rect x="48" y="52" width="10" height="10" rx="0.5" fill="#f4f4f5" />

          {/* Connectors & Nodes branching off */}
          <motion.g style={!shouldReduceMotion ? { x: nodeSpringX, y: nodeSpringY } : {}}>
            {[
              { cx: 15, cy: 20, x1: 30, y1: 30, h: 0, label: "UI" },
              { cx: 85, cy: 15, x1: 70, y1: 30, h: 1, label: "UX" },
              { cx: 20, cy: 75, x1: 30, y1: 70, h: 2, label: "DEV" },
              { cx: 85, cy: 80, x1: 70, y1: 70, h: 3, label: "PERF" },
              { cx: 50, cy: 90, x1: 50, y1: 70, h: 4, label: "CONV" },
            ].map((node, i) => (
              <g key={i}>
                <line 
                  x1={node.x1} y1={node.y1} 
                  x2={node.cx} y2={node.cy} 
                  stroke={hovered === node.h ? "#2563eb" : "#e4e4e7"} 
                  strokeWidth={hovered === node.h ? "0.5" : "0.25"} 
                  strokeDasharray={hovered === node.h ? "none" : "1 1"}
                  className="transition-all duration-300"
                />
                <circle 
                  cx={node.cx} cy={node.cy} 
                  r={hovered === node.h ? "4" : "1.5"} 
                  fill={hovered === node.h ? "#2563eb" : "#f4f4f5"} 
                  stroke={hovered === node.h ? "none" : "#d4d4d8"}
                  strokeWidth="0.25"
                  className="transition-all duration-300"
                />
                {hovered === node.h && (
                  <text 
                    x={node.cx} y={node.cy + 1.2} 
                    fontSize="3" 
                    fill="#ffffff" 
                    textAnchor="middle"
                    className="font-mono font-bold"
                  >
                    {node.label}
                  </text>
                )}
              </g>
            ))}
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

const AppVisual = ({ progress, hovered }: { progress: any, hovered: number | null }) => {
  const { handleMouseMove, handleMouseLeave, springX, springY } = useMouseParallax(12);
  const [step, setStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const strokePathLength = useTransform(progress, [0, 0.5], [0, 1]);

  const nodeSpringX = useTransform(springX, v => v * 1.5);
  const nodeSpringY = useTransform(springY, v => v * 1.5);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  
  const exitOp = useTransform(progress, [0.8, 0.95], [1, 0]);

  return (
    <motion.div 
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ opacity: exitOp }}
      className="relative w-full aspect-[4/3] lg:aspect-square max-w-lg overflow-visible flex items-center justify-center group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
      <motion.div style={{ x: springX, y: springY }} className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-[1.03] z-10">
        
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Abstract Editorial Stroke */}
          <motion.path 
            d="M 10,90 Q 30,50 50,50 T 90,10" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="0.5" 
            style={{ pathLength: strokePathLength }}
            className="opacity-40"
          />
          
          {/* Mobile Device Abstract Frame */}
          <rect x="35" y="25" width="30" height="50" rx="3" fill="#ffffff" stroke="#e4e4e7" strokeWidth="0.5" className="shadow-2xl" />
          <rect x="47" y="27" width="6" height="1" rx="0.5" fill="#d4d4d8" />
          
          {/* UI Abstract Lines */}
          <rect x="40" y="35" width="10" height="10" rx="2" fill={hovered === 0 || step >= 1 ? "#f59e0b" : "#f4f4f5"} className="transition-colors duration-300" />
          <rect x="52" y="35" width="10" height="10" rx="2" fill={hovered === 1 || step >= 2 ? "#f59e0b" : "#f4f4f5"} className="transition-colors duration-300" />
          <rect x="40" y="47" width="20" height="2" rx="1" fill="#f4f4f5" />
          <rect x="40" y="52" width="14" height="2" rx="1" fill="#f4f4f5" />
          <rect x="40" y="57" width="20" height="8" rx="2" fill={hovered === 2 || step >= 3 ? "#f59e0b" : "#f4f4f5"} className="transition-colors duration-300" />
          
          {/* Floating Integration Nodes */}
          <motion.g style={!shouldReduceMotion ? { x: nodeSpringX, y: nodeSpringY } : {}}>
             {[
               { cx: 20, cy: 30, h: 3, label: "API" }, 
               { cx: 80, cy: 30, h: 4, label: "DATA" }, 
               { cx: 25, cy: 75, h: 5, label: "SYNC" }, 
               { cx: 75, cy: 75, h: 6, label: "AUTH" }
             ].map((node, i) => (
               <g key={i}>
                 <line 
                   x1={node.cx} y1={node.cy} 
                   x2={node.cx > 50 ? 65 : 35} y2={node.cy > 50 ? 60 : 40} 
                   stroke={hovered === node.h ? "#f59e0b" : "#e4e4e7"} 
                   strokeWidth="0.25" strokeDasharray="1 1"
                   className="transition-colors duration-300"
                 />
                 <circle 
                   cx={node.cx} cy={node.cy} 
                   r={hovered === node.h ? "4" : "2"} 
                   fill={hovered === node.h ? "#f59e0b" : "#ffffff"} 
                   stroke={hovered === node.h ? "none" : "#d4d4d8"} strokeWidth="0.25"
                   className="transition-all duration-300 shadow-sm"
                 />
                 {hovered === node.h && (
                    <text x={node.cx} y={node.cy + 1.2} fontSize="3" fill="#ffffff" textAnchor="middle" className="font-mono font-bold">
                      {node.label}
                    </text>
                 )}
               </g>
             ))}
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

const DigitalMarketingVisual = ({ progress, hovered }: { progress: any, hovered: number | null }) => {
  const { handleMouseMove, handleMouseLeave, springX, springY } = useMouseParallax(10);
  const [step, setStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const strokePathLength = useTransform(progress, [0, 0.5], [0, 1]);

  const nodeSpringX = useTransform(springX, v => v * 1.5);
  const nodeSpringY = useTransform(springY, v => v * 1.5);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  
  const exitOp = useTransform(progress, [0.8, 0.95], [1, 0]);

  return (
    <motion.div 
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ opacity: exitOp }}
      className="relative w-full aspect-[4/3] lg:aspect-square max-w-lg overflow-visible flex items-center justify-center group"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
      <motion.div style={{ x: springX, y: springY }} className="relative w-full h-full transition-transform duration-500 group-hover:scale-[1.03] z-10 flex items-center justify-center">
        
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100">
          {/* Abstract Editorial Stroke */}
          <motion.path 
            d="M 10,20 Q 30,80 50,50 T 90,80" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="0.5" 
            style={{ pathLength: strokePathLength }}
            className="opacity-40"
          />

          {/* Network Graph Lines */}
          <motion.g style={!shouldReduceMotion ? { x: nodeSpringX, y: nodeSpringY } : {}}>
            <motion.path animate={{ opacity: step >= 1 ? 1 : 0.2 }} d="M 50 50 Q 20 30 15 50" fill="none" stroke={hovered === 0 ? "#10b981" : "#d1fae5"} strokeWidth="0.25" />
            <motion.path animate={{ opacity: step >= 1 ? 1 : 0.2 }} d="M 50 50 Q 80 70 85 50" fill="none" stroke={hovered === 2 ? "#10b981" : "#d1fae5"} strokeWidth="0.25" />
            <motion.path animate={{ opacity: step >= 1 ? 1 : 0.2 }} d="M 50 50 Q 50 20 75 30" fill="none" stroke={hovered === 4 ? "#10b981" : "#d1fae5"} strokeWidth="0.25" />
            <motion.path animate={{ opacity: step >= 1 ? 1 : 0.2 }} d="M 50 50 Q 50 80 25 70" fill="none" stroke={hovered === 1 ? "#10b981" : "#d1fae5"} strokeWidth="0.25" />
          </motion.g>
        </svg>

        {/* Central Hub Abstract Element */}
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ 
              scale: step >= 3 ? 1.1 : 1,
              borderColor: step >= 3 ? '#059669' : '#10b981',
              backgroundColor: step >= 3 ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,1)',
            }}
            className="w-16 h-16 rounded-3xl rotate-45 border-2 flex items-center justify-center shadow-2xl z-20 transition-all duration-700 bg-white"
          >
            <div className="-rotate-45">
               {step >= 3 ? <Activity className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5 text-emerald-500" />}
            </div>
          </motion.div>
        </motion.div>

        {/* Satellite Nodes */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div key="users-node" style={!shouldReduceMotion ? { x: nodeSpringX, y: nodeSpringY } : {}} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-[45%] left-[10%] w-8 h-8 bg-white rounded-xl shadow-lg flex items-center justify-center text-emerald-500 border border-emerald-100 z-10">
              <Users className="w-3.5 h-3.5" />
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div key="barchart-node" style={!shouldReduceMotion ? { x: nodeSpringX, y: nodeSpringY } : {}} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute bottom-[45%] right-[10%] w-8 h-8 bg-white rounded-xl shadow-lg flex items-center justify-center text-emerald-500 border border-emerald-100 z-10">
              <BarChart className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const AiVisual = ({ progress, hovered }: { progress: any, hovered: number | null }) => {
  const { handleMouseMove, handleMouseLeave, springX, springY } = useMouseParallax(5);
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 7);
    }, 1000); 
    return () => clearInterval(timer);
  }, []);

  const tooltips: Record<number, string> = {
    0: "New lead captured.", 
    1: "AI interprets intent.", 
    2: "Automatically qualify.", 
    3: "Instant response.", 
    4: "Meeting scheduled.", 
    5: "Synced to CRM.", 
    6: "Conversion."
  };

  const getIsActive = (nodeIndex: number) => {
    if (hovered !== null) return hovered === nodeIndex;
    return activeNode === nodeIndex;
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] lg:aspect-square max-w-lg overflow-visible flex items-center justify-center group"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/20 to-transparent rounded-full blur-[80px] pointer-events-none" />
      <motion.div style={{ x: springX, y: springY }} className="relative w-full h-full max-w-[280px] transition-transform duration-500 group-hover:scale-[1.03] z-10 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          
          {/* Abstract Editorial Stroke */}
          <motion.path 
            d="M 10 20 L 50 20 L 50 50 L 90 50 L 90 80 L 50 80 L 10 80" 
            fill="none" 
            stroke="#7C3AED" 
            strokeWidth="0.5" 
            className="opacity-20"
          />
          
          {/* Animated Track Progress based on activeNode */}
          <motion.path 
             d="M 10 20 L 50 20 L 50 50 L 90 50 L 90 80 L 50 80 L 10 80" 
             fill="none" stroke="#7C3AED" strokeWidth="1.5" 
             animate={{ pathLength: hovered !== null ? 1 : (activeNode + 1) / 7 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Nodes */}
          <motion.circle cx="10" cy="20" r="2.5" fill={getIsActive(0) ? "#7C3AED" : "#e4e4e7"} />
          <motion.text x="10" y="14" fontSize="3" fill={getIsActive(0) ? "#7C3AED" : "#a1a1aa"} textAnchor="middle" className="font-mono font-bold">LEAD</motion.text>
          
          <motion.rect x="46" y="16" width="8" height="8" rx="2" fill={getIsActive(1) ? "#7C3AED" : "#e4e4e7"} />
          <motion.text x="50" y="12" fontSize="3" fill={getIsActive(1) ? "#7C3AED" : "#a1a1aa"} fontWeight="bold" textAnchor="middle" className="font-mono">AI CORE</motion.text>
          
          <motion.circle cx="50" cy="50" r="2.5" fill={getIsActive(2) ? "#7C3AED" : "#e4e4e7"} />
          <motion.text x="50" y="44" fontSize="3" fill={getIsActive(2) ? "#7C3AED" : "#a1a1aa"} textAnchor="middle" className="font-mono font-bold">QUALIFY</motion.text>
          
          <motion.circle cx="90" cy="50" r="2.5" fill={getIsActive(3) ? "#7C3AED" : "#e4e4e7"} />
          <motion.text x="90" y="44" fontSize="3" fill={getIsActive(3) ? "#7C3AED" : "#a1a1aa"} textAnchor="middle" className="font-mono font-bold">FOLLOW</motion.text>
          
          <motion.circle cx="90" cy="80" r="2.5" fill={getIsActive(4) ? "#7C3AED" : "#e4e4e7"} />
          <motion.text x="90" y="88" fontSize="3" fill={getIsActive(4) ? "#7C3AED" : "#a1a1aa"} textAnchor="middle" className="font-mono font-bold">BOOK</motion.text>
          
          <motion.circle cx="50" cy="80" r="2.5" fill={getIsActive(5) ? "#7C3AED" : "#e4e4e7"} />
          <motion.text x="50" y="88" fontSize="3" fill={getIsActive(5) ? "#7C3AED" : "#a1a1aa"} textAnchor="middle" className="font-mono font-bold">CRM</motion.text>
          
          <motion.circle cx="10" cy="80" r="3.5" fill={getIsActive(6) ? "#7C3AED" : "#e4e4e7"} />
          <motion.text x="10" y="89" fontSize="4" fill={getIsActive(6) ? "#7C3AED" : "#a1a1aa"} fontWeight="bold" textAnchor="middle" className="font-mono font-bold">GROW</motion.text>
        </svg>

        <AnimatePresence mode="wait">
          <motion.div 
            key={hovered !== null ? hovered : activeNode}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-zinc-200 text-[#7C3AED] text-[10px] font-mono px-3 py-1.5 rounded uppercase whitespace-nowrap z-20 shadow-2xl font-bold"
          >
            {tooltips[hovered !== null ? hovered : activeNode]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const variants = useFadeVariants();
  const servicesWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Section Refs & Scroll
  const heroRef = useRef<HTMLElement | null>(null);
  const webRef = useRef<HTMLElement | null>(null);
  const marketingRef = useRef<HTMLElement | null>(null);
  const aiRef = useRef<HTMLElement | null>(null);
  const appRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: webProgress } = useScroll({ target: webRef, offset: ["start 80%", "end 20%"] });
  const { scrollYProgress: appProgress } = useScroll({ target: appRef, offset: ["start 80%", "end 20%"] });
  const { scrollYProgress: mktProgress } = useScroll({ target: marketingRef, offset: ["start 80%", "end 20%"] });
  const { scrollYProgress: aiProgress } = useScroll({ target: aiRef, offset: ["start 80%", "end 20%"] });
  const { scrollYProgress: ctaProgress } = useScroll({ target: ctaRef, offset: ["start end", "center center"] });

  // Hover States
  const [hoveredWeb, setHoveredWeb] = useState<number | null>(null);
  const [hoveredApp, setHoveredApp] = useState<number | null>(null);
  const [hoveredMarketing, setHoveredMarketing] = useState<number | null>(null);
  const [hoveredAi, setHoveredAi] = useState<number | null>(null);

  // CTA Convergence
  const ctaScale = useTransform(ctaProgress, [0, 1], [0.95, 1]);
  const ctaOp = useTransform(ctaProgress, [0, 0.5], [0, 1]);

  return (
    <div className="selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative">
      <Seo page={PAGE_SEO.services} />

      {/* =========================================
          1. CINEMATIC HERO
      ========================================= */}
      <div className="absolute inset-x-0 top-0 h-[90vh] pointer-events-none opacity-70">
        <ShowcaseField />
      </div>

      <ZoomSection
        ref={heroRef}
        className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-start justify-center min-h-[90vh] z-10"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-8 sm:space-y-12">
          {PAGE_SEO.services.breadcrumbs ? <PageBreadcrumb items={PAGE_SEO.services.breadcrumbs} /> : null}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">DIGITAL ARCHITECTURE</span>
          </motion.div>
          
          <WordReveal
            as="h1"
            delay={0.1}
            stagger={0.08}
            text="Digital agency services designed to perform."
            className="text-[clamp(2.6rem,8vw,7.2rem)] leading-[0.92] tracking-[-0.05em] font-bold text-[#0f131a] font-display"
          />
          
          <motion.div 
             initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="space-y-10"
          >
            <p className="text-lg sm:text-2xl text-zinc-600 font-normal leading-relaxed max-w-2xl">
              Website development, app development, AI workflows and CRM automation, and digital marketing — we build the digital infrastructure behind ambitious businesses.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Website Development', href: '/services/web-development', color: 'bg-blue-600', borderColor: 'group-hover:border-blue-200', delay: 0.2 },
                { name: 'AI Workflows & CRM', href: '/services/ai-automation', color: 'bg-[#7C3AED]', borderColor: 'group-hover:border-[#7C3AED]/30', delay: 0.4 },
                { name: 'Digital Marketing', href: '/services/digital-marketing', color: 'bg-emerald-600', borderColor: 'group-hover:border-emerald-200', delay: 0.6 },
                { name: 'App Development', href: '/services/app-development', color: 'bg-amber-500', borderColor: 'group-hover:border-amber-200', delay: 0.8 }
              ].map((pill, i) => (
                <motion.div
                  key={pill.name}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.5 + (i * 0.1) }}
                >
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
                    transition={{ duration: 3 + (i * 0.5), repeat: Infinity, ease: "easeInOut", delay: pill.delay }}
                  >
                    <Link to={pill.href} className={`group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-black/[0.04] shadow-sm shadow-black/[0.02] hover:-translate-y-1 transition-all duration-300 ${pill.borderColor} hover:shadow-md cursor-pointer`}>
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${pill.color} transition-transform duration-300 group-hover:scale-125`} />
                      <span className="text-xs sm:text-sm font-medium text-zinc-700 group-hover:text-black transition-colors">{pill.name}</span>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
          <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px]">
            <NetworkSystem3D />
          </div>
        </div>
      </ZoomSection>

      <div className="relative z-10">
        <MovingServiceLine />
      </div>

      {/* =========================================
          CORE SERVICES SYSTEM
      ========================================= */}
      <div className="relative z-10" ref={servicesWrapperRef}>
        
        
        {/* 01: WEB DEVELOPMENT */}
        <ZoomSection
          id="service-1"
          ref={webRef}
          className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative min-h-[85vh] flex items-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 xl:col-span-6 space-y-8 pr-0 lg:pr-8">
              <div className="space-y-6">
                <motion.div variants={variants.header} className="flex items-center gap-4 relative">
                  <span className="text-sm sm:text-base font-mono font-bold text-blue-600 tracking-widest">01</span>
                  <div className="h-px w-12 bg-blue-600/30" />
                </motion.div>
                
                <div className="w-full">
                  <motion.h2 
                    variants={variants.title} 
                    className="text-4xl sm:text-6xl lg:text-6xl xl:text-[4rem] font-display font-bold text-[#0f131a] leading-[1.1] tracking-tighter uppercase"
                  >
                    WEB<br />DEVELOPMENT
                  </motion.h2>
                </div>

                <motion.h3 
                  variants={variants.title} 
                  className="text-2xl sm:text-3xl font-display font-medium text-zinc-800 leading-snug pt-2"
                >
                  Build a high-performance digital presence.
                </motion.h3>

                <motion.p 
                  variants={variants.title} 
                  className="text-lg text-zinc-600 leading-relaxed font-normal"
                >
                  We design and develop modern websites that are fast, responsive, conversion-focused and built around your business goals.
                </motion.p>
                <motion.div variants={variants.title}>
                  <Link to="/services/web-development" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
                    Explore website development
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
              
              <motion.ul variants={variants.list} className="pt-4 border-t border-black/[0.04] flex flex-col">
                {['Web Design', 'Website Redesign', 'Responsive Development', 'Performance Optimization', 'Conversion-Focused Development'].map((item, idx) => (
                  <SubserviceItem key={item} index={idx} item={item} colorClass="text-blue-600" onHover={setHoveredWeb} />
                ))}
              </motion.ul>
            </div>
            
            <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
              <motion.div variants={variants.graphic} className="w-full max-w-lg">
                <VisualErrorBoundary>
                  {isMounted && <WebVisual progress={webProgress} hovered={hoveredWeb} />}
                </VisualErrorBoundary>
              </motion.div>
            </div>
          </div>
        </ZoomSection>

        {/* 02: AI AUTOMATION */}
        <ZoomSection
          id="service-2"
          ref={aiRef}
          className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative min-h-[85vh] flex items-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 xl:col-span-6 order-2 lg:order-1 relative flex justify-center lg:justify-start">
              <motion.div variants={variants.graphic} className="w-full max-w-lg">
                <VisualErrorBoundary>
                  {isMounted && <AiVisual progress={aiProgress} hovered={hoveredAi} />}
                </VisualErrorBoundary>
              </motion.div>
            </div>

            <div className="lg:col-span-6 xl:col-span-6 space-y-8 pl-0 lg:pl-8 order-1 lg:order-2">
              <div className="space-y-6">
                <motion.div variants={variants.header} className="flex items-center gap-4 relative">
                  <span className="text-sm sm:text-base font-mono font-bold text-[#7C3AED] tracking-widest">02</span>
                  <div className="h-px w-12 bg-[#7C3AED]/30" />
                </motion.div>
                
                <div className="w-full">
                  <motion.h2 
                    variants={variants.title} 
                    className="text-4xl sm:text-6xl lg:text-7xl xl:text-[4.5rem] font-display font-bold text-[#0f131a] leading-[1.1] tracking-tighter uppercase break-words"
                  >
                    AI<br />WORKFLOWS
                  </motion.h2>
                </div>

                <motion.h3 
                  variants={variants.title} 
                  className="text-2xl sm:text-3xl font-display font-medium text-zinc-800 leading-snug pt-2"
                >
                  Turn repetitive work into AI workflows and CRM automation.
                </motion.h3>

                <motion.p 
                  variants={variants.title} 
                  className="text-lg text-zinc-600 leading-relaxed font-normal"
                >
                  We connect websites, WhatsApp, forms, calendars, and CRMs into intelligent workflows that save time, respond faster, and keep the pipeline updated.
                </motion.p>
                <motion.div variants={variants.title}>
                  <Link to="/services/ai-automation" className="inline-flex items-center gap-2 text-sm font-bold text-[#7C3AED] hover:text-[#6d28d9]">
                    Explore AI workflows and CRM
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
              
              <motion.ul variants={variants.list} className="pt-4 border-t border-black/[0.04] flex flex-col">
                {['Workflow Automation', 'Lead Automation', 'WhatsApp Automation', 'AI Chatbots', 'Booking Automation', 'CRM Automation', 'Email Automation', 'Business Process Automation', 'AI Integrations', 'AI Business Systems'].map((item, idx) => (
                  <SubserviceItem key={item} index={idx} item={item} colorClass="text-[#7C3AED]" onHover={setHoveredAi} />
                ))}
              </motion.ul>
            </div>
          </div>
        </ZoomSection>

        {/* 03: DIGITAL MARKETING */}
        <ZoomSection
          id="service-3"
          ref={marketingRef}
          className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative min-h-[85vh] flex items-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 xl:col-span-6 space-y-8 pr-0 lg:pr-8">
              <div className="space-y-6">
                <motion.div variants={variants.header} className="flex items-center gap-4 relative">
                  <span className="text-sm sm:text-base font-mono font-bold text-emerald-600 tracking-widest">03</span>
                  <div className="h-px w-12 bg-emerald-600/30" />
                </motion.div>
                
                <div className="w-full">
                  <motion.h2 
                    variants={variants.title} 
                    className="text-4xl sm:text-6xl lg:text-7xl xl:text-[4.5rem] font-display font-bold text-[#0f131a] leading-[1.1] tracking-tighter uppercase break-words"
                  >
                    DIGITAL MARKETING
                  </motion.h2>
                </div>

                <motion.h3 
                  variants={variants.title} 
                  className="text-2xl sm:text-3xl font-display font-medium text-zinc-800 leading-snug pt-2"
                >
                  Reach the right audience and turn attention into growth.
                </motion.h3>

                <motion.p 
                  variants={variants.title} 
                  className="text-lg text-zinc-600 leading-relaxed font-normal"
                >
                  We turn attention into measurable growth through SEO, targeted campaigns, and conversion-focused audience strategies.
                </motion.p>
                <motion.div variants={variants.title}>
                  <Link to="/services/digital-marketing" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                    Explore digital marketing
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
              
              <motion.ul variants={variants.list} className="pt-4 border-t border-black/[0.04] flex flex-col">
                {['SEO', 'Social Media', 'Content Marketing', 'Paid Advertising', 'Email Marketing', 'Lead Generation', 'Analytics & Growth'].map((item, idx) => (
                  <SubserviceItem key={item} index={idx} item={item} colorClass="text-emerald-600" onHover={setHoveredMarketing} />
                ))}
              </motion.ul>
            </div>

            <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end">
              <motion.div variants={variants.graphic} className="w-full max-w-lg">
                <VisualErrorBoundary>
                  {isMounted && <DigitalMarketingVisual progress={mktProgress} hovered={hoveredMarketing} />}
                </VisualErrorBoundary>
              </motion.div>
            </div>
          </div>
        </ZoomSection>

        {/* 04: APP DEVELOPMENT */}
        <ZoomSection
          id="service-4"
          ref={appRef}
          className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative min-h-[85vh] flex items-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 xl:col-span-6 order-2 lg:order-1 relative flex justify-center lg:justify-start">
              <motion.div variants={variants.graphic} className="w-full max-w-lg">
                <VisualErrorBoundary>
                  {isMounted && <AppVisual progress={appProgress} hovered={hoveredApp} />}
                </VisualErrorBoundary>
              </motion.div>
            </div>

            <div className="lg:col-span-6 xl:col-span-6 space-y-8 pl-0 lg:pl-8 order-1 lg:order-2">
              <div className="space-y-6">
                <motion.div variants={variants.header} className="flex items-center gap-4 relative">
                  <span className="text-sm sm:text-base font-mono font-bold text-amber-500 tracking-widest">04</span>
                  <div className="h-px w-12 bg-amber-500/30" />
                </motion.div>
                
                <div className="w-full">
                  <motion.h2 
                    variants={variants.title} 
                    className="text-4xl sm:text-6xl lg:text-6xl xl:text-[4rem] font-display font-bold text-[#0f131a] leading-[1.1] tracking-tighter uppercase"
                  >
                    APP<br />DEVELOPMENT
                  </motion.h2>
                </div>

                <motion.h3 
                  variants={variants.title} 
                  className="text-2xl sm:text-3xl font-display font-medium text-zinc-800 leading-snug pt-2"
                >
                  Powerful mobile and web applications built for scale.
                </motion.h3>

                <motion.p 
                  variants={variants.title} 
                  className="text-lg text-zinc-600 leading-relaxed font-normal"
                >
                  We build intuitive, high-performance applications that deliver exceptional user experiences across all devices and platforms.
                </motion.p>
                <motion.div variants={variants.title}>
                  <Link to="/services/app-development" className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
                    Explore app development
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
              
              <motion.ul variants={variants.list} className="pt-4 border-t border-black/[0.04] flex flex-col">
                {['App Strategy & UI/UX', 'Mobile App Development', 'Web App Development', 'Backend & API Development', 'AI-Powered Apps', 'App Integrations', 'Launch & Maintenance'].map((item, idx) => (
                  <SubserviceItem key={item} index={idx} item={item} colorClass="text-amber-500" onHover={setHoveredApp} />
                ))}
              </motion.ul>
            </div>
          </div>
        </ZoomSection>

      </div>

      {PAGE_SEO.services.faqs ? <PageFaq items={PAGE_SEO.services.faqs} /> : null}

      {/* =========================================
          PROCESS & CTA
      ========================================= */}
      <section className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-mono font-bold tracking-widest text-zinc-400 uppercase mb-8">The Digivate Approach</h2>
          <ProcessSequence />
        </div>
      </section>

      <section ref={ctaRef} className="py-16 sm:py-24 bg-[#0f131a] overflow-hidden relative z-10">
        <motion.div style={{ scale: ctaScale, opacity: ctaOp }} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-blue-500 to-blue-600 mx-auto mb-8 relative">
             <motion.div animate={{ y: [0, 96] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-blue-400 blur-sm rounded-full" />
          </div>

          <h2 className="text-5xl sm:text-7xl font-display font-bold text-white tracking-tighter leading-[1.02]">
            Ready to grow?
          </h2>
          <p className="text-xl sm:text-2xl text-zinc-400 font-normal max-w-2xl mx-auto leading-relaxed">
            Tell us where your business is today. We'll build the system to get you where you want to go.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button data-cursor="expand" onClick={onOpenBooking} className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-500 font-bold text-base transition-colors group shadow-xl shadow-blue-900/20">
              <span>Book an Appointment</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a href={getWhatsAppUrl()} data-cursor="expand" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-white border border-white/20 hover:bg-white/5 font-bold text-base transition-colors group">
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
