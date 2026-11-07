import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  HardHat,
  Headset,
  Package,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { TrackView } from "@/components/track-view";
import { differentiators, homeServices, products } from "@/lib/content";
import { images } from "@/lib/images";
import { contactEmail, phoneDisplay } from "@/lib/site";

const icons = [Headset, Wrench, Package, HardHat];

export function HomeView() {
  const phone = phoneDisplay();
  const email = contactEmail();

  return (
    <>
      <TrackView line="Portada" />
      <main>
        <section id="inicio" className="relative min-h-[78vh] overflow-hidden bg-petroleum text-white">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-petroleum/90 via-petroleum/75 to-petroleum/45" />
          <div className="relative mx-auto flex min-h-[78vh] max-w-6xl items-center px-5 py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-orange uppercase">
                Industria energética y petrolera
              </p>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Equipos, suministros y soporte para que la operación siga.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                Alquiler de maquinaria, compra de repuestos y EPP, venta de equipos y servicios en sitio. Soluciones
                para mantener tus operaciones en movimiento.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contacto"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-orange px-5 font-semibold text-petroleum transition hover:bg-orange-hover"
                >
                  Pedir cotización
                </Link>
                <Link
                  href="/#servicios"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-5 font-semibold text-white transition hover:bg-white/10"
                >
                  Conocer nuestros servicios
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-petroleum sm:text-4xl">
                Soluciones para cada necesidad operativa
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                Todo lo que necesita para mantener proyectos y operaciones en funcionamiento.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {homeServices.map((service) => (
                <Reveal key={service.href} as="article" className="group overflow-hidden rounded-lg border border-line bg-paper">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-petroleum">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{service.text}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={`/?tipo=${service.tipo}#contacto`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-orange hover:text-orange-hover"
                      >
                        Solicitar información <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link href={service.href} className="text-sm font-semibold text-petroleum hover:underline">
                        Ver línea
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="nosotros" className="bg-mist">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-20">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={images.about.src} alt={images.about.alt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </Reveal>
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.16em] text-orange uppercase">Nosotros</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-petroleum sm:text-4xl">
                Somos el aliado que tu operación necesita.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                En Energía Nuevo Oriente trabajamos para ofrecer soluciones integrales a la industria energética y
                petrolera, facilitando el acceso a equipos, maquinaria, suministros y servicios que contribuyen a la
                continuidad operativa de nuestros clientes.
              </p>
              <Link
                href="/empresa"
                className="mt-7 inline-flex min-h-12 items-center rounded-md bg-petroleum px-5 font-semibold text-white transition hover:bg-petroleum-hover"
              >
                Conocer la empresa
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="bg-petroleum text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Por qué trabajar con nosotros
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {differentiators.map((item, index) => {
                const Icon = icons[index];
                return (
                  <Reveal key={item.title} as="article">
                    <Icon className="h-8 w-8 text-orange" strokeWidth={1.5} />
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">{item.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="productos" className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-petroleum sm:text-4xl">
                Equipos y suministros para la industria
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                Consulte disponibilidad y condiciones. Cada solicitud se cotiza según el alcance de su operación.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Reveal key={product.name} as="article" className="overflow-hidden rounded-lg border border-line">
                  <div className="relative h-44">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-petroleum">{product.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{product.text}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href={`/?tipo=${product.tipo}&producto=${encodeURIComponent(product.name)}#contacto`}
                        className="inline-flex min-h-10 items-center rounded-md bg-orange px-3 text-sm font-semibold text-petroleum hover:bg-orange-hover"
                      >
                        Consultar
                      </Link>
                      <Link href={product.href} className="inline-flex min-h-10 items-center text-sm font-semibold text-petroleum hover:underline">
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-petroleum text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 lg:flex-row lg:items-center lg:py-20">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                ¿Qué necesita tu operación?
              </h2>
              <p className="mt-3 text-white/75">
                Cuéntanos qué equipo, suministro o servicio necesitas. Nuestro equipo comercial está preparado para
                atender tu solicitud.
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex min-h-12 shrink-0 items-center rounded-md bg-orange px-5 font-semibold text-petroleum transition hover:bg-orange-hover"
            >
              Solicitar cotización
            </Link>
          </div>
        </section>

        <section id="contacto" className="bg-mist">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.16em] text-orange uppercase">Contacto</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-petroleum sm:text-4xl">
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
                    <a href={`mailto:${email}`} className="font-semibold hover:underline">
                      {email}
                    </a>
                  </li>
                ) : null}
                <li>
                  También puede usar la página de{" "}
                  <Link href="/contacto" className="font-semibold hover:underline">
                    cotización
                  </Link>
                  .
                </li>
              </ul>
            </Reveal>
            <Reveal>
              <Suspense fallback={<div className="rounded-lg border border-line bg-paper p-6">Cargando formulario…</div>}>
                <LeadForm />
              </Suspense>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
