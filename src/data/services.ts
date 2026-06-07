import { imageAssets } from "./site";

export type CategoryTheme = "trademark" | "patent" | "company" | "honor";
export type VisualKind = "radar" | "blueprint" | "route" | "certificate";

export type CardItem = {
  title: string;
  description: string;
  href?: string;
  countryCode?: string;
  badge?: string;
};

export type RouteLane = {
  title: string;
  description: string;
  tag: string;
};

export type CategoryPageData = {
  slug: string;
  href: string;
  theme: CategoryTheme;
  visualKind: VisualKind;
  kicker: string;
  title: string;
  summary: string;
  image: string;
  primaryCta: string;
  secondaryCta: string;
  sectionKicker: string;
  sectionTitle: string;
  sectionSummary: string;
  cards: CardItem[];
  lanes: RouteLane[];
};

export type DetailService = {
  slug: string;
  title: string;
  eyebrow: string;
  categoryHref: string;
  categoryLabel: string;
  summary: string;
  countryCode?: string;
  materials: string[];
  process: string[];
  notes: string[];
  table?: Array<{ label: string; value: string }>;
};

export const categoryPages: CategoryPageData[] = [
  {
    slug: "trademark",
    href: "/trademark",
    theme: "trademark",
    visualKind: "radar",
    kicker: "GLOBAL TRADEMARK",
    title: "全球商标注册，不只是提交申请",
    summary:
      "先判断目标市场、申请路径和后续使用义务，再决定单一国家、欧盟或马德里组合方案。",
    image: imageAssets.hero,
    primaryCta: "预约商标顾问",
    secondaryCta: "查看国家服务",
    sectionKicker: "KEY MARKETS",
    sectionTitle: "按目标市场选择更合适的保护方式",
    sectionSummary:
      "国家、地区和组织体系的规则不同，先了解差异，再由顾问确认适合的申请路径。",
    cards: [
      {
        title: "美国商标",
        description: "使用证据、首次使用日期、5-6 年使用声明是重点。",
        countryCode: "us",
        href: "/trademark/us"
      },
      {
        title: "欧盟商标",
        description: "覆盖欧盟 27 个成员国，需关注异议和不使用撤销。",
        countryCode: "eu",
        href: "/trademark/eu"
      },
      {
        title: "英国商标",
        description: "脱欧后独立申请，适合英国市场单独布局。",
        countryCode: "gb",
        href: "/trademark/uk"
      },
      {
        title: "日本商标",
        description: "重视类别、小项和历史申请主体信息一致性。",
        countryCode: "jp",
        href: "/trademark/japan"
      },
      {
        title: "马德里注册",
        description: "适合多国组合，但需提示基础商标和中心打击风险。",
        badge: "WIPO",
        href: "/trademark/madrid"
      }
    ],
    lanes: [
      {
        title: "单一国家申请",
        description: "适合目标市场明确、数量较少的品牌，更独立、更灵活。",
        tag: "DIRECT"
      },
      {
        title: "欧盟商标",
        description: "一份申请覆盖欧盟 27 个成员国，但不覆盖英国。",
        tag: "EUIPO"
      },
      {
        title: "马德里注册",
        description: "适合多国组合，需说明基础商标和中心打击风险。",
        tag: "WIPO"
      },
      {
        title: "使用证据",
        description: "美国等国家需关注真实使用、首次使用日期和后续声明。",
        tag: "USE"
      }
    ]
  },
  {
    slug: "patent-copyright",
    href: "/patent-copyright",
    theme: "patent",
    visualKind: "blueprint",
    kicker: "PATENT & COPYRIGHT",
    title: "把技术成果、软件系统和作品权属讲清楚",
    summary:
      "专利、软著、美术作品版权、集成电路布图分别对应不同材料和保护场景。",
    image: imageAssets.patent,
    primaryCta: "提交材料清单",
    secondaryCta: "电话咨询",
    sectionKicker: "PROTECTION MAP",
    sectionTitle: "技术保护矩阵替代普通服务列表",
    sectionSummary:
      "先判断保护对象，再匹配专利、软著、作品版权或集成电路布图登记。",
    cards: [
      {
        title: "发明专利",
        description: "适合技术方案、产品结构、方法流程等，需要更完整的技术交底。",
        badge: "技术方案"
      },
      {
        title: "实用新型",
        description: "适合产品结构和形状改进，常用于中小企业产品保护。",
        badge: "结构改进"
      },
      {
        title: "软件著作权",
        description: "适合软件系统、平台、小程序、算法工具的权属证明。",
        badge: "源代码"
      },
      {
        title: "美术作品版权",
        description: "适合图形、包装、海报、摄影和其他创作成果登记。",
        badge: "作品登记"
      }
    ],
    lanes: []
  },
  {
    slug: "overseas-company",
    href: "/overseas-company",
    theme: "company",
    visualKind: "route",
    kicker: "OVERSEAS COMPANY",
    title: "海外公司注册，要同时考虑主体、税务和维护",
    summary:
      "香港公司、ODI、美国公司、英国公司、日本公司、新加坡公司等各有适用场景。",
    image: imageAssets.overseas,
    primaryCta: "咨询跨境路径",
    secondaryCta: "电话咨询",
    sectionKicker: "CROSS-BORDER ROUTE",
    sectionTitle: "设立、银行、税务、维护要一起规划",
    sectionSummary:
      "海外工商不是单点注册，更接近跨境经营准备清单。",
    cards: [
      {
        title: "香港公司",
        description: "注册、年审、利得税表、无运营审计等常见维护事项。",
        countryCode: "hk"
      },
      {
        title: "ODI 备案",
        description: "境内企业境外直接投资相关备案，需看城市和项目情况。",
        badge: "ODI",
        href: "/overseas-company/odi"
      },
      {
        title: "美国公司",
        description: "Inc./Corp、LLC、EIN、年审、BOI 等信息需分类呈现。",
        countryCode: "us"
      },
      {
        title: "新加坡公司",
        description: "适合跨境业务主体搭建，后续合规维护要前置说明。",
        countryCode: "sg"
      }
    ],
    lanes: [
      {
        title: "主体设立",
        description: "按业务用途判断注册地、公司类型和后续维护成本。",
        tag: "SETUP"
      },
      {
        title: "银行与外汇",
        description: "资金路径、开户材料和外汇要求需提前确认。",
        tag: "BANK"
      },
      {
        title: "税务维护",
        description: "年审、报税、审计和信息申报按地区规则执行。",
        tag: "TAX"
      },
      {
        title: "ODI 备案",
        description: "涉及境内企业境外投资时，需确认项目真实性和财务条件。",
        tag: "ODI"
      }
    ]
  },
  {
    slug: "honor-certificates",
    href: "/honor-certificates",
    theme: "honor",
    visualKind: "certificate",
    kicker: "HONOR CERTIFICATES",
    title: "企业信用与荣誉资质，用于增强客户信任",
    summary:
      "常规 3A、定制领域、绿色低碳、省级企业技术中心等证书，可按企业用途进行匹配。",
    image: imageAssets.honor,
    primaryCta: "咨询证书用途",
    secondaryCta: "电话咨询",
    sectionKicker: "CREDENTIAL WALL",
    sectionTitle: "让资质证书成为企业信任背书",
    sectionSummary:
      "把证书名称、行业场景和背书价值讲清楚，减少单纯目录堆叠。",
    cards: [
      {
        title: "AAA 信用等级",
        description: "适合投标、合作、平台入驻等信任展示。",
        badge: "3A"
      },
      {
        title: "绿色低碳证书",
        description: "适合制造、供应链和环保相关场景。",
        badge: "绿色低碳"
      },
      {
        title: "定制领域证书",
        description: "按行业名称和用途进行顾问式匹配。",
        badge: "定制"
      },
      {
        title: "省级企业技术中心",
        description: "适合企业技术实力与创新资质展示。",
        badge: "技术中心"
      }
    ],
    lanes: []
  }
];

