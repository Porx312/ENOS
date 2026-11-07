import { images } from "@/lib/images";
import type { RequestTypeId } from "@/lib/requests";

export const homeServices = [
  {
    title: "Alquiler de maquinaria",
    text: "Equipos y maquinaria para proyectos y operaciones industriales.",
    href: "/alquiler",
    tipo: "alquiler" as RequestTypeId,
    image: images.alquiler,
  },
  {
    title: "Repuestos y suministros",
    text: "Componentes, herramientas y suministros para el sector industrial y petrolero.",
    href: "/suministros",
    tipo: "repuestos" as RequestTypeId,
    image: images.suministros,
  },
  {
    title: "Equipos de protección personal",
    text: "EPP y soluciones de seguridad para trabajadores y operaciones.",
    href: "/epp",
    tipo: "epp" as RequestTypeId,
    image: images.epp,
  },
  {
    title: "Servicios en sitio",
    text: "Asistencia técnica y soporte especializado directamente en las instalaciones del cliente.",
    href: "/servicios",
    tipo: "servicios" as RequestTypeId,
    image: images.servicios,
  },
] as const;

export const differentiators = [
  {
    title: "Atención comercial personalizada",
    text: "Cada solicitud se revisa con el contexto de la operación y la urgencia del sitio.",
  },
  {
    title: "Soluciones integrales",
    text: "Alquiler, procura, EPP y soporte en campo desde un mismo interlocutor comercial.",
  },
  {
    title: "Suministros industriales",
    text: "Repuestos, consumibles y materiales, con procura internacional cuando hace falta.",
  },
  {
    title: "Soporte orientado a operaciones",
    text: "Prioridad HSE, entrega en sitio y coordinación para que el trabajo no se detenga.",
  },
] as const;

export const products = [
  {
    name: "Camiones vacuum y cisternas",
    text: "Manejo, transporte y disposición de efluentes e hidrocarburos.",
    tipo: "alquiler" as RequestTypeId,
    href: "/alquiler/vacuum-cisternas",
    image: images.vacuum,
  },
  {
    name: "Grúas industriales",
    text: "Izaje de carga pesada con operador certificado.",
    tipo: "alquiler" as RequestTypeId,
    href: "/alquiler/gruas",
    image: images.gruas,
  },
  {
    name: "Máquinas de soldar 300A–400A+",
    text: "Equipos de alta capacidad para tubería y estructura.",
    tipo: "alquiler" as RequestTypeId,
    href: "/alquiler/soldadura",
    image: images.soldadura,
  },
  {
    name: "Camionetas 4x4 y transporte",
    text: "Flota de carga y unidades de trabajo para operaciones de campo.",
    tipo: "alquiler" as RequestTypeId,
    href: "/alquiler/transporte",
    image: images.transporte,
  },
  {
    name: "Campamentos móviles",
    text: "Tráilers y campamentos para permanencia del personal en sitio.",
    tipo: "alquiler" as RequestTypeId,
    href: "/alquiler/transporte",
    image: images.transporte,
  },
  {
    name: "Indumentaria ignífuga",
    text: "Ropa de protección para frentes industriales y petroleros.",
    tipo: "epp" as RequestTypeId,
    href: "/epp",
    image: images.epp,
  },
  {
    name: "Calzado de seguridad",
    text: "Calzado industrial para dotación de personal.",
    tipo: "epp" as RequestTypeId,
    href: "/epp",
    image: images.calzado,
  },
  {
    name: "Detección de gases",
    text: "Equipos para monitoreo y prevención en operaciones de riesgo.",
    tipo: "epp" as RequestTypeId,
    href: "/epp",
    image: images.gases,
  },
  {
    name: "Líneas de vida",
    text: "Sistemas de protección contra caídas en altura.",
    tipo: "epp" as RequestTypeId,
    href: "/epp",
    image: images.gases,
  },
  {
    name: "Protección respiratoria",
    text: "Equipos de protección respiratoria, visual y auditiva.",
    tipo: "epp" as RequestTypeId,
    href: "/epp",
    image: images.epp,
  },
  {
    name: "Repuestos y consumibles",
    text: "Materiales para producción, mantenimiento y refinación.",
    tipo: "repuestos" as RequestTypeId,
    href: "/suministros",
    image: images.suministros,
  },
  {
    name: "Contingencias ambientales",
    text: "Insumos para prevención y atención de contingencias.",
    tipo: "epp" as RequestTypeId,
    href: "/epp",
    image: images.about,
  },
] as const;
