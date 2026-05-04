import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { SEED_EVENTS } from "../data/events";
import type { Event, Category } from "../types";

export function useEvents(category?: Category, city?: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      if (!db) {
        if (!cancelled) applyFilters(SEED_EVENTS);
        if (!cancelled) setLoading(false);
        return;
      }

      try {
        const eventsRef = collection(db, "events");
        const q = category
          ? query(eventsRef, where("category", "==", category), orderBy("date"))
          : query(eventsRef, orderBy("date"));
        const snapshot = await getDocs(q);

        if (!cancelled) {
          if (snapshot.empty) {
            applyFilters(SEED_EVENTS);
          } else {
            applyFilters(
              snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event))
            );
          }
        }
      } catch {
        if (!cancelled) {
          applyFilters(SEED_EVENTS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    function applyFilters(all: Event[]) {
      let filtered = all;
      if (category) filtered = filtered.filter((e) => e.category === category);
      if (city) filtered = filtered.filter((e) => e.city === city);
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setEvents(filtered);
    }

    fetchEvents();
    return () => {
      cancelled = true;
    };
  }, [category, city]);

  return { events, loading };
}
