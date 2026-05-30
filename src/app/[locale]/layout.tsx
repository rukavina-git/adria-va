import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import RecaptchaProvider from "@/components/RecaptchaProvider";
import { routing } from "@/i18n/routing";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adria VA — Virtualni asistent | Split, Hrvatska",
  description:
    "Delegirajte administrativne, računovodstvene i marketing zadatke. Virtualni asistent za poduzetnike koji žele rasti.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${dmSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <RecaptchaProvider siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </RecaptchaProvider>
      </body>
    </html>
  );
}
