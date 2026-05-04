import { Link } from "react-router-dom";
import type { Event } from "../types";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function EventCard({ event }: { event: Event }) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="block p-5 transition-shadow hover:shadow-lg"
      style={{
        borderRadius: "var(--radius-card)",
        background: "var(--color-panel)",
        border: "1px solid var(--color-line)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span
            className="inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2"
            style={{ background: "var(--color-accent)", color: "#fff" }}
          >
            {event.category}
          </span>
          <h3 className="font-semibold text-lg leading-tight mb-1 truncate" style={{ color: "var(--color-ink)" }}>
            {event.title}
          </h3>
          <p className="text-sm mb-2" style={{ color: "var(--color-muted)" }}>
            {formatDate(event.date)}
          </p>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            {event.location}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-2xl font-bold" style={{ color: "var(--color-accent)" }}>
            {event.attendeeCount}
          </span>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>going</p>
        </div>
      </div>
      {event.groupName && (
        <p className="text-xs mt-3 pt-3 border-t" style={{ borderColor: "var(--color-line)", color: "var(--color-muted)" }}>
          Hosted by {event.groupName}
        </p>
      )}
    </Link>
  );
}
