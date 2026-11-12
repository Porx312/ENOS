"use client";

import dynamic from "next/dynamic";
import { company } from "@/lib/site";
import { Reveal } from "@/components/reveal";

const CoverageMapInner = dynamic(
  () => import("@/components/coverage-map-inner").then((m) => m.CoverageMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[280px] items-center justify-center bg-mist text-sm text-muted sm:h-[340px] lg:h-[380px]">
        Cargando mapa…
      </div>
    ),
  },
);

const zones = [
  "Anzoátegui",
  "Monagas",
  "Sucre",
  "Nueva Esparta",
  "Delta Amacuro",
  "Bolívar (oriente)",
];

/** Sección de cobertura con mapa real (OpenStreetMap). */
export function CoverageMap() {
  return (
    <section className="surface-grid">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">Cobertura</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-petroleum uppercase sm:text-4xl">
            Zona que cubrimos
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Nuestro foco es el <span className="font-bold text-petroleum">{company.region}</span>: industria
            energética, petrolera e industrial. Si su operación está en otra zona, indíquelo en la cotización y
            confirmamos si podemos atenderla.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {zones.map((zone) => (
              <li key={zone} className="border border-line bg-paper px-3 py-2 text-sm font-bold text-petroleum">
                {zone}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">
            Otras regiones se evalúan caso a caso según el alcance y la logística.
          </p>
        </Reveal>

        <Reveal className="relative w-full">
          <div className="overflow-hidden border border-line border-t-4 border-t-orange bg-paper">
            <CoverageMapInner />
            <div className="flex flex-wrap items-center gap-4 border-t border-line px-4 py-3 text-xs font-bold tracking-wide text-petroleum uppercase">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 bg-orange" aria-hidden="true" />
                Oriente · zona de foco
              </span>
              <span className="font-medium tracking-normal text-muted normal-case">
                Mapa © OpenStreetMap
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
