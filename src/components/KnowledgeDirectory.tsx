import Link from "next/link";
import { ArrowRight, BadgeCheck, FileText, Globe2, Layers3 } from "lucide-react";
import type { KnowledgeService, KnowledgeServiceDomain } from "@/data/generated-services";
import { generatedServices } from "@/data/generated-services";

const domainSummaries: Record<KnowledgeServiceDomain, { kicker: string; title: string; summary: string }> = {
  trademark: {
    kicker: "TRADEMARK SERVICES",
    title: "商标业务细分目录",
    summary: "覆盖中国商标业务、主要国家和地区商标注册、马德里体系及商标后续维护事项。"
  },
  "patent-copyright": {
    kicker: "PATENT & COPYRIGHT",
    title: "专利版权细分目录",
    summary: "覆盖专利申请、专利事务、软件著作权、作品版权和集成电路布图等服务。"
  },
  "overseas-company": {
    kicker: "OVERSEAS COMPANY",
    title: "海外工商细分目录",
    summary: "覆盖海外公司设立、维护、年审、变更、注销及 ODI 境外直接投资备案。"
  },
  "honor-certificates": {
    kicker: "CREDENTIAL SERVICES",
    title: "荣誉证书细分目录",
    summary: "覆盖信用等级、诚信认证、绿色低碳、定制领域和企业技术中心等资质证书。"
  },
  "testing-certification": {
    kicker: "TESTING & CERTIFICATION",
    title: "检测认证细分目录",
    summary: "覆盖检测服务、认证服务、质检、可靠性检测和不同市场的认证备案事项。"
  },
  "other-services": {
    kicker: "OTHER SERVICES",
    title: "其他服务细分目录",
    summary: "覆盖其他企业服务项目，可先咨询顾问确认适用范围。"
  }
};

type KnowledgeServiceSectionProps = {
  domain: KnowledgeServiceDomain;
  id?: string;
};

export function KnowledgeServiceSection({ domain, id }: KnowledgeServiceSectionProps) {
  const services = generatedServices.filter((service) => service.domain === domain);
  if (!services.length) return null;

  const copy = domainSummaries[domain];
  const grouped = groupByCategory(services);

  return (
    <section className="section knowledge-section" id={id ?? domain}>
      <div className="section-title">
        <span>{copy.kicker}</span>
        <h2>{copy.title}</h2>
        <p>{copy.summary}</p>
      </div>

      <div className="knowledge-groups">
        {grouped.map(([category, items]) => (
          <div className="knowledge-group" key={category}>
            <div className="knowledge-group-head">
              <div>
                <span>{category}</span>
                <strong>{items.length} 项服务</strong>
              </div>
              <Link href="/contact">
                咨询该类服务 <ArrowRight size={15} />
              </Link>
            </div>
            <div className="knowledge-grid">
              {items.map((service) => (
                <KnowledgeServiceCard service={service} key={service.slug} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function KnowledgeServiceCard({ service }: { service: KnowledgeService }) {
  return (
    <Link className="knowledge-card" href={`/services/${service.slug}`}>
      <div className="knowledge-card-icon">
        {service.countryCode ? (
          <span className={`fi fi-${service.countryCode}`} aria-hidden="true" />
        ) : (
          <ServiceIcon domain={service.domain} />
        )}
      </div>
      <span className="knowledge-card-category">{service.sourceCategory}</span>
      <h3>{service.shortTitle}</h3>
      <p>{service.summary}</p>
      <div className="knowledge-card-link">
        查看详情 <ArrowRight size={15} />
      </div>
    </Link>
  );
}

function ServiceIcon({ domain }: { domain: KnowledgeServiceDomain }) {
  if (domain === "honor-certificates") return <BadgeCheck size={24} aria-hidden="true" />;
  if (domain === "patent-copyright") return <FileText size={24} aria-hidden="true" />;
  if (domain === "testing-certification") return <Layers3 size={24} aria-hidden="true" />;
  return <Globe2 size={24} aria-hidden="true" />;
}

function groupByCategory(services: KnowledgeService[]) {
  const map = new Map<string, KnowledgeService[]>();
  for (const service of services) {
    const key = service.sourceCategory || service.domainTitle;
    map.set(key, [...(map.get(key) ?? []), service]);
  }
  return Array.from(map.entries());
}
