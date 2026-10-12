import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { WHATSAPP_URL } from "./contact";
import logo from "@/assets/brand/deki-logo.png.asset.json";

const NAV = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#vitrine", label: "Produtos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-[250ms] ${
        solid ? "border-line bg-bone/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-deki flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex min-h-11 items-center" aria-label="DEKI — início">
          <img src={logo.url} alt="DEKI Móveis Clínicos" width={321} height={188} className="h-12 w-auto object-contain md:h-16" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="link-underline py-3 text-sm text-slate hover:text-graphite">
              {n.label}
            </a>
          ))}
          <a href={WHATSAPP_URL()} target="_blank" rel="noopener" className="btn btn-primary min-h-11 px-5 text-sm">
            WhatsApp
          </a>
        </nav>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 top-16 bg-bone transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <nav aria-label="Menu móvel" className="container-deki flex flex-col pt-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-5 font-display text-3xl"
            >
              {n.label}
            </a>
          ))}
          <a href={WHATSAPP_URL()} target="_blank" rel="noopener" className="btn btn-primary mt-8">
            Falar no WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
