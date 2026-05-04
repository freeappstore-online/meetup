import { Link } from "react-router-dom";
import type { Event } from "../types";
import { CATEGORIES } from "../types";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  let relative = "";
  if (diffDays === 0) relative = "Today";
  else if (diffDays === 1) relative = "Tomorrow";
  else if (diffDays > 1 && diffDays < 7)
    relative = d.toLocaleDateString("en-US", { weekday: "long" });

  const full = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return relative ? `${relative} · ${full.split(", ").slice(1).join(", ")}` : full;
}

function categoryColor(cat: string): string {
  const colors: Record<string, string> = {
    tech: "#6366f1",
    music: "#ec4899",
    sports: "#f59e0b",
    arts: "#8b5cf6",
    social: "#10b981",
    outdoor: "#22c55e",
    gaming: "#ef4444",
    food: "#f97316",
  };
  return colors[cat] || "#6b7280";
}

export function EventCard({ event }: { event: Event }) {
  const catInfo = CATEGORIES.find((c) => c.value === event.category);
  const color = categoryColor(event.category);

  return (
    <Link
      to={`/event/${event.id}`}
      className="block p-4 transition-all duration-150 hover:shadow-md active:scale-[0.99]"
      style={{
        borderRadius: "var(--radius-card)",
        background: "var(--color-panel)",
        border: "1px solid var(--color-line)",
      }}
    >
      <div className="flex gap-4">
        {/* Date badge */}
        <div
          className="shrink-0 w-14 h-14 flex flex-col items-center justify-center rounded-xl text-white"
          style={{ background: color }}
        >
          <span className="text-[10px] font-bold uppercase leading-none">
            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
          </span>
          <span className="text-xl font-bold leading-tight">
            {new Date(event.date).getDate()}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium" style={{ color }}>
              {catInfo?.emoji} {catInfo?.label}
            </span>
            <span className="text-xs" style={{ color: "var(--color-muted)" }}>
              · {event.city}
            </span>
          </div>
          <h3
            className="font-semibold leading-snug mb-1 line-clamp-1"
            style={{ color: "var(--color-ink)" }}
          >
            {event.title}
          </h3>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            {formatDate(event.date)}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs" style={{ color: "var(--color-muted)" }}>
              📍 {event.location.split(",")[0]}
            </span>
            <span className="text-xs font-medium" style={{ color }}>
              {event.attendeeCount} going
            </span>
          </div>
        </div>
      </div>

      {event.groupName && (
        <div
          className="mt-3 pt-2.5 text-xs border-t"
          style={{ borderColor: "var(--color-line)", color: "var(--color-muted)" }}
        >
          Hosted by <span className="font-medium" style={{ color: "var(--color-ink)" }}>{event.groupName}</span>
        </div>
      )}
    </Link>
  );
}
