"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/events", label: "Events" },
  { href: "/our-businesses", label: "Businesses" },
  { href: "/map", label: "Map" },
  // Team is accessible under the Contact submenu
];

const contactSubmenu = [
  { href: "/contact", label: "Contact" },
  { href: "/team", label: "Team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false); // mobile submenu

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setContactOpen(false);
  }, [pathname]);

  const isContactActive =
    pathname.startsWith("/contact") || pathname.startsWith("/team");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "nav-shadow" : "border-b border-[var(--border)]"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Forest Avenue BID — home"
        >
          <span
            className="flex items-center justify-center w-9 h-9 rounded-lg text-white font-bold text-sm"
            style={{ background: "var(--brand-primary)" }}
            aria-hidden="true"
          >
            FA
          </span>
          <span className="font-headline font-bold text-lg leading-tight text-[var(--brand-primary)] hidden sm:block">
            Forest Ave <span className="font-normal text-[var(--muted)]">BID</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                  active
                    ? "bg-[var(--brand-primary)] text-white"
                    : "text-[var(--text)] hover:bg-[var(--bg)] hover:text-[var(--brand-primary)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}

          {/* Contact dropdown */}
          <div className="relative group">
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 flex items-center gap-1 ${
                isContactActive
                  ? "bg-[var(--brand-primary)] text-white"
                  : "text-[var(--text)] hover:bg-[var(--bg)] hover:text-[var(--brand-primary)]"
              }`}
              aria-haspopup="true"
            >
              Contact
              <svg
                className="w-3.5 h-3.5 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Submenu — visible on group hover */}
            <div className="absolute top-full right-0 mt-1 w-36 bg-white rounded-xl shadow-wood-md border border-[var(--border)] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50 py-1">
              {contactSubmenu.map(({ href, label }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`block px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-[var(--brand-primary)] bg-[var(--bg)]"
                        : "text-[var(--text)] hover:bg-[var(--bg)] hover:text-[var(--brand-primary)]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            href="/contact"
            className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--brand-secondary)] text-white hover:bg-[var(--brand-accent)] transition-colors duration-150"
          >
            Get in Touch
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-md text-[var(--text)] hover:bg-[var(--bg)] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[var(--border)] bg-white"
        >
          <ul className="container-wide py-3 flex flex-col gap-1" role="list">
            {navLinks.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-[var(--brand-primary)] text-white"
                        : "text-[var(--text)] hover:bg-[var(--bg)]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

            {/* Contact with Team submenu */}
            <li>
              <div className="flex items-center rounded-lg overflow-hidden">
                <Link
                  href="/contact"
                  className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                    pathname.startsWith("/contact")
                      ? "bg-[var(--brand-primary)] text-white"
                      : "text-[var(--text)] hover:bg-[var(--bg)]"
                  }`}
                >
                  Contact
                </Link>
                <button
                  onClick={() => setContactOpen((v) => !v)}
                  className="px-3 py-2.5 text-[var(--muted)] hover:bg-[var(--bg)] transition-colors border-l border-[var(--border)]"
                  aria-expanded={contactOpen}
                  aria-label="Toggle Contact submenu"
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${contactOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {contactOpen && (
                <ul className="ml-4 mt-1 space-y-1" role="list">
                  {contactSubmenu.map(({ href, label }) => {
                    const active = pathname.startsWith(href);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            active
                              ? "bg-[var(--brand-primary)] text-white"
                              : "text-[var(--text)] hover:bg-[var(--bg)]"
                          }`}
                          aria-current={active ? "page" : undefined}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
