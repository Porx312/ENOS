"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, writeConsent, type CookieConsent } from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  function choose(value: CookieConsent) {
    writeConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-paper/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl text-sm leading-6 text-muted">
          <p className="font-display text-base font-extrabold tracking-tight text-petroleum uppercase">
            Cookies y medición
          </p>
          <p className="mt-1">
            Usamos cookies propias y de terceros (Google Analytics y Meta Pixel) para medir visitas y conversiones de
            cotización cuando usted lo acepta. Puede rechazarlas; el sitio y el formulario siguen funcionando. Más
            detalle en el{" "}
            <Link href="/privacidad" className="font-bold text-petroleum underline-offset-2 hover:text-orange hover:underline">
              aviso de privacidad
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button type="button" className="btn-ghost min-h-11 px-4 text-sm" onClick={() => choose("rejected")}>
            Rechazar
          </button>
          <button type="button" className="btn-primary min-h-11 px-4 text-sm" onClick={() => choose("accepted")}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
