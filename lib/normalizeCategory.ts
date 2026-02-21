export type NormalizedCategory =
  | "Food & Drink"
  | "Medical"
  | "Neighborhood Amenities"
  | "Religious Institution"
  | "Services"
  | "Shopping";

export const NORMALIZED_CATEGORIES: NormalizedCategory[] = [
  "Food & Drink",
  "Medical",
  "Neighborhood Amenities",
  "Religious Institution",
  "Services",
  "Shopping",
];

const CATEGORY_MAP: Record<string, NormalizedCategory> = {
  "Food Services":           "Food & Drink",
  "Health Services":         "Medical",
  Banks:                     "Neighborhood Amenities",
  "Educational Services":    "Neighborhood Amenities",
  "Event Venue":             "Neighborhood Amenities",
  "Nonprofit Organizations": "Neighborhood Amenities",
  Other:                     "Neighborhood Amenities", // raw: "Other"
  Automotive:                "Services",
  "Construction & repair":   "Services",
  "Fitness Services":        "Services",
  "Laundromats & Cleaners":  "Services",
  "Personal Services":       "Services",
  "Pet Services":            "Services",
  "Professional Services":   "Services",
  "Shoe Repair & Tailors":   "Services",
  Retail:                    "Shopping",
};

export function normalizeCategory(raw: string): NormalizedCategory {
  return CATEGORY_MAP[raw] ?? "Neighborhood Amenities"; // default bucket
}
