// Server-only module — uses Node.js `fs`. Do NOT import in client components.
// For types and pure utils, import from @/lib/types instead.

import fs from "fs";
import path from "path";
import type { Event } from "@/lib/types";

export type { Event } from "@/lib/types";
export { formatEventDate, formatMonthDay, isUpcoming } from "@/lib/types";

const eventsDir = path.join(process.cwd(), "content", "events");

export function getAllEvents(): Event[] {
  const files = fs.readdirSync(eventsDir).filter((f) => f.endsWith(".json"));
  const events = files.map((file) => {
    const raw = fs.readFileSync(path.join(eventsDir, file), "utf-8");
    return JSON.parse(raw) as Event;
  });
  // Sort newest first
  return events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getEventBySlug(slug: string): Event | undefined {
  const events = getAllEvents();
  return events.find((e) => e.slug === slug);
}

export function getEventTypes(): string[] {
  const events = getAllEvents();
  const types = Array.from(new Set(events.map((e) => e.type)));
  return types.sort();
}

export function getEventYears(): number[] {
  const events = getAllEvents();
  const years = Array.from(
    new Set(events.map((e) => new Date(e.date).getFullYear()))
  );
  return years.sort((a, b) => b - a);
}
