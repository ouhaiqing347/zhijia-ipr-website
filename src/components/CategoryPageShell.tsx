import { CategoryHero } from "./CategoryHero";
import { KnowledgeServiceSection } from "./KnowledgeDirectory";
import { CategorySections } from "./ServiceSections";
import { LeadForm } from "./LeadForm";
import type { CategoryPageData } from "@/data/services";
import type { KnowledgeServiceDomain } from "@/data/generated-services";

export function CategoryPageShell({ category }: { category: CategoryPageData }) {
  return (
    <main>
      <CategoryHero category={category} />
      <CategorySections category={category} />
      {category.slug === "trademark" ? null : (
        <KnowledgeServiceSection domain={category.slug as KnowledgeServiceDomain} />
      )}
      <section className="section conversion-section">
        <div>
          <span className="kicker">CONSULTATION</span>
          <h2>不确定该选哪一种服务？</h2>
          <p>留下目标市场、主体情况和材料状态，顾问会按电话信息沟通，协助确认服务方案。</p>
        </div>
        <LeadForm source={`category:${category.slug}`} compact />
      </section>
    </main>
  );
}
