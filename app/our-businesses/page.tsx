import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import BusinessSearch from "@/components/BusinessSearch";
import { getAllBusinesses, getBusinessCategories } from "@/lib/businesses";

export const metadata: Metadata = {
  title: "Our Businesses",
  description:
    "Discover the diverse mix of local businesses along Forest Avenue in Staten Island—restaurants, retailers, services, health care, and more.",
};

export default function OurBusinessesPage() {
  const businesses = getAllBusinesses();
  const categories = getBusinessCategories();

  return (
    <>
      <Hero
        eyebrow="Business directory"
        title="Our Businesses"
        subtitle={`Forest Avenue is home to ${businesses.length}+ local businesses serving the Staten Island community. Use search and filters to find what you're looking for.`}
      />

      <section className="section-padding bg-[var(--bg)]" aria-labelledby="businesses-heading">
        <div className="container-wide">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              eyebrow="Directory"
              title="Find a Forest Avenue business"
              description="Search by name or filter by category to explore our member businesses."
            />
          </div>

          <BusinessSearch businesses={businesses} categories={categories} />
        </div>
      </section>

      {/* Map section */}
      <section className="py-16 bg-white" aria-labelledby="map-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Location"
            title="Forest Avenue, Staten Island"
            description="We're located along Forest Avenue on Staten Island's North Shore, running approximately from Jewett Avenue to Bard Avenue."
          />
          <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--border)] h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6031.234!2d-74.1336!3d40.6259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24f8c6b2d0001%3A0x0!2sForest+Ave%2C+Staten+Island%2C+NY+10310!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Forest Avenue BID map"
            />
          </div>
          <p className="mt-3 text-xs text-[var(--muted)] text-center">
            Forest Avenue runs through West Brighton and Port Richmond on Staten Island's North Shore.
          </p>
        </div>
      </section>

      {/* List your business */}
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
