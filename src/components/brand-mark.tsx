type Props = {
  className?: string;
  title?: string;
};

/** Logo oficial ENO (`/LOGO.svg`). */
export function BrandMark({
  className = "h-9 w-auto max-w-[7.5rem] sm:h-10 sm:max-w-[9rem]",
  title = "Energía Nuevo Oriente",
}: Props) {
  return (
    // SVG estático en /public — img evita el optimizador de next/image con SVG.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/LOGO.svg" alt={title} className={`object-contain object-left ${className}`} />
  );
}
