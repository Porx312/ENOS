import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CoverageMap } from "@/components/coverage-map";
import { LeadForm } from "@/components/lead-form";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { Reveal } from "@/components/reveal";
import { TrackView } from "@/components/track-view";
import { images } from "@/lib/images";
import type { InfoCard, Landing } from "@/lib/landings";
import { commercialSla } from "@/lib/site";

export function LandingView({ landing }: { landing: Landing }) {
  const image = images[landing.imageKey];

  return (
    <>
      <TrackView line={landing.line} />
      <MobileStickyCta targetId="cotizar" label="Ir a cotizar" />
      <main className="pb-20 lg:pb-0">
        <section className="group/hero relative overflow-hidden bg-paper">
          <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:py-16">
            <div className="order-1">
              <p className="inline-flex bg-orange px-2.5 py-1 text-xs font-extrabold tracking-[0.14em] text-petroleum uppercase">
                {landing.eyebrow}
              </p>
              <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.02] font-extrabold tracking-tight text-petroleum uppercase sm:text-5xl">
                {landing.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">{landing.subtitle}</p>
              <p className="mt-3 max-w-xl text-sm font-bold text-petroleum">{commercialSla}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#cotizar" className="btn-primary">
                  Cotizar mi operación
                </a>
                <Link href="/#servicios" className="btn-ghost">
                  Ver otros servicios
                </Link>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {landing.trust.map((item) => (
                  <li key={item} className="border-l-2 border-orange pl-3 text-sm font-bold text-petroleum">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="relative mt-8 hidden aspect-[16/10] w-full overflow-hidden bg-orange sm:aspect-[4/3] lg:block">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain object-bottom p-3 drop-shadow-lg sm:p-4"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            <div className="order-2">
              <Suspense fallback={<div className="bg-mist p-6 text-ink">Cargando formulario…</div>}>
                <LeadForm
                  id="cotizar"
                  title="Pida su cotización"
                  fixedType={landing.requestType}
                  extraFields={landing.fields}
                  lineLabel={landing.line}
                  whatsappIntro={landing.whatsappMessage}
                />
              </Suspense>
            </div>
            <div className="relative order-3 aspect-[16/10] w-full overflow-hidden bg-orange sm:aspect-[4/3] lg:hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain object-bottom p-3 drop-shadow-lg sm:p-4"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </section>

        <Section title="Para quién es" intro="Operaciones que necesitan el equipo, el insumo o el soporte en el sitio.">
          <div className="grid gap-4 md:grid-cols-3">
            {landing.audience.map((item, index) => (
              <Card key={item.title} item={item} index={index} />
            ))}
          </div>
        </Section>

        <Section title="Qué incluye esta línea" intro="Lo que se puede cotizar desde esta página." band>
          <div className="grid gap-4 md:grid-cols-2">
            {landing.offers.map((item) => (
              <Card key={item.title} item={item} />
            ))}
          </div>
        </Section>

        <Section title="Cómo se contrata" intro="Tres pasos. Sin catálogo y sin precio publicado.">
          <ol className="grid gap-4 md:grid-cols-3">
            {landing.steps.map((step, index) => (
              <Reveal key={step.title} as="li" className="border border-line bg-paper p-5">
                <span className="inline-flex h-12 w-12 items-center justify-center bg-orange font-display text-2xl font-extrabold text-petroleum">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-extrabold tracking-tight text-petroleum uppercase">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </Section>

        <CoverageMap />

        <section className="bg-mist">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
              Por qué Energía Nuevo Oriente
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {landing.reasons.map((reason) => (
                <Reveal key={reason.title} as="article" className="border-t-2 border-orange pt-4">
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-petroleum uppercase">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{reason.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Section title="Antes de cotizar">
          <div className="divide-y divide-line border-y border-line">
            {landing.faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none text-lg font-bold marker:content-none">
                  <span className="flex items-start justify-between gap-4 text-petroleum">
                    {faq.question}
                    <span className="text-orange group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Section>

        <section className="band-yellow">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
                Listo para cotizar
              </h2>
              <p className="mt-3 max-w-xl text-petroleum/75">
                Use el formulario de esta página. {commercialSla} La solicitud se abre en WhatsApp con el contexto de
                esta línea.
              </p>
            </div>
            <a href="#cotizar" className="btn-dark shrink-0">
              Ir al formulario
            </a>
          </div>
        </section>

        <Section title="Otras líneas">
          <ul className="flex flex-wrap gap-3">
            {landing.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="btn-outline min-h-11 px-4 text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </>
  );
}

function Section({
  title,
  intro,
  band = false,
  children,
}: {
  title: string;
  intro?: string;
  band?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={band ? "bg-mist" : "bg-paper"}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
            {title}
          </h2>
          {intro ? <p className="mt-3 max-w-2xl text-muted">{intro}</p> : null}
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Card({ item, index }: { item: InfoCard; index?: number }) {
  const body = (
    <>
      {typeof index === "number" ? (
        <span className="inline-flex bg-orange px-2 py-0.5 text-xs font-extrabold tracking-wide text-petroleum">
          0{index + 1}
        </span>
      ) : null}
      <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight text-petroleum uppercase">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
      {item.href ? <span className="mt-4 inline-block text-sm font-bold text-orange">Ver esta línea</span> : null}
    </>
  );

  if (item.href) {
    return (
      <Reveal as="article">
        <Link href={item.href} className="block border border-line bg-paper p-5 transition hover:border-orange">
          {body}
        </Link>
      </Reveal>
    );
  }

  return (
    <Reveal as="article" className="border border-line bg-paper p-5">
      {body}
    </Reveal>
  );
}
