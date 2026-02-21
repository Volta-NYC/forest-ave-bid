import Link from "next/link";
import type { Event } from "@/lib/types";
import { formatMonthDay } from "@/lib/types";
import { imageManifest } from "@/lib/imageManifest";

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
      {/* Thumbnail image slot — placeholder; falls back to wood colour if file missing */}
      <div
        className="relative h-36 bg-[var(--wood-50)]"
        style={{
          backgroundImage: `url(${imageManifest.eventThumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Date + type overlay */}
        <div
          className="absolute bottom-0 left-0 flex items-center gap-3 px-4 py-3 w-full"
          style={{ background: "linear-gradient(to top, rgba(44,84,29,0.85), transparent)" }}
        >
          <span className="font-headline font-black text-2xl text-white leading-none">{day}</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">{month}</span>
          <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">{event.type}</span>
        </div>
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
