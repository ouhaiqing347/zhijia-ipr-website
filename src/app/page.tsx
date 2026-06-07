import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Globe2, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { ServiceCard } from "@/components/ServiceSections";
import { generatedServiceGroups, generatedServices } from "@/data/generated-services";
import { categoryPages } from "@/data/services";
import { imageAssets, phoneHref, phoneNumber } from "@/data/site";

const trademarkCategory = categoryPages.find((item) => item.slug === "trademark")!;

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="kicker">GLOBAL IP ADVISORY</span>
          <h1>企业出海前，先把品牌、技术和主体保护方案讲清楚</h1>
          <p>
            智加知识产权面向商标注册、专利版权、海外工商和荣誉资质，提供以材料、流程、风险边界为核心的顾问式咨询。
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/contact">
              预约顾问 <ArrowRight size={18} />
            </Link>
            <a className="secondary-button" href={phoneHref}>
              <PhoneCall size={18} />
              {phoneNumber}
            </a>
          </div>
          <div className="hero-metrics">
            <div><strong>{generatedServices.length}</strong><span>细分业务项目</span></div>
            <div><strong>{generatedServiceGroups.length}</strong><span>业务服务组</span></div>
            <div><strong>1 对 1</strong><span>顾问沟通需求</span></div>
          </div>
        </div>

        <div className="home-form-panel">
          <div className="form-panel-title">
            <span>CONSULTATION</span>
            <h2>提交需求，确认办理方向</h2>
          </div>
          <LeadForm source="home:hero" compact />
        </div>

        <div className="home-hero-image">
          <Image src={imageAssets.globalIp} alt="智加知识产权全球品牌保护视觉" fill priority sizes="100vw" />
        </div>
      </section>

      <section className="section paper">
        <div className="section-title">
          <span>KEY MARKETS</span>
          <h2>热门国家与注册体系</h2>
          <p>不同国家和体系的申请规则差异较大，先从目标市场选择更合适的保护方式。</p>
        </div>
        <div className="service-grid five">
          {trademarkCategory.cards.map((card) => (
            <ServiceCard card={card} key={card.title} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <span>SERVICE MATRIX</span>
          <h2>围绕品牌、技术、主体和资质的服务体系</h2>
          <p>从商标保护、技术成果保护到海外主体搭建和荣誉资质，按企业不同阶段匹配服务。</p>
        </div>
        <div className="category-grid">
          {categoryPages.map((category) => (
            <Link className={`category-card theme-${category.theme}`} href={category.href} key={category.slug}>
              <span>{category.kicker}</span>
              <h3>{category.title}</h3>
              <p>{category.summary}</p>
              <em>
                查看服务 <ArrowRight size={15} />
              </em>
            </Link>
          ))}
        </div>
      </section>

      <section className="image-value-section">
        <div className="image-value-photo">
          <Image src={imageAssets.consulting} alt="顾问咨询场景" fill sizes="50vw" />
        </div>
        <div className="image-value-copy">
          <span className="kicker">WHY ZHIJIA</span>
          <h2>专业服务不是简单提交文件，而是先把关键事项讲清楚</h2>
          <div className="value-list">
            <div><ShieldCheck /><span>材料、流程和风险边界提前说明，减少后续沟通成本。</span></div>
            <div><Globe2 /><span>国家和地区信息清晰呈现，方便快速找到目标市场。</span></div>
            <div><BadgeCheck /><span>商标、专利版权、海外工商和荣誉资质按用途分类。</span></div>
            <div><Sparkles /><span>顾问结合企业业务场景，协助确认更合适的办理方式。</span></div>
          </div>
        </div>
      </section>

      <section className="section dark-process">
        <div className="section-title inverted">
          <span>STANDARD PROCESS</span>
          <h2>标准咨询流程</h2>
          <p>先确认服务方案，再推进材料和提交，让办理过程更清晰。</p>
        </div>
        <div className="process-grid">
          {["提交需求", "方案确认", "确认材料", "递交办理", "节点跟进"].map((step, index) => (
            <div className="process-step" key={step}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section conversion-section">
        <div>
          <span className="kicker">CONTACT</span>
          <h2>准备开始咨询？</h2>
          <p>直接拨打电话，或留下需求信息。顾问会结合目标市场、主体情况和材料状态进一步沟通。</p>
        </div>
        <LeadForm source="home:bottom" compact />
      </section>
    </main>
  );
}
