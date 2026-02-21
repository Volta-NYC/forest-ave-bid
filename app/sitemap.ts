import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://forestavenuebid.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/our-businesses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic event routes
  // In a real app, import getAllEvents() here
  // For static generation compatibility, we'll keep this simple
  const eventSlugs = [
    "spring-corridor-cleanup-2025",
    "small-business-saturday-2024",
    "holiday-market-2024",
    "forest-avenue-street-fair-2025",
    "business-owners-town-hall-2025",
  ];

  const eventRoutes: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${base}/events/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}
