import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import BusinessSearch from "@/components/BusinessSearch";
import { getAllBusinesses, getBusinessCategories } from "@/lib/businesses";

export const metadata: Metadata = {
  title: "Our Businesses",
  description:
    "The Forest Ave BID is home to long standing businesses as well as new businesses. We are ever-expanding, growing, and changing!",
};

export default function OurBusinessesPage() {
  const businesses = getAllBusinesses();
  const categories = getBusinessCategories();

  return (
    <>
      <Hero
        eyebrow="Business directory"
        title="Our Businesses"
        // Source: forestavenuebid.com/our-businesses/
        subtitle="The Forest Ave BID is home to long standing businesses as well as new businesses. We are ever-expanding, growing, and changing!"
      />

      {/* Stats — Source: forestavenuebid.com/our-businesses/ */}
      <section
        className="py-14"
        style={{ background: "var(--brand-primary)" }}
        aria-label="District statistics"
      >
        <div className="container-wide grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "153", label: "Businesses" },
            { value: "156", label: "Property Owners" },
            { value: "1", label: "Business Improvement District" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-headline font-black text-5xl text-white">{stat.value}</p>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-[var(--bg)]" aria-labelledby="businesses-heading">
        <div className="container-wide">

          {/* Import notice — transparent about the partial directory */}
          <div className="mb-8 p-5 rounded-xl bg-white border border-[var(--border)] flex gap-4 items-start">
            <svg className="w-5 h-5 text-[var(--brand-secondary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-[var(--muted)]">
              <strong className="text-[var(--text)]">Directory in progress.</strong>{" "}
              The full directory of 153 businesses is published as a{" "}
              <a
                href="https://forestavenuebid.com/our-businesses/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-accent)] hover:underline"
              >
                Canva embed on the official site
              </a>
              . The listings below are confirmed members sourced from BID publications. Is your business missing?{" "}
              <a href="/contact" className="text-[var(--brand-accent)] hover:underline">Contact us</a> to be added.
            </div>
          </div>

          <div className="mb-10">
            <SectionHeading
              eyebrow={`${businesses.length} confirmed listings`}
              title="Find a Forest Avenue business"
              description="Search by name or filter by category."
            />
          </div>

          <BusinessSearch businesses={businesses} categories={categories} />
        </div>
      </section>

      {/* Map — Source: forestavenuebid.com/contact/ (address: 686 Forest Ave) */}
      <section className="py-16 bg-white" aria-labelledby="map-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Location"
            title="Forest Avenue, Staten Island"
            // Source: forestavenuebid.com/about/ — corridor description
            description="The Forest Ave BID serves merchants and property owners from Hart Blvd to Broadway on Staten Island's North Shore."
          />
          <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--border)] h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.4!2d-74.1250!3d40.6290!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24f910f5b17e3%3A0x0!2s686+Forest+Ave%2C+Staten+Island%2C+NY+10310!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Forest Avenue BID map"
            />
          </div>
          {/* Source: forestavenuebid.com/contact/ */}
          <p className="mt-3 text-xs text-[var(--muted)] text-center">
            Forest Avenue BID office: 686 Forest Ave, Staten Island, NY 10310
          </p>
        </div>
      </section>

      {/* Submit CTA */}
      <section
        className="py-16"
        style={{ background: "var(--brand-secondary)" }}
        aria-labelledby="list-biz-heading"
      >
        <div className="container-wide text-center max-w-2xl mx-auto">
          <h2
            id="list-biz-heading"
            className="font-headline font-black text-3xl text-white"
          >
            Is your business missing?
          </h2>
          <p className="mt-3 text-white/85 leading-relaxed">
            If you operate a business along Forest Avenue and don't see your
            listing, contact us and we'll add you to the directory.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-white text-[var(--brand-primary)] hover:bg-[var(--bg)] transition-colors"
          >
            Submit your business
          </a>
        </div>
      </section>
    </>
  );
}
