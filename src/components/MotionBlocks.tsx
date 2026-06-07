import Image from "next/image";
import type { CategoryPageData } from "@/data/services";
import { imageAssets } from "@/data/site";

type MotionBlocksProps = {
  category: CategoryPageData;
};

export function MotionBlocks({ category }: MotionBlocksProps) {
  if (category.visualKind === "blueprint") {
    return (
      <div className="visual-zone">
        <div className="blueprint">
          <div className="blueprint-lines">
            <span />
            <span />
            <span />
          </div>
          <div className="blueprint-label">IP BLUEPRINT</div>
        </div>
        <CardGrid category={category} />
      </div>
    );
  }

  if (category.visualKind === "certificate") {
    return (
      <div className="certificate-wall">
        <div className="photo-panel">
          <Image src={imageAssets.certificatesGlobal} alt="证书与国际业务视觉" fill sizes="50vw" />
          <div className="photo-label">资质陈列与企业背书</div>
        </div>
        <div className="medal-grid">
          {category.cards.map((card) => (
            <div className="medal" key={card.title}>
              <strong>{card.title}</strong>
              <span>{card.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category.visualKind === "route") {
    return (
      <div className="route-board">
        {category.lanes.map((lane) => (
          <div className="lane" key={lane.title}>
            <strong>{lane.title}</strong>
            <span>{lane.description}</span>
            <em>{lane.tag}</em>
          </div>
        ))}
      </div>
    );
  }

  return (
      <div className="visual-zone">
        <div className="panel-dark">
          <h3>全球市场雷达</h3>
          <p>围绕目标市场、申请体系和后续使用要求，提前确认更合适的商标保护组合。</p>
        <div className="signal s1">美国 · 使用证据</div>
        <div className="signal s2">欧盟 · 统一保护</div>
        <div className="signal s3">马德里 · 多国组合</div>
        <div className="radar" aria-hidden="true" />
      </div>
      <div className="route-board">
        {category.lanes.map((lane) => (
          <div className="lane" key={lane.title}>
            <strong>{lane.title}</strong>
            <span>{lane.description}</span>
            <em>{lane.tag}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardGrid({ category }: MotionBlocksProps) {
  return (
    <div className="service-grid two">
      {category.cards.map((card) => (
        <div className="service-card" key={card.title}>
          {card.badge ? <span className="card-badge">{card.badge}</span> : null}
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
