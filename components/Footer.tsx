import Link from "next/link";
import { socialLinks } from "@/lib/socialLinks";
import Image from "next/image";
import { imageManifest } from "@/lib/imageManifest";

// Source: forestavenuebid.com/contact/
const CONTACT = {
  address: "686 Forest Ave, Staten Island, NY 10310",
  phone: "718-816-4775",
  email: "forestavebid@gmail.com",
  facebook: socialLinks.forestAveBid.facebook,
  instagram: socialLinks.forestAveBid.instagram,
  youtube: socialLinks.forestAveBid.youtube,
};

const footerNav = [
  {
    heading: "Explore",
    links: [
      { href: "/about", label: "About the BID" },
      { href: "/services", label: "Services" },
      { href: "/events", label: "Events" },
      { href: "/our-businesses", label: "Our Businesses" },
    ],
  },
  {
    heading: "Organization",
    links: [
      { href: "/team", label: "Our Team" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="wood-bg-hero text-white mt-auto"
      aria-label="Site footer"
    >
      <div className="container-wide py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand column */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 group mb-4"
            aria-label="Forest Avenue BID home"
          >
            <span className="relative h-11 w-[92px] overflow-hidden rounded bg-white/10">
              <Image
                src={imageManifest.siteLogo}
                alt="Forest Avenue BID logo"
                fill
                className="object-contain"
                sizes="92px"
              />
            </span>
            <span className="font-headline font-bold text-lg text-white">
              Forest Ave BID
            </span>
          </Link>
          <p className="text-white/75 text-sm leading-relaxed max-w-xs">
            Supporting local businesses and building community along Forest
            Avenue — from Hart Blvd to Broadway, Staten Island, NY.
          </p>
          {/* Social links — Source: forestavenuebid.com/contact/ */}
          <div className="mt-5 flex gap-3">
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook (opens in new tab)"
              className="social-pop ui-bounce crazy-spin w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (opens in new tab)"
              className="social-pop ui-bounce crazy-spin w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={CONTACT.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube (opens in new tab)"
              className="social-pop ui-bounce crazy-spin w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Nav columns */}
        {footerNav.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="font-headline font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">
              {col.heading}
            </h3>
            <ul className="space-y-2.5" role="list">
              {col.links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Contact — Source: forestavenuebid.com/contact/ */}
        <div>
          <h3 className="font-headline font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">
            Contact
          </h3>
          <address className="not-italic space-y-2.5 text-sm text-white/80">
            <p>{CONTACT.address}</p>
            <p>
              <a
                href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}
                className="hover:text-white transition-colors"
              >
                {CONTACT.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-white transition-colors"
              >
                {CONTACT.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>
            &copy; {year} Forest Avenue Business Improvement District. All rights reserved.
          </p>
          <p>Staten Island, New York</p>
        </div>
      </div>
    </footer>
  );
}
