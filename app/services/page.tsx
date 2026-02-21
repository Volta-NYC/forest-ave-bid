import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import { imageManifest } from "@/lib/imageManifest";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The Forest Avenue BID supports local businesses, drives commercial revitalization, and programs community events along Staten Island's Forest Avenue corridor.",
};

// Source: forestavenuebid.com/services/ — verbatim copy
const services = [
  {
    id: "small-business",
    eyebrow: "For business owners",
    title: "Small Business Support",
    // Source: forestavenuebid.com/services/
    description:
      "We actively engage in branding and marketing our district to support small businesses along our corridor. We facilitate networking among merchants, organize community events, and advocate for district improvements. Additionally, we serve as a liaison between local businesses, stakeholders, and the City government, ensuring effective communication and collaboration.",
    // Source: forestavenuebid.com/services/ — button text
    cta: { label: "Get support now", href: "/contact" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    bg: "var(--brand-primary)",
  },
  {
    id: "revitalization",
    eyebrow: "For the corridor",
    title: "Commercial Revitalization",
    // Source: forestavenuebid.com/services/
    description:
      "We are currently responsible for conducting a needs assessment within the relevant commercial corridors and initiating the analysis of the gathered data while engaging with community stakeholders. Once the needs assessment is completed, we collaborate with the leadership to create and execute various commercial revitalization projects tailored to address the identified needs.",
    // Source: forestavenuebid.com/services/ — button text
    cta: { label: "Share your opinion", href: "/contact" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: "var(--brand-secondary)",
  },
  {
    id: "community",
    eyebrow: "For the community",
    title: "Community Events",
    // Source: forestavenuebid.com/services/
    description:
      "Community events are integral to our mission as they unite people, foster a sense of belonging, and support local businesses while celebrating cultural diversity. Additionally, they offer valuable opportunities for us to engage with our community and promote social cohesion and well-being.",
    // Source: forestavenuebid.com/services/ — button text
    cta: { label: "Explore our events", href: "/events" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    bg: "#1e3d14",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Programs & services"
        title="Services"
        subtitle="The Forest Avenue BID delivers programs across three core areas to support our businesses, corridor, and community."
        woodTexture
      />

      <section className="section-padding bg-white" aria-labelledby="services-heading">
        <div className="container-wide">
          <div className="space-y-20">
            {services.map((service, i) => (
              <article key={service.id} id={service.id}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                  {/* Content */}
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <SectionHeading
                      eyebrow={service.eyebrow}
                      title={service.title}
                      description={service.description}
                    />
                    <div className="mt-8">
                      <CTAButton href={service.cta.href}>{service.cta.label}</CTAButton>
                    </div>
                  </div>

                  {/* Visual — image slot with colour overlay fallback */}
                  <div
                    className={`rounded-3xl flex flex-col items-center justify-center text-center gap-6 min-h-[240px] relative overflow-hidden ${
                      i % 2 === 1 ? "lg:order-1" : ""
                    }`}
                    style={{ background: service.bg }}
                  >
                    {/* Image placeholder — opacity 0.18 so colour overlay stays dominant */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${imageManifest.services[service.id] ?? imageManifest.fallback})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.18,
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10 p-12 flex flex-col items-center gap-6 w-full">
                      <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                        {service.icon}
                      </div>
                      <p className="font-headline font-black text-3xl text-white leading-tight max-w-xs">
                        {service.title}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
