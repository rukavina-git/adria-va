"use client";

import { useState, type ReactNode } from "react";
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
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  function toggle(title: string) {
    setOpenTitle((prev) => (prev === title ? null : title));
  }

  return (
    <section id="usluge" className="bg-white py-16 md:py-18">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
      <SectionLabel>{services.label}</SectionLabel>
      <h2 className="mb-10 text-[28px] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
        {services.title}
      </h2>
      <div className="divide-y divide-line overflow-hidden rounded-xl border border-line">
        {services.items.map((item) => {
          const isOpen = openTitle === item.title;
          return (
            <div
              key={item.title}
              onClick={() => toggle(item.title)}
              className="cursor-pointer border-l-2 border-l-transparent px-7 py-6 transition-colors duration-200 hover:border-l-brand/30 hover:bg-gray-50"
            >
              <div className="flex items-start gap-5">
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
                <div className="flex-1">
                  <p className="mb-1 text-[15px] font-medium text-ink">
                    {item.title}
                  </p>
                  <p className="text-[13px] leading-[1.6] text-muted">
                    {item.description}
                  </p>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  className={`mt-1 h-4 w-4 flex-shrink-0 text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {item.details && item.details.length > 0 && (
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ml-[3.75rem] mt-4 border-t border-line pt-4">
                      <ul className="list-none">
                        {item.details.map((point) => (
                          <li key={point} className="flex items-start gap-2 py-0.5 text-sm text-gray-600">
                            <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex justify-end">
                        <a
                          href="#cjenik"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[12px] font-medium text-brand transition-colors duration-200 hover:text-brand-dark"
                        >
                          {services.viewPricing}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
