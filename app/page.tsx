import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import EventCard from "@/components/EventCard";
import { getAllEvents, isUpcoming } from "@/lib/events";
import { imageManifest } from "@/lib/imageManifest";
import { socialLinks } from "@/lib/socialLinks";

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
    title: "Small Business Support",
    // Source: forestavenuebid.com homepage
    description:
      "Are you a business owner on Forest Ave between Hart Blvd and Broadway? We are here to support you! Check out our small business resources or contact us today.",
    href: "/services",
  },
  {
    title: "Commercial Revitalization",
    // Source: forestavenuebid.com homepage
    description:
      "Our goal is to respond to locally identified needs and advocate for area improvements that better residents' and business owners quality of life.",
    href: "/services",
  },
  {
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
        size="home"
        backgroundImageUrl={imageManifest.headerMurals.home}
        overlayStrength={0.18}
        pattern={false}
        primaryCta={{ label: "Explore our businesses", href: "/our-businesses" }}
        secondaryCta={{ label: "Get in touch", href: "/contact" }}
      />

      {/* Features — Source: forestavenuebid.com homepage sections */}
      <section className="section-padding section-gradient section-reveal" aria-labelledby="features-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What we do"
            title="How we support Forest Avenue"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <Link
                key={feat.title}
                href={feat.href}
                className="card-hover group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand-secondary)] transition-colors overflow-hidden"
              >
                <div
                  className="h-40 bg-[var(--wood-100)]"
                  style={{
                    backgroundImage: `url("${imageManifest.homeCards[i]}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="p-8 flex flex-col gap-4 flex-1">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats — Source: forestavenuebid.com/our-businesses/ */}
      <section
        className="py-14 section-reveal"
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
      <section className="section-padding section-gradient section-reveal" aria-labelledby="events-heading">
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
                href={socialLinks.forestAveBid.instagram}
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

      <section className="py-14 section-gradient section-reveal" aria-labelledby="social-heading">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <SectionHeading
                eyebrow="Follow us first"
                title="Instagram, Facebook, YouTube"
                description="For the fastest updates, follow our social channels."
              />
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a href={socialLinks.forestAveBid.instagram} target="_blank" rel="noopener noreferrer" className="social-pop ui-bounce rounded-xl border border-[var(--border)] bg-white p-4 flex flex-col items-center justify-center text-center hover:border-[var(--brand-primary)] transition-colors">
                  <svg className="w-9 h-9 text-[#c13584]" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="mt-2 text-sm font-semibold text-[var(--brand-primary)]">Instagram</span>
                </a>
                <a href={socialLinks.forestAveBid.facebook} target="_blank" rel="noopener noreferrer" className="social-pop ui-bounce rounded-xl border border-[var(--border)] bg-white p-4 flex flex-col items-center justify-center text-center hover:border-[var(--brand-primary)] transition-colors">
                  <svg className="w-9 h-9 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  <span className="mt-2 text-sm font-semibold text-[var(--brand-primary)]">Facebook</span>
                </a>
                <a href={socialLinks.forestAveBid.youtube} target="_blank" rel="noopener noreferrer" className="social-pop ui-bounce rounded-xl border border-[var(--border)] bg-white p-4 flex flex-col items-center justify-center text-center hover:border-[var(--brand-primary)] transition-colors">
                  <svg className="w-9 h-9 text-[#ff0000]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="mt-2 text-sm font-semibold text-[var(--brand-primary)]">YouTube</span>
                </a>
              </div>
              <div className="mt-4 text-xs text-[var(--muted)]">
                SIBOC:
                {" "}
                <a href={socialLinks.siboc.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] hover:underline">Instagram</a>
                {" · "}
                <a href={socialLinks.siboc.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] hover:underline">Facebook</a>
                {" · "}
                <a href={socialLinks.siboc.youtube} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] hover:underline">YouTube</a>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Community logos</p>
              <h3 className="mt-1 font-headline font-bold text-2xl text-[var(--brand-primary)]">Forest Ave BID + SIBOC</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a href={socialLinks.forestAveBid.instagram} target="_blank" rel="noopener noreferrer" className="tilt-drift ui-bounce rounded-xl border border-[var(--border)] overflow-hidden hover:border-[var(--brand-primary)] transition-colors">
                  <Image
                    src={imageManifest.logos.forestAveBid}
                    alt="Forest Ave BID logo"
                    width={640}
                    height={360}
                    className="w-full h-auto"
                  />
                </a>
                <a href={socialLinks.siboc.instagram} target="_blank" rel="noopener noreferrer" className="tilt-drift ui-bounce rounded-xl border border-[var(--border)] overflow-hidden hover:border-[var(--brand-primary)] transition-colors">
                  <Image
                    src={imageManifest.logos.siboc}
                    alt="SIBOC logo"
                    width={640}
                    height={360}
                    className="w-full h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talk to us — Source: forestavenuebid.com homepage "Talk to us" section */}
      <section
        className="py-20 section-reveal"
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
