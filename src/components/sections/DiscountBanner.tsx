import type { Content } from "@/lib/content";

export default function DiscountBanner({
  banner,
}: {
  banner: Content["discountBanner"];
}) {
  return (
    <section className="bg-brand py-8 px-6 md:px-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-accent">
          {banner.label}
        </span>
        <p className="max-w-2xl text-xl font-normal text-white md:text-2xl">
          {banner.title}
        </p>
        <p className="text-sm text-white/60">{banner.subtitle}</p>
        <a
          href="#kontakt"
          className="mt-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-brand-dark transition hover:bg-accent-dark"
        >
          {banner.cta}
        </a>
      </div>
    </section>
  );
}
