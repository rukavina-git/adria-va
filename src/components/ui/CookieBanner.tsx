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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 max-w-md w-full mx-4 rounded-xl bg-white p-5 shadow-xl z-50">
      <p className="mb-4 text-sm text-gray-700">
        {before}
        <Link href={`/${locale}/privacy`} className="text-brand underline">
          {linkWord}
        </Link>
        {after}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleChoice("declined")}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          {contentMap[locale].cookies.decline}
        </button>
        <button
          type="button"
          onClick={() => handleChoice("accepted")}
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-dark"
        >
          {contentMap[locale].cookies.accept}
        </button>
      </div>
    </div>
  );
}
