export default function Footer({ copy }: { copy: string }) {
  return (
    <footer className="flex flex-col gap-3 bg-brand-dark px-6 py-8 md:flex-row md:items-center md:justify-between md:px-12">
      <div className="text-sm font-medium uppercase tracking-[0.06em] text-white/60">
        Adria <span className="text-accent">VA</span>
      </div>
      <p className="text-[11px] text-white/25">{copy}</p>
    </footer>
  );
}
