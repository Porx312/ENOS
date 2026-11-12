"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

/** Polígono aproximado del oriente (Anzoátegui, Monagas, Sucre, N.E., Delta, norte Bolívar). */
const ORIENTE: [number, number][] = [
  [10.15, -65.55],
  [10.55, -64.85],
  [10.85, -64.15],
  [11.05, -63.55],
  [11.25, -64.35],
  [10.95, -63.85],
  [10.75, -62.35],
  [10.15, -61.55],
  [9.35, -60.95],
  [8.45, -61.25],
  [7.95, -62.45],
  [8.15, -63.85],
  [8.75, -65.05],
  [9.55, -65.55],
  [10.15, -65.55],
];

export function CoverageMapInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    let cancelled = false;

    void (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      // Fix default marker icons in bundlers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([9.55, -63.35], 7);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.polygon(ORIENTE, {
        color: "#141414",
        weight: 2,
        fillColor: "#f9c513",
        fillOpacity: 0.45,
      })
        .addTo(map)
        .bindPopup("Zona de foco · Oriente del país");

      L.marker([9.75, -63.25]).addTo(map).bindPopup("Energía Nuevo Oriente · cobertura");

      mapRef.current = map;
      requestAnimationFrame(() => map.invalidateSize());
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[280px] w-full sm:h-[340px] lg:h-[380px]"
      role="application"
      aria-label="Mapa real de cobertura en el oriente de Venezuela"
    />
  );
}
