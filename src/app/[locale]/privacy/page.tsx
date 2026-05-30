import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const linkClass =
  "text-brand underline underline-offset-2 hover:opacity-70 transition-opacity";

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

  const isEn = locale === "en";

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-dark px-6 py-12">
        <div className="mx-auto w-full max-w-5xl md:px-12">
          <Link
            href={`/${locale}`}
            className="mb-6 inline-block text-sm text-white/60 transition-colors hover:text-white"
          >
            {isEn ? "← Back" : "← Natrag"}
          </Link>
          <h1 className="text-2xl font-medium text-white">
            {isEn ? "Privacy Policy" : "Pravila privatnosti"}
          </h1>
          <p className="mt-1 text-sm text-white/50">
            {isEn ? "Last updated: May 30, 2026." : "Zadnja izmjena: 30. svibnja 2026."}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-12 md:px-12">
        <div className="flex flex-col gap-8">

          <div>
            <h2 className="mb-2 text-base font-medium text-brand">
              {isEn ? "Data Controller" : "Voditelj obrade podataka"}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {isEn ? (
                <>
                  Ana Marija Rukavina, Adria VA Sole Proprietorship – Virtual
                  Assistant Services, Česvinica, Croatia
                  <br />
                  Email:{" "}
                  <a href="mailto:adriava@rukavina.app" className={linkClass}>
                    adriava@rukavina.app
                  </a>
                </>
              ) : (
                <>
                  Ana Marija Rukavina, Obrt Adria VA – za virtualnu
                  asistenciju, Česvinica, Hrvatska
                  <br />
                  E-mail:{" "}
                  <a href="mailto:adriava@rukavina.app" className={linkClass}>
                    adriava@rukavina.app
                  </a>
                </>
              )}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-brand">
              {isEn ? "Data Collected" : "Podaci koji se prikupljaju"}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {isEn
                ? "Through the contact form and package inquiry form we collect the following personal data: full name, email address, phone number (optional), and message content."
                : "Putem kontakt forme i forme za paketni upit prikupljamo sljedeće osobne podatke: ime i prezime, adresu e-pošte, broj telefona (neobavezno) te sadržaj poruke."}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-brand">
              {isEn ? "Purpose and Legal Basis" : "Svrha i osnova obrade"}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {isEn
                ? "We process your personal data solely for the purpose of responding to your inquiry. The legal basis for processing is legitimate interest (Art. 6(1)(f) GDPR) or your consent given when submitting the form."
                : "Vaše osobne podatke obrađujemo isključivo u svrhu odgovaranja na vaš upit. Pravna osnova obrade je legitimni interes voditelja obrade (čl. 6 st. 1 t. f GDPR-a) ili vaša privola izražena slanjem poruke."}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-brand">
              {isEn
                ? "Recipients and Third-Country Transfers"
                : "Primatelji podataka i prijenos u treće zemlje"}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {isEn
                ? "Messages are delivered via Resend (Resend Inc., USA). The transfer of personal data to the USA takes place under Standard Contractual Clauses (SCCs) pursuant to Art. 46 GDPR."
                : "Poruke se isporučuju putem servisa Resend (Resend Inc., SAD). Prijenos osobnih podataka u SAD odvija se temeljem standardnih ugovornih klauzula (SCC) sukladno čl. 46 GDPR-a."}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-brand">
              Google reCAPTCHA v3
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {isEn ? (
                <>
                  We use Google reCAPTCHA v3 to protect against automated spam.
                  This service automatically processes data about user behaviour
                  (IP address, site interaction) to assess risk. This processing
                  is governed by{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  .
                </>
              ) : (
                <>
                  Za zaštitu od automatiziranih spam poruka koristimo Google
                  reCAPTCHA v3. Ovaj servis automatski obrađuje podatke o
                  ponašanju korisnika (IP adresa, interakcija s web stranicom)
                  radi procjene rizika. Na tu obradu primjenjuje se{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Googleova politika privatnosti
                  </a>
                  .
                </>
              )}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-brand">
              {isEn ? "Retention Period" : "Rok čuvanja podataka"}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {isEn
                ? "We retain personal data only as long as necessary to resolve your inquiry, after which it is deleted."
                : "Osobne podatke čuvamo samo onoliko dugo koliko je potrebno za rješavanje vašeg upita. Nakon toga se podaci brišu."}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-brand">
              {isEn ? "Your Rights" : "Vaša prava"}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {isEn ? (
                <>
                  Under the GDPR you have the right to: access your personal
                  data, rectification of inaccurate data, erasure (right to be
                  forgotten), restriction of processing, objection to
                  processing, and data portability. To exercise these rights
                  contact:{" "}
                  <a href="mailto:adriava@rukavina.app" className={linkClass}>
                    adriava@rukavina.app
                  </a>
                </>
              ) : (
                <>
                  Sukladno GDPR-u, imate pravo na: pristup vašim osobnim
                  podacima, ispravak netočnih podataka, brisanje podataka
                  (pravo na zaborav), ograničenje obrade, prigovor na obradu te
                  prenosivost podataka. Za ostvarivanje navedenih prava
                  obratite se na:{" "}
                  <a href="mailto:adriava@rukavina.app" className={linkClass}>
                    adriava@rukavina.app
                  </a>
                </>
              )}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-brand">
              {isEn
                ? "Right to Lodge a Complaint"
                : "Pravo na prigovor nadzornom tijelu"}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {isEn ? (
                <>
                  If you believe that the processing of your personal data
                  violates the GDPR, you have the right to lodge a complaint
                  with the competent supervisory authority. In Croatia, this is
                  the Croatian Personal Data Protection Agency (AZOP), available
                  at{" "}
                  <a
                    href="https://www.azop.hr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    www.azop.hr
                  </a>
                  .
                </>
              ) : (
                <>
                  Ako smatrate da obrada vaših osobnih podataka krši GDPR,
                  imate pravo podnijeti pritužbu nadležnom nadzornom tijelu. U
                  Republici Hrvatskoj to je Agencija za zaštitu osobnih
                  podataka (AZOP), dostupna na{" "}
                  <a
                    href="https://www.azop.hr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    www.azop.hr
                  </a>
                  .
                </>
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
