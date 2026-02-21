import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Forest Avenue BID. Email us at forestavebid@gmail.com or call 718-816-4775.",
};

// Source: forestavenuebid.com/contact/
const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    // Source: forestavenuebid.com/contact/
    value: "686 Forest Ave\nStaten Island, NY 10310",
    href: "https://maps.google.com/?q=686+Forest+Ave+Staten+Island+NY+10310",
    external: true,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    // Source: forestavenuebid.com/contact/
    value: "718-816-4775",
    href: "tel:7188164775",
    external: false,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    // Source: forestavenuebid.com/contact/
    value: "forestavebid@gmail.com",
    href: "mailto:forestavebid@gmail.com",
    external: false,
  },
];

// Source: forestavenuebid.com/contact/
const socialLinks = [
  {
    href: "https://www.facebook.com/ForestAveBID/",
    label: "Facebook",
    path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
  {
    href: "https://www.instagram.com/forestavebid/",
    label: "Instagram",
    path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z",
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Get in touch"
        // Source: forestavenuebid.com/contact/
        title="Contact Us"
        subtitle="Have any questions? We are always open to talk about your business, community, opportunities, or how we can help you."
        woodTexture
      />

      <section className="section-padding bg-[var(--bg)]" aria-labelledby="contact-heading">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info — Source: forestavenuebid.com/contact/ */}
            <aside>
              <SectionHeading
                // Source: forestavenuebid.com/contact/ — "Get In Touch" heading
                eyebrow="Get in touch"
                title="Talk to us"
              />
              <ul className="mt-8 space-y-6" role="list">
                {contactInfo.map((info) => (
                  <li key={info.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white"
                      style={{ background: "var(--brand-primary)" }}
                      aria-hidden="true"
                    >
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.external ? "_blank" : undefined}
                          rel={info.external ? "noopener noreferrer" : undefined}
                          className="text-sm text-[var(--text)] hover:text-[var(--brand-accent)] transition-colors whitespace-pre-line"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[var(--text)] whitespace-pre-line">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Social — Source: forestavenuebid.com/contact/ — "Follow Us" section */}
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-4">
                  Follow us
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in new tab)`}
                      className="w-10 h-10 rounded-xl border border-[var(--border)] bg-white flex items-center justify-center text-[var(--muted)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                  <a
                    href="https://youtube.com/@forestavenuebid"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube (opens in new tab)"
                    className="w-10 h-10 rounded-xl border border-[var(--border)] bg-white flex items-center justify-center text-[var(--muted)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>

            {/* Form — mailto directs to real BID email */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[var(--border)] p-8">
                <h2 className="font-headline font-bold text-2xl text-[var(--brand-primary)] mb-6">
                  Send us a message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
