import type { Metadata } from "next";
import { CategoryPageShell } from "@/components/CategoryPageShell";
import { getCategoryBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "海外工商",
  description: "香港公司、美国公司、新加坡公司、ODI 备案等跨境工商咨询。"
};

export default function OverseasCompanyPage() {
  return <CategoryPageShell category={getCategoryBySlug("overseas-company")!} />;
}
