import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Group } from "../types";

const MOCK_GROUPS: Group[] = [
  {
    id: "1",
    name: "React Portland",
    description:
      "Portland's largest React community. Monthly meetups, workshops, and hackathons for all skill levels.",
    memberCount: 342,
    category: "tech",
  },
  {
    id: "2",
    name: "PDX Trail Runners",
    description:
      "Exploring Portland's trails one run at a time. Weekly runs, race training groups, and social events.",
    memberCount: 156,
    category: "outdoor",
  },
  {
    id: "3",
    name: "Indie Devs Collective",
    description:
      "A supportive community for indie game developers. Share progress, get feedback, and find collaborators.",
    memberCount: 89,
    category: "gaming",
  },
  {
    id: "4",
    name: "Community Music Series",
    description:
      "Bringing free live music to public spaces. Jazz, folk, classical, and everything in between.",
    memberCount: 215,
    category: "music",
  },
  {
    id: "5",
    name: "Creative Corner",
    description:
      "Art workshops, gallery visits, and creative sessions. All mediums, all skill levels welcome.",
    memberCount: 128,
    category: "arts",
  },
  {
    id: "6",
    name: "Hoops Club",
    description:
      "Pickup basketball, league play, and watching parties. Stay active, make friends.",
    memberCount: 74,
    category: "sports",
  },
  {
    id: "7",
    name: "Maple Neighborhood Assoc.",
    description:
      "Building community one block at a time. Potlucks, cleanups, and local advocacy.",
    memberCount: 198,
    category: "social",
  },
  {
    id: "8",
    name: "Foodies United",
    description:
      "Cooking classes, restaurant tours, and recipe swaps. For people who love to eat and cook.",
    memberCount: 167,
    category: "food",
  },
];

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchGroups() {
      try {
        const groupsRef = collection(db, "groups");
        const q = query(groupsRef);
        const snapshot = await getDocs(q);

        if (!cancelled) {
          if (snapshot.empty) {
            setGroups(MOCK_GROUPS);
          } else {
            setGroups(
              snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Group))
            );
          }
        }
      } catch {
        if (!cancelled) {
          setGroups(MOCK_GROUPS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGroups();
    return () => {
      cancelled = true;
    };
  }, []);

  return { groups, loading };
}
