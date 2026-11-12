"use client";

import { useEffect, useState } from "react";

type Props = {
  targetId?: string;
  label?: string;
};

/**
 * CTA fijo en móvil mientras el formulario de cotización no está a la vista.
 */
export function MobileStickyCta({ targetId = "cotizar", label = "Ir a cotizar" }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry?.isIntersecting);
      },
      { root: null, threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur-md lg:hidden">
      <a href={`#${targetId}`} className="btn-primary w-full justify-center">
        {label}
      </a>
    </div>
  );
}
