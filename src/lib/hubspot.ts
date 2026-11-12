type HubSpotLead = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  line: string;
  tipoLabel: string;
  department: string;
  path: string;
  producto: string;
  descripcion: string;
  extras: Array<readonly [string, string] | [string, string]>;
  utm: Array<readonly [string, string] | [string, string]>;
  message: string;
};

export type HubSpotResult = {
  ok: boolean;
  contactId?: string;
  dealId?: string;
  error?: string;
};

const API = "https://api.hubapi.com";

function token() {
  return process.env.HUBSPOT_ACCESS_TOKEN?.trim() ?? "";
}

function splitName(nombre: string) {
  const parts = nombre.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstname: "Contacto", lastname: "" };
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

async function hubFetch(path: string, init?: RequestInit) {
  const accessToken = token();
  if (!accessToken) {
    return { ok: false as const, status: 0, data: null, skipped: true as const };
  }

  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const data = (await response.json().catch(() => null)) as Record<string, unknown> | null;
  return { ok: response.ok, status: response.status, data, skipped: false as const };
}

function hubErrorMessage(label: string, status: number, data: Record<string, unknown> | null) {
  const detail =
    data && typeof data.message === "string"
      ? data.message
      : data
        ? JSON.stringify(data).slice(0, 300)
        : "";
  return detail ? `${label} (${status}): ${detail}` : `${label} (${status}).`;
}

async function searchObjectId(
  objectType: "contacts" | "companies",
  propertyName: string,
  value: string,
) {
  const result = await hubFetch(`/crm/v3/objects/${objectType}/search`, {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [{ propertyName, operator: "EQ", value }],
        },
      ],
      properties: [propertyName],
      limit: 1,
    }),
  });

  if (result.skipped || !result.ok || !result.data) return null;
  const results = result.data.results;
  if (!Array.isArray(results) || results.length === 0) return null;
  const first = results[0] as { id?: string };
  return first.id ?? null;
}

async function associate(
  fromType: string,
  fromId: string,
  toType: string,
  toId: string,
  associationTypeId: number,
) {
  return hubFetch(`/crm/v4/objects/${fromType}/${fromId}/associations/${toType}/${toId}`, {
    method: "PUT",
    body: JSON.stringify([
      {
        associationCategory: "HUBSPOT_DEFINED",
        associationTypeId,
      },
    ]),
  });
}

/** Crea o reutiliza la Company y la asocia como Primary al contacto (y al deal si hay). */
async function upsertCompany(name: string) {
  const trimmed = name.trim().slice(0, 100);
  if (!trimmed) return null;

  const existingId = await searchObjectId("companies", "name", trimmed);
  if (existingId) return existingId;

  const created = await hubFetch("/crm/v3/objects/companies", {
    method: "POST",
    body: JSON.stringify({ properties: { name: trimmed } }),
  });
  if (!created.ok || !created.data?.id) {
    console.error(
      "HubSpot: no se pudo crear la company",
      created.status,
      created.data,
      "(¿falta scope crm.objects.companies.write?)",
    );
    return null;
  }
  return String(created.data.id);
}

