import { NextResponse } from "next/server";
import { Resend } from "resend";
import { UTM_KEYS } from "@/lib/campaign";
import { getLanding } from "@/lib/landings";
import { departmentEmail, getRequestType, requestTypes } from "@/lib/requests";

const SHORT = 200;
const LONG = 2000;

function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "La solicitud no es válida." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "La solicitud no es válida." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  if (text(data.company_website, SHORT)) {
    return NextResponse.json({ ok: true });
  }

  const tipo = text(data.tipo, 40);
  if (!requestTypes.some((item) => item.id === tipo)) {
    return NextResponse.json({ error: "Seleccione el tipo de solicitud." }, { status: 400 });
  }

  const requestType = getRequestType(tipo);
  const line = text(data.line, 120) || requestType.label;
  const path = text(data.path, 80).replace(/^\//, "");
  const landing = path ? getLanding(path) : undefined;

  const nombre = text(data.nombre, SHORT);
  const empresa = text(data.empresa, SHORT);
  const correo = text(data.correo, SHORT);
  const telefono = text(data.telefono, 40);
  const producto = text(data.producto, SHORT);
  const descripcion = text(data.descripcion, LONG);
  const department = text(data.department, SHORT) || requestType.department;

  if (!nombre || !empresa || !correo || !telefono || !descripcion) {
    return NextResponse.json({ error: "Complete los datos de contacto." }, { status: 400 });
  }
  if (telefono.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ error: "Indique un teléfono válido." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return NextResponse.json({ error: "Indique un correo válido." }, { status: 400 });
  }
  if (descripcion.length < 20) {
    return NextResponse.json({ error: "Describa la necesidad con más detalle." }, { status: 400 });
  }

  const rawExtras =
    data.extras && typeof data.extras === "object" ? (data.extras as Record<string, unknown>) : {};
  const extras: [string, string][] = [];

  if (landing) {
    for (const field of landing.fields) {
      const value =
        field.type === "hidden"
          ? (field.value ?? "")
          : text(rawExtras[field.name], field.type === "textarea" ? LONG : SHORT);

      if (field.required && !value) {
        return NextResponse.json({ error: `Falta ${field.label.toLowerCase()}.` }, { status: 400 });
      }
      if (field.type === "select" && value && field.options && !field.options.includes(value)) {
        return NextResponse.json({ error: `Seleccione ${field.label.toLowerCase()}.` }, { status: 400 });
      }
      if (value) extras.push([field.label, value]);
    }
  } else {
    for (const [key, value] of Object.entries(rawExtras)) {
      const textValue = text(value, LONG);
      if (textValue) extras.push([key, textValue]);
    }
  }

  const rawUtm = data.utm && typeof data.utm === "object" ? (data.utm as Record<string, unknown>) : {};
  const utm = UTM_KEYS.flatMap((key) => {
    const value = text(rawUtm[key], 120);
    return value ? [[key, value] as const] : [];
  });

  const message = [
    `Departamento: ${department}`,
    `Tipo: ${requestType.label}`,
    `Línea: ${line}`,
    path ? `Página: /${path}` : "Página: /",
    `Nombre: ${nombre}`,
    `Empresa: ${empresa}`,
    `Correo: ${correo}`,
    `Teléfono: ${telefono}`,
    producto ? `Producto: ${producto}` : "",
    `Necesidad: ${descripcion}`,
    ...extras.map(([label, value]) => `${label}: ${value}`),
    ...utm.map(([key, value]) => `${key}: ${value}`),
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = departmentEmail(tipo);
  const from = process.env.RESEND_FROM;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`Lead recibido sin correo configurado:\n${message}`);
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json(
      { error: "El correo comercial no está configurado. Escríbanos por WhatsApp." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: correo,
    subject: `Cotización · ${department} · ${empresa}`,
    text: message,
  });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No pudimos enviar la solicitud. Escríbanos por WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
