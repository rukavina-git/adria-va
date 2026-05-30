"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface PackageModalProps {
  packageName: string;
  packagePrice: string;
  onClose: () => void;
}

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] text-ink outline-none transition focus:border-brand";
const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.06em] text-muted";

export default function PackageModal({
  packageName,
  packagePrice,
  onClose,
}: PackageModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [consentDeclined, setConsentDeclined] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    setConsentDeclined(localStorage.getItem("cookie_consent") === "declined");
    const handler = () =>
      setConsentDeclined(localStorage.getItem("cookie_consent") === "declined");
    window.addEventListener("cookie_consent_changed", handler);
    return () => window.removeEventListener("cookie_consent_changed", handler);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");

    try {
      const recaptchaToken = executeRecaptcha
        ? await executeRecaptcha("package_inquiry")
        : undefined;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          packageName,
          recaptchaToken,
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
      onClick={onClose}
    >
      <div
        className="mx-auto mt-24 mb-12 w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h3 className="text-xl font-normal text-ink">Zatražite ponudu</h3>
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

        <span className="inline-block rounded-full bg-brand-light px-4 py-1 text-sm text-brand">
          {packageName} — {packagePrice}
        </span>

        {status === "success" ? (
          <p className="mt-6 text-sm font-medium text-brand">
            ✓ Upit je uspješno poslan. Javit ćemo vam se u roku od 24 sata.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-name" className={labelClass}>
                Ime i prezime
              </label>
              <input
                id="modal-name"
                name="name"
                type="text"
                required
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-email" className={labelClass}>
                Email
              </label>
              <input
                id="modal-email"
                name="email"
                type="email"
                required
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-phone" className={labelClass}>
                Telefon
              </label>
              <input
                id="modal-phone"
                name="phone"
                type="tel"
                placeholder="npr. +385 91 234 5678"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-message" className={labelClass}>
                Poruka
              </label>
              <textarea
                id="modal-message"
                name="message"
                placeholder="Dodatne napomene ili pitanja..."
                className={`${inputClass} min-h-[90px] resize-none`}
              />
            </div>
            {consentDeclined ? (
              <p className="mt-1 text-[13px] text-muted">
                Za slanje poruke potrebno je prihvatiti kolačiće.
              </p>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 w-full rounded-md bg-brand px-7 py-3 text-[13px] font-medium tracking-[0.02em] text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Slanje..." : "Pošaljite upit"}
              </button>
            )}
            {status === "error" && (
              <p className="text-[13px] font-medium text-red-600">
                Došlo je do pogreške pri slanju. Pokušajte ponovno ili nam pišite
                izravno.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
