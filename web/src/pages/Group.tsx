import { useParams, Link } from "react-router-dom";
import { useGroups } from "../hooks/useGroups";
import { useEvents } from "../hooks/useEvents";
import { EventList } from "../components/EventList";

export function GroupPage() {
  const { id } = useParams<{ id: string }>();
  const { groups, loading: groupsLoading } = useGroups();
  const { events, loading: eventsLoading } = useEvents();

  if (groupsLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded" style={{ background: "var(--color-panel)" }} />
        <div className="h-24 rounded" style={{ background: "var(--color-panel)", borderRadius: "var(--radius-card)" }} />
      </div>
    );
  }

  const group = groups.find((g) => g.id === id);

  if (!group) {
    return (
      <div className="text-center py-12">
        <p style={{ color: "var(--color-muted)" }}>Group not found.</p>
        <Link to="/explore" className="mt-4 inline-block font-medium" style={{ color: "var(--color-accent)" }}>
          Browse groups
        </Link>
      </div>
    );
  }

  const groupEvents = events.filter((e) => e.groupName === group.name);

  return (
    <div className="space-y-6">
      <Link
        to="/explore"
        className="inline-flex items-center gap-1 text-sm"
        style={{ color: "var(--color-muted)" }}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </Link>

      <div
        className="p-6"
        style={{
          borderRadius: "var(--radius-card)",
          background: "var(--color-panel)",
          border: "1px solid var(--color-line)",
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0"
            style={{ background: "var(--color-accent)" }}
          >
            {group.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {group.name}
            </h1>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              {group.memberCount} members
            </p>
          </div>
        </div>
        <p style={{ color: "var(--color-muted)" }}>{group.description}</p>
        <span
          className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full"
          style={{ background: "var(--color-line)", color: "var(--color-ink)" }}
        >
          {group.category}
        </span>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Upcoming Events
        </h2>
        <EventList events={groupEvents} loading={eventsLoading} />
      </div>
    </div>
  );
}
