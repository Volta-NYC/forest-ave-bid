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

const FOREST_AVE_CENTER: [number, number] = [40.6301, -74.109];
const DEFAULT_ZOOM = 15;

function isForestAveBusiness(b: Business): boolean {
  const text = [b.address, b.notes, b.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (!text) return false;
  return /\bforest\s+av(?:e|enue)?\b/i.test(text);
}

function hasValidCoordinate(b: Business): boolean {
  if (b.lat == null || b.lng == null) return false;
  // Guard against occasional bad geocode points far outside Staten Island.
  return (
    b.lat >= 40.58 &&
    b.lat <= 40.68 &&
    b.lng >= -74.25 &&
    b.lng <= -74.02
  );
}

export default function BusinessMapClient({ businesses, boundary }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<import("leaflet").Map | null>(null);
  const markerLayerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const markerBySlugRef = useRef<
    Map<string, import("leaflet").CircleMarker>
  >(new Map());
  const [mounted, setMounted] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [locating, setLocating] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const forestAveBusinesses = useMemo(
    () => businesses.filter((b) => isForestAveBusiness(b)),
    [businesses]
  );

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

  // Sidebar list — filtered by normalised bucket + search
  const sidebarList = useMemo(() => {
    const q = query.toLowerCase().trim();
    return [...forestAveBusinesses]
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
  }, [forestAveBusinesses, query, selectedCategory]);

  // Geocoded businesses (those with lat/lng) currently visible in the sidebar filter.
  const filteredGeocoded = useMemo(
    () => sidebarList.filter((b) => hasValidCoordinate(b)),
    [sidebarList]
  );

  const geocodedCount = useMemo(
    () => forestAveBusinesses.filter((b) => hasValidCoordinate(b)).length,
    [forestAveBusinesses]
  );

  const markerRadius = useMemo(() => {
    if (mapZoom <= 12) return 16;
    if (mapZoom <= 13) return 15;
    if (mapZoom <= 14) return 14;
    if (mapZoom <= 15) return 13;
    return 12;
  }, [mapZoom]);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: FOREST_AVE_CENTER,
        zoom: DEFAULT_ZOOM,
        scrollWheelZoom: true,
      });
      leafletMapRef.current = map;
      setMapZoom(map.getZoom());
      map.on("zoomend", () => {
        setMapZoom(map.getZoom());
      });

      // OpenStreetMap tiles (free, no key)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Use boundary geometry only for fit-bounds; hide outline/fill entirely.
      if (boundary) {
        const boundaryLayer = L.geoJSON(boundary as Parameters<typeof L.geoJSON>[0]);
        const bounds = boundaryLayer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20] });
        }
      }

      markerLayerRef.current = L.layerGroup().addTo(map);
      map.invalidateSize();
      setTimeout(() => map.invalidateSize(), 120);

      setMounted(true);
      setMapReady(true);
    });

    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!leafletMapRef.current || !markerLayerRef.current) return;

    import("leaflet").then((L) => {
      if (!markerLayerRef.current) return;
      markerLayerRef.current.clearLayers();
      markerBySlugRef.current.clear();

      const escapeHtml = (value: string) =>
        value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#39;");

      filteredGeocoded.forEach((b) => {
        if (b.lat == null || b.lng == null) return;
        const bucket = normalizeCategory(b.category);
        const color = BUCKET_COLORS[bucket];
        const circleMarker = L.circleMarker([b.lat, b.lng], {
          radius: markerRadius,
          fillColor: color,
          color: "#fff",
          weight: 4,
          opacity: 1,
          fillOpacity: 0.98,
        });
        circleMarker.bringToFront();

        const profileUrl = `/our-businesses/${encodeURIComponent(b.slug)}`;
        circleMarker.bindPopup(
          `<strong>${escapeHtml(b.name)}</strong><br/><span style="color:#5a5248;font-size:0.8em">${escapeHtml(b.category)}</span>${
            b.address
              ? `<br/><span style="font-size:0.8em">${escapeHtml(b.address)}</span>`
              : ""
          }${
            b.phone
              ? `<br/><a href="tel:${b.phone.replace(/\D/g, "")}" style="font-size:0.8em">${escapeHtml(b.phone)}</a>`
              : ""
          }${
            b.website
              ? `<br/><a href="${escapeHtml(b.website)}" target="_blank" rel="noopener noreferrer" style="font-size:0.8em;color:#3d7028">Open website ↗</a>`
              : ""
          }<br/><a href="${profileUrl}" style="font-size:0.8em;color:#1f4f2c">View profile →</a>`
        );

        markerLayerRef.current?.addLayer(circleMarker);
        markerBySlugRef.current.set(b.slug, circleMarker);
      });
    });
  }, [filteredGeocoded, markerRadius]);

  // Keep map viewport focused on available pins when no specific business is active.
  useEffect(() => {
    if (!leafletMapRef.current || filteredGeocoded.length === 0 || activeSlug) return;
    import("leaflet").then((L) => {
      if (!leafletMapRef.current) return;
      const bounds = L.latLngBounds(
        filteredGeocoded.map((b) => [b.lat as number, b.lng as number] as [number, number])
      );
      if (bounds.isValid()) {
        leafletMapRef.current.fitBounds(bounds, { padding: [36, 36], maxZoom: 16 });
      }
    });
  }, [filteredGeocoded, activeSlug]);

  useEffect(() => {
    const onResize = () => leafletMapRef.current?.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
    <div className="flex flex-col lg:flex-row min-h-[72vh] lg:h-[calc(100vh-8rem)] overflow-hidden">
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
          <div className="mb-3 flex items-center gap-2">
            <button
              onClick={() => {
                if (!leafletMapRef.current) return;
                setLocating(true);
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    leafletMapRef.current?.setView([latitude, longitude], 16, {
                      animate: true,
                    });
                    setLocating(false);
                  },
                  () => setLocating(false),
                  { enableHighAccuracy: true, timeout: 10000 }
                );
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] bg-white hover:bg-[var(--wood-50)] transition-colors"
            >
              {locating ? "Locating…" : "Locate me"}
            </button>
            <button
              onClick={() => {
                if (!leafletMapRef.current) return;
                setActiveSlug(null);
                if (filteredGeocoded.length > 0) {
                  import("leaflet").then((L) => {
                    const bounds = L.latLngBounds(
                      filteredGeocoded.map(
                        (b) => [b.lat as number, b.lng as number] as [number, number]
                      )
                    );
                    if (bounds.isValid()) {
                      leafletMapRef.current?.fitBounds(bounds, {
                        padding: [36, 36],
                        maxZoom: 16,
                      });
                    }
                  });
                } else {
                  leafletMapRef.current.setView(FOREST_AVE_CENTER, DEFAULT_ZOOM, {
                    animate: true,
                  });
                }
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] bg-white hover:bg-[var(--wood-50)] transition-colors"
            >
              Reset view
            </button>
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
                        hasValidCoordinate(b) &&
                        leafletMapRef.current
                      ) {
                        leafletMapRef.current.setView([b.lat as number, b.lng as number], 17, {
                          animate: true,
                        });
                        markerBySlugRef.current.get(b.slug)?.openPopup();
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
                    <a
                      href={`/our-businesses/${b.slug}`}
                      className="mt-1 inline-flex text-xs text-[var(--evergreen-700)] hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View profile →
                    </a>
                    {!hasValidCoordinate(b) && (
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
            {sidebarList.length} of {forestAveBusinesses.length} businesses
            {geocodedCount > 0 && ` · ${filteredGeocoded.length} shown on map`}
          </p>
        </div>
      </aside>

      {/* Map panel */}
      <div className="flex-1 relative min-h-0">
        <div ref={mapRef} className="w-full h-full min-h-[430px]" aria-label="Business map" />
        {!mapReady && (
          <div className="absolute inset-0 bg-[var(--wood-50)] flex items-center justify-center text-sm text-[var(--muted)]">
            Loading map…
          </div>
        )}

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
                    className="w-7 h-7 rounded-full flex-shrink-0"
                    style={{ background: BUCKET_COLORS[cat] }}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-[var(--ink)] leading-tight">{cat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Geocoding notice — shown when no businesses are geocoded */}
        {mounted && geocodedCount === 0 && (
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
