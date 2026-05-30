"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import hr from "@/content/hr/index.json";
import en from "@/content/en/index.json";

const contentMap = { hr, en };
const privacyLinkWord = { hr: "Politici privatnosti", en: "Privacy Policy" };

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] === "en" ? "en" : "hr";

  useEffect(() => {
    if (localStorage.getItem("cookie_consent") === null) {
      setVisible(true);
    }
  }, []);

  function handleChoice(value: "accepted" | "declined") {
    localStorage.setItem("cookie_consent", value);
    window.dispatchEvent(new Event("cookie_consent_changed"));
    setVisible(false);
  }

  if (!visible) return null;

  const bannerText = contentMap[locale].cookies.bannerText;
  const linkWord = privacyLinkWord[locale];
  const [before, after] = bannerText.split(linkWord);

  return (
    <div className="fixed bottom-4 right-4 z-50 mx-4 mb-4 w-full max-w-lg rounded-xl border border-white/10 bg-brand-dark p-5 shadow-2xl">
      <p className="mb-4 text-sm text-white/70">
        {before}
        <Link href={`/${locale}/privacy`} className="underline hover:text-white">
          {linkWord}
        </Link>
        {after}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleChoice("declined")}
          className="rounded-md border border-white/40 px-4 py-2 text-sm text-white transition hover:border-white/70"
        >
          Odbijam
        </button>
        <button
          type="button"
          onClick={() => handleChoice("accepted")}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-brand-dark transition hover:bg-accent-dark"
        >
          Prihvaćam
        </button>
      </div>
    </div>
  );
}