export const trademarkDetails: DetailService[] = [
  {
    slug: "china",
    title: "中国商标注册",
    eyebrow: "商标注册 / 中国 China",
    categoryHref: "/trademark",
    categoryLabel: "全球商标注册",
    summary:
      "适合中国境内品牌保护、平台入驻和长期经营布局。个人名义申请通常需要身份证和个体户执照。",
    countryCode: "cn",
    materials: [
      "商标名称或商标图样",
      "商品或服务类别、小类项目",
      "申请人主体信息",
      "企业营业执照或个人身份证及个体户执照",
      "联系人和接收文件信息"
    ],
    process: ["前期检索", "确认类别和小项", "提交申请", "形式审查", "实质审查", "公告", "注册发证"],
    notes: [
      "中国商标注册不能承诺 100% 成功，需要结合检索、审查和公告情况判断。",
      "自 2022 年 1 月 1 日起，国家知识产权局不再发放纸质商标注册证，只下发电子商标注册证。"
    ]
  },
  {
    slug: "us",
    title: "美国商标注册",
    eyebrow: "商标注册 / 美国 United States",
    categoryHref: "/trademark",
    categoryLabel: "全球商标注册",
    summary:
      "适合布局美国电商、线下销售和品牌长期保护的客户。美国商标强调真实使用和使用证据。",
    countryCode: "us",
    materials: [
      "商标图样",
      "商品或服务项目",
      "申请人主体证明文件",
      "申请基础信息：1a、1b、44e 或 44D",
      "首次使用日期和使用证据图片"
    ],
    process: ["确定申请基础", "准备使用证据", "提交申请", "审查意见处理", "公告", "注册", "第 5-6 年使用声明"],
    notes: [
      "美国商标以使用在先为重要原则，使用证据和首次使用日期需真实准确。",
      "注册后第 5-6 年需提交使用声明，第 9-10 年需续展并提交使用声明。"
    ]
  },
  {
    slug: "eu",
    title: "欧盟商标注册",
    eyebrow: "商标注册 / 欧盟 European Union",
    categoryHref: "/trademark",
    categoryLabel: "全球商标注册",
    summary:
      "一份申请覆盖欧盟 27 个成员国，适合需要统一保护欧洲市场的品牌。",
    countryCode: "eu",
    materials: [
      "商标图样",
      "商品或服务项目",
      "营业执照或护照扫描件及英文翻译",
      "申请人基本信息：名称、地址、法律形式、注册国",
      "POA 委托书，无需公证"
    ],
    process: ["提交申请", "形式审查", "绝对理由审查", "公告 3 个月", "注册发证"],
    notes: [
      "欧盟商标保护期限 10 年，自申请日起算。",
      "EUIPO 不主动审查在先近似商标，注册有效性依赖异议和后续维权。",
      "英国脱欧后欧盟商标不再覆盖英国。",
      "连续 5 年未真实使用可能被撤销。"
    ]
  },
  {
    slug: "uk",
    title: "英国商标注册",
    eyebrow: "商标注册 / 英国 United Kingdom",
    categoryHref: "/trademark",
    categoryLabel: "全球商标注册",
    summary:
      "适合重点布局英国市场的客户。英国已不属于欧盟商标覆盖范围，需单独规划。",
    countryCode: "gb",
    materials: [
      "商标图样",
      "商品或服务项目",
      "申请人主体证明文件",
      "申请人英文名称和地址",
      "委托代理信息"
    ],
    process: ["确认类别", "提交申请", "官方审查", "公告", "注册发证"],
    notes: [
      "英国脱欧后，欧盟商标新申请不再覆盖英国。",
      "如客户同时布局欧洲和英国，应组合评估欧盟商标和英国商标。"
    ]
  },
  {
    slug: "japan",
    title: "日本商标注册",
    eyebrow: "商标注册 / 日本 Japan",
    categoryHref: "/trademark",
    categoryLabel: "全球商标注册",
    summary:
      "适合布局日本电商、线下销售或品牌长期保护的客户。类别、小项和主体信息一致性需要提前确认。",
    countryCode: "jp",
    materials: [
      "商标图样",
      "商品或服务项目",
      "申请人主体证明文件及英文或日文信息",
      "委托书等代理文件"
    ],
    process: ["确认申请信息", "提交申请", "官方审查", "处理审查意见", "公告或注册程序", "取得注册结果"],
    notes: [
      "有实审国家建议沿用历史申请信息，避免申请主体信息不一致导致后续风险。",
      "未在源文件明确的周期和官费细节，由顾问按官方最新要求确认后输出。"
    ]
  },
  {
    slug: "madrid",
    title: "马德里商标国际注册",
    eyebrow: "商标注册 / 马德里 Madrid System",
    categoryHref: "/trademark",
    categoryLabel: "全球商标注册",
    summary:
      "适合计划指定多个国家或地区的客户，但必须基于原属国基础商标。",
    materials: [
      "国内基础商标申请或注册信息",
      "与基础商标完全一致的商标图样",
      "不超过基础商标范围的商品或服务项目",
      "申请人主体证明和英文信息",
      "指定国家或地区清单"
    ],
    process: ["确认基础商标", "选择指定国家", "提交国际申请", "WIPO 登记", "各指定国独立审查", "处理各国驳回或补正"],
    notes: [
      "国际注册证仅表示 WIPO 已登记，不代表各指定国最终注册成功。",
      "各指定缔约方仍会依据本国法律审查，可能驳回。",
      "国际注册后 5 年内，基础商标被撤销、无效或失效，国际注册将同步失效。"
    ],
    table: [
      { label: "适用场景", value: "指定 3 个以上国家时通常更适合评估马德里体系。" },
      { label: "风险提示", value: "中心打击风险需要在申请前明确告知客户。" }
    ]
  }
];

