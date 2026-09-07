import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Code2,
  Layout,
  Search,
  Rocket,
  TrendingUp,
  Zap,
  Share2,
  Terminal,
  Target,
  Mail,
  Sparkles,
  BarChart3,
  Layers,
} from 'lucide-react';

const SERVICE_ICONS = {
  web: [Globe, Code2, Layout, Layers],
  seo: [Search, Rocket, TrendingUp, BarChart3],
  automation: [Zap, Share2, Terminal],
  marketing: [Target, Mail, Sparkles],
  general: [Sparkles, Zap, Globe, Search, Target, Layout, Rocket, BarChart3],
};

interface FloatingItem {
  id: number;
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  targetX: number;
  targetY: number;
  Icon: React.ElementType;
  rotation: number;
  scale: number;
  color: string;
  duration: number;
}

export const HeroCursorEffect: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnTime = useRef<number>(0);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);
  const nextId = useRef(0);
  const isReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    // Disable on mobile/tablet or if user prefers reduced motion
    if (window.innerWidth < 768 || isReducedMotion.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Check if mouse is within the hero section bounds
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        lastSpawnPos.current = null; // Reset when cursor leaves the hero
        return;
      }

      // Check if we are hovering over the 3D visual element
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor?.closest('#hero-business-architecture')) {
        lastSpawnPos.current = null; // Reset when hovering the 3D element
        return;
      }
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = Date.now();

      if (!lastSpawnPos.current) {
         spawnItem(x, y, 0, 0, rect.width, rect.height, e.clientX, e.clientY);
         lastSpawnPos.current = { x, y };
         lastSpawnTime.current = now;
         return;
      }

      const dx = x - lastSpawnPos.current.x;
      const dy = y - lastSpawnPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Spawn if cursor moved a meaningful distance and cooldown passed (150ms for sequential flow)
      if (distance >= 20 && now - lastSpawnTime.current >= 150) {
         spawnItem(x, y, dx, dy, rect.width, rect.height, e.clientX, e.clientY);
         lastSpawnPos.current = { x, y };
         lastSpawnTime.current = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const spawnItem = (
    x: number, 
    y: number, 
    vx: number, 
    vy: number, 
    width: number, 
    height: number, 
    clientX: number, 
    clientY: number
  ) => {
    // Prevent spawning over CTA buttons or links to avoid obstructing interaction
    const elementUnderCursor = document.elementFromPoint(clientX, clientY);
    if (elementUnderCursor?.closest('button') || elementUnderCursor?.closest('a') || elementUnderCursor?.closest('#hero-business-architecture')) {
      return; 
    }

    setItems((current) => {
      // Keep maximum visible floating elements at 15 for continuous trail
      if (current.length >= 15) return current;

      let category = 'general';
      
      // Make it slightly intelligent: right side of the hero (Architecture area)
      if (x > width * 0.5) {
        const rightX = x - width * 0.5;
        const halfRightX = (width * 0.5) / 2;
        const halfY = height / 2;
        
        if (rightX < halfRightX && y < halfY) category = 'web';
        else if (rightX >= halfRightX && y < halfY) category = 'seo';
        else if (rightX < halfRightX && y >= halfY) category = 'automation';
        else category = 'marketing';
      }

      const iconList = SERVICE_ICONS[category as keyof typeof SERVICE_ICONS];
      const Icon = iconList[Math.floor(Math.random() * iconList.length)];
      
      // Tighter offset spawn position to follow cursor closely
      const offsetX = (Math.random() - 0.5) * 15;
      const offsetY = (Math.random() - 0.5) * 15;
      
      // Subtle premium colors matching Digivate visual identity
      let color = '#0f131a';
      if (category === 'web') color = '#2563eb';
      else if (category === 'seo') color = '#059669';
      else if (category === 'automation') color = '#7c3aed';
      else if (category === 'marketing') color = '#d97706';
      else {
        const colors = ['#2563eb', '#059669', '#7c3aed', '#d97706', '#0f131a'];
        color = colors[Math.floor(Math.random() * colors.length)];
      }

      const id = nextId.current++;
      
      // Organic trajectory factoring in cursor momentum
      const momentumX = Math.max(-40, Math.min(40, vx * 0.6));
      const momentumY = Math.max(-40, Math.min(40, vy * 0.6));
      
      const startX = x + offsetX;
      const startY = y + offsetY;
      
      // Mid point for curved bezier path
      const midX = startX + momentumX + (Math.random() - 0.5) * 40;
      const midY = startY + momentumY - 20 - Math.random() * 30;

      // End point drifting gently
      const targetX = midX + (Math.random() - 0.5) * 40;
      const targetY = midY - 30 - Math.random() * 50;

      const duration = 1.8 + Math.random() * 1.2; // 1.8 to 3.0 seconds

      const newItem: FloatingItem = {
        id,
        startX,
        startY,
        midX,
        midY,
        targetX,
        targetY,
        Icon,
        rotation: (Math.random() - 0.5) * 40,
        scale: 0.9 + Math.random() * 0.3,
        color,
        duration,
      };

      // Clean up DOM gracefully
      setTimeout(() => {
        setItems((c) => c.filter((item) => item.id !== id));
      }, duration * 1000 + 100);

      return [...current, newItem];
    });
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ 
              opacity: 0, 
              scale: item.scale * 0.6, 
              x: item.startX, 
              y: item.startY, 
              rotate: item.rotation * -0.5 
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [item.scale * 0.6, item.scale, item.scale, item.scale * 0.95],
              x: [item.startX, item.midX, item.targetX],
              y: [item.startY, item.midY, item.targetY],
              rotate: [item.rotation * -0.5, item.rotation, item.rotation * 1.5],
            }}
            transition={{
              duration: item.duration,
              ease: 'easeOut',
              opacity: { times: [0, 0.1, 0.8, 1] },
              scale: { times: [0, 0.2, 0.8, 1] },
            }}
            className="absolute top-0 left-0 flex items-center justify-center drop-shadow-sm"
          >
            <item.Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: item.color }} strokeWidth={1.75} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
