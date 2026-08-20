"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { imageManifest } from "@/lib/imageManifest";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/events", label: "Events" },
  { href: "/our-businesses", label: "Businesses" },
  { href: "/map", label: "Map" },
];

const contactSubmenu = [
  { href: "/contact", label: "Contact" },
  { href: "/team", label: "Team" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const currentPathname = pathname.replace(/\/$/, "") || "/";
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setContactOpen(false);
  }, [currentPathname]);

  useEffect(() => {
    if (!contactOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!contactRef.current?.contains(event.target as Node)) {
        setContactOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setContactOpen(false);
        contactButtonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [contactOpen]);

  useEffect(() => {
    if (!open) return;

    const menu = mobileMenuRef.current;
    const mobileButton = mobileButtonRef.current;
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    background.forEach((element) => {
      element.inert = true;
    });

    const timer = window.setTimeout(() => {
      menu?.querySelector<HTMLElement>('a[href]')?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menu) return;
      const menuItems = Array.from(
        menu.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')
      );
      const focusable = mobileButton ? [mobileButton, ...menuItems] : menuItems;
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      background.forEach((element) => {
        element.inert = false;
      });
      mobileButton?.focus();
    };
  }, [open]);

  const contactActive = contactSubmenu.some((item) => isActivePath(currentPathname, item.href));
  const navTextClass = "text-white/78 hover:text-white";
  const underlineClass =
    "after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-[var(--brand-secondary)] after:transition-transform after:duration-200";

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 isolate border-b border-white/12 bg-[var(--brand-primary)]/95 text-white shadow-[0_10px_30px_rgba(16,41,14,0.22)] backdrop-blur-md">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Forest Avenue BID — home">
            <span className="relative h-10 w-[82px] overflow-hidden rounded-md bg-white/95 p-1 shadow-sm" aria-hidden="true">
              <Image
                src={imageManifest.siteLogo}
                alt="Forest Avenue BID logo"
                fill
                className="object-contain p-1"
                sizes="82px"
                priority
              />
            </span>
            <span className="hidden font-headline text-lg font-bold leading-tight text-white md:block">
              Forest Ave <span className="font-normal text-white/72">BID</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {navLinks.map(({ href, label }) => {
              const active = isActivePath(currentPathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex h-16 items-center text-sm font-semibold transition-colors ${underlineClass} ${
                    active
                      ? "text-[var(--brand-secondary)] after:scale-x-100"
                      : `${navTextClass} after:scale-x-0 hover:after:scale-x-100`
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}

            <div
              ref={contactRef}
              className="relative"
              onMouseEnter={() => setContactOpen(true)}
              onMouseLeave={() => setContactOpen(false)}
            >
              <button
                ref={contactButtonRef}
                type="button"
                onClick={() => setContactOpen((value) => !value)}
                aria-expanded={contactOpen}
                aria-haspopup="true"
                aria-controls={contactOpen ? "desktop-contact-menu" : undefined}
                className={`relative flex h-16 items-center gap-1 text-sm font-semibold transition-colors ${underlineClass} ${
                  contactActive
                    ? "text-[var(--brand-secondary)] after:scale-x-100"
                    : `${navTextClass} after:scale-x-0 hover:after:scale-x-100`
                }`}
              >
                Contact
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${contactOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id="desktop-contact-menu"
                className={`absolute right-0 top-full min-w-[150px] pt-3 transition-all duration-150 ${
                  contactOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[var(--evergreen-900)] shadow-[0_16px_40px_rgba(16,41,14,0.38)]">
                  {contactSubmenu.map(({ href, label }) => {
                    const active = isActivePath(currentPathname, href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/8 ${
                          active ? "text-[var(--brand-secondary)]" : "text-white/75 hover:text-white"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="rounded-full bg-[var(--brand-secondary)] px-5 py-2.5 text-sm font-bold text-[var(--brand-primary)] transition-colors hover:bg-white"
            >
              Get in Touch
            </Link>
          </nav>

          <div className="flex items-center gap-1 lg:hidden">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--brand-secondary)] px-3.5 py-2 text-sm font-bold text-[var(--brand-primary)] transition-colors hover:bg-white"
            >
              Contact
            </Link>
            <button
              ref={mobileButtonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-white"
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            >
              <span aria-hidden="true" className="relative block h-5 w-7">
                <span className={`absolute left-0 h-0.5 w-7 rounded-full bg-current transition-[top,transform] duration-200 ease-out ${open ? "top-[9px] rotate-45" : "top-0 rotate-0"}`} />
                <span className={`absolute left-0 top-[9px] h-0.5 w-7 rounded-full bg-current transition-[opacity,transform] duration-150 ease-out ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`} />
                <span className={`absolute left-0 h-0.5 w-7 rounded-full bg-current transition-[top,transform] duration-200 ease-out ${open ? "top-[9px] -rotate-45" : "top-[18px] rotate-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col gap-2 overflow-y-auto bg-[var(--brand-primary)] px-5 pb-8 pt-6 text-white transition-all duration-200 lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        {navLinks.map(({ href, label }) => {
          const active = isActivePath(currentPathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`border-l-2 py-3 pl-3 font-headline text-xl font-bold transition-colors ${
                active
                  ? "border-l-[var(--brand-secondary)] text-[var(--brand-secondary)]"
                  : "border-l-transparent text-white/85 hover:text-white"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}

        <div className="border-t border-white/10 pt-3">
          <p className="mb-1 pl-3 text-xs font-semibold uppercase tracking-widest text-white/45">Contact</p>
          {contactSubmenu.map(({ href, label }) => {
            const active = isActivePath(currentPathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`block border-l-2 py-3 pl-3 font-headline text-xl font-bold transition-colors ${
                  active
                    ? "border-l-[var(--brand-secondary)] text-[var(--brand-secondary)]"
                    : "border-l-transparent text-white/85 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="mt-3 rounded-xl bg-[var(--brand-secondary)] px-6 py-4 text-center font-headline text-lg font-bold text-[var(--brand-primary)]"
        >
          Get in Touch
        </Link>
      </div>
    </>
  );
}
