import { useState, useEffect } from "react";
import { fas } from "../lib/api";
import type { Group } from "../types";

interface APIGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
}

const MOCK_GROUPS: Group[] = [
  { id: "1", name: "React Portland", description: "Portland's largest React community. Monthly meetups, workshops, and hackathons.", memberCount: 342, category: "tech" },
  { id: "2", name: "PDX Trail Runners", description: "Exploring Portland's trails one run at a time. Weekly runs and social events.", memberCount: 156, category: "outdoor" },
  { id: "3", name: "Indie Devs Collective", description: "A supportive community for indie game developers. Share progress, get feedback.", memberCount: 89, category: "gaming" },
  { id: "4", name: "Community Music Series", description: "Bringing free live music to public spaces. Jazz, folk, classical, and more.", memberCount: 215, category: "music" },
  { id: "5", name: "Creative Corner", description: "Art workshops, gallery visits, and creative sessions. All mediums welcome.", memberCount: 128, category: "arts" },
  { id: "6", name: "Hoops Club", description: "Pickup basketball, league play, and watching parties. Stay active, make friends.", memberCount: 74, category: "sports" },
  { id: "7", name: "Maple Neighborhood Assoc.", description: "Building community one block at a time. Potlucks, cleanups, and advocacy.", memberCount: 198, category: "social" },
  { id: "8", name: "Foodies United", description: "Cooking classes, restaurant tours, and recipe swaps.", memberCount: 167, category: "food" },
];

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchGroups() {
      try {
        const data = await fas.get<{ groups: APIGroup[] }>("/meetup/groups");
        if (!cancelled) {
          if (data.groups.length > 0) {
            setGroups(
              data.groups.map((g) => ({
                id: g.id,
                name: g.name,
                description: g.description,
                category: g.category as Group["category"],
                memberCount: g.member_count,
              }))
            );
          } else {
            setGroups(MOCK_GROUPS);
          }
        }
      } catch {
        if (!cancelled) setGroups(MOCK_GROUPS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGroups();
    return () => { cancelled = true; };
  }, []);

  return { groups, loading };
}
