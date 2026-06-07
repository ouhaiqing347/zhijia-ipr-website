export const companyName = "智加知识产权";
export const fullCompanyName = "深圳市智加知识产权代理有限公司";
export const phoneNumber = "18025488636";
export const phoneHref = `tel:${phoneNumber}`;

export const navItems = [
  { label: "首页", href: "/" },
  { label: "全球商标注册", href: "/trademark" },
  { label: "专利版权", href: "/patent-copyright" },
  { label: "海外工商", href: "/overseas-company" },
  { label: "荣誉证书", href: "/honor-certificates" },
  { label: "联系咨询", href: "/contact" }
] as const;

export const formServiceOptions = [
  "全球商标注册",
  "中国商标业务",
  "专利 / 软著 / 版权",
  "海外公司注册",
  "ODI 备案",
  "荣誉证书",
  "检测认证",
  "其他知识产权咨询"
] as const;

export const publicRiskNotes = [
  "商标注册不能承诺 100% 成功，需结合检索、审查和异议情况判断。",
  "美国商标需重点关注真实使用、使用证据和注册后的使用声明。",
  "马德里商标国际注册需提示基础商标和 5 年中心打击风险。",
  "欧盟商标不覆盖英国，且需关注异议和连续 5 年不使用撤销风险。",
  "海外工商、ODI、税务和外汇事项以官方最新要求及顾问确认结果为准。"
] as const;

export const imageAssets = {
  hero: "/images/luxury-hero.png",
  globalIp: "/images/hero-global-ip.png",
  consulting: "/images/team-consulting.png",
  certificatesGlobal: "/images/certificates-global.png",
  patent: "/images/patent-copyright.png",
  overseas: "/images/overseas-company.png",
  honor: "/images/honor-certificates.png"
} as const;
