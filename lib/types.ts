// Shared types — safe to import in both server and client components

export interface Event {
  title: string;
  slug: string;
  date: string;
  endDate: string;
  time: string;
  location: string;
  summary: string;
  body: string;
  tags: string[];
  type: string;
  image: string;
}

export interface Business {
  name: string;
  slug: string;
  category: string;
  address: string;
  phone: string;
  website: string;
  description: string;
}

// ── Pure date utilities (no Node.js APIs) ─────────────────────────

export function formatEventDate(dateStr: string, endDateStr?: string): string {
  const start = new Date(dateStr + "T00:00:00");
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const startFormatted = start.toLocaleDateString("en-US", options);
  if (endDateStr) {
    const end = new Date(endDateStr + "T00:00:00");
    const endFormatted = end.toLocaleDateString("en-US", options);
    return `${startFormatted} – ${endFormatted}`;
  }
  return startFormatted;
}

export function formatMonthDay(dateStr: string): { month: string; day: string } {
  const d = new Date(dateStr + "T00:00:00");
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }),
    day: String(d.getDate()),
  };
}
