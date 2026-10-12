import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Award, Trophy, ShieldCheck, Truck, Star, MessageCircle, Mail, MapPin, Clock, ArrowRight, Instagram, Facebook, Youtube } from "lucide-react";
import { Header } from "@/components/deki/Header";
import { Reveal } from "@/components/deki/Reveal";
import { CONTACT, WHATSAPP_URL } from "@/components/deki/contact";
import data from "@/data/products.json";
import hero from "@/assets/hero-cabinet.jpg";
import cart from "@/assets/cart-compact.jpg";
import counter from "@/assets/counter-sink.jpg";
import set from "@/assets/set-clinic.jpg";

const IMG: Record<string, string> = { hero, cart, counter, set };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEKI Móveis Clínicos — Gaveteiros e móveis odontológicos há 40 anos" },
      { name: "description", content: "Fábrica própria em Curitiba há 40 anos. Gaveteiros, carrinhos auxiliares e balcões odontológicos com entrega para todo o Brasil." },
      { property: "og:title", content: "DEKI Móveis Clínicos — Precisão para o consultório" },
      { property: "og:description", content: "Gaveteiros, carrinhos e balcões odontológicos de fábrica própria, há 40 anos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="page-fade overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-surface focus:p-3">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Credibility />
        <Catalog />
        <Showcase />
        <FortyYears />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      const el = imgRef.current;
      if (!el) return;
      const p = Math.min(1, window.scrollY / window.innerHeight);
      el.style.transform = `translateY(${-6 + p * 12}%)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className="pt-28 md:pt-32">
      <div className="container-deki grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-6 lg:pb-24">
        <div className="hero-seq lg:col-span-6">
          <p className="eyebrow">Móveis clínicos · Fábrica própria desde 1985</p>
          <h1 className="text-display mt-6">
            Mobiliário odontológico feito com <em className="text-teal-deep not-italic">precisão</em>.
          </h1>
          <p className="text-lead mt-8 max-w-xl text-slate">
            Gaveteiros, carrinhos auxiliares e balcões projetados para durar décadas no ritmo do consultório.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={WHATSAPP_URL()} target="_blank" rel="noopener" className="btn btn-primary">
              <MessageCircle className="h-4 w-4" aria-hidden /> Falar no WhatsApp
            </a>
            <a href="#catalogo" className="btn btn-outline">
              Ver catálogo <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:col-start-8">
          <div className="overflow-hidden rounded-[4px] bg-surface">
            <img ref={imgRef} src={hero} alt="Gaveteiro DEKI branco com cinco gavetas e rodízios" width={1024} height={1280} className="h-auto w-full scale-[1.12]" />
          </div>
          <p className="spec mt-4 flex justify-between text-slate">
            <span>Gaveteiro Lumen 5G</span>
            <span>49 × 72 × 39 cm</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Credibility() {
  const items = [
    { icon: Award, value: "40", label: "anos de fábrica" },
    { icon: Trophy, value: "Nº 1", label: "Campeão de vendas no Mercado Livre" },
    { icon: ShieldCheck, value: "Garantia", label: "de fábrica em todos os produtos" },
    { icon: Truck, value: "Brasil", label: "entrega em todo o território" },
  ];
  return (
    <section aria-label="Credibilidade" className="border-y border-line bg-surface">
      <ul className="container-deki grid grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal as="li" key={it.label} index={i} className="flex items-start gap-4 border-line py-8 odd:pr-4 max-lg:[&:nth-child(-n+2)]:border-b lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0">
            <it.icon className="mt-1 h-5 w-5 shrink-0 text-teal-deep" aria-hidden />
            <div>
              <p className="font-display text-2xl leading-none">{it.value}</p>
              <p className="mt-2 text-sm text-slate">{it.label}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Catalog() {
  return (
    <section id="catalogo" className="section-y">
      <div className="container-deki">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">Catálogo</p>
            <h2 className="text-h2 mt-4">Quatro linhas, um mesmo padrão de fábrica.</h2>
          </div>
          <p className="text-slate md:col-span-4 md:col-start-9">
            Da mesa auxiliar ao consultório completo. Escolha a linha e fale com a fábrica.
          </p>
        </Reveal>
      </div>
      <ul className="container-deki mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
        {data.lines.map((l, i) => (
          <Reveal as="li" index={i} key={l.id} className="w-[78%] shrink-0 snap-start md:w-auto">
            <a href={WHATSAPP_URL(`linha ${l.name}`)} target="_blank" rel="noopener" className="card-zoom group block rounded-[4px] border border-line bg-surface transition-colors duration-300 hover:border-teal-deep">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={IMG[l.image]} alt={`Linha ${l.name}`} loading="lazy" width={800} height={1000} className="h-full w-full object-cover" />
              </div>
              <div className="border-t border-line p-5">
                <p className="eyebrow text-slate">{l.tagline}</p>
                <h3 className="mt-2 text-xl font-semibold">{l.name}</h3>
                <p className="mt-2 text-sm text-slate">{l.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-deep">
                  Consultar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Showcase() {
  const [idx, setIdx] = useState(0);
  const p = data.featured[idx];
  return (
    <section id="vitrine" className="section-y border-t border-line bg-surface">
      <div className="container-deki">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Vitrine</p>
            <h2 className="text-h2 mt-4">Em destaque</h2>
          </div>
          <div role="tablist" aria-label="Produtos em destaque" className="flex gap-2">
            {data.featured.map((f, i) => (
              <button
                key={f.name}
                role="tab"
                aria-selected={i === idx}
                aria-label={f.name}
                onClick={() => setIdx(i)}
                className={`spec h-11 min-w-11 rounded-[2px] border px-3 transition-colors ${i === idx ? "border-graphite bg-graphite text-bone" : "border-line hover:border-graphite"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </Reveal>
        <div key={p.name} className="page-fade mt-12 grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="overflow-hidden rounded-[4px] bg-bone lg:col-span-7">
            <img src={IMG[p.image]} alt={p.name} loading="lazy" width={1280} height={960} className="aspect-[4/3] h-full w-full object-cover" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow">Linha {p.line}</p>
            <h3 className="mt-4 font-display text-3xl font-medium leading-tight md:text-4xl">{p.name}</h3>
            <p className="mt-4 text-slate">{p.summary}</p>
            <dl className="mt-8 border-t border-line">
              {p.specs.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:justify-between">
                  <dt className="text-sm text-slate">{k}</dt>
                  <dd className="spec font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={WHATSAPP_URL(p.name)} target="_blank" rel="noopener" className="btn btn-primary mt-8 w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" aria-hidden /> Consultar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FortyYears() {
  return (
    <section className="section-y">
      <Reveal className="container-deki grid items-end gap-8 lg:grid-cols-12">
        <p className="font-display text-[clamp(9rem,30vw,22rem)] leading-[0.8] tracking-[-0.04em] lg:col-span-7" aria-hidden>
          40
        </p>
        <div className="lg:col-span-5">
          <h2 className="text-h2">Anos de vida e durabilidade.</h2>
          <p className="mt-6 text-slate">
            Desde 1985 fabricamos em Curitiba cada peça que sai com a marca DEKI. Quatro décadas de consultórios atendidos
            ensinaram o que importa: gaveta que não trava, tampo que não mancha, estrutura que não cede.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  const values = [
    { t: "Qualidade e excelência", d: "Materiais e processos escolhidos para resistir à rotina clínica." },
    { t: "Inovação contínua", d: "Projetos revisados a partir do uso real de dentistas." },
    { t: "Compromisso com o cliente", d: "Atendimento direto com a fábrica, antes e depois da compra." },
    { t: "Sustentabilidade", d: "Produção responsável e móveis que duram — o menor descarte possível." },
  ];
  return (
    <section id="sobre" className="bg-graphite text-bone section-y">
      <div className="container-deki">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-teal">Sobre a DEKI</p>
            <h2 className="text-h2 mt-4">Praticidade e conforto no dia a dia dos dentistas.</h2>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <Reveal index={1}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">Missão</h3>
              <p className="mt-3 text-bone/80">
                Oferecer móveis clínicos duráveis e funcionais que tornem o trabalho do profissional mais eficiente e seguro.
              </p>
            </Reveal>
            <Reveal index={2}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">Visão</h3>
              <p className="mt-3 text-bone/80">
                Ser referência nacional em mobiliário odontológico, reconhecida pela qualidade de fábrica e pela confiança dos clientes.
              </p>
            </Reveal>
          </div>
        </div>
        <ul className="mt-16 grid gap-px bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal as="li" key={v.t} index={i} className="bg-graphite p-6 pt-8">
              <p className="spec text-teal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-lg font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm text-bone/70">{v.d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="depoimentos" className="section-y">
      <div className="container-deki">
        <Reveal>
          <p className="eyebrow">Depoimentos</p>
          <h2 className="text-h2 mt-4 max-w-2xl">O que dizem os compradores no Mercado Livre.</h2>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.testimonials.map((t, i) => (
            <Reveal as="li" key={i} index={i} className="flex flex-col rounded-[4px] border border-line bg-surface p-6">
              <div className="flex gap-1" aria-label="5 de 5 estrelas" role="img">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-star text-star" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed">“{t.text}”</blockquote>
              <p className="mt-6 border-t border-line pt-4 text-sm text-slate">
                {t.author} · {t.source}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  const rows = [
    { icon: MessageCircle, label: "WhatsApp", value: CONTACT.whatsappDisplay, href: WHATSAPP_URL() },
    { icon: Mail, label: "E-mail", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: "Fábrica", value: CONTACT.address, href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT.address)}` },
    { icon: Clock, label: "Horário", value: "Seg a sex, 8h às 18h" },
  ];
  return (
    <section id="contato" className="section-y border-t border-line bg-surface">
      <div className="container-deki grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Contato</p>
          <h2 className="text-h2 mt-4">Fale direto com a fábrica.</h2>
          <dl className="mt-10 border-t border-line">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-line py-5">
                <r.icon className="mt-1 h-5 w-5 text-teal-deep" aria-hidden />
                <div className="min-w-0">
                  <dt className="text-sm text-slate">{r.label}</dt>
                  <dd className="mt-1 break-words font-medium">
                    {r.href ? (
                      <a href={r.href} target="_blank" rel="noopener" className="link-underline">{r.value}</a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          <a href={WHATSAPP_URL()} target="_blank" rel="noopener" className="btn btn-primary mt-8">
            Iniciar conversa no WhatsApp
          </a>
        </Reveal>
        <Reveal index={1} className="min-h-[360px] overflow-hidden rounded-[4px] border border-line lg:col-span-6 lg:col-start-7">
          <iframe
            title="Mapa da fábrica DEKI em Curitiba"
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`}
            className="h-full min-h-[360px] w-full grayscale"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-deki grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-display text-3xl">Deki<span className="text-teal">.</span></p>
          <p className="mt-4 max-w-xs text-sm text-slate">Móveis clínicos e odontológicos. Fábrica própria em Curitiba/PR há 40 anos.</p>
          <div className="mt-6 flex gap-2">
            {[
              { href: CONTACT.instagram, icon: Instagram, label: "Instagram da DEKI" },
              { href: CONTACT.facebook, icon: Facebook, label: "Facebook da DEKI" },
              { href: CONTACT.youtube, icon: Youtube, label: "YouTube da DEKI" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-[2px] border border-line hover:border-graphite">
                <s.icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Linhas de produto" className="lg:col-span-3 lg:col-start-6">
          <h3 className="eyebrow text-slate">Linhas</h3>
          <ul className="mt-4 space-y-1">
            {data.lines.map((l) => (
              <li key={l.id}><a href="#catalogo" className="link-underline inline-block py-2 text-sm">{l.name}</a></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Institucional" className="lg:col-span-2">
          <h3 className="eyebrow text-slate">Institucional</h3>
          <ul className="mt-4 space-y-1 text-sm">
            <li><a href="#sobre" className="link-underline inline-block py-2">Sobre</a></li>
            <li><a href="#depoimentos" className="link-underline inline-block py-2">Depoimentos</a></li>
            <li><a href="#contato" className="link-underline inline-block py-2">Contato</a></li>
            <li><a href={CONTACT.linktree} target="_blank" rel="noopener" className="link-underline inline-block py-2">Mercado Livre</a></li>
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <h3 className="eyebrow text-slate">Fábrica</h3>
          <p className="mt-4 text-sm text-slate">{CONTACT.address}</p>
          <p className="mt-2 text-sm"><a href={`mailto:${CONTACT.email}`} className="link-underline">{CONTACT.email}</a></p>
          <p className="mt-1 text-sm">{CONTACT.whatsappDisplay}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-deki flex flex-col gap-2 py-6 text-xs text-slate sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} DEKI Móveis Clínicos. Todos os direitos reservados.</p>
          <p className="spec">CNPJ 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>
  );
}
