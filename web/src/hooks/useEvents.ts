import { useState, useEffect } from "react";
import { fas } from "../lib/api";
import { SEED_EVENTS } from "../data/events";
import type { Event, Category } from "../types";

interface APIEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  city: string;
  category: string;
  lat: number;
  lng: number;
  creator_id: string | null;
  group_id: string | null;
  group_name: string | null;
  attendee_count: number;
}

function toEvent(e: APIEvent): Event {
  return {
    id: e.id,
    title: e.title,
    description: e.description,
    date: e.date,
    location: e.location,
    city: e.city,
    category: e.category as Category,
    lat: e.lat,
    lng: e.lng,
    attendeeCount: e.attendee_count,
    groupName: e.group_name ?? undefined,
  };
}

export function useEvents(category?: Category, city?: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      try {
        const params: Record<string, string> = {};
        if (category) params["category"] = category;
        if (city) params["city"] = city;

        const data = await fas.get<{ events: APIEvent[] }>("/meetup/events", params);

        if (!cancelled) {
          if (data.events.length > 0) {
            setEvents(data.events.map(toEvent));
          } else {
            // Fall back to seed data if API is empty for this filter
            applyLocalFilters();
          }
        }
      } catch {
        if (!cancelled) applyLocalFilters();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    function applyLocalFilters() {
      let filtered = SEED_EVENTS;
      if (category) filtered = filtered.filter((e) => e.category === category);
      if (city) filtered = filtered.filter((e) => e.city === city);
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setEvents(filtered);
    }

    fetchEvents();
    return () => { cancelled = true; };
  }, [category, city]);

  return { events, loading };
}
