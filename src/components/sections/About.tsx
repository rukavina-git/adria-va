import SectionLabel from "@/components/ui/SectionLabel";
import type { Content } from "@/lib/content";

export default function About({ about }: { about: Content["about"] }) {
  return (
    <section id="o-meni" className="bg-surface px-6 py-16 md:px-12 md:py-18">
      <SectionLabel>{about.label}</SectionLabel>
      <h2 className="mb-10 text-[28px] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
        {about.title}
      </h2>
      <div className="grid max-w-[960px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 text-[14px] leading-[1.8] text-muted last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex aspect-[4/5] items-center justify-center rounded-xl border border-brand/10 bg-brand-light">
          <svg
            viewBox="0 0 24 24"
            className="h-12 w-12 text-brand opacity-25"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
