import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface MagneticDotFieldProps {
  className?: string;
}

/** Grid of dots that lift toward the cursor with a small 3D bulge. */
export const MagneticDotField: React.FC<MagneticDotFieldProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999, inside: false };
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const spacing = 28;
    const dots: { x: number; y: number }[] = [];

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots.length = 0;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const ox = (width - (cols - 1) * spacing) / 2;
      const oy = (height - (rows - 1) * spacing) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: ox + c * spacing, y: oy + r * spacing });
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (mouse.inside) {
        mouse.x = x;
        mouse.y = y;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }
    };

    const onLeaveWindow = () => {
      mouse.inside = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const radius = 150;
      const radiusSq = radius * radius;

      for (const dot of dots) {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const t = distSq < radiusSq ? 1 - Math.sqrt(distSq) / radius : 0;
        const lift = t * t;
        const dist = t > 0 ? Math.sqrt(distSq) || 1 : 1;
        const bulge = lift * 22;
        const px = dot.x + (dx / dist) * bulge;
        const py = dot.y + (dy / dist) * bulge - lift * 16;
        const size = 1.15 + lift * 3.4;
        const alpha = 0.28 + lift * 0.72;

        if (lift > 0.08) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(15, 19, 26, ${0.08 + lift * 0.12})`;
          ctx.ellipse(dot.x, dot.y + 6, size * 1.4, size * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle =
          lift > 0.12
            ? `rgba(37, 99, 235, ${alpha})`
            : `rgba(82, 82, 91, ${alpha})`;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(layout);
    ro.observe(canvas.parentElement ?? canvas);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeaveWindow);
    layout();

    if (shouldReduceMotion) {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(82, 82, 91, 0.35)';
        ctx.arc(dot.x, dot.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      document.removeEventListener('mouseleave', onLeaveWindow);
    };
  }, [shouldReduceMotion]);

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className ?? ''}`} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
