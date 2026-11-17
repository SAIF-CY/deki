import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** How long auto-play stays paused after the visitor touches the carousel. */
const RESUME_DELAY_MS = 6000;

/**
 * Horizontal snap carousel with arrow controls and optional auto-play.
 *
 * Native scrolling (touch/trackpad/keyboard) is left fully working — the arrows are
 * an extra affordance for mouse users. When `autoMs` is set the track advances on its
 * own, but any interaction (hover, focus, swipe, wheel, arrow click) pauses it and it
 * resumes only after RESUME_DELAY_MS. `prefers-reduced-motion` disables auto-play.
 */
export function Carousel({
  children,
  label,
  controlsClassName = "",
  trackClassName = "gap-6",
  autoMs = 0,
}: {
  children: ReactNode;
  /** Accessible name for the scroll region. */
  label: string;
  controlsClassName?: string;
  /** Spacing/layout of the track; defaults to a 6-gap between cards. */
  trackClassName?: string;
  /** Auto-advance interval in ms. 0 disables auto-play. */
  autoMs?: number;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);
  const focused = useRef(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    el.addEventListener("scroll", sync, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", sync);
    };
  }, [sync]);

  const pause = useCallback(() => {
    pausedUntil.current = Date.now() + RESUME_DELAY_MS;
  }, []);

  const scrollByDir = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    pause();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * Math.round(el.clientWidth * 0.8),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const advance = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const step = first ? first.offsetWidth + gap : Math.round(el.clientWidth * 0.8);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
      el.scrollTo({ left: 0, behavior });
    } else {
      el.scrollBy({ left: step, behavior });
    }
  }, []);

  useEffect(() => {
    if (!autoMs) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (hovering.current || focused.current) return;
      if (Date.now() < pausedUntil.current) return;
      advance();
    }, autoMs);
    return () => window.clearInterval(id);
  }, [autoMs, advance]);

  const btn =
    "grid h-11 w-11 place-items-center rounded-[2px] border border-line bg-surface transition-colors hover:border-graphite disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line";

  return (
    <div className="group/carousel relative">
      <ul
        ref={ref}
        aria-label={label}
        className={`carousel-track flex snap-x snap-mandatory overflow-x-auto pb-4 ${trackClassName}`}
        onPointerEnter={() => (hovering.current = true)}
        onPointerLeave={() => (hovering.current = false)}
        onFocusCapture={() => (focused.current = true)}
        onBlurCapture={() => (focused.current = false)}
        onPointerDown={pause}
        onWheel={pause}
        onTouchStart={pause}
        onKeyDown={pause}
      >
        {children}
      </ul>

      <div className={`flex justify-end gap-2 ${controlsClassName}`}>
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          disabled={atStart}
          aria-label={`${label}: anterior`}
          className={btn}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          disabled={atEnd}
          aria-label={`${label}: próximo`}
          className={btn}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
