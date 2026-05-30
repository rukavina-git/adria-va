# Adria VA — Web stranica

Poslovna web stranica za **Adria VA**, obrt za virtualnu asistenciju.

## Tech stack

- [Next.js 16](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [next-intl](https://next-intl-docs.vercel.app/) — i18n (HR/EN)
- [Resend](https://resend.com/) — kontakt forma
- [Google reCAPTCHA v3](https://developers.google.com/recaptcha)

## Pokretanje lokalno

    git clone https://github.com/rukavina-git/adria-va.git
    cd adria-va
    npm install
    cp .env.example .env.local
    npm run dev

Otvori http://localhost:3000

## Environment varijable

    RESEND_API_KEY=
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
    RECAPTCHA_SECRET_KEY=

## Struktura projekta

    src/
      app/          # Next.js App Router, API routes
      components/   # React komponente (sections/, ui/)
      content/      # Sadržaj stranice (hr/, en/)
      lib/          # Resend, content helper
      i18n/         # next-intl konfiguracija
    assets/         # Statički resursi
    public/         # Javni resursi (slike)

## Deployment

Automatski deploy na Vercel pri svakom pushu na main granu.

Live: https://adriava.rukavina.app