export const overseasDetails: DetailService[] = [
  {
    slug: "odi",
    title: "ODI 境外直接投资备案",
    eyebrow: "海外工商 / ODI",
    categoryHref: "/overseas-company",
    categoryLabel: "海外工商",
    summary:
      "ODI 是境内企业以投入资产、权益或融资、担保等方式取得境外企业所有权、控制权或经营管理权的相关备案事项。",
    materials: [
      "境内企业主体资料",
      "境外投资项目说明",
      "最近一年审计报告",
      "投资真实性相关证明",
      "银行、外汇和项目所需补充资料"
    ],
    process: ["发改委核准或备案", "商务部核准或备案", "外汇管理局备案", "银行放外汇", "实施 ODI"],
    notes: [
      "企业境外投资证书有效期通常为两年，两年内没有相适应项目会作废。",
      "主体一般需为我国境内依法成立企业；成立不满一年且无法提供完整审计报表的，一般难通过。",
      "最近一年审计报告不亏损，净资产回报率最好高于 5%，资产负债率最好低于 70%。",
      "ODI 是否接单需看公司所在城市和项目情况，税务、外汇和投资真实性材料需由顾问逐项确认。"
    ],
    table: [
      { label: "常见场景", value: "国内公司进驻海外市场、海外项目汇款、海外子公司回到国内设立外资企业。" },
      { label: "顾问确认", value: "城市政策、项目真实性、审计报告和资金路径需要逐项确认。" }
    ]
  }
];

export const allDetailServices = [...trademarkDetails, ...overseasDetails];

export function getCategoryBySlug(slug: string) {
  return categoryPages.find((category) => category.slug === slug);
}

export function getTrademarkDetail(slug: string) {
  return trademarkDetails.find((service) => service.slug === slug);
}

export function getOverseasDetail(slug: string) {
  return overseasDetails.find((service) => service.slug === slug);
}
