import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import {
  company,
  companyRif,
  contactAddress,
  contactEmail,
  navLinks,
  phoneDisplay,
  serviceLinks,
  socialLinks,
  whatsappHref,
} from "@/lib/site";

export function SiteFooter() {
  const phone = phoneDisplay();
  const email = contactEmail();
  const address = contactAddress();
  const rif = companyRif();
  const social = socialLinks();
  const wa = whatsappHref("Hola, quiero cotizar con Energía Nuevo Oriente.");

  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="h-1.5 w-full bg-orange" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-10 shrink-0" />
            <p className="font-display text-lg font-extrabold tracking-tight uppercase">{company.legalName}</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{company.description}</p>
          {rif ? <p className="mt-3 text-sm font-bold text-petroleum">RIF {rif}</p> : null}
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-orange uppercase">Navegación</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-petroleum">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-orange uppercase">Soluciones</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-petroleum">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-orange uppercase">Contacto</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {phone ? <li>{phone}</li> : null}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="hover:text-petroleum">
                  {email}
                </a>
              </li>
            ) : null}
            {address ? <li>{address}</li> : null}
            {rif ? <li>RIF {rif}</li> : null}
            {wa ? (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-petroleum">
                  WhatsApp comercial
                </a>
              </li>
            ) : null}
            {!phone && !email && !address && !wa ? (
              <li>
                <Link href="/contacto" className="hover:text-petroleum">
                  Pedir cotización
                </Link>
              </li>
            ) : null}
          </ul>
          {social.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-orange hover:text-petroleum"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {company.legalName}. Todos los derechos reservados.</p>
          <Link href="/privacidad" className="hover:text-petroleum">
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
