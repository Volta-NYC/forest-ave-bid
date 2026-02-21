import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import EventsFilter from "@/components/EventsFilter";
import { getAllEvents, getEventTypes, getEventYears } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse upcoming and past events on Forest Avenue—from street fairs and holiday markets to community cleanups and business town halls.",
};

export default function EventsPage() {
  const events = getAllEvents();
  const types = getEventTypes();
  const years = getEventYears();

  return (
    <>
      <Hero
        eyebrow="Calendar"
        title="Forest Avenue Events"
        subtitle="From annual celebrations to community meetups, there's always something happening on Forest Avenue. Browse our full calendar below."
      />

      <section className="section-padding bg-[var(--bg)]" aria-labelledby="events-heading">
        <div className="container-wide">
          <div className="mb-10">
            <SectionHeading
              eyebrow={`${events.length} event${events.length !== 1 ? "s" : ""}`}
              title="All events"
              description="Use the filters to find events by type or year."
            />
          </div>
          <EventsFilter events={events} types={types} years={years} />
        </div>
      </section>
    </>
  );
}
