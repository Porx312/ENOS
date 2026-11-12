import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Equipos, suministros y soporte operacional",
  description: `${company.name}: alquiler de maquinaria, suministros, EPP, venta de equipos y servicios en sitio para la industria energética y petrolera.`,
  openGraph: {
    title: `${company.name} · Soluciones para la operación`,
    description: company.description,
    images: [{ url: "/images/hero.png" }],
  },
};

export default function Home() {
  return <HomeView />;
}
