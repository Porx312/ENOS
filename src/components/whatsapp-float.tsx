"use client";

import { MessageCircle } from "lucide-react";
import { track, withCampaign } from "@/lib/campaign";
import { whatsappHref } from "@/lib/site";

export function WhatsAppFloat() {
  const href = whatsappHref("Hola, quiero cotizar con Energía Nuevo Oriente.");
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition hover:bg-whatsapp-hover"
      onClick={(event) => {
        const next = whatsappHref(withCampaign("Hola, quiero cotizar con Energía Nuevo Oriente."));
        if (!next) {
          event.preventDefault();
          return;
        }
        event.currentTarget.href = next;
        track("whatsapp_click", "Flotante");
      }}
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}
