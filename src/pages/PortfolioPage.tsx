import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, Calendar, ArrowUpRight, ArrowLeft, X } from 'lucide-react';
import { getWhatsAppUrl, SHOWCASE_WORK } from '../config/siteConfig';
import type { ShowcaseWorkItem } from '../types';
import { ShowcaseField } from '../components/ShowcaseField';
import { WorkDistortCard } from '../components/WorkDistortCard';
import { WordReveal, editorialEase } from '../components/EditorialMotion';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, Seo } from '../components/Seo';
import * as THREE from 'three';

interface PortfolioPageProps {
  onOpenBooking: () => void;
}

const PORTFOLIO_PROJECTS = SHOWCASE_WORK;

// ----------------------------------------------------------------------
// 3D S-SHAPE SPATIAL GALLERY (Premium Refined)
// ----------------------------------------------------------------------
const PortfolioGallery3D: React.FC<{ projects: ShowcaseWorkItem[] }> = ({ projects }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ShowcaseWorkItem | null>(null);
  const [showHint, setShowHint] = useState(true);
  
  const apiRef = useRef({
    prev: () => {},
    next: () => {}
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE SETUP (Light Editorial Environment) ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F8F6');
    // Fog is enabled ONLY for the floor grid to fade into the horizon smoothly.
    // Cards have fog: false to prevent the milky wash effect.
    scene.fog = new THREE.Fog('#F7F8F6', 40, 220);

    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 1, 400);
    camera.position.set(0, 4, 110); // Elevated slightly and pulled back for cinematic scale
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Subtle perspective floor extending into the distance
    // Using a stronger, medium-dark gray to ensure clear visibility against the light background
    const grid = new THREE.GridHelper(500, 120, '#949ba3', '#a5a9af'); 
    grid.position.y = -28; // Dropped lower to create a distinct floating gap below larger cards
    grid.material.transparent = true;
    grid.material.opacity = 0.75; // Increased opacity for stronger presence
    scene.add(grid);

    // --- INFINITE LOOP LOGIC ---
    const N = projects.length; 
    const NUM_CARDS = 9; 
    
    const textures = projects.map(project => {
      const canvasW = 1600;
      const canvasH = 1000;
      const c = document.createElement('canvas');
      c.width = canvasW;
      c.height = canvasH;
      const ctx = c.getContext('2d');
      if (!ctx) return null;

      const borderRadius = 24;

      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = project.image;
      img.onload = () => {
        // Clear canvas instead of filling with a background color to preserve transparency
        ctx.clearRect(0, 0, canvasW, canvasH);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(borderRadius, 0);
        ctx.lineTo(canvasW - borderRadius, 0);
        ctx.quadraticCurveTo(canvasW, 0, canvasW, borderRadius);
        ctx.lineTo(canvasW, canvasH - borderRadius);
        ctx.quadraticCurveTo(canvasW, canvasH, canvasW - borderRadius, canvasH);
        ctx.lineTo(borderRadius, canvasH);
        ctx.quadraticCurveTo(0, canvasH, 0, canvasH - borderRadius);
        ctx.lineTo(0, borderRadius);
        ctx.quadraticCurveTo(0, 0, borderRadius, 0);
        ctx.closePath();
        ctx.clip();

        // Draw crisp edge-to-edge screenshot
        const scale = Math.max(canvasW / img.width, canvasH / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const x = (canvasW / 2) - (drawW / 2);
        const y = (canvasH / 2) - (drawH / 2);
        ctx.drawImage(img, x, y, drawW, drawH);

        // Minimal Dark Vignette for typography contrast
        const grad = ctx.createLinearGradient(0, canvasH * 0.4, 0, canvasH);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.85)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvasW, canvasH);

        // Clean typography
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 64px "Syne", system-ui, sans-serif';
        ctx.letterSpacing = '-1px';
        ctx.fillText(project.title, 80, canvasH - 70);

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = '700 24px "Plus Jakarta Sans", system-ui, sans-serif';
        ctx.letterSpacing = '2px';
        ctx.fillText(project.category, 80, canvasH - 150);
        
        ctx.restore();
        tex.needsUpdate = true;
      };
      return tex;
    });

    const cardGroup = new THREE.Group();
    scene.add(cardGroup);
    const cardMeshes: THREE.Mesh[] = [];

    // Subtle Physical Curvature via CylinderGeometry
    const meshWidth = 64; // Scaled up to occupy more viewport width for an immersive cinematic feel
    const meshHeight = 40; // Matches canvas ratio (1600x1000)
    const cylRadius = 180; // Elegant, premium curvature without bending too sharply
    const theta = meshWidth / cylRadius;
    const geo = new THREE.CylinderGeometry(cylRadius, cylRadius, meshHeight, 32, 1, true, -theta/2, theta);
    geo.translate(0, 0, -cylRadius); // Translate so center is at 0,0,0 and edges curve away naturally

    for (let i = 0; i < NUM_CARDS; i++) {
      const tex = textures[i % N];
      const mat = new THREE.MeshBasicMaterial({ 
        map: tex,
        side: THREE.DoubleSide,
        transparent: true,
        fog: false // CRITICAL: prevents the milky white wash on the project images
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { id: i, projectIndex: i % N };
      cardGroup.add(mesh);
      cardMeshes.push(mesh);
    }

    // --- INTERACTION & PHYSICS ---
    let progress = 0; 
    let targetProgress = 0;
    let velocity = 0;
    let isDragging = false;
    let lastX = 0;
    let lastTime = 0;
    
    apiRef.current.prev = () => { targetProgress -= 1; setShowHint(false); };
    apiRef.current.next = () => { targetProgress += 1; setShowHint(false); };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastTime = performance.now();
      velocity = 0;
      container.style.cursor = 'grabbing';
      setShowHint(false);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dt = Math.max(now - lastTime, 1);
      
      const sensitivity = 0.003; 
      const step = dx * sensitivity;
      
      progress -= step;
      targetProgress = progress;
      velocity = -step / (dt / 16.7);
      
      lastX = e.clientX;
      lastTime = now;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = 'grab';
      
      targetProgress += velocity * 12;
      targetProgress = Math.round(targetProgress); 
    };

    const onWheel = (e: WheelEvent) => {
      // CRITICAL FIX: Only capture horizontal wheel events.
      // Vertical scrolling continues naturally without interference.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        targetProgress += e.deltaX * 0.002;
        
        if ((window as any).wheelSnapTimeout) clearTimeout((window as any).wheelSnapTimeout);
        (window as any).wheelSnapTimeout = setTimeout(() => {
          targetProgress = Math.round(targetProgress);
        }, 150);
        
        setShowHint(false);
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // --- CLICK TO FOCUS / OPEN ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let startX = 0;
    
    container.addEventListener('mousedown', (e) => startX = e.clientX);
    container.addEventListener('mouseup', (e) => {
      if (Math.abs(e.clientX - startX) > 5 || isDragging) return; 
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);
      
      if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        
        let isCenter = false;
        
        for (let i = 0; i < NUM_CARDS; i++) {
          let t = (i - progress) % NUM_CARDS;
          if (t > NUM_CARDS / 2) t -= NUM_CARDS;
          if (t < -NUM_CARDS / 2) t += NUM_CARDS;
          
          if (cardMeshes[i] === mesh) {
            if (Math.abs(t) < 0.2) {
              isCenter = true;
            } else {
              targetProgress = Math.round(progress + t);
            }
            break;
          }
        }
        
        if (isCenter) {
          setSelectedProject(projects[mesh.userData.projectIndex]);
        }
      }
    });

    // --- RENDER LOOP ---
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        progress += (targetProgress - progress) * 0.08;
      }

      // Mathematical Symmetrical S-Curve Path
      for (let i = 0; i < NUM_CARDS; i++) {
        const mesh = cardMeshes[i];
        
        let t = (i - progress) % NUM_CARDS;
        if (t > NUM_CARDS / 2) t -= NUM_CARDS;
        if (t < -NUM_CARDS / 2) t += NUM_CARDS;

        // Perfectly balanced symmetric spacing
        const spacingX = 66; // Refined so side cards tuck elegantly behind the center card without huge gaps
        const x = t * spacingX;
        
        // Smooth parabolic depth retreat
        const z = -(t * t) * 10; // Steeper depth curve pulls side cards further into the background
        
        // Face the focal point gracefully
        const rotY = -t * 0.22; // More pronounced inward rotation for cinematic perspective

        mesh.position.set(x, 0, z);
        mesh.rotation.set(0, rotY, 0);

        // Center card dominance
        const scale = Math.max(0.75, 1 - Math.abs(t) * 0.12); // Smooth scale reduction for side cards
        mesh.scale.set(scale, scale, scale);

        // Naturally darken side cards to simulate depth without white washing
        const distance = Math.abs(t);
        const brightness = Math.max(0.35, 1 - distance * 0.45); // Deeper shading to balance the larger surface area
        (mesh.material as THREE.MeshBasicMaterial).color.setScalar(brightness);
      }

      renderer.render(scene, camera);
    };
    animate();

    // --- RESPONSIVE CAMERA ---
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        
        if (camera.aspect < 1) { 
          camera.position.z = 110 / camera.aspect * 0.8; 
        } else {
          camera.position.z = 110;
        }
        
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    const hintTimeout = setTimeout(() => setShowHint(true), 1200);
    const hideHintTimeout = setTimeout(() => setShowHint(false), 5000);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      clearTimeout(hintTimeout);
      clearTimeout(hideHintTimeout);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      textures.forEach(t => t?.dispose());
      geo.dispose();
    };
  }, [projects]);

  return (
    <div className="relative w-full h-[600px] sm:h-[800px] overflow-hidden bg-[#F7F8F6]">
      {/* 3D Mount - touch-action ensures vertical native scroll works on mobile */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0" 
        style={{ touchAction: 'pan-y' }} 
      />

      {/* Nav Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-12 z-10 pointer-events-none hidden md:block">
        <button 
          onClick={() => apiRef.current.prev()} 
          className="pointer-events-auto w-12 h-12 bg-white/70 backdrop-blur-md flex items-center justify-center rounded-full border border-black/5 hover:bg-white text-zinc-600 hover:text-blue-600 transition-colors shadow-sm"
          aria-label="Previous Project"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-12 z-10 pointer-events-none hidden md:block">
        <button 
          onClick={() => apiRef.current.next()} 
          className="pointer-events-auto w-12 h-12 bg-white/70 backdrop-blur-md flex items-center justify-center rounded-full border border-black/5 hover:bg-white text-zinc-600 hover:text-blue-600 transition-colors shadow-sm"
          aria-label="Next Project"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-700 z-10 ${showHint ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase shadow-sm">
          Drag to explore
        </div>
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F7F8F6]/80 backdrop-blur-md p-4 sm:p-6"
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedProject(null); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-white border border-black/[0.08] shadow-2xl shadow-black/[0.05] rounded-[2rem] p-8 sm:p-12 relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center border border-black/5 transition-colors text-zinc-600 hover:text-black"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-4">
                {selectedProject.category}
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-[#0f131a] mb-6 leading-tight">
                {selectedProject.title}
              </h2>
              
              <p className="text-zinc-600 text-lg leading-relaxed mb-10 max-w-lg">
                {selectedProject.description}
              </p>
              
              <a 
                href={selectedProject.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0f131a] hover:bg-blue-600 text-white rounded-full text-sm font-bold tracking-wide transition-all group"
              >
                Visit Website
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ----------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------
export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenBooking }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen pt-20 flex flex-col">
      <Seo page={PAGE_SEO.portfolio} />
      
      <section className="relative min-h-[72svh] flex items-end overflow-hidden border-b border-black/[0.05] w-full shrink-0">
        <div className="absolute inset-0 pointer-events-none">
          <ShowcaseField />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-24 pb-14 sm:pb-20">
          <div className="max-w-5xl space-y-6">
            {PAGE_SEO.portfolio.breadcrumbs ? <PageBreadcrumb items={PAGE_SEO.portfolio.breadcrumbs} /> : null}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: editorialEase }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-mono font-bold tracking-wide"
            >
              <span>SELECTED WORKS</span>
            </motion.div>
            
            <WordReveal
              as="h1"
              delay={0.08}
              text="Work that drives results."
              className="text-[clamp(2.8rem,10vw,7.5rem)] font-bold tracking-[-0.05em] text-[#0f131a] font-display leading-[0.9]"
            />
            
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, clipPath: 'inset(0 16% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.85, delay: 0.4, ease: editorialEase }}
              className="text-lg sm:text-xl text-zinc-600 max-w-xl font-normal leading-relaxed"
            >
              A selection of high-performance websites built for our clients — drag the gallery, or open a case below.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="relative w-full z-10 border-b border-black/[0.05] bg-[#F7F8F6]">
        <PortfolioGallery3D projects={PORTFOLIO_PROJECTS} />
      </section>

      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-10 sm:mb-14 max-w-2xl space-y-3">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-blue-600">
            Case studies
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#0f131a]">
            Hover to lean in.
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <WorkDistortCard
              key={project.id}
              project={project}
              index={index}
              variant="editorial"
            />
          ))}
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="py-16 sm:py-24 bg-[#0f131a] text-white relative z-[100] overflow-hidden w-full shrink-0 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight">
              Let's build your next project.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto font-normal leading-relaxed">
              Book a consultation to discuss your business requirements and explore how our digital systems can help you grow.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              data-cursor="expand"
              onClick={onOpenBooking}
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-white text-[#0f131a] hover:bg-blue-500 hover:text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>
            <a
              href={getWhatsAppUrl()}
              data-cursor="expand"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-4 px-8 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Discuss on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
