import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import { getAllBusinesses } from "@/lib/businesses";
import MapWrapper from "@/components/MapWrapper";

export const metadata: Metadata = {
  title: "Business Map",
  description:
    "Interactive map of Forest Avenue BID businesses — explore the corridor from Hart Blvd to Broadway, Staten Island.",
};

// SSR must be disabled for Leaflet (uses window/document) — handled in MapWrapper

export default function MapPage() {
  const businesses = getAllBusinesses();
  const boundary = JSON.parse(
    readFileSync(
      path.join(process.cwd(), "content", "bid-boundary.geojson"),
      "utf8"
    )
  ) as GeoJSON.FeatureCollection;

  return (
    <main className="pt-16">
      {/* Page header — wood texture with evergreen overlay */}
      <div className="wood-bg-hero text-white py-5 px-6">
        <div className="container-wide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="font-headline font-black text-2xl">
              Business Map
            </h1>
            <p className="text-white/70 text-sm mt-0.5">
              Forest Avenue corridor · Hart Blvd to Broadway, Staten Island
            </p>
          </div>
          <a
            href="/our-businesses"
            className="text-sm text-white/80 hover:text-white underline underline-offset-2 transition-colors self-start sm:self-auto"
          >
            ← Full directory
          </a>
        </div>
      </div>

      <MapWrapper businesses={businesses} boundary={boundary} />
    </main>
  );
}
