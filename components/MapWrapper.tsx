"use client";

import dynamic from "next/dynamic";
import type { Business } from "@/lib/types";

// Leaflet requires the browser DOM — SSR must be disabled
const BusinessMapClient = dynamic(
  () => import("./BusinessMapClient"),
  { ssr: false }
);

export default function MapWrapper({
  businesses,
  boundary,
}: {
  businesses: Business[];
  boundary: GeoJSON.FeatureCollection;
}) {
  return <BusinessMapClient businesses={businesses} boundary={boundary} />;
}
