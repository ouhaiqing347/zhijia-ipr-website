import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { companyName, fullCompanyName, navItems, phoneHref, phoneNumber, publicRiskNotes } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link className="footer-brand" href="/">
            <span className="brand-mark">智</span>
            <span>{companyName}</span>
          </Link>
          <p>
            面向企业出海、品牌保护、技术成果保护和资质背书的顾问式知识产权服务官网。
          </p>
          <a className="footer-phone" href={phoneHref}>
            <PhoneCall size={18} />
            {phoneNumber}
          </a>
        </div>

        <div className="footer-links">
          <h3>服务导航</h3>
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-links">
          <h3>重点提示</h3>
          {publicRiskNotes.slice(0, 4).map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>

        <div className="footer-links">
          <h3>联系顾问</h3>
          <Link href="/contact">提交咨询需求</Link>
          <a href={phoneHref}>电话咨询 {phoneNumber}</a>
          <span>建议先说明目标国家/地区、服务类型和当前材料情况。</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{fullCompanyName}</span>
        <span>服务信息以顾问确认和官方最新要求为准。</span>
      </div>
    </footer>
  );
}
