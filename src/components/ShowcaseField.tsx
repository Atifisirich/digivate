import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';

function canCreateWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 uv = vUv;
  float n = noise(uv * 2.6 + uTime * 0.06);
  n += 0.45 * noise(uv * 5.4 - uTime * 0.09);
  n += 0.22 * noise(uv * 11.0 + uTime * 0.04);

  float d = length(uv - uMouse);
  float glow = exp(-d * 5.2) * 0.42;
  float vein = smoothstep(0.42, 0.78, n);

  vec3 paper = vec3(0.980, 0.980, 0.973);
  vec3 blue = vec3(0.145, 0.388, 0.922);
  vec3 ink = vec3(0.059, 0.075, 0.102);

  vec3 col = paper;
  col = mix(col, blue, vein * 0.14 + glow);
  col = mix(col, ink, n * 0.035);
  float alpha = 0.72 + glow * 0.18;
  gl_FragColor = vec4(col, alpha);
}
`;

/** Procedural WebGL wash behind cinematic heroes. Falls back to CSS. */
export const ShowcaseField: React.FC<{ className?: string }> = ({ className }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || !canCreateWebGL()) {
      setFallback(true);
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
    } catch {
      setFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.72, 0.38) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    host.appendChild(renderer.domElement);

    const mouse = { x: 0.72, y: 0.38 };
    const onPointer = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      uniforms.uTime.value = (now - start) / 1000;
      uniforms.uMouse.value.lerp(new THREE.Vector2(mouse.x, mouse.y), 0.045);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    const resize = () => {
      renderer.setSize(host.clientWidth, host.clientHeight, false);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      if (host.contains(renderer.domElement)) host.removeChild(renderer.domElement);
    };
  }, [shouldReduceMotion]);

  if (fallback) {
    return (
      <div className={`showcase-field-fallback ${className ?? ''}`} aria-hidden />
    );
  }

  return <div ref={hostRef} className={`absolute inset-0 ${className ?? ''}`} aria-hidden />;
};
