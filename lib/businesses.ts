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

export function getAllBusinesses(): Business[] {
  return businessesData as Business[];
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
