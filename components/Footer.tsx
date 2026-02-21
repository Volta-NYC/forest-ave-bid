import Link from "next/link";

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
      { href: "/team", label: "Board of Directors" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-white mt-auto"
      style={{ background: "var(--brand-primary)" }}
      aria-label="Site footer"
    >
      <div className="container-wide py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand column */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 group mb-4"
            aria-label="Forest Avenue BID home"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/20 text-white font-bold text-sm">
              FA
            </span>
            <span className="font-headline font-bold text-lg text-white">
              Forest Ave BID
            </span>
          </Link>
          <p className="text-white/75 text-sm leading-relaxed max-w-xs">
            Supporting local businesses and building a vibrant community along
            Staten Island's Forest Avenue corridor.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook (opens in new tab)"
              className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (opens in new tab)"
              className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter (opens in new tab)"
              className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

        {/* Contact column */}
        <div>
          <h3 className="font-headline font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">
            Contact
          </h3>
          <address className="not-italic space-y-2.5 text-sm text-white/80">
            <p>1247 Forest Ave, 2nd Floor<br />Staten Island, NY 10310</p>
            <p>
              <a
                href="tel:+17185550100"
                className="hover:text-white transition-colors"
              >
                (718) 555-0100
              </a>
            </p>
            <p>
              <a
                href="mailto:info@forestavenuebid.com"
                className="hover:text-white transition-colors"
              >
                info@forestavenuebid.com
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
