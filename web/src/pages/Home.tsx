import { useState, useRef } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventMap } from "../components/EventMap";
import { EventCard } from "../components/EventCard";
import { CategoryFilter } from "../components/CategoryFilter";
import { CityPicker } from "../components/CityPicker";
import type { Category } from "../types";

const CITIES = ["All Cities", "New York", "San Francisco", "Austin"] as const;

export function Home() {
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const { events, loading } = useEvents(category, city);
  const listRef = useRef<HTMLDivElement>(null);

  const handleMapSelect = (id: string) => {
    setSelectedEventId(id);
    const el = document.getElementById(`event-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Discover Events
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
          Find something amazing happening near you
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <CityPicker cities={CITIES} selected={city} onChange={setCity} />
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      {/* Map */}
      <div
        className="overflow-hidden"
        style={{
          height: "clamp(250px, 40vh, 400px)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-line)",
        }}
      >
        {!loading && events.length > 0 ? (
          <EventMap
            events={events}
            onSelect={handleMapSelect}
          />
        ) : !loading ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--color-panel)" }}
          >
            <p style={{ color: "var(--color-muted)" }}>No events to show on map</p>
          </div>
        ) : (
          <div
            className="w-full h-full animate-pulse"
            style={{ background: "var(--color-panel)" }}
          />
        )}
      </div>

      {/* Event count */}
      {!loading && (
        <p className="text-sm font-medium" style={{ color: "var(--color-muted)" }}>
          {events.length} event{events.length !== 1 ? "s" : ""}{" "}
          {city ? `in ${city}` : "across all cities"}
          {category ? ` · ${category}` : ""}
        </p>
      )}

      {/* Event list */}
      <div ref={listRef} className="grid gap-3">
        {loading
          ? [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse"
                style={{
                  borderRadius: "var(--radius-card)",
                  background: "var(--color-panel)",
                }}
              />
            ))
          : events.length === 0
            ? (
              <p className="text-center py-16" style={{ color: "var(--color-muted)" }}>
                No events found. Try a different filter!
              </p>
            )
            : events.map((event) => (
              <div
                key={event.id}
                id={`event-${event.id}`}
                className="transition-all duration-200"
                style={{
                  transform: selectedEventId === event.id ? "scale(1.01)" : undefined,
                  boxShadow:
                    selectedEventId === event.id
                      ? "0 0 0 2px var(--color-accent)"
                      : undefined,
                  borderRadius: "var(--radius-card)",
                }}
              >
                <EventCard event={event} />
              </div>
            ))}
      </div>
    </div>
  );
}
