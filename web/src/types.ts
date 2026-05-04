export type Category =
  | "tech"
  | "music"
  | "sports"
  | "arts"
  | "social"
  | "outdoor"
  | "gaming"
  | "food";

export const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: "tech", label: "Tech", emoji: "💻" },
  { value: "music", label: "Music", emoji: "🎵" },
  { value: "sports", label: "Sports", emoji: "⚽" },
  { value: "arts", label: "Arts", emoji: "🎨" },
  { value: "social", label: "Social", emoji: "🥂" },
  { value: "outdoor", label: "Outdoor", emoji: "🌲" },
  { value: "gaming", label: "Gaming", emoji: "🎮" },
  { value: "food", label: "Food", emoji: "🍜" },
];

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  city: string;
  category: Category;
  attendeeCount: number;
  imageUrl?: string;
  groupId?: string;
  groupName?: string;
  lat: number;
  lng: number;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: Category;
  imageUrl?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  interests: Category[];
}

export interface RSVP {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
}
