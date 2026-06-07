import type { Metadata } from "next";
import { CategoryPageShell } from "@/components/CategoryPageShell";
import { getCategoryBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "全球商标注册",
  description: "美国、欧盟、英国、日本、马德里等全球商标注册路径咨询。"
};

export default function TrademarkPage() {
  return <CategoryPageShell category={getCategoryBySlug("trademark")!} />;
}
