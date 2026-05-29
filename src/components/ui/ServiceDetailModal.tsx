"use client";

interface ServiceDetailModalProps {
  title: string;
  details: string;
  viewPricingCta: string;
  onClose: () => void;
}

export default function ServiceDetailModal({
  title,
  details,
  viewPricingCta,
  onClose,
}: ServiceDetailModalProps) {
  function handleViewPricing() {
    onClose();
    setTimeout(() => {
      document.getElementById("cjenik")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
      onClick={onClose}
    >
      <div
        className="mx-auto mt-24 mb-12 w-full max-w-lg rounded-xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h3 className="text-xl font-normal text-ink">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zatvori"
            className="-mt-1 -mr-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-muted transition hover:bg-surface hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <p className="text-[14px] leading-[1.75] text-muted">{details}</p>
        <button
          type="button"
          onClick={handleViewPricing}
          className="mt-8 rounded-md bg-brand px-6 py-2.5 text-[13px] font-medium tracking-[0.02em] text-white transition hover:bg-brand-dark"
        >
          {viewPricingCta}
        </button>
      </div>
    </div>
  );
}
