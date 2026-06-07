import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { companyName, navItems, phoneHref, phoneNumber } from "@/data/site";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${companyName} 首页`}>
        <span className="brand-mark">智</span>
        <span>
          <span className="brand-cn">{companyName}</span>
          <span className="brand-en">GLOBAL IP ADVISORY</span>
        </span>
      </Link>

      <nav className="nav-links" aria-label="主导航">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <a className="header-phone" href={phoneHref}>
        <span className="phone-icon" aria-hidden="true">
          <PhoneCall size={18} />
        </span>
        <span>
          <small>咨询热线</small>
          <strong>{phoneNumber}</strong>
        </span>
      </a>
    </header>
  );
}
