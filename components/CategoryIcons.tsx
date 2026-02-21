// Category icon SVG fallbacks — shown when a business has no image
// All icons are simple, accessible SVG paths.

const ICONS: Record<string, React.ReactNode> = {
  Automotive: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M5 17H3a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-2" />
      <rect x="7" y="14" width="10" height="6" rx="1" />
      <circle cx="7.5" cy="19.5" r="1.5" /><circle cx="16.5" cy="19.5" r="1.5" />
      <path d="M5 9L7 3h10l2 6" />
    </svg>
  ),
  Banks: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" />
    </svg>
  ),
  "Construction & repair": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "Educational Services": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  "Event Venue": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  "Fitness Services": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
    </svg>
  ),
  "Food Services": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  ),
  "Health Services": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "Laundromats & Cleaners": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.66.51-3.2 1.38-4.47L16.47 18.62A7.96 7.96 0 0112 20zm6.62-3.53L7.53 5.38A7.96 7.96 0 0112 4c4.41 0 8 3.59 8 8 0 1.66-.51 3.2-1.38 4.47z" fill="currentColor" stroke="none"/>
    </svg>
  ),
  "Nonprofit Organizations": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  "Personal Services": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" />
      <path d="M20 4L4 20" />
    </svg>
  ),
  "Pet Services": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5" />
      <path d="M8 14v.5M16 14v.5M11.25 16.25h1.5M12 16v.5" />
      <path d="M16.5 20c.5 1.5-1.5 2-4.5 2s-5-0.5-4.5-2c.667-2 1.833-3 4.5-3s3.833 1 4.5 3z" />
    </svg>
  ),
  "Professional Services": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4M10 14h4" />
    </svg>
  ),
  Retail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  "Shoe Repair & Tailors": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Other: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
    </svg>
  ),
};

const CAT_COLORS: Record<string, string> = {
  Automotive:                 "bg-slate-100   text-slate-700",
  Banks:                      "bg-blue-50     text-blue-700",
  "Construction & repair":    "bg-orange-50   text-orange-700",
  "Educational Services":     "bg-purple-50   text-purple-700",
  "Event Venue":              "bg-pink-50     text-pink-700",
  "Fitness Services":         "bg-red-50      text-red-700",
  "Food Services":            "bg-amber-50    text-amber-800",
  "Health Services":          "bg-green-50    text-green-700",
  "Laundromats & Cleaners":   "bg-cyan-50     text-cyan-700",
  "Nonprofit Organizations":  "bg-teal-50     text-teal-700",
  "Personal Services":        "bg-fuchsia-50  text-fuchsia-700",
  "Pet Services":             "bg-lime-50     text-lime-700",
  "Professional Services":    "bg-indigo-50   text-indigo-700",
  Retail:                     "bg-rose-50     text-rose-700",
  "Shoe Repair & Tailors":    "bg-stone-100   text-stone-700",
  Other:                      "bg-gray-50     text-gray-600",
};

export function CategoryIcon({ category, className = "" }: { category: string; className?: string }) {
  const icon = ICONS[category] ?? ICONS["Other"];
  const color = CAT_COLORS[category] ?? CAT_COLORS["Other"];
  return (
    <div
      className={`flex items-center justify-center rounded-xl ${color} ${className}`}
      aria-hidden="true"
    >
      {icon}
    </div>
  );
}

export function categoryColor(category: string): string {
  return CAT_COLORS[category] ?? CAT_COLORS["Other"];
}
