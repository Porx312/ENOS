import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  Construction,
  HardHat,
  Headset,
  Package,
  Settings,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { CoverageMap } from "@/components/coverage-map";
import { LeadForm } from "@/components/lead-form";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { Reveal } from "@/components/reveal";
import { TrackView } from "@/components/track-view";
import { differentiators, homeFeaturedProducts, homeServices } from "@/lib/content";
import { images } from "@/lib/images";
import { commercialSla, company, companyRif, contactAddress, contactEmail, phoneDisplay } from "@/lib/site";

const icons = [Headset, Wrench, Package, HardHat];

const aboutPillars = [
  { label: "Equipos y Maquinaria", Icon: Construction },
  { label: "Suministros Industriales", Icon: Package },
  { label: "Servicios Operacionales", Icon: HardHat },
  { label: "Soluciones Integrales", Icon: Settings },
] as const;

export function HomeView() {
  const phone = phoneDisplay();
  const email = contactEmail();
  const address = contactAddress();
  const rif = companyRif();

  const trustFacts = [
    { label: "Foco geográfico", value: company.region },
    { label: "Respuesta comercial", value: commercialSla },
    {
      label: "Identidad",
      value: rif ? `${company.legalName} · RIF ${rif}` : company.legalName,
    },
  ];

  return (
    <>
      <TrackView line="Portada" />
      <MobileStickyCta targetId="contacto" label="Pedir cotización" />
      <main className="pb-20 lg:pb-0">
        <section id="inicio" className="group/hero relative overflow-hidden bg-paper">
          <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-petroleum lg:block" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center lg:min-h-[82vh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-4 lg:px-5 lg:py-14">
            {/* Móvil: maquinaria arriba; PC: panel negro más estrecho, imagen un poco más grande */}
            <div className="relative order-1 flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-petroleum px-1 py-2 sm:aspect-[2/1] sm:px-2 lg:order-2 lg:aspect-auto lg:min-h-[min(72vh,580px)] lg:overflow-visible lg:px-0 lg:py-0">
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                width={1600}
                height={900}
                priority
                className="hero-media h-full max-h-[520px] w-full translate-x-[5%] scale-[1.28] object-contain object-center sm:max-h-[600px] sm:scale-[1.47] lg:max-h-[min(85vh,720px)] lg:translate-x-[10%] lg:scale-[1.71] lg:origin-center"
                sizes="(max-width:1024px) 100vw, 55vw"
              />
            </div>

            <div className="order-2 max-w-xl px-5 py-10 lg:order-1 lg:px-0 lg:py-0">
              <p className="font-display text-xs font-extrabold tracking-[0.2em] text-orange uppercase sm:text-sm">
                {company.name}
              </p>
              <h1 className="mt-3 font-display text-[1.85rem] leading-[1.08] font-extrabold tracking-tight text-petroleum uppercase sm:text-5xl lg:mt-4 lg:text-6xl">
                Su operación no se detiene. Nosotros lo resolvemos.
              </h1>
              <p className="mt-4 text-sm leading-6 text-muted sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
                Alquiler, suministros, EPP y soporte en sitio para industria energética en el oriente. Diga qué necesita:
                armamos la cotización con el alcance real de su campo o planta.
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold tracking-wide text-petroleum/80 uppercase">
                {trustFacts.map((fact) => (
                  <li key={fact.label} className="max-w-xs">
                    <span className="text-orange">{fact.label}:</span> {fact.value}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-bold text-petroleum">{commercialSla}</p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Link href="/contacto" className="btn-primary">
                  Pedir cotización ahora
                </Link>
                <Link href="/#servicios" className="btn-ghost">
                  Ver cómo trabajamos
                </Link>
              </div>
              {(rif || address) && (
                <p className="mt-4 text-xs text-muted">
                  {rif ? <>RIF {rif}. </> : null}
                  {address ? <>{address}</> : null}
                </p>
              )}
            </div>
          </div>
        </section>

        <section id="servicios" className="surface-grid">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">Servicios</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
                Soluciones para cada necesidad operativa
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                Todo lo que necesita para mantener proyectos y operaciones en funcionamiento.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {homeServices.map((service) => (
                <Reveal key={service.href} as="article" className="group">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                    <div className="absolute top-0 left-0 h-1.5 w-16 bg-orange" />
                  </div>
                  <div className="pt-5">
                    <h3 className="font-display text-xl font-extrabold tracking-tight text-petroleum uppercase">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{service.text}</p>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <Link
                        href={`/?tipo=${service.tipo}#contacto`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-petroleum hover:text-orange"
                      >
                        Solicitar información <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link href={service.href} className="text-sm font-bold text-muted hover:text-petroleum">
                        Ver línea
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="nosotros" className="relative overflow-hidden bg-paper">
          <div className="relative mx-auto grid max-w-7xl lg:min-h-[560px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <Reveal className="relative z-10 flex flex-col justify-center px-5 py-14 sm:px-8 lg:py-20 lg:pr-10 lg:pl-5 xl:pl-8">
              <div>
                <h2 className="relative inline-block font-display text-4xl font-extrabold tracking-tight text-petroleum sm:text-5xl">
                  Nosotros
                  <span className="absolute -bottom-1 left-0 h-1.5 w-14 bg-orange" aria-hidden="true" />
                </h2>
              </div>
              <p className="mt-8 max-w-md font-display text-2xl leading-snug font-extrabold tracking-tight text-petroleum italic sm:text-3xl lg:text-[2rem]">
                Somos el aliado que tu{" "}
                <span className="box-decoration-clone bg-orange px-1.5 not-italic text-petroleum">
                  operación necesita.
                </span>
              </p>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted sm:text-base">
                En Energía Nuevo Oriente trabajamos para ofrecer soluciones integrales a la industria energética y
                petrolera, facilitando el acceso a equipos, maquinaria, suministros y servicios que contribuyen a la
                continuidad operativa de nuestros clientes.
              </p>
              <ul className="mt-8 grid max-w-lg grid-cols-2 gap-4 sm:gap-5">
                {aboutPillars.map(({ label, Icon }) => (
                  <li key={label} className="flex flex-col items-start gap-2">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border-2 border-petroleum/20 bg-orange text-petroleum shadow-sm sm:h-14 sm:w-14">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="max-w-[9rem] text-xs font-bold leading-snug text-petroleum sm:text-sm">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/empresa" className="btn-primary mt-8 w-fit">
                Conocer la empresa
              </Link>
            </Reveal>

            <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
              <Image
                src={images.about.src}
                alt={images.about.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 55vw"
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-paper to-transparent lg:block"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">Diferenciales</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
                Por qué trabajar con nosotros
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                Proceso claro, cobertura en el oriente y respuesta comercial medible. Cada cotización sale del alcance
                real de su operación.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {differentiators.map((item, index) => {
                const Icon = icons[index];
                return (
                  <Reveal key={item.title} as="article">
                    <span className="inline-flex h-12 w-12 items-center justify-center bg-orange text-petroleum">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-petroleum uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                  </Reveal>
                );
              })}
            </div>
            <div className="mt-12 grid gap-4 border border-line bg-mist/40 p-6 md:grid-cols-3">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-orange uppercase">01 · Solicitud</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Describe equipo, sitio y urgencia. Sin tarifas genéricas publicadas.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-orange uppercase">02 · Respuesta</p>
                <p className="mt-2 text-sm leading-6 text-muted">{commercialSla}</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-orange uppercase">03 · Ejecución</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Cotización con alcance, condiciones y plazo según disponibilidad en la zona.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CoverageMap />

        <section id="productos" className="surface-grid">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">Equipos</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
                Equipos y suministros para la industria
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                Líneas prioritarias. Consulte disponibilidad; el resto de equipos y EPP está en cada servicio.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {homeFeaturedProducts.map((product) => (
                <Reveal key={product.name} as="article">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-petroleum uppercase">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{product.text}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href={`/?tipo=${product.tipo}&producto=${encodeURIComponent(product.name)}#contacto`}
                        className="btn-primary min-h-10 px-3 text-sm"
                      >
                        Consultar
                      </Link>
                      <Link
                        href={product.href}
                        className="inline-flex min-h-10 items-center text-sm font-bold text-petroleum hover:text-orange"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="band-yellow">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 lg:flex-row lg:items-center lg:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
                ¿Qué necesita tu operación?
              </h2>
              <p className="mt-3 text-petroleum/75">
                Cuéntanos qué equipo, suministro o servicio necesitas. {commercialSla}
              </p>
            </div>
            <Link href="/contacto" className="btn-dark shrink-0">
              Cotizar mi operación
            </Link>
          </div>
        </section>

        <section id="contacto" className="bg-paper">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">Contacto</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
                Envíe su solicitud
              </h2>
              <p className="mt-4 text-muted">
                Indique el tipo de necesidad y la zona. La solicitud llega al departamento comercial y se abre WhatsApp
                con el resumen para agilizar la respuesta.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-petroleum">
                {phone ? <li>Teléfono: {phone}</li> : null}
                {email ? (
                  <li>
                    Correo:{" "}
                    <a href={`mailto:${email}`} className="font-bold hover:text-orange">
                      {email}
                    </a>
                  </li>
                ) : null}
                <li>
                  También puede usar la página de{" "}
                  <Link href="/contacto" className="font-bold hover:text-orange">
                    cotización
                  </Link>
                  .
                </li>
              </ul>
            </Reveal>
            <Reveal>
              <Suspense fallback={<div className="border border-line bg-mist p-6">Cargando formulario…</div>}>
                <LeadForm />
              </Suspense>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
