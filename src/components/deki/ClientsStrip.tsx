import { useEffect, useRef, useState } from "react";
import { clients } from "@/data/clients";
import { Reveal } from "@/components/deki/Reveal";

/** Pause only while pressed/dragged, then resume shortly after release. */
const RESUME_MS = 1500;

/**
 * Client trust strip: one continuous band of logos that scrolls on its own.
 *
 * The logo list is rendered twice so the CSS loop (`translateX(-50%)`) wraps with
 * no visible jump. The second copy is `aria-hidden` so screen readers hear each
 * clinic once. It pauses only on click/drag — hovering does not stop it — and
 * `prefers-reduced-motion` turns it into a plain horizontal scroll.
 */
export function ClientsStrip() {
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const hold = () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    setPaused(true);
  };

  const release = () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_MS);
  };

  return (
    <section id="clientes" aria-labelledby="clientes-title" className="section-y border-y border-line bg-surface">
      <div className="container-deki">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Quem confia na DEKI</p>
          <h2 id="clientes-title" className="text-h2 mt-4">
            Instituições e clínicas atendidas.
          </h2>
        </Reveal>
      </div>

      <div className="mt-12">
        <div
          className="clients-marquee border-y border-line"
          onPointerDown={hold}
          onPointerUp={release}
          onPointerCancel={release}
          onPointerLeave={release}
        >
          <ul className="clients-track" style={{ animationPlayState: paused ? "paused" : "running" }}>
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
