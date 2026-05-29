import Button from "@/components/ui/Button";
import type { Content } from "@/lib/content";

export default function Hero({ hero }: { hero: Content["hero"] }) {
  return (
    <section
      className="relative bg-cover bg-center px-6 pt-44 pb-28 text-center md:px-12"
      style={{ backgroundImage: "url('/images/background-hero.jpg')" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8, 45, 60, 0.88) 0%, rgba(8, 45, 60, 0.72) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="max-w-[600px] text-5xl font-light leading-[1.15] tracking-[-0.01em] text-white md:text-6xl">
          {hero.titleLead}
          <em className="font-light text-accent">{hero.titleAccent}</em>
        </h1>
        <p className="mt-1 max-w-[420px] text-[15px] leading-[1.7] text-white/80">
          {hero.subtitle}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button href="#kontakt" variant="primary">
            {hero.ctaPrimary}
          </Button>
          <Button href="#cjenik" variant="ghost">
            {hero.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
