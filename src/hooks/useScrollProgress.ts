import { useLayoutEffect, type RefObject } from 'react';
import { useMotionValue, type MotionValue } from 'motion/react';

/**
 * Anchor pair: [fraction of the target, fraction of the viewport].
 * [0, 0] = target top meets viewport top, [1, 1] = target bottom meets viewport bottom.
 */
export type ScrollAnchor = readonly [number, number];

interface Options {
  /** Scroll positions where progress reads 0 and 1. */
  offset: readonly [ScrollAnchor, ScrollAnchor];
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Scroll progress for an element, measured from its live bounding rect.
 *
 * Motion's own `useScroll` hands scroll-linked `opacity` to a native ViewTimeline,
 * whose range does not match the requested offsets — values mirror back once the
 * target passes the viewport. Reading the rect ourselves keeps every value on the
 * JS path and stays correct when the page reflows after fonts or media load.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { offset }: Options,
): MotionValue<number> {
  const progress = useMotionValue(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const [[startTarget, startViewport], [endTarget, endViewport]] = offset;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const top = rect.top + scrollY;

      const start = top + startTarget * rect.height - startViewport * viewport;
      const end = top + endTarget * rect.height - endViewport * viewport;
      const span = end - start;

      progress.set(span === 0 ? 0 : clamp01((scrollY - start) / span));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    // Catches reflows that move the target without firing scroll or resize.
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    observer.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, [ref, offset, progress]);

  return progress;
}

export const SCROLL_OFFSETS = {
  /** Pinned section: 0 when it reaches the top, 1 when its bottom reaches the viewport bottom. */
  pin: [[0, 0], [1, 1]] as const,
  /** 0 when the target tops out, 1 once it has scrolled fully past the top. */
  exitTop: [[0, 0], [1, 0]] as const,
  /** 0 as the target enters from below, 1 as it leaves the top. */
  cover: [[0, 1], [1, 0]] as const,
} satisfies Record<string, readonly [ScrollAnchor, ScrollAnchor]>;
