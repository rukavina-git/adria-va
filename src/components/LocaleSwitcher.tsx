"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex gap-0.5 rounded bg-white/10 p-0.5">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className={`rounded-[3px] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.05em] transition ${
            locale === active
              ? "bg-accent text-brand-dark"
              : "text-white/65 hover:text-white/70"
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
