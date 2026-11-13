import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";
import { company, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${company.name} · Alquiler, suministros y soporte en el oriente`,
  },
  description: `${company.name}: alquiler de maquinaria, suministros, EPP, venta de equipos y servicios en sitio para la industria energética y petrolera en el oriente del país.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${company.name} · Soluciones para la operación`,
    description: company.description,
    url: siteUrl(),
    images: [{ url: "/images/hero.webp", width: 1600, height: 900, alt: company.name }],
  },
};

export default function Home() {
  return <HomeView />;
}
