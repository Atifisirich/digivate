import React, { useEffect, useLayoutEffect, useState, type RefObject } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function scrollSnapToIndex(scroller: HTMLElement | null, index: number) {
  if (!scroller) return;
  const track = scroller.firstElementChild as HTMLElement | null;
  const slide = (track?.children[index] ?? scroller.children[index]) as HTMLElement | undefined;
  if (!slide) return;

  const scrollerBox = scroller.getBoundingClientRect();
  const slideBox = slide.getBoundingClientRect();
  const delta = slideBox.left + slideBox.width / 2 - (scrollerBox.left + scrollerBox.width / 2);
  scroller.scrollTo({ left: scroller.scrollLeft + delta, behavior: 'smooth' });
}

export function useDragScroll(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let dragging = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      if ((event.target as HTMLElement | null)?.closest('a, button')) return;
      dragging = true;
      startX = event.clientX;
      startLeft = el.scrollLeft;
      el.classList.add('cursor-grabbing');
      el.setPointerCapture(event.pointerId);
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startLeft - (event.clientX - startX);
    };

    const onUp = () => {
      dragging = false;
      el.classList.remove('cursor-grabbing');
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, [ref, enabled]);
}

export function useHorizontalProgress(ref: RefObject<HTMLElement | null>, count: number, enabled = true) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !enabled || count < 1) return;

    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      const next = max <= 0 ? 0 : Math.min(1, Math.max(0, el.scrollLeft / max));
      setProgress(next);
      setActive(Math.min(count - 1, Math.max(0, Math.round(next * (count - 1)))));
    };

    measure();
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [ref, count, enabled]);

  return { active, progress };
}

interface SceneControlsProps {
  dark?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const SceneControls: React.FC<SceneControlsProps> = ({ dark = false, onPrev, onNext }) => {
  const btn = dark
    ? 'border-white/25 text-white hover:border-white/55 hover:bg-white/5'
    : 'border-black/15 text-[#0f131a] hover:border-black/40 hover:bg-black/[0.03]';

  return (
    <div className="flex items-center justify-center gap-3 pt-6">
      <button
        type="button"
        onClick={onPrev}
        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${btn}`}
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onNext}
        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${btn}`}
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
