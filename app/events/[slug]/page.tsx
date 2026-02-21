import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTAButton from "@/components/CTAButton";
import { getAllEvents, getEventBySlug, formatEventDate } from "@/lib/events";

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
          {/* Date block */}
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
          {/* Body */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-8">
              <h2 className="sr-only">Event details</h2>
              <div className="prose prose-sm max-w-none text-[var(--text)]">
                {event.body.split("\n\n").map((para, i) => {
                  if (para.startsWith("- ")) {
                    const items = para.split("\n").filter((l) => l.startsWith("- "));
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1 my-4">
                        {items.map((item, j) => (
                          <li key={j} className="text-[var(--text)] text-sm">
                            {item.replace(/^- /, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="mb-4 text-[var(--muted)] leading-relaxed">
                      {para}
                    </p>
                  );
                })}
              </div>
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
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
                    Time
                  </dt>
                  <dd className="text-[var(--text)]">{event.time}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
                    Location
                  </dt>
                  <dd className="text-[var(--text)]">{event.location}</dd>
                </div>
              </dl>

              <div className="pt-4 border-t border-[var(--border)]">
                <CTAButton href="/contact" className="w-full justify-center">
                  Questions? Contact us
                </CTAButton>
              </div>
            </div>
          </aside>
        </div>

        {/* Back link */}
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
