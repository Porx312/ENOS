import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingView } from "@/components/landing-view";
import { getLanding, landingParams } from "@/lib/landings";

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
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    alternates: { canonical: `/${landing.path}` },
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
