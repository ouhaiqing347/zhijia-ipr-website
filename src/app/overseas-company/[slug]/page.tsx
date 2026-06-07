import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/DetailPage";
import { getOverseasDetail, overseasDetails } from "@/data/services";

export function generateStaticParams() {
  return overseasDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getOverseasDetail(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary
  };
}

export default async function OverseasDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getOverseasDetail(slug);
  if (!service) notFound();
  return <DetailPage service={service} related={overseasDetails} />;
}
