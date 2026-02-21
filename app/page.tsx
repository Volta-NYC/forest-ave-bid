import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import EventCard from "@/components/EventCard";
import { getAllEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Forest Avenue BID | Staten Island, NY",
  description:
    "The Forest Avenue Business Improvement District supports local businesses, drives commercial revitalization, and builds community along Staten Island's Forest Avenue corridor.",
};

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Small Business Support",
    description:
      "We advocate for Forest Avenue merchants with technical assistance, grant resources, signage programs, and direct connections to NYC Small Business Services.",
    href: "/services",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Commercial Revitalization",
    description:
      "Through beautification investments, streetscape improvements, façade grants, and strategic marketing, we strengthen Forest Avenue as a destination commercial corridor.",
    href: "/services",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Community Events",
    description:
      "From our beloved Annual Street Fair to holiday markets and neighborhood cleanups, we bring people together and create reasons to shop and celebrate on Forest Avenue.",
    href: "/events",
  },
];

const stats = [
  { value: "200+", label: "Member Businesses" },
  { value: "15+", label: "Years Serving the District" },
  { value: "6", label: "Annual Signature Events" },
  { value: "~1 mile", label: "Of Commercial Corridor" },
];

export default function HomePage() {
  const upcomingEvents = getAllEvents().slice(0, 3);

  return (
    <>
      <Hero
        eyebrow="Staten Island, New York"
        title="Where Forest Avenue's Community Comes Together"
        subtitle="The Forest Avenue Business Improvement District invests in the people, businesses, and public spaces that make our neighborhood thrive."
        primaryCta={{ label: "Explore our businesses", href: "/our-businesses" }}
        secondaryCta={{ label: "Learn about the BID", href: "/about" }}
      />

      {/* Features */}
      <section className="section-padding bg-white" aria-labelledby="features-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What we do"
            title="Building a stronger Forest Avenue"
            description="The Forest Avenue BID works every day to support local businesses, invest in public spaces, and build the community connections that keep our neighborhood vibrant."
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

      {/* Stats band */}
      <section
        className="py-14"
        style={{ background: "var(--brand-primary)" }}
        aria-label="District statistics"
      >
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-headline font-black text-4xl text-white">{stat.value}</p>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <section className="section-padding bg-[var(--bg)]" aria-labelledby="events-heading">
          <div className="container-wide">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <SectionHeading
                eyebrow="What's happening"
                title="Upcoming events"
                description="Stay connected with Forest Avenue's calendar of community events, markets, and programs."
              />
              <CTAButton href="/events" variant="outline" className="flex-shrink-0">
                View all events
              </CTAButton>
            </div>

            <div className="flex flex-col gap-5">
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section
        className="py-20"
        style={{ background: "var(--brand-secondary)" }}
        aria-labelledby="cta-heading"
      >
        <div className="container-wide text-center max-w-3xl mx-auto">
          <h2
            id="cta-heading"
            className="font-headline font-black text-white text-4xl md:text-5xl text-balance"
          >
            Ready to get involved?
          </h2>
          <p className="mt-4 text-white/85 text-lg leading-relaxed">
            Whether you're a business owner looking for support, a resident who
            wants to get involved, or a community partner—we'd love to hear from
            you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" className="bg-white !text-[var(--brand-primary)] hover:bg-[var(--bg)]">
              Get in touch
            </CTAButton>
            <CTAButton href="/our-businesses" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">
              Browse the directory
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
