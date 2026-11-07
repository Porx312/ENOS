"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { company, navLinks } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled || open ? "border-b border-white/10 bg-petroleum text-white shadow-sm" : "bg-petroleum text-white"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/#inicio" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-orange font-display text-sm font-bold text-petroleum">
            EN
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-semibold leading-none tracking-tight sm:text-lg">
              {company.name}
            </span>
            <span className="mt-1 block text-[11px] text-white/70">{company.region}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white/85 hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            className="inline-flex min-h-11 items-center rounded-md bg-orange px-4 text-sm font-semibold text-petroleum transition hover:bg-orange-hover"
          >
            Pedir cotización
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id={panelId} className="border-t border-white/10 bg-petroleum lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4" aria-label="Móvil">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-md bg-orange px-4 font-semibold text-petroleum"
              onClick={() => setOpen(false)}
            >
              Pedir cotización
            </Link>
            <button ref={closeRef} type="button" className="sr-only" onClick={() => setOpen(false)}>
              Cerrar
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
