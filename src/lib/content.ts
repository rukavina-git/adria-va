import hr from "@/content/hr/index.json";
import en from "@/content/en/index.json";
import type { Locale } from "@/i18n/routing";

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  details?: string[];
}

export interface PricingCard {
  name: string;
  subtitle?: string;
  price: number | null;
  priceLabel?: string;
  unit: string | null;
  badge?: string | null;
  description?: string;
  features: string[];
  cta: string;
}

export interface PricingTab {
  id: string;
  label: string;
  cards: PricingCard[];
}

export interface ContactErrors {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  messageRequired: string;
}

export interface ContactForm {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
}

export interface Content {
  nav: { services: string; about: string; pricing: string; contact: string };
  hero: {
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: { label: string; title: string; learnMore: string; viewPricing: string; items: ServiceItem[] };
  about: { label: string; title: string; paragraphs: string[]; instagramUrl: string; instagramCta: string };
  pricing: { label: string; title: string; tabs: PricingTab[] };
  contact: {
    label: string;
    titleLead: string;
    titleAccent: string;
    infoHeading: string;
    infoText: string;
    phone: string;
    email: string;
    form: ContactForm;
    errors: ContactErrors;
  };
  testimonials: {
    label: string;
    title: string;
    items: { quote: string; author: string; detail: string; avatar: string }[];
  };
  footer: { instagram: string; facebook: string; copy: string; legal: string; recaptcha: string };
}

const content: Record<Locale, Content> = {
  hr: hr as Content,
  en: en as Content,
};

export function getContent(locale: Locale): Content {
  return content[locale];
}
