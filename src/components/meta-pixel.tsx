"use client";

import Script from "next/script";

type Props = {
  pixelId: string;
  /** Solo para Events Manager → Test events. Quitar cuando termine la prueba. */
  testEventCode?: string;
};

/**
 * Snippet oficial de Meta Pixel, adaptado a Next.js Script.
 * Equivalente a:
 * fbq('init', pixelId); fbq('track', 'PageView');
 */
export function MetaPixel({ pixelId, testEventCode = "" }: Props) {
  if (!/^\d{5,20}$/.test(pixelId)) return null;

  const safeTest = testEventCode.replace(/'/g, "");
  const testLine = safeTest
    ? `fbq('init', '${pixelId}');
fbq('set', 'test_event_code', '${safeTest}');`
    : `fbq('init', '${pixelId}');`;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
${testLine}
fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
