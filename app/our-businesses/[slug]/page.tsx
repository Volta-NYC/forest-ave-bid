import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import BusinessCard from "@/components/BusinessCard";
import {
  getAllBusinesses,
  getBusinessBySlug,
  getRelatedBusinesses,
} from "@/lib/businesses";
import { imageManifest } from "@/lib/imageManifest";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllBusinesses().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) return { title: "Business not found" };
  return {
    title: business.name,
    description:
      business.description ??
      business.address ??
      `${business.name} in the Forest Avenue BID business directory.`,
  };
}

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) notFound();

  const related = getRelatedBusinesses(business, 6);
  const mapQuery = business.address
    ? encodeURIComponent(`${business.name}, ${business.address}`)
    : encodeURIComponent(business.name);

  return (
    <>
      <Hero
        eyebrow="Business profile"
        title={business.name}
        subtitle={business.category}
        backgroundImageUrl={imageManifest.headerMurals.businesses}
        overlayStrength={0.18}
        pattern={false}
      />

      <section className="section-padding bg-[var(--bg)]">
        <div className="container-wide max-w-5xl">
          <div className="mb-6">
            <Link
              href="/our-businesses"
              className="text-sm text-[var(--evergreen-700)] hover:underline"
            >
              ← Back to directory
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <article className="lg:col-span-2 bg-white rounded-2xl border border-[var(--border)] p-6">
              <h2 className="font-headline font-black text-3xl text-[var(--evergreen-700)]">
                {business.name}
              </h2>
              <p className="mt-2 inline-flex text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--evergreen-50)] text-[var(--evergreen-700)] border border-[var(--evergreen-100)]">
                {business.category}
              </p>

              {business.description && (
                <p className="mt-5 text-[var(--ink)] leading-relaxed">
                  {business.description}
                </p>
              )}

              <dl className="mt-6 space-y-3 text-sm">
                {business.address && (
                  <div>
                    <dt className="font-semibold text-[var(--ink)]">Address</dt>
                    <dd className="text-[var(--muted)]">{business.address}</dd>
                  </div>
                )}
                {business.phone && (
                  <div>
                    <dt className="font-semibold text-[var(--ink)]">Phone</dt>
                    <dd>
                      <a
                        href={`tel:${business.phone.replace(/\D/g, "")}`}
                        className="text-[var(--evergreen-700)] hover:underline"
                      >
                        {business.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {business.website && (
                  <div>
                    <dt className="font-semibold text-[var(--ink)]">Website</dt>
                    <dd>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--evergreen-700)] hover:underline break-all"
                      >
                        {business.website}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </article>

            <aside className="bg-white rounded-2xl border border-[var(--border)] p-4 flex flex-col gap-4">
              {business.image ? (
                <img
                  src={business.image}
                  alt={`${business.name} storefront`}
                  className="w-full h-52 object-cover rounded-xl border border-[var(--border)]"
                />
              ) : (
                <div className="w-full h-52 rounded-xl border border-[var(--border)] bg-[var(--wood-50)] grid place-items-center text-[var(--muted)] text-sm">
                  Photo coming soon
                </div>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[var(--evergreen-700)] text-white hover:bg-[var(--evergreen-500)] transition-colors"
              >
                Open in Google Maps
              </a>
              <Link
                href="/map"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[var(--evergreen-400)] text-[var(--evergreen-700)] hover:bg-[var(--evergreen-50)] transition-colors"
              >
                View on BID map
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h3 className="font-headline font-black text-2xl text-[var(--evergreen-700)] mb-5">
            Related Businesses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((item) => (
              <BusinessCard key={item.slug} business={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
