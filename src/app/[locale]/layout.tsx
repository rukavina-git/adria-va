import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import RecaptchaProvider from "@/components/RecaptchaProvider";
import CookieBanner from "@/components/ui/CookieBanner";
import { routing } from "@/i18n/routing";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const BASE_URL = "https://adriava.rukavina.app";

const meta = {
  hr: {
    title: "Adria VA — Virtualni asistent za vaše poslovanje",
    description:
      "Profesionalna virtualna asistentica za društvene mreže, knjigovodstvo i administraciju. Prilagođeni paketi za poduzetnike. Zatražite ponudu danas.",
  },
  en: {
    title: "Adria VA — Virtual Assistant for Your Business",
    description:
      "Professional virtual assistant for social media, bookkeeping and administration. Custom packages for entrepreneurs. Request a quote today.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { title, description } = meta[locale as keyof typeof meta] ?? meta.hr;
  const url = `${BASE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    icons: { icon: "/favicon.svg" },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

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
          <CookieBanner />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
