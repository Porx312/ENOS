type Props = {
  className?: string;
  title?: string;
};

/** Isotipo ENO — marca tipográfica propia (sin asset externo). */
export function BrandMark({ className = "h-10 w-10", title = "Energía Nuevo Oriente" }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" fill="#F9C513" />
      <path d="M0 0 L40 0 L0 14 Z" fill="#141414" opacity="0.12" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fontFamily="var(--font-montserrat), Montserrat, ui-sans-serif, system-ui, sans-serif"
        fontSize="13"
        fontWeight="800"
        letterSpacing="0.04em"
        fill="#141414"
      >
        ENO
      </text>
    </svg>
  );
}