async function upsertContact(lead: HubSpotLead) {
  const { firstname, lastname } = splitName(lead.nombre);
  const properties: Record<string, string> = {
    email: lead.correo,
    firstname,
    phone: lead.telefono,
    // Texto "Company Name" en el contacto (aparte de la Company asociada).
    company: lead.empresa,
    lifecyclestage: "lead",
  };
  if (lastname) properties.lastname = lastname;

  const existingId = await searchObjectId("contacts", "email", lead.correo);
  if (existingId) {
    const updated = await hubFetch(`/crm/v3/objects/contacts/${existingId}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
    if (!updated.ok) {
      throw new Error(hubErrorMessage("No se pudo actualizar el contacto en HubSpot", updated.status, updated.data));
    }
    return existingId;
  }

  const created = await hubFetch("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });
  if (!created.ok || !created.data?.id) {
    throw new Error(hubErrorMessage("No se pudo crear el contacto en HubSpot", created.status, created.data));
  }
  return String(created.data.id);
}

function dealDescription(lead: HubSpotLead) {
  const lines = [
    `Línea: ${lead.line}`,
    `Tipo: ${lead.tipoLabel}`,
    `Departamento: ${lead.department}`,
    lead.path ? `Página: /${lead.path}` : "Página: /",
    lead.producto ? `Producto: ${lead.producto}` : "",
    `Necesidad: ${lead.descripcion}`,
    ...lead.extras.map(([label, value]) => `${label}: ${value}`),
    ...lead.utm.map(([key, value]) => `${key}: ${value}`),
  ].filter(Boolean);
  return lines.join("\n").slice(0, 65000);
}

async function createDeal(lead: HubSpotLead, contactId: string, companyId: string | null) {
  const dealname = `Cotización · ${lead.line} · ${lead.empresa}`.slice(0, 100);
  const created = await hubFetch("/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        dealname,
        pipeline: "default",
        dealstage: "appointmentscheduled",
        description: dealDescription(lead),
      },
    }),
  });

  if (!created.ok || !created.data?.id) {
    throw new Error(hubErrorMessage("No se pudo crear el deal en HubSpot", created.status, created.data));
  }

  const dealId = String(created.data.id);
  // 3 = deal → contact (primary)
  const associatedContact = await associate("deals", dealId, "contacts", contactId, 3);
  if (!associatedContact.ok) {
    console.error(
      "HubSpot: deal creado pero no asociado al contacto",
      associatedContact.status,
      associatedContact.data,
    );
  }

  if (companyId) {
    // 5 = deal → company (primary)
    const associatedCompany = await associate("deals", dealId, "companies", companyId, 5);
    if (!associatedCompany.ok) {
      console.error(
        "HubSpot: deal creado pero no asociado a la company",
        associatedCompany.status,
        associatedCompany.data,
      );
    }
  }

  return dealId;
}

async function createNote(lead: HubSpotLead, contactId: string, dealId: string) {
  const created = await hubFetch("/crm/v3/objects/notes", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_timestamp: String(Date.now()),
        hs_note_body: lead.message.slice(0, 65000),
      },
    }),
  });

  if (!created.ok || !created.data?.id) {
    console.error("HubSpot: no se pudo crear la nota", created.status, created.data);
    return;
  }

  const noteId = String(created.data.id);
  await Promise.all([
    hubFetch(`/crm/v4/objects/notes/${noteId}/associations/contacts/${contactId}`, {
      method: "PUT",
      body: JSON.stringify([
        { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 },
      ]),
    }),
    hubFetch(`/crm/v4/objects/notes/${noteId}/associations/deals/${dealId}`, {
      method: "PUT",
      body: JSON.stringify([
        { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 214 },
      ]),
    }),
  ]);
}

/** Upsert contacto + deal + nota. Si no hay token, no hace nada. Nunca lanza hacia el caller de negocio. */
export async function upsertHubSpotLead(lead: HubSpotLead): Promise<HubSpotResult> {
  if (!token()) {
    return { ok: false, error: "HUBSPOT_ACCESS_TOKEN no configurado" };
  }

  try {
    const contactId = await upsertContact(lead);
    const companyId = await upsertCompany(lead.empresa);
    if (companyId) {
      // 1 = contact → company (Primary) — es lo que muestra la UI de HubSpot como "Company"
      const linked = await associate("contacts", contactId, "companies", companyId, 1);
      if (!linked.ok) {
        console.error(
          "HubSpot: contacto sin company asociada",
          linked.status,
          linked.data,
        );
      }
    }
    const dealId = await createDeal(lead, contactId, companyId);
    await createNote(lead, contactId, dealId);
    return { ok: true, contactId, dealId };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido en HubSpot";
    console.error("HubSpot lead sync failed:", message);
    return { ok: false, error: message };
  }
}
