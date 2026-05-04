import type { Group } from "../types";
import { GroupCard } from "./GroupCard";

interface GroupListProps {
  groups: Group[];
  loading: boolean;
}

export function GroupList({ groups, loading }: GroupListProps) {
  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse"
            style={{
              borderRadius: "var(--radius-card)",
              background: "var(--color-panel)",
            }}
          />
        ))}
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <p className="text-center py-12" style={{ color: "var(--color-muted)" }}>
        No groups found.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
}
