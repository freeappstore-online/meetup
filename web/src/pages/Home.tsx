import { useEvents } from "../hooks/useEvents";
import { EventList } from "../components/EventList";

export function Home() {
  const { events, loading } = useEvents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Upcoming Events
        </h1>
        <p className="mt-1" style={{ color: "var(--color-muted)" }}>
          Find something fun happening near you
        </p>
      </div>
      <EventList events={events} loading={loading} />
    </div>
  );
}
