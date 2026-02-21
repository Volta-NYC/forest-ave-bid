import type { Business } from "@/lib/types";

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <article className="card-hover bg-white rounded-2xl border border-[var(--border)] p-6 flex flex-col gap-3">
      {/* Category */}
      <span className="inline-block self-start text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg)] text-[var(--brand-primary)] border border-[var(--border)]">
        {business.category}
      </span>

      {/* Name */}
      <h3 className="font-headline font-bold text-lg text-[var(--brand-primary)] leading-tight">
        {business.name}
      </h3>

      {/* Description */}
      {business.description && (
        <p className="text-sm text-[var(--text)] leading-relaxed line-clamp-3">
          {business.description}
        </p>
      )}

      {/* Details */}
      <dl className="mt-1 space-y-1.5 text-sm">
        {business.address && (
          <div className="flex items-start gap-2">
            <dt className="sr-only">Address</dt>
            <svg
              className="w-4 h-4 text-[var(--muted)] flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <dd className="text-[var(--muted)]">{business.address}</dd>
          </div>
        )}
        {business.phone && (
          <div className="flex items-center gap-2">
            <dt className="sr-only">Phone</dt>
            <svg
              className="w-4 h-4 text-[var(--muted)] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <dd>
              <a
                href={`tel:${business.phone.replace(/\D/g, "")}`}
                className="text-[var(--brand-accent)] hover:underline"
              >
                {business.phone}
              </a>
            </dd>
          </div>
        )}
        {business.website && (
          <div className="flex items-center gap-2">
            <dt className="sr-only">Website</dt>
            <svg
              className="w-4 h-4 text-[var(--muted)] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <dd>
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-accent)] hover:underline"
              >
                Visit website
              </a>
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}
