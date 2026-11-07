import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { TrackView } from "@/components/track-view";
import { images } from "@/lib/images";
import type { InfoCard, Landing } from "@/lib/landings";

export function LandingView({ landing }: { landing: Landing }) {
  const image = images[landing.imageKey];

  return (
    <>
      <TrackView line={landing.line} />
      <main>
        <section className="relative overflow-hidden bg-petroleum text-white">
          <Image src={image.src} alt={image.alt} fill className="object-cover opacity-35" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-petroleum via-petroleum/85 to-petroleum/50" />
          <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
            <div>
              <p className="inline-flex rounded-sm bg-orange px-2 py-1 text-xs font-bold tracking-wide text-petroleum uppercase">
                {landing.eyebrow}
              </p>
              <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
                {landing.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">{landing.subtitle}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#cotizar"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-orange px-5 font-semibold text-petroleum hover:bg-orange-hover"
                >
                  Pedir cotización
                </a>
                <Link
                  href="/#servicios"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-5 font-semibold text-white hover:bg-white/10"
                >
                  Ver otros servicios
                </Link>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {landing.trust.map((item) => (
                  <li key={item} className="border-l-2 border-orange pl-3 text-sm font-semibold text-white">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Suspense fallback={<div className="rounded-lg bg-paper p-6 text-ink">Cargando formulario…</div>}>
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
              <Reveal key={step.title} as="li" className="rounded-lg border border-line p-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-orange font-display text-2xl font-semibold text-petroleum">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-petroleum">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </Section>

        <section className="bg-petroleum text-white">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Por qué Energía Nuevo Oriente
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {landing.reasons.map((reason) => (
                <Reveal key={reason.title} as="article">
                  <h3 className="text-lg font-semibold text-orange">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">{reason.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Section title="Antes de cotizar">
          <div className="divide-y divide-line border-y border-line">
            {landing.faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none text-lg font-semibold marker:content-none">
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

        <section className="bg-mist">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-petroleum sm:text-4xl">
                Listo para cotizar
              </h2>
              <p className="mt-3 text-muted">
                Deje los datos aquí. La solicitud se abre en WhatsApp con el contexto de esta línea.
              </p>
            </div>
            <Suspense fallback={<div className="rounded-lg bg-paper p-6">Cargando formulario…</div>}>
              <LeadForm
                id="cotizar-cierre"
                title="Datos para la cotización"
                fixedType={landing.requestType}
                extraFields={landing.fields}
                lineLabel={landing.line}
                whatsappIntro={landing.whatsappMessage}
              />
            </Suspense>
          </div>
        </section>

        <Section title="Otras líneas">
          <ul className="flex flex-wrap gap-3">
            {landing.related.map((link) => (
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
          <h2 className="font-display text-3xl font-bold tracking-tight text-petroleum sm:text-4xl">{title}</h2>
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
        <span className="inline-flex rounded-sm bg-orange px-2 py-0.5 text-xs font-bold tracking-wide text-petroleum">
          0{index + 1}
        </span>
      ) : null}
      <h3 className="mt-2 text-xl font-semibold text-petroleum">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
      {item.href ? <span className="mt-4 inline-block text-sm font-semibold text-orange">Ver esta línea</span> : null}
    </>
  );

  if (item.href) {
    return (
      <Reveal as="article">
        <Link href={item.href} className="block rounded-lg border border-line bg-paper p-5 hover:border-petroleum">
          {body}
        </Link>
      </Reveal>
    );
  }

  return (
    <Reveal as="article" className="rounded-lg border border-line bg-paper p-5">
      {body}
    </Reveal>
  );
}
