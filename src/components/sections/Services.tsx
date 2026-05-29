import type { ReactNode } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Content } from "@/lib/content";

const icons: Record<string, ReactNode> = {
  social: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  ledger: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </>
  ),
  admin: (
    <>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </>
  ),
};

export default function Services({
  services,
}: {
  services: Content["services"];
}) {
  return (
    <section id="usluge" className="bg-white px-6 py-16 md:px-12 md:py-18">
      <SectionLabel>{services.label}</SectionLabel>
      <h2 className="mb-10 max-w-[420px] text-[28px] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
        {services.title}
      </h2>
      <div className="max-w-[960px] divide-y divide-line overflow-hidden rounded-xl border border-line">
        {services.items.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-5 px-7 py-6 transition hover:bg-brand-light"
          >
            <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-light">
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] text-brand"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {icons[item.icon]}
              </svg>
            </div>
            <div>
              <p className="mb-1 text-[15px] font-medium text-ink">
                {item.title}
              </p>
              <p className="text-[13px] leading-[1.6] text-muted">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
