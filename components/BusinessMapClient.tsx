"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Business } from "@/lib/types";
import { categoryColor } from "./CategoryIcons";

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
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Derive categories from businesses
  const categories = useMemo(() => {
    const cats = Array.from(new Set(businesses.map((b) => b.category))).sort();
    return ["All", ...cats];
  }, [businesses]);

  // Geocoded businesses (those with lat/lng)
  const geocoded = useMemo(
    () => businesses.filter((b) => b.lat != null && b.lng != null),
    [businesses]
  );

  // Sidebar list — filtered by search + category
  const sidebarList = useMemo(() => {
    const q = query.toLowerCase().trim();
    return [...businesses]
      .filter((b) => {
        const catMatch =
          selectedCategory === "All" || b.category === selectedCategory;
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

      // Business markers (only geocoded)
      geocoded.forEach((b) => {
        if (b.lat == null || b.lng == null) return;
        const marker = L.marker([b.lat, b.lng], { icon: DefaultIcon }).addTo(
          map
        );
        marker.bindPopup(
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
                    <p
                      className={`text-xs mt-0.5 font-medium inline-block px-1.5 py-0.5 rounded ${categoryColor(
                        b.category
                      )}`}
                    >
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
