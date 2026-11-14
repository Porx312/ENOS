"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { alquilerSubLinks, company, navLinks, serviceLinks } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
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
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[70] text-ink transition-[background-color,backdrop-filter,border-color] ${
        open
          ? "border-b border-line bg-paper"
          : scrolled
            ? "border-b border-white/30 bg-white/55 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-white/40 backdrop-blur-lg backdrop-saturate-150"
      }`}
    >
      <div className="relative z-[71] mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" onClick={() => setOpen(false)}>
          <BrandMark className="h-8 w-auto max-w-[6.5rem] shrink-0 sm:h-10 sm:max-w-[9rem]" />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-extrabold leading-none tracking-tight uppercase sm:text-lg">
              {company.name}
            </span>
            <span className="mt-1 block truncate text-[10px] tracking-wide text-muted uppercase sm:text-[11px]">
              {company.region}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-ink/80 uppercase hover:text-petroleum"
            >
              {link.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-semibold tracking-wide text-ink/80 uppercase hover:text-petroleum"
              aria-expanded={solutionsOpen}
              onClick={() => setSolutionsOpen((value) => !value)}
            >
              Soluciones
              <ChevronDown className="h-4 w-4" />
            </button>
            {solutionsOpen ? (
              <div className="absolute top-full left-0 z-50 w-72 pt-2">
                <div className="border border-line bg-white p-3 shadow-lg">
                  <ul className="space-y-1">
                    {serviceLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-3 py-2 text-sm font-medium text-ink hover:bg-mist hover:text-petroleum"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 px-3 text-[11px] font-bold tracking-[0.16em] text-orange uppercase">Alquiler</p>
                  <ul className="mt-1 space-y-1">
                    {alquilerSubLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-3 py-2 text-sm text-muted hover:bg-mist hover:text-petroleum"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
          <Link href="/contacto" className="btn-primary min-h-11 px-4 text-sm">
            Pedir cotización
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-paper text-ink lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-x-0 top-[3.75rem] bottom-0 z-[69] flex flex-col border-t border-line bg-paper lg:hidden"
        >
          <nav className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-5 py-4 pb-28">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm px-3 py-3 text-base font-semibold tracking-wide text-ink uppercase hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-3 px-3 text-xs font-bold tracking-[0.16em] text-orange uppercase">Soluciones</p>
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm px-3 py-3 text-base font-medium text-ink hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-3 px-3 text-xs font-bold tracking-[0.16em] text-orange uppercase">Alquiler</p>
            {alquilerSubLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm px-3 py-2.5 pl-5 text-sm text-muted hover:bg-mist hover:text-petroleum"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contacto" className="btn-primary mt-4 w-full" onClick={() => setOpen(false)}>
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
