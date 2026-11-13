import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";
import {
  commercialSla,
  company,
  companyRif,
  contactAddress,
  contactEmail,
  phoneDisplay,
  serviceLinks,
  siteUrl,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Empresa",
  description: `${company.legalName}: procura, alquiler de equipos y soporte operacional para industria energética y petrolera en el oriente del país.`,
  alternates: { canonical: "/empresa" },
  openGraph: {
    title: `Empresa · ${company.name}`,
    description: company.description,
    url: `${siteUrl()}/empresa`,
    images: [{ url: "/images/about-v2.webp", width: 1600, height: 900, alt: company.name }],
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
    text: `Sin catálogo de precios públicos. Cada solicitud se arma con el alcance, la ubicación y la urgencia. ${commercialSla}`,
  },
];

export default function EmpresaPage() {
  const phone = phoneDisplay();
  const email = contactEmail();
  const address = contactAddress();
  const rif = companyRif();

  return (
    <main>
      <section className="relative overflow-hidden bg-paper">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-orange lg:block" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">Empresa</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-petroleum uppercase sm:text-5xl">
            {company.legalName}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{company.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contacto" className="btn-primary">
              Pedir cotización
            </Link>
            <Link href="/#servicios" className="btn-ghost">
              Ver soluciones
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={images.about.src}
              alt={images.about.alt}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute right-0 bottom-0 h-16 w-16 bg-[linear-gradient(135deg,transparent_50%,#f9c513_50%)]" />
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
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

      <section className="surface-grid">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
            Cómo trabajamos
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {pillars.map((item) => (
              <Reveal key={item.title} as="article" className="border border-line border-t-4 border-t-orange bg-paper p-6">
                <h3 className="font-display text-lg font-extrabold tracking-tight text-petroleum uppercase">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
            Líneas de negocio
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="btn-outline min-h-11 px-4 text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-yellow">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
              Datos de contacto
            </h2>
            <p className="mt-3 text-petroleum/75">
              Use el formulario o WhatsApp. El equipo comercial responde con el contexto de su solicitud.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-petroleum">
              {phone ? <li>Teléfono: {phone}</li> : null}
              {email ? (
                <li>
                  Correo:{" "}
                  <a href={`mailto:${email}`} className="font-bold hover:underline">
                    {email}
                  </a>
                </li>
              ) : null}
              {address ? <li>Dirección: {address}</li> : null}
              {rif ? <li>RIF: {rif}</li> : null}
              <li>Región de foco: {company.region}</li>
              <li>{commercialSla}</li>
            </ul>
            <p className="mt-6 text-xs leading-5 text-petroleum/60">
              {!rif
                ? "Configure NEXT_PUBLIC_RIF en producción para mostrar el RIF aquí. "
                : null}
              {!email || !address
                ? "Complete también NEXT_PUBLIC_EMAIL y NEXT_PUBLIC_ADDRESS para el bloque de contacto."
                : "Datos fiscales y de contacto publicados según la configuración de producción."}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link href="/contacto" className="btn-dark">
              Ir a cotizar
            </Link>
            <Link href="/privacidad" className="btn-ghost-on-dark">
              Aviso de privacidad
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
