import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import { getAllBusinesses } from "@/lib/businesses";
import MapWrapper from "@/components/MapWrapper";
import { imageManifest } from "@/lib/imageManifest";

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
      {/* Page header — mural background */}
      <div
        className="text-white py-16 md:py-24 px-6 min-h-[42vh] md:min-h-[52vh] flex items-end mural-pan"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.24), rgba(0,0,0,0.24)), url('${imageManifest.headerMurals.map}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-wide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="font-headline font-black text-4xl md:text-5xl">
              Business Map
            </h1>
            <p className="text-white/80 text-base mt-1.5">
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
