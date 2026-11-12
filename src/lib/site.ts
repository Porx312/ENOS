export const company = {
  name: "Energía Nuevo Oriente",
  legalName: "Energía Nuevo Oriente, S.A.",
  region: "Oriente del país",
  description:
    "Procura, alquiler de equipos y soporte operacional para la industria energética, petrolera e industrial.",
};

export function phoneDisplay() {
  return process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim() ?? "";
}

export function contactEmail() {
  return process.env.NEXT_PUBLIC_EMAIL?.trim() ?? "";
}

export function contactAddress() {
  return process.env.NEXT_PUBLIC_ADDRESS?.trim() ?? "";
}

export function socialLinks() {
  return [
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM?.trim() ?? "" },
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN?.trim() ?? "" },
    { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK?.trim() ?? "" },
  ].filter((item) => item.href);
}

export function whatsappNumber() {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
}

export function whatsappHref(message: string) {
  const number = whatsappNumber();
  const text = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${text}` : "";
}

function originFrom(value: string) {
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return new URL(withProtocol).origin;
  } catch {
    return "";
  }
}

export function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  const configuredOrigin = configured ? originFrom(configured) : "";
  const isLocal =
    !configuredOrigin ||
    configuredOrigin.includes("localhost") ||
    configuredOrigin.includes("127.0.0.1");

  if (configuredOrigin && !isLocal) return configuredOrigin;

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.NEXT_PUBLIC_VERCEL_URL?.trim() ||
    process.env.VERCEL_URL?.trim() ||
    "";
  const vercelOrigin = vercel ? originFrom(vercel) : "";
  if (vercelOrigin) return vercelOrigin;

  return configuredOrigin || "http://localhost:3000";
}

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const serviceLinks = [
  { href: "/alquiler", label: "Alquiler de maquinaria" },
  { href: "/suministros", label: "Repuestos y suministros" },
  { href: "/epp", label: "Equipos de protección personal" },
  { href: "/maquinaria", label: "Venta de equipos" },
  { href: "/importacion", label: "Importación por encargo" },
  { href: "/servicios", label: "Servicios en sitio" },
] as const;

export const alquilerSubLinks = [
  { href: "/alquiler/vacuum-cisternas", label: "Vacuum y cisternas" },
  { href: "/alquiler/gruas", label: "Grúas industriales" },
  { href: "/alquiler/soldadura", label: "Soldadura" },
  { href: "/alquiler/transporte", label: "Transporte y campamentos" },
] as const;
