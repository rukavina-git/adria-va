"use client";

import { useState } from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import type { Content } from "@/lib/content";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Nav({ nav, locale: _locale }: { nav: Content["nav"]; locale: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: "usluge", label: nav.services },
    { id: "cjenik", label: nav.pricing },
    { id: "o-meni", label: nav.about },
    { id: "kontakt", label: nav.contact },
  ];

  return (
    <nav className="sticky top-0 z-50 h-20 border-b border-white/10 bg-brand-dark">
      <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-6 md:px-12">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-medium uppercase tracking-[0.06em] text-white"
        >
          Adria <span className="font-semibold text-accent">VA</span>
        </button>

        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="text-sm tracking-[0.02em] text-white transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
          <button
            type="button"
            className="md:hidden text-white p-1"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed left-0 right-0 top-20 z-40 flex flex-col bg-brand-dark py-4 md:hidden">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => { scrollTo(link.id); setIsOpen(false); }}
              className="block px-6 py-3 text-base text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <div className="px-6 py-3">
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
