import type { Metadata } from "next";
import { company, contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: `Tratamiento de datos personales en solicitudes de cotización de ${company.name}.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const email = contactEmail();

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold tracking-[0.16em] text-orange uppercase">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-petroleum">Aviso de privacidad</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-muted">
        <p>
          {company.legalName} trata los datos que usted envía en el formulario de cotización con la única finalidad de
          responder a su solicitud comercial, preparar una oferta y contactarle por teléfono, correo o WhatsApp.
        </p>
        <p>
          Los datos solicitados son nombre, empresa, correo, teléfono, tipo de solicitud y la descripción de la
          necesidad, además de los campos técnicos que cada línea de servicio requiera. No se utilizan para publicidad
          no solicitada.
        </p>
        <p>
          La base del tratamiento es la gestión de una solicitud precontractual iniciada por usted. Conservamos la
          información el tiempo necesario para atender la cotización y las obligaciones comerciales aplicables.
        </p>
        <p>
          Puede solicitar acceso, rectificación o eliminación de sus datos escribiendo al correo comercial configurado
          {email ? (
            <>
              {" "}
              (<a href={`mailto:${email}`} className="font-semibold text-petroleum hover:underline">{email}</a>)
            </>
          ) : (
            " en las variables de entorno del sitio"
          )}
          .
        </p>
        <p>
          Este aviso es genérico y debe completarse con el domicilio fiscal, el RIF y el responsable de protección de
          datos cuando la empresa los facilite.
        </p>
      </div>
    </main>
  );
}
