"use client";

import { useState, useMemo } from "react";
import type { Event } from "@/lib/types";
import EventCard from "./EventCard";

interface EventsFilterProps {
  events: Event[];
  types: string[];
  years: number[];
}

export default function EventsFilter({ events, types, years }: EventsFilterProps) {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const typeMatch = selectedType === "All" || e.type === selectedType;
      const yearMatch =
        selectedYear === "All" ||
        new Date(e.date).getFullYear() === Number(selectedYear);
      return typeMatch && yearMatch;
    });
  }, [events, selectedType, selectedYear]);

  const chipBase =
    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand-accent)]";
  const chipActive =
    "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]";
  const chipInactive =
    "bg-white text-[var(--text)] border-[var(--border)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]";

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Type filter */}
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
            Type
          </legend>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
            {["All", ...types].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`${chipBase} ${
                  selectedType === type ? chipActive : chipInactive
                }`}
                aria-pressed={selectedType === type}
              >
                {type}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Year filter */}
        {years.length > 1 && (
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
              Year
            </legend>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by year">
              {["All", ...years.map(String)].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`${chipBase} ${
                    selectedYear === year ? chipActive : chipInactive
                  }`}
                  aria-pressed={selectedYear === year}
                >
                  {year}
                </button>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--muted)]">
          <p className="text-lg font-medium">No events match the selected filters.</p>
          <button
            onClick={() => {
              setSelectedType("All");
              setSelectedYear("All");
            }}
            className="mt-3 text-sm text-[var(--brand-accent)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-live="polite"
          aria-label={`${filtered.length} event${filtered.length !== 1 ? "s" : ""}`}
        >
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
