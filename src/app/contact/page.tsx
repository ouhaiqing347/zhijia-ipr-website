import type { Metadata } from "next";
import { PhoneCall } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { phoneHref, phoneNumber, publicRiskNotes } from "@/data/site";

export const metadata: Metadata = {
  title: "联系咨询",
  description: "通过表单或电话联系智加知识产权顾问。"
};

export default function ContactPage() {
  return (
    <main>
      <section className="simple-hero">
        <span className="kicker">CONTACT</span>
        <h1>联系智加知识产权</h1>
        <p>通过电话或表单提交需求，顾问会结合服务类型、目标市场和材料准备情况进一步沟通。</p>
        <a className="primary-button" href={phoneHref}>
          <PhoneCall size={18} />
          {phoneNumber}
        </a>
      </section>
      <section className="section contact-layout">
        <div className="contact-card">
          <h2>预约咨询</h2>
          <p>请尽量填写目标国家/地区和业务类型，便于顾问了解当前需求。</p>
          <LeadForm source="contact" />
        </div>
        <div className="contact-card muted-card">
          <h2>重要风险提示</h2>
          <ul className="plain-list">
            {publicRiskNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
