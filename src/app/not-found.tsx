import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-5 py-20">
      <h1 className="font-display text-5xl font-bold tracking-tight text-petroleum">Esta página no existe</h1>
      <p className="mt-4 text-lg text-muted">Elija una línea desde el inicio o pida la cotización directamente.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-md bg-orange px-5 font-semibold text-petroleum"
        >
          Ir al inicio
        </Link>
        <Link
          href="/#contacto"
          className="inline-flex min-h-12 items-center rounded-md border border-line px-5 font-semibold text-petroleum"
        >
          Pedir cotización
        </Link>
      </div>
    </main>
  );
}
