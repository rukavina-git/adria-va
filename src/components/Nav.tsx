import Link from "next/link";
import Image from "next/image";
import LocaleSwitcher from "./LocaleSwitcher";
import type { Content } from "@/lib/content";

export default function Nav({ nav, locale }: { nav: Content["nav"]; locale: string }) {
  const links = [
    { href: "#usluge", label: nav.services },
    { href: "#o-meni", label: nav.about },
    { href: "#cjenik", label: nav.pricing },
    { href: "#kontakt", label: nav.contact },
  ];

  return (
    <nav className="sticky top-0 z-50 h-20 border-b border-white/10 bg-brand-dark">
      <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-6 md:px-12">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="Adria VA" width={36} height={36} className="rounded-md" />
          <span className="text-lg font-medium uppercase tracking-[0.06em] text-white">
            Adria <span className="font-semibold text-accent">VA</span>
          </span>
        </Link>
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
      </div>
    </nav>
  );
}
