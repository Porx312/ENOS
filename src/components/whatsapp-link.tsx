"use client";

import { track, withCampaign } from "@/lib/campaign";
import { whatsappHref } from "@/lib/site";

type Props = {
  message: string;
  line: string;
  children: React.ReactNode;
  className?: string;
};

export function WhatsAppLink({ message, line, children, className }: Props) {
  const href = whatsappHref(message);

  if (!href) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        const next = whatsappHref(withCampaign(message));
        if (!next) {
          event.preventDefault();
          return;
        }
        event.currentTarget.href = next;
        track("whatsapp_click", line);
      }}
    >
      {children}
    </a>
  );
}
