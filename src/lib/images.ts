export const images = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Instalación energética e industrial al atardecer",
  },
  about: {
    src: "/images/about.jpg",
    alt: "Infraestructura industrial y energética",
  },
  alquiler: {
    src: "/images/service-alquiler.jpg",
    alt: "Maquinaria pesada en operación industrial",
  },
  suministros: {
    src: "/images/service-suministros.jpg",
    alt: "Suministros y componentes industriales",
  },
  epp: {
    src: "/images/service-epp.jpg",
    alt: "Trabajadores con equipos de protección personal",
  },
  servicios: {
    src: "/images/service-campo.jpg",
    alt: "Soporte técnico en instalaciones industriales",
  },
  vacuum: {
    src: "/images/product-vacuum.jpg",
    alt: "Camión industrial para operaciones de campo",
  },
  gruas: {
    src: "/images/product-gruas.jpg",
    alt: "Grúa industrial en izaje de carga",
  },
  soldadura: {
    src: "/images/product-soldadura.jpg",
    alt: "Trabajo de soldadura industrial",
  },
  transporte: {
    src: "/images/product-transporte.jpg",
    alt: "Transporte y logística de campo",
  },
  calzado: {
    src: "/images/product-calzado.jpg",
    alt: "Calzado y protección industrial",
  },
  gases: {
    src: "/images/product-gases.jpg",
    alt: "Equipos de detección y seguridad industrial",
  },
} as const;

export type ImageKey = keyof typeof images;
