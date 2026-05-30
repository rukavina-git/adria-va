"use client";

import { useState, useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function ConsentAwareRecaptchaProvider({
  children,
  siteKey,
}: {
  children: React.ReactNode;
  siteKey: string;
}) {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(localStorage.getItem("cookie_consent"));
    const handler = () => setConsent(localStorage.getItem("cookie_consent"));
    window.addEventListener("cookie_consent_changed", handler);
    return () => window.removeEventListener("cookie_consent_changed", handler);
  }, []);

  if (consent === "accepted") {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
        {children}
      </GoogleReCaptchaProvider>
    );
  }

  return <>{children}</>;
}
