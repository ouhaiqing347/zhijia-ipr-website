import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import type { CategoryPageData } from "@/data/services";
import { phoneHref } from "@/data/site";

type CategoryHeroProps = {
  category: CategoryPageData;
};

export function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className={`category-hero theme-${category.theme}`}>
      <div className="hero-copy">
        <span className="kicker">{category.kicker}</span>
        <h1>{category.title}</h1>
        <p>{category.summary}</p>
        <div className="hero-actions">
          <Link className="primary-button" href="/contact">
            {category.primaryCta}
            <ArrowRight size={18} />
          </Link>
          <a className="secondary-button" href={phoneHref}>
            <PhoneCall size={18} />
            {category.secondaryCta}
          </a>
        </div>
      </div>
      <div className="hero-media">
        <Image src={category.image} alt={category.title} fill sizes="(max-width: 900px) 100vw, 50vw" priority />
        <div className="orbit" aria-hidden="true" />
      </div>
    </section>
  );
}
