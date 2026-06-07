"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, Globe2 } from "lucide-react";
import type { KnowledgeService } from "@/data/generated-services";
import { generatedServices } from "@/data/generated-services";

type TrademarkGroupKey = "china" | "asia" | "europe" | "america" | "oceania" | "africa" | "international";

const groupOrder: Array<{ key: TrademarkGroupKey; title: string; summary: string }> = [
  {
    key: "china",
    title: "中国商标业务",
    summary: "包含中国大陆商标业务，以及中国香港、中国澳门、中国台湾商标注册。"
  },
  {
    key: "asia",
    title: "亚洲商标业务",
    summary: "覆盖日韩、东南亚、南亚、中东和中亚等重点市场。"
  },
  {
    key: "europe",
    title: "欧洲商标业务",
    summary: "覆盖欧盟、英国、德国、法国、西班牙、意大利等欧洲市场。"
  },
  {
    key: "america",
    title: "美洲商标业务",
    summary: "覆盖美国、加拿大、墨西哥、巴西、阿根廷等美洲市场。"
  },
  {
    key: "oceania",
    title: "大洋洲商标业务",
    summary: "覆盖澳大利亚、新西兰及太平洋岛国市场。"
  },
  {
    key: "africa",
    title: "非洲商标业务",
    summary: "覆盖非洲区域组织及南非、埃及、尼日利亚等市场。"
  },
  {
    key: "international",
    title: "国际及其他商标业务",
    summary: "包含马德里体系、其他国家注册以及商标交易等补充服务。"
  }
];

const continentByCode: Record<string, TrademarkGroupKey> = {
  jp: "asia",
  kr: "asia",
  sg: "asia",
  vn: "asia",
  ph: "asia",
  my: "asia",
  id: "asia",
  th: "asia",
  la: "asia",
  kh: "asia",
  mm: "asia",
  pk: "asia",
  in: "asia",
  ae: "asia",
  sa: "asia",
  tr: "asia",
  ir: "asia",
  il: "asia",
  qa: "asia",
  iq: "asia",
  kz: "asia",
  eu: "europe",
  gb: "europe",
  de: "europe",
  fr: "europe",
  es: "europe",
  it: "europe",
  ch: "europe",
  ru: "europe",
  pt: "europe",
  ie: "europe",
  us: "america",
  ca: "america",
  mx: "america",
  cu: "america",
  jm: "america",
  ar: "america",
  br: "america",
  pe: "america",
  co: "america",
  cl: "america",
  au: "oceania",
  nz: "oceania",
  pg: "oceania",
  fj: "oceania",
  to: "oceania",
  za: "africa",
  eg: "africa",
  ng: "africa",
  et: "africa",
  cd: "africa",
  ke: "africa",
  gh: "africa",
  ma: "africa"
};

const domesticTitles = ["商标证书补发", "商标无效宣告", "异议/无效/撤三 答辩", "商标交易"];

const labelByCode: Record<string, string> = {
  cn: "中国 CHINA",
  hk: "中国香港 Hong Kong",
  mo: "中国澳门 Macao",
  tw: "中国台湾 Taiwan",
  us: "美国 United States",
  eu: "欧盟 Europe Union",
  gb: "英国 United Kingdom",
  jp: "日本 Japan",
  ca: "加拿大 Canada",
  au: "澳大利亚 Australia",
  vn: "越南 Vietnam",
  my: "马来西亚 Malaysia",
  th: "泰国 Thailand"
};

export function TrademarkServiceExplorer() {
  const services = useMemo(
    () => generatedServices.filter((service) => service.domain === "trademark"),
    []
  );
  const [selectedCountry, setSelectedCountry] = useState("all");

  const countryOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const service of services) {
      const label = getCountryLabel(service);
      map.set(label, label);
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
  }, [services]);

  const filteredServices = selectedCountry === "all"
    ? services
    : services.filter((service) => getCountryLabel(service) === selectedCountry);

  const grouped = groupOrder.map((group) => ({
    ...group,
    services: filteredServices.filter((service) => getGroupKey(service) === group.key)
  })).filter((group) => group.services.length > 0);

  return (
    <div className="trademark-explorer">
      <div className="trademark-filter-panel">
        <div>
          <span>国家/地区筛选</span>
          <strong>{filteredServices.length} 项商标服务</strong>
        </div>
        <label className="country-filter">
          <Filter size={17} aria-hidden="true" />
          <select value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
            <option value="all">全部国家/地区</option>
            {countryOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="trademark-service-groups">
        {grouped.map((group) => (
          <section className="trademark-service-group" key={group.key}>
            <div className="trademark-service-group-head">
              <div>
                <span>{group.title}</span>
                <p>{group.summary}</p>
              </div>
              <strong>{group.services.length}</strong>
            </div>
            <div className="knowledge-grid trademark-grid">
              {group.services.map((service) => (
                <TrademarkCard service={service} key={service.slug} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function TrademarkCard({ service }: { service: KnowledgeService }) {
  return (
    <Link className="knowledge-card" href={`/services/${service.slug}`}>
      <div className="knowledge-card-icon">
        {service.countryCode ? (
          <span className={`fi fi-${service.countryCode}`} aria-hidden="true" />
        ) : (
          <Globe2 size={24} aria-hidden="true" />
        )}
      </div>
      <span className="knowledge-card-category">{getCountryLabel(service)}</span>
      <h3>{service.shortTitle}</h3>
      <p>{service.summary}</p>
      <div className="knowledge-card-link">
        查看详情 <ArrowRight size={15} />
      </div>
    </Link>
  );
}

function getGroupKey(service: KnowledgeService): TrademarkGroupKey {
  const text = `${service.shortTitle} ${service.countryOrRegion}`;

  if (["cn", "hk", "mo", "tw"].includes(service.countryCode) || text.includes("中国") || domesticTitles.includes(service.shortTitle)) {
    return "china";
  }

  if (text.includes("马德里") || text.includes("其他国家")) return "international";
  if (text.includes("OAPI") || text.includes("ARIPO") || text.includes("非洲")) return "africa";

  return continentByCode[service.countryCode] ?? "international";
}

function getCountryLabel(service: KnowledgeService) {
  if (service.countryOrRegion) {
    return cleanCountryLabel(service.countryOrRegion);
  }

  if (labelByCode[service.countryCode]) return labelByCode[service.countryCode];
  if (domesticTitles.includes(service.shortTitle)) return "中国 CHINA";
  if (service.shortTitle.includes("其他国家")) return "其他国家/地区";
  if (service.shortTitle.includes("马德里")) return "马德里体系";
  return "其他商标服务";
}

function cleanCountryLabel(value: string) {
  return value
    .replace("非洲知识产组织", "非洲知识产权组织")
    .replace(/\s*成员国有[:：].*/, "")
    .replace(/\s*可选[:：].*/, "")
    .replace(/\s*共\d+个国家.*/, "")
    .trim();
}
