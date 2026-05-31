"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Content } from "@/lib/content";

const quotes = {
  hr: { open: "„", close: "”" },
  en: { open: "“", close: "”" },
};

export default function Testimonials({
  testimonials,
}: {
  testimonials: Content["testimonials"];
}) {
  const locale = useLocale();
  const { open, close } = quotes[locale as keyof typeof quotes] ?? quotes.hr;

  return (
    <section className="bg-surface py-16 md:py-18">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
        <SectionLabel>{testimonials.label}</SectionLabel>
        <h2 className="mb-10 text-[28px] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
          {testimonials.title}
        </h2>

        {/* Mobile: scroll-snap carousel */}
        <div className="flex gap-4 overflow-x-auto scroll-smooth pb-2 md:hidden"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
          {testimonials.items.map((item, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 scroll-snap-align-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <TestimonialCard item={item} open={open} close={close} />
            </div>
          ))}
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
            >
              <TestimonialCard item={item} open={open} close={close} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
  open,
  close,
}: {
  item: { quote: string; author: string; detail: string; avatar: string };
  open: string;
  close: string;
}) {
  return (
    <div className="relative flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand/30 hover:shadow-md">
      <div className="mb-3 text-sm text-accent">{"★★★★★"}</div>
      <p className="flex-1 text-sm italic leading-relaxed text-gray-600">{open}{item.quote}{close}</p>
      <div className="mt-auto border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3">
          <Image
            src={item.avatar}
            alt={item.author}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover object-top"
          />
          <div>
            <p className="text-sm font-medium text-brand">{item.author}</p>
            <p className="text-xs text-gray-400">{item.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
