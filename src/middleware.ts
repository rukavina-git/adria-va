import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

const HR_COUNTRIES = ["HR", "BA", "RS", "SI", "ME", "MK", "XK"];

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const country = request.geo?.country;
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    const langs = acceptLanguage
      .split(",")
      .map((l) => l.split(";")[0].trim().toLowerCase());
    const isHrLang = langs.some((l) => /^(hr|bs|sr)/.test(l));
    const isEnLang = langs.some((l) => /^en/.test(l));

    let locale = "hr";

    if (country && HR_COUNTRIES.includes(country)) {
      locale = "hr";
    } else if (country && !HR_COUNTRIES.includes(country)) {
      locale = isEnLang && !isHrLang ? "en" : "hr";
    } else {
      locale = isEnLang && !isHrLang ? "en" : "hr";
    }

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
