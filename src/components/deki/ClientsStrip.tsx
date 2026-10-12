import { clients } from "@/data/clients";
import { Reveal } from "@/components/deki/Reveal";

export function ClientsStrip() {
  return (
    <section id="clientes" aria-labelledby="clientes-title" className="section-y border-y border-line bg-surface">
      <div className="container-deki">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Quem confia na DEKI</p>
          <h2 id="clientes-title" className="text-h2 mt-4">Instituições e clínicas atendidas.</h2>
        </Reveal>
        <ul aria-label="Clientes atendidos pela DEKI" className="mt-12 grid grid-cols-2 border-l border-t border-line bg-surface sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {clients.map((client) => (
            <li key={client.name} className="client-cell flex h-32 items-center justify-center border-b border-r border-line bg-surface px-3 py-4 sm:h-36 sm:px-4">
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
          ))}
        </ul>
      </div>
    </section>
  );
}