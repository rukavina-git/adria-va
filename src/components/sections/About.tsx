import Image from "next/image";
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
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-brand/10 bg-brand-light">
          {/* TODO: replace with real photo */}
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
            alt="Adria VA"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </div>
      </div>
    </section>
  );
}
