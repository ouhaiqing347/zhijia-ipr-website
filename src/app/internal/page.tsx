import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "资料中心",
  description: "智加知识产权资料中心。"
};

export default function InternalPage() {
  return (
    <main>
      <section className="simple-hero">
        <span className="kicker">RESOURCE CENTER</span>
        <h1>资料中心</h1>
        <p>如需了解具体服务、材料清单或办理方式，可返回官网首页或联系顾问。</p>
        <Link className="primary-button" href="/">
          返回官网首页
        </Link>
      </section>
    </main>
  );
}
