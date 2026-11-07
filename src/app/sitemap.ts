import type { MetadataRoute } from "next";
import { landings } from "@/lib/landings";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = ["", "privacidad", ...landings.map((landing) => landing.path)];
  return paths.map((path) => ({
    url: path ? `${base}/${path}` : base,
  }));
}
