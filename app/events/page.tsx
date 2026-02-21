import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import { getAllEvents, isUpcoming } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "From Trick or Treating to Spring Strolls, the Forest Ave BID is always planning an upcoming community event that we hope you join us at.",
};

export default function EventsPage() {
  const allEvents = getAllEvents(); // sorted newest first
  const upcoming = allEvents.filter((e) => isUpcoming(e.date));
  const past = allEvents.filter((e) => !isUpcoming(e.date));

  // Group past events by year, newest year first
  const pastByYear = past.reduce<Record<number, typeof past>>((acc, e) => {
    const yr = new Date(e.date + "T00:00:00").getFullYear();
    if (!acc[yr]) acc[yr] = [];
    acc[yr].push(e);
    return acc;
  }, {});
  const years = Object.keys(pastByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <Hero
        eyebrow="Calendar"
        title="Events"
        // Source: forestavenuebid.com/events/
        subtitle="From Trick or Treating to Spring Strolls, the Forest Ave BID is always planning an upcoming community event that we hope you join us at."
      />

      <div className="section-padding bg-[var(--bg)]">
        <div className="container-wide">

          {/* ── Upcoming ──────────────────────────────────────────── */}
          <section aria-labelledby="upcoming-heading" className="mb-20">
            <SectionHeading
              eyebrow="Upcoming"
              title="Upcoming events"
            />

            {upcoming.length === 0 ? (
              // No 2026+ events have been posted yet — show friendly message
              <div className="mt-8 p-8 rounded-2xl bg-white border border-[var(--border)] text-center">
                <p className="font-headline font-bold text-xl text-[var(--brand-primary)]">
                  No upcoming events posted yet
                </p>
                <p className="mt-2 text-sm text-[var(--muted)] max-w-md mx-auto">
                  Check back soon — or follow us on social media to be the
                  first to know when new events are announced.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <a
                    href="https://www.instagram.com/forestavebid/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors"
                  >
                    {/* Source: forestavenuebid.com/contact/ */}
                    Follow on Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/ForestAveBID/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors"
                  >
                    {/* Source: forestavenuebid.com/contact/ */}
                    Follow on Facebook
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            )}
          </section>

          {/* ── Archive ───────────────────────────────────────────── */}
          {years.length > 0 && (
            <section aria-labelledby="archive-heading">
              <SectionHeading
                eyebrow="Archive"
                title="Past events"
              />

              {years.map((year) => (
                <div key={year} className="mt-12">
                  <h3 className="font-headline font-black text-2xl text-[var(--brand-primary)] mb-6 pb-3 border-b border-[var(--border)]">
                    {year}
                  </h3>
                  <div className="flex flex-col gap-5">
                    {pastByYear[year].map((event) => (
                      <EventCard key={event.slug} event={event} featured />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

        </div>
      </div>
    </>
  );
}
