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
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-paper/95 px-4 py-3 shadow-[0_-6px_24px_rgba(0,0,0,0.08)] backdrop-blur-md sm:px-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-muted sm:text-sm sm:leading-6">
          <span className="font-bold text-petroleum">Cookies:</span> usamos Analytics y Meta Pixel solo si acepta, para
          medir cotizaciones.{" "}
          <Link href="/privacidad" className="font-bold text-petroleum underline-offset-2 hover:text-orange hover:underline">
            Privacidad
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="btn-ghost min-h-10 px-3 text-sm" onClick={() => choose("rejected")}>
            Rechazar
          </button>
          <button type="button" className="btn-primary min-h-10 px-3 text-sm" onClick={() => choose("accepted")}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
