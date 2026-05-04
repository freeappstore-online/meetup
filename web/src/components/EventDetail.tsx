import { useState } from "react";
import type { Event } from "../types";
import { useAuth } from "../hooks/useAuth";

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

export function EventDetail({ event }: { event: Event }) {
  const { user, signInWithGoogle } = useAuth();
  const [rsvpd, setRsvpd] = useState(false);

  const handleRsvp = async () => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    setRsvpd(!rsvpd);
  };

  return (
    <div className="space-y-6">
      <div>
        <span
          className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3"
          style={{ background: "var(--color-accent)", color: "#fff" }}
        >
          {event.category}
        </span>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          {event.title}
        </h1>
        {event.groupName && (
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            Hosted by {event.groupName}
          </p>
        )}
      </div>

      <div
        className="p-4 space-y-3"
        style={{
          borderRadius: "var(--radius-card)",
          background: "var(--color-panel)",
          border: "1px solid var(--color-line)",
        }}
      >
        <div className="flex items-center gap-3">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--color-accent)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <span className="text-sm">{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-3">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--color-accent)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center gap-3">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--color-accent)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          <span className="text-sm">{event.attendeeCount + (rsvpd ? 1 : 0)} attending</span>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">About this event</h2>
        <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {event.description}
        </p>
      </div>

      <button
        onClick={handleRsvp}
        className="w-full py-3 px-6 font-semibold text-white transition-colors"
        style={{
          borderRadius: "var(--radius-btn)",
          background: rsvpd ? "var(--color-muted)" : "var(--color-accent)",
        }}
      >
        {!user ? "Sign in to RSVP" : rsvpd ? "Cancel RSVP" : "RSVP — I'm going!"}
      </button>
    </div>
  );
}
