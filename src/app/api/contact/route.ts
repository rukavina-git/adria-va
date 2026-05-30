import { NextResponse } from "next/server";
import { resend, CONTACT_TO, CONTACT_FROM } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    packageName?: string;
    recaptchaToken?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const message = body.message?.trim();
  const packageName = body.packageName?.trim();
  const recaptchaToken = body.recaptchaToken;

  if (recaptchaToken) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (secret) {
      const verification = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${secret}&response=${recaptchaToken}`,
        },
      );
      const result = (await verification.json()) as { success: boolean; score: number };
      if (!result.success || result.score < 0.5) {
        return NextResponse.json({ error: "Verification failed" }, { status: 400 });
      }
    }
  }

  if (!name || !email) {
    return NextResponse.json(
      { error: "Ime i e-mail su obavezni." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Neispravna e-mail adresa." },
      { status: 400 },
    );
  }

  // No API key in this environment — let local development work without it.
  if (!resend) {
    console.warn("[contact] RESEND_API_KEY not set — returning mock success.");
    return NextResponse.json({ success: true });
  }

  const lines = [`Ime i prezime: ${name}`, `E-mail: ${email}`];
  if (phone) lines.push(`Telefon: ${phone}`);
  if (packageName) lines.push(`Paket: ${packageName}`);
  if (message) lines.push("", "Poruka:", message);

  const subject = packageName
    ? `Novi upit — ${packageName}`
    : "Nova poruka s web stranice";

  try {
    const { error } = await resend.emails.send({
      from: "adriava@rukavina.app",
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Slanje nije uspjelo." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Slanje nije uspjelo." }, { status: 500 });
  }
}
