import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import { MetaPixel } from "@/components/meta-pixel";
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
const pixelTestCode = process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE?.trim() ?? "";
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
        {pixelOk ? <MetaPixel pixelId={pixelId} testEventCode={pixelTestCode} /> : null}
      </body>
    </html>
  );
}
