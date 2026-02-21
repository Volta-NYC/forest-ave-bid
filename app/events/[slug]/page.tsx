import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTAButton from "@/components/CTAButton";
import { getAllEvents, getEventBySlug, formatEventDate } from "@/lib/events";
import type { Event } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      type: "article",
    },
  };
}

function renderBody(body: string) {
  // Render paragraphs only — no invented bullet lists
  return body.split("\n\n").filter(Boolean).map((para, i) => (
    <p key={i} className="mb-4 text-[var(--muted)] leading-relaxed">
      {para}
    </p>
  ));
}

function ParticipantsList({ event }: { event: Event }) {
  const businesses = event.participatingBusinesses ?? [];
  const participants = event.participants ?? [];
  if (businesses.length === 0 && participants.length === 0) return null;

  return (
    <div className="mt-6 pt-6 border-t border-[var(--border)]">
      {businesses.length > 0 && (
        <>
          {/* Source: forestavenuebid.com/spring-stroll-2024/ */}
          <h3 className="font-headline font-semibold text-base text-[var(--brand-primary)] mb-3">
            Participating businesses
          </h3>
          <ul className="space-y-1.5" role="list">
            {businesses.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-secondary)] flex-shrink-0" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </>
      )}
      {participants.length > 0 && (
        <div className={businesses.length > 0 ? "mt-5" : ""}>
          <h3 className="font-headline font-semibold text-base text-[var(--brand-primary)] mb-3">
            Participants
          </h3>
          <ul className="space-y-1.5" role="list">
            {participants.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-secondary)] flex-shrink-0" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const dateLabel = formatEventDate(event.date, event.endDate || undefined);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[var(--bg)]">
      <div className="container-wide max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
            { label: event.title },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div
            className="flex-shrink-0 w-20 h-20 rounded-2xl flex flex-col items-center justify-center"
            style={{ background: "var(--brand-primary)" }}
            aria-hidden="true"
          >
            {(() => {
              const d = new Date(event.date + "T00:00:00");
              return (
                <>
                  <span className="font-headline font-black text-3xl text-white leading-none">
                    {d.getDate()}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                    {d.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </>
              );
            })()}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[var(--border)] text-[var(--brand-primary)]">
                {event.type}
              </span>
              {event.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-[var(--brand-secondary)]/10 text-[var(--brand-primary)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="font-headline font-black text-4xl md:text-5xl text-[var(--brand-primary)] text-balance">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Body — sourced from real site content only */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-8">
              <div className="prose prose-sm max-w-none">
                {renderBody(event.body)}
              </div>
              <ParticipantsList event={event} />
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-5 sticky top-24">
              <h2 className="font-headline font-bold text-lg text-[var(--brand-primary)]">
                Event info
              </h2>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
                    Date
                  </dt>
                  <dd className="text-[var(--text)]">{dateLabel}</dd>
                </div>
                {event.time && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
                      Time
                    </dt>
                    <dd className="text-[var(--text)]">{event.time}</dd>
                  </div>
                )}
                {event.location && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
                      Location
                    </dt>
                    <dd className="text-[var(--text)]">{event.location}</dd>
                  </div>
                )}
                {event.sourceUrl && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
                      Source
                    </dt>
                    <dd>
                      <a
                        href={event.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--brand-accent)] hover:underline text-xs"
                      >
                        View original post
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
              <div className="pt-4 border-t border-[var(--border)]">
                <CTAButton href="/contact" className="w-full justify-center">
                  Questions? Contact us
                </CTAButton>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--brand-primary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to all events
          </Link>
        </div>
      </div>
    </div>
  );
}
