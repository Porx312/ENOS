export const requestTypes = [
  {
    id: "alquiler",
    label: "Alquiler de maquinaria",
    department: "Alquiler",
    emailEnv: "LEAD_EMAIL_ALQUILER",
  },
  {
    id: "repuestos",
    label: "Compra de repuestos",
    department: "Procura y suministros",
    emailEnv: "LEAD_EMAIL_SUMINISTROS",
  },
  {
    id: "epp",
    label: "Equipos de protección personal",
    department: "HSE/EPP",
    emailEnv: "LEAD_EMAIL_EPP",
  },
  {
    id: "equipos",
    label: "Compra de equipos",
    department: "Venta de equipos",
    emailEnv: "LEAD_EMAIL_EQUIPOS",
  },
  {
    id: "importacion",
    label: "Importación por encargo",
    department: "Importación",
    emailEnv: "LEAD_EMAIL_IMPORTACION",
  },
  {
    id: "servicios",
    label: "Servicios en sitio",
    department: "Servicios",
    emailEnv: "LEAD_EMAIL_SERVICIOS",
  },
  {
    id: "otra",
    label: "Otra consulta",
    department: "General",
    emailEnv: "LEAD_TO_EMAIL",
  },
] as const;

export type RequestTypeId = (typeof requestTypes)[number]["id"];

export function getRequestType(id: string | null | undefined) {
  return requestTypes.find((item) => item.id === id) ?? requestTypes[requestTypes.length - 1];
}

export function departmentEmail(typeId: string) {
  const type = getRequestType(typeId);
  const specific = process.env[type.emailEnv]?.trim();
  return specific || process.env.LEAD_TO_EMAIL?.trim() || "";
}
