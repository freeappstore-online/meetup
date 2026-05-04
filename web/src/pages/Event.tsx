import { useParams, Link } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { EventDetail } from "../components/EventDetail";

export function EventPage() {
  const { id } = useParams<{ id: string }>();
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded" style={{ background: "var(--color-panel)" }} />
        <div className="h-40 rounded" style={{ background: "var(--color-panel)", borderRadius: "var(--radius-card)" }} />
      </div>
    );
  }

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="text-center py-12">
        <p style={{ color: "var(--color-muted)" }}>Event not found.</p>
        <Link to="/" className="mt-4 inline-block font-medium" style={{ color: "var(--color-accent)" }}>
          Back to events
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm mb-6"
        style={{ color: "var(--color-muted)" }}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </Link>
      <EventDetail event={event} />
    </div>
  );
}
