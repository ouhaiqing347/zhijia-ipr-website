import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DOMAIN_META = {
  trademark: {
    label: "全球商标注册",
    href: "/trademark",
    slugPrefix: "trademark"
  },
  "patent-copyright": {
    label: "专利版权",
    href: "/patent-copyright",
    slugPrefix: "patent-copyright"
  },
  "overseas-company": {
    label: "海外工商",
    href: "/overseas-company",
    slugPrefix: "overseas"
  },
  "honor-certificates": {
    label: "荣誉证书",
    href: "/honor-certificates",
    slugPrefix: "honor"
  },
  "testing-certification": {
    label: "检测认证",
    href: "/services#testing-certification",
    slugPrefix: "testing"
  },
  "other-services": {
    label: "其他服务",
    href: "/services#other-services",
    slugPrefix: "other"
  }
};

const SOURCE_CONFIGS = [
  { prefix: "02-", defaultDomain: "trademark", sourceCategory: "商标" },
  { prefix: "03-", defaultDomain: "patent-copyright", sourceCategory: "专利" },
  { prefix: "04-", defaultDomain: "patent-copyright", sourceCategory: "版权" },
  { prefix: "05-", defaultDomain: "overseas-company", sourceCategory: "海外工商" }
];

const OVERVIEW_CATEGORIES = [
  { label: "商标", columns: [0, 1], domain: "trademark", category: "商标" },
  { label: "专利", columns: [2, 3], domain: "patent-copyright", category: "专利" },
  { label: "版权", columns: [4, 5], domain: "patent-copyright", category: "版权" },
  { label: "海外工商", columns: [6, 7], domain: "overseas-company", category: "海外工商" },
  { label: "检测认证", columns: [8, 9], domain: "testing-certification", category: "检测认证" },
  { label: "其他", columns: [10, 11], domain: "honor-certificates", category: "荣誉证书" }
];

const COUNTRY_CODE_MAP = [
  ["United States", "us"], ["美国", "us"],
  ["Europe Union", "eu"], ["欧盟", "eu"],
  ["United Kingdom", "gb"], ["英国", "gb"],
  ["Japan", "jp"], ["日本", "jp"],
  ["South Korea", "kr"], ["韩国", "kr"],
  ["Singapore", "sg"], ["新加坡", "sg"],
  ["Vietnam", "vn"], ["越南", "vn"],
  ["philippines", "ph"], ["菲律宾", "ph"],
  ["Malaysia", "my"], ["马来西亚", "my"],
  ["Indonesia", "id"], ["印度尼西亚", "id"], ["印尼", "id"],
  ["Thailand", "th"], ["泰国", "th"],
  ["Laos", "la"], ["老挝", "la"],
  ["Cambodia", "kh"], ["柬埔寨", "kh"],
  ["Myanmar", "mm"], ["缅甸", "mm"],
  ["Pakistan", "pk"], ["巴基斯坦", "pk"],
  ["India", "in"], ["印度 ", "in"], ["印度", "in"],
  ["United Arab Emirates", "ae"], ["阿联酋", "ae"],
  ["Saudi Arabia", "sa"], ["沙特阿拉伯", "sa"],
  ["Turkey", "tr"], ["土耳其", "tr"],
  ["Iran", "ir"], ["伊朗", "ir"],
  ["Israel", "il"], ["以色列", "il"],
  ["Qatar", "qa"], ["卡塔尔", "qa"],
  ["Iraq", "iq"], ["伊拉克", "iq"],
  ["Kazakhstan", "kz"], ["哈萨克斯坦", "kz"],
  ["Germany", "de"], ["德国", "de"],
  ["France", "fr"], ["法国", "fr"],
  ["Spain", "es"], ["西班牙", "es"],
  ["Italy", "it"], ["意大利", "it"],
  ["Switzerland", "ch"], ["瑞士", "ch"],
  ["Russia", "ru"], ["俄罗斯", "ru"],
  ["Portugal", "pt"], ["葡萄牙", "pt"],
  ["Ireland", "ie"], ["爱尔兰", "ie"],
  ["Benelux", "eu"], ["比荷卢", "eu"],
  ["Canada", "ca"], ["加拿大", "ca"],
  ["Mexico", "mx"], ["墨西哥", "mx"],
  ["Cuba", "cu"], ["古巴", "cu"],
  ["Jamaica", "jm"], ["牙买加", "jm"],
  ["Argentina", "ar"], ["阿根廷", "ar"],
  ["Brazil", "br"], ["巴西", "br"],
  ["Peru", "pe"], ["秘鲁", "pe"],
  ["Colombia", "co"], ["哥伦比亚", "co"],
  ["Chile", "cl"], ["智利", "cl"],
  ["Australia", "au"], ["澳大利亚", "au"],
  ["New Zealand", "nz"], ["新西兰", "nz"],
  ["Papua New Guinea", "pg"], ["巴布亚新几内亚", "pg"],
  ["Fiji", "fj"], ["斐济", "fj"],
  ["Tonga", "to"], ["汤加", "to"],
  ["SouthAfrica", "za"], ["南非", "za"],
  ["Egypt", "eg"], ["埃及", "eg"],
  ["Nigeria", "ng"], ["尼日利亚", "ng"],
  ["Ethiopia", "et"], ["埃塞俄比亚", "et"],
  ["Democratic Republic of the Congo", "cd"], ["刚果", "cd"],
  ["Kenya", "ke"], ["肯尼亚", "ke"],
  ["Ghana", "gh"], ["加纳", "gh"],
  ["Morocco", "ma"], ["摩洛哥", "ma"],
  ["Hong Kong", "hk"], ["香港", "hk"],
  ["Macao", "mo"], ["澳门", "mo"],
  ["Taiwan", "tw"], ["台湾", "tw"],
  ["CHINA", "cn"], ["中国", "cn"],
  ["BVI", "vg"], ["维尔京", "vg"],
  ["开曼", "ky"]
];

