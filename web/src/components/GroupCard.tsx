import { Link } from "react-router-dom";
import type { Group } from "../types";

export function GroupCard({ group }: { group: Group }) {
  return (
    <Link
      to={`/group/${group.id}`}
      className="block p-5 transition-shadow hover:shadow-lg"
      style={{
        borderRadius: "var(--radius-card)",
        background: "var(--color-panel)",
        border: "1px solid var(--color-line)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ background: "var(--color-accent)" }}
        >
          {group.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate" style={{ color: "var(--color-ink)" }}>
            {group.name}
          </h3>
          <p className="text-sm truncate" style={{ color: "var(--color-muted)" }}>
            {group.description}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
            {group.memberCount} members
          </p>
        </div>
        <span
          className="px-2 py-0.5 text-xs font-medium rounded-full shrink-0"
          style={{ background: "var(--color-line)", color: "var(--color-ink)" }}
        >
          {group.category}
        </span>
      </div>
    </Link>
  );
}
