"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { MetaPixel } from "@/components/meta-pixel";
import { hasAnalyticsConsent, type CookieConsent } from "@/lib/consent";

type Props = {
  gaId: string;
  pixelId: string;
  pixelTestCode?: string;
};

/**
 * Carga GA4 y Meta Pixel solo tras consentimiento explícito.
 */
export function Analytics({ gaId, pixelId, pixelTestCode = "" }: Props) {
  const [allowed, setAllowed] = useState(false);
  const gaOk = /^G-[A-Z0-9]+$/.test(gaId);
  const pixelOk = /^\d{5,20}$/.test(pixelId);

  useEffect(() => {
    function sync() {
      setAllowed(hasAnalyticsConsent());
    }
    sync();
    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsent>).detail;
      setAllowed(detail === "accepted");
    };
    window.addEventListener("enos-consent", onConsent);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("enos-consent", onConsent);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!allowed) return null;

  return (
    <>
      {gaOk ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {pixelOk ? <MetaPixel pixelId={pixelId} testEventCode={pixelTestCode} /> : null}
    </>
  );
}
