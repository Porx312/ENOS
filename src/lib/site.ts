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

export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return "http://localhost:3000";
  try {
    return new URL(value).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export const navLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#productos", label: "Productos" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export const serviceLinks = [
  { href: "/alquiler", label: "Alquiler de maquinaria" },
  { href: "/suministros", label: "Repuestos y suministros" },
  { href: "/epp", label: "Equipos de protección personal" },
  { href: "/maquinaria", label: "Venta de equipos" },
  { href: "/servicios", label: "Servicios en sitio" },
] as const;