const ignoredSectionTitles = new Set(["快速索引", "原始表格内容", "分组清单"]);

const services = [];
const usedSlugs = new Set();

const knowledgeRoot = findKnowledgeRoot();

for (const config of SOURCE_CONFIGS) {
  parseStandardSource(config);
}

parseHonorCertificates();
parseOverviewTable();

const groups = buildGroups(services);
const output = renderDataFile(services, groups);
const outFile = path.resolve("src/data/generated-services.ts");
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, output, "utf8");

console.log(`Generated ${services.length} services from ${knowledgeRoot}`);
for (const group of groups) {
  console.log(`- ${group.title}: ${group.count}`);
}

function findKnowledgeRoot() {
  if (process.env.ZHIJIA_KNOWLEDGE_ROOT && fs.existsSync(process.env.ZHIJIA_KNOWLEDGE_ROOT)) {
    return process.env.ZHIJIA_KNOWLEDGE_ROOT;
  }

  const direct = path.join(os.homedir(), "Documents", "Obsidian Vault", "知识产权");
  if (fs.existsSync(direct)) return direct;

  const vaultRoot = path.join(os.homedir(), "Documents", "Obsidian Vault");
  const targetCodes = "77e5 8bc6 4ea7 6743";
  const target = fs.readdirSync(vaultRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .find((name) => [...name].map((char) => char.codePointAt(0).toString(16)).join(" ") === targetCodes);

  if (!target) {
    throw new Error("未找到知识产权知识库目录。可通过 ZHIJIA_KNOWLEDGE_ROOT 指定路径。");
  }

  return path.join(vaultRoot, target);
}

function findSourceFile(prefix) {
  const file = fs.readdirSync(knowledgeRoot).find((name) => name.startsWith(prefix) && name.endsWith(".md"));
  if (!file) throw new Error(`未找到 ${prefix} 开头的知识库文件`);
  return file;
}

function parseStandardSource(config) {
  const sourceFile = findSourceFile(config.prefix);
  const text = fs.readFileSync(path.join(knowledgeRoot, sourceFile), "utf8");
  const sections = getH2Sections(text);
  let lastService = null;

  for (const section of sections) {
    if (ignoredSectionTitles.has(section.title)) continue;

    if (section.title.startsWith("未注明国家/地区")) {
      if (lastService) {
        const blocks = parseContentBlocks(section.body);
        lastService.blocks.push(...blocks.map((block) => ({ ...block, heading: "补充说明" })));
        lastService.summary = pickSummary(lastService);
      }
      continue;
    }

    const parsed = parseTitleParts(section.title);
    const fields = extractFields(section.body);
    const sourceCategory = adjustSourceCategory(config.sourceCategory, section.title);
    if (config.prefix === "02-" && !["商标", "其他服务"].includes(sourceCategory)) {
      continue;
    }
    const domain = adjustDomain(config.defaultDomain, sourceCategory, section.title);
    const meta = DOMAIN_META[domain];
    const countryOrRegion = fields.countryOrRegion || parsed.countryOrRegion;
    const businessName = fields.businessName || parsed.businessName || sourceCategory;
    const shortTitle = makeShortTitle(domain, sourceCategory, countryOrRegion, businessName, section.title);
    const title = makeTitle(shortTitle, sourceCategory);
    const blocks = parseContentBlocks(section.body);

    const service = {
      slug: uniqueSlug(meta.slugPrefix, services.length + 1),
      title,
      shortTitle,
      domain,
      domainTitle: meta.label,
      categoryHref: meta.href,
      categoryLabel: meta.label,
      sourceCategory,
      countryOrRegion: countryOrRegion || "",
      businessName,
      sourceFile,
      sourceSection: section.title,
      countryCode: inferCountryCode(`${countryOrRegion} ${section.title}`),
      summary: "",
      highlights: [],
      blocks
    };

    service.summary = pickSummary(service);
    service.highlights = pickHighlights(service);
    services.push(service);
    lastService = service;
  }
}

function parseHonorCertificates() {
  const sourceFile = findSourceFile("06-");
  const text = fs.readFileSync(path.join(knowledgeRoot, sourceFile), "utf8");
  const groupSection = getH2Sections(text).find((section) => section.title === "分组清单");
  if (!groupSection) return;

  const h3Matches = [...groupSection.body.matchAll(/^###\s+(.+)$/gm)];
  for (let i = 0; i < h3Matches.length; i += 1) {
    const match = h3Matches[i];
    const heading = sanitizeHeading(match[1]);
    const body = groupSection.body.slice(match.index + match[0].length, h3Matches[i + 1]?.index ?? groupSection.body.length);
    const items = body.split(/\r?\n/)
      .map(cleanPublicText)
      .map((line) => line.replace(/^•\s*/, ""))
      .filter(Boolean);

    for (const item of items) {
      const meta = DOMAIN_META["honor-certificates"];
      const title = item.includes("证书") || item.includes("企业") || item.includes("单位") ? item : `${item}证书`;
      const service = {
        slug: uniqueSlug(meta.slugPrefix, services.length + 1),
        title,
        shortTitle: title,
        domain: "honor-certificates",
        domainTitle: meta.label,
        categoryHref: meta.href,
        categoryLabel: meta.label,
        sourceCategory: heading.replace(/^[一二三四五六七]、/, ""),
        countryOrRegion: "",
        businessName: title,
        sourceFile,
        sourceSection: heading,
        countryCode: "",
        summary: `${title}适用于企业信用、投标展示、合作背书或品牌资质呈现等场景，具体材料和适用范围可联系顾问确认。`,
        highlights: ["证书名称与企业展示场景匹配", "适合投标、合作、平台入驻等信用展示", "办理材料以顾问确认清单为准"],
        blocks: [
          {
            heading: "适用场景",
            items: ["企业信用展示", "投标或合作资料补充", "品牌背书与资质呈现"]
          },
          {
            heading: "咨询时建议提供",
            items: ["企业名称和营业执照信息", "计划使用的证书名称", "使用场景和期望时间"]
          }
        ]
      };
      services.push(service);
    }
  }
}

function parseOverviewTable() {
  const sourceFile = findSourceFile("01-");
  const text = fs.readFileSync(path.join(knowledgeRoot, sourceFile), "utf8");
  const rows = text.split(/\r?\n/)
    .filter((line) => line.startsWith("|") && !line.includes("---"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cleanPublicText(cell)));

  for (const row of rows.slice(2)) {
    for (const category of OVERVIEW_CATEGORIES) {
      for (const column of category.columns) {
        const raw = row[column];
        if (!raw || raw === category.label) continue;

        const title = formatOverviewTitle(category, raw);
        if (!title || isCoveredByExisting(title, category.domain)) continue;

        const meta = DOMAIN_META[category.domain];
        const service = {
          slug: uniqueSlug(meta.slugPrefix, services.length + 1),
          title,
          shortTitle: title,
          domain: category.domain,
          domainTitle: meta.label,
          categoryHref: meta.href,
          categoryLabel: meta.label,
          sourceCategory: category.category,
          countryOrRegion: "",
          businessName: title,
          sourceFile,
          sourceSection: "业务一览表",
          countryCode: inferCountryCode(title),
          summary: `${title}属于${category.label}服务范围，可通过电话或表单确认材料、周期和适用范围。`,
          highlights: ["已纳入智加知识产权业务目录", "适合先确认办理主体和使用场景", "材料和周期以顾问确认清单为准"],
          blocks: [
            {
              heading: "服务说明",
              items: [`${title}属于${category.label}相关服务，可根据企业当前阶段和使用场景确认办理方式。`]
            },
            {
              heading: "咨询时建议提供",
              items: ["企业主体信息", "拟办理的业务名称", "目标国家或使用场景", "期望完成时间"]
            }
          ]
        };
        services.push(service);
      }
    }
  }
}

function getH2Sections(text) {
  const matches = [...text.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((match, index) => ({
    title: cleanPublicText(match[1]),
    body: text.slice(match.index + match[0].length, matches[index + 1]?.index ?? text.length)
  }));
}

function parseTitleParts(title) {
  const index = title.lastIndexOf(" - ");
  if (index === -1) return { countryOrRegion: "", businessName: title };
  return {
    countryOrRegion: title.slice(0, index).trim(),
    businessName: title.slice(index + 3).trim()
  };
}

function extractFields(body) {
  const country = body.match(/-\s+\*\*国家\/地区\*\*[：:]\s*(.+)/);
  const business = body.match(/-\s+\*\*业务\*\*[：:]\s*(.+)/);
  return {
    countryOrRegion: country ? cleanPublicText(country[1]) : "",
    businessName: business ? cleanPublicText(business[1]) : ""
  };
}

function adjustSourceCategory(defaultCategory, title) {
  if (/著作权|版权|美术作品|集成电路/.test(title)) return "版权";
  if (/专利|PCT|外观|实用|发明/.test(title) && defaultCategory !== "海外工商") return "专利";
  if (/保函/.test(title)) return "其他服务";
  return defaultCategory;
}

function adjustDomain(defaultDomain, sourceCategory, title) {
  if (sourceCategory === "版权" || sourceCategory === "专利") return "patent-copyright";
  if (/保函/.test(title)) return "other-services";
  return defaultDomain;
}

function parseContentBlocks(body) {
  const matches = [...body.matchAll(/^###\s+(.+)$/gm)];
  const blocks = [];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const heading = sanitizeHeading(match[1]);
    const raw = body.slice(match.index + match[0].length, matches[index + 1]?.index ?? body.length);
    const items = normalizeBlockItems(raw);
    if (items.length) blocks.push({ heading, items });
  }

  if (!blocks.length) {
    const items = normalizeBlockItems(body);
    if (items.length) blocks.push({ heading: "服务说明", items });
  }

  return blocks;
}

function normalizeBlockItems(raw) {
  const lines = raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\r/g, "")
    .split("\n")
    .map(cleanPublicText)
    .filter(Boolean)
    .filter((line) => !line.startsWith("国家/地区：") && !line.startsWith("业务："))
    .filter((line) => !/^\|/.test(line))
    .filter((line) => !/^-{3,}$/.test(line));

  const expanded = [];
  for (const line of lines) {
    const parts = splitLongLine(line);
    expanded.push(...parts);
  }

  return Array.from(new Set(expanded)).slice(0, 18);
}

function splitLongLine(line) {
  const normalized = cleanPublicText(line);
  if (!normalized) return [];
  if (normalized.length <= 120) return [normalized];

  const chunks = normalized
    .split(/(?=\d+[、.]\s*)|[；;]/)
    .map(cleanPublicText)
    .filter(Boolean);

  return chunks.length > 1 ? chunks.slice(0, 10) : [normalized.slice(0, 180)];
}

function cleanPublicText(value) {
  return String(value || "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\|/g, " ")
    .replace(/^[-*]\s*/, "")
    .replace(/^\d+[.、]\s*/, "")
    .replace(/^①\s*/, "")
    .replace(/^②\s*/, "")
    .replace(/^③\s*/, "")
    .replace(/^④\s*/, "")
    .replace(/^⑤\s*/, "")
    .replace(/^⑥\s*/, "")
    .replace(/^⑦\s*/, "")
    .replace(/^⑧\s*/, "")
    .replace(/^⑨\s*/, "")
    .replace(/^•\s*/, "")
    .replace(/客户下单/g, "确认办理需求")
    .replace(/该页面网址/g, "网页网址")
    .replace(/我司/g, "顾问团队")
    .replace(/接单/g, "受理")
    .replace(/报价/g, "费用")
    .replace(/老板/g, "负责人")
    .replace(/话术/g, "说明")
    .replace(/售中\/售后/g, "服务节点")
    .replace(/售后\/流程/g, "办理流程")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeHeading(heading) {
  return cleanPublicText(heading)
    .replace("提醒/说明", "办理提醒")
    .replace("售后/流程", "办理流程")
    .replace("售中/售后", "服务节点")
    .replace("增加备份", "补充说明")
    .replace("其他备注", "补充说明")
    .replace("备注", "补充说明");
}

function makeShortTitle(domain, sourceCategory, countryOrRegion, businessName, sourceTitle) {
  if (domain === "overseas-company") {
    const region = countryOrRegion || sourceTitle.split(" - ")[0];
    if (/ODI/i.test(region)) return "ODI 境外直接投资备案";
    if (/香港/.test(region)) return "香港公司注册与维护";
    if (/BVI/.test(sourceTitle)) return "BVI 公司注册";
    if (/开曼/.test(sourceTitle)) return "开曼公司注册";
    const company = region.replace(/公司$/, "");
    return `${company}公司注册`;
  }

  if (domain === "other-services") return businessName || sourceTitle;

  const region = cleanRegionName(countryOrRegion);
  if (region && businessName) {
    if (/^注册$/.test(businessName) && /马德里/.test(region)) return "马德里商标国际注册";
    return `${region} - ${businessName}`;
  }

  return sourceTitle || sourceCategory;
}

function makeTitle(shortTitle, sourceCategory) {
  if (shortTitle.includes(" - ")) return shortTitle;
  if (sourceCategory === "专利" || sourceCategory === "版权") return shortTitle;
  return shortTitle;
}

function cleanRegionName(region) {
  return cleanPublicText(region)
    .replace("非洲知识产组织", "非洲知识产权组织")
    .replace(/\s*成员国有[:：].*/, "")
    .replace(/\s*可选[:：].*/, "")
    .replace(/\s*共\d+个国家.*/, "")
    .trim();
}

function pickSummary(service) {
  const candidates = service.blocks.flatMap((block) => block.items);
  const first = candidates.find((item) => item.length >= 12 && !/^(注|备注)[:：]?$/.test(item));
  if (first) return trimSentence(first, 118);
  return `${service.shortTitle}属于${service.categoryLabel}服务范围，具体材料、周期和适用条件可联系顾问确认。`;
}

function pickHighlights(service) {
  const highlights = [];
  for (const block of service.blocks) {
    for (const item of block.items) {
      if (item.length >= 6) highlights.push(trimSentence(item, 56));
      if (highlights.length >= 3) return highlights;
    }
  }
  return ["确认办理主体信息", "确认业务使用场景", "按顾问清单准备材料"];
}

function trimSentence(value, limit) {
  const text = cleanPublicText(value);
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

function inferCountryCode(value) {
  const text = String(value || "");
  const found = COUNTRY_CODE_MAP.find(([keyword]) => text.includes(keyword));
  return found ? found[1] : "";
}

function uniqueSlug(prefix, seed) {
  let slug = `${prefix}-${String(seed).padStart(3, "0")}`;
  let offset = 1;
  while (usedSlugs.has(slug)) {
    slug = `${prefix}-${String(seed).padStart(3, "0")}-${offset}`;
    offset += 1;
  }
  usedSlugs.add(slug);
  return slug;
}

function formatOverviewTitle(category, raw) {
  const clean = cleanPublicText(raw).replace(/…|\.\.\./g, "");
  if (!clean) return "";
  if (category.label === "商标" && clean === "其他国家") return "其他国家商标注册";
  if (category.label === "专利" && clean === "其他国家") return "其他国家专利服务";
  if (category.label === "海外工商" && ["地址", "年审", "年账", "注销", "变更", "公司注册"].includes(clean)) {
    return clean === "公司注册" ? "海外公司注册" : `海外公司${clean}`;
  }
  if (category.label === "检测认证" && clean === "注册备案↓") return "注册备案";
  return clean;
}

function normalizeForCompare(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\s()/（）·,，.。:：;；、\-]/g, "")
    .replace(/证书|服务|业务|注册与维护/g, "")
    .trim();
}

function isCoveredByExisting(title, domain) {
  const normalized = normalizeForCompare(title);
  if (!normalized || normalized.length <= 1) return true;
  return services.some((service) => {
    if (service.domain !== domain) return false;
    const a = normalizeForCompare(service.title);
    const b = normalizeForCompare(service.shortTitle);
    return (
      (a.length >= 3 && a.includes(normalized)) ||
      (b.length >= 3 && b.includes(normalized)) ||
      (a.length >= 3 && normalized.includes(a)) ||
      (b.length >= 3 && normalized.includes(b))
    );
  });
}

function buildGroups(items) {
  return Object.entries(DOMAIN_META)
    .map(([domain, meta]) => {
      const groupItems = items.filter((item) => item.domain === domain);
      return {
        domain,
        title: meta.label,
        href: meta.href,
        count: groupItems.length,
        categories: Array.from(new Set(groupItems.map((item) => item.sourceCategory))).filter(Boolean)
      };
    })
    .filter((group) => group.count > 0);
}

function renderDataFile(items, groups) {
  return `// This file is generated by scripts/extract-knowledge-services.mjs.\n// Source: ${knowledgeRoot.replace(/\\/g, "/")}\n\nexport type KnowledgeServiceDomain = ${Object.keys(DOMAIN_META).map((domain) => JSON.stringify(domain)).join(" | ")};\n\nexport type KnowledgeContentBlock = {\n  heading: string;\n  items: string[];\n};\n\nexport type KnowledgeService = {\n  slug: string;\n  title: string;\n  shortTitle: string;\n  domain: KnowledgeServiceDomain;\n  domainTitle: string;\n  categoryHref: string;\n  categoryLabel: string;\n  sourceCategory: string;\n  countryOrRegion: string;\n  businessName: string;\n  sourceFile: string;\n  sourceSection: string;\n  countryCode: string;\n  summary: string;\n  highlights: string[];\n  blocks: KnowledgeContentBlock[];\n};\n\nexport type KnowledgeServiceGroup = {\n  domain: KnowledgeServiceDomain;\n  title: string;\n  href: string;\n  count: number;\n  categories: string[];\n};\n\nexport const generatedServices: KnowledgeService[] = ${JSON.stringify(items, null, 2)};\n\nexport const generatedServiceGroups: KnowledgeServiceGroup[] = ${JSON.stringify(groups, null, 2)};\n\nexport function getGeneratedServicesByDomain(domain: KnowledgeServiceDomain) {\n  return generatedServices.filter((service) => service.domain === domain);\n}\n\nexport function getGeneratedServiceBySlug(slug: string) {\n  return generatedServices.find((service) => service.slug === slug);\n}\n`;
}
