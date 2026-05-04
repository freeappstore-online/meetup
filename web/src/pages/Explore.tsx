import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { useGroups } from "../hooks/useGroups";
import { EventList } from "../components/EventList";
import { GroupList } from "../components/GroupList";
import { CategoryFilter } from "../components/CategoryFilter";
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Explore
        </h1>
        <p className="mt-1" style={{ color: "var(--color-muted)" }}>
          Browse events and communities by category
        </p>
      </div>

      <CategoryFilter selected={category} onChange={setCategory} />

      <div className="flex gap-4 border-b" style={{ borderColor: "var(--color-line)" }}>
        <button
          onClick={() => setTab("events")}
          className="pb-2 text-sm font-medium border-b-2 transition-colors"
          style={{
            borderColor: tab === "events" ? "var(--color-accent)" : "transparent",
            color: tab === "events" ? "var(--color-accent)" : "var(--color-muted)",
          }}
        >
          Events
        </button>
        <button
          onClick={() => setTab("groups")}
          className="pb-2 text-sm font-medium border-b-2 transition-colors"
          style={{
            borderColor: tab === "groups" ? "var(--color-accent)" : "transparent",
            color: tab === "groups" ? "var(--color-accent)" : "var(--color-muted)",
          }}
        >
          Groups
        </button>
      </div>

      {tab === "events" ? (
        <EventList events={events} loading={eventsLoading} />
      ) : (
        <GroupList groups={filteredGroups} loading={groupsLoading} />
      )}
    </div>
  );
}
