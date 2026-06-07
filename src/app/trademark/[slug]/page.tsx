import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/DetailPage";
import { getTrademarkDetail, trademarkDetails } from "@/data/services";

export function generateStaticParams() {
  return trademarkDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getTrademarkDetail(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary
  };
}

export default async function TrademarkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getTrademarkDetail(slug);
  if (!service) notFound();
  return <DetailPage service={service} related={trademarkDetails} />;
}
