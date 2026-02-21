"use client";

import { useState, useRef } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const subjects = [
  "General inquiry",
  "Business support / services",
  "Events",
  "List my business in the directory",
  "Sponsorship opportunities",
  "Media / press",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Mailto fallback — replace with Formspree/Netlify Forms endpoint in production
    // Source: forestavenuebid.com/contact/ — real BID email address
    const mailto = `mailto:forestavebid@gmail.com?subject=${encodeURIComponent(
      `[Website] ${form.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "not provided"}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-[var(--text)] placeholder-[var(--muted)] bg-white focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? "border-red-400 focus:ring-red-200"
        : "border-[var(--border)] focus:border-[var(--brand-secondary)] focus:ring-[var(--brand-secondary)]/20"
    }`;

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div
          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
          style={{ background: "var(--brand-secondary)" }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-headline font-bold text-2xl text-[var(--brand-primary)]">
          Your email client has opened
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Complete and send the pre-filled email to reach us at{" "}
          <a href="mailto:forestavebid@gmail.com" className="text-[var(--brand-accent)] hover:underline">
            forestavebid@gmail.com
          </a>
          . We respond to all inquiries as soon as possible.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-[var(--brand-accent)] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Full name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass("name")}
            aria-required="true"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
            placeholder="Jane Smith"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Email address <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass("email")}
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            placeholder="jane@example.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Phone <span className="text-[var(--muted)] font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass("phone")}
            placeholder="(718) 555-0100"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={inputClass("subject")}
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--text)] mb-1.5">
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          className={inputClass("message")}
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
          placeholder="Tell us how we can help…"
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
        style={{ background: "var(--brand-primary)" }}
      >
        Send message
      </button>

      <p className="text-xs text-[var(--muted)]">
        This form opens your email client with a pre-filled message. To wire up
        server-side form handling, replace the <code>handleSubmit</code> function with a{" "}
        <a
          href="https://formspree.io"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--brand-primary)]"
        >
          Formspree
        </a>{" "}
        or Netlify Forms fetch call.
      </p>
    </form>
  );
}
