import type { Metadata } from "next";
import Link from "next/link";
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

          <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              eyebrow={`${businesses.length} member businesses`}
              title="Find a Forest Avenue business"
              description="Search by name, address, or category. Browse A–Z or use the interactive map."
            />
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--evergreen-400)] text-[var(--evergreen-700)] text-sm font-semibold hover:bg-[var(--evergreen-50)] transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              View map
            </Link>
          </div>

          <BusinessSearch businesses={businesses} categories={categories} />
        </div>
      </section>

      {/* Map CTA */}
      <section className="py-16 bg-white" aria-labelledby="map-heading">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="Interactive map"
            title="Explore the corridor"
            // Source: forestavenuebid.com/about/ — corridor description
            description="See Forest Avenue BID businesses on an interactive map. The district runs from Hart Blvd to Broadway on Staten Island's North Shore."
          />
          <Link
            href="/map"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-[var(--evergreen-700)] text-white hover:bg-[var(--evergreen-500)] transition-colors shadow-wood-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Open business map
          </Link>
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
