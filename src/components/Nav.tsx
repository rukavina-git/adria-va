import LocaleSwitcher from "./LocaleSwitcher";
import type { Content } from "@/lib/content";

export default function Nav({ nav }: { nav: Content["nav"] }) {
  const links = [
    { href: "#usluge", label: nav.services },
    { href: "#o-meni", label: nav.about },
    { href: "#cjenik", label: nav.pricing },
    { href: "#kontakt", label: nav.contact },
  ];

  return (
    <nav className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-brand-dark px-6 md:px-12">
      <div className="text-lg font-medium uppercase tracking-[0.06em] text-white">
        Adria <span className="text-accent font-semibold">VA</span>
      </div>
      <div className="flex items-center gap-7">
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm tracking-[0.02em] text-white transition-colors duration-200 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <LocaleSwitcher />
      </div>
    </nav>
  );
}
