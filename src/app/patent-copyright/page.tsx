import type { Metadata } from "next";
import { CategoryPageShell } from "@/components/CategoryPageShell";
import { getCategoryBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "专利版权",
  description: "发明专利、实用新型、软件著作权、美术作品版权等服务咨询。"
};

export default function PatentCopyrightPage() {
  return <CategoryPageShell category={getCategoryBySlug("patent-copyright")!} />;
}
