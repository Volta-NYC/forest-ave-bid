import businessesData from "@/content/businesses.json";
import type { Business } from "@/lib/types";

export type { Business } from "@/lib/types";

export const BUSINESS_CATEGORIES = [
  "All",
  "Automotive",
  "Beauty & Personal Care",
  "Health & Wellness",
  "Home & Hardware",
  "Professional Services",
  "Restaurants & Dining",
  "Retail & Gifts",
  "Services",
] as const;

export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];

function safeText(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function safeOptionalText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

export function getAllBusinesses(): Business[] {
  const rows = Array.isArray(businessesData) ? businessesData : [];
  return rows.map((raw, idx) => {
    const r = (raw ?? {}) as Record<string, unknown>;
    return {
      name: safeText(r.name, `Business ${idx + 1}`),
      slug: safeText(r.slug, `business-${idx + 1}`),
      category: safeText(r.category, "Uncategorized"),
      address: safeOptionalText(r.address),
      lat: typeof r.lat === "number" ? r.lat : undefined,
      lng: typeof r.lng === "number" ? r.lng : undefined,
      phone: safeOptionalText(r.phone),
      website: safeOptionalText(r.website),
      image: safeOptionalText(r.image),
      notes: safeOptionalText(r.notes),
      description: safeOptionalText(r.description),
    } satisfies Business;
  });
}

export function getBusinessesByCategory(category: string): Business[] {
  if (category === "All") return getAllBusinesses();
  return getAllBusinesses().filter((b) => b.category === category);
}

export function getBusinessCategories(): string[] {
  const businesses = getAllBusinesses();
  const cats = Array.from(new Set(businesses.map((b) => b.category)));
  return ["All", ...cats.sort()];
}
