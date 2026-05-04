import type { Event } from "../types";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: Event[];
  loading: boolean;
}

export function EventList({ events, loading }: EventListProps) {
  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse"
            style={{
              borderRadius: "var(--radius-card)",
              background: "var(--color-panel)",
            }}
          />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <p className="text-center py-12" style={{ color: "var(--color-muted)" }}>
        No events found. Check back soon!
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
