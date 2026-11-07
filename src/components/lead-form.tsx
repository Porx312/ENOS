"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, X } from "lucide-react";
import { LEAD_PENDING_KEY, QUOTE_MESSAGE_KEY, readUtm, track } from "@/lib/campaign";
import type { ExtraField } from "@/lib/landings";
import { getRequestType, requestTypes, type RequestTypeId } from "@/lib/requests";
import { whatsappHref } from "@/lib/site";
import { WhatsAppLink } from "@/components/whatsapp-link";

const inputClass =
  "mt-1 w-full rounded-md border border-line bg-paper px-3 py-3 text-base text-ink outline-none focus:border-petroleum";
const errorClass = "border-orange";

type Props = {
  id?: string;
  title?: string;
  fixedType?: RequestTypeId;
  extraFields?: ExtraField[];
  lineLabel?: string;
  whatsappIntro?: string;
};

type Errors = Partial<Record<string, string>>;

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function LeadForm({
  id = "contacto",
  title = "Solicitar cotización",
  fixedType,
  extraFields = [],
  lineLabel = "Cotización general",
  whatsappIntro = "Hola, quiero cotizar con Energía Nuevo Oriente.",
}: Props) {
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [tipo, setTipo] = useState<RequestTypeId>(fixedType ?? "otra");
  const [producto, setProducto] = useState("");

  useEffect(() => {
    if (fixedType) {
      setTipo(fixedType);
      return;
    }
    const fromUrl = searchParams.get("tipo");
    if (fromUrl && requestTypes.some((item) => item.id === fromUrl)) {
      setTipo(fromUrl as RequestTypeId);
    }
    const product = searchParams.get("producto")?.trim();
    if (product) setProducto(product.slice(0, 160));
  }, [fixedType, searchParams]);

  const request = useMemo(() => getRequestType(tipo), [tipo]);

  function validate(form: FormData): Errors {
    const next: Errors = {};
    const nombre = String(form.get("nombre") ?? "").trim();
    const empresa = String(form.get("empresa") ?? "").trim();
    const correo = String(form.get("correo") ?? "").trim();
    const telefono = String(form.get("telefono") ?? "").trim();
    const descripcion = String(form.get("descripcion") ?? "").trim();

    if (!nombre) next.nombre = "Indique su nombre completo.";
    if (!empresa) next.empresa = "Indique la empresa.";
    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) next.correo = "Indique un correo válido.";
    if (digits(telefono).length < 9) next.telefono = "Indique un teléfono válido.";
    if (!fixedType && !requestTypes.some((item) => item.id === String(form.get("tipo")))) {
      next.tipo = "Seleccione el tipo de solicitud.";
    }
    if (descripcion.length < 20) next.descripcion = "Describa la necesidad con al menos 20 caracteres.";

    for (const field of extraFields) {
      if (field.type === "hidden") continue;
      const value = String(form.get(field.name) ?? "").trim();
      if (field.required && !value) next[field.name] = `Indique ${field.label.toLowerCase()}.`;
      if (field.type === "select" && value && field.options && !field.options.includes(value)) {
        next[field.name] = `Seleccione ${field.label.toLowerCase()}.`;
      }
    }
    return next;
  }

  function onBlur(event: React.FocusEvent<HTMLFormElement>) {
    const target = event.target;
    if (
      !(target instanceof HTMLInputElement) &&
      !(target instanceof HTMLTextAreaElement) &&
      !(target instanceof HTMLSelectElement)
    ) {
      return;
    }
    if (!target.name) return;
    const next = validate(new FormData(event.currentTarget));
    setErrors((prev) => ({ ...prev, [target.name]: next[target.name] }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const selectedTipo = (fixedType ?? String(data.get("tipo"))) as RequestTypeId;
    const selected = getRequestType(selectedTipo);
    const extras: Record<string, string> = {};
    const lines = [
      whatsappIntro,
      "",
      `Departamento: ${selected.department}`,
      `Tipo: ${selected.label}`,
      `Nombre: ${String(data.get("nombre")).trim()}`,
      `Empresa: ${String(data.get("empresa")).trim()}`,
      `Correo: ${String(data.get("correo")).trim()}`,
      `Teléfono: ${String(data.get("telefono")).trim()}`,
    ];
    if (producto) lines.push(`Producto: ${producto}`);
    for (const field of extraFields) {
      const value =
        field.type === "hidden" ? (field.value ?? "") : String(data.get(field.name) ?? "").trim();
      extras[field.name] = value;
      if (value) lines.push(`${field.label}: ${value}`);
    }
    lines.push(`Necesidad: ${String(data.get("descripcion")).trim()}`);
    const campaign = readUtm().utm_campaign;
    if (campaign) lines.push(`Campaña: ${campaign}`);

    const composed = lines.join("\n");
    const href = whatsappHref(composed);
    if (!href) {
      setErrors({ form: "Falta el número de WhatsApp comercial." });
      return;
    }

    setPending(true);
    sessionStorage.setItem(QUOTE_MESSAGE_KEY, composed);
    sessionStorage.setItem(LEAD_PENDING_KEY, lineLabel);
    track("whatsapp_click", lineLabel);
    track("generate_lead", lineLabel);

    void fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        line: lineLabel,
        path: typeof window !== "undefined" ? window.location.pathname : "/",
        tipo: selectedTipo,
        department: selected.department,
        nombre: data.get("nombre"),
        empresa: data.get("empresa"),
        correo: data.get("correo"),
        telefono: data.get("telefono"),
        producto,
        descripcion: data.get("descripcion"),
        extras,
        utm: readUtm(),
        company_website: data.get("company_website"),
      }),
    });

    setMessage(composed);
    setDone(true);
    window.open(href, "_blank", "noopener,noreferrer");
    setPending(false);
  }

  if (done) {
    return (
      <div id={id} className="rounded-lg border border-line bg-paper p-6 text-ink shadow-sm">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-6 w-6 text-orange" />
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-petroleum">
              Recibimos su solicitud
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              El departamento de {request.department} revisará los datos. Si WhatsApp no se abrió, use el botón
              siguiente para enviar el mensaje con la información ya escrita.
            </p>
            <WhatsAppLink
              message={message}
              line={lineLabel}
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-md bg-whatsapp px-5 font-semibold text-petroleum transition hover:bg-whatsapp-hover"
            >
              Abrir WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      onBlur={onBlur}
      className="relative rounded-lg border border-line bg-paper p-5 text-ink shadow-sm sm:p-6"
      noValidate
    >
      <h2 className="font-display text-3xl font-semibold tracking-tight text-petroleum">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Complete los datos. La solicitud se envía al departamento correspondiente y se abre WhatsApp con el resumen.
      </p>
      {errors.form ? (
        <p className="mt-4 rounded-md bg-mist px-3 py-2 text-sm text-ink" role="alert">
          {errors.form}
        </p>
      ) : null}

      {producto || fixedType ? (
        <div className="mt-5 rounded-md border border-line bg-mist px-4 py-3">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">Consulta seleccionada</p>
          <div className="mt-2 flex items-start gap-3">
            <Package className="mt-0.5 h-5 w-5 shrink-0 text-orange" strokeWidth={1.75} />
            <div className="min-w-0 flex-1">
              {producto ? (
                <>
                  <p className="font-semibold text-petroleum">{producto}</p>
                  <p className="mt-0.5 text-sm text-muted">{request.label}</p>
                </>
              ) : (
                <p className="font-semibold text-petroleum">{request.label}</p>
              )}
            </div>
            {producto && !fixedType ? (
              <button
                type="button"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted hover:bg-paper hover:text-petroleum"
                aria-label="Quitar producto seleccionado"
                onClick={() => setProducto("")}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          {producto ? <input type="hidden" name="producto" value={producto} /> : null}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          id={id}
          name="nombre"
          label="Nombre completo"
          required
          autoComplete="name"
          error={errors.nombre}
        />
        <Field
          id={id}
          name="empresa"
          label="Empresa"
          required
          autoComplete="organization"
          error={errors.empresa}
        />
        <Field
          id={id}
          name="correo"
          label="Correo electrónico"
          required
          type="email"
          autoComplete="email"
          error={errors.correo}
        />
        <Field
          id={id}
          name="telefono"
          label="Teléfono"
          required
          autoComplete="tel"
          inputMode="tel"
          error={errors.telefono}
        />

        {fixedType ? (
          <input type="hidden" name="tipo" value={fixedType} />
        ) : (
          <label className="block text-sm font-semibold sm:col-span-2">
            Tipo de solicitud
            <select
              className={`${inputClass} ${errors.tipo ? errorClass : ""}`}
              name="tipo"
              required
              value={tipo}
              onChange={(event) => setTipo(event.target.value as RequestTypeId)}
              aria-invalid={Boolean(errors.tipo)}
            >
              {requestTypes.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.tipo ? <span className="mt-1 block text-xs text-orange">{errors.tipo}</span> : null}
          </label>
        )}

        {extraFields.map((field) => (
          <ExtraFieldInput key={field.name} id={id} field={field} error={errors[field.name]} />
        ))}

        <label className="block text-sm font-semibold sm:col-span-2">
          Descripción de la necesidad
          <textarea
            id={`${id}-descripcion`}
            className={`${inputClass} ${errors.descripcion ? errorClass : ""}`}
            name="descripcion"
            required
            rows={4}
            placeholder={
              producto
                ? `Necesito cotizar: ${producto}. Indique cantidad, sitio y urgencia.`
                : "Indique equipo, suministro o servicio, cantidad, sitio y urgencia."
            }
            aria-invalid={Boolean(errors.descripcion)}
          />
          {errors.descripcion ? (
            <span className="mt-1 block text-xs text-orange">{errors.descripcion}</span>
          ) : null}
        </label>
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Sitio web
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-orange px-5 font-semibold text-petroleum transition hover:bg-orange-hover disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar solicitud"}
      </button>
      <p className="mt-3 text-xs leading-5 text-muted">
        Al enviar acepta el tratamiento de sus datos para cotizar esta solicitud, según el aviso de privacidad.
      </p>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  className = "",
  type = "text",
  error,
  ...props
}: {
  id: string;
  name: string;
  label: string;
  className?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "tel" | "text" | "email";
  error?: string;
}) {
  return (
    <label className={`block text-sm font-semibold ${className}`}>
      {label}
      <input
        id={`${id}-${name}`}
        className={`${inputClass} ${error ? errorClass : ""}`}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-orange">{error}</span> : null}
    </label>
  );
}

function ExtraFieldInput({
  id,
  field,
  error,
}: {
  id: string;
  field: ExtraField;
  error?: string;
}) {
  if (field.type === "hidden") {
    return <input type="hidden" name={field.name} value={field.value ?? ""} />;
  }

  const wide = field.type === "textarea";

  return (
    <label className={`block text-sm font-semibold ${wide ? "sm:col-span-2" : ""}`}>
      {field.label}
      {field.type === "textarea" ? (
        <textarea
          id={`${id}-${field.name}`}
          className={`${inputClass} ${error ? errorClass : ""}`}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          rows={4}
          aria-invalid={Boolean(error)}
        />
      ) : field.type === "select" ? (
        <select
          id={`${id}-${field.name}`}
          className={`${inputClass} ${error ? errorClass : ""}`}
          name={field.name}
          required={field.required}
          defaultValue=""
          aria-invalid={Boolean(error)}
        >
          <option value="" disabled>
            Seleccione
          </option>
          {field.options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          id={`${id}-${field.name}`}
          className={`${inputClass} ${error ? errorClass : ""}`}
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          aria-invalid={Boolean(error)}
        />
      )}
      {error ? <span className="mt-1 block text-xs text-orange">{error}</span> : null}
    </label>
  );
}
