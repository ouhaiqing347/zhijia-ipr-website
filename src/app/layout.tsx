import type { Metadata } from "next";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { assetPath, companyName, phoneNumber } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${companyName}｜全球商标注册、专利版权、海外工商顾问服务`,
    template: `%s｜${companyName}`
  },
  description:
    "智加知识产权提供全球商标注册、专利版权、海外公司注册、ODI 备案和荣誉证书咨询服务，可通过表单或电话联系顾问。",
  keywords: ["全球商标注册", "美国商标注册", "欧盟商标注册", "马德里商标", "ODI备案", "智加知识产权"],
  icons: {
    icon: [{ url: assetPath("/icon.svg"), type: "image/svg+xml" }]
  },
  openGraph: {
    title: `${companyName}｜高端知识产权顾问服务`,
    description: `咨询热线 ${phoneNumber}，面向企业出海和品牌保护的一站式知识产权服务。`,
    type: "website",
    locale: "zh_CN"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
