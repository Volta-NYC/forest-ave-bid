import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import EventCard from "@/components/EventCard";
import { getAllEvents, isUpcoming } from "@/lib/events";

export const metadata: Metadata = {
  title: "Forest Avenue BID | Staten Island, NY",
  description:
    "The Forest Avenue Business Improvement District supports local businesses and builds community along Forest Avenue in Staten Island, NY — from Hart Blvd to Broadway.",
};

// Source: forestavenuebid.com/our-businesses/
const stats = [
  { value: "153", label: "Businesses" },
  { value: "156", label: "Property Owners" },
  { value: "1", label: "Business Improvement District" },
];

// Source: forestavenuebid.com (homepage copy, verbatim)
const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Small Business Support",
    // Source: forestavenuebid.com homepage
    description:
      "Are you a business owner on Forest Ave between Hart Blvd and Broadway? We are here to support you! Check out our small business resources or contact us today.",
    href: "/services",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Commercial Revitalization",
    // Source: forestavenuebid.com homepage
    description:
      "Our goal is to respond to locally identified needs and advocate for area improvements that better residents' and business owners quality of life.",
    href: "/services",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Community Events",
    // Source: forestavenuebid.com homepage
    description:
      "We believe in supporting community growth and bringing people together and providing chances for interaction and collaboration. Check out our upcoming events!",
    href: "/events",
  },
];

export default function HomePage() {
  const allEvents = getAllEvents();
  const upcomingEvents = allEvents.filter((e) => isUpcoming(e.date));
  // Show up to 3 most recent past events on homepage if no upcoming events
  const featuredEvents = upcomingEvents.length > 0
    ? upcomingEvents.slice(0, 3)
    : allEvents.slice(0, 3);

  return (
    <>
      {/* Source: forestavenuebid.com — "BUSINESS IMPROVEMENT DISTRICT" heading */}
      <Hero
        eyebrow="Staten Island, New York"
        title="Forest Avenue Business Improvement District"
        subtitle="Supporting local businesses and bringing people together along Forest Avenue — from Hart Blvd to Broadway."
        primaryCta={{ label: "Explore our businesses", href: "/our-businesses" }}
        secondaryCta={{ label: "Get in touch", href: "/contact" }}
      />

      {/* Features — Source: forestavenuebid.com homepage sections */}
      <section className="section-padding bg-white" aria-labelledby="features-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What we do"
            title="How we support Forest Avenue"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat) => (
              <Link
                key={feat.title}
                href={feat.href}
                className="card-hover group flex flex-col gap-4 p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand-secondary)] transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                  style={{ background: "var(--brand-primary)" }}
                >
                  {feat.icon}
                </div>
                <h3 className="font-headline font-bold text-xl text-[var(--brand-primary)]">
                  {feat.title}
                </h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed flex-1">
                  {feat.description}
                </p>
                <span className="text-sm font-semibold text-[var(--brand-accent)] group-hover:underline inline-flex items-center gap-1">
                  Learn more
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats — Source: forestavenuebid.com/our-businesses/ */}
      <section
        className="py-14"
        style={{ background: "var(--brand-primary)" }}
        aria-label="District statistics"
      >
        <div className="container-wide grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-headline font-black text-5xl text-white">{stat.value}</p>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="section-padding bg-[var(--bg)]" aria-labelledby="events-heading">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow={upcomingEvents.length > 0 ? "What's happening" : "Recent events"}
              title={upcomingEvents.length > 0 ? "Upcoming events" : "Past events"}
              description={
                upcomingEvents.length > 0
                  ? undefined
                  // Source: forestavenuebid.com/events/
                  : "From Trick or Treating to Spring Strolls, the Forest Ave BID is always planning an upcoming community event."
              }
            />
            <CTAButton href="/events" variant="outline" className="flex-shrink-0">
              View all events
            </CTAButton>
          </div>

          {upcomingEvents.length === 0 && (
            <div className="mb-8 p-5 rounded-xl bg-white border border-[var(--border)] text-sm text-[var(--muted)]">
              <strong className="text-[var(--text)]">No upcoming events posted yet.</strong>{" "}
              Check back soon or{" "}
              <a
                href="https://www.instagram.com/forestavebid/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-accent)] hover:underline"
              >
                follow us on Instagram
              </a>{" "}
              for the latest updates.
            </div>
          )}

          <div className="flex flex-col gap-5">
            {featuredEvents.map((event) => (
              <EventCard key={event.slug} event={event} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Talk to us — Source: forestavenuebid.com homepage "Talk to us" section */}
      <section
        className="py-20"
        style={{ background: "var(--brand-secondary)" }}
        aria-labelledby="cta-heading"
      >
        <div className="container-wide text-center max-w-2xl mx-auto">
          <h2
            id="cta-heading"
            className="font-headline font-black text-white text-4xl md:text-5xl text-balance"
          >
            Talk to us
          </h2>
          {/* Source: forestavenuebid.com homepage */}
          <p className="mt-4 text-white/85 text-lg leading-relaxed">
            Have any questions? We are always open to talk about your business,
            community, opportunities, or how we can help you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" className="bg-white !text-[var(--brand-primary)] hover:bg-[var(--bg)]">
              Get in touch
            </CTAButton>
            <CTAButton href="/our-businesses" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">
              Explore our businesses
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
