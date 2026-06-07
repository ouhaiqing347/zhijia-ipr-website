import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { DetailService } from "@/data/services";
import { LeadForm } from "./LeadForm";

type DetailPageProps = {
  service: DetailService;
  related: DetailService[];
};

export function DetailPage({ service, related }: DetailPageProps) {
  return (
    <main>
      <section className="detail-hero">
        <div>
          <Link className="back-link" href={service.categoryHref}>
            <ArrowLeft size={16} />
            返回{service.categoryLabel}
          </Link>
          <span className="kicker">{service.eyebrow}</span>
          <h1>{service.title}</h1>
          <p>{service.summary}</p>
        </div>
        <div className="detail-consult-card">
          <strong>需要确认是否适合办理？</strong>
          <p>提交目标市场、主体情况和材料状态，我们会按电话信息跟进。</p>
          <Link className="primary-button" href="#consult">
            预约咨询
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="detail-layout">
          <aside className="detail-side">
            {related.map((item) => (
              <Link className={item.slug === service.slug ? "active" : ""} href={`${service.categoryHref}/${item.slug}`} key={item.slug}>
                {item.title}
              </Link>
            ))}
          </aside>

          <article className="detail-content">
            <div className="split">
              <InfoBox title="客户需要准备" items={service.materials} />
              <InfoBox title="办理流程" items={service.process} ordered />
            </div>

            {service.table ? (
              <div className="data-table">
                {service.table.map((row) => (
                  <div className="data-row" key={row.label}>
                    <div>{row.label}</div>
                    <div>{row.value}</div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="note-panel">
              <h2>重要提醒</h2>
              <ul>
                {service.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>

            <div className="detail-form" id="consult">
              <div>
                <span className="kicker">CONSULTATION</span>
                <h2>提交咨询需求</h2>
                <p>不同国家和业务类型的周期、费用、材料要求可能不同，具体口径由顾问结合最新要求确认。</p>
              </div>
              <LeadForm source={`detail:${service.slug}`} />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function InfoBox({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";

  return (
    <div className="info-box">
      <h2>{title}</h2>
      <List>
        {items.map((item) => (
          <li key={item}>
            <CheckCircle2 size={16} />
            <span>{item}</span>
          </li>
        ))}
      </List>
    </div>
  );
}
