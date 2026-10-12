import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

/** Entrada única: opacity + translateY 24px, 500ms. Stagger via `index` (80ms). */
export function Reveal({
  as: Tag = "div",
  index = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}
