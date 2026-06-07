import type { Metadata } from "next";
import { CategoryPageShell } from "@/components/CategoryPageShell";
import { getCategoryBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "荣誉证书",
  description: "AAA 信用等级、绿色低碳、定制领域证书和企业技术中心等咨询服务。"
};

export default function HonorCertificatesPage() {
  return <CategoryPageShell category={getCategoryBySlug("honor-certificates")!} />;
}
