import Link from "next/link";
import type { Event } from "@/lib/types";
import { formatMonthDay } from "@/lib/types";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  const { month, day } = formatMonthDay(event.date);

  if (featured) {
    return (
      <article className="card-hover group bg-white rounded-2xl overflow-hidden border border-[var(--border)] flex flex-col sm:flex-row">
        {/* Date badge */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center w-full sm:w-28 py-6 sm:py-0"
          style={{ background: "var(--brand-primary)" }}
        >
          <span className="font-headline font-black text-4xl text-white leading-none">
            {day}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mt-1">
            {month}
          </span>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg)] text-[var(--brand-primary)] border border-[var(--border)]">
                {event.type}
              </span>
            </div>
            <h3 className="font-headline font-bold text-xl text-[var(--brand-primary)] group-hover:underline">
              {event.title}
            </h3>
            <p className="text-sm text-[var(--muted)] mt-1">
              {event.time} &nbsp;·&nbsp; {event.location}
            </p>
            <p className="text-sm text-[var(--text)] mt-3 line-clamp-2 leading-relaxed">
              {event.summary}
            </p>
          </div>
          <Link
            href={`/events/${event.slug}`}
            className="text-sm font-semibold text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1"
          >
            Learn more
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="card-hover group bg-white rounded-2xl overflow-hidden border border-[var(--border)] flex flex-col">
      {/* Date header */}
      <div
        className="flex items-center gap-4 px-5 py-4"
        style={{ background: "var(--brand-primary)" }}
      >
        <div className="text-center">
          <span className="font-headline font-black text-3xl text-white leading-none block">
            {day}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
            {month}
          </span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white">
          {event.type}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-headline font-bold text-lg text-[var(--brand-primary)] group-hover:underline leading-tight">
          {event.title}
        </h3>
        <p className="text-xs text-[var(--muted)]">
          {event.time} &nbsp;·&nbsp; {event.location}
        </p>
        <p className="text-sm text-[var(--text)] leading-relaxed line-clamp-3 mt-1">
          {event.summary}
        </p>
        <Link
          href={`/events/${event.slug}`}
          className="mt-auto pt-3 text-sm font-semibold text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1"
        >
          Details
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
