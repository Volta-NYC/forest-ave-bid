"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Business } from "@/lib/types";
import { normalizeCategory, NORMALIZED_CATEGORIES, type NormalizedCategory } from "@/lib/normalizeCategory";

// Leaflet is imported lazily inside useEffect to avoid SSR issues.
// This component must only ever be rendered client-side (via dynamic import).

interface Props {
  businesses: Business[];
  boundary: GeoJSON.FeatureCollection;
}

const FOREST_AVE_CENTER: [number, number] = [40.628, -74.122];
const DEFAULT_ZOOM = 15;

// Marker icon URLs (avoids webpack URL resolution issues with leaflet defaults)
const ICON_URL =
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const ICON_RETINA_URL =
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const SHADOW_URL =
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

export default function BusinessMapClient({ businesses, boundary }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<import("leaflet").Map | null>(null);
  const [mounted, setMounted] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Marker colours per normalised bucket
const BUCKET_COLORS: Record<NormalizedCategory, string> = {
  "Food & Drink":          "#f59e0b",
  "Medical":               "#22c55e",
  "Neighborhood Amenities":"#3b82f6",
  "Religious Institution": "#8b5cf6",
  "Services":              "#14b8a6",
  "Shopping":              "#f43f5e",
};

// Sidebar list — filtered by normalised bucket + search
  const categories = useMemo(() => ["All", ...NORMALIZED_CATEGORIES], []);

  // Geocoded businesses (those with lat/lng)
  const geocoded = useMemo(
    () => businesses.filter((b) => b.lat != null && b.lng != null),
    [businesses]
  );

  // Sidebar list — filtered by normalised bucket + search
  const sidebarList = useMemo(() => {
    const q = query.toLowerCase().trim();
    return [...businesses]
      .filter((b) => {
        const catMatch =
          selectedCategory === "All" ||
          normalizeCategory(b.category) === selectedCategory;
        const textMatch =
          !q ||
          b.name.toLowerCase().includes(q) ||
          b.address?.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q);
        return catMatch && textMatch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [businesses, query, selectedCategory]);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      // Fix default icon paths broken by webpack
      const DefaultIcon = L.icon({
        iconUrl: ICON_URL,
        iconRetinaUrl: ICON_RETINA_URL,
        shadowUrl: SHADOW_URL,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const map = L.map(mapRef.current, {
        center: FOREST_AVE_CENTER,
        zoom: DEFAULT_ZOOM,
        scrollWheelZoom: true,
      });
      leafletMapRef.current = map;

      // OpenStreetMap tiles (free, no key)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // BID boundary polygon
      if (boundary) {
        L.geoJSON(boundary as Parameters<typeof L.geoJSON>[0], {
          style: {
            color: "#2c541d",
            weight: 2.5,
            opacity: 0.8,
            fillColor: "#2c541d",
            fillOpacity: 0.08,
          },
        }).addTo(map);
      }

      // Business markers — colour-coded by bucket
      geocoded.forEach((b) => {
        if (b.lat == null || b.lng == null) return;
        const bucket = normalizeCategory(b.category);
        const color = BUCKET_COLORS[bucket];
        const circleMarker = L.circleMarker([b.lat, b.lng], {
          radius: 7,
          fillColor: color,
          color: "#fff",
          weight: 1.5,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);
        circleMarker.bindPopup(
          `<strong>${b.name}</strong><br/><span style="color:#5a5248;font-size:0.8em">${b.category}</span>${
            b.address ? `<br/><span style="font-size:0.8em">${b.address}</span>` : ""
          }${
            b.phone
              ? `<br/><a href="tel:${b.phone.replace(/\D/g, "")}" style="font-size:0.8em">${b.phone}</a>`
              : ""
          }${
            b.website
              ? `<br/><a href="${b.website}" target="_blank" rel="noopener noreferrer" style="font-size:0.8em;color:#3d7028">Open website ↗</a>`
              : ""
          }`
        );
      });

      setMounted(true);
    });

    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll active item into view in sidebar
  useEffect(() => {
    if (!activeSlug || !sidebarRef.current) return;
    const el = sidebarRef.current.querySelector(
      `[data-slug="${activeSlug}"]`
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeSlug]);

  const chipBase =
    "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap";
  const chipActive = "bg-[var(--evergreen-700)] text-white border-[var(--evergreen-700)]";
  const chipInactive =
    "bg-white text-[var(--ink)] border-[var(--border)] hover:border-[var(--evergreen-700)] hover:text-[var(--evergreen-700)]";

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--bg)] flex-shrink-0 max-h-64 lg:max-h-none overflow-hidden">
        {/* Sidebar header */}
        <div className="p-4 border-b border-[var(--border)] flex-shrink-0">
          {/* Search */}
          <div className="relative mb-3">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted)]"
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
              type="search"
              placeholder="Search businesses…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search businesses"
              className="w-full pl-8 pr-8 py-2 text-sm rounded-lg border border-[var(--border)] bg-white placeholder-[var(--muted)] focus:outline-none focus:border-[var(--evergreen-400)] focus:ring-1 focus:ring-[var(--evergreen-400)]/20 transition"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)]"
                aria-label="Clear search"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {/* Category chips */}
          <div
            className="flex gap-1.5 flex-wrap"
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
        </div>

        {/* Business list */}
        <div ref={sidebarRef} className="flex-1 overflow-y-auto">
          {sidebarList.length === 0 ? (
            <p className="p-4 text-sm text-[var(--muted)]">
              No businesses match your search.
            </p>
          ) : (
            <ul role="list">
              {sidebarList.map((b) => (
                <li key={b.slug}>
                  <button
                    data-slug={b.slug}
                    onClick={() => {
                      setActiveSlug(b.slug);
                      if (
                        b.lat != null &&
                        b.lng != null &&
                        leafletMapRef.current
                      ) {
                        leafletMapRef.current.setView(
                          [b.lat, b.lng],
                          17,
                          { animate: true }
                        );
                      }
                    }}
                    className={`w-full text-left px-4 py-3 border-b border-[var(--border)] transition-colors ${
                      activeSlug === b.slug
                        ? "bg-[var(--evergreen-50)]"
                        : "hover:bg-[var(--wood-50)]"
                    }`}
                  >
                    <p className="font-medium text-sm text-[var(--ink)] leading-tight">
                      {b.name}
                    </p>
                    {/* Bucket prominent, raw category muted beneath */}
                    <p className="text-xs font-semibold text-[var(--evergreen-700)] mt-0.5">
                      {normalizeCategory(b.category)}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {b.category}
                    </p>
                    {b.address && (
                      <p className="text-xs text-[var(--muted)] mt-0.5 truncate">
                        {b.address}
                      </p>
                    )}
                    {b.lat == null && (
                      <p className="text-xs text-[var(--muted)] mt-1 italic">
                        No map pin yet
                      </p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer count */}
        <div className="p-3 border-t border-[var(--border)] flex-shrink-0 bg-white">
          <p className="text-xs text-[var(--muted)]">
            {sidebarList.length} of {businesses.length} businesses
            {geocoded.length > 0 &&
              ` · ${geocoded.length} mapped`}
          </p>
        </div>
      </aside>

      {/* Map panel */}
      <div className="flex-1 relative min-h-0">
        <div ref={mapRef} className="w-full h-full" aria-label="Business map" />

        {/* Map legend */}
        <div className="absolute bottom-8 right-3 z-[1000]">
          {/* Mobile toggle */}
          <button
            className="lg:hidden mb-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 border border-[var(--border)] shadow-wood-sm text-xs font-semibold text-[var(--ink)]"
            onClick={() => setLegendOpen((v) => !v)}
            aria-expanded={legendOpen}
            aria-label="Toggle map legend"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Map Key
          </button>

          {/* Legend card — always visible on desktop, toggled on mobile */}
          <div
            className={`bg-white/97 backdrop-blur-sm rounded-xl shadow-wood-md border border-[var(--border)] p-3 w-44 ${
              legendOpen ? "block" : "hidden lg:block"
            }`}
            role="note"
            aria-label="Map legend"
          >
            <p className="text-xs font-bold text-[var(--ink)] mb-2 uppercase tracking-wide">Map Key</p>

            {/* Category buckets */}
            <ul className="space-y-1.5" role="list">
              {NORMALIZED_CATEGORIES.map((cat) => (
                <li key={cat} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: BUCKET_COLORS[cat] }}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-[var(--ink)] leading-tight">{cat}</span>
                </li>
              ))}
            </ul>

            {/* BID boundary */}
            <div className="mt-2 pt-2 border-t border-[var(--border)] flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-0 border-t-2 border-[#2c541d] opacity-80 rounded" aria-hidden="true" />
              <span className="text-xs text-[var(--ink)]">BID boundary</span>
            </div>
          </div>
        </div>

        {/* Geocoding notice — shown when no businesses are geocoded */}
        {mounted && geocoded.length === 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] max-w-sm w-[calc(100%-2rem)]">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-wood-md border border-[var(--border)] p-4 text-center">
              <p className="text-sm font-medium text-[var(--ink)]">
                Business pins coming soon
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">
                Run{" "}
                <code className="bg-[var(--wood-50)] px-1 py-0.5 rounded text-xs font-mono">
                  node scripts/geocode-businesses.js
                </code>{" "}
                to add map pins for all listings.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
