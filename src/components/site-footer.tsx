import Link from "next/link";
import { company, contactAddress, contactEmail, navLinks, phoneDisplay, serviceLinks, socialLinks } from "@/lib/site";

export function SiteFooter() {
  const phone = phoneDisplay();
  const email = contactEmail();
  const address = contactAddress();
  const social = socialLinks();
  return (
    <footer className="bg-petroleum text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-orange font-display text-sm font-bold text-petroleum">
              EN
            </span>
            <p className="font-display text-lg font-semibold tracking-tight">{company.legalName}</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{company.description}</p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-orange uppercase">Navegación</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-orange uppercase">Servicios</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-orange uppercase">Contacto</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {phone ? <li>{phone}</li> : null}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </li>
            ) : null}
            {address ? <li>{address}</li> : null}
            {!phone && !email && !address ? <li>Configure el contacto en variables de entorno.</li> : null}
          </ul>
          {social.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-orange hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {company.legalName}. Todos los derechos reservados.
          </p>
          <Link href="/privacidad" className="hover:text-white">
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
