import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UtmCapture } from "@/components/utm-capture";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { company, contactAddress, contactEmail, phoneDisplay, siteUrl, whatsappNumber } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
});

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const pixelOk = /^\d{5,20}$/.test(pixelId);
const gaOk = /^G-[A-Z0-9]+$/.test(gaId);
const base = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${company.name} · Equipos, suministros y soporte operacional`,
    template: `%s · ${company.name}`,
  },
  description: company.description,
  openGraph: {
    locale: "es_VE",
    siteName: company.name,
    type: "website",
    url: base,
    images: [{ url: "/images/hero.jpg", width: 1600, height: 900, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: company.name,
    description: company.description,
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const phone = phoneDisplay();
  const email = contactEmail();
  const address = contactAddress();
  const wa = whatsappNumber();
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    description: company.description,
    url: base,
    areaServed: company.region,
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(address ? { address: { "@type": "PostalAddress", streetAddress: address } } : {}),
    ...(wa
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: `+${wa}`,
            availableLanguage: ["Spanish"],
          },
        }
      : {}),
  };

  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        <UtmCapture />
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        {gaOk ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
        {pixelOk ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
