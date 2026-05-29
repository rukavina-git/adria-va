import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

// Null when no key is configured — the contact route falls back to a mock
// success so local development works without RESEND_API_KEY.
export const resend = apiKey ? new Resend(apiKey) : null;

// Inbox that receives contact submissions.
export const CONTACT_TO = "info@adria-va.hr";

// Verified sender. Defaults to Resend's shared test sender so the form works
// before a custom domain is verified; override with RESEND_FROM in production.
export const CONTACT_FROM =
  process.env.RESEND_FROM ?? "Adria VA <onboarding@resend.dev>";
