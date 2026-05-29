import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["hr", "en"],
  defaultLocale: "hr",
});

export type Locale = (typeof routing.locales)[number];
