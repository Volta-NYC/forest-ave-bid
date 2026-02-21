"use client";

import { useState, useMemo } from "react";
import type { Business } from "@/lib/types";
import { normalizeCategory, NORMALIZED_CATEGORIES } from "@/lib/normalizeCategory";
import BusinessCard from "./BusinessCard";

const PAGE_SIZE = 24;
const ALL_CATS = ["All", ...NORMALIZED_CATEGORIES] as const;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function AZView({
  businesses,
  visibleCount,
  onShowMore,
  onShowAll,
}: {
  businesses: Business[];
  visibleCount: number;
  onShowMore: () => void;
  onShowAll: () => void;
}) {
  const sorted = useMemo(
    () => [...businesses].sort((a, b) => a.name.localeCompare(b.name)),
    [businesses]
  );
  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const groups = useMemo(() => {
    const map: Record<string, Business[]> = {};
    for (const b of visible) {
      const letter = b.name[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(b);
    }
    return map;
  }, [visible]);

  const letters = Object.keys(groups).sort();

  return (
    <div>
      {/* Jump-to-letter bar */}
      <nav
        className="flex flex-wrap gap-1 mb-8 sticky top-16 bg-[var(--bg)] py-3 z-10 border-b border-[var(--border)]"
        aria-label="Jump to letter"
      >
        {ALPHABET.map((l) => (
          <a
            key={l}
            href={groups[l] ? `#letter-${l}` : undefined}
            className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded transition-colors ${
              groups[l]
                ? "text-[var(--evergreen-700)] hover:bg-[var(--evergreen-50)] cursor-pointer"
                : "text-[var(--ink)] opacity-20 cursor-default pointer-events-none"
            }`}
            aria-disabled={!groups[l]}
            tabIndex={groups[l] ? 0 : -1}
          >
            {l}
          </a>
        ))}
        <span className="ml-auto text-xs text-[var(--muted)] self-center pr-1">
          {visible.length} of {businesses.length}
        </span>
      </nav>

      {/* Letter sections */}
      {letters.map((letter) => (
        <section key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-32">
          <h3 className="font-headline font-black text-2xl text-[var(--evergreen-700)] mb-4 pb-2 border-b-2 border-[var(--wood-100)] flex items-baseline gap-2">
            {letter}
            <span className="text-sm font-body font-normal text-[var(--muted)]">
              {groups[letter].length}
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups[letter].map((b) => (
              <BusinessCard key={b.slug} business={b} />
            ))}
          </div>
        </section>
      ))}

      {hasMore && (
        <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-[var(--border)]">
          <button
            onClick={onShowMore}
            className="px-6 py-2.5 rounded-xl bg-[var(--evergreen-700)] text-white text-sm font-semibold hover:bg-[var(--evergreen-500)] transition-colors"
          >
            Show {Math.min(PAGE_SIZE, businesses.length - visibleCount)} more
          </button>
          <button
            onClick={onShowAll}
            className="px-4 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--ink)] underline underline-offset-2"
          >
            Show all {businesses.length}
          </button>
        </div>
      )}
    </div>
  );
}

interface BusinessSearchProps {
  businesses: Business[];
}

export default function BusinessSearch({ businesses }: BusinessSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const isFiltered = query.trim() !== "" || selectedCategory !== "All";

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return businesses.filter((b) => {
      const catMatch =
        selectedCategory === "All" ||
        normalizeCategory(b.category) === selectedCategory;
      const textMatch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.address?.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [businesses, query, selectedCategory]);

  const visibleFiltered = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name)).slice(0, visibleCount),
    [filtered, visibleCount]
  );

  function handleCategoryChange(cat: string) {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
  }

  function handleQueryChange(val: string) {
    setQuery(val);
    setVisibleCount(PAGE_SIZE);
  }

  const chipBase =
    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--evergreen-400)]";
  const chipActive = "bg-[var(--evergreen-700)] text-white border-[var(--evergreen-700)]";
  const chipInactive =
    "bg-white text-[var(--ink)] border-[var(--border)] hover:border-[var(--evergreen-700)] hover:text-[var(--evergreen-700)]";

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-5">
        <label htmlFor="business-search" className="sr-only">
          Search businesses
        </label>
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
          fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          id="business-search"
          type="search"
          placeholder="Search by name, address, or category…"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-[var(--border)] bg-white text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--evergreen-400)] focus:ring-2 focus:ring-[var(--evergreen-400)]/20 transition text-sm"
        />
        {query && (
          <button
            onClick={() => handleQueryChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category chips — 6 normalised buckets */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
        {ALL_CATS.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`${chipBase} ${selectedCategory === cat ? chipActive : chipInactive}`}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {isFiltered ? (
        <>
          <p className="text-sm text-[var(--muted)] mb-6" aria-live="polite">
            Showing{" "}
            <strong className="text-[var(--ink)]">{Math.min(visibleCount, filtered.length)}</strong>{" "}
            of <strong className="text-[var(--ink)]">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "business" : "businesses"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {query.trim() && ` matching "${query.trim()}"`}
            {" · "}
            <button
              onClick={() => { handleQueryChange(""); handleCategoryChange("All"); }}
              className="text-[var(--evergreen-500)] hover:underline"
            >
              Clear filters
            </button>
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[var(--muted)]">
              <p className="text-lg font-medium">No businesses match your search.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleFiltered.map((b) => (
                  <BusinessCard key={b.slug} business={b} />
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-[var(--border)]">
                  <button
                    onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                    className="px-6 py-2.5 rounded-xl bg-[var(--evergreen-700)] text-white text-sm font-semibold hover:bg-[var(--evergreen-500)] transition-colors"
                  >
                    Show {Math.min(PAGE_SIZE, filtered.length - visibleCount)} more
                  </button>
                  <button
                    onClick={() => setVisibleCount(filtered.length)}
                    className="px-4 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--ink)] underline underline-offset-2"
                  >
                    Show all {filtered.length}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <AZView
          businesses={businesses}
          visibleCount={visibleCount}
          onShowMore={() => setVisibleCount((v) => v + PAGE_SIZE)}
          onShowAll={() => setVisibleCount(businesses.length)}
        />
      )}
    </div>
  );
}
