import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";
import { company, contactAddress, contactEmail, phoneDisplay, serviceLinks, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Empresa",
  description: `${company.legalName}: procura, alquiler de equipos y soporte operacional para industria energética y petrolera en el oriente del país.`,
  alternates: { canonical: "/empresa" },
  openGraph: {
    title: `Empresa · ${company.name}`,
    description: company.description,
    url: `${siteUrl()}/empresa`,
    images: [{ url: "/images/about.jpg", width: 1600, height: 900, alt: company.name }],
  },
};

const pillars = [
  {
    title: "Qué hacemos",
    text: "Alquiler de maquinaria, suministros y repuestos, EPP e HSE, venta de equipos y soporte operacional en sitio para que la operación no se detenga.",
  },
  {
    title: "A quién atendemos",
    text: "Empresas, contratistas, compras, operaciones y mantenimiento en industria energética, petrolera e industrial.",
  },
  {
    title: "Cobertura",
    text: "El foco es el oriente del país. Si su operación está en otra zona, indíquelo en la cotización y confirmamos si podemos atenderla.",
  },
  {
    title: "Cómo cotizamos",
    text: "Sin catálogo de precios públicos. Cada solicitud se arma con el alcance, la ubicación y la urgencia. Respondemos por WhatsApp o correo.",
  },
];

export default function EmpresaPage() {
  const phone = phoneDisplay();
  const email = contactEmail();
  const address = contactAddress();

  return (
    <main>
      <section className="bg-petroleum text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <p className="text-xs font-semibold tracking-[0.18em] text-orange uppercase">Empresa</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {company.legalName}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{company.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-orange px-5 font-semibold text-petroleum hover:bg-orange-hover"
            >
              Pedir cotización
            </Link>
            <Link
              href="/#servicios"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-5 font-semibold text-white hover:bg-white/10"
            >
              Ver soluciones
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={images.about.src} alt={images.about.alt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-petroleum sm:text-4xl">
              Un interlocutor comercial para la operación
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Trabajamos para facilitar el acceso a equipos, maquinaria, suministros y servicios que contribuyen a la
              continuidad operativa. La cotización sale del contexto real del sitio: qué necesita, dónde y con qué
              urgencia.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              No publicamos tarifas genéricas. Cada respuesta comercial se arma con el alcance que usted define.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-petroleum sm:text-4xl">
            Cómo trabajamos
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {pillars.map((item) => (
              <Reveal key={item.title} as="article" className="rounded-lg border border-line bg-paper p-6">
                <h3 className="text-lg font-semibold text-petroleum">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-petroleum sm:text-4xl">
            Líneas de negocio
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-semibold text-petroleum hover:border-petroleum"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-petroleum text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Datos de contacto</h2>
            <p className="mt-3 text-white/75">
              Use el formulario o WhatsApp. El equipo comercial responde con el contexto de su solicitud.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/85">
              {phone ? <li>Teléfono: {phone}</li> : null}
              {email ? (
                <li>
                  Correo:{" "}
                  <a href={`mailto:${email}`} className="text-orange hover:underline">
                    {email}
                  </a>
                </li>
              ) : null}
              {address ? <li>Dirección: {address}</li> : null}
              <li>Región de foco: {company.region}</li>
            </ul>
            <p className="mt-6 text-xs leading-5 text-white/55">
              Certificaciones, RIF y referencias de clientes se publican cuando la empresa los facilita. No inventamos
              credenciales.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link
              href="/contacto"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-orange px-5 font-semibold text-petroleum hover:bg-orange-hover"
            >
              Ir a cotizar
            </Link>
            <Link
              href="/privacidad"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-5 font-semibold text-white hover:bg-white/10"
            >
              Aviso de privacidad
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
