import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Content } from "@/lib/content";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function About({ about }: { about: Content["about"] }) {
  return (
    <section id="o-meni" className="bg-surface py-16 md:py-18">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
        <SectionLabel>{about.label}</SectionLabel>
        <h2 className="mb-10 text-[28px] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
          {about.title}
        </h2>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mb-4 text-[14px] leading-[1.8] text-muted last:mb-0"
              >
                {paragraph}
              </p>
            ))}
            <a
              href={about.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-dark"
            >
              <InstagramIcon />
              {about.instagramCta}
            </a>
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
      </div>
    </section>
  );
}
