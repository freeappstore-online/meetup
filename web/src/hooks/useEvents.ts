import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Event, Category } from "../types";

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "React Meetup: Server Components Deep Dive",
    description:
      "Join us for an evening exploring React Server Components, streaming SSR, and the future of React architecture. Speakers from top companies will share real-world patterns.",
    date: "2026-05-10T18:30:00",
    location: "TechHub Downtown, 123 Main St",
    category: "tech",
    attendeeCount: 47,
    groupName: "React Portland",
  },
  {
    id: "2",
    title: "Saturday Morning Trail Run",
    description:
      "A casual 5K trail run through Forest Park. All paces welcome! We regroup at mile markers. Bring water and trail shoes.",
    date: "2026-05-11T08:00:00",
    location: "Forest Park Trailhead",
    category: "outdoor",
    attendeeCount: 23,
    groupName: "PDX Trail Runners",
  },
  {
    id: "3",
    title: "Indie Game Dev Show & Tell",
    description:
      "Bring your latest project and share progress with fellow indie devs. Feedback rounds, playtesting, and pizza provided.",
    date: "2026-05-12T19:00:00",
    location: "Pixel Lounge, 456 Oak Ave",
    category: "gaming",
    attendeeCount: 18,
    groupName: "Indie Devs Collective",
  },
  {
    id: "4",
    title: "Jazz in the Park",
    description:
      "Live jazz quartet performing standards and originals. Bring a blanket and snacks. Free admission.",
    date: "2026-05-13T17:00:00",
    location: "Riverside Park Amphitheater",
    category: "music",
    attendeeCount: 85,
    groupName: "Community Music Series",
  },
  {
    id: "5",
    title: "Watercolor Workshop for Beginners",
    description:
      "Learn basic watercolor techniques in a relaxed studio setting. All materials provided. No experience needed.",
    date: "2026-05-14T14:00:00",
    location: "The Art Barn, 789 Elm St",
    category: "arts",
    attendeeCount: 12,
    groupName: "Creative Corner",
  },
  {
    id: "6",
    title: "Weekend Basketball Pickup",
    description:
      "Open gym pickup basketball. Teams formed on the spot. Bring your own water bottle. Indoor courts.",
    date: "2026-05-15T10:00:00",
    location: "Community Center Gym",
    category: "sports",
    attendeeCount: 16,
    groupName: "Hoops Club",
  },
  {
    id: "7",
    title: "Neighborhood Potluck Dinner",
    description:
      "Monthly neighborhood potluck. Bring a dish to share and meet your neighbors. All ages welcome.",
    date: "2026-05-16T18:00:00",
    location: "Maple Community Hall",
    category: "social",
    attendeeCount: 34,
    groupName: "Maple Neighborhood Assoc.",
  },
  {
    id: "8",
    title: "Ramen Making Class",
    description:
      "Hands-on ramen workshop: make your own broth, noodles, and toppings from scratch. Take home leftovers!",
    date: "2026-05-17T11:00:00",
    location: "Umami Kitchen Studio",
    category: "food",
    attendeeCount: 14,
    groupName: "Foodies United",
  },
];

export function useEvents(category?: Category) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      try {
        const eventsRef = collection(db, "events");
        const q = category
          ? query(eventsRef, where("category", "==", category), orderBy("date"))
          : query(eventsRef, orderBy("date"));
        const snapshot = await getDocs(q);

        if (!cancelled) {
          if (snapshot.empty) {
            // Use mock data when Firestore is not connected
            const filtered = category
              ? MOCK_EVENTS.filter((e) => e.category === category)
              : MOCK_EVENTS;
            setEvents(filtered);
          } else {
            setEvents(
              snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event))
            );
          }
        }
      } catch {
        // Firestore not configured — use mock data
        if (!cancelled) {
          const filtered = category
            ? MOCK_EVENTS.filter((e) => e.category === category)
            : MOCK_EVENTS;
          setEvents(filtered);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchEvents();
    return () => {
      cancelled = true;
    };
  }, [category]);

  return { events, loading };
}
