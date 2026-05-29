import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next.js 16 renamed `middleware` to `proxy`. next-intl's request handler
// works unchanged here — it just needs to be exported as `proxy`.
export const proxy = createMiddleware(routing);

export const config = {
  // Run on every path except API routes, Next internals and static files.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
