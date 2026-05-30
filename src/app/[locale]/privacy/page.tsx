import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const content = {
  hr: {
    back: "← Povratak",
    title: "Politika privatnosti",
    sections: [
      {
        heading: "Voditelj obrade podataka",
        body: "Ana Marija Rukavina, Obrt Adria VA – za virtualnu asistenciju, Česvinica, Hrvatska\nE-mail: adriava@rukavina.app",
      },
      {
        heading: "Podaci koji se prikupljaju",
        body: "Putem kontakt forme i forme za paketni upit prikupljamo sljedeće osobne podatke: ime i prezime, adresu e-pošte, broj telefona (neobavezno) te sadržaj poruke.",
      },
      {
        heading: "Svrha i osnova obrade",
        body: "Vaše osobne podatke obrađujemo isključivo u svrhu odgovaranja na vaš upit. Pravna osnova obrade je legitimni interes voditelja obrade (čl. 6 st. 1 t. f GDPR-a) ili vaša privola izražena slanjem poruke.",
      },
      {
        heading: "Primatelji podataka i prijenos u treće zemlje",
        body: "Poruke se isporučuju putem servisa Resend (Resend Inc., SAD). Prijenos osobnih podataka u SAD odvija se temeljem standardnih ugovornih klauzula (SCC) sukladno čl. 46 GDPR-a.",
      },
      {
        heading: "Google reCAPTCHA v3",
        body: "Za zaštitu od automatiziranih spam poruka koristimo Google reCAPTCHA v3. Ovaj servis automatski obrađuje podatke o ponašanju korisnika (IP adresa, interakcija s web stranicom) radi procjene rizika. Na tu obradu primjenjuje se Googleova politika privatnosti dostupna na: https://policies.google.com/privacy",
      },
      {
        heading: "Rok čuvanja podataka",
        body: "Osobne podatke čuvamo samo onoliko dugo koliko je potrebno za rješavanje vašeg upita. Nakon toga se podaci brišu.",
      },
      {
        heading: "Vaša prava",
        body: "Sukladno GDPR-u, imate pravo na: pristup vašim osobnim podacima, ispravak netočnih podataka, brisanje podataka (pravo na zaborav), ograničenje obrade, prigovor na obradu te prenosivost podataka. Za ostvarivanje navedenih prava obratite se na: adriava@rukavina.app",
      },
      {
        heading: "Pravo na prigovor nadzornom tijelu",
        body: "Ako smatrate da obrada vaših podataka krši GDPR, imate pravo podnijeti prigovor Agenciji za zaštitu osobnih podataka (AZOP), www.azop.hr.",
      },
    ],
  },
  en: {
    back: "← Back",
    title: "Privacy Policy",
    sections: [
      {
        heading: "Data Controller",
        body: "Ana Marija Rukavina, Adria VA Sole Proprietorship – Virtual Assistant Services, Česvinica, Croatia\nEmail: adriava@rukavina.app",
      },
      {
        heading: "Data Collected",
        body: "Through the contact form and package inquiry form we collect the following personal data: full name, email address, phone number (optional), and message content.",
      },
      {
        heading: "Purpose and Legal Basis",
        body: "We process your personal data solely for the purpose of responding to your inquiry. The legal basis for processing is legitimate interest (Art. 6(1)(f) GDPR) or your consent given when submitting the form.",
      },
      {
        heading: "Recipients and Third-Country Transfers",
        body: "Messages are delivered via Resend (Resend Inc., USA). The transfer of personal data to the USA takes place under Standard Contractual Clauses (SCCs) pursuant to Art. 46 GDPR.",
      },
      {
        heading: "Google reCAPTCHA v3",
        body: "We use Google reCAPTCHA v3 to protect against automated spam. This service automatically processes data about user behaviour (IP address, site interaction) to assess risk. This processing is governed by Google's Privacy Policy: https://policies.google.com/privacy",
      },
      {
        heading: "Retention Period",
        body: "We retain personal data only as long as necessary to resolve your inquiry, after which it is deleted.",
      },
      {
        heading: "Your Rights",
        body: "Under the GDPR you have the right to: access your personal data, rectification of inaccurate data, erasure (right to be forgotten), restriction of processing, objection to processing, and data portability. To exercise these rights contact: adriava@rukavina.app",
      },
      {
        heading: "Right to Lodge a Complaint",
        body: "If you believe that the processing of your data violates the GDPR, you have the right to lodge a complaint with the Croatian Personal Data Protection Agency (AZOP), www.azop.hr.",
      },
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 md:px-12">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-block text-sm text-muted hover:text-ink"
        >
          {c.back}
        </Link>
        <h1 className="mb-10 text-3xl font-normal tracking-tight text-ink">
          {c.title}
        </h1>
        <div className="flex flex-col gap-8">
          {c.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-2 text-base font-medium text-ink">
                {section.heading}
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
