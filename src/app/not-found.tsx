import Link from "next/link";

export default function NotFound() {
  return (
    <main className="surface-grid mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-5 py-20">
      <p className="text-xs font-bold tracking-[0.18em] text-orange uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight text-petroleum uppercase">
        Esta página no existe
      </h1>
      <p className="mt-4 text-lg text-muted">Elija una línea desde el inicio o pida la cotización directamente.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Ir al inicio
        </Link>
        <Link href="/contacto" className="btn-outline">
          Pedir cotización
        </Link>
      </div>
    </main>
  );
}
