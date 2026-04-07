import { getAllEvents } from "@/lib/events";

function toUtcStamp(dateStr: string) {
  const date = new Date(`${dateStr}T12:00:00Z`);
  return date.toISOString().replace(/[-:]/g, "").replace(".000Z", "Z");
}

export async function GET() {
  const events = getAllEvents();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Forest Ave BID//Events Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  events.forEach((event) => {
    const dtStart = toUtcStamp(event.date);
    const dtEnd = toUtcStamp(event.endDate || event.date);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${event.slug}@forestavenuebid.com`,
      `DTSTAMP:${dtStart}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${event.title.replace(/,/g, "\\,")}`,
      `LOCATION:${event.location.replace(/,/g, "\\,")}`,
      `DESCRIPTION:${event.summary.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="forest-ave-bid-events.ics"',
      "Cache-Control": "no-store",
    },
  });
}
