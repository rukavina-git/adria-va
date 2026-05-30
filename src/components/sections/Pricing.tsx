"use client";

import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import PackageModal from "@/components/ui/PackageModal";
import type { Content, PricingCard as PricingCardType } from "@/lib/content";

interface SelectedPackage {
  name: string;
  price: string;
}

function PricingCard({
  card,
  onSelect,
}: {
  card: PricingCardType;
  onSelect: (pkg: SelectedPackage) => void;
}) {
  const featured = Boolean(card.badge);
  const displayName = card.subtitle ? `${card.name} ${card.subtitle}` : card.name;
  const priceDisplay =
    card.price !== null
      ? `${card.price} €${card.unit ? ` ${card.unit}` : ""}`
      : (card.priceLabel ?? "");

  return (
    <div
      className={`relative flex flex-col gap-4 rounded-xl border p-6 transition ${
        featured
          ? "border-brand bg-brand"
          : "border-line bg-white hover:border-brand"
      }`}
    >
      {card.badge && (
        <span className="absolute -top-2.5 left-5 rounded bg-accent px-2.5 py-[3px] text-[10px] font-medium tracking-[0.04em] text-brand-dark">
          {card.badge}
        </span>
      )}

      <div className="flex flex-col gap-0.5">
        <p
          className={`text-[12px] font-medium uppercase tracking-[0.04em] ${
            featured ? "text-white/50" : "text-muted"
          }`}
        >
          {card.name}
        </p>
        {card.subtitle && (
          <p
            className={`text-sm font-medium ${
              featured ? "text-white" : "text-brand"
            }`}
          >
            {card.subtitle}
          </p>
        )}
      </div>

      <p
        className={`font-light leading-none tracking-[-0.02em] ${
          card.price !== null ? "text-[32px]" : "text-[20px]"
        } ${featured ? "text-white" : "text-brand"}`}
      >
        {card.price !== null ? (
          <>
            {card.price} €
            {card.unit && (
              <span
                className={`text-[13px] font-normal tracking-normal ${
                  featured ? "text-white/45" : "text-muted"
                }`}
              >
                {" "}
                {card.unit}
              </span>
            )}
          </>
        ) : (
          card.priceLabel
        )}
      </p>

      {card.description && (
        <p
          className={`text-[12px] leading-[1.5] ${
            featured ? "text-white/65" : "text-muted"
          }`}
        >
          {card.description}
        </p>
      )}

      <ul className="flex flex-1 flex-col gap-2">
        {card.features.map((feature) => (
          <li
            key={feature}
            className={`relative pl-4 text-[12px] leading-[1.5] ${
              featured ? "text-white/65" : "text-muted"
            }`}
          >
            <span
              className={`absolute left-0 top-[3px] text-[10px] ${
                featured ? "text-accent" : "text-accent-dark"
              }`}
            >
              —
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect({ name: displayName, price: priceDisplay })}
        className={
          featured
            ? "block rounded-md py-[9px] text-center text-[12px] font-medium tracking-[0.02em] transition border border-accent bg-accent text-brand-dark hover:border-accent-dark hover:bg-accent-dark"
            : "border border-brand text-brand hover:bg-brand hover:text-white transition-colors duration-200 rounded-lg py-2 px-4 w-full"
        }
      >
        {card.cta}
      </button>
    </div>
  );
}

export default function Pricing({ pricing }: { pricing: Content["pricing"] }) {
  const [activeId, setActiveId] = useState(pricing.tabs[0].id);
  const [selectedPackage, setSelectedPackage] =
    useState<SelectedPackage | null>(null);

  const activeTab =
    pricing.tabs.find((tab) => tab.id === activeId) ?? pricing.tabs[0];

  const gridClass =
    activeTab.id === "kn"
      ? "max-w-[860px] sm:grid-cols-2"
      : "max-w-[860px] md:grid-cols-3";

  return (
    <section id="cjenik" className="bg-white py-16 md:py-18">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
      <SectionLabel>{pricing.label}</SectionLabel>
      <h2 className="mb-8 text-[28px] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
        {pricing.title}
      </h2>

      <div className="mb-8 flex flex-wrap gap-1 rounded-lg border border-line bg-surface p-1 md:w-fit md:flex-nowrap">
        {pricing.tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={`rounded-[5px] px-4 py-[7px] text-[12px] tracking-[0.01em] transition ${
              tab.id === activeId
                ? "bg-brand font-medium text-white"
                : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-1 gap-4 ${gridClass}`}>
        {activeTab.cards.map((card) => (
          <PricingCard
            key={card.name}
            card={card}
            onSelect={setSelectedPackage}
          />
        ))}
      </div>

      {selectedPackage && (
        <PackageModal
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
          onClose={() => setSelectedPackage(null)}
        />
      )}
      </div>
    </section>
  );
}
