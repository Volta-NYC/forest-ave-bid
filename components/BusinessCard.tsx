import Image from "next/image";
import type { Business } from "@/lib/types";
import { CategoryIcon, categoryColor } from "./CategoryIcons";

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <article className="card-hover bg-white rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col">
      {/* Image / icon header */}
      <div className="relative h-36 bg-[var(--wood-50)] flex-shrink-0">
        {business.image ? (
          <Image
            src={business.image}
            alt={business.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <CategoryIcon category={business.category} className="w-16 h-16" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Category badge */}
        <span
          className={`inline-block self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor(
            business.category
          )}`}
        >
          {business.category}
        </span>

        {/* Name */}
        <h3 className="font-headline font-bold text-lg text-[var(--evergreen-700)] leading-tight">
          {business.name}
        </h3>

        {/* Details */}
        <dl className="space-y-1.5 text-sm flex-1">
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
                  className="text-[var(--evergreen-500)] hover:underline"
                >
                  {business.phone}
                </a>
              </dd>
            </div>
          )}
        </dl>

        {/* Website button — only when website is present and non-empty */}
        {business.website && (
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--evergreen-400)] text-[var(--evergreen-700)] hover:bg-[var(--evergreen-50)] transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Open website
          </a>
        )}
      </div>
    </article>
  );
}
