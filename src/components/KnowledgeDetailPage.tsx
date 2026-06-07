import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import type { KnowledgeService } from "@/data/generated-services";
import { phoneHref, phoneNumber } from "@/data/site";
import { LeadForm } from "./LeadForm";

type KnowledgeDetailPageProps = {
  service: KnowledgeService;
  related: KnowledgeService[];
};

export function KnowledgeDetailPage({ service, related }: KnowledgeDetailPageProps) {
  const visibleRelated = related.filter((item) => item.slug !== service.slug).slice(0, 16);
  const hasCategoryPage = !service.categoryHref.startsWith("/services");
  const backHref = hasCategoryPage ? service.categoryHref : "/";
  const backLabel = hasCategoryPage ? `返回${service.categoryLabel}` : "返回官网首页";

  return (
    <main>
      <section className="detail-hero">
        <div>
          <Link className="back-link" href={backHref}>
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
          <span className="kicker">
            {service.domainTitle} / {service.sourceCategory}
          </span>
          <h1>{service.shortTitle}</h1>
          <p>{service.summary}</p>
          <div className="detail-tags">
            {service.countryCode ? <span className={`fi fi-${service.countryCode}`} aria-hidden="true" /> : null}
            <span>{service.categoryLabel}</span>
            {service.businessName ? <span>{service.businessName}</span> : null}
          </div>
        </div>
        <div className="detail-consult-card">
          <strong>想确认材料和周期？</strong>
          <p>可直接电话沟通，也可以先提交需求，顾问会结合业务类型和主体情况确认。</p>
          <a className="primary-button" href={phoneHref}>
            <PhoneCall size={17} />
            {phoneNumber}
          </a>
        </div>
      </section>

      <section className="section">
        <div className="detail-layout">
          <aside className="detail-side">
            <Link className="active" href={`/services/${service.slug}`}>
              当前服务
            </Link>
            {hasCategoryPage ? <Link href={service.categoryHref}>查看{service.categoryLabel}</Link> : null}
            {visibleRelated.map((item) => (
              <Link href={`/services/${item.slug}`} key={item.slug}>
                {item.shortTitle}
              </Link>
            ))}
          </aside>

          <article className="detail-content">
            <div className="split">
              <InfoPanel title="服务要点" items={service.highlights} />
              <InfoPanel
                title="咨询前建议准备"
                items={["企业主体信息", "拟办理的国家、地区或业务类型", "现有材料状态和期望完成时间"]}
              />
            </div>

            <div className="knowledge-detail-blocks">
              {service.blocks.map((block, index) => (
                <section className="knowledge-detail-block" key={`${block.heading}-${index}`}>
                  <h2>{block.heading}</h2>
                  <ul>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="note-panel">
              <h2>办理提醒</h2>
              <ul>
                <li>不同国家、地区和业务类型的材料、周期、费用会有差异。</li>
                <li>以上内容用于初步了解，具体办理口径以顾问结合最新要求确认为准。</li>
              </ul>
            </div>

            <div className="detail-form" id="consult">
              <div>
                <span className="kicker">CONSULTATION</span>
                <h2>提交咨询需求</h2>
                <p>填写联系方式和业务需求，顾问会按电话信息进一步沟通。</p>
              </div>
              <LeadForm source={`generated-detail:${service.slug}`} />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="info-box">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <CheckCircle2 size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
