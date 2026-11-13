import type { Metadata } from "next";
import { Barlow, Montserrat } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UtmCapture } from "@/components/utm-capture";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  company,
  companyRif,
  contactAddress,
  contactEmail,
  phoneDisplay,
  siteUrl,
  whatsappNumber,
} from "@/lib/site";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
});

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const pixelTestCode = process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE?.trim() ?? "";
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
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
    images: [{ url: "/images/hero.webp", width: 1600, height: 900, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: company.name,
    description: company.description,
    images: ["/images/hero.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const phone = phoneDisplay();
  const email = contactEmail();
  const address = contactAddress();
  const rif = companyRif();
  const wa = whatsappNumber();
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    description: company.description,
    url: base,
    areaServed: company.region,
    ...(rif ? { taxID: rif } : {}),
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
      className={`${barlow.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        <UtmCapture />
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFloat />
        <CookieBanner />
        <Analytics gaId={gaId} pixelId={pixelId} pixelTestCode={pixelTestCode} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </body>
    </html>
  );
}
