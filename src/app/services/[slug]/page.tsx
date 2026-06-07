import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeDetailPage } from "@/components/KnowledgeDetailPage";
import { generatedServices, getGeneratedServiceBySlug } from "@/data/generated-services";

export function generateStaticParams() {
  return generatedServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getGeneratedServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.shortTitle,
    description: service.summary
  };
}

export default async function GeneratedServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getGeneratedServiceBySlug(slug);
  if (!service) notFound();

  const related = generatedServices.filter((item) => item.domain === service.domain && item.sourceCategory === service.sourceCategory);
  return <KnowledgeDetailPage service={service} related={related} />;
}
