"use client";

import { useState, useMemo } from "react";
import type { Business } from "@/lib/types";
import BusinessCard from "./BusinessCard";

interface BusinessSearchProps {
  businesses: Business[];
  categories: string[];
}

export default function BusinessSearch({
  businesses,
  categories,
}: BusinessSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return businesses.filter((b) => {
      const categoryMatch =
        selectedCategory === "All" || b.category === selectedCategory;
      const textMatch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      return categoryMatch && textMatch;
    });
  }, [businesses, query, selectedCategory]);

  const chipBase =
    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand-accent)]";
  const chipActive =
    "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]";
  const chipInactive =
    "bg-white text-[var(--text)] border-[var(--border)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]";

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <label htmlFor="business-search" className="sr-only">
          Search businesses
        </label>
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="business-search"
          type="search"
          placeholder="Search businesses by name, category, or keyword…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-white text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--brand-secondary)] focus:ring-2 focus:ring-[var(--brand-secondary)]/20 transition text-sm"
        />
      </div>

      {/* Category chips */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${chipBase} ${
              selectedCategory === cat ? chipActive : chipInactive
            }`}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-[var(--muted)] mb-6" aria-live="polite">
        Showing{" "}
        <strong className="text-[var(--text)]">{filtered.length}</strong>{" "}
        {filtered.length === 1 ? "business" : "businesses"}
        {selectedCategory !== "All" && ` in ${selectedCategory}`}
        {query && ` matching "${query}"`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--muted)]">
          <p className="text-lg font-medium">No businesses match your search.</p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
            className="mt-3 text-sm text-[var(--brand-accent)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <BusinessCard key={b.slug} business={b} />
          ))}
        </div>
      )}
    </div>
  );
}
