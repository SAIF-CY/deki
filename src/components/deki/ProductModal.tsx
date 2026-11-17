import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { WHATSAPP_URL } from "./contact";

export type Product = {
  name: string;
  line: string;
  slug: string;
  summary: string;
  specs: string[][];
};

/**
 * Product detail dialog: the full gallery for one model plus its specs.
 *
 * Opens from a product image in the catalogue. Closes on Esc, on the backdrop and
 * on the X button; ←/→ walk the photos. Page scroll is locked while it is open.
 */
export function ProductModal({
  product,
  images,
  onClose,
}: {
  product: Product;
  images: string[];
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;

  const go = (delta: number) => {
    if (count === 0) return;
    setIndex((v) => (v + delta + count) % count);
  };

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((v) => (v + 1) % Math.max(1, count));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((v) => (v - 1 + Math.max(1, count)) % Math.max(1, count));
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [count, onClose]);

  const arrow =
    "absolute top-0 bottom-0 my-auto grid h-10 w-10 place-items-center rounded-[2px] border border-line bg-surface/90 text-graphite backdrop-blur transition-colors hover:border-graphite";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-graphite/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="produto-titulo"
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-y-auto rounded-t-[6px] border border-line bg-surface sm:rounded-[4px] lg:grid lg:grid-cols-2"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-[2px] border border-line bg-surface/90 backdrop-blur transition-colors hover:border-graphite"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="bg-surface p-4 sm:p-6">
          <div className="relative">
            <img
              src={images[index]}
              alt={`${product.name} — foto ${index + 1} de ${count}`}
              width={1100}
              height={1100}
              className="aspect-square w-full object-contain"
            />
            {count > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={`${arrow} left-1`}>
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className={`${arrow} right-1`}>
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <li key={src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={i === index}
                    className={`block h-16 w-16 overflow-hidden rounded-[2px] border transition-colors ${
                      i === index ? "border-graphite" : "border-line hover:border-slate"
                    }`}
                  >
                    <img src={src} alt="" width={64} height={64} loading="lazy" className="h-full w-full object-contain" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col border-t border-line p-5 sm:p-6 lg:border-l lg:border-t-0">
          <p className="eyebrow text-slate">Linha {product.line}</p>
          <h3 id="produto-titulo" className="mt-2 font-display text-2xl font-medium leading-tight md:text-3xl">
            {product.name}
          </h3>
          <p className="mt-3 text-sm text-slate">{product.summary}</p>

          <dl className="mt-6 border-t border-line">
            {product.specs.map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col gap-0.5 border-b border-line py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <dt className="text-xs text-slate">{label}</dt>
                <dd className="spec text-sm font-medium sm:text-right">{value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={WHATSAPP_URL(product.name)}
            target="_blank"
            rel="noopener"
            className="btn btn-primary mt-auto w-full sm:mt-6"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> Consultar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
