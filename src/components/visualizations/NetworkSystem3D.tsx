import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';

const LABELS = ['WEB', 'MARKET', 'AI', 'APPS'] as const;

const StaticNetworkFallback: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative w-full h-full min-h-[240px] ${className ?? ''}`} aria-hidden>
    <svg viewBox="0 0 320 280" className="w-full h-full">
      <line x1="160" y1="140" x2="160" y2="36" stroke="#2563eb" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="160" y1="140" x2="268" y2="140" stroke="#2563eb" strokeOpacity="0.28" strokeWidth="1" />
      <line x1="160" y1="140" x2="160" y2="244" stroke="#0f131a" strokeOpacity="0.18" strokeWidth="1" />
      <line x1="160" y1="140" x2="52" y2="140" stroke="#0f131a" strokeOpacity="0.18" strokeWidth="1" />
      <line x1="160" y1="36" x2="268" y2="140" stroke="#2563eb" strokeOpacity="0.12" strokeWidth="0.75" />
      <line x1="268" y1="140" x2="160" y2="244" stroke="#0f131a" strokeOpacity="0.1" strokeWidth="0.75" />
      <circle cx="160" cy="140" r="7" fill="#2563eb" />
      <circle cx="160" cy="36" r="4.5" fill="#0f131a" />
      <circle cx="268" cy="140" r="4.5" fill="#0f131a" />
      <circle cx="160" cy="244" r="4.5" fill="#0f131a" />
      <circle cx="52" cy="140" r="4.5" fill="#0f131a" />
      <text x="160" y="22" textAnchor="middle" fill="#2563eb" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="700" letterSpacing="1.4">WEB</text>
      <text x="286" y="144" textAnchor="start" fill="#71717a" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="700" letterSpacing="1.4">MARKET</text>
      <text x="160" y="262" textAnchor="middle" fill="#71717a" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="700" letterSpacing="1.4">AI</text>
      <text x="10" y="144" textAnchor="start" fill="#71717a" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="700" letterSpacing="1.4">APPS</text>
    </svg>
  </div>
);

function canCreateWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

interface NetworkSystem3DProps {
  className?: string;
}

/** Abstract connected-node system — procedural, no GLB. Degrades to SVG. */
export const NetworkSystem3D: React.FC<NetworkSystem3DProps> = ({ className }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || !canCreateWebGL()) {
      setUseFallback(true);
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      setUseFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0.15, 6.2);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: '100%',
      height: '100%',
      display: 'block',
    });

    const group = new THREE.Group();
    scene.add(group);

    const nodeGeo = new THREE.SphereGeometry(0.085, 16, 16);
    const hubGeo = new THREE.IcosahedronGeometry(0.22, 0);
    const hubMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, wireframe: true, transparent: true, opacity: 0.85 });
    const hubFill = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.16 });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    const hubCore = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), hubFill);
    group.add(hub, hubCore);

    const positions: THREE.Vector3[] = [
      new THREE.Vector3(0, 1.55, 0.15),
      new THREE.Vector3(1.55, 0.1, 0.35),
      new THREE.Vector3(0, -1.5, -0.2),
      new THREE.Vector3(-1.5, 0.05, 0.25),
    ];

    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x0f131a });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.2 });
    const nodes = positions.map((pos) => {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.copy(pos);
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), glowMat);
      glow.position.copy(pos);
      group.add(mesh, glow);
      return mesh;
    });

    const linePositions: number[] = [];
    positions.forEach((p) => {
      linePositions.push(0, 0, 0, p.x, p.y, p.z);
    });
    for (let i = 0; i < positions.length; i++) {
      const a = positions[i];
      const b = positions[(i + 1) % positions.length];
      linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.38 });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    const pulseGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    const pulses = [0, 1, 2, 3].map((i) => {
      const m = new THREE.Mesh(pulseGeo, pulseMat);
      m.userData.index = i;
      group.add(m);
      return m;
    });

    const ringGeo = new THREE.RingGeometry(1.72, 1.735, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0f131a,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    host.addEventListener('pointermove', onPointer, { passive: true });

    const resize = () => {
      const w = host.clientWidth || 320;
      const h = host.clientHeight || 280;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(host);

    let raf = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.12 + pointer.x * 0.18;
      group.rotation.x = Math.sin(t * 0.22) * 0.08 + pointer.y * 0.1;
      hub.rotation.y = -t * 0.35;
      hub.rotation.x = t * 0.18;
      ring.rotation.z = t * 0.08;

      pulses.forEach((p, i) => {
        const u = (t * 0.35 + i * 0.25) % 1;
        const dest = positions[i];
        p.position.set(dest.x * u, dest.y * u, dest.z * u);
        p.scale.setScalar(0.6 + Math.sin(t * 2 + i) * 0.15);
      });

      nodes.forEach((n, i) => {
        n.position.y = positions[i].y + Math.sin(t * 0.9 + i) * 0.04;
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onPointer);
      nodeGeo.dispose();
      hubGeo.dispose();
      hubMat.dispose();
      hubFill.dispose();
      nodeMat.dispose();
      glowMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [shouldReduceMotion]);

  if (useFallback) {
    return <StaticNetworkFallback className={className} />;
  }

  return (
    <div className={`relative w-full h-full min-h-[240px] ${className ?? ''}`}>
      <div ref={hostRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-[320px] h-full relative">
          {LABELS.map((label, i) => {
            const pos = [
              'top-[4%] left-1/2 -translate-x-1/2',
              'top-1/2 right-[2%] -translate-y-1/2',
              'bottom-[4%] left-1/2 -translate-x-1/2',
              'top-1/2 left-[2%] -translate-y-1/2',
            ][i];
            return (
              <span
                key={label}
                className={`absolute ${pos} text-[9px] font-mono font-bold tracking-[0.18em] text-zinc-500`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
