import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingView } from "@/components/landing-view";
import { images } from "@/lib/images";
import { getLanding, landingParams } from "@/lib/landings";
import { company, siteUrl } from "@/lib/site";

export const instant = false;

export function generateStaticParams() {
  return landingParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = getLanding(slug.join("/"));
  if (!landing) return {};
  const image = images[landing.imageKey];
  const url = `${siteUrl()}/${landing.path}`;
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    alternates: { canonical: `/${landing.path}` },
    openGraph: {
      title: `${landing.metaTitle} · ${company.name}`,
      description: landing.metaDescription,
      url,
      locale: "es_VE",
      type: "website",
      images: [{ url: image.src, width: 1600, height: 900, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${landing.metaTitle} · ${company.name}`,
      description: landing.metaDescription,
      images: [image.src],
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const landing = getLanding(slug.join("/"));
  if (!landing) notFound();
  return <LandingView landing={landing} />;
}
