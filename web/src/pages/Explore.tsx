import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { useGroups } from "../hooks/useGroups";
import { EventCard } from "../components/EventCard";
import { GroupList } from "../components/GroupList";
import { CategoryFilter } from "../components/CategoryFilter";
import { EventMap } from "../components/EventMap";
import type { Category } from "../types";

export function Explore() {
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [tab, setTab] = useState<"events" | "groups">("events");
  const { events, loading: eventsLoading } = useEvents(category);
  const { groups, loading: groupsLoading } = useGroups();

  const filteredGroups = category
    ? groups.filter((g) => g.category === category)
    : groups;

  return (
    <div className="space-y-5">
      <div>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Explore
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
          Browse events and communities by category
        </p>
      </div>

      <CategoryFilter selected={category} onChange={setCategory} />

      <div className="flex gap-1 p-1 rounded-lg" style={{ background: "var(--color-panel)" }}>
        {(["events", "groups"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-150 capitalize"
            style={{
              background: tab === t ? "var(--color-paper)" : "transparent",
              color: tab === t ? "var(--color-ink)" : "var(--color-muted)",
              boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "events" ? (
        <div className="space-y-4">
          {!eventsLoading && events.length > 0 && (
            <div
              className="overflow-hidden"
              style={{
                height: 220,
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--color-line)",
              }}
            >
              <EventMap events={events} />
            </div>
          )}
          <div className="grid gap-3">
            {eventsLoading
              ? [1, 2, 3].map((i) => (
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
                  <p className="text-center py-12" style={{ color: "var(--color-muted)" }}>
                    No events found for this category.
                  </p>
                )
                : events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
          </div>
        </div>
      ) : (
        <GroupList groups={filteredGroups} loading={groupsLoading} />
      )}
    </div>
  );
}
