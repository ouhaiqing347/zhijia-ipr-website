import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";
import type { CardItem, CategoryPageData } from "@/data/services";
import { MotionBlocks } from "./MotionBlocks";
import { TrademarkServiceExplorer } from "./TrademarkServiceExplorer";

type CategorySectionsProps = {
  category: CategoryPageData;
};

export function CategorySections({ category }: CategorySectionsProps) {
  return (
    <>
      <section className="section">
        <div className="section-title">
          <span>{category.sectionKicker}</span>
          <h2>{category.sectionTitle}</h2>
          <p>{category.sectionSummary}</p>
        </div>
        <MotionBlocks category={category} />
      </section>

      <section className="section paper">
        <div className="section-title">
          <span>SERVICE AREAS</span>
          <h2>常见服务方向</h2>
          <p>按目标国家、业务类型和适用场景整理，方便快速找到相关服务。</p>
        </div>
        {category.slug === "trademark" ? (
          <TrademarkServiceExplorer />
        ) : (
          <div className="service-grid five">
            {category.cards.map((card) => (
              <ServiceCard card={card} key={card.title} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export function ServiceCard({ card }: { card: CardItem }) {
  const content = (
    <>
      <div className="flag-wrap">
        {card.countryCode ? (
          <span className={`fi fi-${card.countryCode}`} aria-hidden="true" />
        ) : (
          <Globe2 size={30} aria-hidden="true" />
        )}
      </div>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      {card.badge ? <span className="card-badge">{card.badge}</span> : null}
      {card.href ? (
        <span className="card-link">
          查看详情 <ArrowRight size={15} />
        </span>
      ) : null}
    </>
  );

  if (card.href) {
    return (
      <Link className="service-card clickable" href={card.href}>
        {content}
      </Link>
    );
  }

  return <div className="service-card">{content}</div>;
}
