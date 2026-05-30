import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const content = getContent(locale);

  return (
    <>
      <Nav nav={content.nav} />
      <main>
        <Hero hero={content.hero} />
        <Services services={content.services} />
        <Pricing pricing={content.pricing} />
        <About about={content.about} />
        <Contact contact={content.contact} />
      </main>
      <Footer copy={content.footer.copy} legal={content.footer.legal} />
      <WhatsAppButton />
    </>
  );
}
