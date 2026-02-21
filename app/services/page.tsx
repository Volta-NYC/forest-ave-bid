import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover how the Forest Avenue BID supports local businesses, revitalizes the corridor, and programs community events across Staten Island's Forest Avenue.",
};

const services = [
  {
    id: "small-business",
    eyebrow: "For business owners",
    title: "Small Business Support",
    description:
      "We connect Forest Avenue business owners with the resources, guidance, and advocacy they need to start, grow, and thrive.",
    points: [
      "Navigation to NYC Small Business Services grants and loans",
      "One-on-one technical assistance and referrals",
      "Façade improvement grant program",
      "Signage and storefront beautification guidance",
      "Business recruitment and vacancy reduction",
      "Networking and peer-to-peer learning events",
    ],
    cta: { label: "Request support", href: "/contact" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "revitalization",
    eyebrow: "For the corridor",
    title: "Commercial Revitalization",
    description:
      "We invest in the physical and economic infrastructure of Forest Avenue to make it a more attractive, competitive commercial destination.",
    points: [
      "Streetscape maintenance and enhanced sanitation",
      "Seasonal plantings and corridor beautification",
      "Holiday and seasonal lighting displays",
      "Graffiti removal and rapid response",
      "Capital improvement project advocacy",
      "District marketing and branding campaigns",
    ],
    cta: { label: "Share your input", href: "/contact" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "community",
    eyebrow: "For the community",
    title: "Community Events & Programming",
    description:
      "We create reasons to visit Forest Avenue and opportunities for businesses, residents, and neighbors to connect.",
    points: [
      "Annual Forest Avenue Street Fair",
      "Holiday Market on the Avenue",
      "Small Business Saturday promotions",
      "Spring and fall corridor cleanups",
      "Quarterly business owner town halls",
      "Partnerships with local schools and nonprofits",
    ],
    cta: { label: "Explore events", href: "/events" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Programs & services"
        title="How we serve Forest Avenue"
        subtitle="The BID delivers three interconnected service areas that together strengthen our commercial corridor and support the businesses that call it home."
      />

      <section className="section-padding bg-white" aria-labelledby="services-heading">
        <div className="container-wide">
          <div className="space-y-20">
            {services.map((service, i) => (
              <article
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                  i % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Content */}
                <div className={i % 2 === 1 ? "lg:col-start-1" : ""}>
                  <SectionHeading
                    eyebrow={service.eyebrow}
                    title={service.title}
                    description={service.description}
                  />
                  <ul className="mt-6 space-y-3" role="list">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-[var(--brand-secondary)] flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-[var(--muted)] leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <CTAButton href={service.cta.href}>{service.cta.label}</CTAButton>
                  </div>
                </div>

                {/* Visual panel */}
                <div
                  className={`rounded-3xl p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[280px] ${
                    i % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                  style={{
                    background:
                      i === 0
                        ? "var(--brand-primary)"
                        : i === 1
                        ? "var(--brand-secondary)"
                        : "#1e3d14",
                  }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                    {service.icon}
                  </div>
                  <p className="font-headline font-black text-3xl text-white leading-tight max-w-xs">
                    {service.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Grant spotlight */}
      <section className="section-padding bg-[var(--bg)]" aria-labelledby="grants-heading">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              eyebrow="Resources"
              title="Grant & funding opportunities"
              description="The BID actively monitors and shares funding opportunities from NYC, New York State, and private foundations that benefit Forest Avenue businesses."
              center
            />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "NYC Small Business Services", url: "https://www.nyc.gov/site/sbs/index.page" },
                { name: "Empire State Development", url: "https://esd.ny.gov/" },
                { name: "SBDC Staten Island", url: "https://www.statenislandsbdc.org/" },
              ].map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover block p-5 rounded-xl bg-white border border-[var(--border)] text-sm font-semibold text-[var(--brand-primary)] hover:border-[var(--brand-secondary)] transition-colors text-center"
                >
                  {r.name}
                  <span className="block mt-1 text-xs font-normal text-[var(--muted)]">
                    External resource →
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-[var(--muted)]">
              Contact us to learn which programs your business may be eligible for.
            </p>
            <div className="mt-4">
              <CTAButton href="/contact">Get guidance from the BID</CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
