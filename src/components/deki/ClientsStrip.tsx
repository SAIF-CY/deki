import { useEffect, useRef } from "react";
import { clients } from "@/data/clients";
import { Reveal } from "@/components/deki/Reveal";

/** Scroll speed in px per second. Slow enough to read, fast enough to notice. */
const SPEED = 45;
/** Pause only while pressed/dragged, then resume shortly after release. */
const RESUME_MS = 1500;

/**
 * Client trust strip: one continuous band of logos that scrolls on its own.
 *
 * A real horizontally-scrollable row is used (instead of a CSS transform
 * animation) so it behaves the same on mobile: touch can swipe it, the scrollbar
 * stays hidden and a small rAF loop keeps it drifting. The logo list is rendered
 * twice and the loop jumps back by exactly half the scroll width, so the wrap is
 * seamless. The second copy is `aria-hidden` so screen readers hear each clinic once.
 *
 * It only pauses while the visitor presses/drags the band, and resumes 1.5s later.
 */
export function ClientsStrip() {
  const trackRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;

      if (!pausedRef.current) {
        const half = el.scrollWidth / 2;
        let next = el.scrollLeft + SPEED * dt;
        if (half > 0 && next >= half) next -= half;
        el.scrollLeft = next;
      }

      raf = requestAnimationFrame(tick);
    };

    const hold = () => {
      if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
      pausedRef.current = true;
    };

    const release = () => {
      if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => {
        resumeTimer.current = null;
        pausedRef.current = false;
      }, RESUME_MS);
    };

    el.addEventListener("pointerdown", hold);
    el.addEventListener("touchstart", hold, { passive: true });
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("touchend", release, { passive: true });
    window.addEventListener("touchcancel", release, { passive: true });

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("touchstart", hold);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("touchend", release);
      window.removeEventListener("touchcancel", release);
    };
  }, []);

  return (
    <section
      id="clientes"
      aria-labelledby="clientes-title"
      className="section-y border-y border-line bg-surface"
    >
      <div className="container-deki">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Quem confia na DEKI</p>
          <h2 id="clientes-title" className="text-h2 mt-4">
            Instituições e clínicas atendidas.
          </h2>
        </Reveal>
      </div>

      <div className="mt-12">
        <div className="clients-marquee border-y border-line">
          <ul
            ref={trackRef}
            aria-label="Logos de instituições e clínicas atendidas"
            className="clients-track"
          >
            {[0, 1].map((copy) =>
              clients.map((client) => (
                <li
                  key={`${copy}-${client.name}`}
                  aria-hidden={copy === 1 || undefined}
                  className="client-cell flex h-28 w-52 shrink-0 items-center justify-center border-r border-line bg-surface px-5 py-4 sm:w-60"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                    width={400}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="client-logo h-full w-full max-w-40 object-contain"
                  />
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
