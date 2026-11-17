import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Award, Trophy, ShieldCheck, Truck, Star, MessageCircle, Mail, MapPin, Clock, ArrowRight, Instagram, Facebook, Youtube } from "lucide-react";
import { Header } from "@/components/deki/Header";
import { Reveal } from "@/components/deki/Reveal";
import { ClientsStrip } from "@/components/deki/ClientsStrip";
import { Carousel } from "@/components/deki/Carousel";
import { ProductModal, type Product } from "@/components/deki/ProductModal";
import { CONTACT, WHATSAPP_URL } from "@/components/deki/contact";
import data from "@/data/products.json";
import { productCover, productImages } from "@/lib/product-images";
import logo from "@/assets/brand/deki-logo.png";

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
        <ClientsStrip />
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
          <div className="overflow-hidden rounded-[4px] border border-line bg-surface">
            <img ref={imgRef} src={productCover("carrinho")} alt="Carrinho auxiliar DEKI branco com cinco gavetas e bandeja organizadora" width={1015} height={1053} className="h-auto w-full scale-[1.12]" />
          </div>
          <p className="spec mt-4 flex justify-between text-slate">
            <span>Carrinho Auxiliar 5G</span>
            <span>49 × 72 × 37 cm</span>
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
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="catalogo" className="section-y">
      <div className="container-deki">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">Catálogo</p>
            <h2 className="text-h2 mt-4">Diversas linhas, um mesmo padrão de fábrica.</h2>
          </div>
          <p className="text-slate md:col-span-4 md:col-start-9">
            Da mesa auxiliar ao consultório completo. Clique em um produto para ver todas as fotos e medidas.
          </p>
        </Reveal>
      </div>
      <div className="container-deki mt-12">
        <Carousel label="Produtos DEKI" controlsClassName="mt-4" autoMs={4500}>
          {data.featured.map((p, i) => {
            const cover = productCover(p.slug);
            const total = productImages(p.slug).length;
            const open = () => setSelected(p as Product);
            return (
              <Reveal as="li" index={i} key={p.name} className="w-[82%] shrink-0 snap-start sm:w-[52%] lg:w-[31.5%]">
                <article className="flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-surface">
                  <button
                    type="button"
                    onClick={open}
                    aria-label={`Ver ${total} fotos e medidas de ${p.name}`}
                    className="group/img relative block w-full overflow-hidden bg-surface"
                  >
                    <img
                      src={cover}
                      alt={p.name}
                      loading="lazy"
                      width={1100}
                      height={1100}
                      className="aspect-square w-full object-contain transition-transform duration-300 group-hover/img:scale-[1.02]"
                    />
                    <span className="absolute inset-x-0 bottom-3 mx-auto w-fit rounded-[2px] border border-line bg-surface/90 px-3 py-1.5 text-xs font-medium text-slate opacity-0 backdrop-blur transition-opacity duration-200 group-hover/img:opacity-100 group-focus-visible/img:opacity-100">
                      Ver fotos ({total})
                    </span>
                  </button>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow text-slate">Linha {p.line}</p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug">
                      <button type="button" onClick={open} className="text-left transition-colors hover:text-teal-deep">
                        {p.name}
                      </button>
                    </h3>
                    <p className="mt-2 text-sm text-slate">{p.summary}</p>
                    <dl className="mt-5 border-t border-line">
                      {p.specs.map(([k, v]) => (
                        <div key={k} className="flex flex-col gap-0.5 border-b border-line py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                          <dt className="text-xs text-slate">{k}</dt>
                          <dd className="spec text-xs font-medium sm:text-right">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-auto pt-5">
                      <a href={WHATSAPP_URL(p.name)} target="_blank" rel="noopener" className="btn btn-primary w-full">
                        <MessageCircle className="h-4 w-4" aria-hidden /> Consultar
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Carousel>
      </div>

      {selected && (
        <ProductModal
          product={selected}
          images={productImages(selected.slug)}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

function Showcase() {
  return (
    <section id="vitrine" className="section-y border-t border-line bg-surface">
      <div className="container-deki">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Vitrine</p>
            <h2 className="text-h2 mt-4">Em destaque</h2>
          </div>
          <p className="max-w-sm text-sm text-slate">
            Modelos de fábrica, com medidas reais. Arraste para ver mais.
          </p>
        </Reveal>
        <div className="mt-12">
          <Carousel label="Produtos em destaque" controlsClassName="mt-4">
            {data.featured.map((p, i) => (
              <Reveal as="li" index={i} key={p.name} className="w-[82%] shrink-0 snap-start sm:w-[52%] lg:w-[31.5%]">
                <article className="flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-surface">
                  <div className="overflow-hidden bg-surface">
                    <img src={productCover(p.slug)} alt={p.name} loading="lazy" width={1100} height={1100} className="aspect-square w-full object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow text-slate">Linha {p.line}</p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug">{p.name}</h3>
                    <p className="mt-2 text-sm text-slate">{p.summary}</p>
                    <dl className="mt-5 border-t border-line">
                      {p.specs.map(([k, v]) => (
                        <div key={k} className="flex flex-col gap-0.5 border-b border-line py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                          <dt className="text-xs text-slate">{k}</dt>
                          <dd className="spec text-xs font-medium sm:text-right">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-auto pt-5">
                      <a href={WHATSAPP_URL(p.name)} target="_blank" rel="noopener" className="btn btn-primary w-full">
                        <MessageCircle className="h-4 w-4" aria-hidden /> Consultar
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </Carousel>
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
          <a href="#top" aria-label="DEKI — início" className="inline-block">
            <img src={logo} alt="DEKI Móveis Clínicos" width={1376} height={768} className="h-24 w-auto object-contain" loading="lazy" />
          </a>
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
