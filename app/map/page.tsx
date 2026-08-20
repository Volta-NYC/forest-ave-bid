import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import { getAllBusinesses } from "@/lib/businesses";
import Hero from "@/components/Hero";
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
    <>
      <Hero
        eyebrow="Interactive map"
        title="Business Map"
        subtitle="Forest Avenue corridor · Hart Blvd to Broadway, Staten Island"
        backgroundImageUrl={imageManifest.headerMurals.map}
        overlayStrength={0.2}
        pattern={false}
        primaryCta={{ label: "Full directory", href: "/our-businesses" }}
      />

      <section className="section-reveal">
        <MapWrapper businesses={businesses} boundary={boundary} />
      </section>
    </>
  );
}
