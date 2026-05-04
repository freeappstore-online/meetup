import { useState } from "react";
import type { Event } from "../types";
import { CATEGORIES } from "../types";
import { useAuth } from "../hooks/useAuth";
import { EventMap } from "./EventMap";
import { fas } from "../lib/api";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
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

export function EventDetail({ event }: { event: Event }) {
  const { user, signIn } = useAuth();
  const [rsvpd, setRsvpd] = useState(false);
  const catInfo = CATEGORIES.find((c) => c.value === event.category);
  const color = categoryColor(event.category);

  const handleRsvp = async () => {
    if (!user) {
      await signIn();
      return;
    }
    try {
      if (rsvpd) {
        await fas.del(`/meetup/events/${event.id}/rsvp`);
      } else {
        await fas.post(`/meetup/events/${event.id}/rsvp`);
      }
      setRsvpd(!rsvpd);
    } catch {
      // Silently fail — user sees no change
    }
  };

  return (
    <div className="space-y-6">
      {/* Category + title */}
      <div>
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3"
          style={{ background: color, color: "#fff" }}
        >
          {catInfo?.emoji} {catInfo?.label}
        </span>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          {event.title}
        </h1>
        {event.groupName && (
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            Hosted by <span className="font-medium" style={{ color: "var(--color-ink)" }}>{event.groupName}</span>
          </p>
        )}
      </div>

      {/* Info card */}
      <div
        className="p-4 space-y-3"
        style={{
          borderRadius: "var(--radius-card)",
          background: "var(--color-panel)",
          border: "1px solid var(--color-line)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">📅</span>
          <span className="text-sm">{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg">📍</span>
          <div>
            <span className="text-sm">{event.location}</span>
            <span className="block text-xs" style={{ color: "var(--color-muted)" }}>
              {event.city}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg">👥</span>
          <span className="text-sm font-medium">
            {event.attendeeCount + (rsvpd ? 1 : 0)} attending
          </span>
        </div>
      </div>

      {/* Map */}
      <div
        className="overflow-hidden"
        style={{
          height: 200,
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-line)",
        }}
      >
        <EventMap events={[event]} />
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          About this event
        </h2>
        <p className="leading-relaxed text-[15px]" style={{ color: "var(--color-muted)" }}>
          {event.description}
        </p>
      </div>

      {/* RSVP */}
      <button
        onClick={handleRsvp}
        className="w-full py-3.5 px-6 font-bold text-white transition-all duration-150 active:scale-[0.98]"
        style={{
          borderRadius: "var(--radius-btn)",
          background: rsvpd ? "var(--color-muted)" : color,
          fontSize: 15,
        }}
      >
        {!user ? "Sign in to RSVP" : rsvpd ? "Cancel RSVP" : "RSVP — I'm going!"}
      </button>
    </div>
  );
}
