import { NextResponse } from "next/server";
import { getAllEvents, isUpcoming } from "@/lib/events";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includePast = searchParams.get("includePast") === "true";
  const type = searchParams.get("type");
  const year = searchParams.get("year");

  let events = getAllEvents();

  if (!includePast) {
    events = events.filter((event) => isUpcoming(event.date));
  }
  if (type) {
    const normalizedType = type.toLowerCase().trim();
    events = events.filter(
      (event) => event.type.toLowerCase().trim() === normalizedType
    );
  }
  if (year) {
    const yearNum = Number(year);
    if (!Number.isNaN(yearNum)) {
      events = events.filter(
        (event) => new Date(event.date + "T00:00:00").getFullYear() === yearNum
      );
    }
  }

  return NextResponse.json({
    count: events.length,
    events,
  });
}
