import type { Metadata } from "next";
import {
  commercialSla,
  company,
  companyRif,
  contactAddress,
  contactEmail,
  phoneDisplay,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: `Tratamiento de datos personales, cookies y medición en ${company.name}.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const email = contactEmail();
  const phone = phoneDisplay();
  const address = contactAddress();
  const rif = companyRif();
  const rightsContact = email ? (
    <>
      {" "}
      (
      <a href={`mailto:${email}`} className="font-bold text-petroleum hover:text-orange">
        {email}
      </a>
      )
    </>
  ) : phone ? (
    <> o llamando al {phone}</>
  ) : (
    <> o contactándonos por el WhatsApp comercial publicado en el sitio</>
  );

  return (
    <main className="surface-grid">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-petroleum uppercase">
          Aviso de privacidad
        </h1>
        <div className="mt-8 space-y-5 border border-line border-t-4 border-t-orange bg-paper p-6 text-sm leading-7 text-muted sm:p-8">
          <p>
            {company.legalName}
            {rif ? <> (RIF {rif})</> : null} trata los datos que usted envía en el formulario de cotización con la
            finalidad de responder a su solicitud comercial, preparar una oferta y contactarle por teléfono, correo o
            WhatsApp. {commercialSla}
          </p>

          {(address || rif) && (
            <p>
              {address ? <>Domicilio / dirección comercial: {address}. </> : null}
              {rif ? <>Identificación fiscal (RIF): {rif}.</> : null}
            </p>
          )}

          <p>
            Los datos solicitados son nombre, empresa, correo, teléfono, tipo de solicitud, ubicación o zona de la
            operación y la descripción de la necesidad, además de los campos técnicos que cada línea de servicio
            requiera. No se utilizan para publicidad comercial no solicitada.
          </p>
          <p>
            La base del tratamiento es la gestión de una solicitud precontractual iniciada por usted. Conservamos la
            información el tiempo necesario para atender la cotización y las obligaciones comerciales aplicables. Los
            leads pueden registrarse en herramientas de gestión comercial (por ejemplo HubSpot) y notificarse por correo
            interno para dar seguimiento.
          </p>

          <h2 className="font-display text-lg font-extrabold tracking-tight text-petroleum uppercase">
            Cookies y medición
          </h2>
          <p>
            Si usted acepta el banner de cookies, el sitio puede cargar Google Analytics 4 y Meta Pixel para medir
            visitas a landings, clics a WhatsApp y envíos de cotización (`generate_lead` / evento Lead). Puede rechazar
            estas cookies; en ese caso no se cargan los scripts de medición y el formulario sigue disponible.
          </p>
          <p>
            Las cookies de medición son opcionales. Las estrictamente necesarias para el funcionamiento del sitio (por
            ejemplo, preferencia de consentimiento y parámetros UTM de sesión para atribuir la solicitud) pueden
            almacenarse en el navegador.
          </p>

          <p>
            Puede solicitar acceso, rectificación o eliminación de sus datos escribiendo al correo comercial
            {rightsContact}. También puede cambiar su preferencia de cookies borrando el almacenamiento local del sitio
            o contactándonos por los mismos canales.
          </p>

          {!rif || !address ? (
            <p>
              {!rif && !address
                ? "Si faltan RIF o domicilio en este aviso, configúrelos en las variables de entorno de producción (NEXT_PUBLIC_RIF, NEXT_PUBLIC_ADDRESS)."
                : !rif
                  ? "El RIF se mostrará aquí cuando se configure NEXT_PUBLIC_RIF en producción."
                  : "El domicilio se mostrará aquí cuando se configure NEXT_PUBLIC_ADDRESS en producción."}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
