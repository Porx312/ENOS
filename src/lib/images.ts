export const images = {
  hero: {
    src: "/images/hero.webp",
    alt: "Excavadora, bomba petrolera, pala cargadora y grúa móvil",
  },
  about: {
    src: "/images/about-v2.webp",
    alt: "Operario en sitio con maquinaria industrial",
  },
  alquiler: {
    src: "/images/service-alquiler-v2.webp",
    alt: "Excavadora amarilla en obra para alquiler",
  },
  venta: {
    src: "/images/salles.webp",
    alt: "Grúa, excavadora y camión para venta de equipos industriales",
  },
  suministros: {
    src: "/images/service-suministros-v2.jpg",
    alt: "Almacén de repuestos y suministros industriales",
  },
  epp: {
    src: "/images/service-epp-v2.jpg",
    alt: "Equipos de protección personal industriales",
  },
  servicios: {
    src: "/images/service-campo-v2.jpg",
    alt: "Técnico en sitio revisando instalaciones",
  },
  vacuum: {
    src: "/images/product-vacuum-v2.jpg",
    alt: "Camión vacuum cisterna en campo",
  },
  gruas: {
    src: "/images/product-gruas-v2.jpg",
    alt: "Grúa torre amarilla en obra",
  },
  soldadura: {
    src: "/images/product-soldadura-v2.jpg",
    alt: "Equipo de soldadura industrial en uso",
  },
  transporte: {
    src: "/images/product-transporte-v2.jpg",
    alt: "Transporte de contenedores e importación",
  },
  calzado: {
    src: "/images/product-calzado-v2.jpg",
    alt: "Botas de seguridad industrial",
  },
  gases: {
    src: "/images/product-gases-v2.jpg",
    alt: "Detector de gases y válvulas industriales",
  },
} as const;

export type ImageKey = keyof typeof images;
