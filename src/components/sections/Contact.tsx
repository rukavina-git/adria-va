"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Content } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] text-ink outline-none transition focus:border-brand";
const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.06em] text-muted";

export default function Contact({ contact }: { contact: Content["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [messageCount, setMessageCount] = useState(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const form = contact.form;
  const errorMessages = contact.errors;
  const hasErrors = Object.values(errors).some(Boolean);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const data = new FormData(element);

    const name = (data.get("name") as string).trim();
    const email = (data.get("email") as string).trim();
    const message = (data.get("message") as string).trim();

    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name) newErrors.name = errorMessages.nameRequired;
    if (!email) newErrors.email = errorMessages.emailRequired;
    else if (!EMAIL_REGEX.test(email)) newErrors.email = errorMessages.emailInvalid;
    if (!message) newErrors.message = errorMessages.messageRequired;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const recaptchaToken = executeRecaptcha
        ? await executeRecaptcha("contact_form")
        : undefined;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          recaptchaToken,
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      element.reset();
      setMessageCount(0);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="kontakt" className="bg-surface py-16 md:py-18">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
      <SectionLabel>{contact.label}</SectionLabel>
      <h2 className="mb-10 text-[28px] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
        {contact.titleLead}
        {contact.titleAccent}
      </h2>

      <div className="grid max-w-[860px] grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h3 className="mb-3 text-[18px] font-normal text-ink">
            {contact.infoHeading}
          </h3>
          <p className="mb-6 text-[13px] leading-[1.7] text-muted">
            {contact.infoText}
          </p>
          <div className="mb-3 flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 flex-shrink-0 text-brand"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
            </svg>
            <a href="tel:+385919342948" className="text-[13px] text-muted transition-colors hover:text-brand">{contact.phone}</a>
          </div>
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 flex-shrink-0 text-brand"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a
                href={`mailto:${contact.email}`}
                className="text-[13px] text-muted underline underline-offset-2 transition-colors hover:text-ink"
              >
                {contact.email}
              </a>
          </div>
        </motion.div>

        <motion.form
          noValidate
          className="flex flex-col gap-3.5"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className={labelClass}>
                {form.nameLabel}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={form.namePlaceholder}
                className={inputClass}
                onBlur={(e) => {
                  const error = !e.target.value.trim() ? errorMessages.nameRequired : undefined;
                  if (error) setErrors(prev => ({ ...prev, name: error }));
                }}
                onChange={(e) => {
                  if (errors.name && e.target.value.trim()) setErrors(prev => ({ ...prev, name: undefined }));
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className={labelClass}>
                {form.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={form.emailPlaceholder}
                className={inputClass}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  const error = !v ? errorMessages.emailRequired : !EMAIL_REGEX.test(v) ? errorMessages.emailInvalid : undefined;
                  if (error) setErrors(prev => ({ ...prev, email: error }));
                }}
                onChange={(e) => {
                  if (errors.email) {
                    const v = e.target.value.trim();
                    if (v && EMAIL_REGEX.test(v)) setErrors(prev => ({ ...prev, email: undefined }));
                  }
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className={labelClass}>
              {form.messageLabel}
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                placeholder={form.messagePlaceholder}
                maxLength={500}
                className={`${inputClass} min-h-[100px] w-full resize-none`}
                onBlur={(e) => {
                  const error = !e.target.value.trim() ? errorMessages.messageRequired : undefined;
                  if (error) setErrors(prev => ({ ...prev, message: error }));
                }}
                onChange={(e) => {
                  setMessageCount(e.target.value.length);
                  if (errors.message && e.target.value.trim()) setErrors(prev => ({ ...prev, message: undefined }));
                }}
              />
              <span
                className={`absolute bottom-2 right-3 text-xs ${
                  messageCount >= 500 ? "text-red-500" : messageCount > 400 ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                {messageCount}/500
              </span>
            </div>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={hasErrors || status === "sending"}
            title={hasErrors ? "Molimo ispravite označena polja" : undefined}
            className="self-start rounded-md bg-brand px-7 py-3 text-[13px] font-medium tracking-[0.02em] text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? form.sending : form.submit}
          </button>
          {status === "success" && (
            <p className="text-[13px] font-medium text-brand">{form.success}</p>
          )}
          {status === "error" && (
            <p className="text-[13px] font-medium text-red-600">{form.error}</p>
          )}
        </motion.form>
      </div>
      </div>
    </section>
  );
}
