import Link from "next/link";

export default function Footer({
  copy,
  legal,
  recaptcha,
  locale,
}: {
  copy: string;
  legal: string;
  recaptcha: string;
  locale: string;
}) {
  const isEn = locale === "en";
  const privacyLinkText = isEn ? "Privacy Policy" : "Politici privatnosti";
  const privacyPrefix = isEn
    ? "Learn more about data processing in our "
    : "Saznajte više o obradi podataka u našoj ";

  return (
    <footer className="bg-brand-dark py-8">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm font-medium uppercase tracking-[0.06em] text-white/60">
            Adria <span className="text-accent">VA</span>
          </div>
          <p className="text-[11px] text-white/25">{copy}</p>
        </div>
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="whitespace-pre-line text-xs text-white/30">{legal}</p>
          <p
            className="mt-2 text-xs text-white/30 [&_a]:text-white/40 [&_a]:underline [&_a]:hover:text-white/60"
            dangerouslySetInnerHTML={{ __html: recaptcha }}
          />
          <p className="mt-2 text-xs text-white/30">
            {privacyPrefix}
            <Link
              href={`/${locale}/privacy`}
              className="text-white/50 underline underline-offset-2 transition-colors hover:text-white/70"
            >
              {privacyLinkText}
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
